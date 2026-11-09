import { useMemo, useState } from "react";
import {
  Activity,
  Bot,
  Coins,
  Download,
  Gauge,
  Zap,
  CheckCircle2,
  X,
  TrendingUp
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

const weeklyData = [
  { day: "Mon", reviews: 18, tokens: 42000 },
  { day: "Tue", reviews: 24, tokens: 51000 },
  { day: "Wed", reviews: 15, tokens: 36000 },
  { day: "Thu", reviews: 31, tokens: 72000 },
  { day: "Fri", reviews: 27, tokens: 64000 },
  { day: "Sat", reviews: 12, tokens: 29000 },
  { day: "Sun", reviews: 20, tokens: 47000 }
];

const monthlyData = [
  { day: "Week 1", reviews: 112, tokens: 248000 },
  { day: "Week 2", reviews: 145, tokens: 326000 },
  { day: "Week 3", reviews: 128, tokens: 291000 },
  { day: "Week 4", reviews: 167, tokens: 372000 }
];

const quarterlyData = [
  { day: "Month 1", reviews: 420, tokens: 940000 },
  { day: "Month 2", reviews: 510, tokens: 1120000 },
  { day: "Month 3", reviews: 485, tokens: 1080000 }
];

const agentUsage = [
  { name: "Security Agent", reviews: 48, tokens: 98000, cost: 1.42 },
  { name: "Quality Agent", reviews: 39, tokens: 76000, cost: 1.08 },
  { name: "Test Gap Agent", reviews: 28, tokens: 52000, cost: 0.74 },
  { name: "Documentation Agent", reviews: 22, tokens: 41000, cost: 0.59 }
];

const periodData = {
  "7 days": weeklyData,
  "30 days": monthlyData,
  "90 days": quarterlyData
};

function CostUsage() {
  const [period, setPeriod] = useState("7 days");
  const [metric, setMetric] = useState("reviews");
  const [notice, setNotice] = useState("");

  const chartData = periodData[period];

  const totals = useMemo(() => {
    const reviews = chartData.reduce(
      (sum, item) => sum + item.reviews,
      0
    );

    const tokens = chartData.reduce(
      (sum, item) => sum + item.tokens,
      0
    );

    const cost = agentUsage.reduce(
      (sum, item) => sum + item.cost,
      0
    );

    return { reviews, tokens, cost };
  }, [chartData]);

  const totalAgentReviews = agentUsage.reduce(
    (sum, item) => sum + item.reviews,
    0
  );

  const totalAgentCost = agentUsage.reduce(
    (sum, item) => sum + item.cost,
    0
  );

  const exportCSV = () => {
    const rows = [
      ["CodeGuardian AI - Cost and Usage Demo"],
      ["Selected period", period],
      ["Total reviews", totals.reviews],
      ["Total tokens", totals.tokens],
      ["Estimated total cost (USD)", totals.cost.toFixed(2)],
      [],
      ["Agent", "Reviews", "Tokens", "Estimated cost (USD)"],
      ...agentUsage.map((item) => [
        item.name,
        item.reviews,
        item.tokens,
        item.cost.toFixed(2)
      ])
    ];

    const csv = rows
      .map((row) =>
        row
          .map((value) => {
            const text = String(value ?? "");
            return `"${text.replace(/"/g, '""')}"`;
          })
          .join(",")
      )
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `codeguardian-usage-${period.replace(" ", "-")}-demo.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => URL.revokeObjectURL(url), 1000);

    setNotice("Usage report exported successfully.");
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-cyan-400">
            WORKSPACE / ANALYTICS
          </p>

          <h1 className="mt-1 text-3xl font-bold text-white">
            Cost & Usage
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Monitor review activity, model usage, and estimated operating costs.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <select
            value={period}
            onChange={(event) => setPeriod(event.target.value)}
            className="rounded-lg border border-slate-700 bg-[#111B2E] px-3 py-2 text-sm text-white"
          >
            <option>7 days</option>
            <option>30 days</option>
            <option>90 days</option>
          </select>

          <button
            type="button"
            onClick={exportCSV}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-500"
          >
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Demo disclaimer */}
      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-sm text-amber-200">
        Sample analytics only. No paid model provider, billing account, or live token meter is connected. The period values are illustrative demo data.
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

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Total reviews",
            value: totals.reviews.toLocaleString(),
            icon: Activity,
            detail: `${period} sample period`
          },
          {
            label: "Tokens processed",
            value: totals.tokens.toLocaleString(),
            icon: Zap,
            detail: "Illustrative token count"
          },
          {
            label: "Estimated cost",
            value: "$" + totals.cost.toFixed(2),
            icon: Coins,
            detail: "Illustrative USD estimate"
          },
          {
            label: "Agent utilization",
            value: "76%",
            icon: Gauge,
            detail: "Demo utilization metric"
          }
        ].map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.label}
              className="rounded-2xl border border-slate-700 bg-[#111B2E] p-5"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">
                  {card.label}
                </span>

                <Icon size={19} className="text-cyan-300" />
              </div>

              <p className="mt-4 text-3xl font-bold text-white">
                {card.value}
              </p>

              <p className="mt-2 text-xs text-slate-500">
                {card.detail}
              </p>
            </div>
          );
        })}
      </div>

      {/* Usage chart */}
      <section className="rounded-2xl border border-slate-700 bg-[#111B2E] p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-semibold text-white">
              Usage over time
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              {period} sample activity
            </p>
          </div>

          <select
            value={metric}
            onChange={(event) => setMetric(event.target.value)}
            className="rounded-lg border border-slate-700 bg-[#080D18] px-3 py-2 text-sm text-white"
          >
            <option value="reviews">Reviews</option>
            <option value="tokens">Tokens</option>
          </select>
        </div>

        <div className="mt-6 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid
                stroke="#263750"
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="day"
                stroke="#94A3B8"
              />

              <YAxis
                stroke="#94A3B8"
                tickFormatter={(value) =>
                  metric === "tokens"
                    ? `${value / 1000}k`
                    : value
                }
              />

              <Tooltip
                formatter={(value) => [
                  metric === "tokens"
                    ? Number(value).toLocaleString() + " tokens"
                    : value + " reviews",
                  metric === "tokens" ? "Tokens" : "Reviews"
                ]}
                contentStyle={{
                  background: "#111B2E",
                  border: "1px solid #263750",
                  borderRadius: 10
                }}
              />

              <Bar
                dataKey={metric}
                name={metric === "tokens" ? "Tokens" : "Reviews"}
                fill="#22D3EE"
                radius={[5, 5, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Agent cost distribution */}
      <section className="rounded-2xl border border-slate-700 bg-[#111B2E] p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-semibold text-white">
              Agent cost distribution
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Illustrative estimated cost share per agent
            </p>
          </div>

          <span className="text-sm font-semibold text-cyan-300">
            ${totalAgentCost.toFixed(2)} total
          </span>
        </div>

        <div className="mt-5 space-y-5">
          {agentUsage.map((item) => {
            const percentage = totalAgentCost
              ? (item.cost / totalAgentCost) * 100
              : 0;

            return (
              <div key={item.name}>
                <div className="mb-2 flex flex-wrap justify-between gap-2 text-sm">
                  <span className="text-slate-300">
                    {item.name}
                  </span>

                  <span className="text-slate-400">
                    ${item.cost.toFixed(2)} · {percentage.toFixed(1)}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-700">
                  <div
                    className="h-full rounded-full bg-cyan-400 transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Usage by agent */}
      <section className="overflow-hidden rounded-2xl border border-slate-700 bg-[#111B2E]">
        <div className="border-b border-slate-700 p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="font-semibold text-white">
                Usage by agent
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Illustrative per-agent usage breakdown
              </p>
            </div>

            <TrendingUp size={19} className="text-cyan-300" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left text-sm">
            <thead className="bg-[#17243A] text-xs uppercase text-slate-400">
              <tr>
                <th className="p-4">Agent</th>
                <th className="p-4">Reviews</th>
                <th className="p-4">Tokens</th>
                <th className="p-4">Estimated cost</th>
              </tr>
            </thead>

            <tbody>
              {agentUsage.map((item) => (
                <tr
                  key={item.name}
                  className="border-t border-slate-700 text-slate-300"
                >
                  <td className="p-4 font-medium text-white">
                    <span className="mr-2 inline-flex text-cyan-300">
                      <Bot size={16} />
                    </span>

                    {item.name}
                  </td>

                  <td className="p-4">{item.reviews}</td>

                  <td className="p-4">
                    {item.tokens.toLocaleString()}
                  </td>

                  <td className="p-4">
                    ${item.cost.toFixed(2)}
                  </td>
                </tr>
              ))}

              <tr className="border-t border-slate-600 bg-[#17243A] font-semibold text-white">
                <td className="p-4">Total</td>
                <td className="p-4">{totalAgentReviews}</td>
                <td className="p-4">
                  {agentUsage.reduce((sum, item) => sum + item.tokens, 0).toLocaleString()}
                </td>
                <td className="p-4">
                  ${totalAgentCost.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default CostUsage;