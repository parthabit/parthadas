import { useState } from "react";
import { Menu, X, FileDown } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import portfolioConfig from "../data/portfolio";
import socialLinks from "../data/socialLinks";
import socialIconMap from "../lib/socialIcons";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export default function Navbar({ activeSection, themeMode, onCycleTheme }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  function goToSection(id) {
    setOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      // wait a tick for Home to mount, then scroll
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 50);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-ink-800/80 bg-ink-950/75 backdrop-blur-md html-light:bg-white/75">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          onClick={() => goToSection("home")}
          className="font-display font-semibold text-paper-50 flex items-center gap-2 shrink-0"
        >
          <span className="h-7 w-7 rounded-md bg-signal-500/15 border border-signal-500/40 text-signal-400 grid place-items-center text-[11px] font-mono">
            {portfolioConfig.initials}
          </span>
          <span className="hidden sm:inline">{portfolioConfig.name}</span>
        </Link>

        <ul className="hidden lg:flex items-center gap-1 font-mono text-[13px]">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => goToSection(item.id)}
                className={`px-3 py-2 rounded-md transition-colors ${
                  activeSection === item.id
                    ? "text-signal-400"
                    : "text-fog-400 hover:text-paper-50"
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-2">
          {socialLinks
            .filter((s) => s.show && (s.id === "github" || s.id === "linkedin"))
            .map((s) => {
              const Icon = socialIconMap[s.icon];
              return (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="hairline rounded-lg p-2 text-fog-400 hover:text-paper-50 hover:border-signal-500/50 transition-colors"
                >
                  <Icon size={16} strokeWidth={1.75} />
                </a>
              );
            })}
          <ThemeToggle mode={themeMode} onCycle={onCycleTheme} />
          {portfolioConfig.resume && (
            <a
              href={portfolioConfig.resume}
              download
              className="ml-1 inline-flex items-center gap-1.5 rounded-lg bg-signal-500 px-3.5 py-2 text-[13px] font-medium text-ink-950 hover:bg-signal-400 transition-colors"
            >
              <FileDown size={14} /> Resume
            </a>
          )}
        </div>

        <div className="flex lg:hidden items-center gap-2">
          <ThemeToggle mode={themeMode} onCycle={onCycleTheme} />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="hairline rounded-lg p-2 text-paper-50"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out border-b border-ink-800/80 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="px-4 pb-4 pt-1 flex flex-col gap-1 font-mono text-sm bg-ink-950/95">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => goToSection(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-md transition-colors ${
                  activeSection === item.id
                    ? "text-signal-400 bg-signal-500/10"
                    : "text-fog-400 hover:text-paper-50"
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
          <li className="flex items-center gap-2 pt-2">
            {socialLinks
              .filter((s) => s.show)
              .map((s) => {
                const Icon = socialIconMap[s.icon];
                return (
                  <a
                    key={s.id}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="hairline rounded-lg p-2 text-fog-400"
                  >
                    <Icon size={16} strokeWidth={1.75} />
                  </a>
                );
              })}
          </li>
          {portfolioConfig.resume && (
            <li>
              <a
                href={portfolioConfig.resume}
                download
                className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-signal-500 px-3.5 py-2.5 text-sm font-medium text-ink-950"
              >
                <FileDown size={14} /> Download Resume
              </a>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}
