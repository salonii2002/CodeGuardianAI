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

function getFindingTotal(findings) {
  return Object.values(findings).reduce((total, value) => total + value, 0);
}

function ReviewReports() {
  const navigate = useNavigate();

  const [reports] = useState(initialReports);
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("All");
  const [selectedReport, setSelectedReport] = useState(null);

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        report.title.toLowerCase().includes(searchText) ||
        report.repository.toLowerCase().includes(searchText) ||
        report.id.toLowerCase().includes(searchText) ||
        report.pullRequest.toLowerCase().includes(searchText);

      const matchesRisk =
        riskFilter === "All" || report.risk === riskFilter;

      return matchesSearch && matchesRisk;
    });
  }, [reports, search, riskFilter]);

  const totalFindings = reports.reduce(
    (total, report) => total + getFindingTotal(report.findings),
    0
  );

  const highRiskReports = reports.filter(
    (report) => report.risk === "High"
  ).length;

  const totalCritical = reports.reduce(
    (total, report) => total + report.findings.critical,
    0
  );

  const downloadReport = (report) => {
    const reportContent = `
CODEGUARDIAN AI - REVIEW REPORT

Report ID: ${report.id}
Title: ${report.title}
Repository: ${report.repository}
Branch: ${report.branch}
Pull Request: ${report.pullRequest}
Date: ${report.date}
Review Status: ${report.status}
Risk Level: ${report.risk}

FINDINGS SUMMARY
Critical: ${report.findings.critical}
High: ${report.findings.high}
Medium: ${report.findings.medium}
Low: ${report.findings.low}
Total: ${getFindingTotal(report.findings)}

SUMMARY
${report.summary}

AGENTS INCLUDED
${report.agents.join(", ")}

NOTE:
This is sample demonstration data. No real repository scan was performed.
`;

    const blob = new Blob([reportContent], {
      type: "text/plain;charset=utf-8"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${report.id}.txt`;
    link.click();

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
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
            Explore completed code reviews, inspect security findings, and
            understand the risk level of each pull request.
          </p>
        </div>

        <button
          onClick={() => navigate("/app/pull-requests")}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#263750] bg-[#111B2E] px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-blue-500/50 hover:text-white"
        >
          <GitPullRequest size={16} />
          View Pull Requests
        </button>
      </div>

      {/* Demo notice */}
      <div className="flex items-start gap-3 rounded-xl border border-blue-500/20 bg-blue-500/[0.06] p-4">
        <Activity className="mt-0.5 shrink-0 text-blue-400" size={19} />
        <div>
          <p className="text-sm font-semibold text-blue-300">
            Demonstration report data
          </p>
          <p className="mt-1 text-xs leading-5 text-slate-400">
            These reports use sample data to demonstrate the interface.
            Actual reports will be generated when the backend and code
            analysis pipeline are connected.
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl border border-[#263750] bg-[#111B2E] p-5">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-blue-500/10 p-2.5 text-blue-400">
              <FileText size={20} />
            </div>
            <span className="text-xs text-slate-500">All time</span>
          </div>
          <p className="mt-5 text-3xl font-bold text-white">
            {reports.length}
          </p>
          <p className="mt-1 text-sm text-slate-400">Total reports</p>
        </div>

        <div className="rounded-2xl border border-[#263750] bg-[#111B2E] p-5">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-emerald-500/10 p-2.5 text-emerald-400">
              <CheckCircle2 size={20} />
            </div>
            <span className="text-xs text-slate-500">100% sample</span>
          </div>
          <p className="mt-5 text-3xl font-bold text-white">
            {reports.filter((report) => report.status === "Completed").length}
          </p>
          <p className="mt-1 text-sm text-slate-400">Completed reviews</p>
        </div>

        <div className="rounded-2xl border border-[#263750] bg-[#111B2E] p-5">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-amber-500/10 p-2.5 text-amber-400">
              <AlertTriangle size={20} />
            </div>
            <span className="text-xs text-slate-500">Across reports</span>
          </div>
          <p className="mt-5 text-3xl font-bold text-white">
            {totalFindings}
          </p>
          <p className="mt-1 text-sm text-slate-400">Total findings</p>
        </div>

        <div className="rounded-2xl border border-[#263750] bg-[#111B2E] p-5">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-red-500/10 p-2.5 text-red-400">
              <ShieldAlert size={20} />
            </div>
            <span className="text-xs text-slate-500">Requires attention</span>
          </div>
          <p className="mt-5 text-3xl font-bold text-white">
            {totalCritical + highRiskReports}
          </p>
          <p className="mt-1 text-sm text-slate-400">
            Critical findings + high-risk reports
          </p>
        </div>
      </div>

      {/* Report list */}
      <section className="overflow-hidden rounded-2xl border border-[#263750] bg-[#111B2E]">

        <div className="flex flex-col gap-4 border-b border-[#263750] p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-semibold text-white">All review reports</h2>
            <p className="mt-1 text-xs text-slate-500">
              {filteredReports.length} reports found
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search reports..."
                className="w-full rounded-xl border border-[#263750] bg-[#080D18] py-2.5 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 sm:w-64"
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
                className="w-full appearance-none rounded-xl border border-[#263750] bg-[#080D18] py-2.5 pl-9 pr-8 text-sm text-slate-300 outline-none focus:border-blue-500 sm:w-40"
              >
                <option value="All">All risk levels</option>
                <option value="High">High risk</option>
                <option value="Medium">Medium risk</option>
                <option value="Low">Low risk</option>
              </select>
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
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

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
                        {report.repository}
                      </span>

                      <span className="inline-flex items-center gap-1.5">
                        <GitPullRequest size={13} />
                        {report.pullRequest}
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
                      {[
                        {
                          label: "Critical",
                          value: report.findings.critical,
                          color: "text-red-400"
                        },
                        {
                          label: "High",
                          value: report.findings.high,
                          color: "text-orange-400"
                        },
                        {
                          label: "Medium",
                          value: report.findings.medium,
                          color: "text-amber-400"
                        },
                        {
                          label: "Low",
                          value: report.findings.low,
                          color: "text-blue-400"
                        }
                      ].map((item) => (
                        <div key={item.label} className="min-w-10">
                          <p className={`text-lg font-bold ${item.color}`}>
                            {item.value}
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
                Try changing your search or risk filter.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setRiskFilter("All");
                }}
                className="mt-4 text-sm font-medium text-blue-400 hover:text-blue-300"
              >
                Clear filters
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
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#334760] bg-[#111B2E] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-[#263750] p-5">
              <div>
                <p className="text-xs font-medium text-blue-400">
                  {selectedReport.id}
                </p>
                <h2 className="mt-1 text-xl font-bold text-white">
                  {selectedReport.title}
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  {selectedReport.repository} · {selectedReport.pullRequest}
                </p>
              </div>

              <button
                onClick={() => setSelectedReport(null)}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-[#263750] hover:text-white"
              >
                <X size={19} />
              </button>
            </div>

            <div className="space-y-6 p-5">

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
                  {[
                    {
                      label: "Critical",
                      value: selectedReport.findings.critical,
                      color: "text-red-400",
                      bg: "bg-red-500/10"
                    },
                    {
                      label: "High",
                      value: selectedReport.findings.high,
                      color: "text-orange-400",
                      bg: "bg-orange-500/10"
                    },
                    {
                      label: "Medium",
                      value: selectedReport.findings.medium,
                      color: "text-amber-400",
                      bg: "bg-amber-500/10"
                    },
                    {
                      label: "Low",
                      value: selectedReport.findings.low,
                      color: "text-blue-400",
                      bg: "bg-blue-500/10"
                    }
                  ].map((item) => (
                    <div
                      key={item.label}
                      className={`rounded-xl border border-[#263750] p-4 ${item.bg}`}
                    >
                      <p className={`text-2xl font-bold ${item.color}`}>
                        {item.value}
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
                      This report is for frontend demonstration. Finding
                      evidence, scanner output, and AI explanations will be
                      populated by the backend when integrated.
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
          CodeGuardian AI · Review Management
        </p>
      </div>
    </div>
  );
}

export default ReviewReports;