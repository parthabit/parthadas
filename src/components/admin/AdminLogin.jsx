import { useState } from "react";
import { LogIn } from "lucide-react";

export default function AdminLogin({ onSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error: signInError } = await onSignIn(email, password);
    if (signInError) setError(signInError.message);
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-16">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm hairline rounded-xl p-6 surface space-y-4"
      >
        <div>
          <p className="font-mono text-[11px] text-signal-400 mb-1">/admin</p>
          <h1 className="font-display font-semibold text-xl text-paper-50">Sign in</h1>
          <p className="text-sm text-fog-400 mt-1">
            Manage projects, images, and links for the portfolio.
          </p>
        </div>

        <div>
          <label htmlFor="email" className="font-mono text-[11px] text-fog-400 block mb-1.5">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg bg-ink-800/60 hairline px-3.5 py-2.5 text-sm text-paper-50 focus:border-signal-500/60"
          />
        </div>
        <div>
          <label htmlFor="password" className="font-mono text-[11px] text-fog-400 block mb-1.5">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg bg-ink-800/60 hairline px-3.5 py-2.5 text-sm text-paper-50 focus:border-signal-500/60"
          />
        </div>

        {error && <p className="font-mono text-[12px] text-warn-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-signal-500 px-5 py-2.5 text-sm font-medium text-ink-950 hover:bg-signal-400 transition-colors disabled:opacity-60"
        >
          <LogIn size={14} /> {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
