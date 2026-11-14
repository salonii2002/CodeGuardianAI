
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  ShieldCheck,
  Eye,
  EyeOff,
  User,
  Mail,
  LockKeyhole,
  CheckCircle2,
  GitBranch,
  Globe,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";

import { useAuth } from "../../context/useAuth";

function Register() {
  const navigate = useNavigate();
  const { loginWithGitHub, status } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordChecks = [
    { label: "At least 8 characters", valid: form.password.length >= 8 },
    { label: "One uppercase letter", valid: /[A-Z]/.test(form.password) },
    { label: "One number", valid: /[0-9]/.test(form.password) },
    {
      label: "One special character",
      valid: /[^A-Za-z0-9]/.test(form.password),
    },
  ];

  const passwordStrength = passwordChecks.filter(
    (check) => check.valid
  ).length;

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  }

  function handleRegister(event) {
    event.preventDefault();

    if (!form.name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (passwordStrength !== 4) {
      setError("Please create a stronger password.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    if (!acceptedTerms) {
      setError("Please accept the Terms and Privacy Policy.");
      return;
    }

    setLoading(true);

    // Frontend demonstration only. No account is created.
    window.setTimeout(() => {
      navigate("/verify-email", {
        state: {
          email: form.email,
          registrationDemo: true,
        },
      });
    }, 700);
  }

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-[#080D18] py-3.5 pl-11 pr-12 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/10";

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080D18] px-4 py-10 text-white">
      {/* Background Effects */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative w-full max-w-lg">
        <Link
          to="/"
          className="mb-7 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to website
        </Link>

        <section className="rounded-2xl border border-white/10 bg-[#111B2E] p-6 shadow-2xl shadow-black/30 sm:p-9">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10">
            <ShieldCheck size={27} className="text-cyan-400" />
          </div>

          <div className="mt-5">
            <h1 className="text-2xl font-bold tracking-tight">
              Create your account
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Start securing your code with intelligent multi-agent reviews.
            </p>
          </div>

          <form onSubmit={handleRegister} className="mt-7 space-y-5">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-300">
                Full name
              </label>
              <div className="relative">
                <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-300">
                Email address
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-300">
                Password
              </label>
              <div className="relative">
                <LockKeyhole size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  autoComplete="new-password"
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="mt-3 space-y-2">
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`h-1.5 flex-1 rounded-full ${
                        passwordStrength >= level ? "bg-cyan-400" : "bg-slate-700"
                      }`}
                    />
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {passwordChecks.map((check) => (
                    <div
                      key={check.label}
                      className={`flex items-center gap-1.5 text-xs ${
                        check.valid ? "text-emerald-400" : "text-slate-500"
                      }`}
                    >
                      <CheckCircle2 size={13} />
                      {check.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-slate-300">
                Confirm password
              </label>
              <div className="relative">
                <LockKeyhole size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-5 text-slate-400">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(event) => setAcceptedTerms(event.target.checked)}
                className="mt-1 accent-cyan-400"
              />
              <span>I agree to the Terms of Service and Privacy Policy.</span>
            </label>

            {error && (
              <div role="alert" className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300">
                <AlertCircle size={17} />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-500 disabled:cursor-wait disabled:opacity-60"
            >
              {loading ? "Creating demo account..." : "Create account"}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs font-medium text-slate-500">OR CONTINUE WITH</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => loginWithGitHub()}
              disabled={status === "checking"}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#080D18] py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/40 hover:bg-white/5 disabled:opacity-50"
            >
              <GitBranch size={18} />
              Continue with GitHub
            </button>

            <button
              type="button"
              onClick={() => setError("Google sign-in is not configured yet.")}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#080D18] py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/40 hover:bg-white/5"
            >
              <Globe size={18} />
              Continue with Google
            </button>
          </div>

          <div className="mt-6 rounded-xl border border-emerald-500/15 bg-emerald-500/5 p-4">
            <div className="flex items-start gap-3">
              <ShieldCheck size={20} className="mt-0.5 shrink-0 text-emerald-400" />
              <div>
                <p className="text-sm font-semibold text-emerald-300">Your security matters</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  CodeGuardian AI helps protect your code through automated security analysis and multi-agent code reviews.
                </p>
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-cyan-400 hover:text-cyan-300">
              Sign in
            </Link>
          </p>

          <p className="mt-4 text-center text-xs leading-5 text-amber-300/70">
            Demo mode: Email registration is a frontend demonstration. No account or credentials are sent or stored.
          </p>
        </section>

        <p className="mt-6 text-center text-xs text-slate-600">
          CodeGuardian AI · Autonomous Multi-Agent Code Review
        </p>
      </div>
    </main>
  );
}

export default Register;
