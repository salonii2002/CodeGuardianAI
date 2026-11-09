

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  Bot,
  Bug,
  Check,
  Code2,
  FileCode2,
  FileText,
  GitPullRequest,
  Info,
  Play,
  RefreshCw,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  TestTube2,
  X
} from "lucide-react";

const pullRequests = [
  {
    id: 142,
    title: "Add payment processing API",
    repository: "payment-service",
    branch: "feature/payment-api",
    author: "Alex Morgan",
    status: "Review required"
  },
  {
    id: 139,
    title: "Update authentication middleware",
    repository: "auth-service",
    branch: "fix/auth-middleware",
    author: "Sarah Chen",
    status: "Completed"
  },
  {
    id: 136,
    title: "Improve API response handling",
    repository: "backend-api",
    branch: "feature/api-response",
    author: "James Wilson",
    status: "Review required"
  }
];

const initialFindings = [
  {
    id: "SEC-1042",
    title: "Hardcoded API secret detected",
    severity: "High",
    category: "Secret Detection",
    agent: "Security Agent",
    file: "src/config/payment.js",
    line: 24,
    type: "Secret exposure",
    explanation:
      "A credential-like value is stored directly in the application source code. If this value is real, anyone who can access the repository may be able to use it. Exposed credentials should be treated as compromised.",
    evidence:
      'const API_SECRET = "sk_test_demo_secret_12345";',
    context:
      "The value is assigned to a constant in the payment configuration file. The application appears to use this constant when communicating with the payment service.",
    recommendation:
      "Remove the hardcoded value from the source code. Rotate the credential if it is real. Load the replacement from an environment variable or a dedicated secrets manager.",
    suggestedCode:
      "const API_SECRET = process.env.PAYMENT_API_SECRET;",
    rule: "Generic hardcoded credential detection",
    cwe: "CWE-798",
    status: "Open"
  },
  {
    id: "SEC-1039",
    title: "Possible SQL injection vulnerability",
    severity: "High",
    category: "Injection Risk",
    agent: "Security Agent",
    file: "src/database/user.py",
    line: 81,
    type: "SQL injection",
    explanation:
      "The query is constructed by concatenating a value into a SQL statement. If that value comes from user input, an attacker may change the structure of the query.",
    evidence:
      'query = "SELECT * FROM users WHERE id = " + user_id',
    context:
      "The database query uses string concatenation rather than parameter binding. The origin and validation of user_id should be checked.",
    recommendation:
      "Use a parameterized query. Pass the user ID as a separate parameter rather than inserting it into the SQL string.",
    suggestedCode:
      'cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))',
    rule: "Unsafe SQL query construction",
    cwe: "CWE-89",
    status: "Open"
  },
  {
    id: "QUAL-208",
    title: "Payment response is not validated",
    severity: "Medium",
    category: "Code Quality",
    agent: "Code Quality Agent",
    file: "src/services/payment.py",
    line: 56,
    type: "Missing validation",
    explanation:
      "The payment gateway response is used without checking whether the request succeeded or whether the returned data is valid.",
    evidence:
      "response = payment_gateway.charge(amount)",
    context:
      "The next operation should not assume that every payment request succeeds. Network errors and gateway failures are possible.",
    recommendation:
      "Validate the response status and required fields. Handle expected exceptions and log failures without recording sensitive payment data.",
    suggestedCode:
      "try:\n    response = payment_gateway.charge(amount)\n    if not response or not response.success:\n        raise PaymentError('Payment failed')\nexcept PaymentGatewayError as error:\n    logger.error('Payment request failed: %s', error)",
    rule: "Missing response validation",
    cwe: "N/A",
    status: "Open"
  },
  {
    id: "TEST-104",
    title: "Missing invalid-login test case",
    severity: "Low",
    category: "Test Gap",
    agent: "Test Gap Agent",
    file: "tests/test_auth.py",
    line: 0,
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
    status: "Open"
  }
];

const files = [
  {
    name: "src/config/payment.js",
    language: "JavaScript",
    startLine: 18,
    findingIds: ["SEC-1042"],
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
      "}"
    ]
  },
  {
    name: "src/database/user.py",
    language: "Python",
    startLine: 79,
    findingIds: ["SEC-1039"],
    code: [
      "def get_user(cursor, user_id):",
      "    # Build user lookup query",
      '    query = "SELECT * FROM users WHERE id = " + user_id',
      "    cursor.execute(query)",
      "    return cursor.fetchone()"
    ]
  },
  {
    name: "src/services/payment.py",
    language: "Python",
    startLine: 54,
    findingIds: ["QUAL-208"],
    code: [
      "def make_payment(payment_gateway, amount):",
      "    # Send payment request",
      "    response = payment_gateway.charge(amount)",
      "    return response"
    ]
  },
  {
    name: "tests/test_auth.py",
    language: "Python",
    startLine: 1,
    findingIds: ["TEST-104"],
    code: [
      "def test_successful_login(client):",
      "    response = client.post('/login', json={",
      "        'username': 'demo',",
      "        'password': 'correct-password'",
      "    })",
      "    assert response.status_code == 200"
    ]
  }
];
const tabs = ["Explanation", "Evidence", "Suggested fix"];

function LiveAnalysis() {
  const navigate = useNavigate();

  const [selectedPR, setSelectedPR] = useState(142);
  const [selectedFindingId, setSelectedFindingId] = useState("SEC-1042");
  const [activeTab, setActiveTab] = useState("Explanation");
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [reviewStatus, setReviewStatus] = useState({});
  const [analysisRunning, setAnalysisRunning] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(true);
  const [notice, setNotice] = useState("");

  const selectedPullRequest = pullRequests.find(
    (pr) => pr.id === selectedPR
  );

  const currentFindings = useMemo(() => {
    return initialFindings.filter((finding) => {
      const matchesPR =
        selectedPR === 142 ||
        (selectedPR === 139 && finding.id === "TEST-104") ||
        (selectedPR === 136 && finding.id !== "TEST-104");

      const matchesFilter =
        filter === "All" || finding.severity === filter;

      const matchesSearch =
        finding.title.toLowerCase().includes(search.toLowerCase()) ||
        finding.file.toLowerCase().includes(search.toLowerCase()) ||
        finding.category.toLowerCase().includes(search.toLowerCase());

      return matchesPR && matchesFilter && matchesSearch;
    });
  }, [selectedPR, filter, search]);

  const selectedFinding =
    currentFindings.find((item) => item.id === selectedFindingId) ||
    currentFindings[0];

  const selectedFile = selectedFinding
    ? files.find((file) => file.findingIds.includes(selectedFinding.id))
    : null;

  const counts = {
    high: currentFindings.filter((item) => item.severity === "High").length,
    medium: currentFindings.filter((item) => item.severity === "Medium").length,
    low: currentFindings.filter((item) => item.severity === "Low").length
  };

  const markFinding = (findingId, status) => {
    setReviewStatus((previous) => ({
      ...previous,
      [findingId]: status
    }));

    setNotice(
      status === "Reviewed"
        ? `${findingId} marked as reviewed.`
        : `${findingId} marked as accepted risk.`
    );
  };

  const runAnalysis = () => {
    setAnalysisRunning(true);
    setAnalysisComplete(false);
    setNotice("Demo analysis started.");

    window.setTimeout(() => {
      setAnalysisRunning(false);
      setAnalysisComplete(true);
      setNotice("Demo analysis completed. Sample findings are displayed.");
    }, 1200);
  };

  const selectPR = (value) => {
    const id = Number(value);
    setSelectedPR(id);

    const nextFinding =
      id === 139 ? "TEST-104" :
      id === 136 ? "QUAL-208" :
      "SEC-1042";

    setSelectedFindingId(nextFinding);
    setFilter("All");
    setSearch("");
    setActiveTab("Explanation");
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
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
            onClick={() => navigate("/app/pull-requests")}
            className="flex items-center gap-2 rounded-lg border border-[#263750] bg-[#111B2E] px-4 py-2.5 text-sm text-slate-300 hover:bg-[#17243A]"
          >
            <ArrowLeft size={16} />
            Pull requests
          </button>

          <button
            onClick={runAnalysis}
            disabled={analysisRunning}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {analysisRunning ? (
              <RefreshCw size={16} className="animate-spin" />
            ) : (
              <Play size={16} />
            )}
            {analysisRunning ? "Analyzing..." : "Run demo analysis"}
          </button>
        </div>
      </div>

      {/* DEMO NOTICE */}
      <div className="flex items-start gap-3 rounded-xl border border-blue-500/20 bg-blue-500/[0.06] p-4">
        <Info size={19} className="mt-0.5 shrink-0 text-blue-400" />
        <div>
          <p className="text-sm font-semibold text-blue-200">
            Demonstration analysis
          </p>
          <p className="mt-1 text-xs leading-5 text-slate-400">
            Findings, code snippets and agent results on this page are illustrative.
            The Run button simulates a frontend analysis state. Real repository
            scanning will be connected to the backend later.
          </p>
        </div>
      </div>

      {notice && (
        <div className="flex items-center justify-between rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
          {notice}
          <button onClick={() => setNotice("")}>
            <X size={16} />
          </button>
        </div>
      )}

      {/* PULL REQUEST SELECTOR */}
      <section className="rounded-xl border border-[#263750] bg-[#111B2E] p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <GitPullRequest size={21} />
            </div>

            <div>
              <p className="text-xs text-slate-500">Currently reviewing</p>
              <h2 className="mt-1 font-semibold text-white">
                PR #{selectedPullRequest.id} · {selectedPullRequest.title}
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                {selectedPullRequest.repository} · {selectedPullRequest.author}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-2 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              {analysisComplete ? "Analysis available" : "Analysis pending"}
            </span>

            <select
              value={selectedPR}
              onChange={(e) => selectPR(e.target.value)}
              className="rounded-lg border border-[#334155] bg-[#17243A] px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-blue-500"
            >
              {pullRequests.map((pr) => (
                <option key={pr.id} value={pr.id}>
                  PR #{pr.id} · {pr.repository}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 border-t border-[#263750] pt-5 sm:grid-cols-4">
          <SummaryItem
            label="Total findings"
            value={currentFindings.length}
            icon={Bug}
            color="text-orange-400"
          />
          <SummaryItem
            label="High severity"
            value={counts.high}
            icon={ShieldAlert}
            color="text-orange-400"
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

      {/* AGENT PIPELINE */}
      <section className="rounded-xl border border-[#263750] bg-[#111B2E] p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-semibold text-white">Review pipeline</h2>
            <p className="mt-1 text-xs text-slate-500">
              Four specialized review stages
            </p>
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            Sample workflow
          </span>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <PipelineCard
            icon={ShieldCheck}
            title="Security Agent"
            description="Secrets and vulnerabilities"
            color="text-red-400"
            status="Completed"
          />
          <PipelineCard
            icon={Code2}
            title="Quality Agent"
            description="Code quality and maintainability"
            color="text-blue-400"
            status="Completed"
          />
          <PipelineCard
            icon={TestTube2}
            title="Test Gap Agent"
            description="Missing test coverage"
            color="text-emerald-400"
            status="Completed"
          />
          <PipelineCard
            icon={FileText}
            title="Documentation Agent"
            description="Documentation checks"
            color="text-amber-400"
            status="Beta"
          />
        </div>
      </section>

      {/* MAIN ANALYSIS AREA */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">

        {/* FINDING LIST */}
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
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search findings..."
                className="w-full rounded-lg border border-[#263750] bg-[#0D1728] py-2.5 pl-9 pr-3 text-xs text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
              />
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {["All", "High", "Medium", "Low"].map((item) => (
                <button
                  key={item}
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
              </div>
            )}
          </div>
        </section>

        {/* FINDING DETAIL AND CODE */}
        <section className="min-w-0 space-y-5 xl:col-span-8">
          {selectedFinding ? (
            <>
              {/* FINDING TITLE */}
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
                    {selectedFinding.file}
                    {selectedFinding.line > 0 && `:${selectedFinding.line}`}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Bot size={14} className="text-purple-400" />
                    {selectedFinding.agent}
                  </span>
                </div>
              </div>

              {/* CODE VIEW */}
              <div className="overflow-hidden rounded-xl border border-[#263750] bg-[#111B2E]">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#263750] px-4 py-3">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <FileCode2 size={15} className="text-blue-400" />
                    {selectedFile?.name || selectedFinding.file}
                  </div>
                  <span className="rounded-md bg-[#263750] px-2 py-1 text-[10px] text-slate-400">
                    {selectedFile?.language || "Source"}
                  </span>
                </div>

                <div className="overflow-x-auto bg-[#090F1C] py-3">
                {selectedFile?.code.map((line, index) => {
                    const actualLine = (selectedFile.startLine ?? 1) + index;
                    const isFindingLine =
                        selectedFinding.line > 0 &&
                        selectedFinding.line === actualLine;
                    return (
                      <div
                        key={index}
                        className={`flex min-w-[520px] px-4 py-1 font-mono text-xs ${
                          isFindingLine
                            ? "border-l-2 border-orange-400 bg-orange-500/10"
                            : "border-l-2 border-transparent"
                        }`}
                      >
                        <span className="w-10 shrink-0 select-none text-right text-slate-600">
                          {actualLine}
                        </span>
                        <span className={`ml-5 whitespace-pre ${
                          isFindingLine ? "text-orange-200" : "text-slate-300"
                        }`}>
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

              {/* DETAIL TABS */}
              <div className="overflow-hidden rounded-xl border border-[#263750] bg-[#111B2E]">
                <div className="flex flex-wrap border-b border-[#263750]">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
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
                          The following snippet is illustrative evidence
                          associated with this sample finding.
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
                          This is sample evidence, not the output of an actual
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

              {/* REVIEW ACTIONS */}
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
                    onClick={() => markFinding(selectedFinding.id, "Reviewed")}
                    className="flex items-center gap-2 rounded-lg border border-emerald-500/30 px-3 py-2.5 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/10"
                  >
                    <Check size={15} />
                    Mark reviewed
                  </button>

                  <button
                    onClick={() => markFinding(selectedFinding.id, "Accepted risk")}
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
                Choose another pull request or change the filters.
              </p>
            </div>
          )}
        </section>
      </div>

      {/* FOOTER NOTE */}
      <div className="flex items-start gap-3 rounded-xl border border-[#263750] bg-[#0D1728] p-4">
        <ShieldCheck size={18} className="mt-0.5 shrink-0 text-emerald-400" />
        <p className="text-xs leading-6 text-slate-500">
          CodeGuardian AI follows a human-in-the-loop review process.
          Suggested fixes are proposals only. No source code is modified
          automatically and no pull request is published from this demo page.
        </p>
      </div>
    </div>
  );
}

function SummaryItem({ label, value, icon: Icon, color }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-[#17243A] ${color}`}>
        <Icon size={17} />
      </div>
      <div>
        <p className="text-xl font-bold text-white">{value}</p>
        <p className="text-[10px] text-slate-500">{label}</p>
      </div>
    </div>
  );
}

function PipelineCard({ icon: Icon, title, description, color, status }) {
  return (
    <div className="rounded-lg border border-[#263750] bg-[#0D1728] p-3">
      <div className="flex items-center justify-between gap-2">
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-[#17243A] ${color}`}>
          <Icon size={17} />
        </div>
        <span className={`text-[9px] font-bold uppercase ${
          status === "Completed" ? "text-emerald-400" : "text-blue-400"
        }`}>
          {status}
        </span>
      </div>
      <p className="mt-3 text-xs font-semibold text-white">{title}</p>
      <p className="mt-1 text-[10px] leading-5 text-slate-500">{description}</p>
    </div>
  );
}

function SeverityBadge({ severity }) {
  const styles = {
    High: "border-orange-500/20 bg-orange-500/10 text-orange-400",
    Medium: "border-amber-500/20 bg-amber-500/10 text-amber-400",
    Low: "border-blue-500/20 bg-blue-500/10 text-blue-400"
  };

  return (
    <span className={`shrink-0 rounded-md border px-2 py-1 text-[10px] font-bold ${styles[severity] || styles.Low}`}>
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
