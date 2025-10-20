import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { AppRoutes } from "@/routes";
import "@/styles/App.css";
import { BrowserRouter as Router } from "react-router-dom";

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="px-10 h-[100vh] mt-28">
        <Router>
          <Navbar />
          <AppRoutes />
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;
