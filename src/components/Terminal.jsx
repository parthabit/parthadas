import { useEffect, useRef, useState } from "react";
import { X, TerminalSquare } from "lucide-react";
import portfolioConfig from "../data/portfolio";
import { projects } from "../data/projects";
import skillCategories from "../data/skills";

const HELP_TEXT = [
  "Available commands:",
  "  help       show this list",
  "  about      who I am",
  "  projects   list my projects",
  "  skills     list my skills",
  "  github     open my GitHub profile",
  "  contact    show contact info",
  "  clear      clear the terminal",
];

function buildResponse(rawCommand, { onOpenLink }) {
  const command = rawCommand.trim().toLowerCase();

  if (command === "" ) return [];
  if (command === "help") return HELP_TEXT;

  if (command === "about") {
    return [
      portfolioConfig.name,
      "Computer Science Student",
      "Developer & AI/ML Enthusiast",
      "",
      portfolioConfig.about.summary,
    ];
  }

  if (command === "projects") {
    return [
      `${projects.length} project(s) tracked:`,
      ...projects.map((p) => `  • ${p.title} [${p.category}] — ${p.status}`),
      "",
      "Open the Projects section to see full details.",
    ];
  }

  if (command === "skills") {
    return skillCategories.flatMap((cat) => [
      `${cat.label}:`,
      `  ${cat.skills.map((s) => s.name).join(", ")}`,
    ]);
  }

  if (command === "github") {
    onOpenLink?.(portfolioConfig.github);
    return [`Opening ${portfolioConfig.github} …`];
  }

  if (command === "contact") {
    return [
      `Email:   ${portfolioConfig.email}`,
      `Phone:   ${portfolioConfig.phone}`,
      `LinkedIn: ${portfolioConfig.linkedin}`,
    ];
  }

  if (command === "clear") {
    return "__CLEAR__";
  }

  return [`command not found: ${rawCommand}`, `type "help" for a list of commands`];
}

export default function Terminal({ open, onClose }) {
  const [history, setHistory] = useState([
    { type: "system", lines: [`${portfolioConfig.name}'s terminal — type "help" to get started`] },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 10);
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [history]);

  function handleSubmit(e) {
    e.preventDefault();
    const cmd = input;
    const result = buildResponse(cmd, {
      onOpenLink: (url) => window.open(url, "_blank"),
    });

    if (result === "__CLEAR__") {
      setHistory([]);
    } else {
      setHistory((h) => [...h, { type: "input", lines: [cmd] }, { type: "output", lines: result }]);
    }
    setInput("");
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-ink-950/70 backdrop-blur-sm px-0 sm:px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Developer terminal"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-xl hairline rounded-t-xl sm:rounded-xl overflow-hidden surface shadow-2xl shadow-black/40"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-ink-800">
          <span className="flex items-center gap-2 font-mono text-[12px] text-fog-400">
            <TerminalSquare size={13} /> terminal
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close terminal"
            className="text-fog-400 hover:text-paper-50"
          >
            <X size={15} />
          </button>
        </div>

        <div ref={scrollRef} className="h-72 overflow-y-auto px-4 py-3 font-mono text-[12.5px] space-y-1">
          {history.map((entry, i) => (
            <div key={i}>
              {entry.type === "input" && (
                <p className="text-signal-400">
                  <span className="text-ok-500">❯</span> {entry.lines[0]}
                </p>
              )}
              {entry.type !== "input" &&
                entry.lines.map((line, j) => (
                  <p key={j} className="text-fog-400 whitespace-pre-wrap">
                    {line}
                  </p>
                ))}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-3 border-t border-ink-800">
          <span className="text-ok-500 font-mono text-sm">❯</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent font-mono text-[13px] text-paper-50 focus:outline-none"
            placeholder="type a command…"
            autoComplete="off"
            spellCheck={false}
          />
        </form>
      </div>
    </div>
  );
}
