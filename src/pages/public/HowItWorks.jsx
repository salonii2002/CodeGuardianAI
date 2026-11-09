
import { GitBranch, ScanSearch, BrainCircuit, ClipboardCheck, GitPullRequest } from "lucide-react";
import PublicPage from "./PublicPage";

const steps = [
  {
    number: "01",
    title: "Connect a repository",
    description: "Choose a project repository and select a pull request for review.",
    icon: GitBranch
  },
  {
    number: "02",
    title: "Collect review evidence",
    description: "Inspect changed files and collect available scanner and code context.",
    icon: ScanSearch
  },
  {
    number: "03",
    title: "Coordinate agents",
    description: "Specialized agents analyze security, code quality, test gaps and documentation.",
    icon: BrainCircuit
  },
  {
    number: "04",
    title: "Review recommendations",
    description: "Developers inspect evidence, explanations and proposed remediation.",
    icon: ClipboardCheck
  },
  {
    number: "05",
    title: "Approve and deliver",
    description: "Reviewers decide which comments or changes should be published to the pull request.",
    icon: GitPullRequest
  }
];

function HowItWorks() {
  return (
    <PublicPage
      eyebrow="How it works"
      title="From pull request to informed review."
      description="CodeGuardian AI is designed around an evidence-first workflow with developer approval at important decision points."
    >
      <div className="space-y-5">
        {steps.map((step) => {
          const Icon = step.icon;

          return (
            <div key={step.number} className="flex gap-5 rounded-xl border border-slate-800 bg-[#111B2E] p-5 sm:p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-cyan-400">
                <Icon size={23} />
              </div>

              <div>
                <p className="text-xs font-semibold tracking-widest text-cyan-400">
                  STEP {step.number}
                </p>
                <h2 className="mt-1 text-lg font-semibold text-white">{step.title}</h2>
                <p className="mt-2 text-sm leading-7 text-slate-400">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-xs leading-6 text-slate-500">
        This page describes the intended product workflow. Actual repository synchronization, scanning and publishing require backend and provider integration.
      </p>
    </PublicPage>
  );
}

export default HowItWorks;
