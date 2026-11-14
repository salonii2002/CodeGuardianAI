
import PublicPage from "./PublicPage";

const values = [
  {
    title: "Security first",
    description: "Prioritize evidence-backed security findings and practical remediation."
  },
  {
    title: "Human controlled",
    description: "Keep developers in control of accepting, rejecting and publishing recommendations."
  },
  {
    title: "Clear explanations",
    description: "Make findings understandable with affected code, evidence and suggested fixes."
  }
];

function About() {
  return (
    <PublicPage
      eyebrow="About CodeGuardian AI"
      title="Helping development teams build more secure software."
      description="CodeGuardian AI is a multi-agent code review and DevSecOps platform concept designed to bring security, code quality and review context into one developer workflow."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {values.map((item) => (
          <div key={item.title} className="rounded-xl border border-slate-800 bg-[#111B2E] p-6">
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-400">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-blue-500/20 bg-blue-500/5 p-6">
        <h2 className="text-xl font-semibold">Our objective</h2>
        <p className="mt-3 max-w-3xl leading-7 text-slate-300">
          Help developers understand potential risks earlier, review proposed changes with context, and make informed decisions before code is merged.
        </p>
      </div>
    </PublicPage>
  );
}

export default About;
