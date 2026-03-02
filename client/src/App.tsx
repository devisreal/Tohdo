import { LoginPage, RegisterPage } from "@/pages/auth";
import {
  ArchivePage,
  ChangePasswordPage,
  EditProfilePage,
  HomePage,
  ProfilePage,
  TohdosPage,
} from "@/pages/shared";
import RequireAuth from "@/routes/RequireAuth";
import RequireGuest from "@/routes/RequireGuest";
import "@/styles/App.css";
import { Navigate, Route, Routes } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route element={<RequireGuest />}>
        <Route path="/auth">
          <Route path="sign-in" element={<LoginPage />} />
          <Route path="sign-up" element={<RegisterPage />} />
        </Route>
      </Route>

      <Route element={<RequireAuth />}>
        <Route path="/tohdos" element={<TohdosPage />} />
        <Route path="/archive" element={<ArchivePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route
          path="/profile/change-password"
          element={<ChangePasswordPage />}
        />
        <Route path="/profile/edit" element={<EditProfilePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
