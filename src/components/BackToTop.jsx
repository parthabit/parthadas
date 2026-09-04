import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 640);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-12 sm:bottom-12 right-4 sm:right-6 z-40 hairline rounded-full p-3 surface text-fog-400 hover:text-signal-400 hover:border-signal-500/50 shadow-lg shadow-black/20 transition-colors animate-fade-up"
    >
      <ArrowUp size={16} />
    </button>
  );
}
