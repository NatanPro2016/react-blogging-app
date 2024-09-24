import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const LogedIn = createContext(null);

const IsLogedIn = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [isLogedIn, setIsLogedIn] = useState(null);
  const [user, setUser] = useState({});
  useEffect(() => {
    let local = localStorage.getItem("USER");

    if (local._id == undefined) {
      const localUser = JSON.parse(local);

      if (localUser._id == undefined) {
        setLoading(true);
        axios
          .get("/api/user")
          .then((data) => {
            setIsLogedIn(true);
            setUser(data.data);
            setLoading(false);
            localStorage.setItem("USER", JSON.stringify(data.data));
          })
          .catch((e) => {
            console.log(e);
            setIsLogedIn(false);
            setLoading(false);
          });
      } else {
        setUser(localUser);
        setIsLogedIn(true);
      }
    }
  }, []);
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("USER"));
    if (!Object.keys(localUser).length == 0) {
      localStorage.setItem("USER", JSON.stringify(user));
    }
  }, [user]);

  return (
    <LogedIn.Provider
      value={{ isLogedIn, setIsLogedIn, user, setUser, loading }}
    >
      {children}
    </LogedIn.Provider>
  );
};

export default IsLogedIn;
