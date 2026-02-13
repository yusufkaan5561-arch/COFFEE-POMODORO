import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import CoffeePomodoroApp from "./CoffeePomodoroApp";

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
    <React.StrictMode>
      <CoffeePomodoroApp />
    </React.StrictMode>
  );
}
