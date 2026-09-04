import { Pencil, Trash2, Star, ExternalLink, Plus } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";

export default function ProjectList({ projects, onEdit, onDeleted, onAddNew }) {
  async function handleDelete(id, title) {
    if (!window.confirm(`Delete "${title}"? This can't be undone.`)) return;
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) {
      window.alert(error.message);
      return;
    }
    onDeleted();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="font-mono text-[13px] text-fog-400">{projects.length} project(s)</p>
        <button
          type="button"
          onClick={onAddNew}
          className="inline-flex items-center gap-2 rounded-lg bg-signal-500 px-4 py-2 text-sm font-medium text-ink-950 hover:bg-signal-400 transition-colors"
        >
          <Plus size={14} /> Add project
        </button>
      </div>

      <div className="space-y-2">
        {projects.map((p) => (
          <div
            key={p.id}
            className="hairline rounded-lg px-4 py-3 surface flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-10 w-14 shrink-0 rounded-md overflow-hidden hairline bg-ink-800/60">
                {p.image && <img src={p.image} alt="" className="h-full w-full object-cover" />}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-paper-50 font-medium truncate">{p.title}</p>
                  {p.featured && <Star size={12} className="text-warn-500 shrink-0" fill="currentColor" />}
                </div>
                <p className="font-mono text-[11px] text-fog-500 truncate">
                  {p.category} · {p.status} · {p.year}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              {p.live && (
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-fog-400 hover:text-paper-50"
                  aria-label="Open live site"
                >
                  <ExternalLink size={15} />
                </a>
              )}
              <button
                type="button"
                onClick={() => onEdit(p)}
                className="p-2 text-fog-400 hover:text-signal-400"
                aria-label={`Edit ${p.title}`}
              >
                <Pencil size={15} />
              </button>
              <button
                type="button"
                onClick={() => handleDelete(p.id, p.title)}
                className="p-2 text-fog-400 hover:text-warn-500"
                aria-label={`Delete ${p.title}`}
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
