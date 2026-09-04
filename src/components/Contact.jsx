import { useState } from "react";
import { Mail, Phone, Github, Linkedin, Copy, Check, Send } from "lucide-react";
import portfolioConfig from "../data/portfolio";

const initialForm = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [copied, setCopied] = useState(false);

  const hasEndpoint = Boolean(portfolioConfig.contact.formEndpoint);

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!hasEndpoint) {
      // No backend configured — fall back to opening the visitor's mail client.
      const body = `${form.message}\n\n— ${form.name} (${form.email})`;
      window.location.href = `${portfolioConfig.emailHref}?subject=${encodeURIComponent(
        form.subject || "Portfolio contact"
      )}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(portfolioConfig.contact.formEndpoint, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      setForm(initialForm);
    } catch {
      setStatus("error");
    }
  }

  function copyEmail() {
    navigator.clipboard.writeText(portfolioConfig.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  return (
    <section id="contact" className="py-24 sm:py-28 border-t border-ink-800/60 scroll-mt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-baseline gap-3 mb-6">
          <span className="font-mono text-signal-400 text-sm">06</span>
          <h2 className="font-display font-semibold text-2xl sm:text-3xl text-paper-50">
            Contact
          </h2>
        </div>
        <p className="text-fog-400 max-w-xl mb-12">Let's build something useful together.</p>

        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-10">
          <div className="space-y-3">
            <div className="hairline rounded-xl p-5 surface flex items-center justify-between gap-3">
              <a
                href={portfolioConfig.emailHref}
                className="flex items-center gap-3 text-paper-50 hover:text-signal-400 transition-colors min-w-0"
              >
                <Mail size={17} className="shrink-0" />
                <span className="truncate">{portfolioConfig.email}</span>
              </a>
              <button
                type="button"
                onClick={copyEmail}
                aria-label="Copy email address"
                className="shrink-0 hairline rounded-md p-1.5 text-fog-400 hover:text-paper-50 transition-colors relative"
              >
                {copied ? <Check size={14} className="text-ok-500" /> : <Copy size={14} />}
                {copied && (
                  <span className="absolute -top-8 right-0 font-mono text-[10px] bg-ink-800 text-paper-50 px-2 py-1 rounded whitespace-nowrap">
                    Copied!
                  </span>
                )}
              </button>
            </div>

            <a
              href={portfolioConfig.phoneHref}
              className="hairline rounded-xl p-5 surface flex items-center gap-3 text-paper-50 hover:text-signal-400 transition-colors"
            >
              <Phone size={17} /> {portfolioConfig.phone}
            </a>

            <a
              href={portfolioConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hairline rounded-xl p-5 surface flex items-center gap-3 text-paper-50 hover:text-signal-400 transition-colors"
            >
              <Linkedin size={17} /> LinkedIn
            </a>

            <a
              href={portfolioConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hairline rounded-xl p-5 surface flex items-center gap-3 text-paper-50 hover:text-signal-400 transition-colors"
            >
              <Github size={17} /> GitHub
            </a>
          </div>

          <form onSubmit={handleSubmit} className="hairline rounded-xl p-6 surface space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="font-mono text-[11px] text-fog-400 block mb-1.5">
                  Name
                </label>
                <input
                  id="name"
                  required
                  value={form.name}
                  onChange={update("name")}
                  className="w-full rounded-lg bg-ink-800/60 hairline px-3.5 py-2.5 text-sm text-paper-50 placeholder:text-fog-500 focus:border-signal-500/60"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="font-mono text-[11px] text-fog-400 block mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={update("email")}
                  className="w-full rounded-lg bg-ink-800/60 hairline px-3.5 py-2.5 text-sm text-paper-50 placeholder:text-fog-500 focus:border-signal-500/60"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="font-mono text-[11px] text-fog-400 block mb-1.5">
                Subject
              </label>
              <input
                id="subject"
                value={form.subject}
                onChange={update("subject")}
                className="w-full rounded-lg bg-ink-800/60 hairline px-3.5 py-2.5 text-sm text-paper-50 placeholder:text-fog-500 focus:border-signal-500/60"
                placeholder="What's this about?"
              />
            </div>
            <div>
              <label htmlFor="message" className="font-mono text-[11px] text-fog-400 block mb-1.5">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={form.message}
                onChange={update("message")}
                className="w-full rounded-lg bg-ink-800/60 hairline px-3.5 py-2.5 text-sm text-paper-50 placeholder:text-fog-500 focus:border-signal-500/60 resize-none"
                placeholder="Tell me a bit about what you're building…"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center gap-2 rounded-lg bg-signal-500 px-5 py-2.5 text-sm font-medium text-ink-950 hover:bg-signal-400 transition-colors disabled:opacity-60"
            >
              <Send size={14} />
              {status === "sending" ? "Sending…" : "Send Message"}
            </button>

            {status === "sent" && (
              <p className="font-mono text-[12px] text-ok-500">
                Message sent — thanks for reaching out.
              </p>
            )}
            {status === "error" && (
              <p className="font-mono text-[12px] text-warn-500">
                Something went wrong. Please email me directly instead.
              </p>
            )}
            {!hasEndpoint && (
              <p className="font-mono text-[11px] text-fog-500">
                Sending opens your email client — no form backend is configured yet.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
