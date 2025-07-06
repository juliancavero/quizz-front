import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MainProvider from "./providers";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MainProvider />
  </StrictMode>
);
