import React from "react";
import PortectedRoute from "../components/PortectedRoute";

const ErrorPage = () => {
  return (
    <PortectedRoute>
      <div>
        Error
        <button
          onClick={() => {
            history.back();
          }}
        >
          Goback
        </button>
        <button
          onClick={() => {
            window.location.reload();
          }}
        >
          Reload
        </button>
      </div>
    </PortectedRoute>
  );
};

export default ErrorPage;
