
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import {
  Mail,
  ShieldCheck,
  ArrowLeft,
  CheckCircle2,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);
  const [resent, setResent] = useState(false);

  const handleVerify = (e) => {
    e.preventDefault();
    setError("");

    if (!/^\d{6}$/.test(code)) {
      setError("Please enter a valid 6-digit verification code.");
      return;
    }

    // Frontend demonstration only.
    setVerified(true);
  };

  const handleResend = () => {
    setResent(true);
    setError("");
    setCode("");
  };

  const handleContinue = () => {
    navigate("/login", {
      state: {
        email,
        verificationDemo: true,
      },
    });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#080D18] px-4 py-12 text-white">
      <div className="w-full max-w-md">

        <Link
          to="/register"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to registration
        </Link>

        <section className="rounded-2xl border border-white/10 bg-[#111B2E] p-6 shadow-2xl sm:p-9">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10">
            {verified ? (
              <CheckCircle2 size={30} className="text-emerald-400" />
            ) : (
              <Mail size={30} className="text-cyan-400" />
            )}
          </div>

          <div className="mt-6 text-center">
            <h1 className="text-2xl font-bold">
              {verified ? "Email verified!" : "Verify your email"}
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              {verified
                ? "Your verification form was completed successfully in this demo."
                : "Enter the 6-digit verification code to continue with your CodeGuardian AI registration."}
            </p>
          </div>

          {email && (
            <div className="mt-6 rounded-xl border border-white/[0.07] bg-[#080D18] p-3 text-center">
              <p className="text-xs text-slate-500">
                Email address
              </p>

              <p className="mt-1 break-all text-sm font-medium text-cyan-300">
                {email}
              </p>
            </div>
          )}

          {verified ? (
            <div className="mt-7 space-y-4">

              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-emerald-300">
                  <CheckCircle2 size={18} />
                  Demo verification successful
                </div>

                <p className="mt-2 text-xs leading-5 text-slate-400">
                  No real email verification has occurred. Backend
                  integration is required for actual account verification.
                </p>
              </div>

              <button
                type="button"
                onClick={handleContinue}
                className="w-full rounded-xl bg-blue-600 px-5 py-3.5 text-center text-sm font-bold text-white transition hover:bg-blue-500"
              >
                Continue to Login
              </button>

            </div>
          ) : (
            <form onSubmit={handleVerify} className="mt-7 space-y-5">

              <div>
                <label
                  htmlFor="verification-code"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Verification code
                </label>

                <input
                  id="verification-code"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  value={code}
                  onChange={(e) => {
                    setCode(
                      e.target.value.replace(/\D/g, "").slice(0, 6)
                    );
                    setError("");
                  }}
                  placeholder="000000"
                  className="w-full rounded-xl border border-white/10 bg-[#080D18] px-4 py-4 text-center text-2xl font-bold tracking-[0.5em] text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300">
                  <AlertCircle size={18} />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={code.length !== 6}
                className="w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Verify Email
              </button>

              {resent && (
                <p className="text-center text-xs text-emerald-400">
                  Demo resend action completed. No email was sent.
                </p>
              )}

              <button
                type="button"
                onClick={handleResend}
                className="flex w-full items-center justify-center gap-2 py-2 text-sm font-medium text-cyan-400 transition hover:text-cyan-300"
              >
                <RefreshCw size={15} />
                Resend verification code
              </button>

            </form>
          )}

          <div className="mt-7 border-t border-white/[0.07] pt-5 text-center">
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck size={15} className="text-emerald-400" />
              <span className="text-xs text-slate-500">
                Secure account verification experience
              </span>
            </div>

            <p className="mt-2 text-xs text-slate-600">
              Frontend demonstration · No real verification code is generated
            </p>
          </div>

        </section>
      </div>
    </main>
  );
}

export default VerifyEmail;
