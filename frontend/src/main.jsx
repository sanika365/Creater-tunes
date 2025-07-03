import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css'; // Or correct CSS path


import { SidebarProvider } from "./Context/SidebarContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
   <SidebarProvider>
  <App />
</SidebarProvider>

  </React.StrictMode>
);
