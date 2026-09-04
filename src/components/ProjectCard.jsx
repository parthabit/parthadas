import { Github, ExternalLink, PlayCircle, Star } from "lucide-react";
import { Link } from "react-router-dom";
import ProjectCover from "./ProjectCover";
import StatusBadge from "./StatusBadge";
import useTilt from "../hooks/useTilt";

export default function ProjectCard({ project }) {
  const { ref, handleMouseMove, handleMouseLeave } = useTilt();

  return (
    <article
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
      }}
      className="group relative hairline rounded-xl overflow-hidden surface hover:border-signal-500/40 transition-colors flex flex-col will-change-transform"
    >
      {/* Cursor-follow glow, lives on top so it works over the cover image too */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(320px circle at var(--tilt-x,50%) var(--tilt-y,50%), rgba(108,142,255,0.16), transparent 60%)",
        }}
      />
      <Link to={`/projects/${project.id}`} className="block aspect-[16/10] overflow-hidden">
        <ProjectCover
          project={project}
          className="transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-2">
          <Link to={`/projects/${project.id}`}>
            <h3 className="font-display font-medium text-paper-50 leading-snug hover:text-signal-400 transition-colors">
              {project.title}
            </h3>
          </Link>
          {project.featured && (
            <span className="shrink-0 mt-0.5 text-warn-500" title="Featured project">
              <Star size={14} fill="currentColor" />
            </span>
          )}
        </div>

        {project.description && (
          <p className="text-sm text-fog-400 leading-relaxed line-clamp-2 mb-4">
            {project.description}
          </p>
        )}

        {project.technologies && project.technologies.length > 0 && (
          <ul className="flex flex-wrap gap-1.5 mb-4">
            {project.technologies.slice(0, 5).map((tech) => (
              <li
                key={tech}
                className="font-mono text-[10.5px] px-2 py-0.5 rounded bg-ink-800/70 text-paper-400"
              >
                {tech}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-ink-800/60">
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-fog-500">
            <StatusBadge status={project.status} />
            {project.year && <span>{project.year}</span>}
          </div>
          <div className="flex items-center gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} on GitHub`}
                className="p-1.5 text-fog-400 hover:text-paper-50 transition-colors"
              >
                <Github size={15} />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live demo`}
                className="p-1.5 text-fog-400 hover:text-paper-50 transition-colors"
              >
                <ExternalLink size={15} />
              </a>
            )}
            {project.video && (
              <span className="p-1.5 text-fog-400" title="Has a demo video">
                <PlayCircle size={15} />
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
