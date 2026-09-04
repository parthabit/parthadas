import { Code2 } from "lucide-react";

const CATEGORY_GRADIENT = {
  Web: "from-signal-500/25 via-ink-900 to-ink-900",
  "AI/ML": "from-muted2-500/25 via-ink-900 to-ink-900",
  JavaScript: "from-warn-500/20 via-ink-900 to-ink-900",
  Python: "from-ok-500/20 via-ink-900 to-ink-900",
  Other: "from-fog-500/15 via-ink-900 to-ink-900",
};

export default function ProjectCover({ project, className = "" }) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={`${project.title} preview`}
        loading="lazy"
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }

  const gradient = CATEGORY_GRADIENT[project.category] || CATEGORY_GRADIENT.Other;

  return (
    <div
      className={`h-full w-full bg-gradient-to-br ${gradient} bg-dot-grid flex items-center justify-center relative ${className}`}
      role="img"
      aria-label={`${project.title} — no preview image set`}
    >
      <div className="hairline rounded-lg h-12 w-12 grid place-items-center surface">
        <Code2 size={20} className="text-fog-400" strokeWidth={1.5} />
      </div>
      <span className="absolute bottom-2 right-3 font-mono text-[10px] text-fog-500">
        add image →{" "}
        <code className="text-fog-400">public/projects/{project.id}/</code>
      </span>
    </div>
  );
}
