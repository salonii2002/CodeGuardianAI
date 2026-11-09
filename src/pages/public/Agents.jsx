
import PublicPage from "./PublicPage";
import { ShieldCheck, Code2, TestTube2, BookOpen } from "lucide-react";

const agents = [
  {
    name: "Security Agent",
    status: "Live",
    color: "text-red-400",
    icon: ShieldCheck,
    description: "Reviews security-related evidence such as exposed secrets, unsafe input handling and vulnerable patterns."
  },
  {
    name: "Code Quality Agent",
    status: "Beta",
    color: "text-blue-400",
    icon: Code2,
    description: "Highlights maintainability concerns, complexity and potentially problematic code patterns."
  },
  {
    name: "Test Gap Agent",
    status: "Beta",
    color: "text-emerald-400",
    icon: TestTube2,
    description: "Identifies changed code paths that may need additional unit or integration tests."
  },
  {
    name: "Documentation Agent",
    status: "Beta",
    color: "text-amber-400",
    icon: BookOpen,
    description: "Highlights documentation that may need updates after code or API changes."
  }
];

function Agents() {
  return (
    <PublicPage
      eyebrow="Multi-agent architecture"
      title="Specialized agents. One coordinated review."
      description="Each agent focuses on a different review responsibility. The coordinator brings their results together into one understandable review."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {agents.map((agent) => {
          const Icon = agent.icon;

          return (
            <article key={agent.name} className="rounded-xl border border-slate-800 bg-[#111B2E] p-6">
              <div className="flex items-center justify-between">
                <div className={`rounded-xl bg-slate-800 p-3 ${agent.color}`}>
                  <Icon size={24} />
                </div>
                <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300">
                  {agent.status}
                </span>
              </div>

              <h2 className="mt-5 text-xl font-semibold">{agent.name}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">{agent.description}</p>
            </article>
          );
        })}
      </div>

      <p className="mt-6 text-xs leading-6 text-slate-500">
        Status labels describe the current product concept and frontend demonstration. They do not indicate that production agent services are connected.
      </p>
    </PublicPage>
  );
}

export default Agents;
