import portfolioConfig from "../data/portfolio";
import { education } from "../data/education";
import Reveal from "./Reveal";

export default function About() {
  const { about, location } = portfolioConfig;
  const primaryEducation = education[0];

  return (
    <section id="about" className="py-24 sm:py-28 border-t border-ink-800/60 scroll-mt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
        <div className="flex items-baseline gap-3 mb-12">
          <span className="font-mono text-signal-400 text-sm">01</span>
          <h2 className="font-display font-semibold text-2xl sm:text-3xl text-paper-50">
            About Me
          </h2>
        </div>
        </Reveal>

        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-12">
          <Reveal delay={80} className="space-y-5 text-fog-400 leading-relaxed">
            <p className="text-lg text-paper-400">{about.summary}</p>
            <p>{about.focus}</p>
            <p>{about.philosophy}</p>
          </Reveal>

          <Reveal delay={160} className="space-y-5">
            {primaryEducation && (
              <div className="hairline rounded-xl p-5 surface">
                <p className="font-mono text-[11px] text-signal-400 mb-1">EDUCATION</p>
                <p className="text-paper-50 font-medium">{primaryEducation.title}</p>
                {primaryEducation.place && (
                  <p className="text-sm text-fog-400 mt-0.5">{primaryEducation.place}</p>
                )}
                {primaryEducation.period && (
                  <p className="text-xs font-mono text-fog-500 mt-1">{primaryEducation.period}</p>
                )}
              </div>
            )}

            {location && (
              <div className="hairline rounded-xl p-5 surface">
                <p className="font-mono text-[11px] text-signal-400 mb-1">LOCATION</p>
                <p className="text-paper-50 font-medium">{location}</p>
              </div>
            )}

            <div className="hairline rounded-xl p-5 surface">
              <p className="font-mono text-[11px] text-signal-400 mb-3">INTERESTS</p>
              <ul className="flex flex-wrap gap-2">
                {about.interests.map((interest) => (
                  <li
                    key={interest}
                    className="font-mono text-[11.5px] px-2.5 py-1 rounded-md bg-ink-800/70 text-paper-400"
                  >
                    {interest}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
