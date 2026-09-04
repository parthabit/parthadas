import { useEffect, useState, lazy, Suspense } from "react";
import { ArrowRight, Github, Mail, Linkedin } from "lucide-react";
import portfolioConfig from "../data/portfolio";

const Hero3D = lazy(() => import("./Hero3D"));

function useTypedRotation(words, { typingMs = 55, pauseMs = 1400, deletingMs = 30 } = {}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState("typing"); // typing | pausing | deleting

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(words[0]);
      return undefined;
    }

    const word = words[index % words.length];
    let timeout;

    if (phase === "typing") {
      if (text.length < word.length) {
        timeout = setTimeout(() => setText(word.slice(0, text.length + 1)), typingMs);
      } else {
        timeout = setTimeout(() => setPhase("pausing"), pauseMs);
      }
    } else if (phase === "pausing") {
      timeout = setTimeout(() => setPhase("deleting"), pauseMs);
    } else if (phase === "deleting") {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(text.slice(0, -1)), deletingMs);
      } else {
        setPhase("typing");
        setIndex((i) => (i + 1) % words.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, phase, index, words, typingMs, pauseMs, deletingMs]);

  return text;
}

export default function Hero() {
  const typed = useTypedRotation(portfolioConfig.roles);

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center overflow-hidden pt-16"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 bg-dot-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_20%,black,transparent)]" />
      <Suspense fallback={null}>
        <Hero3D />
      </Suspense>
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[520px] w-[720px] rounded-full bg-signal-500/10 blur-[110px] animate-glow-pulse" />
      <div className="absolute top-40 right-0 h-[300px] w-[300px] rounded-full bg-muted2-500/10 blur-[100px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 w-full">
        <div className="max-w-3xl animate-fade-up">
          <p className="font-mono text-[13px] text-signal-400 mb-5 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-ok-500" />
            hello, world — I'm
          </p>

          <h1 className="font-display font-semibold text-[clamp(2.5rem,7vw,4.75rem)] leading-[1.02] tracking-tight text-paper-50">
            {portfolioConfig.name}
          </h1>

          <div className="mt-5 font-mono text-lg sm:text-xl text-fog-400 h-8 flex items-center">
            <span className="text-paper-400">{typed}</span>
            <span className="inline-block w-[2px] h-[1.1em] bg-signal-400 ml-1 animate-blink" />
          </div>

          <p className="mt-6 text-base sm:text-lg text-fog-400 max-w-xl leading-relaxed">
            {portfolioConfig.tagline}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 rounded-lg bg-signal-500 px-5 py-3 text-sm font-medium text-ink-950 hover:bg-signal-400 transition-colors"
            >
              View Projects <ArrowRight size={15} />
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="hairline inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-medium text-paper-50 hover:border-signal-500/50 transition-colors"
            >
              <Mail size={15} /> Contact Me
            </a>
            <a
              href={portfolioConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hairline inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-medium text-fog-400 hover:text-paper-50 hover:border-signal-500/50 transition-colors"
            >
              <Github size={15} /> GitHub
            </a>
            <a
              href={portfolioConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hairline inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-medium text-fog-400 hover:text-paper-50 hover:border-signal-500/50 transition-colors"
            >
              <Linkedin size={15} /> LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
