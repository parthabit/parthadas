const STATUS_STYLES = {
  Completed: "text-ok-500 bg-ok-500/10 border-ok-500/30",
  "In Progress": "text-warn-500 bg-warn-500/10 border-warn-500/30",
  Archived: "text-fog-400 bg-fog-500/10 border-fog-500/30",
};

export default function StatusBadge({ status }) {
  if (!status) return null;
  const style = STATUS_STYLES[status] || STATUS_STYLES.Archived;
  return (
    <span
      className={`font-mono text-[10.5px] px-2 py-0.5 rounded-full border ${style} whitespace-nowrap`}
    >
      {status}
    </span>
  );
}
