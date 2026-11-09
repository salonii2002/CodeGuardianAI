
import { LockKeyhole, Fingerprint, UserCheck, FileSearch } from "lucide-react";
import PublicPage from "./PublicPage";

const principles = [
  {
    title: "Evidence before conclusions",
    description: "Present the underlying scanner or code evidence separately from generated explanations.",
    icon: FileSearch
  },
  {
    title: "Developer approval",
    description: "Keep a human decision point before proposed changes or review comments are published.",
    icon: UserCheck
  },
  {
    title: "Protect credentials",
    description: "Sensitive tokens and webhook secrets should be handled by secured backend services, never exposed in browser code.",
    icon: LockKeyhole
  },
  {
    title: "Traceable decisions",
    description: "Design the workflow to record review decisions and changes for later inspection.",
    icon: Fingerprint
  }
];

function Security() {
  return (
    <PublicPage
      eyebrow="Security principles"
      title="Security should be part of the review process."
      description="CodeGuardian AI is designed with evidence, controlled access and developer approval as core workflow principles."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {principles.map((item) => {
          const Icon = item.icon;

          return (
            <article key={item.title} className="rounded-xl border border-slate-800 bg-[#111B2E] p-6">
              <Icon size={26} className="text-cyan-400" />
              <h2 className="mt-4 text-lg font-semibold">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">{item.description}</p>
            </article>
          );
        })}
      </div>

      <div className="mt-8 rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
        <h2 className="font-semibold text-amber-300">Implementation note</h2>
        <p className="mt-2 text-sm leading-7 text-slate-400">
          These are product design principles, not a certification or claim that the current frontend has completed a security audit. Production security requires backend controls, secure secret storage, authentication and testing.
        </p>
      </div>
    </PublicPage>
  );
}

export default Security;
