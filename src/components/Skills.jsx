import skillCategories from "../data/skills";
import Reveal from "./Reveal";

export default function Skills() {
  const visibleCategories = skillCategories.filter((c) => c.skills.length > 0);
  if (visibleCategories.length === 0) return null;

  return (
    <section id="skills" className="py-24 sm:py-28 border-t border-ink-800/60 scroll-mt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
        <div className="flex items-baseline gap-3 mb-12">
          <span className="font-mono text-signal-400 text-sm">02</span>
          <h2 className="font-display font-semibold text-2xl sm:text-3xl text-paper-50">
            Skills
          </h2>
        </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {visibleCategories.map((cat, i) => (
            <Reveal key={cat.id} delay={i * 60}>
            <div
              className="hairline rounded-xl p-5 surface hover:border-signal-500/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-signal-500/10 transition-all duration-300"
            >
              <p className="font-mono text-[11px] text-fog-500 mb-1">{cat.eyebrow}</p>
              <h3 className="font-display font-medium text-paper-50 mb-4">{cat.label}</h3>
              <ul className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="font-mono text-[11.5px] px-2.5 py-1 rounded-md bg-ink-800/70 text-paper-400"
                  >
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
