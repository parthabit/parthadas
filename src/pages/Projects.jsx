import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import portfolioConfig from "../data/portfolio";
import ProjectGrid from "../components/ProjectGrid";

export default function Projects() {
  useEffect(() => {
    document.title = `Projects — ${portfolioConfig.name}`;
  }, []);

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 font-mono text-[13px] text-fog-400 hover:text-signal-400 mb-8 transition-colors"
        >
          <ArrowLeft size={14} /> Back home
        </Link>

        <h1 className="font-display font-semibold text-3xl sm:text-4xl text-paper-50 mb-3">
          All Projects
        </h1>
        <p className="text-fog-400 mb-10 max-w-xl">
          Everything I've built and shipped, searchable and filterable by category.
        </p>

        <ProjectGrid />
      </div>
    </div>
  );
}
