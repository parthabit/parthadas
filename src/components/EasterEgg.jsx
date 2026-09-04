export default function EasterEgg({ show }) {
  if (!show) return null;
  return (
    <div
      className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[110] hairline rounded-lg surface px-4 py-2.5 font-mono text-[12px] text-signal-400 shadow-xl shadow-black/40 animate-fade-up"
      role="status"
    >
      ↑↑↓↓←→←→ba — achievement unlocked: curious developer
    </div>
  );
}
