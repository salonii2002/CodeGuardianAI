import { useMemo, useState } from "react";
import {
  GitPullRequest,
  Search,
  GitBranch,
  ShieldAlert,
  Clock3,
  AlertTriangle,
  Eye,
  X,
  Code2,
  Filter,
  Play,
  FileCode2,
  CheckCircle2,
  RotateCcw
} from "lucide-react";

const initialPullRequests = [
  {
    id: 104,
    title: "Fix payment validation and transaction handling",
    repository: "payment-service",
    author: "alex-dev",
    branch: "fix/payment-validation",
    target: "main",
    status: "Open",
    severity: "High",
    findings: 5,
    additions: 42,
    deletions: 16,
    updated: "20 minutes ago",
    description:
      "Updates payment validation logic and improves transaction error handling.",
    files: [
      "payments/views.py",
      "payments/validators.py",
      "tests/test_payments.py"
    ]
  },
  {
    id: 103,
    title: "Add authentication token refresh",
    repository: "auth-service",
    author: "sarah-dev",
    branch: "feature/token-refresh",
    target: "main",
    status: "In Review",
    severity: "Medium",
    findings: 3,
    additions: 86,
    deletions: 21,
    updated: "1 hour ago",
    description:
      "Introduces token refresh functionality and updates authentication middleware.",
    files: [
      "auth/token.py",
      "auth/middleware.py",
      "tests/test_token.py"
    ]
  },
  {
    id: 102,
    title: "Update dashboard API response handling",
    repository: "backend-api",
    author: "john-dev",
    branch: "feature/api-response",
    target: "develop",
    status: "Open",
    severity: "Low",
    findings: 1,
    additions: 34,
    deletions: 8,
    updated: "3 hours ago",
    description:
      "Improves API response formatting and handles unexpected response values.",
    files: ["api/response.py", "api/routes.py"]
  },
  {
    id: 101,
    title: "Improve user profile permissions",
    repository: "user-service",
    author: "maria-dev",
    branch: "security/profile-permissions",
    target: "main",
    status: "Approved",
    severity: "None",
    findings: 0,
    additions: 57,
    deletions: 12,
    updated: "Yesterday",
    description:
      "Updates permission checks for user profile operations.",
    files: ["users/permissions.py", "users/views.py"]
  },
  {
    id: 100,
    title: "Add input validation to search endpoints",
    repository: "frontend-dashboard",
    author: "alex-dev",
    branch: "feature/search-validation",
    target: "main",
    status: "In Review",
    severity: "High",
    findings: 4,
    additions: 71,
    deletions: 19,
    updated: "Yesterday",
    description:
      "Adds input validation and improves error handling for search requests.",
    files: ["src/api/search.ts", "src/components/Search.tsx"]
  },
  {
    id: 99,
    title: "Update security scanning configuration",
    repository: "security-tools",
    author: "sarah-dev",
    branch: "chore/scanner-config",
    target: "main",
    status: "Closed",
    severity: "None",
    findings: 0,
    additions: 25,
    deletions: 6,
    updated: "2 days ago",
    description:
      "Updates scanner configuration and improves security rule organization.",
    files: [".semgrep.yml", "security/rules.yaml"]
  }
];

const statusStyles = {
  Open: "border-blue-400/20 bg-blue-400/10 text-blue-300",
  "In Review": "border-amber-400/20 bg-amber-400/10 text-amber-300",
  Approved: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
  Closed: "border-slate-400/20 bg-slate-400/10 text-slate-400"
};

const severityStyles = {
  High: "bg-rose-400/10 text-rose-300",
  Medium: "bg-amber-400/10 text-amber-300",
  Low: "bg-blue-400/10 text-blue-300",
  None: "bg-slate-400/10 text-slate-400"
};

function PullRequests() {
  const [pullRequests, setPullRequests] = useState(initialPullRequests);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [selectedPR, setSelectedPR] = useState(null);
  const [notice, setNotice] = useState("");

  const filteredPRs = useMemo(() => {
    return pullRequests.filter((pr) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        pr.title.toLowerCase().includes(searchText) ||
        pr.repository.toLowerCase().includes(searchText) ||
        String(pr.id).includes(searchText) ||
        pr.author.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" || pr.status === statusFilter;

      const matchesSeverity =
        severityFilter === "All" || pr.severity === severityFilter;

      return matchesSearch && matchesStatus && matchesSeverity;
    });
  }, [pullRequests, search, statusFilter, severityFilter]);

  const counts = {
    total: pullRequests.length,
    open: pullRequests.filter((pr) => pr.status === "Open").length,
    review: pullRequests.filter((pr) => pr.status === "In Review").length,
    high: pullRequests.filter((pr) => pr.severity === "High").length
  };

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setSeverityFilter("All");
  };

  const simulateAnalysis = (id) => {
    setPullRequests((current) =>
      current.map((pr) =>
        pr.id === id
          ? { ...pr, status: "In Review" }
          : pr
      )
    );

    setSelectedPR(null);
    setNotice(
      `Pull request #${id} moved to In Review in the local demo.`
    );
  };

  return (
    <div className="mx-auto max-w-[1600px] space-y-7">

      {/* HEADER */}
      <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-cyan-400">
            <GitPullRequest size={15} />
            CODE REVIEW WORKSPACE
          </div>

          <h1 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Pull Requests
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Review code changes, monitor security findings and track review status.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#111B2E] px-4 py-3 text-xs text-slate-400">
          <GitBranch size={15} className="text-cyan-400" />
          Demo workspace
        </div>
      </section>

      {/* NOTIFICATION */}
      {notice && (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] p-4 text-sm text-emerald-300">
          <span className="flex items-center gap-2">
            <CheckCircle2 size={17} />
            {notice}
          </span>

          <button
            type="button"
            onClick={() => setNotice("")}
            aria-label="Dismiss notification"
            className="rounded-lg p-1 hover:bg-white/10"
          >
            <X size={17} />
          </button>
        </div>
      )}

      {/* SUMMARY CARDS */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <SummaryCard
          title="Total PRs"
          value={counts.total}
          icon={GitPullRequest}
          color="text-blue-400"
          description="Sample pull requests"
        />

        <SummaryCard
          title="Open"
          value={counts.open}
          icon={Clock3}
          color="text-cyan-400"
          description="Awaiting review"
        />

        <SummaryCard
          title="In Review"
          value={counts.review}
          icon={Eye}
          color="text-amber-400"
          description="Under review"
        />

        <SummaryCard
          title="High severity PRs"
          value={counts.high}
          icon={ShieldAlert}
          color="text-rose-400"
          description="Need closer attention"
        />

      </section>

      {/* FILTERS */}
      <section className="flex flex-col gap-3 rounded-2xl border border-white/[0.08] bg-[#111B2E] p-4 lg:flex-row">

        <div className="relative flex-1">
          <Search
            size={17}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by PR title, repository, number or author..."
            className="w-full rounded-xl border border-white/10 bg-[#0B1423] py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/40"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">

          <div className="flex items-center gap-2">
            <Filter size={15} className="text-slate-500" />

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="rounded-xl border border-white/10 bg-[#0B1423] px-3 py-3 text-sm text-slate-300 outline-none focus:border-cyan-400/40"
            >
              <option value="All">All statuses</option>
              <option value="Open">Open</option>
              <option value="In Review">In Review</option>
              <option value="Approved">Approved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <select
            value={severityFilter}
            onChange={(event) => setSeverityFilter(event.target.value)}
            className="rounded-xl border border-white/10 bg-[#0B1423] px-3 py-3 text-sm text-slate-300 outline-none focus:border-cyan-400/40"
          >
            <option value="All">All severities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
            <option value="None">No findings</option>
          </select>

          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-cyan-400 transition hover:bg-white/5"
          >
            <RotateCcw size={14} />
            Reset
          </button>

        </div>
      </section>

      {/* PULL REQUEST TABLE */}
      <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111B2E]">

        <div className="flex flex-col justify-between gap-2 border-b border-white/[0.08] p-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-semibold text-white">
              All pull requests
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Showing {filteredPRs.length} of {pullRequests.length} sample pull requests
            </p>
          </div>

          <span className="text-xs text-slate-500">
            <Code2 size={14} className="mr-1 inline" />
            Latest activity first
          </span>
        </div>

        {filteredPRs.length > 0 ? (
          <div className="divide-y divide-white/[0.06]">

            {filteredPRs.map((pr) => (
              <article
                key={pr.id}
                className="p-5 transition hover:bg-white/[0.02]"
              >
                <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">

                  <div className="min-w-0 flex-1">

                    <div className="flex flex-wrap items-center gap-2">
                      <GitPullRequest size={17} className="text-emerald-400" />

                      <h3 className="font-semibold text-white">
                        {pr.title}
                      </h3>

                      <span className="text-xs text-slate-500">
                        #{pr.id}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-slate-500">
                      <span>{pr.repository}</span>
                      <span>·</span>
                      <span>{pr.author}</span>
                      <span>·</span>

                      <span className="flex items-center gap-1">
                        <GitBranch size={12} />
                        {pr.branch} → {pr.target}
                      </span>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-2">

                      <span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold ${statusStyles[pr.status]}`}>
                        {pr.status}
                      </span>

                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${severityStyles[pr.severity]}`}>
                        {pr.severity === "None"
                          ? "No findings"
                          : `${pr.severity} severity`}
                      </span>

                      <span className="flex items-center gap-1.5 text-xs text-slate-400">
                        <AlertTriangle size={13} />
                        {pr.findings} findings
                      </span>

                      <span className="text-xs text-slate-500">
                        +{pr.additions} / -{pr.deletions}
                      </span>

                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 xl:justify-end">

                    <span className="text-[11px] text-slate-500">
                      {pr.updated}
                    </span>

                    <button
                      type="button"
                      onClick={() => setSelectedPR(pr)}
                      className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-white/10 px-3.5 py-2.5 text-xs font-semibold text-slate-200 transition hover:border-cyan-400/30 hover:bg-cyan-400/5 hover:text-cyan-300"
                    >
                      <Eye size={14} />
                      View details
                    </button>

                  </div>
                </div>
              </article>
            ))}

          </div>
        ) : (
          <div className="px-5 py-16 text-center">
            <Search size={30} className="mx-auto text-slate-500" />

            <h3 className="mt-4 font-semibold text-white">
              No pull requests found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Change your search or filters and try again.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 text-sm font-semibold text-cyan-400 hover:text-cyan-300"
            >
              Clear filters
            </button>
          </div>
        )}

      </section>

      {/* DEMO NOTICE */}
      <section className="rounded-2xl border border-cyan-400/15 bg-[#10243A]/60 p-5">
        <div className="flex items-start gap-3">

          <div className="rounded-xl bg-cyan-400/10 p-3">
            <FileCode2 size={20} className="text-cyan-300" />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">
              Pull request preview
            </h3>

            <p className="mt-1 text-xs leading-6 text-slate-400">
              These pull requests are sample records for the frontend demo.
              GitHub synchronization, webhook events and real code analysis
              are not connected yet.
            </p>
          </div>

        </div>
      </section>

      {/* DETAILS MODAL */}
      {selectedPR && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedPR(null);
            }
          }}
        >

          <div className="my-auto w-full max-w-2xl rounded-2xl border border-white/10 bg-[#111B2E] shadow-2xl">

            {/* MODAL HEADER */}
            <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] p-5">

              <div>
                <div className="flex items-center gap-2 text-xs text-emerald-400">
                  <GitPullRequest size={15} />
                  PULL REQUEST #{selectedPR.id}
                </div>

                <h2 className="mt-3 text-lg font-bold text-white">
                  {selectedPR.title}
                </h2>

                <p className="mt-2 text-xs text-slate-500">
                  {selectedPR.repository} · Created by {selectedPR.author}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPR(null)}
                aria-label="Close details"
                className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white"
              >
                <X size={19} />
              </button>

            </div>

            {/* MODAL BODY */}
            <div className="space-y-5 p-5">

              <p className="text-sm leading-6 text-slate-400">
                {selectedPR.description}
              </p>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

                <DetailCard
                  label="Status"
                  value={selectedPR.status}
                />

                <DetailCard
                  label="Severity"
                  value={selectedPR.severity}
                />

                <DetailCard
                  label="Findings"
                  value={selectedPR.findings}
                />

                <DetailCard
                  label="Files changed"
                  value={selectedPR.files.length}
                />

              </div>

              {/* CHANGED FILES */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-white">
                  Changed files
                </h3>

                <div className="space-y-2">
                  {selectedPR.files.map((file) => (
                    <div
                      key={file}
                      className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-[#0B1423] px-3 py-2.5"
                    >
                      <FileCode2 size={15} className="text-cyan-400" />

                      <span className="break-all font-mono text-xs text-slate-300">
                        {file}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* MODAL ACTIONS */}
              <div className="flex flex-col-reverse gap-3 border-t border-white/[0.08] pt-5 sm:flex-row sm:justify-between">

                <button
                  type="button"
                  onClick={() => setSelectedPR(null)}
                  className="rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-slate-300 hover:bg-white/5"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={() => simulateAnalysis(selectedPR.id)}
                  disabled={selectedPR.status === "In Review"}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Play size={15} />

                  {selectedPR.status === "In Review"
                    ? "Already in review"
                    : "Simulate review status"}
                </button>

              </div>

              <p className="text-[11px] leading-5 text-slate-500">
                Demo interaction only. This changes the local display status;
                it does not execute AI agents or security scanners.
              </p>

            </div>
          </div>
        </div>
      )}

      <p className="pb-3 text-center text-[10px] text-slate-600">
        CodeGuardian AI · Pull request workspace · Illustrative sample data
      </p>

    </div>
  );
}

function SummaryCard({ title, value, icon: Icon, color, description }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#111B2E] p-5">

      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">{title}</p>
        <Icon size={20} className={color} />
      </div>

      <h2 className="mt-3 text-3xl font-bold text-white">
        {value}
      </h2>

      <p className="mt-1 text-xs text-slate-500">
        {description}
      </p>

    </div>
  );
}

function DetailCard({ label, value }) {
  return (
    <div className="rounded-xl bg-[#0B1423] p-3">
      <p className="text-[10px] text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-sm font-semibold text-white">
        {value}
      </p>
    </div>
  );
}

export default PullRequests;
