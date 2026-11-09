
import { Loader2 } from "lucide-react";

function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  className = "",
  type = "button",
  onClick
}) {
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-500",
    secondary: "border border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700",
    danger: "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20",
    ghost: "text-slate-400 hover:bg-slate-800 hover:text-white",
    outline: "border border-blue-500/40 text-blue-400 hover:bg-blue-500/10"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2.5 text-sm",
    lg: "px-5 py-3 text-sm"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {loading && <Loader2 size={16} className="animate-spin" />}
      {children}
    </button>
  );
}

export default Button;
