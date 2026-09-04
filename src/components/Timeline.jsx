export default function Timeline({ label, entries }) {
  if (!entries || entries.length === 0) return null;

  return (
    <div>
      <p className="font-mono text-[11px] text-signal-400 mb-4">{label}</p>
      <ol className="space-y-6 border-l border-ink-800 pl-6">
        {entries.map((entry) => (
          <li key={entry.id} className="relative">
            <span className="absolute -left-[29px] top-1 h-2.5 w-2.5 rounded-full bg-signal-500 ring-4 ring-ink-950" />
            <p className="text-paper-50 font-medium">{entry.title}</p>
            {entry.place && <p className="text-sm text-fog-400 mt-0.5">{entry.place}</p>}
            {entry.period && (
              <p className="text-xs font-mono text-fog-500 mt-1">{entry.period}</p>
            )}
            {entry.description && (
              <p className="text-sm text-fog-400 mt-2 leading-relaxed">{entry.description}</p>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
