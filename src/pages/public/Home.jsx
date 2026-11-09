
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  GitPullRequest,
  Bot,
  Activity,
  CheckCircle2
} from "lucide-react";

const highlights = [
  {
    title: "Evidence-first security",
    description: "Keep scanner evidence visible alongside clear explanations.",
    icon: ShieldCheck
  },
  {
    title: "Coordinated AI agents",
    description: "Separate review responsibilities across focused agents.",
    icon: Bot
  },
  {
    title: "Developer-controlled workflow",
    description: "Inspect and approve recommendations before publishing.",
    icon: GitPullRequest
  }
];

function Home() {
  return (
    <main className="overflow-hidden bg-[#080D18] text-white">
      <section className="relative px-5 pb-20 pt-20 sm:px-8 lg:pb-28 lg:pt-28">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-cyan-500/5 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-3 py-2 text-xs text-cyan-300">
              <Activity size={14} />
              Multi-agent code review platform
            </div>

            <h1 className="mt-7 text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
              Secure code.
              <span className="block text-cyan-400">Confident releases.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-400 sm:text-lg">
              Bring security evidence, code quality insights and developer decisions into one coordinated pull request review workflow.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/app/dashboard"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-500"
              >
                Explore CodeGuardian AI
                <ArrowRight size={17} />
              </Link>

              <Link
                to="/how-it-works"
                className="inline-flex items-center rounded-lg border border-slate-700 px-6 py-3.5 text-sm font-semibold text-slate-300 transition hover:bg-slate-800"
              >
                See how it works
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs text-slate-500">
              <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400" /> Evidence-focused reviews</span>
              <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400" /> Human approval</span>
            </div>
          </div>

          <div className="relative rounded-2xl border border-slate-700 bg-[#111B2E] p-5 shadow-2xl shadow-blue-950/30 sm:p-7">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <p className="text-sm font-semibold">Review overview</p>
                <p className="mt-1 text-xs text-slate-500">Illustrative interface preview</p>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">Demo</span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {[
                ["12", "Repositories"],
                ["48", "Pull requests"],
                ["15", "Findings"],
                ["36", "Review runs"]
              ].map(([value, label]) => (
                <div key={label} className="rounded-xl border border-slate-800 bg-[#080D18] p-4">
                  <p className="text-2xl font-bold">{value}</p>
                  <p className="mt-1 text-xs text-slate-500">{label}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-xl border border-slate-800 bg-[#080D18] p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-red-500/10 p-2 text-red-400"><ShieldCheck size={19} /></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Security review</p>
                  <p className="text-xs text-slate-500">Evidence inspection</p>
                </div>
                <span className="text-xs text-emerald-400">Ready</span>
              </div>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-4/5 rounded-full bg-cyan-500" />
              </div>
            </div>

            <div className="mt-3 rounded-xl border border-slate-800 bg-[#080D18] p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-500/10 p-2 text-blue-400"><GitPullRequest size={19} /></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Human approval</p>
                  <p className="text-xs text-slate-500">Developer decision required</p>
                </div>
                <span className="text-xs text-amber-400">Pending</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-800 px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">Why CodeGuardian AI</p>
            <h2 className="mt-3 text-3xl font-bold">A clearer way to review code changes.</h2>
            <p className="mt-4 leading-7 text-slate-400">
              Help teams investigate findings, understand risk and make review decisions with useful context.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <article key={item.title} className="rounded-xl border border-slate-800 bg-[#111B2E] p-6">
                  <Icon size={26} className="text-cyan-400" />
                  <h3 className="mt-5 font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
