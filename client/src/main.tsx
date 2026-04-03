import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BASE_URL } from "./configs/appConfig.ts";
import axios from "axios";

axios.defaults.baseURL = BASE_URL;
axios.defaults.timeout = 30000;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
