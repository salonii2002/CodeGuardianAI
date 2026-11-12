
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  AlertTriangle,
  ArrowDownToLine,
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileCode2,
  FileText,
  Filter,
  GitBranch,
  GitPullRequest,
  Search,
  ShieldAlert,
  ShieldCheck,
  X
} from "lucide-react";

const initialReports = [
  {
    id: "RPT-2026-0142",
    title: "Payment Service Security Review",
    repository: "payment-service",
    owner: "demo-org",
    branch: "feature/payment-validation",
    pullRequest: "#142",
    date: "Nov 08, 2026",
    status: "Completed",
    risk: "High",
    findings: { critical: 1, high: 2, medium: 3, low: 2 },
    summary:
      "The review detected a hardcoded API secret and potential input validation issues in the payment workflow.",
    agents: ["Security", "Quality", "Test Gap", "Documentation"]
  },
  {
    id: "RPT-2026-0139",
    title: "Authentication Module Review",
    repository: "auth-service",
    owner: "demo-org",
    branch: "feature/login-security",
    pullRequest: "#139",
    date: "Nov 07, 2026",
    status: "Completed",
    risk: "Medium",
    findings: { critical: 0, high: 1, medium: 2, low: 3 },
    summary:
      "The review identified missing login test coverage and opportunities to improve authentication error handling.",
    agents: ["Security", "Quality", "Test Gap"]
  },
  {
    id: "RPT-2026-0136",
    title: "Backend API Code Review",
    repository: "backend-api",
    owner: "demo-org",
    branch: "feature/api-refactor",
    pullRequest: "#136",
    date: "Nov 06, 2026",
    status: "Completed",
    risk: "Low",
    findings: { critical: 0, high: 0, medium: 1, low: 2 },
    summary:
      "The review found minor code-quality improvements and one recommendation for stronger API response validation.",
    agents: ["Security", "Quality", "Documentation"]
  },
  {
    id: "RPT-2026-0131",
    title: "Notification Engine Review",
    repository: "notification-engine",
    owner: "demo-org",
    branch: "feature/email-retry",
    pullRequest: "#131",
    date: "Nov 04, 2026",
    status: "Completed",
    risk: "Medium",
    findings: { critical: 0, high: 1, medium: 1, low: 2 },
    summary:
      "The review highlighted retry-handling improvements and a potential issue in notification error logging.",
    agents: ["Security", "Quality", "Test Gap", "Documentation"]
  },
  {
    id: "RPT-2026-0128",
    title: "Frontend Dashboard Review",
    repository: "frontend-dashboard",
    owner: "demo-org",
    branch: "feature/dashboard-ui",
    pullRequest: "#128",
    date: "Nov 02, 2026",
    status: "Completed",
    risk: "Low",
    findings: { critical: 0, high: 0, medium: 0, low: 3 },
    summary:
      "The review reported minor accessibility and component-structure recommendations.",
    agents: ["Quality", "Test Gap", "Documentation"]
  }
];

const riskStyles = {
  High: "border-red-500/30 bg-red-500/10 text-red-400",
  Medium: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  Low: "border-blue-500/30 bg-blue-500/10 text-blue-400"
};

const severityItems = [
  {
    key: "critical",
    label: "Critical",
    color: "text-red-400",
    bg: "bg-red-500/10",
    bar: "bg-red-500"
  },
  {
    key: "high",
    label: "High",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    bar: "bg-orange-500"
  },
  {
    key: "medium",
    label: "Medium",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    bar: "bg-amber-400"
  },
  {
    key: "low",
    label: "Low",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    bar: "bg-blue-500"
  }
];

function getFindingTotal(findings) {
  return Object.values(findings).reduce(
    (total, value) => total + value,
    0
  );
}

function escapeCsv(value) {
  return `"${String(value ?? "").replace(/"/g, '""')}"`;
}

function downloadFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;

  document.body.appendChild(link);
  link.click();
  link.remove();

  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function downloadReport(report) {
  const content = [
    "CODEGUARDIAN AI - REVIEW REPORT",
    "",
    `Report ID: ${report.id}`,
    `Title: ${report.title}`,
    `Repository: ${report.owner}/${report.repository}`,
    `Branch: ${report.branch}`,
    `Pull Request: ${report.pullRequest}`,
    `Date: ${report.date}`,
    `Status: ${report.status}`,
    `Risk Level: ${report.risk}`,
    "",
    "FINDINGS SUMMARY",
    `Critical: ${report.findings.critical}`,
    `High: ${report.findings.high}`,
    `Medium: ${report.findings.medium}`,
    `Low: ${report.findings.low}`,
    `Total: ${getFindingTotal(report.findings)}`,
    "",
    "REVIEW SUMMARY",
    report.summary,
    "",
    "ANALYSIS AGENTS",
    report.agents.join(", "),
    "",
    "DEMO NOTICE",
    "This is sample demonstration data. No real repository scan was performed."
  ].join("\n");

  downloadFile(
    `${report.id}.txt`,
    content,
    "text/plain;charset=utf-8"
  );
}

function exportReportsCsv(reports) {
  const headers = [
    "Report ID",
    "Title",
    "Repository",
    "Branch",
    "Pull Request",
    "Date",
    "Status",
    "Risk",
    "Critical",
    "High",
    "Medium",
    "Low",
    "Total Findings"
  ];

  const rows = reports.map((report) => [
    report.id,
    report.title,
    `${report.owner}/${report.repository}`,
    report.branch,
    report.pullRequest,
    report.date,
    report.status,
    report.risk,
    report.findings.critical,
    report.findings.high,
    report.findings.medium,
    report.findings.low,
    getFindingTotal(report.findings)
  ]);

  const csv = [
    headers.map(escapeCsv).join(","),
    ...rows.map((row) => row.map(escapeCsv).join(","))
  ].join("\n");

  downloadFile(
    "CodeGuardian-Review-Reports.csv",
    csv,
    "text/csv;charset=utf-8"
  );
}

function StatCard({ icon: Icon, label, value, note, color }) {
  return (
    <div className="rounded-2xl border border-[#263750] bg-[#111B2E] p-5">
      <div className="flex items-center justify-between">
        <div className={`rounded-xl p-2.5 ${color}`}>
          <Icon size={20} />
        </div>
        <span className="text-xs text-slate-500">Demo data</span>
      </div>

      <p className="mt-5 text-3xl font-bold text-white">{value}</p>
      <p className="mt-1 text-sm font-medium text-slate-300">{label}</p>
      <p className="mt-1 text-xs text-slate-500">{note}</p>
    </div>
  );
}

function ReviewReports() {
  const navigate = useNavigate();

  const [reports] = useState(initialReports);
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedReport, setSelectedReport] = useState(null);

  const filteredReports = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    const result = reports.filter((report) => {
      const matchesSearch =
        !searchText ||
        report.title.toLowerCase().includes(searchText) ||
        report.repository.toLowerCase().includes(searchText) ||
        report.owner.toLowerCase().includes(searchText) ||
        report.id.toLowerCase().includes(searchText) ||
        report.pullRequest.toLowerCase().includes(searchText) ||
        report.branch.toLowerCase().includes(searchText);

      const matchesRisk =
        riskFilter === "All" || report.risk === riskFilter;

      const matchesStatus =
        statusFilter === "All" || report.status === statusFilter;

      return matchesSearch && matchesRisk && matchesStatus;
    });

    return [...result].sort((a, b) => {
      if (sortBy === "most-findings") {
        return getFindingTotal(b.findings) - getFindingTotal(a.findings);
      }

      if (sortBy === "highest-risk") {
        const riskOrder = { High: 3, Medium: 2, Low: 1 };
        return riskOrder[b.risk] - riskOrder[a.risk];
      }

      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      return sortBy === "oldest" ? dateA - dateB : dateB - dateA;
    });
  }, [reports, search, riskFilter, statusFilter, sortBy]);

  const totalFindings = reports.reduce(
    (total, report) => total + getFindingTotal(report.findings),
    0
  );

  const totalCritical = reports.reduce(
    (total, report) => total + report.findings.critical,
    0
  );

  const totalHigh = reports.reduce(
    (total, report) => total + report.findings.high,
    0
  );

  const completedReports = reports.filter(
    (report) => report.status === "Completed"
  ).length;

  const clearFilters = () => {
    setSearch("");
    setRiskFilter("All");
    setStatusFilter("All");
    setSortBy("newest");
  };

  return (
    <div className="mx-auto max-w-7xl space-y-7">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
            <span>Workspace</span>
            <ChevronRight size={14} />
            <span className="text-blue-400">Review Reports</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Review Reports
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            Explore completed code reviews, inspect security findings and
            understand the risk level of each pull request.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => navigate("/app/pull-requests")}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#263750] bg-[#111B2E] px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-blue-500/50 hover:text-white"
          >
            <GitPullRequest size={16} />
            View Pull Requests
          </button>

          <button
            onClick={() => exportReportsCsv(filteredReports)}
            disabled={filteredReports.length === 0}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowDownToLine size={16} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Demo notice */}
      <div className="flex items-start gap-3 rounded-xl border border-blue-500/20 bg-blue-500/[0.06] p-4">
        <Activity
          className="mt-0.5 shrink-0 text-blue-400"
          size={19}
        />
        <div>
          <p className="text-sm font-semibold text-blue-300">
            Demonstration report data
          </p>
          <p className="mt-1 text-xs leading-5 text-slate-400">
            These reports are sample records for the frontend demonstration.
            Actual reports will be loaded from the backend after the analysis
            pipeline is connected.
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={FileText}
          label="Total reports"
          value={reports.length}
          note="Available sample reports"
          color="bg-blue-500/10 text-blue-400"
        />

        <StatCard
          icon={CheckCircle2}
          label="Completed reviews"
          value={completedReports}
          note="Completed sample reviews"
          color="bg-emerald-500/10 text-emerald-400"
        />

        <StatCard
          icon={AlertTriangle}
          label="Total findings"
          value={totalFindings}
          note="Across all sample reports"
          color="bg-amber-500/10 text-amber-400"
        />

        <StatCard
          icon={ShieldAlert}
          label="Critical + High findings"
          value={totalCritical + totalHigh}
          note={`${totalCritical} critical · ${totalHigh} high`}
          color="bg-red-500/10 text-red-400"
        />
      </div>

      {/* Severity overview */}
      <section className="rounded-2xl border border-[#263750] bg-[#111B2E] p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="font-semibold text-white">
              Overall severity overview
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Finding distribution across all sample reports
            </p>
          </div>

          <span className="text-xs text-slate-500">
            {totalFindings} total findings
          </span>
        </div>

        <div className="flex h-3 overflow-hidden rounded-full bg-[#263750]">
          {severityItems.map((item) => {
            const value = reports.reduce(
              (total, report) => total + report.findings[item.key],
              0
            );

            const percentage = totalFindings
              ? (value / totalFindings) * 100
              : 0;

            return (
              <div
                key={item.key}
                title={`${item.label}: ${value}`}
                className={item.bar}
                style={{ width: `${percentage}%` }}
              />
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
          {severityItems.map((item) => {
            const value = reports.reduce(
              (total, report) => total + report.findings[item.key],
              0
            );

            return (
              <div key={item.key} className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${item.bar}`} />
                <span className="text-xs text-slate-400">{item.label}</span>
                <span className={`text-sm font-bold ${item.color}`}>
                  {value}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Reports list */}
      <section className="overflow-hidden rounded-2xl border border-[#263750] bg-[#111B2E]">
        <div className="border-b border-[#263750] p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="font-semibold text-white">
                All review reports
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Showing {filteredReports.length} of {reports.length} reports
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <div className="relative sm:col-span-2 xl:col-span-1">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search reports..."
                  className="w-full rounded-xl border border-[#263750] bg-[#080D18] py-2.5 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
                />
              </div>

              <div className="relative">
                <Filter
                  size={15}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                />
                <select
                  value={riskFilter}
                  onChange={(event) => setRiskFilter(event.target.value)}
                  className="w-full appearance-none rounded-xl border border-[#263750] bg-[#080D18] py-2.5 pl-9 pr-8 text-sm text-slate-300 outline-none focus:border-blue-500"
                >
                  <option value="All">All risk levels</option>
                  <option value="High">High risk</option>
                  <option value="Medium">Medium risk</option>
                  <option value="Low">Low risk</option>
                </select>
              </div>

              <div>
                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  className="w-full rounded-xl border border-[#263750] bg-[#080D18] px-3 py-2.5 text-sm text-slate-300 outline-none focus:border-blue-500"
                >
                  <option value="All">All statuses</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div>
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="w-full rounded-xl border border-[#263750] bg-[#080D18] px-3 py-2.5 text-sm text-slate-300 outline-none focus:border-blue-500"
                >
                  <option value="newest">Newest first</option>
                  <option value="oldest">Oldest first</option>
                  <option value="most-findings">Most findings</option>
                  <option value="highest-risk">Highest risk</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="divide-y divide-[#263750]">
          {filteredReports.length > 0 ? (
            filteredReports.map((report) => (
              <div
                key={report.id}
                className="p-5 transition hover:bg-[#17243A]/50"
              >
                <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-white">
                        {report.title}
                      </h3>

                      <span
                        className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${riskStyles[report.risk]}`}
                      >
                        {report.risk} risk
                      </span>

                      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-400">
                        <CheckCircle2 size={11} />
                        {report.status}
                      </span>
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1.5">
                        <FileCode2 size={13} />
                        {report.owner}/{report.repository}
                      </span>

                      <span className="inline-flex items-center gap-1.5">
                        <GitPullRequest size={13} />
                        {report.pullRequest}
                      </span>

                      <span className="inline-flex items-center gap-1.5">
                        <GitBranch size={13} />
                        {report.branch}
                      </span>

                      <span className="inline-flex items-center gap-1.5">
                        <Clock3 size={13} />
                        {report.date}
                      </span>
                    </div>

                    <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
                      {report.summary}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 xl:justify-end">
                    <div className="flex gap-3 text-center">
                      {severityItems.map((item) => (
                        <div key={item.key} className="min-w-10">
                          <p className={`text-lg font-bold ${item.color}`}>
                            {report.findings[item.key]}
                          </p>
                          <p className="text-[10px] text-slate-500">
                            {item.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedReport(report)}
                        className="inline-flex items-center gap-2 rounded-lg border border-[#334760] px-3 py-2 text-xs font-semibold text-slate-300 transition hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-white"
                      >
                        View report
                        <ArrowUpRight size={14} />
                      </button>

                      <button
                        onClick={() => downloadReport(report)}
                        title="Download text report"
                        aria-label={`Download ${report.id}`}
                        className="rounded-lg border border-[#334760] p-2 text-slate-400 transition hover:border-blue-500/50 hover:text-white"
                      >
                        <ArrowDownToLine size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-5 py-16 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#17243A] text-slate-500">
                <Search size={22} />
              </div>

              <h3 className="mt-4 font-semibold text-white">
                No reports found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or filters.
              </p>

              <button
                onClick={clearFilters}
                className="mt-4 text-sm font-medium text-blue-400 hover:text-blue-300"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Report details modal */}
      {selectedReport && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setSelectedReport(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="report-modal-title"
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-[#334760] bg-[#111B2E] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-start justify-between border-b border-[#263750] bg-[#111B2E] p-5">
              <div>
                <p className="text-xs font-medium text-blue-400">
                  {selectedReport.id}
                </p>

                <h2
                  id="report-modal-title"
                  className="mt-1 text-xl font-bold text-white"
                >
                  {selectedReport.title}
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {selectedReport.owner}/{selectedReport.repository} ·{" "}
                  {selectedReport.pullRequest}
                </p>
              </div>

              <button
                onClick={() => setSelectedReport(null)}
                aria-label="Close report details"
                className="rounded-lg p-2 text-slate-400 transition hover:bg-[#263750] hover:text-white"
              >
                <X size={19} />
              </button>
            </div>

            <div className="space-y-6 p-5">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  ["Branch", selectedReport.branch],
                  ["Review date", selectedReport.date],
                  ["Report status", selectedReport.status],
                  ["Total findings", getFindingTotal(selectedReport.findings)]
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-xl border border-[#263750] bg-[#080D18]/60 p-3"
                  >
                    <p className="text-xs text-slate-500">{label}</p>
                    <p className="mt-1 break-words text-sm font-medium text-white">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${riskStyles[selectedReport.risk]}`}
                >
                  {selectedReport.risk} risk
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-400">
                  <ShieldCheck size={13} />
                  Review completed
                </span>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white">
                  Review summary
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {selectedReport.summary}
                </p>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-semibold text-white">
                  Finding breakdown
                </h3>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {severityItems.map((item) => (
                    <div
                      key={item.key}
                      className={`rounded-xl border border-[#263750] p-4 ${item.bg}`}
                    >
                      <p className={`text-2xl font-bold ${item.color}`}>
                        {selectedReport.findings[item.key]}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-semibold text-white">
                  Analysis agents included
                </h3>

                <div className="flex flex-wrap gap-2">
                  {selectedReport.agents.map((agent) => (
                    <span
                      key={agent}
                      className="rounded-lg border border-[#334760] bg-[#17243A] px-3 py-2 text-xs text-slate-300"
                    >
                      {agent} Agent
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.06] p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle
                    size={17}
                    className="mt-0.5 shrink-0 text-amber-400"
                  />

                  <div>
                    <p className="text-sm font-semibold text-amber-300">
                      Sample report
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      This report is for frontend demonstration. Actual
                      scanner output, finding evidence and AI explanations
                      will be populated by the backend after integration.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col-reverse justify-between gap-3 border-t border-[#263750] p-5 sm:flex-row">
              <button
                onClick={() => setSelectedReport(null)}
                className="rounded-xl border border-[#334760] px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-[#17243A]"
              >
                Close
              </button>

              <button
                onClick={() => downloadReport(selectedReport)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
              >
                <ArrowDownToLine size={16} />
                Download report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom navigation */}
      <div className="flex flex-col justify-between gap-3 border-t border-[#263750] pt-5 sm:flex-row sm:items-center">
        <button
          onClick={() => navigate("/app/live-analysis")}
          className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to Live Analysis
        </button>

        <p className="text-xs text-slate-600">
          CodeGuardian AI · Review Management · Demo Environment
        </p>
      </div>
    </div>
  );
}

export default ReviewReports;
