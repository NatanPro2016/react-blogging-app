import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const LogedIn = createContext(null);

const IsLogedIn = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [isLogedIn, setIsLogedIn] = useState(null);
  const [user, setUser] = useState({});
  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/user")
      .then((data) => {
        setIsLogedIn(true);
        setUser(data.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLogedIn(false);
        setLoading(false);
      });
  }, [LogedIn]);
  return (
    <LogedIn.Provider
      value={{ isLogedIn, setIsLogedIn, user, setUser, loading }}
    >
      {children}
    </LogedIn.Provider>
  );
};

export default IsLogedIn;
