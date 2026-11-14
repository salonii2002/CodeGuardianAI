
import { useMemo, useState } from "react";
import {
  Activity, Search, Download, GitBranch, ShieldCheck,
  Settings, Users, FileText, Clock, X
} from "lucide-react";

const initialEvents = [
  { id: 1, actor: "Saloni", action: "Repository added", target: "payment-service", category: "Repository", time: "09:42 AM", date: "2026-11-08", status: "Success", detail: "A sample repository was added to the demonstration workspace." },
  { id: 2, actor: "Security Agent", action: "Finding detected", target: "SEC-1042 · Hardcoded API key", category: "Analysis", time: "09:36 AM", date: "2026-11-08", status: "Warning", detail: "A sample security finding was generated during the demonstration analysis." },
  { id: 3, actor: "Saloni", action: "Review approved", target: "PR #142", category: "Review", time: "09:30 AM", date: "2026-11-08", status: "Success", detail: "A sample review decision was recorded locally." },
  { id: 4, actor: "Quality Agent", action: "Quality check completed", target: "payment-service", category: "Analysis", time: "09:15 AM", date: "2026-11-08", status: "Success", detail: "Example quality review completed. No real scanner was executed." },
  { id: 5, actor: "Saloni", action: "Workspace settings viewed", target: "Review settings", category: "Settings", time: "Yesterday", date: "2026-11-07", status: "Info", detail: "Workspace review settings were opened." },
  { id: 6, actor: "Saloni", action: "Team member invited", target: "developer@example.com", category: "Team", time: "Yesterday", date: "2026-11-07", status: "Pending", detail: "A demonstration invitation was added locally." },
  { id: 7, actor: "Documentation Agent", action: "Documentation review", target: "backend-api", category: "Analysis", time: "Nov 06", date: "2026-11-06", status: "Success", detail: "Example documentation review event." }
];

const icons = {
  Repository: GitBranch,
  Analysis: ShieldCheck,
  Review: FileText,
  Settings,
  Team: Users
};

function ActivityLog() {
  const [events] = useState(initialEvents);  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [selected, setSelected] = useState(null);

  const filteredEvents = useMemo(() => events.filter((event) => {
    const text = `${event.actor} ${event.action} ${event.target}`.toLowerCase();
    return text.includes(query.toLowerCase()) &&
      (category === "All" || event.category === category) &&
      (status === "All" || event.status === status);
  }), [events, query, category, status]);

  const exportCSV = () => {
    const headers = ["Actor", "Action", "Target", "Category", "Date", "Time", "Status"];
    const rows = events.map((event) => [
      event.actor, event.action, event.target, event.category,
      event.date, event.time, event.status
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(","))
      .join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "codeguardian-activity-demo.csv";
    anchor.click();
    setTimeout(() => {
       URL.revokeObjectURL(url);
    }, 1000);
  };

  const clearFilters = () => {
    setQuery("");
    setCategory("All");
    setStatus("All");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-cyan-400">WORKSPACE / AUDIT</p>
          <h1 className="mt-1 text-3xl font-bold text-white">Activity Log</h1>
          <p className="mt-2 text-sm text-slate-400">Track repository, review, agent, and workspace events.</p>
        </div>
        <button onClick={exportCSV} className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm text-white hover:bg-blue-500">
          <Download size={16} /> Export log
        </button>
      </div>

      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-sm text-amber-200">
        Sample audit events only. Production audit records must be stored and retrieved from the backend.
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          ["Total events", events.length],
          ["Successful events", events.filter((event) => event.status === "Success").length],
          ["Warnings", events.filter((event) => event.status === "Warning").length]
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-slate-700 bg-[#111B2E] p-5">
            <p className="text-sm text-slate-400">{label}</p>
            <p className="mt-3 text-3xl font-bold text-white">{value}</p>
          </div>
        ))}
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-700 bg-[#111B2E]">
        <div className="grid gap-3 border-b border-slate-700 p-4 md:grid-cols-[1fr_170px_150px_auto]">
          <div className="relative">
            <Search size={17} className="absolute left-3 top-3 text-slate-500" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search events, actors, targets..." className="w-full rounded-lg border border-slate-700 bg-[#080D18] py-2.5 pl-10 pr-3 text-sm text-white outline-none focus:border-cyan-400" />
          </div>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-lg border border-slate-700 bg-[#080D18] px-3 py-2.5 text-sm text-white">
            {["All", "Repository", "Analysis", "Review", "Settings", "Team"].map((item) => <option key={item}>{item}</option>)}
          </select>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-lg border border-slate-700 bg-[#080D18] px-3 py-2.5 text-sm text-white">
            {["All", "Success", "Warning", "Info", "Pending"].map((item) => <option key={item}>{item}</option>)}
          </select>
          <button onClick={clearFilters} className="rounded-lg border border-slate-600 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800">Clear</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-left text-sm">
            <thead className="bg-[#17243A] text-xs uppercase text-slate-400">
              <tr><th className="p-4">Event</th><th className="p-4">Actor</th><th className="p-4">Category</th><th className="p-4">Time</th><th className="p-4">Status</th><th className="p-4">Details</th></tr>
            </thead>
            <tbody>
              {filteredEvents.map((event) => {
                const Icon = icons[event.category] || Activity;
                return (
                  <tr key={event.id} className="border-t border-slate-700 text-slate-300">
                    <td className="p-4"><div className="flex items-center gap-3"><span className="rounded-lg bg-cyan-500/10 p-2 text-cyan-300"><Icon size={17} /></span><div><p className="font-medium text-white">{event.action}</p><p className="mt-1 text-xs text-slate-500">{event.target}</p></div></div></td>
                    <td className="p-4">{event.actor}</td>
                    <td className="p-4">{event.category}</td>
                    <td className="p-4"><span className="flex items-center gap-2 text-xs text-slate-400"><Clock size={13} />{event.time}</span><span className="mt-1 block text-xs text-slate-500">{event.date}</span></td>
                    <td className="p-4"><span className={`rounded-full px-2.5 py-1 text-xs ${event.status === "Success" ? "bg-emerald-500/10 text-emerald-300" : event.status === "Warning" ? "bg-amber-500/10 text-amber-300" : "bg-slate-700 text-slate-300"}`}>{event.status}</span></td>
                    <td className="p-4"><button onClick={() => setSelected(event)} className="text-cyan-300 hover:text-cyan-200">View</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredEvents.length === 0 && <p className="p-10 text-center text-sm text-slate-500">No activity matches your filters.</p>}
        </div>
        <div className="border-t border-slate-700 p-4 text-xs text-slate-500">Showing {filteredEvents.length} of {events.length} demonstration events.</div>
      </section>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-lg rounded-2xl border border-slate-700 bg-[#111B2E] p-6">
            <div className="flex items-center justify-between"><h2 className="text-lg font-semibold text-white">Activity details</h2><button onClick={() => setSelected(null)} className="text-slate-400"><X /></button></div>
            <p className="mt-5 text-sm font-semibold text-cyan-300">{selected.action}</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{selected.detail}</p>
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-[#17243A] p-3"><p className="text-xs text-slate-500">Actor</p><p className="mt-1 text-white">{selected.actor}</p></div>
              <div className="rounded-lg bg-[#17243A] p-3"><p className="text-xs text-slate-500">Category</p><p className="mt-1 text-white">{selected.category}</p></div>
              <div className="rounded-lg bg-[#17243A] p-3"><p className="text-xs text-slate-500">Target</p><p className="mt-1 break-words text-white">{selected.target}</p></div>
              <div className="rounded-lg bg-[#17243A] p-3"><p className="text-xs text-slate-500">Status</p><p className="mt-1 text-white">{selected.status}</p></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ActivityLog;
