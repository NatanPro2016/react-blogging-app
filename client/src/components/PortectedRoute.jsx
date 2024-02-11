import React, { useContext, useEffect } from "react";
import { LogedIn } from "../context/IsLogedIn";
import Loading from "./Loading";

const PortectedRoute = ({ children }) => {
  const { isLogedIn } = useContext(LogedIn);
  useEffect(() => {
    if (isLogedIn === false) {
      window.location = "/login";
    }
  }, [isLogedIn]);
  if (isLogedIn === null) {
    return <Loading />;
  }
  return <>{children}</>;
};

export default PortectedRoute;
