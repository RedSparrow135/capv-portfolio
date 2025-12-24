import { useEffect, useRef, useState } from "react";

export default function ProgressiveScroll({ children, onNavbarToggle }) {
  const scrollRef = useRef(0);

  const [scroll, setScroll] = useState(0);
  const [freeScroll, setFreeScroll] = useState(false);

  // =============================
  // CONFIGURACIÓN GENERAL
  // =============================
  const SPEED = 0.0065;
  const GAP = 1.5;

  const COUNT = children?.length ?? 0;
  const MAX_SCROLL = Math.max(0, COUNT * GAP);

  const LAST_CENTER = (COUNT - 1) * GAP;
  const RELEASE_POINT = LAST_CENTER + 0.25;

  // =============================
  // ÍNDICES
  // =============================
  const ABOUT_INDEX = 1;
  const EXPERIENCE_INDEX = 2;
  const PROJECTS_INDEX = 3;
  const CONTACT_INDEX = COUNT - 1;

  const CONTACT_FREEZE_DISTANCE = 0.15;

  // =============================
  // SCROLL INTERNO
  // =============================
  const ABOUT_MAX_OFFSET = 900;
  const EXPERIENCE_MAX_OFFSET = 50;
  const PROJECTS_MAX_OFFSET = 400;

  const [aboutOffset, setAboutOffset] = useState(0);
  const [experienceOffset, setExperienceOffset] = useState(0);
  const [projectsOffset, setProjectsOffset] = useState(0);

  // =============================
  // 🔑 RESET TOTAL (SCROLL REAL + VIRTUAL)
  // =============================
  const resetToVirtualScroll = (index) => {
    setFreeScroll(false);

    // reset scroll real
    window.scrollTo({ top: 0, behavior: "instant" });

    // reset scroll virtual
    const target = index * GAP;
    scrollRef.current = target;
    setScroll(target);
  };

  // =============================
  // UTILS
  // =============================
  const isSectionActive = (index) =>
    Math.abs(scrollRef.current - index * GAP) < 0.35;

  const handleInternalScroll = ({
    e,
    inSection,
    goingDown,
    goingUp,
    offset,
    setOffset,
    maxOffset,
    factor = 0.45,
  }) => {
    if (!inSection) return false;

    const delta = e.deltaY * factor;

    if (goingDown && offset < maxOffset) {
      e.preventDefault();
      setOffset((prev) => Math.round(Math.min(maxOffset, prev + delta)));
      return true;
    }

    if (goingUp && offset > 0) {
      e.preventDefault();
      setOffset((prev) => Math.round(Math.max(0, prev + delta)));
      return true;
    }

    return false;
  };

  // =============================
  // WHEEL SCROLL (VIRTUAL)
  // =============================
  useEffect(() => {
    const onWheel = (e) => {
      if (freeScroll) return;

      const goingDown = e.deltaY > 0;
      const goingUp = e.deltaY < 0;

      if (goingDown) onNavbarToggle?.(true);
      if (goingUp) onNavbarToggle?.(false);

      const inAbout = isSectionActive(ABOUT_INDEX);
      const inExperience = isSectionActive(EXPERIENCE_INDEX);
      const inProjects = isSectionActive(PROJECTS_INDEX);

      if (
        handleInternalScroll({
          e,
          inSection: inAbout,
          goingDown,
          goingUp,
          offset: aboutOffset,
          setOffset: setAboutOffset,
          maxOffset: ABOUT_MAX_OFFSET,
        })
      ) return;

      if (
        handleInternalScroll({
          e,
          inSection: inExperience,
          goingDown,
          goingUp,
          offset: experienceOffset,
          setOffset: setExperienceOffset,
          maxOffset: EXPERIENCE_MAX_OFFSET,
        })
      ) return;

      if (
        handleInternalScroll({
          e,
          inSection: inProjects,
          goingDown,
          goingUp,
          offset: projectsOffset,
          setOffset: setProjectsOffset,
          maxOffset: PROJECTS_MAX_OFFSET,
        })
      ) return;

      // 🔓 PASAR A SCROLL REAL
      if (scrollRef.current >= RELEASE_POINT && goingDown) {
        setFreeScroll(true);
        return;
      }

      e.preventDefault();

      scrollRef.current += e.deltaY * SPEED;
      scrollRef.current = Math.max(0, Math.min(MAX_SCROLL, scrollRef.current));
      setScroll(scrollRef.current);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [
    freeScroll,
    MAX_SCROLL,
    RELEASE_POINT,
    onNavbarToggle,
    aboutOffset,
    experienceOffset,
    projectsOffset,
  ]);

  // =============================
  // FREE SCROLL REAL
  // =============================
  useEffect(() => {
    if (!freeScroll) return;

    let lastY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;

      if (currentY > lastY) onNavbarToggle?.(true);
      if (currentY < lastY) onNavbarToggle?.(false);

      // 🔒 VOLVER A VIRTUAL LIMPIO
      if (currentY <= 10) {
        resetToVirtualScroll(CONTACT_INDEX);
      }

      lastY = currentY;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [freeScroll, CONTACT_INDEX, onNavbarToggle]);

  // =============================
  // NAVBAR NAVIGATION
  // =============================
  useEffect(() => {
    const onNavigate = (e) => {
      const index = e.detail;
      resetToVirtualScroll(index);
    };

    window.addEventListener("progressive:navigate", onNavigate);
    return () =>
      window.removeEventListener("progressive:navigate", onNavigate);
  }, []);

  // =============================
  // RENDER
  // =============================
  return (
    <>
      {/* ================= DEBUG HUD ================= */}
      <div
        style={{
          position: "fixed",
          bottom: 12,
          right: 12,
          zIndex: 9999,
          background: "rgba(0,0,0,0.75)",
          color: "#00ffcc",
          fontSize: 12,
          padding: "10px 12px",
          borderRadius: 8,
          fontFamily: "monospace",
          lineHeight: 1.4,
          pointerEvents: "none",
        }}
      >
        <div><strong>DEBUG SCROLL</strong></div>
        <div>scrollRef: {scrollRef.current.toFixed(3)}</div>
        <div>scroll(state): {scroll.toFixed(3)}</div>
        <div>freeScroll: {String(freeScroll)}</div>
      </div>

      {/* ================= CONTENIDO ================= */}
      <div className="progressive-root">
        {(children || []).map((child, index) => {
          const center = index * GAP;
          const distance = Math.abs(scroll - center);

          let progress = Math.max(0, Math.min(1, 1 - distance));
          const isActive = progress > 0.5;

          const rawOffset =
            index === ABOUT_INDEX
              ? aboutOffset
              : index === EXPERIENCE_INDEX
              ? experienceOffset
              : index === PROJECTS_INDEX
              ? projectsOffset
              : 0;

          let translateY = Math.round((1 - progress) * 16 - rawOffset);

          if (index === CONTACT_INDEX && distance < CONTACT_FREEZE_DISTANCE) {
            translateY = 0;
          }

          return (
            <div
              key={index}
              className="progressive-layer"
              style={{
                opacity: progress,
                transform: `translate3d(0, ${translateY}px, 0)`,
                pointerEvents: isActive ? "auto" : "none",
                zIndex: isActive ? 10 : 5,
              }}
            >
              {child}
            </div>
          );
        })}
      </div>
    </>
  );
}
