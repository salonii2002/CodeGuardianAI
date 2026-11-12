
import { Link } from "react-router-dom";
import {
  GitBranch,
  ShieldCheck,
  GitPullRequest,
  LockKeyhole,
  ArrowLeft,
  LoaderCircle,
  AlertCircle,
} from "lucide-react";

import { useAuth } from "../../context/useAuth";

function Login() {
  const {
    loginWithGitHub,
    status,
    authEnabled,
    authError,
    clearAuthError,
  } = useAuth();

  const isChecking = status === "checking";

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080D18] px-4 py-12 text-white">
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative w-full max-w-md">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to website
        </Link>

        <section className="rounded-2xl border border-white/10 bg-[#111B2E] p-6 shadow-2xl shadow-black/30 sm:p-9">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10">
            <ShieldCheck size={29} className="text-cyan-400" />
          </div>

          <div className="mt-6 text-center">
            <h1 className="text-2xl font-bold tracking-tight">
              Welcome to CodeGuardian AI
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Connect your GitHub account to review repositories, inspect pull
              requests and understand security findings.
            </p>
          </div>

          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-[#080D18] p-3">
              <GitPullRequest size={19} className="text-cyan-400" />
              <div>
                <p className="text-sm font-medium">Repository access</p>
                <p className="mt-0.5 text-xs text-slate-500">
                  Select repositories for code reviews.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-[#080D18] p-3">
              <LockKeyhole size={19} className="text-emerald-400" />
              <div>
                <p className="text-sm font-medium">Secure authorization</p>
                <p className="mt-0.5 text-xs text-slate-500">
                  GitHub handles account authorization.
                </p>
              </div>
            </div>
          </div>

          {authError && (
            <div
              role="alert"
              className="mt-5 flex gap-2 rounded-xl border border-amber-500/20 bg-amber-500/10 p-3 text-sm text-amber-200"
            >
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <div className="flex-1">{authError}</div>
              <button
                type="button"
                onClick={clearAuthError}
                aria-label="Dismiss error"
                className="text-amber-200/70 hover:text-white"
              >
                ×
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={loginWithGitHub}
            disabled={isChecking}
            className="mt-7 flex w-full items-center justify-center gap-3 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-[#080D18] transition hover:bg-slate-200 disabled:cursor-wait disabled:opacity-60"
          >
            {isChecking ? (
              <LoaderCircle size={19} className="animate-spin" />
            ) : (
              <GitBranch size={20} />
            )}
            Continue with GitHub
          </button>

          <p className="mt-4 text-center text-xs leading-5 text-slate-500">
            {authEnabled
              ? "You will be redirected to GitHub to authorize access."
              : "Authentication is currently in demo mode. GitHub sign-in will work after the backend OAuth endpoint is connected."}
          </p>

          <div className="mt-7 border-t border-white/[0.07] pt-5 text-center">
            <p className="text-xs text-slate-500">
              By continuing, you authorize the requested GitHub permissions.
            </p>
          </div>
        </section>

        <p className="mt-6 text-center text-xs text-slate-600">
          CodeGuardian AI · Autonomous Multi-Agent Code Review
        </p>
      </div>
    </main>
  );
}

export default Login;
