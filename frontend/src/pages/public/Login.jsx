
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  GitBranch,
  ShieldCheck,
  LockKeyhole,
  ArrowLeft,
  LoaderCircle,
  AlertCircle,
  CheckCircle2,
  Mail,
  Eye,
  EyeOff,
} from "lucide-react";

import { useAuth } from "../../context/useAuth";

function Login() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    loginWithGitHub,
    status,
    authEnabled,
    authError,
    clearAuthError,
  } = useAuth();

  const [email, setEmail] = useState(location.state?.email || "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formError, setFormError] = useState("");

  const isChecking = status === "checking";

  const registrationDemo = location.state?.registrationDemo;
  const registeredEmail = location.state?.email;

  const handleEmailLogin = (e) => {
    e.preventDefault();

    setFormError("");

    if (!email.trim()) {
      setFormError("Please enter your email address.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setFormError("Please enter your password.");
      return;
    }

    // Frontend demonstration only.
    // Real authentication requires backend integration.
    navigate("/github-integration", {
      state: {
        email,
        rememberMe,
        loginDemo: true,
      },
    });
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080D18] px-4 py-12 text-white">

      {/* Background Effects */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative w-full max-w-md">

        {/* Back to Website */}
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to website
        </Link>

        <section className="rounded-2xl border border-white/10 bg-[#111B2E] p-6 shadow-2xl shadow-black/30 sm:p-9">

          {/* Logo */}
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10">
            <ShieldCheck size={29} className="text-cyan-400" />
          </div>

          {/* Heading */}
          <div className="mt-6 text-center">
            <h1 className="text-2xl font-bold tracking-tight">
              Welcome to CodeGuardian AI
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Sign in to review repositories, inspect pull requests and
              understand security findings.
            </p>
          </div>

          {/* Registration Demo Message */}
          {registrationDemo && (
            <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
              <div className="flex items-start gap-3">
                <CheckCircle2
                  size={21}
                  className="mt-0.5 shrink-0 text-emerald-400"
                />

                <div>
                  <p className="text-sm font-semibold text-emerald-300">
                    Registration demo completed
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-300">
                    Your registration form was validated successfully.

                    {registeredEmail && (
                      <span className="mt-1 block text-cyan-300">
                        Email: {registeredEmail}
                      </span>
                    )}
                  </p>

                  <p className="mt-2 text-xs text-slate-400">
                    No real account has been created.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Email Login Form */}
          <form onSubmit={handleEmailLogin} className="mt-8 space-y-5">

            {/* Email */}
            <div>
              <label
                htmlFor="login-email"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Email address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setFormError("");
                  }}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-white/10 bg-[#080D18] py-3 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="login-password"
                  className="text-sm font-medium text-slate-300"
                >
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-blue-400 transition hover:text-blue-300"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setFormError("");
                  }}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-white/10 bg-[#080D18] py-3 pl-10 pr-12 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-400">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-slate-600 bg-[#080D18] accent-blue-500"
              />
              Remember me
            </label>

            {/* Form Error */}
            {formError && (
              <div
                role="alert"
                className="flex gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300"
              >
                <AlertCircle size={18} className="shrink-0" />
                {formError}
              </div>
            )}

            {/* Email Sign In */}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-500"
            >
              Sign in with Email
            </button>
          </form>

          {/* OR Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/10" />

            <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
              Or continue with
            </span>

            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* GitHub Login */}
          <button
            type="button"
            onClick={loginWithGitHub}
            disabled={isChecking}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-[#080D18] transition hover:bg-slate-200 disabled:cursor-wait disabled:opacity-60"
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
              : "GitHub sign-in requires backend OAuth configuration."}
          </p>

          {/* Authentication Error */}
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

          {/* Create Account */}
          <div className="mt-7 border-t border-white/[0.07] pt-6 text-center">
            <p className="text-sm text-slate-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-cyan-400 transition hover:text-cyan-300"
              >
                Create account
              </Link>
            </p>
          </div>

          {/* Security Information */}
          <div className="mt-7 border-t border-white/[0.07] pt-5 text-center">
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck size={15} className="text-emerald-400" />

              <p className="text-xs text-slate-500">
                Secure code review workspace
              </p>
            </div>

            <p className="mt-2 text-xs leading-5 text-slate-600">
              This frontend demo does not authenticate or store credentials.
            </p>
          </div>
        </section>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-600">
          CodeGuardian AI · Autonomous Multi-Agent Code Review
        </p>
      </div>
    </main>
  );
}

export default Login;
