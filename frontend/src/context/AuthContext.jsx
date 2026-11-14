
import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { AuthContext } from "./auth-context";
import { apiRequest, getApiUrl } from "../services/api";
const AUTH_ENABLED = import.meta.env.VITE_AUTH_ENABLED === "true";

export function AuthProvider({ children }) {
  const [status, setStatus] = useState(
    AUTH_ENABLED ? "checking" : "demo"
  );

  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState("");

  const refreshSession = useCallback(async () => {
    if (!AUTH_ENABLED) {
      return null;
    }

    try {
      const data = await apiRequest("/auth/session");
      const authenticatedUser = data.user || data;

      setUser(authenticatedUser);
      setStatus("authenticated");
      setAuthError("");

      return authenticatedUser;
    } catch (error) {
      setUser(null);
      setStatus("unauthenticated");
      setAuthError(error.message);

      return null;
    }
  }, []);

  useEffect(() => {
  if (!AUTH_ENABLED) return;

  let active = true;

  apiRequest("/auth/session")
    .then((data) => {
      if (!active) return;

      setUser(data.user || data);
      setStatus("authenticated");
      setAuthError("");
    })
    .catch((error) => {
      if (!active) return;

      setUser(null);
      setStatus("unauthenticated");
      setAuthError(error.message);
    });

  return () => {
    active = false;
  };
}, []);

  function loginWithGitHub() {
    if (!AUTH_ENABLED) {
      setAuthError(
        "GitHub sign-in is not connected yet. The backend OAuth endpoint must be enabled first."
      );
      return;
    }

    window.location.assign(getApiUrl("/auth/github/login"));
  }

  async function logout() {
    if (AUTH_ENABLED) {
      try {
        await apiRequest("/auth/logout", {
          method: "POST",
        });
      } catch (error) {
        setAuthError(error.message);
      }
    }

    setUser(null);
    setStatus(AUTH_ENABLED ? "unauthenticated" : "demo");
  }

  const value = {
    status,
    user,
    authError,
    authEnabled: AUTH_ENABLED,
    loginWithGitHub,
    refreshSession,
    logout,
    clearAuthError: () => setAuthError(""),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
