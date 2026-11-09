
import { Link } from "react-router-dom";
import { BookOpen, GitPullRequest, ShieldCheck, Workflow } from "lucide-react";
import PublicPage from "./PublicPage";

const sections = [
  {
    title: "Getting started",
    description: "Understand the workspace, repositories and review dashboard.",
    icon: BookOpen
  },
  {
    title: "Review workflow",
    description: "Learn how a pull request moves through the coordinated review process.",
    icon: GitPullRequest
  },
  {
    title: "Security findings",
    description: "Understand severity, scanner evidence and suggested remediation.",
    icon: ShieldCheck
  },
  {
    title: "Agent coordination",
    description: "Explore the responsibilities of the specialized review agents.",
    icon: Workflow
  }
];

function Docs() {
  return (
    <PublicPage
      eyebrow="Documentation"
      title="Understand the CodeGuardian AI workflow."
      description="Explore the main concepts and learn how the proposed review experience is organized."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {sections.map((section) => {
          const Icon = section.icon;

          return (
            <article key={section.title} className="rounded-xl border border-slate-800 bg-[#111B2E] p-6">
              <Icon size={25} className="text-cyan-400" />
              <h2 className="mt-4 text-lg font-semibold">{section.title}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-400">{section.description}</p>
            </article>
          );
        })}
      </div>

      <Link to="/app/dashboard" className="mt-8 inline-flex rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-500">
        Explore the dashboard
      </Link>
    </PublicPage>
  );
}

export default Docs;
