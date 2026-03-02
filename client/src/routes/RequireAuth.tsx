import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireAuth() {
  const { isAuthenticated, status } = useAuth();
  const location = useLocation();

  // Prevent redirect flicker while the app is still validating the cookie
  // during initial boot.
  if (status === "checking") {
    return (
      <div className="min-h-dvh flex items-center justify-center text-sm text-muted-foreground">
        Checking your session...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/sign-in" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
