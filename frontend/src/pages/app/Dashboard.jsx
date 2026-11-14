
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { getDashboardSummary } from "../../services/dashboard";
import { useNavigate } from "react-router-dom";
import {
  GitBranch,
  GitPullRequest,
  ShieldAlert,
  CheckCircle2,
  ArrowUpRight,
  Bot,
  ShieldCheck,
  Code2,
  TestTube2,
  FileText,
  Plus,
  Search,
  Filter,
  X,
  ChevronRight,
  ExternalLink,
  LockKeyhole,
  Eye,
  Sparkles,
  RefreshCw,
  Bug,
  FileCode2,
} from "lucide-react";

const DashboardCharts = lazy(
  () => import("../../components/dashboard/DashboardCharts")
);

const weeklyData = [
  { day: "Mon", findings: 12, resolved: 8 },
  { day: "Tue", findings: 18, resolved: 12 },
  { day: "Wed", findings: 15, resolved: 11 },
  { day: "Thu", findings: 24, resolved: 16 },
  { day: "Fri", findings: 19, resolved: 15 },
  { day: "Sat", findings: 28, resolved: 21 },
  { day: "Sun", findings: 15, resolved: 12 },
];

const severityData = [
  { name: "High", value: 10, color: "#F97316" },
  { name: "Medium", value: 4, color: "#FBBF24" },
  { name: "Low", value: 1, color: "#60A5FA" },
];

const pullRequests = [
  {
    id: 142,
    title: "Add payment processing API",
    repository: "payment-service",
    author: "Alex Morgan",
    initials: "AM",
    status: "Review required",
    risk: "High",
    findings: 5,
    time: "12 min ago",
    branch: "feature/payment-api",
  },
  {
    id: 139,
    title: "Update authentication middleware",
    repository: "auth-service",
    author: "Sarah Chen",
    initials: "SC",
    status: "Review completed",
    risk: "Low",
    findings: 0,
    time: "38 min ago",
    branch: "fix/auth-middleware",
  },
  {
    id: 136,
    title: "Improve API response handling",
    repository: "backend-api",
    author: "James Wilson",
    initials: "JW",
    status: "Review required",
    risk: "Medium",
    findings: 3,
    time: "1 hour ago",
    branch: "feature/api-response",
  },
  {
    id: 132,
    title: "Add notification service",
    repository: "notification-engine",
    author: "Priya Patel",
    initials: "PP",
    status: "In progress",
    risk: "Medium",
    findings: 2,
    time: "3 hours ago",
    branch: "feature/notifications",
  },
];

const findings = [
  {
    id: "SEC-1042",
    title: "Hardcoded API secret detected",
    severity: "High",
    category: "Secret Detection",
    repository: "payment-service",
    file: "src/config/payment.js",
    line: 24,
    type: "Secret exposure",
    description:
      "A possible API secret is written directly inside the source code. Anyone with access to this repository may be able to read and misuse it.",
    evidence: 'const API_SECRET = "sk_test_demo_secret_12345";',
    recommendation:
      "Remove the secret from source code, rotate the exposed credential, and load the new value from a secure environment variable.",
    agent: "Security Agent",
  },
  {
    id: "SEC-1039",
    title: "SQL query uses unsafe string concatenation",
    severity: "High",
    category: "Injection Risk",
    repository: "backend-api",
    file: "src/database/user.py",
    line: 81,
    type: "SQL injection",
    description:
      "User-controlled input appears to be combined directly with a SQL query. This can allow an attacker to modify the intended database operation.",
    evidence: 'query = "SELECT * FROM users WHERE id = " + user_id',
    recommendation:
      "Use parameterized SQL queries instead of joining user input into SQL strings.",
    agent: "Security Agent",
  },
  {
    id: "SEC-1035",
    title: "Missing error handling in payment request",
    severity: "Medium",
    category: "Code Quality",
    repository: "payment-service",
    file: "src/services/payment.py",
    line: 56,
    type: "Unhandled exception",
    description:
      "The payment request does not handle all expected failure cases. This may result in unclear errors or incomplete payment processing.",
    evidence: "response = payment_gateway.charge(amount)",
    recommendation:
      "Add appropriate exception handling, validate the gateway response, and log failures without exposing sensitive information.",
    agent: "Code Quality Agent",
  },
  {
    id: "SEC-1028",
    title: "Missing test coverage for authentication failure",
    severity: "Low",
    category: "Test Gap",
    repository: "auth-service",
    file: "tests/test_auth.py",
    line: 0,
    type: "Missing test",
    description:
      "The current test suite does not appear to cover an invalid authentication attempt.",
    evidence: "No matching test case found in the sample test suite.",
    recommendation:
      "Add a test that verifies invalid credentials are rejected and that the response does not reveal sensitive authentication details.",
    agent: "Test Gap Agent",
  },
];

const agents = [
  {
    name: "Security Agent",
    description: "Vulnerability and secret detection",
    icon: ShieldCheck,
    color: "text-red-400",
    bg: "bg-red-500/10",
    status: "Active",
    progress: 100,
  },
  {
    name: "Code Quality Agent",
    description: "Code quality and maintainability",
    icon: Code2,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    status: "Beta",
    progress: 78,
  },
  {
    name: "Test Gap Agent",
    description: "Missing tests and coverage gaps",
    icon: TestTube2,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    status: "Beta",
    progress: 65,
  },
  {
    name: "Documentation Agent",
    description: "Documentation and API explanations",
    icon: FileText,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    status: "Beta",
    progress: 82,
  },
];

function mapDashboardResponse(data) {
  const agentStyles = {
    "Security Agent": {
      icon: ShieldCheck,
      color: "text-red-400",
      bg: "bg-red-500/10",
    },
    "Code Quality Agent": {
      icon: Code2,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    "Test Gap Agent": {
      icon: TestTube2,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    "Documentation Agent": {
      icon: FileText,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
  };

  return {
    stats: {
      repositories: data.stats?.repositories ?? 0,
      pull_requests: data.stats?.pull_requests ?? 0,
      security_findings: data.stats?.security_findings ?? 0,
      completed_reviews: data.stats?.completed_reviews ?? 0,
    },

    activity: Array.isArray(data.activity) ? data.activity : [],

    severity: (Array.isArray(data.severity) ? data.severity : []).map(
      (item) => ({
        ...item,
        value: Number(item.value) || 0,
        color:
          item.name === "High"
            ? "#F97316"
            : item.name === "Medium"
              ? "#FBBF24"
              : "#60A5FA",
      })
    ),

    recent_pull_requests: (
      Array.isArray(data.recent_pull_requests)
        ? data.recent_pull_requests
        : []
    ).map((pr) => ({
      ...pr,
      id: pr.number ?? pr.id,
      author: pr.author || "Unknown",
      initials: (pr.author || "Unknown")
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
      status:
        pr.status === "Completed"
          ? "Review completed"
          : pr.status === "In Review" || pr.status === "Pending"
            ? "Review required"
            : pr.status || "Pending",
      risk: pr.risk || "Low",
      findings: pr.findings ?? 0,
      time: pr.time || "Recently updated",
      branch: pr.branch || "Not provided",
      title: pr.title || "Untitled pull request",
      repository: pr.repository || "Unknown repository",
    })),

    priority_findings: (
      Array.isArray(data.priority_findings) ? data.priority_findings : []
    ).map((finding) => ({
      ...finding,
      id: finding.id || "SEC-UNKNOWN",
      title: finding.title || "Untitled finding",
      severity: finding.severity || "Low",
      category: finding.category || finding.type || "Security",
      type: finding.type || finding.category || "Code finding",
      description: finding.description || "No description is available.",
      evidence: finding.evidence || "Evidence is not available.",
      recommendation:
        finding.recommendation ||
        "Review this finding and apply the recommended security practices.",
      line: finding.line ?? 0,
      repository: finding.repository || "Demo repository",
      file: finding.file || "File not provided",
      agent: finding.agent || "Security Agent",
    })),

    agents: (Array.isArray(data.agents) ? data.agents : []).map((agent) => ({
      ...agent,
      ...(agentStyles[agent.name] || {
        icon: Bot,
        color: "text-blue-400",
        bg: "bg-blue-500/10",
      }),
      status:
        agent.status === "Completed" ? "Active" : agent.status || "Available",
      progress: Math.min(100, Math.max(0, Number(agent.progress) || 0)),
    })),

    source: data.source || "demo",
  };
}

function Dashboard() {
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState({
    stats: {
      repositories: 12,
      pull_requests: 48,
      security_findings: 15,
      completed_reviews: 36,
    },
    activity: weeklyData,
    severity: severityData,
    recent_pull_requests: pullRequests,
    priority_findings: findings,
    agents,
    source: "demo",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedPR, setSelectedPR] = useState(null);
  const [selectedFinding, setSelectedFinding] = useState(null);
  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [timeRange, setTimeRange] = useState("7 days");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let cancelled = false;

    const rangeMap = {
      "7 days": "7d",
      "30 days": "30d",
      "90 days": "90d",
    };

    const loadData = async () => {
      setIsLoading(true);
      setLoadError("");

      try {
        const response = await getDashboardSummary(
          rangeMap[timeRange] || "7d"
        );

        if (!cancelled) {
          setDashboardData(mapDashboardResponse(response));
        }
      } catch (error) {
        if (!cancelled) {
          setLoadError(error.message || "Unable to load dashboard data.");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadData();

    return () => {
      cancelled = true;
    };
  }, [timeRange, refreshKey]);

  const filteredFindings = useMemo(() => {
    return dashboardData.priority_findings.filter((finding) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        finding.title.toLowerCase().includes(searchText) ||
        finding.repository.toLowerCase().includes(searchText) ||
        finding.file.toLowerCase().includes(searchText);

      const matchesSeverity =
        severityFilter === "All" || finding.severity === severityFilter;

      return matchesSearch && matchesSeverity;
    });
  }, [search, severityFilter, dashboardData.priority_findings]);

  const chartData = dashboardData.activity;
  const severityChartData = dashboardData.severity;

  const totalFindings = severityChartData.reduce(
    (total, item) => total + Number(item.value || 0),
    0
  );

  const stats = [
    {
      label: "Repositories",
      value: String(dashboardData.stats.repositories ?? 0),
      change: "+2 this month",
      icon: GitBranch,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      route: "/app/repositories",
    },
    {
      label: "Pull Requests",
      value: String(dashboardData.stats.pull_requests ?? 0),
      change: "+12 this week",
      icon: GitPullRequest,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      route: "/app/pull-requests",
    },
    {
      label: "Security Findings",
      value: String(dashboardData.stats.security_findings ?? 0),
      change: "3 require attention",
      icon: ShieldAlert,
      color: "text-orange-400",
      bg: "bg-orange-500/10",
      route: "/app/review-reports",
    },
    {
      label: "Completed Reviews",
      value: String(dashboardData.stats.completed_reviews ?? 0),
      change: "+8 this week",
      icon: CheckCircle2,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      route: "/app/review-reports",
    },
  ];

  const showNotice = (message) => {
    setNotice(message);
  };

  const handleRefresh = () => {
    setSearch("");
    setSeverityFilter("All");
    setTimeRange("7 days");
    setSelectedPR(null);
    setSelectedFinding(null);
    setRefreshKey((previous) => previous + 1);
    showNotice("Dashboard data refresh requested.");
  };

  const closeModals = () => {
    setSelectedPR(null);
    setSelectedFinding(null);
  };

  return (
    <div className="min-w-0 w-full space-y-6 overflow-x-clip sm:space-y-7">
      {/* PAGE HEADER */}
      <div className="flex min-w-0 flex-col justify-between gap-4 xl:flex-row xl:items-center">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
              Workspace overview
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Dashboard
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Monitor your repositories, security findings and AI code reviews.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="inline-flex items-center gap-2 rounded-lg border border-[#263750] bg-[#111B2E] px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-[#17243A] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              size={16}
              className={isLoading ? "animate-spin" : ""}
            />
            {isLoading ? "Refreshing..." : "Refresh"}
          </button>

          <button
            onClick={() => navigate("/app/pull-requests")}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-500"
          >
            <Plus size={17} />
            New review
          </button>
        </div>
      </div>

      {/* DEMO NOTICE */}
      <div className="flex flex-col gap-3 rounded-xl border border-blue-500/20 bg-blue-500/[0.06] p-4 sm:flex-row sm:items-center">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
          <Sparkles size={20} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-blue-200">
            Interactive demonstration workspace
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-400">
            This dashboard currently uses sample repository and review data.
            Live GitHub synchronization and scanner execution will be connected
            through the backend.
          </p>
        </div>

        <span className="w-fit shrink-0 rounded-md border border-blue-400/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-300">
          Demo environment
        </span>
      </div>

      {/* NOTICE */}
      {notice && (
        <div
          role="status"
          className="flex items-center justify-between gap-3 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300"
        >
          <span>{notice}</span>
          <button
            onClick={() => setNotice("")}
            aria-label="Dismiss notification"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* API ERROR */}
      {loadError && (
        <div
          role="alert"
          className="rounded-lg border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-300"
        >
          Demo service could not load new data. Showing available sample data.
          <p className="mt-1 break-words text-xs text-amber-200/70">
            {loadError}
          </p>
        </div>
      )}

      {/* STAT CARDS */}
      <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <button
              key={stat.label}
              onClick={() => navigate(stat.route)}
              className="group min-w-0 rounded-xl border border-[#263750] bg-[#111B2E] p-4 text-left transition duration-200 hover:border-blue-500/40 hover:bg-[#142139] sm:p-5 sm:hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}
                >
                  <Icon size={21} />
                </div>

                <ArrowUpRight
                  size={17}
                  className="text-slate-600 transition group-hover:text-blue-400"
                />
              </div>

              <p className="mt-5 text-sm text-slate-400">{stat.label}</p>

              <div className="mt-1 flex flex-wrap items-end justify-between gap-2">
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  {stat.value}
                </h2>

                <span className="mb-1 text-[11px] text-emerald-400">
                  {stat.change}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* CHARTS */}
      <Suspense
        fallback={
          <div className="grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-3">
            <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-[#263750] bg-[#111B2E] p-5 xl:col-span-2">
              <div className="text-center">
                <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
                <p className="mt-3 text-xs text-slate-400">
                  Loading activity chart...
                </p>
              </div>
            </div>

            <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-[#263750] bg-[#111B2E] p-5">
              <div className="text-center">
                <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
                <p className="mt-3 text-xs text-slate-400">
                  Loading severity chart...
                </p>
              </div>
            </div>
          </div>
        }
      >
        <DashboardCharts
          chartData={chartData}
          severityChartData={severityChartData}
          totalFindings={totalFindings}
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
          onExploreFindings={() => navigate("/app/review-reports")}
        />
      </Suspense>

      {/* PULL REQUESTS */}
      <section className="min-w-0 overflow-hidden rounded-xl border border-[#263750] bg-[#111B2E]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#263750] p-4 sm:p-5">
          <div>
            <h2 className="font-semibold text-white">Recent pull requests</h2>
            <p className="mt-1 text-xs text-slate-500">
              Latest pull requests in your workspace
            </p>
          </div>

          <button
            onClick={() => navigate("/app/pull-requests")}
            className="flex items-center gap-2 text-xs font-semibold text-blue-400 transition hover:text-blue-300"
          >
            View all pull requests
            <ChevronRight size={15} />
          </button>
        </div>

        <div className="max-w-full overflow-x-auto overscroll-x-contain">
          <table className="w-full min-w-[760px] text-left">
            <thead className="bg-[#0D1728] text-[10px] uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-4 font-semibold">Pull request</th>
                <th className="px-5 py-4 font-semibold">Author</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 font-semibold">Risk</th>
                <th className="px-5 py-4 font-semibold">Findings</th>
                <th className="px-5 py-4 font-semibold">Updated</th>
                <th className="px-5 py-4 font-semibold">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#263750]">
              {dashboardData.recent_pull_requests.map((pr) => (
                <tr
                  key={pr.id}
                  className="transition hover:bg-[#17243A]/60"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 text-blue-400">
                        <GitPullRequest size={17} />
                      </div>

                      <div>
                        <p className="text-sm font-medium text-white">
                          {pr.title}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          #{pr.id} · {pr.repository}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#263750] text-[10px] font-bold text-slate-300">
                        {pr.initials}
                      </div>
                      <span className="text-xs text-slate-400">
                        {pr.author}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-md px-2 py-1 text-[10px] font-semibold ${
                        pr.status === "Review completed"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : pr.status === "In progress"
                            ? "bg-blue-500/10 text-blue-400"
                            : "bg-amber-500/10 text-amber-400"
                      }`}
                    >
                      {pr.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <RiskBadge risk={pr.risk} />
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-300">
                    {pr.findings}
                  </td>

                  <td className="px-5 py-4 text-xs text-slate-500">
                    {pr.time}
                  </td>

                  <td className="px-5 py-4">
                    <button
                      onClick={() => setSelectedPR(pr)}
                      className="rounded-lg border border-[#334155] px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-blue-500 hover:text-blue-300"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}

              {dashboardData.recent_pull_requests.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-10 text-center text-sm text-slate-500"
                  >
                    No pull requests are available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* FINDINGS AND AGENTS */}
      <div className="grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-3">
        {/* SECURITY FINDINGS */}
        <section
          id="dashboard-findings"
          className="min-w-0 rounded-xl border border-[#263750] bg-[#111B2E] xl:col-span-2"
        >
          <div className="border-b border-[#263750] p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-semibold text-white">
                  Priority security findings
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Inspect evidence, explanations and suggested fixes
                </p>
              </div>

              <span className="rounded-md bg-orange-500/10 px-2.5 py-1 text-[10px] font-semibold text-orange-400">
                Requires attention
              </span>
            </div>

            <div className="mt-4 flex min-w-0 flex-col gap-3 sm:flex-row">
              <div className="relative min-w-0 flex-1">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search findings, files or repositories..."
                  aria-label="Search security findings"
                  className="w-full rounded-lg border border-[#263750] bg-[#0D1728] py-2.5 pl-9 pr-3 text-xs text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
                />
              </div>

              <div className="relative shrink-0">
                <Filter
                  size={14}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <select
                  value={severityFilter}
                  onChange={(e) => setSeverityFilter(e.target.value)}
                  aria-label="Filter findings by severity"
                  className="w-full rounded-lg border border-[#263750] bg-[#0D1728] py-2.5 pl-9 pr-7 text-xs text-slate-300 outline-none focus:border-blue-500 sm:w-36"
                >
                  <option>All</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
            </div>
          </div>

          <div className="divide-y divide-[#263750]">
            {filteredFindings.length > 0 ? (
              filteredFindings.map((finding) => (
                <button
                  key={finding.id}
                  onClick={() => setSelectedFinding(finding)}
                  className="flex w-full min-w-0 items-start gap-2 p-3 text-left transition hover:bg-[#17243A]/60 sm:gap-3 sm:p-5"
                >
                  <div
                    className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                      finding.severity === "High"
                        ? "bg-orange-500/10 text-orange-400"
                        : finding.severity === "Medium"
                          ? "bg-amber-500/10 text-amber-400"
                          : "bg-blue-500/10 text-blue-400"
                    }`}
                  >
                    {finding.category === "Secret Detection" ? (
                      <LockKeyhole size={17} />
                    ) : finding.category === "Test Gap" ? (
                      <TestTube2 size={17} />
                    ) : (
                      <Bug size={17} />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="min-w-0 text-sm font-semibold text-white [overflow-wrap:anywhere]">
                        {finding.title}
                      </p>
                      <RiskBadge risk={finding.severity} />
                    </div>

                    <p className="mt-1 break-words text-xs text-slate-500">
                      {finding.id} · {finding.repository} · {finding.category}
                    </p>

                    <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                      <FileCode2 size={13} />
                      <span className="break-all">{finding.file}</span>
                      {finding.line > 0 && (
                        <span className="text-slate-600">
                          :{finding.line}
                        </span>
                      )}
                    </div>
                  </div>

                  <ChevronRight
                    size={17}
                    className="mt-2 shrink-0 text-slate-600"
                  />
                </button>
              ))
            ) : (
              <div className="p-8 text-center">
                <Search size={24} className="mx-auto text-slate-600" />
                <p className="mt-3 text-sm font-medium text-slate-300">
                  No matching findings
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Try another search or severity filter.
                </p>
              </div>
            )}
          </div>

          <div className="border-t border-[#263750] p-4">
            <button
              onClick={() => navigate("/app/review-reports")}
              className="flex w-full items-center justify-center gap-2 text-xs font-semibold text-blue-400 hover:text-blue-300"
            >
              Open complete findings report
              <ArrowUpRight size={14} />
            </button>
          </div>
        </section>

        {/* AI AGENTS */}
        <section className="min-w-0 rounded-xl border border-[#263750] bg-[#111B2E]">
          <div className="flex items-center justify-between border-b border-[#263750] p-5">
            <div>
              <h2 className="font-semibold text-white">AI review agents</h2>
              <p className="mt-1 text-xs text-slate-500">
                Review team overview
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
              <Bot size={19} />
            </div>
          </div>

          <div className="space-y-5 p-5">
            {dashboardData.agents.map((agent) => {
              const Icon = agent.icon;

              return (
                <div key={agent.name}>
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${agent.bg} ${agent.color}`}
                    >
                      <Icon size={17} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-xs font-semibold text-white">
                          {agent.name}
                        </p>

                        <span
                          className={`text-[9px] font-bold uppercase tracking-wider ${
                            agent.status === "Active"
                              ? "text-emerald-400"
                              : "text-blue-400"
                          }`}
                        >
                          {agent.status}
                        </span>
                      </div>

                      <p className="mt-1 text-[10px] text-slate-500">
                        {agent.description}
                      </p>
                    </div>
                  </div>

                  <div className="ml-12 mt-2">
                    <div className="h-1 overflow-hidden rounded-full bg-[#263750]">
                      <div
                        className="h-full rounded-full bg-blue-500"
                        style={{ width: `${agent.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}

            {dashboardData.agents.length === 0 && (
              <p className="py-5 text-center text-xs text-slate-500">
                No agent information is available.
              </p>
            )}
          </div>

          <div className="border-t border-[#263750] p-4">
            <button
              onClick={() => navigate("/app/agents")}
              className="flex w-full items-center justify-center gap-2 text-xs font-semibold text-blue-400 hover:text-blue-300"
            >
              Manage AI agents
              <ArrowUpRight size={14} />
            </button>
          </div>
        </section>
      </div>

      {/* SECURITY HEALTH BANNER */}
      <div className="flex min-w-0 flex-col gap-4 rounded-xl border border-orange-500/20 bg-gradient-to-r from-orange-500/[0.08] to-[#111B2E] p-4 sm:flex-row sm:items-center sm:p-5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
          <ShieldAlert size={24} />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-white">
            Security attention required
          </h3>

          <p className="mt-1 text-xs leading-5 text-slate-400">
            The sample workspace contains{" "}
            {severityChartData.find((item) => item.name === "High")?.value || 0}{" "}
            high-severity findings. Inspect the evidence and suggested
            remediation before approving affected changes.
          </p>
        </div>

        <button
          onClick={() => {
            setSeverityFilter("High");
            document.getElementById("dashboard-findings")?.scrollIntoView({
              behavior: "smooth",
            });
          }}
          className="w-full shrink-0 rounded-lg border border-orange-500/30 px-4 py-2.5 text-xs font-semibold text-orange-300 transition hover:bg-orange-500/10 sm:w-auto"
        >
          Review high-risk items
        </button>
      </div>

      {/* PULL REQUEST MODAL */}
      {selectedPR && (
        <Modal onClose={closeModals}>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <span className="text-xs font-semibold text-blue-400">
                PULL REQUEST #{selectedPR.id}
              </span>

              <h2 className="mt-2 break-words text-xl font-bold text-white">
                {selectedPR.title}
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                {selectedPR.repository}
              </p>
            </div>

            <button
              onClick={closeModals}
              aria-label="Close pull request details"
              className="shrink-0 text-slate-500 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <DetailBox label="Author" value={selectedPR.author} />
            <DetailBox label="Review status" value={selectedPR.status} />
            <DetailBox label="Risk level" value={selectedPR.risk} />
            <DetailBox
              label="Findings"
              value={String(selectedPR.findings)}
            />
          </div>

          <div className="mt-4 rounded-lg border border-[#263750] bg-[#0D1728] p-4">
            <p className="text-xs text-slate-500">Source branch</p>
            <p className="mt-2 flex items-start gap-2 break-all text-sm text-slate-200">
              <GitBranch size={15} className="shrink-0 text-blue-400" />
              {selectedPR.branch}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap justify-end gap-3">
            <button
              onClick={closeModals}
              className="rounded-lg border border-[#334155] px-4 py-2.5 text-sm text-slate-300 hover:bg-[#17243A]"
            >
              Close
            </button>

            <button
              onClick={() => {
                closeModals();
                navigate("/app/pull-requests");
              }}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500"
            >
              Open pull requests
              <ExternalLink size={15} />
            </button>
          </div>
        </Modal>
      )}

      {/* FINDING DETAIL MODAL */}
      {selectedFinding && (
        <Modal onClose={closeModals}>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-400">
                  {selectedFinding.id}
                </span>
                <RiskBadge risk={selectedFinding.severity} />
              </div>

              <h2 className="mt-3 break-words text-xl font-bold text-white">
                {selectedFinding.title}
              </h2>

              <p className="mt-2 break-words text-xs text-slate-400">
                {selectedFinding.category} · {selectedFinding.repository}
              </p>
            </div>

            <button
              onClick={closeModals}
              aria-label="Close finding details"
              className="shrink-0 text-slate-500 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mt-5 space-y-4">
            <div>
              <p className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-300">
                <Eye size={14} className="text-blue-400" />
                Finding explanation
              </p>

              <p className="break-words rounded-lg border border-[#263750] bg-[#0D1728] p-3 text-sm leading-6 text-slate-400">
                {selectedFinding.description}
              </p>
            </div>

            <div>
              <p className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-300">
                <FileCode2 size={14} className="text-blue-400" />
                Affected file
              </p>

              <div className="rounded-lg border border-[#263750] bg-[#0D1728] p-3">
                <p className="break-all text-sm text-blue-300">
                  {selectedFinding.file}
                  {selectedFinding.line > 0 && `:${selectedFinding.line}`}
                </p>
              </div>
            </div>

            <div>
              <p className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-300">
                <Bug size={14} className="text-orange-400" />
                Evidence
              </p>

              <pre className="max-w-full overflow-x-auto whitespace-pre-wrap break-all rounded-lg border border-orange-500/20 bg-[#090F1C] p-3 text-xs leading-6 text-orange-200">
                {selectedFinding.evidence}
              </pre>
            </div>

            <div>
              <p className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-300">
                <Sparkles size={14} className="text-emerald-400" />
                Suggested remediation
              </p>

              <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/[0.05] p-3">
                <p className="break-words text-sm leading-6 text-slate-300">
                  {selectedFinding.recommendation}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#263750] pt-4">
              <span className="text-xs text-slate-500">
                Detected by {selectedFinding.agent}
              </span>

              <span className="rounded-md bg-blue-500/10 px-2 py-1 text-[10px] text-blue-300">
                Sample finding
              </span>
            </div>
          </div>

          <div className="mt-5 flex justify-end">
            <button
              onClick={closeModals}
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-500"
            >
              Close details
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function RiskBadge({ risk }) {
  const styles = {
    High: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    Medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Low: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  };

  return (
    <span
      className={`inline-flex shrink-0 rounded-md border px-2 py-1 text-[10px] font-bold ${
        styles[risk] || styles.Low
      }`}
    >
      {risk}
    </span>
  );
}

function DetailBox({ label, value }) {
  return (
    <div className="min-w-0 rounded-lg border border-[#263750] bg-[#0D1728] p-3">
      <p className="text-[10px] uppercase tracking-wider text-slate-500">
        {label}
      </p>

      <p className="mt-2 break-words text-sm font-semibold text-white">
        {value}
      </p>
    </div>
  );
}

function Modal({ children, onClose }) {
  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-black/75 p-2 backdrop-blur-sm sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="my-auto max-h-[calc(100dvh-1rem)] w-full min-w-0 max-w-2xl overflow-y-auto overscroll-contain rounded-xl border border-[#334155] bg-[#111B2E] p-4 shadow-2xl sm:max-h-[90vh] sm:rounded-2xl sm:p-7">
        {children}
      </div>
    </div>
  );
}

export default Dashboard;
