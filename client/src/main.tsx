import { ThemeProvider } from "@/components/theme-provider.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Toaster
          position="bottom-center"
          richColors
          toastOptions={{
            style: {
              fontFamily: "var(--font-sans)",
              fontSize: ".9rem",
            },
          }}
        />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
