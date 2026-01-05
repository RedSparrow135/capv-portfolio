import { useEffect, useRef, useState } from "react";

export function useNavbarLayout({
  containerRef,
  linksRef,
  actionsRef,
  gap = 150,
  hysteresis = 32,
}) {
  const [isCompact, setIsCompact] = useState(false);
  const compactRef = useRef(false);
  const naturalLinksWidthRef = useRef(null);

  useEffect(() => {
    if (
      !containerRef.current ||
      !linksRef.current ||
      !actionsRef.current
    ) return;

    // 🔑 medir ancho natural UNA sola vez
    if (naturalLinksWidthRef.current === null) {
      const el = linksRef.current;
      const prev = el.style.cssText;

      el.style.visibility = "hidden";
      el.style.position = "absolute";
      el.style.whiteSpace = "nowrap";
      el.style.width = "max-content";

      naturalLinksWidthRef.current = el.scrollWidth;

      el.style.cssText = prev;
    }

    const checkLayout = () => {
      const containerWidth = containerRef.current.offsetWidth;
      const actionsWidth = actionsRef.current.offsetWidth;
      const linksWidth = naturalLinksWidthRef.current;

      const available =
        containerWidth - actionsWidth - gap;

      let next = compactRef.current;

      if (!compactRef.current && linksWidth > available) {
        next = true;
      } else if (
        compactRef.current &&
        linksWidth < available - hysteresis
      ) {
        next = false;
      }

      if (next !== compactRef.current) {
        compactRef.current = next;
        setIsCompact(next);
      }
    };

    checkLayout();

    const ro = new ResizeObserver(checkLayout);
    ro.observe(containerRef.current);
    ro.observe(actionsRef.current);

    window.addEventListener("orientationchange", checkLayout);

    return () => {
      ro.disconnect();
      window.removeEventListener("orientationchange", checkLayout);
    };
  }, [containerRef, linksRef, actionsRef, gap, hysteresis]);

  return isCompact;
}
