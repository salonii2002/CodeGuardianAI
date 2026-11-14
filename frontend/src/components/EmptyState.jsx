
import { FolderOpen } from "lucide-react";

function EmptyState({
  title = "Nothing here yet",
  description = "Data will appear here when it becomes available.",
  action,
  icon: Icon = FolderOpen
}) {
  return (
    <div className="flex min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-[#111B2E]/50 px-6 py-10 text-center">
      <div className="mb-4 rounded-xl bg-slate-800 p-4">
        <Icon size={28} className="text-slate-400" />
      </div>

      <h3 className="text-base font-semibold text-white">{title}</h3>

      <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
        {description}
      </p>

      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export default EmptyState;
