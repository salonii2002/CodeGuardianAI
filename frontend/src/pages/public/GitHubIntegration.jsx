
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  GitBranch,
  ShieldCheck,
  KeyRound,
  AlertCircle,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

function GitHubIntegration() {
  const navigate = useNavigate();

  const [token, setToken] = useState("");
  const [webhookSecret, setWebhookSecret] = useState("");
  const [showToken, setShowToken] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const [message, setMessage] = useState("");

  const handleConnect = (e) => {
    e.preventDefault();

    setMessage("");

    if (!token.trim()) {
      setMessage("Please enter your GitHub Personal Access Token.");
      return;
    }

    // Frontend demonstration only.
    // Never store real credentials in localStorage or frontend code.
    setConnectionStatus("demo");
    setMessage(
      "Demo configuration accepted. Actual GitHub connection requires backend integration."
    );
  };

  const handleContinue = () => {
    navigate("/app/dashboard");
  };

  return (
    <main className="min-h-screen bg-[#080D18] px-4 py-10 text-white sm:px-6">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-[#111B2E]">
            <GitBranch size={20} />
          </div>

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
            CodeGuardian AI Setup
          </p>

          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            Connect your GitHub account
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-400">
            Connect your GitHub account to allow CodeGuardian AI to
            access repositories and analyze pull requests.
          </p>
        </div>

        {/* Connection status */}
        <div className="mb-6 flex items-center justify-between rounded-xl border border-white/10 bg-[#111B2E] p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-500/10 p-2">
              <GitBranch className="text-blue-400" size={21} />
            </div>

            <div>
              <p className="text-sm font-semibold">GitHub Connection</p>
              <p className="mt-1 text-xs text-slate-400">
                {connectionStatus === "demo"
                  ? "Demo configuration completed"
                  : "Not connected"}
              </p>
            </div>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              connectionStatus === "demo"
                ? "bg-amber-500/10 text-amber-400"
                : "bg-slate-500/10 text-slate-400"
            }`}
          >
            {connectionStatus === "demo" ? "Demo only" : "Disconnected"}
          </span>
        </div>

        {/* GitHub OAuth */}
        <section className="rounded-2xl border border-white/10 bg-[#111B2E] p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-white/5 p-3">
              <GitBranch  size={25} />
            </div>

            <div className="flex-1">
              <h2 className="text-lg font-bold">
                Connect using GitHub OAuth
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Authorize CodeGuardian AI through GitHub to grant
                repository permissions securely.
              </p>
            </div>
          </div>

          <button
            type="button"
            disabled
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#080D18] px-5 py-3.5 text-sm font-semibold text-slate-400"
          >
            <GitBranch  size={18} />
            Continue with GitHub
          </button>

          <p className="mt-3 text-center text-xs text-slate-500">
            OAuth authorization will be enabled after backend integration.
          </p>
        </section>

        {/* Personal access token */}
        <section className="mt-6 rounded-2xl border border-white/10 bg-[#111B2E] p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-cyan-500/10 p-3">
              <KeyRound size={23} className="text-cyan-400" />
            </div>

            <div>
              <h2 className="text-lg font-bold">
                Personal Access Token
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                Alternative GitHub authentication method
              </p>
            </div>
          </div>

          <form onSubmit={handleConnect} className="mt-7 space-y-5">

            <div>
              <label
                htmlFor="github-token"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                GitHub Personal Access Token
              </label>

              <div className="relative">
                <input
                  id="github-token"
                  type={showToken ? "text" : "password"}
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="Enter your GitHub token"
                  autoComplete="off"
                  className="w-full rounded-xl border border-white/10 bg-[#080D18] px-4 py-3 pr-12 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
                />

                <button
                  type="button"
                  onClick={() => setShowToken(!showToken)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  aria-label={showToken ? "Hide token" : "Show token"}
                >
                  {showToken ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                Use a fine-grained token with only the repository
                permissions your integration needs.
              </p>
            </div>

            <div>
              <label
                htmlFor="webhook-secret"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Webhook Secret
                <span className="ml-2 text-xs text-slate-500">
                  Optional configuration
                </span>
              </label>

              <div className="relative">
                <input
                  id="webhook-secret"
                  type={showSecret ? "text" : "password"}
                  value={webhookSecret}
                  onChange={(e) => setWebhookSecret(e.target.value)}
                  placeholder="Enter webhook secret"
                  autoComplete="off"
                  className="w-full rounded-xl border border-white/10 bg-[#080D18] px-4 py-3 pr-12 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
                />

                <button
                  type="button"
                  onClick={() => setShowSecret(!showSecret)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  aria-label={showSecret ? "Hide secret" : "Show secret"}
                >
                  {showSecret ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                In production, webhook secrets should be generated and
                managed securely by the backend for each webhook.
              </p>
            </div>

            {message && (
              <div className="flex items-start gap-2 rounded-xl border border-amber-500/20 bg-amber-500/10 p-3 text-xs leading-5 text-amber-300">
                <AlertCircle size={17} className="mt-0.5 shrink-0" />
                {message}
              </div>
            )}

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-500"
            >
              Configure Demo Credentials
              <ArrowRight size={17} />
            </button>

          </form>
        </section>

        {/* Security notice */}
        <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-300">
            <ShieldCheck size={19} />
            Security information
          </div>

          <p className="mt-2 text-xs leading-6 text-slate-400">
            This frontend demonstration does not transmit or save your
            credentials. Do not enter real GitHub tokens or webhook
            secrets here. Secure server-side storage and validation
            must be implemented before production use.
          </p>
        </div>

        {/* Continue */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={handleContinue}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#111B2E] px-5 py-3.5 text-sm font-semibold text-white transition hover:border-blue-500/50 sm:w-auto sm:min-w-64"
          >
            Continue to Dashboard
            <ArrowRight size={17} />
          </button>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-sm text-slate-500 transition hover:text-white"
          >
            Back to Login
          </button>
        </div>

      </div>
    </main>
  );
}

export default GitHubIntegration;
