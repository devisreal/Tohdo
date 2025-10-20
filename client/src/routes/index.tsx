import { HomePage } from "@/pages";
import { LoginPage, RegisterPage } from "@/pages/auth";
import { Route, Routes } from "react-router-dom";

export function AppRoutes() {
  return (
    <Routes>
      <Route>
        <Route index path="/" element={<HomePage />} />
        <Route path="/auth">
          <Route index path="sign-in/" element={<LoginPage />} />
          <Route path="sign-up/" element={<RegisterPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
