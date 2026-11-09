import { useState } from "react";
import {
  Code2,
  TestTube2,
  BookOpen,
  X,
  ChevronRight,
  Play,
  Pause,
  CheckCircle2,
  Save,
  ShieldCheck,
  Activity,
  Bot,
  RotateCcw
} from "lucide-react";

const initialAgents = [
  {
    id: "security",
    name: "Security Agent",
    role: "Vulnerability detection",
    description: "Reviews code for security risks and maps findings to known security standards.",
    color: "red",
    icon: ShieldCheck,
    status: "Live",
    version: "1.0.0",
    capabilities: ["Secret detection", "Injection analysis", "OWASP mapping", "CWE references"],
    config: { sensitivity: "High", maxFindings: 20 }
  },
  {
    id: "quality",
    name: "Code Quality Agent",
    role: "Code quality analysis",
    description: "Identifies maintainability issues, risky patterns, and code-quality problems.",
    color: "blue",
    icon: Code2,
    status: "Beta",
    version: "0.9.0",
    capabilities: ["Complexity review", "Code smells", "Duplicate logic", "Best practices"],
    config: { sensitivity: "Medium", maxFindings: 15 }
  },
  {
    id: "testing",
    name: "Test Gap Agent",
    role: "Test coverage recommendations",
    description: "Finds missing test scenarios and recommends useful test cases.",
    color: "emerald",
    icon: TestTube2,
    status: "Beta",
    version: "0.8.0",
    capabilities: ["Missing test detection", "Edge cases", "Boundary checks", "Test suggestions"],
    config: { sensitivity: "Medium", maxFindings: 12 }
  },
  {
    id: "documentation",
    name: "Documentation Agent",
    role: "Documentation review",
    description: "Checks documentation quality and identifies missing technical explanations.",
    color: "amber",
    icon: BookOpen,
    status: "Beta",
    version: "0.8.0",
    capabilities: ["Docstring review", "README checks", "API documentation", "Change summaries"],
    config: { sensitivity: "Low", maxFindings: 10 }
  }
];

const colorStyles = {
  red: "border-red-500/30 bg-red-500/10 text-red-300",
  blue: "border-blue-500/30 bg-blue-500/10 text-blue-300",
  emerald: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  amber: "border-amber-500/30 bg-amber-500/10 text-amber-300"
};

function AgentManagement() {
  const [agents, setAgents] = useState(initialAgents);
  const [selectedId, setSelectedId] = useState(initialAgents[0].id);
  const [tab, setTab] = useState("capabilities");
  const [notice, setNotice] = useState("");

  const selected = agents.find((agent) => agent.id === selectedId) || agents[0];

  const activeCount = agents.filter(
    (agent) => agent.status !== "Disabled"
  ).length;

  const updateAgent = (id, changes) => {
    setAgents((previous) =>
      previous.map((agent) =>
        agent.id === id ? { ...agent, ...changes } : agent
      )
    );
  };

  const toggleAgent = (id) => {
    const agent = agents.find((item) => item.id === id);
    if (!agent) return;

    updateAgent(id, {
      status: agent.status === "Disabled" ? "Beta" : "Disabled"
    });

    setNotice(
      `${agent.name} ${agent.status === "Disabled" ? "enabled" : "disabled"} in this demo.`
    );
  };

  const updateConfig = (field, value) => {
    updateAgent(selected.id, {
      config: {
        ...selected.config,
        [field]: value
      }
    });
    setNotice("Configuration updated in this demo.");
  };

const saveConfig = () => {
  if (
    selected.config.maxFindings === "" ||
    selected.config.maxFindings < 1 ||
    selected.config.maxFindings > 100
  ) {
    setNotice("Please enter a value between 1 and 100.");
    return;
  }

  setNotice(`${selected.name} configuration saved successfully.`);
};

const resetConfig = () => {
  const originalAgent = initialAgents.find(
    (agent) => agent.id === selected.id
  );

  if (!originalAgent) return;

  updateAgent(selected.id, {
    config: { ...originalAgent.config }
  });

  setNotice(`${selected.name} settings restored to defaults.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-cyan-400">WORKSPACE / INTELLIGENCE</p>
          <h1 className="mt-1 text-3xl font-bold text-white">
            Agent Management
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Manage review agents, capabilities, and configuration.
          </p>
        </div>

        <div className="rounded-xl border border-slate-700 bg-[#111B2E] px-4 py-3">
          <p className="text-xs text-slate-400">Active agents</p>
          <p className="mt-1 text-2xl font-bold text-white">
            {activeCount} / {agents.length}
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-sm text-amber-200">
        Demonstration configuration. Agent execution and model settings are not connected to a backend yet.
      </div>

      <div
  className={`flex items-center justify-between gap-3 rounded-lg border p-4 text-sm ${
    notice
      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
      : "hidden"
  }`}
>
  <div className="flex items-center gap-2">
    <CheckCircle2 size={18} />
    <span>{notice}</span>
  </div>

  <button
    type="button"
    onClick={() => setNotice("")}
    aria-label="Dismiss notification"
  >
    <X size={16} />
  </button>
</div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {agents.map((agent) => {
          const Icon = agent.icon;

          return (
            <button
              key={agent.id}
              onClick={() => {
                setSelectedId(agent.id);
                setTab("capabilities");
                setNotice("");
              }}
              className={`rounded-2xl border p-5 text-left transition ${
                selectedId === agent.id
                  ? "border-cyan-400/60 bg-[#17243A]"
                  : "border-slate-700 bg-[#111B2E] hover:border-slate-500"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className={`rounded-xl border p-3 ${colorStyles[agent.color]}`}>
                  <Icon size={22} />
                </div>

                <span
                  className={`rounded-full px-2.5 py-1 text-xs ${
                    agent.status === "Disabled"
                      ? "bg-slate-700 text-slate-300"
                      : "bg-emerald-500/10 text-emerald-300"
                  }`}
                >
                  {agent.status}
                </span>
              </div>

              <h2 className="mt-4 font-semibold text-white">
                {agent.name}
              </h2>
              <p className="mt-1 text-xs text-slate-400">{agent.role}</p>
              <p className="mt-4 line-clamp-2 text-sm text-slate-400">
                {agent.description}
              </p>

              <div className="mt-5 flex items-center justify-between text-xs text-slate-500">
                <span>Version {agent.version}</span>
                <ChevronRight size={16} />
              </div>
            </button>
          );
        })}
      </div>

      <section className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-slate-700 bg-[#111B2E] p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs text-cyan-400">SELECTED AGENT</p>
              <h2 className="mt-1 text-xl font-semibold text-white">
                {selected.name}
              </h2>
            </div>

            <button
              onClick={() => toggleAgent(selected.id)}
              className="flex items-center gap-2 rounded-lg border border-slate-600 px-3 py-2 text-sm text-slate-200 hover:bg-slate-800"
            >
              {selected.status === "Disabled" ? (
                <Play size={15} />
              ) : (
                <Pause size={15} />
              )}
              {selected.status === "Disabled" ? "Enable agent" : "Disable agent"}
            </button>
          </div>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            {selected.description}
          </p>

          <div className="mt-5 flex gap-2 overflow-x-auto border-b border-slate-700">
            {["capabilities", "configuration", "activity"].map((item) => (
              <button
                key={item}
                onClick={() => setTab(item)}
                className={`border-b-2 px-3 py-3 text-sm capitalize ${
                  tab === item
                    ? "border-cyan-400 text-cyan-300"
                    : "border-transparent text-slate-400"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {tab === "capabilities" && (
            <div className="grid gap-3 pt-5 sm:grid-cols-2">
              {selected.capabilities.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-lg bg-[#17243A] p-3 text-sm text-slate-200"
                >
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  {item}
                </div>
              ))}
            </div>
          )}

          {tab === "configuration" && (
            <div className="space-y-5 pt-5">
              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Detection sensitivity
                </label>

                <select
                  value={selected.config.sensitivity}
                  onChange={(event) =>
                    updateConfig("sensitivity", event.target.value)
                  }
                  className="w-full rounded-lg border border-slate-600 bg-[#080D18] p-3 text-sm text-white"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Maximum findings per review
                </label>

                <input
                  type="number"
                  min="1"
                  max="100"
                  value={selected.config.maxFindings}
                  onChange={(event) => {
                    const value = event.target.value;
                    if (value === "") {
                      updateConfig("maxFindings", "");
                      return;
                    }

                    const number = Number(value);
                    if (number >= 1 && number <= 100) {
                      updateConfig("maxFindings", number);
                    }
                  }}
                  className="w-full rounded-lg border border-slate-600 bg-[#080D18] p-3 text-sm text-white"
                />
                <p className="mt-2 text-xs text-slate-500">
                  Enter a value between 1 and 100.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={saveConfig}
                  disabled={
                    selected.config.maxFindings === "" ||
                    selected.config.maxFindings < 1
                  }
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Save size={15} />
                  Save configuration
                </button>

                <button
                  onClick={resetConfig}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800"
                >
                  <RotateCcw size={15} />
                  Restore defaults
                </button>
              </div>

              <p className="text-xs text-slate-500">
                <Save size={13} className="mr-1 inline" />
                Changes are stored in page state only and will reset when the page reloads.
              </p>
            </div>
          )}

          {tab === "activity" && (
            <div className="space-y-4 pt-5 text-sm">
              {[
                "Configuration viewed",
                "Agent profile loaded",
                "Demo workspace initialized"
              ].map((event, index) => (
                <div
                  key={event}
                  className="flex items-center gap-3 text-slate-300"
                >
                  <Activity size={16} className="text-cyan-400" />
                  <span>{event}</span>
                  <span className="ml-auto text-xs text-slate-500">
                    {index + 1}h ago
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-slate-700 bg-[#111B2E] p-5">
          <h2 className="font-semibold text-white">Agent execution model</h2>
          <p className="mt-2 text-sm text-slate-400">
            The planned review coordinator distributes work across specialized agents.
          </p>

          <div className="mt-5 rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-4 text-center">
            <Bot className="mx-auto text-cyan-300" size={25} />
            <p className="mt-2 font-medium text-white">Review Coordinator</p>
            <p className="mt-1 text-xs text-slate-400">
              Receives pull request context
            </p>
          </div>

          <div className="mx-auto h-7 w-px bg-slate-600" />

          <div className="grid grid-cols-2 gap-2">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className="rounded-lg bg-[#17243A] p-3 text-center"
              >
                <p className="text-xs font-medium text-slate-200">
                  {agent.name.replace(" Agent", "")}
                </p>
                <p
                  className={`mt-1 text-[11px] ${
                    agent.status === "Disabled"
                      ? "text-slate-500"
                      : "text-emerald-400"
                  }`}
                >
                  {agent.status}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-5 text-xs leading-5 text-slate-500">
            This diagram describes the planned architecture; it does not represent a live agent execution.
          </p>
        </div>
      </section>
    </div>
  );
}

export default AgentManagement;