import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./auth/use_auth_client";
import "@near-wallet-selector/modal-ui/styles.css";
import NearProvider from "./wallets/NearProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <NearProvider>ß
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
    </NearProvider>
  </React.StrictMode>
);
