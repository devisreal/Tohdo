import api, { AUTH_UNAUTHORIZED_EVENT } from "@/api";
import React from "react";

type ApiUser = {
  id: string | number;
  email: string;
};

type AuthMutationResponse = {
  status: string;
  message: string;
  user: ApiUser;
};

type ValidateResponse = {
  status: string;
  isValid: boolean;
  user: ApiUser;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = {
  username: string;
  email: string;
  password: string;
};

export type AuthUser = {
  id: string;
  email: string;
};

export type AuthStatus = "checking" | "authenticated" | "unauthenticated";

type AuthContextValue = {
  user: AuthUser | null;
  status: AuthStatus;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  validateSession: () => Promise<void>;
};

export const AuthContext = React.createContext<AuthContextValue | undefined>(
  undefined,
);

const normalizeUser = (user: ApiUser): AuthUser => ({
  id: String(user.id),
  email: user.email,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<AuthUser | null>(null);
  const [status, setStatus] = React.useState<AuthStatus>("checking");
  const hasRunInitialValidationRef = React.useRef<boolean>(false);

  const markUnauthenticated = React.useCallback(() => {
    setUser(null);
    setStatus("unauthenticated");
  }, []);

  // Validates the current browser session by asking the API to verify the
  // HTTP-only auth cookie. This runs on app boot and can also be called
  // manually after sensitive actions if needed.
  const validateSession = React.useCallback(async () => {
    setStatus("checking");

    try {
      const { data } = await api.get<ValidateResponse>("/auth/validate");
      setUser(normalizeUser(data.user));
      setStatus("authenticated");
    } catch {
      markUnauthenticated();
    }
  }, [markUnauthenticated]);

  // React StrictMode intentionally re-runs effects in development.
  // The ref guard keeps bootstrap session validation as a single request.
  React.useEffect(() => {
    if (hasRunInitialValidationRef.current) {
      return;
    }

    hasRunInitialValidationRef.current = true;
    void validateSession();
  }, [validateSession]);

  // The Axios response interceptor dispatches this event when a request gets
  // a 401/403. Listening here gives us one global place to invalidate auth
  // state so protected routes react immediately.
  React.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleUnauthorized = () => {
      markUnauthenticated();
    };

    window.addEventListener(AUTH_UNAUTHORIZED_EVENT, handleUnauthorized);

    return () => {
      window.removeEventListener(AUTH_UNAUTHORIZED_EVENT, handleUnauthorized);
    };
  }, [markUnauthenticated]);

  const login = React.useCallback(async (credentials: LoginCredentials) => {
    const { data } = await api.post<AuthMutationResponse>(
      "/auth/login",
      credentials,
    );

    setUser(normalizeUser(data.user));
    setStatus("authenticated");
  }, []);

  const register = React.useCallback(
    async (credentials: RegisterCredentials) => {
      const { data } = await api.post<AuthMutationResponse>(
        "/auth/register",
        credentials,
      );

      setUser(normalizeUser(data.user));
      setStatus("authenticated");
    },
    [],
  );

  // Logout clears the server cookie and immediately updates local state.
  // `finally` guarantees the UI is reset even if the network request fails.
  const logout = React.useCallback(async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      markUnauthenticated();
    }
  }, [markUnauthenticated]);

  const value = React.useMemo<AuthContextValue>(
    () => ({
      user,
      status,
      isAuthenticated: status === "authenticated" && user !== null,
      login,
      register,
      logout,
      validateSession,
    }),
    [user, status, login, register, logout, validateSession],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
