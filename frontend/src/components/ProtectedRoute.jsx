
import { Navigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { useAuth } from "../context/useAuth";

function ProtectedRoute({ children }) {
  const { status, authEnabled } = useAuth();

  // Allow demo access while backend authentication is disabled.
  if (!authEnabled) {
    return children;
  }

  if (status === "checking") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#080D18] text-slate-300">
        <LoaderCircle
          className="animate-spin text-cyan-400"
          size={34}
        />
        <p className="mt-4 text-sm">Checking your session...</p>
      </div>
    );
  }

  if (status !== "authenticated") {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
