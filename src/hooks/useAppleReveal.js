import { useRef } from "react";
import { useInView } from "framer-motion";

export function useAppleReveal() {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: false,
    margin: "-160px",
  });

  return { ref, isInView };
}
