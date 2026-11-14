
import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { AuthContext } from "./auth-context";
import { apiRequest, getApiUrl } from "../services/api";

const AUTH_ENABLED =
  import.meta.env.VITE_AUTH_ENABLED === "true";

export function AuthProvider({ children }) {
  const [status, setStatus] = useState(
    AUTH_ENABLED ? "checking" : "demo"
  );

  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState("");

  const refreshSession = useCallback(async () => {
    if (!AUTH_ENABLED) {
      setUser(null);
      setStatus("demo");
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

    async function checkSession() {
      try {
        const data = await apiRequest("/auth/session");

        if (!active) return;

        setUser(data.user || data);
        setStatus("authenticated");
        setAuthError("");
      } catch (error) {
        if (!active) return;

        setUser(null);
        setStatus("unauthenticated");
        setAuthError(error.message);
      }
    }

    checkSession();

    return () => {
      active = false;
    };
  }, []);

  const loginWithGitHub = useCallback(() => {
    if (!AUTH_ENABLED) {
      setAuthError(
        "GitHub sign-in is not connected yet. Enable the backend OAuth endpoint first."
      );
      return;
    }

    window.location.assign(
      getApiUrl("/auth/github/login")
    );
  }, []);

  const logout = useCallback(async () => {
    if (AUTH_ENABLED) {
      try {
        await apiRequest("/auth/logout", {
          method: "POST",
        });
      } catch (error) {
        setAuthError(error.message);
        return;
      }
    }

    setUser(null);
    setStatus(AUTH_ENABLED ? "unauthenticated" : "demo");
    setAuthError("");
  }, []);

  const clearAuthError = useCallback(() => {
    setAuthError("");
  }, []);

  const value = {
    status,
    user,
    authError,
    authEnabled: AUTH_ENABLED,
    loginWithGitHub,
    refreshSession,
    logout,
    clearAuthError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
