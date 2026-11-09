
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronRight,
  Code2,
  GitPullRequest,
  MessageSquare,
  ShieldAlert,
  X,
  XCircle,
  Send,
  Clock3
} from "lucide-react";

const initialComments = [
  {
    id: "COMMENT-001",
    title: "Hardcoded API secret detected",
    severity: "Critical",
    file: "src/config/payment.js",
    line: 24,
    agent: "Security Agent",
    status: "Pending",
    code: `const API_SECRET = "sk_live_example_secret";`,
    suggestion:
      "Move the API secret into an environment variable. Never store production credentials directly in source code.",
    explanation:
      "A hardcoded secret can be exposed through source control, logs, or repository access. An attacker could use the credential to access protected services.",
    recommendation:
      "Use process.env.PAYMENT_API_SECRET and configure the secret securely in your deployment environment."
  },
  {
    id: "COMMENT-002",
    title: "Potential SQL injection",
    severity: "High",
    file: "src/database/user.py",
    line: 81,
    agent: "Security Agent",
    status: "Pending",
    code: `query = "SELECT * FROM users WHERE id = " + user_id`,
    suggestion:
      "Use parameterized SQL queries instead of string concatenation.",
    explanation:
      "Combining user-controlled input directly with SQL statements can allow unexpected query execution.",
    recommendation:
      "Use parameterized queries supported by your database library."
  },
  {
    id: "COMMENT-003",
    title: "Missing payment response validation",
    severity: "Medium",
    file: "src/services/payment.py",
    line: 56,
    agent: "Quality Agent",
    status: "Pending",
    code: `return response["payment_status"]`,
    suggestion:
      "Validate the response structure before accessing payment_status.",
    explanation:
      "If the external payment response does not contain the expected key, the application may raise an unexpected exception.",
    recommendation:
      "Check that the response is valid and contains the required field before using it."
  },
  {
    id: "COMMENT-004",
    title: "Missing invalid-login test",
    severity: "Low",
    file: "tests/test_auth.py",
    line: 18,
    agent: "Test Gap Agent",
    status: "Pending",
    code: `def test_login_success():`,
    suggestion:
      "Add a test for invalid credentials and unsuccessful login attempts.",
    explanation:
      "The current sample test covers successful login, but does not demonstrate how the application handles invalid credentials.",
    recommendation:
      "Add test cases for incorrect passwords, unknown users, and repeated failed attempts."
  }
];

const severityStyles = {
  Critical: "border-red-500/30 bg-red-500/10 text-red-400",
  High: "border-orange-500/30 bg-orange-500/10 text-orange-400",
  Medium: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  Low: "border-blue-500/30 bg-blue-500/10 text-blue-400"
};

function PRCommentPreview() {
  const navigate = useNavigate();

  const [comments, setComments] = useState(initialComments);
  const [selectedId, setSelectedId] = useState(initialComments[0].id);
  const [publishMessage, setPublishMessage] = useState("");

  const selectedComment = comments.find(
    (comment) => comment.id === selectedId
  );

  const approvedCount = comments.filter(
    (comment) => comment.status === "Approved"
  ).length;

  const rejectedCount = comments.filter(
    (comment) => comment.status === "Rejected"
  ).length;

  const pendingCount = comments.filter(
    (comment) => comment.status === "Pending"
  ).length;

  const approvedComments = useMemo(
    () => comments.filter((comment) => comment.status === "Approved"),
    [comments]
  );

  const updateStatus = (id, status) => {
    setComments((previous) =>
      previous.map((comment) =>
        comment.id === id ? { ...comment, status } : comment
      )
    );

    setPublishMessage("");
  };

  const publishApproved = () => {
    if (approvedCount === 0) {
      setPublishMessage("Approve at least one comment before publishing.");
      return;
    }

    setComments((previous) =>
      previous.map((comment) =>
        comment.status === "Approved"
          ? { ...comment, status: "Published" }
          : comment
      )
    );

    setPublishMessage(
      `${approvedCount} approved comment(s) marked as published in this demo.`
    );
  };

  const resetComments = () => {
    setComments(initialComments);
    setSelectedId(initialComments[0].id);
    setPublishMessage("");
  };

  const statusStyles = {
    Pending: "border-amber-500/30 bg-amber-500/10 text-amber-400",
    Approved: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    Rejected: "border-red-500/30 bg-red-500/10 text-red-400",
    Published: "border-blue-500/30 bg-blue-500/10 text-blue-400"
  };

  return (
    <div className="mx-auto max-w-7xl space-y-7">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
            <span>Workspace</span>
            <ChevronRight size={14} />
            <span className="text-blue-400">PR Comment Preview</span>
          </div>

          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            PR Comment Preview
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            Review suggested comments, inspect the supporting explanation,
            and approve or reject comments before publication.
          </p>
        </div>

        <button
          onClick={() => navigate("/app/pull-requests")}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#263750] bg-[#111B2E] px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-blue-500/50 hover:text-white"
        >
          <GitPullRequest size={16} />
          Pull Requests
        </button>
      </div>

      {/* Demo notice */}
      <div className="flex items-start gap-3 rounded-xl border border-blue-500/20 bg-blue-500/[0.06] p-4">
        <MessageSquare size={19} className="mt-0.5 shrink-0 text-blue-400" />
        <div>
          <p className="text-sm font-semibold text-blue-300">
            Human approval workflow
          </p>
          <p className="mt-1 text-xs leading-5 text-slate-400">
            Suggested comments must be reviewed by a developer. This is a
            frontend demonstration: approving and publishing comments does
            not send anything to GitHub.
          </p>
        </div>
      </div>

      {/* Pull request information */}
      <div className="rounded-2xl border border-[#263750] bg-[#111B2E] p-5">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-lg bg-blue-500/10 px-2.5 py-1 text-xs font-semibold text-blue-400">
                PR #142
              </span>
              <span className="rounded-lg border border-[#334760] px-2.5 py-1 text-xs text-slate-400">
                Open
              </span>
            </div>

            <h2 className="mt-3 text-lg font-semibold text-white">
              Payment service validation update
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              payment-service · feature/payment-validation
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Clock3 size={14} />
            Sample review · Nov 08, 2026
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {[
          {
            label: "Total comments",
            value: comments.length,
            icon: MessageSquare,
            color: "text-blue-400",
            bg: "bg-blue-500/10"
          },
          {
            label: "Pending review",
            value: pendingCount,
            icon: Clock3,
            color: "text-amber-400",
            bg: "bg-amber-500/10"
          },
          {
            label: "Approved",
            value: approvedCount,
            icon: CheckCircle2,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10"
          },
          {
            label: "Rejected",
            value: rejectedCount,
            icon: XCircle,
            color: "text-red-400",
            bg: "bg-red-500/10"
          }
        ].map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-2xl border border-[#263750] bg-[#111B2E] p-5"
            >
              <div className={`inline-flex rounded-xl p-2.5 ${item.bg} ${item.color}`}>
                <Icon size={19} />
              </div>
              <p className="mt-4 text-2xl font-bold text-white">
                {item.value}
              </p>
              <p className="mt-1 text-xs text-slate-400">{item.label}</p>
            </div>
          );
        })}
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[0.85fr_1.4fr]">

        {/* Comment list */}
        <section className="overflow-hidden rounded-2xl border border-[#263750] bg-[#111B2E]">
          <div className="border-b border-[#263750] p-5">
            <h2 className="font-semibold text-white">Suggested comments</h2>
            <p className="mt-1 text-xs text-slate-500">
              Select a comment to inspect its details.
            </p>
          </div>

          <div className="divide-y divide-[#263750]">
            {comments.map((comment) => (
              <button
                key={comment.id}
                onClick={() => setSelectedId(comment.id)}
                className={`w-full p-4 text-left transition ${
                  selectedId === comment.id
                    ? "bg-blue-500/[0.08] shadow-[inset_3px_0_0_#3B82F6]"
                    : "hover:bg-[#17243A]/60"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-200">
                      {comment.title}
                    </p>

                    <p className="mt-2 truncate text-xs text-slate-500">
                      {comment.file}
                    </p>
                  </div>

                  <ChevronRight
                    size={16}
                    className="mt-1 shrink-0 text-slate-500"
                  />
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full border px-2 py-1 text-[10px] font-semibold ${severityStyles[comment.severity]}`}
                  >
                    {comment.severity}
                  </span>

                  <span
                    className={`rounded-full border px-2 py-1 text-[10px] font-semibold ${statusStyles[comment.status]}`}
                  >
                    {comment.status}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Comment details */}
        <section className="min-w-0 overflow-hidden rounded-2xl border border-[#263750] bg-[#111B2E]">
          {selectedComment ? (
            <>
              <div className="flex flex-col justify-between gap-3 border-b border-[#263750] p-5 sm:flex-row sm:items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold ${severityStyles[selectedComment.severity]}`}
                    >
                      {selectedComment.severity}
                    </span>

                    <span className="text-xs text-slate-500">
                      {selectedComment.id}
                    </span>
                  </div>

                  <h2 className="mt-3 text-lg font-semibold text-white">
                    {selectedComment.title}
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    {selectedComment.agent}
                  </p>
                </div>

                <span
                  className={`w-fit rounded-full border px-3 py-1.5 text-xs font-semibold ${statusStyles[selectedComment.status]}`}
                >
                  {selectedComment.status}
                </span>
              </div>

              <div className="space-y-5 p-5">

                {/* File information */}
                <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#263750] bg-[#080D18] p-3">
                  <div className="flex min-w-0 items-center gap-2 text-sm text-slate-300">
                    <Code2 size={16} className="shrink-0 text-blue-400" />
                    <span className="truncate">{selectedComment.file}</span>
                  </div>

                  <span className="text-xs text-slate-500">
                    Line {selectedComment.line}
                  </span>
                </div>

                {/* Code snippet */}
                <div>
                  <h3 className="mb-2 text-sm font-semibold text-white">
                    Code under review
                  </h3>

                  <div className="overflow-x-auto rounded-xl border border-[#263750] bg-[#080D18] p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                      <span className="ml-2 text-[10px] text-slate-500">
                        Source code · Sample
                      </span>
                    </div>

                    <pre className="whitespace-pre-wrap break-all font-mono text-xs leading-6 text-rose-300">
                      {selectedComment.code}
                    </pre>
                  </div>
                </div>

                {/* Explanation */}
                <div>
                  <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
                    <ShieldAlert size={16} className="text-amber-400" />
                    Why this matters
                  </h3>

                  <p className="rounded-xl border border-[#263750] bg-[#17243A]/60 p-4 text-sm leading-6 text-slate-400">
                    {selectedComment.explanation}
                  </p>
                </div>

                {/* Suggested comment */}
                <div>
                  <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
                    <MessageSquare size={16} className="text-blue-400" />
                    Suggested PR comment
                  </h3>

                  <div className="rounded-xl border border-blue-500/20 bg-blue-500/[0.05] p-4">
                    <p className="text-sm leading-6 text-slate-300">
                      {selectedComment.suggestion}
                    </p>
                  </div>
                </div>

                {/* Recommendation */}
                <div>
                  <h3 className="mb-2 text-sm font-semibold text-white">
                    Recommended action
                  </h3>

                  <p className="text-sm leading-6 text-slate-400">
                    {selectedComment.recommendation}
                  </p>
                </div>

                {/* Approval actions */}
                <div className="border-t border-[#263750] pt-5">
                  <p className="mb-3 text-xs font-medium text-slate-400">
                    HUMAN REVIEW DECISION
                  </p>

                  {selectedComment.status === "Pending" ? (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <button
                        onClick={() =>
                          updateStatus(selectedComment.id, "Approved")
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
                      >
                        <Check size={17} />
                        Approve comment
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(selectedComment.id, "Rejected")
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/20"
                      >
                        <X size={17} />
                        Reject comment
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col justify-between gap-3 rounded-xl border border-[#263750] bg-[#080D18] p-4 sm:flex-row sm:items-center">
                      <p className="text-sm text-slate-400">
                        This comment is {selectedComment.status.toLowerCase()}.
                      </p>

                      <button
                        onClick={() =>
                          updateStatus(selectedComment.id, "Pending")
                        }
                        className="text-sm font-medium text-blue-400 hover:text-blue-300"
                      >
                        Reset decision
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="p-10 text-center text-slate-500">
              Select a comment to see its details.
            </div>
          )}
        </section>
      </div>

      {/* Publish section */}
      <section className="rounded-2xl border border-[#263750] bg-[#111B2E] p-5">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div>
            <h2 className="flex items-center gap-2 font-semibold text-white">
              <Send size={18} className="text-blue-400" />
              Publish approved comments
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              {approvedCount} approved · {pendingCount} pending · {rejectedCount} rejected
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Only approved comments are included in the publish action.
            </p>
          </div>

          <button
            onClick={publishApproved}
            disabled={approvedCount === 0}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Send size={16} />
            Publish approved ({approvedCount})
          </button>
        </div>

        {publishMessage && (
          <div className="mt-4 rounded-xl border border-blue-500/20 bg-blue-500/[0.06] p-3 text-sm text-blue-300">
            {publishMessage}
          </div>
        )}

        {approvedComments.length > 0 && (
          <div className="mt-5 border-t border-[#263750] pt-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Approved comments ready for publication
            </p>

            <div className="space-y-2">
              {approvedComments.map((comment) => (
                <div
                  key={comment.id}
                  className="flex items-center justify-between gap-3 rounded-lg bg-[#080D18] p-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm text-slate-300">
                      {comment.title}
                    </p>
                    <p className="mt-1 truncate text-xs text-slate-500">
                      {comment.file}
                    </p>
                  </div>

                  <CheckCircle2
                    size={17}
                    className="shrink-0 text-emerald-400"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-5 flex flex-col justify-between gap-3 border-t border-[#263750] pt-4 sm:flex-row sm:items-center">
          <button
            onClick={resetComments}
            className="text-left text-xs font-medium text-slate-500 transition hover:text-white"
          >
            Reset demo review
          </button>

          <p className="text-xs text-slate-600">
            GitHub publishing will require backend integration and authorization.
          </p>
        </div>
      </section>

      {/* Footer */}
      <div className="flex flex-col justify-between gap-3 border-t border-[#263750] pt-5 sm:flex-row sm:items-center">
        <button
          onClick={() => navigate("/app/review-reports")}
          className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to Review Reports
        </button>

        <p className="text-xs text-slate-600">
          CodeGuardian AI · Human-in-the-loop review
        </p>
      </div>
    </div>
  );
}

export default PRCommentPreview;
