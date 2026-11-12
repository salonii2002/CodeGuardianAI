
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function DashboardCharts({
  chartData = [],
  severityChartData = [],
  totalFindings = 0,
  timeRange,
  onTimeRangeChange,
  onExploreFindings,
}) {
  const hasActivityData =
    Array.isArray(chartData) && chartData.length > 0;

  const hasSeverityData =
    Array.isArray(severityChartData) &&
    severityChartData.some((item) => Number(item.value) > 0);

  return (
    <div className="grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-3">
      {/* ACTIVITY CHART */}
      <section className="min-w-0 overflow-hidden rounded-xl border border-[#263750] bg-[#111B2E] p-4 sm:p-5 xl:col-span-2">
        <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h2 className="font-semibold text-white">
              Review activity
            </h2>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Findings detected compared with resolved findings
            </p>
          </div>

          <select
            value={timeRange}
            onChange={(event) => onTimeRangeChange(event.target.value)}
            aria-label="Select activity chart time range"
            className="w-full rounded-lg border border-[#263750] bg-[#17243A] px-3 py-2.5 text-xs text-slate-300 outline-none transition focus:border-blue-500 sm:w-auto"
          >
            <option>7 days</option>
            <option>30 days</option>
            <option>90 days</option>
          </select>
        </div>

        <div className="mt-5 h-[220px] min-w-0 w-full sm:mt-6 sm:h-[260px]">
          {hasActivityData ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{
                  top: 8,
                  right: 8,
                  left: -20,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient
                    id="findingGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#3B82F6"
                      stopOpacity={0.35}
                    />
                    <stop
                      offset="95%"
                      stopColor="#3B82F6"
                      stopOpacity={0}
                    />
                  </linearGradient>

                  <linearGradient
                    id="resolvedGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#10B981"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="#10B981"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  stroke="#263750"
                  strokeDasharray="3 3"
                  vertical={false}
                />

                <XAxis
                  dataKey="day"
                  stroke="#64748B"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10 }}
                  tickMargin={10}
                  minTickGap={12}
                />

                <YAxis
                  stroke="#64748B"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10 }}
                  width={35}
                />

                <Tooltip
                  contentStyle={{
                    background: "#17243A",
                    border: "1px solid #334155",
                    borderRadius: "10px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                  labelStyle={{
                    color: "#CBD5E1",
                    marginBottom: "5px",
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="findings"
                  name="Detected"
                  stroke="#3B82F6"
                  strokeWidth={2.5}
                  fill="url(#findingGradient)"
                  activeDot={{ r: 5 }}
                />

                <Area
                  type="monotone"
                  dataKey="resolved"
                  name="Resolved"
                  stroke="#10B981"
                  strokeWidth={2.5}
                  fill="url(#resolvedGradient)"
                  activeDot={{ r: 5 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="text-sm font-medium text-slate-300">
                No activity data available
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Activity will appear when review data is available.
              </p>
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 border-t border-[#263750] pt-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="h-2 w-2 shrink-0 rounded-full bg-blue-500" />
            Findings detected
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
            Findings resolved
          </div>
        </div>
      </section>

      {/* SEVERITY CHART */}
      <section className="min-w-0 overflow-hidden rounded-xl border border-[#263750] bg-[#111B2E] p-4 sm:p-5">
        <div>
          <h2 className="font-semibold text-white">
            Finding severity
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Distribution of open findings
          </p>
        </div>

        <div className="relative mt-3 h-[190px] min-w-0 w-full">
          {hasSeverityData ? (
            <>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={severityChartData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={78}
                    paddingAngle={5}
                    stroke="none"
                  >
                    {severityChartData.map((item) => (
                      <Cell key={item.name} fill={item.color} />
                    ))}
                  </Pie>

                  <Tooltip
                    contentStyle={{
                      background: "#17243A",
                      border: "1px solid #334155",
                      borderRadius: "10px",
                      color: "#fff",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-white">
                  {totalFindings}
                </span>

                <span className="text-[10px] text-slate-500">
                  Total findings
                </span>
              </div>
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <span className="text-3xl font-bold text-white">0</span>
              <p className="mt-2 text-xs text-slate-500">
                No severity data available
              </p>
            </div>
          )}
        </div>

        <div className="mt-3 space-y-3">
          {severityChartData.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between gap-3"
            >
              <div className="flex min-w-0 items-center gap-2">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: item.color }}
                />

                <span className="text-sm text-slate-400">
                  {item.name}
                </span>
              </div>

              <span className="text-sm font-semibold tabular-nums text-white">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={onExploreFindings}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-[#263750] px-3 py-2.5 text-xs font-semibold text-slate-300 transition hover:border-blue-500/40 hover:bg-[#17243A] hover:text-white"
        >
          Explore all findings
          <span aria-hidden="true">↗</span>
        </button>
      </section>
    </div>
  );
}

export default DashboardCharts;
