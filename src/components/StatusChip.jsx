
import { CheckCircle2, Circle, Clock3, AlertCircle } from "lucide-react";

function StatusChip({ status = "Pending" }) {
  const normalized = status.toLowerCase();

  const config = {
    live: {
      icon: CheckCircle2,
      style: "bg-emerald-500/10 text-emerald-400",
      label: "Live"
    },
    completed: {
      icon: CheckCircle2,
      style: "bg-emerald-500/10 text-emerald-400",
      label: "Completed"
    },
    beta: {
      icon: Clock3,
      style: "bg-blue-500/10 text-blue-400",
      label: "Beta"
    },
    preview: {
      icon: Clock3,
      style: "bg-amber-500/10 text-amber-400",
      label: "Preview"
    },
    failed: {
      icon: AlertCircle,
      style: "bg-red-500/10 text-red-400",
      label: "Failed"
    },
    pending: {
      icon: Circle,
      style: "bg-slate-500/10 text-slate-400",
      label: "Pending"
    }
  };

  const item = config[normalized] || config.pending;
  const Icon = item.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${item.style}`}>
      <Icon size={13} />
      {item.label}
    </span>
  );
}

export default StatusChip;
