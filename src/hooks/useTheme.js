import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "pd-theme"; // "dark" | "light" | "system"

function getSystemPref() {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function applyTheme(mode) {
  const resolved = mode === "system" ? getSystemPref() : mode;
  const root = document.documentElement;
  root.classList.remove("dark", "light");
  root.classList.add(resolved);
  return resolved;
}

export function useTheme() {
  const [mode, setMode] = useState(() => {
    if (typeof window === "undefined") return "dark";
    return localStorage.getItem(STORAGE_KEY) || "dark";
  });
  const [resolved, setResolved] = useState("dark");

  useEffect(() => {
    setResolved(applyTheme(mode));
    localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  useEffect(() => {
    if (mode !== "system") return undefined;
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const listener = () => setResolved(applyTheme("system"));
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, [mode]);

  const cycle = useCallback(() => {
    setMode((prev) => (prev === "dark" ? "light" : prev === "light" ? "system" : "dark"));
  }, []);

  return { mode, resolved, setMode, cycle };
}

export default useTheme;
