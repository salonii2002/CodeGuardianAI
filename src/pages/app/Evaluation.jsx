import { useMemo, useState } from "react";
import {
  Activity,
  CheckCircle2,
  FlaskConical,
  Play,
  Target,
  TrendingUp,
  Search,
  RotateCcw,
  X,
  AlertTriangle
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from "recharts";

const initialCases = [
  { id: "EV-001", title: "Hardcoded API key", category: "Security", expected: "High", actual: "High", result: "Pass" },
  { id: "EV-002", title: "SQL query concatenation", category: "Security", expected: "High", actual: "High", result: "Pass" },
  { id: "EV-003", title: "Missing input validation", category: "Quality", expected: "Medium", actual: "Medium", result: "Pass" },
  { id: "EV-004", title: "Missing boundary test", category: "Testing", expected: "Medium", actual: "Low", result: "Fail" },
  { id: "EV-005", title: "Missing API description", category: "Documentation", expected: "Low", actual: "Low", result: "Pass" },
  { id: "EV-006", title: "Safe parameterized query", category: "Security", expected: "Info", actual: "Info", result: "Pass" }
];

const comparison = [
  { metric: "Precision", baseline: 72, current: 86 },
  { metric: "Recall", baseline: 68, current: 81 },
  { metric: "F1 score", baseline: 70, current: 83 }
];

function Evaluation() {
  const [cases, setCases] = useState(initialCases);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [resultFilter, setResultFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [runCount, setRunCount] = useState(3);
  const [lastRun, setLastRun] = useState("Today, 09:30");
  const [notice, setNotice] = useState("");

  const visibleCases = useMemo(() => {
    return cases.filter((item) => {
      const matchesCategory =
        categoryFilter === "All" || item.category === categoryFilter;

      const matchesResult =
        resultFilter === "All" || item.result === resultFilter;

      const matchesSearch =
        `${item.id} ${item.title} ${item.category}`
          .toLowerCase()
          .includes(search.toLowerCase());

      return matchesCategory && matchesResult && matchesSearch;
    });
  }, [cases, categoryFilter, resultFilter, search]);

  const passed = cases.filter((item) => item.result === "Pass").length;
  const failed = cases.length - passed;
  const accuracy = cases.length
    ? Math.round((passed / cases.length) * 100)
    : 0;

  const runEvaluation = () => {
    const updatedCases = cases.map((item) => ({
      ...item,
      result: item.expected === item.actual ? "Pass" : "Fail"
    }));

    setCases(updatedCases);
    setRunCount((count) => count + 1);
    setLastRun(new Date().toLocaleString());
    setNotice("Demo evaluation completed. Results were compared against expected values.");
  };

  const resetEvaluation = () => {
    setCases(initialCases);
    setCategoryFilter("All");
    setResultFilter("All");
    setSearch("");
    setNotice("Demo evaluation data has been reset.");
  };

  const clearFilters = () => {
    setCategoryFilter("All");
    setResultFilter("All");
    setSearch("");
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-cyan-400">
            WORKSPACE / QUALITY ASSURANCE
          </p>

          <h1 className="mt-1 text-3xl font-bold text-white">
            Evaluation Center
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Measure the consistency of review results against expected findings.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={resetEvaluation}
            className="flex items-center justify-center gap-2 rounded-lg border border-slate-600 px-4 py-2.5 text-sm text-slate-300 hover:bg-[#17243A]"
          >
            <RotateCcw size={15} />
            Reset
          </button>

          <button
            type="button"
            onClick={runEvaluation}
            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-500"
          >
            <Play size={16} />
            Run demo evaluation
          </button>
        </div>
      </div>

      {/* Demo disclaimer */}
      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-sm text-amber-200">
        These are example test cases and pre-filled evaluation metrics, not measured production model performance. Running this demo compares stored expected and actual values; it does not execute an AI model.
      </div>

      {/* Notification */}
      {notice && (
        <div className="flex items-center justify-between gap-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3 text-sm text-emerald-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={17} />
            {notice}
          </div>

          <button
            type="button"
            onClick={() => setNotice("")}
            aria-label="Dismiss notification"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Evaluation accuracy",
            value: `${accuracy}%`,
            icon: Target
          },
          {
            label: "Test cases",
            value: cases.length,
            icon: FlaskConical
          },
          {
            label: "Passed cases",
            value: passed,
            icon: CheckCircle2
          },
          {
            label: "Evaluation runs",
            value: runCount,
            icon: Activity
          }
        ].map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-700 bg-[#111B2E] p-5"
            >
              <div className="flex justify-between text-sm text-slate-400">
                <span>{item.label}</span>
                <Icon size={18} className="text-cyan-300" />
              </div>

              <p className="mt-4 text-3xl font-bold text-white">
                {item.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Pass / Fail summary */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-300">Passed test cases</p>
            <CheckCircle2 size={20} className="text-emerald-400" />
          </div>

          <p className="mt-3 text-3xl font-bold text-emerald-300">
            {passed}
          </p>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-700">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all"
              style={{
                width: `${cases.length ? (passed / cases.length) * 100 : 0}%`
              }}
            />
          </div>
        </div>

        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-300">Failed test cases</p>
            <AlertTriangle size={20} className="text-red-400" />
          </div>

          <p className="mt-3 text-3xl font-bold text-red-300">
            {failed}
          </p>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-700">
            <div
              className="h-full rounded-full bg-red-500 transition-all"
              style={{
                width: `${cases.length ? (failed / cases.length) * 100 : 0}%`
              }}
            />
          </div>
        </div>
      </div>

      {/* Charts and definitions */}
      <div className="grid gap-5 xl:grid-cols-2">

        <section className="rounded-2xl border border-slate-700 bg-[#111B2E] p-5">
          <h2 className="font-semibold text-white">
            Model quality metrics
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Example comparison with a baseline
          </p>

          <div className="mt-5 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparison}>
                <CartesianGrid stroke="#263750" strokeDasharray="3 3" />
                <XAxis dataKey="metric" stroke="#94A3B8" />
                <YAxis domain={[0, 100]} stroke="#94A3B8" />

                <Tooltip
                  contentStyle={{
                    background: "#111B2E",
                    border: "1px solid #263750",
                    borderRadius: "8px"
                  }}
                />

                <Legend />

                <Bar
                  dataKey="baseline"
                  name="Baseline"
                  fill="#64748B"
                  radius={[4, 4, 0, 0]}
                />

                <Bar
                  dataKey="current"
                  name="Example system"
                  fill="#22D3EE"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-700 bg-[#111B2E] p-5">
          <h2 className="font-semibold text-white">
            Metric definitions
          </h2>

          <div className="mt-5 space-y-4">
            {[
              ["Precision", "Of all findings reported, how many were correct?"],
              ["Recall", "Of all expected findings, how many were detected?"],
              ["F1 score", "Harmonic mean of precision and recall."],
              ["Accuracy", "Percentage of test cases matching the expected result."]
            ].map(([title, description]) => (
              <div
                key={title}
                className="border-b border-slate-700 pb-3 last:border-0"
              >
                <p className="font-medium text-cyan-300">{title}</p>
                <p className="mt-1 text-sm text-slate-400">
                  {description}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-3 flex items-center gap-2 text-xs text-slate-500">
            <TrendingUp size={14} />
            Last demo run: {lastRun}
          </p>
        </section>
      </div>

      {/* Test cases */}
      <section className="overflow-hidden rounded-2xl border border-slate-700 bg-[#111B2E]">

        <div className="flex flex-col justify-between gap-4 border-b border-slate-700 p-5 lg:flex-row lg:items-center">
          <div>
            <h2 className="font-semibold text-white">
              Evaluation test cases
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Expected results compared with example review output
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-3">
            <div className="relative">
              <Search
                size={15}
                className="absolute left-3 top-3 text-slate-500"
              />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search cases..."
                className="w-full rounded-lg border border-slate-700 bg-[#080D18] py-2.5 pl-9 pr-3 text-sm text-white outline-none focus:border-cyan-400"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              className="rounded-lg border border-slate-700 bg-[#080D18] px-3 py-2 text-sm text-white"
            >
              {["All", "Security", "Quality", "Testing", "Documentation"].map(
                (item) => (
                  <option key={item} value={item}>
                    {item === "All" ? "All categories" : item}
                  </option>
                )
              )}
            </select>

            <select
              value={resultFilter}
              onChange={(event) => setResultFilter(event.target.value)}
              className="rounded-lg border border-slate-700 bg-[#080D18] px-3 py-2 text-sm text-white"
            >
              {["All", "Pass", "Fail"].map((item) => (
                <option key={item} value={item}>
                  {item === "All" ? "All results" : item}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 px-5 pt-4">
          <p className="text-xs text-slate-500">
            Showing {visibleCases.length} of {cases.length} test cases
          </p>

          <button
            type="button"
            onClick={clearFilters}
            className="text-xs text-cyan-300 hover:text-cyan-200"
          >
            Clear filters
          </button>
        </div>

        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="bg-[#17243A] text-xs uppercase text-slate-400">
              <tr>
                <th className="p-4">Case</th>
                <th className="p-4">Category</th>
                <th className="p-4">Expected</th>
                <th className="p-4">Actual</th>
                <th className="p-4">Result</th>
              </tr>
            </thead>

            <tbody>
              {visibleCases.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-slate-700 text-slate-300"
                >
                  <td className="p-4">
                    <span className="text-xs text-slate-500">
                      {item.id}
                    </span>

                    <p className="mt-1 font-medium text-white">
                      {item.title}
                    </p>
                  </td>

                  <td className="p-4">{item.category}</td>
                  <td className="p-4">{item.expected}</td>
                  <td className="p-4">{item.actual}</td>

                  <td className="p-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs ${
                        item.result === "Pass"
                          ? "bg-emerald-500/10 text-emerald-300"
                          : "bg-red-500/10 text-red-300"
                      }`}
                    >
                      {item.result}
                    </span>
                  </td>
                </tr>
              ))}

              {visibleCases.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="p-10 text-center text-sm text-slate-500"
                  >
                    No evaluation cases match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Evaluation;