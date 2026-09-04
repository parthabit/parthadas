import { useRef } from "react";

const MAX_TILT = 10; // degrees

export function useTilt() {
  const ref = useRef(null);
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function handleMouseMove(e) {
    if (reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0..1
    const y = (e.clientY - rect.top) / rect.height; // 0..1
    const rotateY = (x - 0.5) * MAX_TILT * 2;
    const rotateX = (0.5 - y) * MAX_TILT * 2;

    ref.current.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
    ref.current.style.setProperty("--tilt-x", `${x * 100}%`);
    ref.current.style.setProperty("--tilt-y", `${y * 100}%`);
  }

  function handleMouseLeave() {
    if (!ref.current) return;
    ref.current.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)";
  }

  return { ref, handleMouseMove, handleMouseLeave };
}

export default useTilt;
