
import {
  Search,
  Shield,
  GitPullRequest,
  FileText,
  Users,
  ChartNoAxesCombined
} from "lucide-react";
import PublicPage from "./PublicPage";

const features = [
  ["Multi-agent reviews", "Coordinate specialized agents for security, quality, testing and documentation.", Users],
  ["Evidence-first findings", "Keep scanner evidence separate from AI-generated explanations.", Shield],
  ["Pull request workflow", "Organize repository and pull request review activities.", GitPullRequest],
  ["Finding investigation", "Inspect affected files, code snippets and suggested fixes.", Search],
  ["Review reports", "Present findings and review summaries in one place.", FileText],
  ["Evaluation metrics", "Plan to track review quality, finding precision and workflow outcomes.", ChartNoAxesCombined]
];

function Features() {
  return (
    <PublicPage
      eyebrow="Platform features"
      title="A connected workspace for code review."
      description="Bring review context, security evidence and developer decisions together in one interface."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(([title, description, Icon]) => (
          <article key={title} className="rounded-xl border border-slate-800 bg-[#111B2E] p-6">
            <Icon size={26} className="text-cyan-400" />
            <h2 className="mt-5 font-semibold text-white">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-400">{description}</p>
          </article>
        ))}
      </div>
    </PublicPage>
  );
}

export default Features;
