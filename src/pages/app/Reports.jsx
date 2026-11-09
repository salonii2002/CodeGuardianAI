
import { useMemo, useState } from "react";
import {
  FileText, Download, Search, ShieldAlert, CheckCircle2,
  CalendarDays, Eye, X, Filter
} from "lucide-react";

const sampleReports = [
  { id: "RPT-2026-0142", title: "Payment Service Security Review", repo: "payment-service", pr: "#142", date: "2026-11-08", status: "Completed", high: 2, medium: 3, low: 1, summary: "Example report covering a hardcoded secret, input validation, and payment response handling." },
  { id: "RPT-2026-0139", title: "Authentication Review", repo: "auth-service", pr: "#139", date: "2026-11-07", status: "Completed", high: 1, medium: 2, low: 2, summary: "Example report covering login validation and authentication test scenarios." },
  { id: "RPT-2026-0136", title: "Backend API Review", repo: "backend-api", pr: "#136", date: "2026-11-06", status: "Completed", high: 1, medium: 1, low: 3, summary: "Example report covering API input handling and documentation." },
  { id: "RPT-2026-0132", title: "Frontend Dashboard Review", repo: "frontend-dashboard", pr: "#132", date: "2026-11-04", status: "Needs attention", high: 3, medium: 2, low: 1, summary: "Example report with unresolved high-severity findings." },
  { id: "RPT-2026-0128", title: "Notification Engine Review", repo: "notification-engine", pr: "#128", date: "2026-11-02", status: "Completed", high: 0, medium: 1, low: 2, summary: "Example report with lower-severity quality and documentation findings." }
];

function Reports() {
  const [reports] = useState(sampleReports);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [selected, setSelected] = useState(null);

  const visibleReports = useMemo(() => reports.filter((report) => {
    const matches = `${report.id} ${report.title} ${report.repo} ${report.pr}`.toLowerCase().includes(query.toLowerCase());
    return matches && (status === "All" || report.status === status);
  }), [reports, query, status]);

  const totals = reports.reduce((acc, report) => ({
    high: acc.high + report.high,
    medium: acc.medium + report.medium,
    low: acc.low + report.low
  }), { high: 0, medium: 0, low: 0 });

  const downloadReport = (report) => {
    const content = [
      "CODEGUARDIAN AI - DEMONSTRATION REPORT",
      `Report ID: ${report.id}`,
      `Title: ${report.title}`,
      `Repository: ${report.repo}`,
      `Pull request: ${report.pr}`,
      `Date: ${report.date}`,
      `Status: ${report.status}`,
      "",
      `High findings: ${report.high}`,
      `Medium findings: ${report.medium}`,
      `Low findings: ${report.low}`,
      "",
      "Summary:",
      report.summary,
      "",
      "Notice: This is sample demonstration data, not a real scanner report."
    ].join("\n");

    const url = URL.createObjectURL(new Blob([content], { type: "text/plain" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${report.id}.txt`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-cyan-400">WORKSPACE / REPORTING</p>
          <h1 className="mt-1 text-3xl font-bold text-white">Reports</h1>
          <p className="mt-2 text-sm text-slate-400">Review generated summaries and security findings across pull requests.</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-slate-700 bg-[#111B2E] px-3 py-2 text-sm text-slate-300"><CalendarDays size={16} /> November 2026</div>
      </div>

      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-sm text-amber-200">
        The reports below are sample data for frontend demonstration. Real reports will come from your Flask backend and scanner pipeline.
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Total reports", value: reports.length, icon: FileText },
          { label: "High findings", value: totals.high, icon: ShieldAlert },
          { label: "Medium findings", value: totals.medium, icon: Filter },
          { label: "Completed reports", value: reports.filter((report) => report.status === "Completed").length, icon: CheckCircle2 }
        ].map((item) => {
          const Icon = item.icon;
          return <div key={item.label} className="rounded-2xl border border-slate-700 bg-[#111B2E] p-5">
            <div className="flex justify-between text-sm text-slate-400"><span>{item.label}</span><Icon size={18} className="text-cyan-300" /></div>
            <p className="mt-3 text-3xl font-bold text-white">{item.value}</p>
          </div>;
        })}
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-700 bg-[#111B2E]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700 p-5">
          <div><h2 className="font-semibold text-white">Report history</h2><p className="mt-1 text-xs text-slate-500">Browse, inspect, and export review reports.</p></div>
          <span className="text-xs text-slate-500">{visibleReports.length} reports</span>
        </div>
        <div className="grid gap-3 border-b border-slate-700 p-4 md:grid-cols-[1fr_190px]">
          <div className="relative"><Search size={17} className="absolute left-3 top-3 text-slate-500" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search report, repository, or PR..." className="w-full rounded-lg border border-slate-700 bg-[#080D18] py-2.5 pl-10 pr-3 text-sm text-white outline-none focus:border-cyan-400" /></div>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-lg border border-slate-700 bg-[#080D18] px-3 py-2.5 text-sm text-white"><option>All</option><option>Completed</option><option>Needs attention</option></select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="bg-[#17243A] text-xs uppercase text-slate-400"><tr><th className="p-4">Report</th><th className="p-4">Repository / PR</th><th className="p-4">Date</th><th className="p-4">Findings</th><th className="p-4">Status</th><th className="p-4">Actions</th></tr></thead>
            <tbody>{visibleReports.map((report) => (
              <tr key={report.id} className="border-t border-slate-700 text-slate-300">
                <td className="p-4"><p className="font-medium text-white">{report.title}</p><p className="mt-1 text-xs text-slate-500">{report.id}</p></td>
                <td className="p-4">{report.repo}<p className="mt-1 text-xs text-slate-500">{report.pr}</p></td>
                <td className="p-4">{report.date}</td>
                <td className="p-4"><div className="flex gap-2 text-xs"><span className="text-red-300">H: {report.high}</span><span className="text-amber-300">M: {report.medium}</span><span className="text-blue-300">L: {report.low}</span></div></td>
                <td className="p-4"><span className={`rounded-full px-2.5 py-1 text-xs ${report.status === "Completed" ? "bg-emerald-500/10 text-emerald-300" : "bg-amber-500/10 text-amber-300"}`}>{report.status}</span></td>
                <td className="p-4"><div className="flex gap-3"><button onClick={() => setSelected(report)} title="View report" className="text-cyan-300"><Eye size={17} /></button><button onClick={() => downloadReport(report)} title="Download report" className="text-slate-300"><Download size={17} /></button></div></td>
              </tr>
            ))}</tbody>
          </table>
          {visibleReports.length === 0 && <p className="p-10 text-center text-sm text-slate-500">No reports match your search.</p>}
        </div>
      </section>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-xl rounded-2xl border border-slate-700 bg-[#111B2E] p-6">
            <div className="flex items-start justify-between"><div><p className="text-xs text-cyan-300">{selected.id}</p><h2 className="mt-2 text-xl font-semibold text-white">{selected.title}</h2></div><button onClick={() => setSelected(null)} className="text-slate-400"><X /></button></div>
            <p className="mt-4 text-sm leading-6 text-slate-300">{selected.summary}</p>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {[["High", selected.high, "text-red-300"], ["Medium", selected.medium, "text-amber-300"], ["Low", selected.low, "text-blue-300"]].map(([label, value, color]) => <div key={label} className="rounded-lg bg-[#17243A] p-3"><p className={`text-xs ${color}`}>{label}</p><p className="mt-2 text-2xl font-bold text-white">{value}</p></div>)}
            </div>
            <div className="mt-5 flex justify-end"><button onClick={() => downloadReport(selected)} className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white"><Download size={15} /> Download sample</button></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reports;
