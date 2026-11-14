import { useEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  GitBranch,
  Code2,
  Copy,
  Eye,
  CheckCircle2,
  AlertTriangle,
  X,
  ArrowLeftRight,
  Check,
} from "lucide-react";

const initialMatches = [
  {
    id: "SIM-001",
    title: "Repeated authentication validation",
    fileA: "src/auth/login.py",
    fileB: "src/api/authentication.py",
    similarity: 94,
    linesA: "18–34",
    linesB: "42–58",
    status: "Needs review",
    explanation:
      "These code sections contain similar authentication validation and error-handling logic.",
    codeA: `def validate_user(username, password):
    user = get_user(username)
    if user and check_password(user, password):
        return True
    return False`,
    codeB: `def authenticate(username, password):
    account = find_account(username)
    if account and verify_password(account, password):
        return True
    return False`,
  },
  {
    id: "SIM-002",
    title: "Duplicate input sanitization",
    fileA: "src/utils/input.py",
    fileB: "src/services/user.py",
    similarity: 82,
    linesA: "10–21",
    linesB: "65–76",
    status: "Needs review",
    explanation:
      "Both code sections perform similar string cleanup and input normalization.",
    codeA: `def clean_input(value):
    value = value.strip()
    value = value.replace('<', '')
    return value`,
    codeB: `def normalize_input(text):
    text = text.strip()
    text = text.replace('<', '')
    return text`,
  },
  {
    id: "SIM-003",
    title: "Repeated response formatting",
    fileA: "src/api/orders.py",
    fileB: "src/api/payments.py",
    similarity: 68,
    linesA: "40–51",
    linesB: "25–36",
    status: "Reviewed",
    explanation:
      "Both sections create a response dictionary with a status, message, and payload.",
    codeA: `return {
    'status': 'success',
    'message': message,
    'data': result
}`,
    codeB: `return {
    'status': 'success',
    'message': message,
    'data': payment
}`,
  },
  {
    id: "SIM-004",
    title: "Similar retry handling",
    fileA: "src/tasks/email.py",
    fileB: "src/tasks/notification.py",
    similarity: 54,
    linesA: "12–25",
    linesB: "30–43",
    status: "Needs review",
    explanation:
      "Both sections retry a failed operation a limited number of times.",
    codeA: `for attempt in range(3):
    try:
        send_email()
        break
    except Exception:
        continue`,
    codeB: `for attempt in range(3):
    try:
        send_notification()
        break
    except Exception:
        continue`,
  },
];

function SimilarityCheck() {
  const [matches, setMatches] = useState(initialMatches);
  const [query, setQuery] = useState("");
  const [threshold, setThreshold] = useState(50);

  // Store the selected ID instead of an old match object.
  const [selectedId, setSelectedId] = useState(initialMatches[0].id);

  const [notice, setNotice] = useState("");
  const [copied, setCopied] = useState(false);

  const copyTimer = useRef(null);

  // Always get the latest selected match.
  const selected = matches.find(
    (item) => item.id === selectedId
  );

  // Search and similarity filtering.
  const filtered = useMemo(() => {
    return matches.filter((item) => {
      const matchesThreshold = item.similarity >= threshold;

      const matchesSearch = `${item.title} ${item.fileA} ${item.fileB}`
        .toLowerCase()
        .includes(query.toLowerCase());

      return matchesThreshold && matchesSearch;
    });
  }, [matches, threshold, query]);

  // Clear copy timer when leaving the page.
  useEffect(() => {
    return () => {
      if (copyTimer.current) {
        clearTimeout(copyTimer.current);
      }
    };
  }, []);

  // Select a result for comparison.
  const compareMatch = (id) => {
    setSelectedId(id);
    setCopied(false);
    setNotice("");
  };

  // Mark a result as reviewed.
  const markReviewed = (id) => {
    setMatches((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, status: "Reviewed" }
          : item
      )
    );

    setNotice("Similarity result marked as reviewed.");
  };

  // Copy both code sections.
  const copyComparison = async () => {
    if (!selected) return;

    const text = `${selected.title}

${selected.fileA}
Lines ${selected.linesA}

${selected.codeA}

${selected.fileB}
Lines ${selected.linesB}

${selected.codeB}`;

    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard unavailable");
      }

      await navigator.clipboard.writeText(text);

      // Show copied checkmark.
      setCopied(true);
      setNotice("");

      // Clear an earlier timer if Copy is clicked again.
      if (copyTimer.current) {
        clearTimeout(copyTimer.current);
      }

      copyTimer.current = setTimeout(() => {
        setCopied(false);
        copyTimer.current = null;
      }, 2000);
    } catch {
      setCopied(false);
      setNotice(
        "Clipboard access is unavailable. Use HTTPS or localhost, or copy the code manually."
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* PAGE HEADER */}
      <div>
        <p className="text-sm text-cyan-400">
          WORKSPACE / CODE INTELLIGENCE
        </p>

        <h1 className="mt-1 text-3xl font-bold text-white">
          Similarity Check
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Inspect potentially duplicated or highly similar code sections.
        </p>
      </div>

      {/* DEMO NOTICE */}
      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-sm text-amber-200">
        Example similarity results only. A real similarity engine must
        compare repository files on the backend.
      </div>

      {/* NOTIFICATION */}
      {notice && (
        <div className="flex items-center justify-between gap-3 rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-3 text-sm text-cyan-200">
          <span>{notice}</span>

          <button
            type="button"
            onClick={() => setNotice("")}
            className="rounded p-1 hover:bg-cyan-500/10"
            aria-label="Dismiss notification"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* STATISTICS */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-700 bg-[#111B2E] p-5">
          <p className="text-sm text-slate-400">
            Potential matches
          </p>

          <p className="mt-3 text-3xl font-bold text-white">
            {matches.length}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-700 bg-[#111B2E] p-5">
          <p className="text-sm text-slate-400">
            High similarity (80%+)
          </p>

          <p className="mt-3 text-3xl font-bold text-white">
            {matches.filter((item) => item.similarity >= 80).length}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-700 bg-[#111B2E] p-5">
          <p className="text-sm text-slate-400">
            Reviewed
          </p>

          <p className="mt-3 text-3xl font-bold text-white">
            {matches.filter((item) => item.status === "Reviewed").length}
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">

        {/* LEFT: SIMILARITY MATCHES */}
        <section className="overflow-hidden rounded-2xl border border-slate-700 bg-[#111B2E]">
          <div className="border-b border-slate-700 p-5">
            <h2 className="font-semibold text-white">
              Similarity matches
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Select a result and compare both code sections.
            </p>
          </div>

          <div className="space-y-3 p-4">

            {/* SEARCH */}
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-3 text-slate-500"
              />

              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search code or file..."
                className="w-full rounded-lg border border-slate-700 bg-[#080D18] py-2.5 pl-9 pr-3 text-sm text-white outline-none focus:border-cyan-400"
              />
            </div>

            {/* SIMILARITY SLIDER */}
            <div>
              <div className="mb-2 flex justify-between text-xs text-slate-400">
                <label>Minimum similarity</label>
                <span>{threshold}%</span>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={threshold}
                onChange={(event) =>
                  setThreshold(Number(event.target.value))
                }
                className="w-full accent-cyan-400"
              />
            </div>

            {/* MATCH CARDS */}
            {filtered.map((item) => {
              const isSelected = selectedId === item.id;

              return (
                <div
                  key={item.id}
                  className={`rounded-xl border p-4 transition ${
                    isSelected
                      ? "border-cyan-400/60 bg-[#17243A]"
                      : "border-slate-700 bg-[#17243A]/50 hover:border-slate-500"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs text-slate-500">
                        {item.id}
                      </p>

                      <h3 className="mt-1 font-medium text-white">
                        {item.title}
                      </h3>
                    </div>

                    <span
                      className={`rounded-lg px-2 py-1 text-sm font-semibold ${
                        item.similarity >= 80
                          ? "bg-red-500/10 text-red-300"
                          : item.similarity >= 60
                          ? "bg-amber-500/10 text-amber-300"
                          : "bg-blue-500/10 text-blue-300"
                      }`}
                    >
                      {item.similarity}%
                    </span>
                  </div>

                  <div className="mt-4 space-y-2 text-xs text-slate-400">
                    <p className="flex items-center gap-2">
                      <Code2 size={13} />
                      {item.fileA}
                    </p>

                    <p className="flex items-center gap-2">
                      <GitBranch size={13} />
                      {item.fileB}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <span
                      className={
                        item.status === "Reviewed"
                          ? "text-xs text-emerald-300"
                          : "text-xs text-amber-300"
                      }
                    >
                      {item.status}
                    </span>

                    {/* WORKING COMPARE BUTTON */}
                    <button
                      type="button"
                      onClick={() => compareMatch(item.id)}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition ${
                        isSelected
                          ? "bg-cyan-500/15 text-cyan-300"
                          : "bg-blue-600 text-white hover:bg-blue-500"
                      }`}
                    >
                      <ArrowLeftRight size={14} />
                      {isSelected ? "Selected" : "Compare"}
                    </button>
                  </div>
                </div>
              );
            })}

            {filtered.length === 0 && (
              <p className="py-8 text-center text-sm text-slate-500">
                No matches for this threshold or search.
              </p>
            )}
          </div>
        </section>

        {/* RIGHT: COMPARISON PANEL */}
        <section className="rounded-2xl border border-slate-700 bg-[#111B2E] p-5">
          {selected ? (
            <>
              {/* COMPARISON HEADER */}
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-cyan-300">
                    {selected.id} · CODE COMPARISON
                  </p>

                  <h2 className="mt-1 text-lg font-semibold text-white">
                    {selected.title}
                  </h2>
                </div>

                <span className="rounded-lg bg-cyan-500/10 px-3 py-2 text-lg font-bold text-cyan-300">
                  {selected.similarity}%
                </span>
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                {selected.explanation}
              </p>

              {/* FILE A */}
              <div className="mt-5 overflow-hidden rounded-xl border border-slate-700">
                <div className="flex items-center justify-between gap-2 bg-[#17243A] p-3">
                  <span className="truncate text-xs text-slate-300">
                    {selected.fileA}
                  </span>

                  <span className="shrink-0 text-xs text-slate-500">
                    Lines {selected.linesA}
                  </span>
                </div>

                <pre className="overflow-x-auto p-4 text-xs leading-6 text-emerald-200">
                  <code>{selected.codeA}</code>
                </pre>
              </div>

              {/* COMPARISON DIVIDER */}
              <div className="flex items-center justify-center gap-2 py-4 text-xs text-slate-500">
                <ArrowLeftRight size={15} />
                Similar code comparison
              </div>

              {/* FILE B */}
              <div className="overflow-hidden rounded-xl border border-slate-700">
                <div className="flex items-center justify-between gap-2 bg-[#17243A] p-3">
                  <span className="truncate text-xs text-slate-300">
                    {selected.fileB}
                  </span>

                  <span className="shrink-0 text-xs text-slate-500">
                    Lines {selected.linesB}
                  </span>
                </div>

                <pre className="overflow-x-auto p-4 text-xs leading-6 text-blue-200">
                  <code>{selected.codeB}</code>
                </pre>
              </div>

              {/* WARNING */}
              <div className="mt-5 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 text-xs leading-5 text-amber-200">
                <AlertTriangle size={15} className="mb-2" />

                Similar code is not automatically a vulnerability or
                a defect. Review context before refactoring.
              </div>

              {/* ACTION BUTTONS */}
              <div className="mt-5 flex flex-wrap gap-2">

                {/* COPY BUTTON */}
                <button
                  type="button"
                  onClick={copyComparison}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                    copied
                      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                      : "border-slate-600 text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  {copied ? (
                    <>
                      <Check size={16} />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={15} />
                      Copy comparison
                    </>
                  )}
                </button>

                {/* REVIEW BUTTON */}
                <button
                  type="button"
                  onClick={() => markReviewed(selected.id)}
                  disabled={selected.status === "Reviewed"}
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <CheckCircle2 size={15} />

                  {selected.status === "Reviewed"
                    ? "Reviewed"
                    : "Mark reviewed"}
                </button>
              </div>
            </>
          ) : (
            <div className="py-16 text-center text-slate-500">
              <Eye className="mx-auto mb-3" />
              <p>Select a match to inspect.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default SimilarityCheck;
