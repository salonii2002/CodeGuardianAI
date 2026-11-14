
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Mail,
  ShieldCheck,
  CheckCircle2,
  LockKeyhole,
} from "lucide-react";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Frontend demonstration only.
    // No email is sent.
    setSubmitted(true);
  };

  const handleContinue = () => {
    navigate("/reset-password", {
      state: {
        email,
        resetDemo: true,
      },
    });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#080D18] px-4 py-12 text-white">
      <div className="w-full max-w-md">

        <Link
          to="/login"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to login
        </Link>

        <section className="rounded-2xl border border-white/10 bg-[#111B2E] p-6 shadow-2xl sm:p-9">

          {/* Icon */}
          <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10">
            {submitted ? (
              <CheckCircle2 size={28} className="text-emerald-400" />
            ) : (
              <LockKeyhole size={28} className="text-blue-400" />
            )}
          </div>

          {submitted ? (
            <>
              <h1 className="text-2xl font-bold text-white">
                Request received
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Your password recovery request was validated successfully
                in this frontend demonstration.
              </p>

              <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    size={20}
                    className="mt-0.5 shrink-0 text-emerald-400"
                  />

                  <div>
                    <p className="text-sm font-medium text-emerald-300">
                      Email validated
                    </p>

                    <p className="mt-1 break-all text-xs text-slate-400">
                      {email}
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleContinue}
                className="mt-6 w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
              >
                Continue to Reset Password
              </button>

              <p className="mt-3 text-center text-xs text-slate-500">
                Demo only. No email or reset link was generated.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-white">
                Forgot your password?
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Enter your registered email address to begin the
                password recovery process.
              </p>

              <form onSubmit={handleSubmit} className="mt-7 space-y-5">

                <div>
                  <label
                    htmlFor="recovery-email"
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
                      id="recovery-email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      placeholder="you@example.com"
                      className="w-full rounded-lg border border-slate-700 bg-[#080D18] py-3 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  {error && (
                    <p className="mt-2 text-xs text-red-400">
                      {error}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
                >
                  Continue
                </button>

              </form>
            </>
          )}

          {/* Security Information */}
          <div className="mt-7 border-t border-slate-800 pt-6">
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
              <ShieldCheck size={15} className="text-emerald-400" />
              Secure account recovery experience
            </div>

            <p className="mt-3 text-center text-xs text-slate-600">
              Frontend demonstration · No real password reset email
            </p>
          </div>

        </section>

        <p className="mt-6 text-center text-sm text-slate-500">
          Remember your password?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-400 hover:text-blue-300"
          >
            Sign in
          </Link>
        </p>

      </div>
    </main>
  );
}

export default ForgotPassword;
