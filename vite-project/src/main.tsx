import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { NeonAuthUIProvider } from "@neondatabase/neon-js/auth/react";

import "./index.css";
import App from "./App";
import { authClient } from "./lib/neon";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NeonAuthUIProvider emailOTP authClient={authClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </NeonAuthUIProvider>
  </StrictMode>
);