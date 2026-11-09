
import { Code2, Database, GitBranch, BrainCircuit, ShieldCheck } from "lucide-react";
import PublicPage from "./PublicPage";

const technologies = [
  {
    name: "React",
    category: "Frontend",
    description: "Builds the interactive developer workspace and public website.",
    icon: Code2
  },
  {
    name: "Python and Flask",
    category: "Backend",
    description: "Planned API layer for review orchestration and application services.",
    icon: Database
  },
  {
    name: "GitHub integration",
    category: "Source control",
    description: "Planned repository and pull request workflow integration.",
    icon: GitBranch
  },
  {
    name: "Multi-agent orchestration",
    category: "AI architecture",
    description: "Coordinates specialized review agents and consolidates their results.",
    icon: BrainCircuit
  },
  {
    name: "Security scanners",
    category: "DevSecOps",
    description: "Planned scanner integrations include tools such as Semgrep, Bandit and Gitleaks.",
    icon: ShieldCheck
  }
];

function Technology() {
  return (
    <PublicPage
      eyebrow="Technology stack"
      title="Built around a modular DevSecOps architecture."
      description="The platform concept combines a developer-facing interface, backend orchestration, source-control integration and security analysis tools."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {technologies.map((technology) => {
          const Icon = technology.icon;

          return (
            <article key={technology.name} className="rounded-xl border border-slate-800 bg-[#111B2E] p-6">
              <div className="flex items-center justify-between gap-3">
                <Icon size={26} className="text-cyan-400" />
                <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400">
                  {technology.category}
                </span>
              </div>
              <h2 className="mt-5 text-lg font-semibold">{technology.name}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">{technology.description}</p>
            </article>
          );
        })}
      </div>

      <p className="mt-6 text-xs leading-6 text-slate-500">
        The frontend may show planned technologies before their services are integrated. Do not interpret this list as proof that every service is currently running.
      </p>
    </PublicPage>
  );
}

export default Technology;
