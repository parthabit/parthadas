import { Moon, Sun, Monitor } from "lucide-react";

const ICONS = { dark: Moon, light: Sun, system: Monitor };

export default function ThemeToggle({ mode, onCycle }) {
  const Icon = ICONS[mode] || Moon;
  return (
    <button
      type="button"
      onClick={onCycle}
      aria-label={`Theme: ${mode}. Click to change.`}
      title={`Theme: ${mode}`}
      className="hairline rounded-lg p-2 text-fog-400 hover:text-paper-50 hover:border-signal-500/50 transition-colors"
    >
      <Icon size={16} strokeWidth={1.75} />
    </button>
  );
}
