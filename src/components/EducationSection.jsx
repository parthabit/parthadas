import {
  education,
  experience,
  internships,
  certifications,
  achievements,
} from "../data/education";
import Timeline from "./Timeline";

export default function EducationSection() {
  const tracks = [
    { label: "EDUCATION", entries: education },
    { label: "EXPERIENCE", entries: experience },
    { label: "INTERNSHIPS", entries: internships },
    { label: "CERTIFICATIONS", entries: certifications },
    { label: "ACHIEVEMENTS", entries: achievements },
  ].filter((t) => t.entries && t.entries.length > 0);

  if (tracks.length === 0) return null;

  return (
    <section id="education" className="py-24 sm:py-28 border-t border-ink-800/60 scroll-mt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-baseline gap-3 mb-12">
          <span className="font-mono text-signal-400 text-sm">05</span>
          <h2 className="font-display font-semibold text-2xl sm:text-3xl text-paper-50">
            Education & Experience
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-12">
          {tracks.map((t) => (
            <Timeline key={t.label} label={t.label} entries={t.entries} />
          ))}
        </div>
      </div>
    </section>
  );
}
