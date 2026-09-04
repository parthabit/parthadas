import { useCallback, useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { projects as staticProjects } from "../data/projects";

const FETCH_TIMEOUT_MS = 8000;

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), ms)
    ),
  ]);
}

// Converts a Supabase row (snake_case) into the same shape the rest of the
// UI already expects (camelCase, matching src/data/projects.js).
function fromRow(row) {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    description: row.description || undefined,
    longDescription: row.long_description || undefined,
    image: row.image || undefined,
    technologies: row.technologies?.length ? row.technologies : undefined,
    github: row.github || undefined,
    live: row.live || undefined,
    video: row.video || undefined,
    featured: row.featured,
    status: row.status,
    year: row.year || undefined,
    caseStudy: row.case_study || undefined,
    problem: row.problem || undefined,
    solution: row.solution || undefined,
    features: row.features?.length ? row.features : undefined,
    challenges: row.challenges || undefined,
    improvements: row.improvements || undefined,
    screenshots: row.screenshots?.length ? row.screenshots : undefined,
  };
}

export function useProjects() {
  const [projects, setProjects] = useState(staticProjects);
  const [source, setSource] = useState("static"); // "static" | "supabase"
  const [loading, setLoading] = useState(Boolean(supabase));
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    if (!supabase) {
      setProjects(staticProjects);
      setSource("static");
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const { data, error: fetchError } = await withTimeout(
        supabase
          .from("projects")
          .select("*")
          .order("sort_order", { ascending: true }),
        FETCH_TIMEOUT_MS
      );

      if (fetchError || !data || data.length === 0) {
        // Backend unreachable, misconfigured, or empty — fall back gracefully.
        setProjects(staticProjects);
        setSource("static");
        setError(fetchError || null);
      } else {
        setProjects(data.map(fromRow));
        setSource("supabase");
        setError(null);
      }
    } catch (err) {
      // Network-level failures (CORS, offline, DNS, or a hung request that
      // hit our timeout) throw rather than resolving to { error }.
      setProjects(staticProjects);
      setSource("static");
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { projects, source, loading, error, refresh };
}

export default useProjects;
