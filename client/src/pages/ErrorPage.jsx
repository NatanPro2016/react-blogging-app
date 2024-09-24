import React from "react";
import PortectedRoute from "../components/PortectedRoute";

const ErrorPage = () => {
  return (
    <PortectedRoute>
      <div className="error-page">
      <h1> Something went wrong </h1>
        <div className="btns">
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
      </div>
    </PortectedRoute>
  );
};

export default ErrorPage;
