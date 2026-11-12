
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import I18nProvider from "./i18n/I18nProvider";
import { AuthProvider } from "./context/AuthContext";

import "./index.css";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <I18nProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </I18nProvider>
  </React.StrictMode>
);
