import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Github, ExternalLink, FileText } from "lucide-react";
import useProjects from "../lib/useProjects";
import portfolioConfig from "../data/portfolio";
import ProjectCover from "../components/ProjectCover";
import StatusBadge from "../components/StatusBadge";
import VideoEmbed from "../components/VideoEmbed";

function Field({ label, children }) {
  if (!children) return null;
  return (
    <div>
      <p className="font-mono text-[11px] text-signal-400 mb-2">{label}</p>
      <div className="text-fog-400 leading-relaxed">{children}</div>
    </div>
  );
}

export default function ProjectDetails() {
  const { id } = useParams();
  const { projects, loading } = useProjects();
  const project = projects.find((p) => p.id === id);

  useEffect(() => {
    document.title = project
      ? `${project.title} — ${portfolioConfig.name}`
      : `Project not found — ${portfolioConfig.name}`;
  }, [project]);

  if (loading) {
    return <div className="min-h-[70vh] pt-28" />;
  }

  if (!project) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center pt-16">
        <p className="font-mono text-signal-400 text-sm mb-3">404</p>
        <h1 className="font-display text-2xl text-paper-50 mb-4">Project not found</h1>
        <Link to="/projects" className="text-signal-400 hover:underline font-mono text-sm">
          ← Back to all projects
        </Link>
      </div>
    );
  }

  return (
    <article className="pt-28 pb-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 font-mono text-[13px] text-fog-400 hover:text-signal-400 mb-8 transition-colors"
        >
          <ArrowLeft size={14} /> All projects
        </Link>

        <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
          <h1 className="font-display font-semibold text-3xl sm:text-4xl text-paper-50">
            {project.title}
          </h1>
          <div className="flex items-center gap-2">
            <StatusBadge status={project.status} />
            {project.year && (
              <span className="font-mono text-[11px] text-fog-500">{project.year}</span>
            )}
          </div>
        </div>

        {project.category && (
          <p className="font-mono text-sm text-signal-400 mb-6">{project.category}</p>
        )}

        <div className="flex flex-wrap gap-3 mb-10">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hairline inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm text-paper-50 hover:border-signal-500/50 transition-colors"
            >
              <Github size={15} /> Repository
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-signal-500 px-4 py-2.5 text-sm font-medium text-ink-950 hover:bg-signal-400 transition-colors"
            >
              <ExternalLink size={15} /> Live Website
            </a>
          )}
          {project.caseStudy && (
            <a
              href={project.caseStudy}
              target="_blank"
              rel="noopener noreferrer"
              className="hairline inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm text-paper-50 hover:border-signal-500/50 transition-colors"
            >
              <FileText size={15} /> Case Study
            </a>
          )}
        </div>

        <div className="aspect-[16/9] rounded-xl overflow-hidden hairline mb-10">
          <ProjectCover project={project} />
        </div>

        {project.longDescription && (
          <p className="text-lg text-paper-400 leading-relaxed mb-10">
            {project.longDescription}
          </p>
        )}

        <div className="grid sm:grid-cols-2 gap-8 mb-10">
          <Field label="PROBLEM">{project.problem}</Field>
          <Field label="SOLUTION">{project.solution}</Field>
        </div>

        {project.features && project.features.length > 0 && (
          <div className="mb-10">
            <p className="font-mono text-[11px] text-signal-400 mb-3">FEATURES</p>
            <ul className="grid sm:grid-cols-2 gap-2.5">
              {project.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2 text-fog-400 text-sm leading-relaxed"
                >
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-signal-400 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}

        {project.technologies && project.technologies.length > 0 && (
          <div className="mb-10">
            <p className="font-mono text-[11px] text-signal-400 mb-3">TECHNOLOGIES</p>
            <ul className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <li
                  key={t}
                  className="font-mono text-[12px] px-2.5 py-1 rounded-md bg-ink-800/70 text-paper-400"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        )}

        {project.video && (
          <div className="mb-10">
            <p className="font-mono text-[11px] text-signal-400 mb-3">DEMO VIDEO</p>
            <VideoEmbed video={project.video} />
          </div>
        )}

        {project.screenshots && project.screenshots.length > 0 && (
          <div className="mb-10">
            <p className="font-mono text-[11px] text-signal-400 mb-3">SCREENSHOTS</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {project.screenshots.map((src) => (
                <img
                  key={src}
                  src={src}
                  alt={`${project.title} screenshot`}
                  loading="lazy"
                  className="rounded-lg hairline w-full object-cover"
                />
              ))}
            </div>
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-8">
          <Field label="CHALLENGES">{project.challenges}</Field>
          <Field label="FUTURE IMPROVEMENTS">{project.improvements}</Field>
        </div>
      </div>
    </article>
  );
}
