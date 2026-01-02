// src/hooks/useScrollReveal.js
import { useRef } from "react";
import { useInView } from "framer-motion";

export function useScrollReveal(options = {}) {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: false,
    margin: "-120px",
    ...options,
  });

  return { ref, isInView };
}
