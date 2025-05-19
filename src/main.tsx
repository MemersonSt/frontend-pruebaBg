import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";


import { AuthProvider } from "./context/AuthContext.tsx";
import { SpinnerProvider } from "./context/SpinnerContext.tsx";
import { SnackbarProvider } from "./context/SnackbarContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SpinnerProvider>
      <SnackbarProvider>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </SnackbarProvider>
    </SpinnerProvider>
  </StrictMode>
);
