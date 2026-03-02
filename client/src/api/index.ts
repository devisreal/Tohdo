import axios from "axios";

type ApiErrorPayload = {
  status?: string;
  message?: string;
};

// This custom browser event is emitted when the API returns an auth failure.
// The AuthProvider listens for this event and immediately clears client auth
// state, which keeps route guards and navigation in sync with server reality.
export const AUTH_UNAUTHORIZED_EVENT = "auth:unauthorized";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:600",
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Any 401/403 means the current browser session is no longer trusted by
    // the API (expired/invalid cookie, revoked session, etc). We broadcast a
    // global event so auth state can be reset from one place.
    if (axios.isAxiosError<ApiErrorPayload>(error)) {
      const statusCode = error.response?.status;

      if ((statusCode === 401 || statusCode === 403) && typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent(AUTH_UNAUTHORIZED_EVENT, {
            detail: { statusCode },
          }),
        );
      }
    }

    return Promise.reject(error);
  },
);

// Shared helper so UI components can turn unknown thrown errors into
// user-facing messages consistently.
export const getApiErrorMessage = (
  error: unknown,
  fallbackMessage = "An unexpected error occurred. Please try again.",
) => {
  if (axios.isAxiosError<ApiErrorPayload>(error)) {
    return error.response?.data?.message ?? error.message ?? fallbackMessage;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallbackMessage;
};

export default api;
