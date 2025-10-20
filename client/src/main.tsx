import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster
      position="bottom-center"
      // closeButton
      richColors
      toastOptions={{
        style: {
          fontFamily: "var(--font-sans)",
          fontSize: ".9rem",
        },
      }}
    />
    <App />
  </StrictMode>,
);
