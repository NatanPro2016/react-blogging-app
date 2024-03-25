import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import IsLogedIn from "./context/IsLogedIn.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <IsLogedIn>
      <App />
    </IsLogedIn>
  </React.StrictMode>
);
