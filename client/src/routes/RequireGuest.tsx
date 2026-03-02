import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export default function RequireGuest() {
  const { isAuthenticated, status } = useAuth();

  // Guest-only routes should wait for session bootstrap, otherwise a logged-in
  // user can momentarily see login/register before being redirected.
  if (status === "checking") {
    return (
      <div className="min-h-dvh flex items-center justify-center text-sm text-muted-foreground">
        Checking your session...
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/tohdos" replace />;
  }

  return <Outlet />;
}
