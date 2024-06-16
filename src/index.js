import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { SalesProvider } from "./context/SalesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SalesProvider>
        <App />
      </SalesProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
