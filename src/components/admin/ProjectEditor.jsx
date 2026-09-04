import { useState } from "react";
import { Upload, X, Save, Loader2 } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import { uploadProjectImage } from "../../lib/uploadImage";
import ProjectCard from "../ProjectCard";

const CATEGORIES = ["Web", "AI/ML", "JavaScript", "Python", "Other"];
const STATUSES = ["Completed", "In Progress", "Archived"];

const emptyProject = {
  id: "",
  title: "",
  category: "Web",
  description: "",
  longDescription: "",
  image: "",
  technologies: [],
  github: "",
  live: "",
  video: null,
  featured: false,
  status: "Completed",
  year: String(new Date().getFullYear()),
  problem: "",
  solution: "",
  features: [],
  challenges: "",
  improvements: "",
  screenshots: [],
};

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function ProjectEditor({ project, onSaved, onCancel }) {
  const isNew = !project;
  const [form, setForm] = useState(() => ({ ...emptyProject, ...project }));
  const [techInput, setTechInput] = useState((project?.technologies || []).join(", "));
  const [featureInput, setFeatureInput] = useState((project?.features || []).join("\n"));
  const [videoUrl, setVideoUrl] = useState(project?.video?.url || "");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function update(field) {
    return (e) => {
      const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
      setForm((f) => ({ ...f, [field]: value, ...(field === "title" && isNew ? { id: slugify(value) } : {}) }));
    };
  }

  async function handleImageUpload(e, field) {
    const file = e.target.files?.[0];
    if (!file || !form.id) return;
    setUploading(true);
    setError("");
    try {
      const url = await uploadProjectImage(file, form.id);
      if (field === "image") {
        setForm((f) => ({ ...f, image: url }));
      } else {
        setForm((f) => ({ ...f, screenshots: [...(f.screenshots || []), url] }));
      }
    } catch (err) {
      setError(err.message || "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  function removeScreenshot(url) {
    setForm((f) => ({ ...f, screenshots: f.screenshots.filter((s) => s !== url) }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.id) {
      setError("Title (and generated ID) is required.");
      return;
    }
    setSaving(true);
    setError("");

    const technologies = techInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const features = featureInput
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);
    const video = videoUrl ? { type: guessVideoType(videoUrl), url: videoUrl } : null;

    const row = {
      id: form.id,
      title: form.title,
      category: form.category,
      description: form.description || null,
      long_description: form.longDescription || null,
      image: form.image || null,
      technologies,
      github: form.github || null,
      live: form.live || null,
      video,
      featured: Boolean(form.featured),
      status: form.status,
      year: form.year || null,
      problem: form.problem || null,
      solution: form.solution || null,
      features,
      challenges: form.challenges || null,
      improvements: form.improvements || null,
      screenshots: form.screenshots || [],
    };

    const { error: saveError } = await supabase.from("projects").upsert(row);
    setSaving(false);
    if (saveError) {
      setError(saveError.message);
      return;
    }
    onSaved();
  }

  const previewProject = {
    ...form,
    technologies: techInput.split(",").map((t) => t.trim()).filter(Boolean),
  };

  return (
    <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="font-mono text-[11px] text-fog-400 block mb-1.5">Title *</label>
            <input
              required
              value={form.title}
              onChange={update("title")}
              className="w-full rounded-lg bg-ink-800/60 hairline px-3.5 py-2.5 text-sm text-paper-50 focus:border-signal-500/60"
            />
          </div>
          <div>
            <label className="font-mono text-[11px] text-fog-400 block mb-1.5">
              ID / slug {!isNew && "(locked)"}
            </label>
            <input
              required
              disabled={!isNew}
              value={form.id}
              onChange={(e) => setForm((f) => ({ ...f, id: slugify(e.target.value) }))}
              className="w-full rounded-lg bg-ink-800/60 hairline px-3.5 py-2.5 text-sm text-paper-50 focus:border-signal-500/60 disabled:opacity-50"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="font-mono text-[11px] text-fog-400 block mb-1.5">Category</label>
            <select
              value={form.category}
              onChange={update("category")}
              className="w-full rounded-lg bg-ink-800/60 hairline px-3.5 py-2.5 text-sm text-paper-50 focus:border-signal-500/60"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="font-mono text-[11px] text-fog-400 block mb-1.5">Status</label>
            <select
              value={form.status}
              onChange={update("status")}
              className="w-full rounded-lg bg-ink-800/60 hairline px-3.5 py-2.5 text-sm text-paper-50 focus:border-signal-500/60"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="font-mono text-[11px] text-fog-400 block mb-1.5">Year</label>
            <input
              value={form.year}
              onChange={update("year")}
              className="w-full rounded-lg bg-ink-800/60 hairline px-3.5 py-2.5 text-sm text-paper-50 focus:border-signal-500/60"
            />
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-paper-400">
          <input type="checkbox" checked={form.featured} onChange={update("featured")} className="accent-signal-500" />
          Featured on homepage
        </label>

        <div>
          <label className="font-mono text-[11px] text-fog-400 block mb-1.5">
            Short description (for the card)
          </label>
          <textarea
            rows={2}
            value={form.description}
            onChange={update("description")}
            className="w-full rounded-lg bg-ink-800/60 hairline px-3.5 py-2.5 text-sm text-paper-50 focus:border-signal-500/60 resize-none"
          />
        </div>

        <div>
          <label className="font-mono text-[11px] text-fog-400 block mb-1.5">
            Long description (for the detail page)
          </label>
          <textarea
            rows={4}
            value={form.longDescription}
            onChange={update("longDescription")}
            className="w-full rounded-lg bg-ink-800/60 hairline px-3.5 py-2.5 text-sm text-paper-50 focus:border-signal-500/60 resize-none"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="font-mono text-[11px] text-fog-400 block mb-1.5">Problem</label>
            <textarea
              rows={3}
              value={form.problem}
              onChange={update("problem")}
              className="w-full rounded-lg bg-ink-800/60 hairline px-3.5 py-2.5 text-sm text-paper-50 focus:border-signal-500/60 resize-none"
            />
          </div>
          <div>
            <label className="font-mono text-[11px] text-fog-400 block mb-1.5">Solution</label>
            <textarea
              rows={3}
              value={form.solution}
              onChange={update("solution")}
              className="w-full rounded-lg bg-ink-800/60 hairline px-3.5 py-2.5 text-sm text-paper-50 focus:border-signal-500/60 resize-none"
            />
          </div>
        </div>

        <div>
          <label className="font-mono text-[11px] text-fog-400 block mb-1.5">
            Technologies (comma separated)
          </label>
          <input
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            placeholder="React, Node.js, PostgreSQL"
            className="w-full rounded-lg bg-ink-800/60 hairline px-3.5 py-2.5 text-sm text-paper-50 focus:border-signal-500/60"
          />
        </div>

        <div>
          <label className="font-mono text-[11px] text-fog-400 block mb-1.5">
            Features (one per line)
          </label>
          <textarea
            rows={3}
            value={featureInput}
            onChange={(e) => setFeatureInput(e.target.value)}
            className="w-full rounded-lg bg-ink-800/60 hairline px-3.5 py-2.5 text-sm text-paper-50 focus:border-signal-500/60 resize-none"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="font-mono text-[11px] text-fog-400 block mb-1.5">GitHub URL</label>
            <input
              value={form.github}
              onChange={update("github")}
              placeholder="https://github.com/..."
              className="w-full rounded-lg bg-ink-800/60 hairline px-3.5 py-2.5 text-sm text-paper-50 focus:border-signal-500/60"
            />
          </div>
          <div>
            <label className="font-mono text-[11px] text-fog-400 block mb-1.5">Live URL</label>
            <input
              value={form.live}
              onChange={update("live")}
              placeholder="https://..."
              className="w-full rounded-lg bg-ink-800/60 hairline px-3.5 py-2.5 text-sm text-paper-50 focus:border-signal-500/60"
            />
          </div>
        </div>

        <div>
          <label className="font-mono text-[11px] text-fog-400 block mb-1.5">
            Video URL (YouTube, Vimeo, or MP4)
          </label>
          <input
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://youtube.com/watch?v=..."
            className="w-full rounded-lg bg-ink-800/60 hairline px-3.5 py-2.5 text-sm text-paper-50 focus:border-signal-500/60"
          />
        </div>

        <div>
          <label className="font-mono text-[11px] text-fog-400 block mb-1.5">Cover image</label>
          <div className="flex items-center gap-3">
            {form.image && (
              <img src={form.image} alt="Cover preview" className="h-14 w-20 object-cover rounded-md hairline" />
            )}
            <label className="hairline rounded-lg px-3.5 py-2.5 text-sm text-paper-50 hover:border-signal-500/50 cursor-pointer inline-flex items-center gap-2">
              <Upload size={14} />
              {uploading ? "Uploading…" : "Upload image"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={!form.id || uploading}
                onChange={(e) => handleImageUpload(e, "image")}
              />
            </label>
          </div>
          {!form.id && (
            <p className="font-mono text-[11px] text-fog-500 mt-1.5">
              Enter a title first so images have somewhere to go.
            </p>
          )}
        </div>

        <div>
          <label className="font-mono text-[11px] text-fog-400 block mb-1.5">Screenshots</label>
          <div className="flex flex-wrap gap-3 mb-2">
            {(form.screenshots || []).map((src) => (
              <div key={src} className="relative">
                <img src={src} alt="Screenshot" className="h-16 w-24 object-cover rounded-md hairline" />
                <button
                  type="button"
                  onClick={() => removeScreenshot(src)}
                  className="absolute -top-1.5 -right-1.5 bg-ink-950 hairline rounded-full p-0.5 text-fog-400 hover:text-warn-500"
                >
                  <X size={11} />
                </button>
              </div>
            ))}
          </div>
          <label className="hairline rounded-lg px-3.5 py-2.5 text-sm text-paper-50 hover:border-signal-500/50 cursor-pointer inline-flex items-center gap-2 w-fit">
            <Upload size={14} />
            Add screenshot
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={!form.id || uploading}
              onChange={(e) => handleImageUpload(e, "screenshots")}
            />
          </label>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="font-mono text-[11px] text-fog-400 block mb-1.5">Challenges</label>
            <textarea
              rows={2}
              value={form.challenges}
              onChange={update("challenges")}
              className="w-full rounded-lg bg-ink-800/60 hairline px-3.5 py-2.5 text-sm text-paper-50 focus:border-signal-500/60 resize-none"
            />
          </div>
          <div>
            <label className="font-mono text-[11px] text-fog-400 block mb-1.5">
              Future improvements
            </label>
            <textarea
              rows={2}
              value={form.improvements}
              onChange={update("improvements")}
              className="w-full rounded-lg bg-ink-800/60 hairline px-3.5 py-2.5 text-sm text-paper-50 focus:border-signal-500/60 resize-none"
            />
          </div>
        </div>

        {error && <p className="font-mono text-[12px] text-warn-500">{error}</p>}

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-signal-500 px-5 py-2.5 text-sm font-medium text-ink-950 hover:bg-signal-400 transition-colors disabled:opacity-60"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {saving ? "Saving…" : "Save project"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="hairline rounded-lg px-5 py-2.5 text-sm text-fog-400 hover:text-paper-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Live preview */}
      <div className="lg:sticky lg:top-24 h-fit">
        <p className="font-mono text-[11px] text-signal-400 mb-3">LIVE PREVIEW</p>
        <ProjectCard project={previewProject} />
      </div>
    </div>
  );
}

function guessVideoType(url) {
  if (/youtube\.com|youtu\.be/.test(url)) return "youtube";
  if (/vimeo\.com/.test(url)) return "vimeo";
  if (/\.mp4($|\?)/.test(url)) return "mp4";
  return "link";
}
