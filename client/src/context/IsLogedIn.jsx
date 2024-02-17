import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const LogedIn = createContext(null);

const IsLogedIn = ({ children }) => {
  const [isLogedIn, setIsLogedIn] = useState(null);
  const [user, setUser] = useState({});
  useEffect(() => {
    axios
      .get("/api/user")
      .then((data) => {
        setIsLogedIn(true);
        setUser(data.data);
      })
      .catch((e) => {
        console.log(e);
        setIsLogedIn(false);
      });
  }, [LogedIn]);
  return (
    <LogedIn.Provider value={{ isLogedIn, setIsLogedIn, user, setUser }}>
      {children}
    </LogedIn.Provider>
  );
};

export default IsLogedIn;
