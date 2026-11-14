
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  Bot,
  Bug,
  Check,
  CheckCircle2,
  Clock3,
  Code2,
  FileCode2,
  FileText,
  GitBranch,
  GitPullRequest,
  Info,
  Play,
  RefreshCw,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  TestTube2,
  X,
  XCircle,
} from "lucide-react";

const demoPullRequests = [
  {
    id: 104,
    title: "Fix payment validation and transaction handling",
    repository: "payment-service",
    owner: "demo-org",
    branch: "fix/payment-validation",
    author: "alex-dev",
    status: "Open",
  },
  {
    id: 103,
    title: "Add authentication token refresh",
    repository: "auth-service",
    owner: "demo-org",
    branch: "feature/token-refresh",
    author: "sarah-dev",
    status: "In Review",
  },
  {
    id: 102,
    title: "Update dashboard API response handling",
    repository: "backend-api",
    owner: "demo-org",
    branch: "feature/api-response",
    author: "john-dev",
    status: "Open",
  },
];

const demoFindings = [
  {
    id: "SEC-1042",
    prId: 104,
    title: "Hardcoded API secret detected",
    severity: "High",
    category: "Secret Detection",
    agent: "Security Agent",
    file: "src/config/payment.js",
    line: 7,
    type: "Secret exposure",
    explanation:
      "A credential-like value is stored directly in the application source code. If this value is real, anyone who can access the repository may be able to use it. Exposed credentials should be treated as compromised.",
    evidence: 'const API_SECRET = "sk_test_demo_secret_12345";',
    context:
      "The value is assigned to a constant in the payment configuration file. The application appears to use this constant when communicating with the payment service.",
    recommendation:
      "Remove the hardcoded value from the source code. Rotate the credential if it is real. Load the replacement from an environment variable or a dedicated secrets manager.",
    suggestedCode:
      "const API_SECRET = process.env.PAYMENT_API_SECRET;",
    rule: "Generic hardcoded credential detection",
    cwe: "CWE-798",
    status: "Open",
  },
  {
    id: "SEC-1039",
    prId: 104,
    title: "Possible SQL injection vulnerability",
    severity: "High",
    category: "Injection Risk",
    agent: "Security Agent",
    file: "src/database/user.py",
    line: 3,
    type: "SQL injection",
    explanation:
      "The query is constructed by concatenating a value into a SQL statement. If that value comes from user input, an attacker may change the structure of the query.",
    evidence: 'query = "SELECT * FROM users WHERE id = " + user_id',
    context:
      "The database query uses string concatenation rather than parameter binding. The origin and validation of user_id should be checked.",
    recommendation:
      "Use a parameterized query. Pass the user ID as a separate parameter rather than inserting it into the SQL string.",
    suggestedCode:
      'cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))',
    rule: "Unsafe SQL query construction",
    cwe: "CWE-89",
    status: "Open",
  },
  {
    id: "QUAL-208",
    prId: 104,
    title: "Payment response is not validated",
    severity: "Medium",
    category: "Code Quality",
    agent: "Code Quality Agent",
    file: "src/services/payment.py",
    line: 3,
    type: "Missing validation",
    explanation:
      "The payment gateway response is used without checking whether the request succeeded or whether the returned data is valid.",
    evidence: "response = payment_gateway.charge(amount)",
    context:
      "The next operation should not assume that every payment request succeeds. Network errors and gateway failures are possible.",
    recommendation:
      "Validate the response status and required fields. Handle expected exceptions and log failures without recording sensitive payment data.",
    suggestedCode:
      "try:\n    response = payment_gateway.charge(amount)\n    if not response or not response.success:\n        raise PaymentError('Payment failed')\nexcept PaymentGatewayError as error:\n    logger.error('Payment request failed: %s', error)",
    rule: "Missing response validation",
    cwe: "N/A",
    status: "Open",
  },
  {
    id: "TEST-104",
    prId: 104,
    title: "Missing invalid-login test case",
    severity: "Low",
    category: "Test Gap",
    agent: "Test Gap Agent",
    file: "tests/test_auth.py",
    line: 1,
    type: "Missing test coverage",
    explanation:
      "The sample test suite does not include a test for an invalid login attempt. This leaves an important authentication failure path unverified.",
    evidence:
      "No matching invalid-credentials test was found in the sample test list.",
    context:
      "The authentication module should be tested for both successful and unsuccessful login attempts.",
    recommendation:
      "Add a test that submits invalid credentials and checks that the application rejects the request with the expected response.",
    suggestedCode:
      "def test_invalid_login(client):\n    response = client.post('/login', json={\n        'username': 'demo',\n        'password': 'wrong-password'\n    })\n    assert response.status_code == 401",
    rule: "Authentication test coverage",
    cwe: "N/A",
    status: "Open",
  },
  {
    id: "SEC-1035",
    prId: 103,
    title: "Token expiry validation needs review",
    severity: "High",
    category: "Authentication",
    agent: "Security Agent",
    file: "auth/token.py",
    line: 4,
    type: "Token validation",
    explanation:
      "The sample token validation code does not clearly demonstrate an expiry check before accepting a token.",
    evidence: "if token_signature_is_valid(token):",
    context:
      "Signature verification alone is not sufficient. Token expiry and relevant claims must also be validated.",
    recommendation:
      "Validate the expiration claim and reject expired tokens. Use a trusted token library and validate issuer and audience when applicable.",
    suggestedCode:
      "if token.expired:\n    raise AuthenticationError('Token expired')",
    rule: "Token expiry validation",
    cwe: "CWE-613",
    status: "Open",
  },
  {
    id: "QUAL-203",
    prId: 102,
    title: "API response lacks error handling",
    severity: "Medium",
    category: "Reliability",
    agent: "Code Quality Agent",
    file: "api/response.py",
    line: 2,
    type: "Error handling",
    explanation:
      "The sample response handling logic does not show a consistent path for unexpected response values.",
    evidence: "return response.json()",
    context:
      "A response may contain invalid JSON or an unsuccessful HTTP status. The caller should handle these cases.",
    recommendation:
      "Check the response status and handle JSON parsing errors before returning the data.",
    suggestedCode:
      "response.raise_for_status()\ndata = response.json()\nreturn data",
    rule: "Missing API error handling",
    cwe: "N/A",
    status: "Open",
  },
];

const demoFiles = {
  "src/config/payment.js": {
    language: "JavaScript",
    startLine: 1,
    code: [
      "import axios from 'axios';",
      "",
      "// Payment service configuration",
      "const API_URL = process.env.PAYMENT_API_URL;",
      "",
      "// Demo finding: hardcoded credential",
      'const API_SECRET = "sk_test_demo_secret_12345";',
      "",
      "export async function processPayment(amount) {",
      "  return axios.post(API_URL, { amount }, {",
      "    headers: { Authorization: API_SECRET }",
      "  });",
      "}",
    ],
  },
  "src/database/user.py": {
    language: "Python",
    startLine: 1,
    code: [
      "def get_user(cursor, user_id):",
      "    # Build user lookup query",
      '    query = "SELECT * FROM users WHERE id = " + user_id',
      "    cursor.execute(query)",
      "    return cursor.fetchone()",
    ],
  },
  "src/services/payment.py": {
    language: "Python",
    startLine: 1,
    code: [
      "def make_payment(payment_gateway, amount):",
      "    # Send payment request",
      "    response = payment_gateway.charge(amount)",
      "    return response",
    ],
  },
  "tests/test_auth.py": {
    language: "Python",
    startLine: 1,
    code: [
      "def test_successful_login(client):",
      "    response = client.post('/login', json={",
      "        'username': 'demo',",
      "        'password': 'correct-password'",
      "    })",
      "    assert response.status_code == 200",
    ],
  },
  "auth/token.py": {
    language: "Python",
    startLine: 1,
    code: [
      "def validate_token(token):",
      "    if token_signature_is_valid(token):",
      "        return True",
      "    return False",
    ],
  },
  "api/response.py": {
    language: "Python",
    startLine: 1,
    code: [
      "def parse_response(response):",
      "    return response.json()",
    ],
  },
};

const pipelineStages = [
  {
    id: "security",
    title: "Security Agent",
    description: "Secrets and vulnerability checks",
    icon: ShieldCheck,
    color: "text-red-400",
  },
  {
    id: "quality",
    title: "Quality Agent",
    description: "Code quality and maintainability",
    icon: Code2,
    color: "text-blue-400",
  },
  {
    id: "tests",
    title: "Test Gap Agent",
    description: "Missing test coverage",
    icon: TestTube2,
    color: "text-emerald-400",
  },
  {
    id: "docs",
    title: "Documentation Agent",
    description: "Documentation checks",
    icon: FileText,
    color: "text-amber-400",
  },
];

const tabs = ["Explanation", "Evidence", "Suggested fix"];

function LiveAnalysis() {
  const location = useLocation();
  const navigate = useNavigate();

  const incomingPR = location.state?.pullRequest;
  const incomingRepository = location.state?.repository || "";

  const [selectedPR, setSelectedPR] = useState(
    incomingPR?.id || 104
  );
  const [selectedFindingId, setSelectedFindingId] = useState("SEC-1042");
  const [activeTab, setActiveTab] = useState("Explanation");
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [reviewStatus, setReviewStatus] = useState({});
  const [analysisState, setAnalysisState] = useState("completed");
  const [notice, setNotice] = useState("");

  const selectedPullRequest =
    demoPullRequests.find((pr) => pr.id === selectedPR) ||
    (incomingPR
      ? {
          ...incomingPR,
          owner: incomingPR.owner || incomingRepository.split("/")[0],
          repository:
            incomingPR.repository || incomingRepository.split("/").pop(),
        }
      : demoPullRequests[0]);

  const currentFindings = useMemo(() => {
    const query = search.trim().toLowerCase();

    return demoFindings.filter((finding) => {
      const matchesPR = finding.prId === selectedPR;
      const matchesSeverity =
        filter === "All" || finding.severity === filter;

      const matchesSearch =
        finding.title.toLowerCase().includes(query) ||
        finding.file.toLowerCase().includes(query) ||
        finding.category.toLowerCase().includes(query) ||
        finding.id.toLowerCase().includes(query);

      return matchesPR && matchesSeverity && matchesSearch;
    });
  }, [selectedPR, filter, search]);

  const selectedFinding =
    currentFindings.find((item) => item.id === selectedFindingId) ||
    currentFindings[0] ||
    null;

  const selectedFile = selectedFinding
    ? demoFiles[selectedFinding.file]
    : null;

  const counts = useMemo(
    () => ({
      total: currentFindings.length,
      high: currentFindings.filter((item) => item.severity === "High").length,
      medium: currentFindings.filter((item) => item.severity === "Medium").length,
      low: currentFindings.filter((item) => item.severity === "Low").length,
    }),
    [currentFindings]
  );

  const pipelineStatus =
    analysisState === "running"
      ? ["Running", "Waiting", "Waiting", "Waiting"]
      : analysisState === "failed"
        ? ["Failed", "Waiting", "Waiting", "Waiting"]
        : analysisState === "completed"
          ? ["Demo complete", "Demo complete", "Demo complete", "Demo only"]
          : ["Waiting", "Waiting", "Waiting", "Waiting"];

  const runDemoAnalysis = () => {
    if (analysisState === "running") return;

    setAnalysisState("running");
    setNotice("Demo analysis started. No scanner or backend request was executed.");

    window.setTimeout(() => {
      setAnalysisState("completed");
      setNotice(
        "Demo analysis finished. The illustrative sample findings are still displayed."
      );
    }, 1500);
  };

  const selectPR = (value) => {
    const id = Number(value);
    setSelectedPR(id);
    setSelectedFindingId("");
    setFilter("All");
    setSearch("");
    setActiveTab("Explanation");
    setReviewStatus({});
    setAnalysisState("completed");
    setNotice("");
  };

  const markFinding = (findingId, status) => {
    setReviewStatus((previous) => ({
      ...previous,
      [findingId]: status,
    }));

    setNotice(
      `${findingId} marked as ${status.toLowerCase()} in this local demo.`
    );
  };

  const currentReviewStatus = selectedFinding
    ? reviewStatus[selectedFinding.id] || selectedFinding.status
    : "";

  return (
    <div className="mx-auto max-w-[1600px] space-y-6">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-400">
            <Activity size={14} />
            Analysis workspace
          </div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Live Analysis
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Inspect code changes, security evidence and AI-assisted recommendations.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => navigate("/app/pull-requests")}
            className="flex items-center gap-2 rounded-lg border border-[#263750] bg-[#111B2E] px-4 py-2.5 text-sm text-slate-300 hover:bg-[#17243A]"
          >
            <ArrowLeft size={16} />
            Pull requests
          </button>

          <button
            type="button"
            onClick={runDemoAnalysis}
            disabled={analysisState === "running"}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {analysisState === "running" ? (
              <RefreshCw size={16} className="animate-spin" />
            ) : (
              <Play size={16} />
            )}
            {analysisState === "running" ? "Running demo..." : "Run demo analysis"}
          </button>
        </div>
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-blue-500/20 bg-blue-500/[0.06] p-4">
        <Info size={19} className="mt-0.5 shrink-0 text-blue-400" />
        <div>
          <p className="text-sm font-semibold text-blue-200">
            Demonstration analysis
          </p>
          <p className="mt-1 text-xs leading-5 text-slate-400">
            Findings, code snippets and pipeline results on this page are
            illustrative. The demo button changes the displayed workflow state
            only. Real repository scanning and AI-agent execution require backend
            integration.
          </p>
        </div>
      </div>

      {notice && (
        <div
          role="status"
          className="flex items-center justify-between gap-3 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300"
        >
          <span>{notice}</span>
          <button
            type="button"
            onClick={() => setNotice("")}
            aria-label="Dismiss notification"
            className="rounded p-1 hover:bg-white/10"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <section className="rounded-xl border border-[#263750] bg-[#111B2E] p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <GitPullRequest size={21} />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-slate-500">Currently reviewing</p>
              <h2 className="mt-1 truncate font-semibold text-white">
                PR #{selectedPullRequest.id} · {selectedPullRequest.title}
              </h2>
              <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                <GitBranch size={12} />
                {selectedPullRequest.owner}/{selectedPullRequest.repository}
                {" · "}
                {selectedPullRequest.author}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`flex items-center gap-2 rounded-md border px-3 py-2 text-xs ${
                analysisState === "running"
                  ? "border-blue-500/20 bg-blue-500/10 text-blue-300"
                  : analysisState === "failed"
                    ? "border-rose-500/20 bg-rose-500/10 text-rose-300"
                    : "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
              }`}
            >
              <span className="h-2 w-2 rounded-full bg-current" />
              {analysisState === "running"
                ? "Demo running"
                : analysisState === "failed"
                  ? "Demo failed"
                  : "Sample results loaded"}
            </span>

            <select
              value={selectedPR}
              onChange={(event) => selectPR(event.target.value)}
              aria-label="Select pull request"
              className="max-w-full rounded-lg border border-[#334155] bg-[#17243A] px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-blue-500"
            >
              {demoPullRequests.map((pr) => (
                <option key={pr.id} value={pr.id}>
                  PR #{pr.id} · {pr.repository}
                </option>
              ))}
              {incomingPR &&
                !demoPullRequests.some((pr) => pr.id === incomingPR.id) && (
                  <option value={incomingPR.id}>
                    PR #{incomingPR.id} · {incomingPR.repository}
                  </option>
                )}
            </select>
          </div>
        </div>

        {incomingRepository && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-cyan-400/10 bg-cyan-400/[0.04] px-3 py-2 text-xs text-cyan-300">
            <GitBranch size={14} />
            Opened from repository: {incomingRepository}
          </div>
        )}

        <div className="mt-5 grid grid-cols-2 gap-3 border-t border-[#263750] pt-5 sm:grid-cols-4">
          <SummaryItem
            label="Total findings"
            value={counts.total}
            icon={Bug}
            color="text-orange-400"
          />
          <SummaryItem
            label="High severity"
            value={counts.high}
            icon={ShieldAlert}
            color="text-rose-400"
          />
          <SummaryItem
            label="Medium severity"
            value={counts.medium}
            icon={AlertTriangle}
            color="text-amber-400"
          />
          <SummaryItem
            label="Low severity"
            value={counts.low}
            icon={Info}
            color="text-blue-400"
          />
        </div>
      </section>

      <section className="rounded-xl border border-[#263750] bg-[#111B2E] p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-semibold text-white">Review pipeline</h2>
            <p className="mt-1 text-xs text-slate-500">
              Sample workflow stages
            </p>
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            Demo pipeline
          </span>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {pipelineStages.map((stage, index) => (
            <PipelineCard
              key={stage.id}
              stage={stage}
              status={pipelineStatus[index]}
            />
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        <section className="overflow-hidden rounded-xl border border-[#263750] bg-[#111B2E] xl:col-span-4">
          <div className="border-b border-[#263750] p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-white">Findings</h2>
              <span className="rounded-md bg-[#263750] px-2 py-1 text-xs text-slate-300">
                {currentFindings.length}
              </span>
            </div>

            <div className="relative mt-4">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search findings..."
                aria-label="Search findings"
                className="w-full rounded-lg border border-[#263750] bg-[#0D1728] py-2.5 pl-9 pr-3 text-xs text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
              />
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {["All", "High", "Medium", "Low"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                  className={`rounded-md px-3 py-1.5 text-[11px] font-semibold transition ${
                    filter === item
                      ? "bg-blue-600 text-white"
                      : "border border-[#263750] text-slate-400 hover:bg-[#17243A]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="max-h-[650px] divide-y divide-[#263750] overflow-y-auto">
            {currentFindings.length > 0 ? (
              currentFindings.map((finding) => (
                <button
                  key={finding.id}
                  type="button"
                  onClick={() => {
                    setSelectedFindingId(finding.id);
                    setActiveTab("Explanation");
                  }}
                  className={`w-full p-4 text-left transition ${
                    selectedFinding?.id === finding.id
                      ? "border-l-2 border-blue-500 bg-blue-500/[0.07]"
                      : "border-l-2 border-transparent hover:bg-[#17243A]/60"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-white">
                        {finding.title}
                      </p>
                      <p className="mt-2 text-[10px] text-slate-500">
                        {finding.id} · {finding.category}
                      </p>
                    </div>
                    <SeverityBadge severity={finding.severity} />
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-2">
                    <span className="truncate text-[10px] text-slate-500">
                      {finding.file}
                    </span>
                    <span className="shrink-0 text-[10px] text-slate-500">
                      {reviewStatus[finding.id] || finding.status}
                    </span>
                  </div>
                </button>
              ))
            ) : (
              <div className="p-7 text-center">
                <Search size={22} className="mx-auto text-slate-600" />
                <p className="mt-3 text-sm text-slate-300">
                  No findings found
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Change the filter or search term.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setFilter("All");
                  }}
                  className="mt-3 text-xs font-semibold text-cyan-400"
                >
                  Clear finding filters
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="min-w-0 space-y-5 xl:col-span-8">
          {selectedFinding ? (
            <>
              <div className="rounded-xl border border-[#263750] bg-[#111B2E] p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <SeverityBadge severity={selectedFinding.severity} />
                  <span className="text-xs text-slate-500">
                    {selectedFinding.id}
                  </span>
                  <span className="rounded-md border border-[#334155] px-2 py-1 text-[10px] text-slate-400">
                    {selectedFinding.category}
                  </span>
                </div>

                <h2 className="mt-3 text-xl font-bold text-white">
                  {selectedFinding.title}
                </h2>

                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <FileCode2 size={14} className="text-blue-400" />
                    {selectedFinding.file}:{selectedFinding.line}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Bot size={14} className="text-purple-400" />
                    {selectedFinding.agent}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock3 size={14} />
                    {currentReviewStatus}
                  </span>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl border border-[#263750] bg-[#111B2E]">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#263750] px-4 py-3">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <FileCode2 size={15} className="text-blue-400" />
                    {selectedFinding.file}
                  </div>
                  <span className="rounded-md bg-[#263750] px-2 py-1 text-[10px] text-slate-400">
                    {selectedFile?.language || "Source"}
                  </span>
                </div>

                <div className="overflow-x-auto bg-[#090F1C] py-3">
                  {selectedFile?.code.map((line, index) => {
                    const actualLine = selectedFile.startLine + index;
                    const isFindingLine =
                      selectedFinding.line === actualLine;

                    return (
                      <div
                        key={`${selectedFinding.file}-${index}`}
                        className={`flex min-w-[520px] px-4 py-1 font-mono text-xs ${
                          isFindingLine
                            ? "border-l-2 border-orange-400 bg-orange-500/10"
                            : "border-l-2 border-transparent"
                        }`}
                      >
                        <span className="w-10 shrink-0 select-none text-right text-slate-600">
                          {actualLine}
                        </span>
                        <span
                          className={`ml-5 whitespace-pre ${
                            isFindingLine
                              ? "text-orange-200"
                              : "text-slate-300"
                          }`}
                        >
                          {line || " "}
                        </span>
                        {isFindingLine && (
                          <span className="ml-4 whitespace-nowrap text-[10px] text-orange-400">
                            ← Finding
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center gap-2 border-t border-[#263750] px-4 py-3 text-[10px] text-slate-500">
                  <AlertTriangle size={13} className="text-orange-400" />
                  Highlighted line indicates the sample finding location.
                </div>
              </div>

              <div className="overflow-hidden rounded-xl border border-[#263750] bg-[#111B2E]">
                <div className="flex flex-wrap border-b border-[#263750]">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      className={`border-b-2 px-4 py-4 text-xs font-semibold transition ${
                        activeTab === tab
                          ? "border-blue-500 text-blue-400"
                          : "border-transparent text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="p-5">
                  {activeTab === "Explanation" && (
                    <div className="space-y-5">
                      <div>
                        <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
                          <Sparkles size={16} className="text-blue-400" />
                          What was detected?
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-slate-400">
                          {selectedFinding.explanation}
                        </p>
                      </div>

                      <div className="rounded-lg border border-[#263750] bg-[#0D1728] p-4">
                        <h4 className="text-xs font-semibold text-slate-300">
                          Additional context
                        </h4>
                        <p className="mt-2 text-sm leading-6 text-slate-400">
                          {selectedFinding.context}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <DetailField
                          label="Detection rule"
                          value={selectedFinding.rule}
                        />
                        <DetailField
                          label="CWE reference"
                          value={selectedFinding.cwe}
                        />
                        <DetailField
                          label="Finding type"
                          value={selectedFinding.type}
                        />
                        <DetailField
                          label="Review agent"
                          value={selectedFinding.agent}
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === "Evidence" && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-semibold text-white">
                          Supporting evidence
                        </h3>
                        <p className="mt-2 text-xs leading-6 text-slate-500">
                          This snippet is illustrative evidence associated
                          with the selected sample finding.
                        </p>
                      </div>

                      <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg border border-orange-500/20 bg-[#090F1C] p-4 font-mono text-xs leading-7 text-orange-200">
                        {selectedFinding.evidence}
                      </pre>

                      <div className="rounded-lg border border-amber-500/20 bg-amber-500/[0.05] p-4">
                        <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
                          <AlertTriangle size={15} />
                          Verification required
                        </div>
                        <p className="mt-2 text-xs leading-6 text-slate-400">
                          This is sample evidence, not output from an actual
                          security scanner. Verify the source file and execution
                          context before treating it as a confirmed vulnerability.
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === "Suggested fix" && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
                          <Sparkles size={16} className="text-emerald-400" />
                          Recommended remediation
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-slate-400">
                          {selectedFinding.recommendation}
                        </p>
                      </div>

                      <div className="overflow-hidden rounded-lg border border-emerald-500/20">
                        <div className="flex items-center justify-between gap-3 border-b border-emerald-500/20 bg-emerald-500/[0.06] px-4 py-3">
                          <span className="text-xs font-semibold text-emerald-300">
                            Suggested code
                          </span>
                          <span className="text-[10px] text-slate-500">
                            Illustrative proposal
                          </span>
                        </div>
                        <pre className="overflow-x-auto whitespace-pre-wrap bg-[#090F1C] p-4 font-mono text-xs leading-7 text-emerald-200">
                          {selectedFinding.suggestedCode}
                        </pre>
                      </div>

                      <div className="rounded-lg border border-[#263750] bg-[#0D1728] p-4">
                        <p className="text-xs font-semibold text-slate-300">
                          Before applying a fix
                        </p>
                        <ul className="mt-3 space-y-2 text-xs leading-5 text-slate-400">
                          <li>• Review the complete affected function.</li>
                          <li>• Confirm that the suggested code matches your project.</li>
                          <li>• Run tests before merging the change.</li>
                          <li>• Require human approval before applying changes.</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col justify-between gap-3 rounded-xl border border-[#263750] bg-[#111B2E] p-4 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm font-semibold text-white">
                    Human review decision
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Record your decision for this sample finding.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      markFinding(selectedFinding.id, "Reviewed")
                    }
                    className="flex items-center gap-2 rounded-lg border border-emerald-500/30 px-3 py-2.5 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/10"
                  >
                    <Check size={15} />
                    Mark reviewed
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      markFinding(selectedFinding.id, "Accepted risk")
                    }
                    className="flex items-center gap-2 rounded-lg border border-amber-500/30 px-3 py-2.5 text-xs font-semibold text-amber-400 hover:bg-amber-500/10"
                  >
                    <AlertTriangle size={14} />
                    Accept risk
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-[#263750] bg-[#111B2E] p-8 text-center">
              <ShieldCheck size={35} className="text-emerald-400" />
              <h3 className="mt-4 font-semibold text-white">
                No matching findings
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                There are no sample findings for this PR and filter combination.
              </p>
              <button
                type="button"
                onClick={() => {
                  setFilter("All");
                  setSearch("");
                }}
                className="mt-4 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-[#263750] bg-[#0D1728] p-4">
        <ShieldCheck size={18} className="mt-0.5 shrink-0 text-emerald-400" />
        <p className="text-xs leading-6 text-slate-500">
          CodeGuardian AI follows a human-in-the-loop review process.
          Suggested fixes are proposals only. No source code is modified
          automatically and no pull request is published from this demo page.
          Review decisions are currently stored only in local component state.
        </p>
      </div>
    </div>
  );
}

function SummaryItem({ label, value, icon: Icon, color }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-lg bg-[#17243A] ${color}`}
      >
        <Icon size={17} />
      </div>
      <div>
        <p className="text-xl font-bold text-white">{value}</p>
        <p className="text-[10px] text-slate-500">{label}</p>
      </div>
    </div>
  );
}

function PipelineCard({ stage, status }) {
  const Icon = stage.icon;
  const isRunning = status === "Running";
  const isComplete = status === "Demo complete";
  const isFailed = status === "Failed";

  return (
    <div className="rounded-lg border border-[#263750] bg-[#0D1728] p-3">
      <div className="flex items-center justify-between gap-2">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-lg bg-[#17243A] ${stage.color}`}
        >
          <Icon size={17} />
        </div>
        <span
          className={`flex items-center gap-1 text-[9px] font-bold uppercase ${
            isComplete
              ? "text-emerald-400"
              : isRunning
                ? "text-blue-400"
                : isFailed
                  ? "text-rose-400"
                  : "text-slate-500"
          }`}
        >
          {isComplete && <CheckCircle2 size={12} />}
          {isRunning && <RefreshCw size={11} className="animate-spin" />}
          {isFailed && <XCircle size={12} />}
          {status}
        </span>
      </div>
      <p className="mt-3 text-xs font-semibold text-white">{stage.title}</p>
      <p className="mt-1 text-[10px] leading-5 text-slate-500">
        {stage.description}
      </p>
    </div>
  );
}

function SeverityBadge({ severity }) {
  const styles = {
    High: "border-orange-500/20 bg-orange-500/10 text-orange-400",
    Medium: "border-amber-500/20 bg-amber-500/10 text-amber-400",
    Low: "border-blue-500/20 bg-blue-500/10 text-blue-400",
  };

  return (
    <span
      className={`shrink-0 rounded-md border px-2 py-1 text-[10px] font-bold ${
        styles[severity] || "border-slate-500/20 bg-slate-500/10 text-slate-400"
      }`}
    >
      {severity}
    </span>
  );
}

function DetailField({ label, value }) {
  return (
    <div className="rounded-lg border border-[#263750] bg-[#0D1728] p-3">
      <p className="text-[10px] uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <p className="mt-2 break-words text-xs font-medium text-slate-200">
        {value}
      </p>
    </div>
  );
}

export default LiveAnalysis;
