import { useEffect, useState } from "react";
import { Terminal as TerminalIcon, Command } from "lucide-react";

const SECTION_LABELS = {
  home: "hero.jsx",
  about: "about.jsx",
  skills: "skills.jsx",
  projects: "projects.jsx",
  education: "education.jsx",
  contact: "contact.jsx",
};

export default function StatusBar({ activeSection, onOpenPalette, onOpenTerminal }) {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000 * 15);
    return () => clearInterval(id);
  }, []);

  const timeStr = time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const file = SECTION_LABELS[activeSection] || "hero.jsx";

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 hidden sm:flex items-center justify-between
      h-8 px-3 text-[11px] font-mono border-t border-ink-800 bg-ink-950/90 backdrop-blur
      text-fog-400 select-none"
      role="status"
      aria-label="Site status bar"
    >
      <div className="flex items-center gap-4 min-w-0">
        <span className="flex items-center gap-1.5 text-ok-500">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-glow-pulse absolute inline-flex h-full w-full rounded-full bg-ok-500 opacity-60" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-ok-500" />
          </span>
          online
        </span>
        <span className="truncate">viewing: {file}</span>
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onOpenTerminal}
          className="hidden md:flex items-center gap-1 hover:text-paper-50 transition-colors"
        >
          <TerminalIcon size={12} /> terminal
        </button>
        <button
          type="button"
          onClick={onOpenPalette}
          className="flex items-center gap-1 hover:text-paper-50 transition-colors"
        >
          <Command size={12} /> ⌘K
        </button>
        <span className="hidden md:inline">{timeStr} IST</span>
      </div>
    </div>
  );
}
