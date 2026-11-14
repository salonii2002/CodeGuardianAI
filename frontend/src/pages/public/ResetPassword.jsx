
import { useState } from "react";
import { Link } from "react-router-dom";

import {
  ShieldCheck,
  LockKeyhole,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [resetComplete, setResetComplete] = useState(false);

  const requirements = [
    {
      label: "At least 8 characters",
      valid: password.length >= 8,
    },
    {
      label: "One uppercase letter",
      valid: /[A-Z]/.test(password),
    },
    {
      label: "One number",
      valid: /\d/.test(password),
    },
    {
      label: "One special character",
      valid: /[^A-Za-z0-9]/.test(password),
    },
  ];

  const handleReset = (e) => {
    e.preventDefault();
    setError("");

    if (requirements.some((item) => !item.valid)) {
      setError("Please meet all password requirements.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Frontend demonstration only.
    // No password is stored or changed.
    setResetComplete(true);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#080D18] px-4 py-12 text-white">
      <div className="w-full max-w-md">

        <Link
          to="/forgot-password"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to password recovery
        </Link>

        <section className="rounded-2xl border border-white/10 bg-[#111B2E] p-6 shadow-2xl shadow-black/30 sm:p-9">

          {/* Logo */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10">
            {resetComplete ? (
              <CheckCircle2 size={30} className="text-emerald-400" />
            ) : (
              <LockKeyhole size={30} className="text-cyan-400" />
            )}
          </div>

          {/* Heading */}
          <div className="mt-6 text-center">
            <h1 className="text-2xl font-bold">
              {resetComplete ? "Password reset complete" : "Create new password"}
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              {resetComplete
                ? "Your password reset form was completed successfully in this demo."
                : "Choose a strong password to protect your CodeGuardian AI account."}
            </p>
          </div>

          {resetComplete ? (
            <div className="mt-7 space-y-5">

              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-emerald-300">
                  <CheckCircle2 size={19} />
                  Demo reset successful
                </div>

                <p className="mt-2 text-xs leading-5 text-slate-400">
                  No real password was changed or stored. Backend integration
                  is required for actual password recovery.
                </p>
              </div>

              <Link
                to="/login"
                className="block w-full rounded-xl bg-blue-600 px-5 py-3.5 text-center text-sm font-bold text-white transition hover:bg-blue-500"
              >
                Back to Login
              </Link>

            </div>
          ) : (
            <form onSubmit={handleReset} className="mt-7 space-y-5">

              {/* New Password */}
              <div>
                <label
                  htmlFor="new-password"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  New password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    id="new-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter new password"
                    className="w-full rounded-xl border border-white/10 bg-[#080D18] py-3 pl-10 pr-12 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirm-password"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Confirm new password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setError("");
                    }}
                    placeholder="Confirm new password"
                    className="w-full rounded-xl border border-white/10 bg-[#080D18] py-3 pl-10 pr-12 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Password Requirements */}
              <div className="rounded-xl border border-white/[0.07] bg-[#080D18] p-4">
                <p className="mb-3 text-xs font-semibold text-slate-300">
                  Password requirements
                </p>

                <div className="grid grid-cols-1 gap-2">
                  {requirements.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-2 text-xs"
                    >
                      <CheckCircle2
                        size={15}
                        className={
                          item.valid
                            ? "text-emerald-400"
                            : "text-slate-600"
                        }
                      />

                      <span
                        className={
                          item.valid
                            ? "text-emerald-300"
                            : "text-slate-500"
                        }
                      >
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Error */}
              {error && (
                <div
                  role="alert"
                  className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300"
                >
                  <AlertCircle size={18} />
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-500"
              >
                Reset password
              </button>

            </form>
          )}

          {/* Security Footer */}
          <div className="mt-7 border-t border-white/[0.07] pt-5 text-center">
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck size={15} className="text-emerald-400" />

              <span className="text-xs text-slate-500">
                Password security and account protection
              </span>
            </div>

            <p className="mt-2 text-xs text-slate-600">
              Frontend demonstration · No real password changes
            </p>
          </div>

        </section>
      </div>
    </main>
  );
}

export default ResetPassword;
