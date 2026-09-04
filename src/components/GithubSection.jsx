import { useEffect, useState } from "react";
import { Github, Star, GitFork, ExternalLink } from "lucide-react";
import portfolioConfig from "../data/portfolio";
import repoAllowlist from "../data/repos";

export default function GithubSection() {
  const [repos, setRepos] = useState(() =>
    repoAllowlist.map((r) => ({ ...r, loaded: false }))
  );
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadRepos() {
      try {
        const results = await Promise.all(
          repoAllowlist.map(async (r) => {
            try {
              const res = await fetch(
                `https://api.github.com/repos/${portfolioConfig.githubUsername}/${r.name}`
              );
              if (!res.ok) throw new Error("not ok");
              const data = await res.json();
              // Skip private repos defensively — GitHub API should already
              // only return what's public for an unauthenticated request.
              if (data.private) return null;
              return {
                ...r,
                description: data.description,
                language: data.language,
                stars: data.stargazers_count,
                forks: data.forks_count,
                url: data.html_url,
                loaded: true,
              };
            } catch {
              return { ...r, loaded: false, url: `${portfolioConfig.github}/${r.name}` };
            }
          })
        );
        if (!cancelled) {
          setRepos(results.filter(Boolean));
        }
      } catch {
        if (!cancelled) setFailed(true);
      }
    }

    loadRepos();
    return () => {
      cancelled = true;
    };
  }, []);

  const sorted = [...repos].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  const visible = sorted.slice(0, 9);

  return (
    <section className="py-24 sm:py-28 border-t border-ink-800/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-end justify-between gap-4 mb-12 flex-wrap">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-signal-400 text-sm">04</span>
            <h2 className="font-display font-semibold text-2xl sm:text-3xl text-paper-50">
              GitHub Activity
            </h2>
          </div>
          <a
            href={portfolioConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-[13px] text-fog-400 hover:text-signal-400 transition-colors"
          >
            <Github size={14} /> @{portfolioConfig.githubUsername}
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((repo) => (
            <a
              key={repo.name}
              href={repo.url || `${portfolioConfig.github}/${repo.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hairline rounded-xl p-5 surface hover:border-signal-500/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-signal-500/10 transition-all duration-300 flex flex-col"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="font-mono text-[13px] text-paper-50 break-all">
                  {repo.name}
                </span>
                {repo.featured && (
                  <span className="shrink-0 font-mono text-[10px] px-1.5 py-0.5 rounded bg-signal-500/15 text-signal-400 border border-signal-500/30">
                    pinned
                  </span>
                )}
              </div>
              <p className="text-[13px] text-fog-400 leading-relaxed line-clamp-2 flex-1">
                {repo.description || "No description provided."}
              </p>
              <div className="flex items-center gap-3 mt-4 font-mono text-[11px] text-fog-500">
                {repo.language && (
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-signal-400" />
                    {repo.language}
                  </span>
                )}
                {typeof repo.stars === "number" && (
                  <span className="flex items-center gap-1">
                    <Star size={11} /> {repo.stars}
                  </span>
                )}
                {typeof repo.forks === "number" && (
                  <span className="flex items-center gap-1">
                    <GitFork size={11} /> {repo.forks}
                  </span>
                )}
                <ExternalLink size={11} className="ml-auto" />
              </div>
            </a>
          ))}
        </div>

        {failed && (
          <p className="mt-6 font-mono text-[12px] text-fog-500">
            Live repo data is unavailable right now — showing repository names only.
          </p>
        )}
      </div>
    </section>
  );
}
