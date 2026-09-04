import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { projectCategories } from "../data/projects";
import useProjects from "../lib/useProjects";
import ProjectCard from "./ProjectCard";

export default function ProjectGrid({
  limit,
  featuredOnly = false,
  showControls = true,
}) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const { projects: allProjects, loading } = useProjects();

  const source = featuredOnly ? allProjects.filter((p) => p.featured) : allProjects;

  const filtered = useMemo(() => {
    let list = source;
    if (category !== "All") {
      list = list.filter((p) => p.category === category);
    }
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.technologies?.some((t) => t.toLowerCase().includes(q))
      );
    }
    return limit ? list.slice(0, limit) : list;
  }, [source, category, query, limit]);

  return (
    <div>
      {loading && (
        <p className="font-mono text-[12px] text-fog-500 mb-4">Loading projects…</p>
      )}
      {showControls && (
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-8">
          <div className="relative flex-1 max-w-sm">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-fog-500"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects or tech…"
              aria-label="Search projects"
              className="w-full font-mono text-[13px] pl-9 pr-3 py-2.5 rounded-lg hairline surface text-paper-50 placeholder:text-fog-500 focus:border-signal-500/60"
            />
          </div>

          <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Filter projects by category">
            {projectCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={category === cat}
                onClick={() => setCategory(cat)}
                className={`font-mono text-[12px] px-3 py-1.5 rounded-full border transition-colors ${
                  category === cat
                    ? "bg-signal-500 text-ink-950 border-signal-500"
                    : "border-ink-800 text-fog-400 hover:text-paper-50 hover:border-signal-500/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="hairline rounded-xl p-10 text-center surface">
          <p className="font-mono text-sm text-fog-400">
            No projects match "{query || category}" yet.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((project, i) => (
            <div
              key={project.id}
              className="animate-fade-up"
              style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
