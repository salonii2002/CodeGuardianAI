
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  GitBranch,
  ChevronRight
} from "lucide-react";

function PublicPage({
  eyebrow = "CODEGUARDIAN AI",
  title = "Build and release secure software.",
  description = "Understand code risks, review findings and improve your development workflow with CodeGuardian AI.",
  children,
  ctaLabel = "Explore Dashboard",
  ctaTo = "/app/dashboard"
}) {
  return (
    <div className="min-h-screen bg-[#080D18] text-slate-100">

      {/* Header */}
      <header className="border-b border-[#263750] bg-[#080D18]/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">

          <Link to="/" className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-600 p-2">
              <ShieldCheck size={24} />
            </div>
            <span className="text-lg font-bold">
              CodeGuardian <span className="text-cyan-400">AI</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm text-slate-400 md:flex">
            <Link to="/features" className="hover:text-white">Features</Link>
            <Link to="/agents" className="hover:text-white">AI Agents</Link>
            <Link to="/how-it-works" className="hover:text-white">How it works</Link>
            <Link to="/security" className="hover:text-white">Security</Link>
          </nav>

          <Link
            to="/app/dashboard"
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold hover:bg-blue-500"
          >
            Open App <ArrowRight size={16} />
          </Link>

        </div>
      </header>

      {/* Page introduction */}
      <section className="border-b border-[#263750] bg-gradient-to-b from-[#111B2E] to-[#080D18] px-5 py-20 text-center">

        <div className="mx-auto max-w-4xl">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold tracking-wider text-cyan-300">
            <ShieldCheck size={15} />
            {eyebrow}
          </div>

          <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            {description}
          </p>

          <Link
            to={ctaTo}
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-500"
          >
            {ctaLabel}
            <ChevronRight size={18} />
          </Link>

        </div>
      </section>

      {/* Page content */}
      <main className="mx-auto max-w-7xl px-5 py-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#263750] px-5 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-slate-500 sm:flex-row">
          <p>© 2026 CodeGuardian AI. Frontend demonstration.</p>

          <div className="flex items-center gap-5">
            <Link to="/security" className="hover:text-white">
              Security
            </Link>
            <Link to="/docs" className="hover:text-white">
              Documentation
            </Link>
            <a
              href="https://github.com/salonii2002"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-white"
            >
              <GitBranch size={16} /> GitHub
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default PublicPage;
