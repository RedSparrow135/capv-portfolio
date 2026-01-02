import { useEffect, useRef, useState } from "react";

export function useNavbarScroll(threshold = 12) {
  const lastScroll = useRef(0);

  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      const delta = current - lastScroll.current;

      // TOP (hero visible)
      setAtTop(current <= 2);

      // ignorar micro-scroll
      if (Math.abs(delta) < threshold) return;

      // bajar → esconder
      if (delta > 0 && current > 80) {
        setHidden(true);
      }

      // subir → mostrar
      if (delta < 0) {
        setHidden(false);
      }

      lastScroll.current = current;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return { hidden, atTop };
}
