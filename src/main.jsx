import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { inject } from "@vercel/analytics";

import App from "./App.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";

import "./index.css";
import "remixicon/fonts/remixicon.css";

inject();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar>
        <App />
      </Navbar>
    </BrowserRouter>
  </StrictMode>
);
