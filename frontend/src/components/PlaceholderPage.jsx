import { Construction, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function PlaceholderPage({ title, description }) {
  return (
    <div className="mx-auto flex min-h-[65vh] max-w-5xl items-center justify-center">
      <div className="w-full rounded-2xl border border-white/10 bg-[#111B2E] p-8 text-center sm:p-12">

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
          <Construction className="h-8 w-8 text-cyan-300" />
        </div>

        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
          CodeGuardian AI Workspace
        </p>

        <h1 className="mt-3 text-3xl font-bold text-white">
          {title}
        </h1>

        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-slate-400">
          {description || "This module is being developed. Its interface and functionality will be added in the next implementation phase."}
        </p>

        <Link
          to="/app/dashboard"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
        >
          Go to Dashboard
          <ArrowRight size={17} />
        </Link>

        <p className="mt-5 text-xs text-slate-600">
          Development preview · Functionality not connected yet
        </p>

      </div>
    </div>
  );
}

export default PlaceholderPage;