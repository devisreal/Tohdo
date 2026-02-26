import { LoginPage, RegisterPage } from "@/pages/auth";
import { HomePage } from "@/pages/shared";
import "@/styles/App.css";
import { Route, Routes } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Routes>
      <Route>
        <Route element={<HomePage />} index path="/" />
        <Route path="/auth">
          <Route element={<LoginPage />} index path="sign-in/" />
          <Route element={<RegisterPage />} path="sign-up/" />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
