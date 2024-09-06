import React, { useContext, useEffect } from "react";
import { LogedIn } from "../context/IsLogedIn";
import Loading from "./Loading";

const PortectedRoute = ({ children }) => {
  const { isLogedIn, loading } = useContext(LogedIn);
  useEffect(() => {
    if (isLogedIn === false) {
      window.location = "/login";
    }
  }, [isLogedIn]);
  if (isLogedIn === null && loading) {
    return <Loading />;
  }
  return <>{children}</>;
};

export default PortectedRoute;
