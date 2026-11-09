
function Badge({ children, variant = "default", className = "" }) {
  const styles = {
    default: "bg-slate-700/50 text-slate-300 border-slate-600",
    success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    danger: "bg-red-500/10 text-red-400 border-red-500/20",
    warning: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    info: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${styles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

export default Badge;
