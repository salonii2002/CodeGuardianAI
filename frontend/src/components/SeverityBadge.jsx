
function SeverityBadge({ severity = "Info" }) {
  const normalized = severity.toLowerCase();

  const styles = {
    high: "bg-red-500/10 text-red-400 border-red-500/20",
    critical: "bg-red-500/10 text-red-400 border-red-500/20",
    medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    low: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    info: "bg-slate-500/10 text-slate-400 border-slate-500/20"
  };

  const style = styles[normalized] || styles.info;

  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${style}`}>
      {severity}
    </span>
  );
}

export default SeverityBadge;
