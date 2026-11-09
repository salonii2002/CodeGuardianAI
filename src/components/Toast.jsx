
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

function Toast({ message, type = "success", onClose }) {
  if (!message) return null;

  const config = {
    success: {
      icon: CheckCircle2,
      style: "border-emerald-500/30 text-emerald-400"
    },
    error: {
      icon: AlertCircle,
      style: "border-red-500/30 text-red-400"
    },
    info: {
      icon: Info,
      style: "border-blue-500/30 text-blue-400"
    }
  };

  const item = config[type] || config.info;
  const Icon = item.icon;

  return (
    <div className={`flex items-center gap-3 rounded-lg border bg-[#111B2E] px-4 py-3 shadow-xl ${item.style}`}>
      <Icon size={18} />
      <p className="flex-1 text-sm">{message}</p>

      {onClose && (
        <button type="button" onClick={onClose} aria-label="Close notification">
          <X size={16} />
        </button>
      )}
    </div>
  );
}

export default Toast;
