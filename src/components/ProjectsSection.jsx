import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import useProjects from "../lib/useProjects";
import ProjectGrid from "./ProjectGrid";
import Reveal from "./Reveal";

export default function ProjectsSection() {
  const { projects } = useProjects();
  const hasFeatured = projects.some((p) => p.featured);

  return (
    <section id="projects" className="py-24 sm:py-28 border-t border-ink-800/60 scroll-mt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
        <div className="flex items-end justify-between gap-4 mb-12 flex-wrap">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-signal-400 text-sm">03</span>
            <h2 className="font-display font-semibold text-2xl sm:text-3xl text-paper-50">
              Projects
            </h2>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-1 font-mono text-[13px] text-fog-400 hover:text-signal-400 transition-colors"
          >
            View all projects <ArrowUpRight size={14} />
          </Link>
        </div>
        </Reveal>

        <ProjectGrid featuredOnly={hasFeatured} limit={6} showControls={!hasFeatured} />
      </div>
    </section>
  );
}
