import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  User,
  Wrench,
  FolderGit2,
  Mail,
  Github,
  Linkedin,
  FileDown,
  Search,
  GraduationCap,
} from "lucide-react";
import portfolioConfig from "../data/portfolio";

export default function CommandPalette({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  function goSection(id) {
    onClose();
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 60);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  }

  const commands = useMemo(
    () => [
      { id: "home", label: "Go Home", icon: Home, action: () => goSection("home") },
      { id: "about", label: "About", icon: User, action: () => goSection("about") },
      { id: "skills", label: "Skills", icon: Wrench, action: () => goSection("skills") },
      { id: "projects", label: "Projects", icon: FolderGit2, action: () => goSection("projects") },
      {
        id: "education",
        label: "Education",
        icon: GraduationCap,
        action: () => goSection("education"),
      },
      { id: "contact", label: "Contact", icon: Mail, action: () => goSection("contact") },
      {
        id: "github",
        label: "Open GitHub",
        icon: Github,
        action: () => window.open(portfolioConfig.github, "_blank"),
      },
      {
        id: "linkedin",
        label: "Open LinkedIn",
        icon: Linkedin,
        action: () => window.open(portfolioConfig.linkedin, "_blank"),
      },
      {
        id: "resume",
        label: "Download Resume",
        icon: FileDown,
        action: () => {
          onClose();
          const a = document.createElement("a");
          a.href = portfolioConfig.resume;
          a.download = "";
          a.click();
        },
      },
    ],
    [location.pathname] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const filtered = commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    if (open) {
      setQuery("");
      setHighlight(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    function onKey(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlight((h) => Math.min(h + 1, filtered.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlight((h) => Math.max(h - 1, 0));
      }
      if (e.key === "Enter" && filtered[highlight]) {
        filtered[highlight].action();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, highlight, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-24 sm:pt-32 px-4 bg-ink-950/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg hairline rounded-xl surface shadow-2xl shadow-black/40 overflow-hidden animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2.5 px-4 border-b border-ink-800">
          <Search size={15} className="text-fog-500" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setHighlight(0);
            }}
            placeholder="Type a command…"
            className="flex-1 bg-transparent py-3.5 text-sm text-paper-50 placeholder:text-fog-500 focus:outline-none font-mono"
          />
          <kbd className="font-mono text-[10px] text-fog-500 border border-ink-800 rounded px-1.5 py-0.5">
            esc
          </kbd>
        </div>
        <ul className="max-h-72 overflow-y-auto py-2">
          {filtered.length === 0 && (
            <li className="px-4 py-6 text-center text-fog-500 text-sm font-mono">
              No matching commands.
            </li>
          )}
          {filtered.map((cmd, i) => {
            const Icon = cmd.icon;
            return (
              <li key={cmd.id}>
                <button
                  type="button"
                  onMouseEnter={() => setHighlight(i)}
                  onClick={cmd.action}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors ${
                    highlight === i ? "bg-signal-500/10 text-signal-400" : "text-paper-400"
                  }`}
                >
                  <Icon size={15} /> {cmd.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
