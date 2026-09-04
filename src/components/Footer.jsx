import portfolioConfig from "../data/portfolio";
import socialLinks from "../data/socialLinks";
import socialIconMap from "../lib/socialIcons";

export default function Footer() {
  return (
    <footer className="border-t border-ink-800/60 py-12 pb-16 sm:pb-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="font-display font-semibold text-paper-50">{portfolioConfig.name}</p>
          <p className="text-sm text-fog-400 mt-1">
            Building, learning, and experimenting with technology.
          </p>
        </div>

        <div className="flex items-center gap-2">
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
                  className="hairline rounded-lg p-2.5 text-fog-400 hover:text-paper-50 hover:border-signal-500/50 transition-colors"
                >
                  <Icon size={16} strokeWidth={1.75} />
                </a>
              );
            })}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 mt-8 pt-6 border-t border-ink-800/40">
        <p className="font-mono text-[11.5px] text-fog-500">
          © 2026 {portfolioConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
