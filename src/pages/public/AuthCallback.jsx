
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  LoaderCircle,
  XCircle,
} from "lucide-react";
import { useAuth } from "../../context/useAuth";

function AuthCallback() {
  const navigate = useNavigate();
  const { refreshSession } = useAuth();

  const [message, setMessage] = useState(
    "Verifying your GitHub session..."
  );
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;

    async function verifyLogin() {
      try {
        const user = await refreshSession();

        if (!active) return;

        if (user) {
          setMessage("GitHub account connected successfully.");

          setTimeout(() => {
            if (active) {
              navigate("/app/dashboard", { replace: true });
            }
          }, 900);
        } else {
          setFailed(true);
          setMessage(
            "We could not verify your session. Please try signing in again."
          );
        }
      } catch {
        if (!active) return;

        setFailed(true);
        setMessage(
          "We could not verify your session. Please try signing in again."
        );
      }
    }

    verifyLogin();

    return () => {
      active = false;
    };
  }, [navigate, refreshSession]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#080D18] px-4 text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#111B2E] p-8 text-center">
        {failed ? (
          <XCircle size={42} className="mx-auto text-red-400" />
        ) : message.startsWith("GitHub account") ? (
          <CheckCircle2
            size={42}
            className="mx-auto text-emerald-400"
          />
        ) : (
          <LoaderCircle
            size={42}
            className="mx-auto animate-spin text-cyan-400"
          />
        )}

        <h1 className="mt-5 text-xl font-bold">
          {failed ? "Sign-in unsuccessful" : "Connecting your account"}
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-400">
          {message}
        </p>

        {failed && (
          <Link
            to="/login"
            className="mt-6 inline-flex rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold hover:bg-blue-500"
          >
            Back to sign in
          </Link>
        )}
      </div>
    </main>
  );
}

export default AuthCallback;
