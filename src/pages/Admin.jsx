import { useEffect, useState } from "react";
import { LogOut, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import useAuth from "../lib/useAuth";
import useProjects from "../lib/useProjects";
import { supabase } from "../lib/supabaseClient";
import portfolioConfig from "../data/portfolio";
import AdminLogin from "../components/admin/AdminLogin";
import ProjectList from "../components/admin/ProjectList";
import ProjectEditor from "../components/admin/ProjectEditor";

export default function Admin() {
  const { user, loading: authLoading, signIn, signOut } = useAuth();
  const { projects, source, loading: projectsLoading, refresh } = useProjects();
  const [editing, setEditing] = useState(null); // null | "new" | project object

  useEffect(() => {
    document.title = `Admin — ${portfolioConfig.name}`;
  }, []);

  if (!supabase) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 text-center pt-16">
        <div className="max-w-md">
          <p className="font-mono text-signal-400 text-sm mb-3">/admin</p>
          <h1 className="font-display text-2xl text-paper-50 mb-3">Backend not configured</h1>
          <p className="text-fog-400 text-sm">
            Set <code className="text-paper-400">VITE_SUPABASE_URL</code> and{" "}
            <code className="text-paper-400">VITE_SUPABASE_ANON_KEY</code> in your environment to
            enable the admin panel.
          </p>
        </div>
      </div>
    );
  }

  if (authLoading) return null;

  if (!user) {
    return <AdminLogin onSignIn={signIn} />;
  }

  return (
    <div className="pt-28 pb-24 min-h-screen">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 font-mono text-[13px] text-fog-400 hover:text-signal-400 mb-3 transition-colors"
            >
              <ArrowLeft size={14} /> Back to site
            </Link>
            <h1 className="font-display font-semibold text-2xl text-paper-50">
              Project Manager
            </h1>
            <p className="font-mono text-[11px] text-fog-500 mt-1">
              signed in as {user.email} · source: {source}
            </p>
          </div>
          <button
            type="button"
            onClick={signOut}
            className="hairline inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-fog-400 hover:text-paper-50 transition-colors"
          >
            <LogOut size={14} /> Sign out
          </button>
        </div>

        {projectsLoading ? (
          <p className="font-mono text-sm text-fog-400">Loading…</p>
        ) : editing ? (
          <ProjectEditor
            project={editing === "new" ? null : editing}
            onCancel={() => setEditing(null)}
            onSaved={() => {
              setEditing(null);
              refresh();
            }}
          />
        ) : (
          <ProjectList
            projects={projects}
            onEdit={setEditing}
            onAddNew={() => setEditing("new")}
            onDeleted={refresh}
          />
        )}
      </div>
    </div>
  );
}
