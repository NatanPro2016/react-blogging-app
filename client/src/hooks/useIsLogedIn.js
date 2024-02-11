import { useEffect, useState } from "react";
import axios from "axios";

const useIsLogedIn = () => {
  const [logedIn, setLogedIn] = useState(false);
  const [user, setUser] = useState({});
  useEffect(() => {
    axios
      .get("/api/user")
      .then((data) => {
        setLogedIn(true);
        setUser(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [logedIn]);

  return { logedIn, setLogedIn, user, setUser };
};

export default useIsLogedIn;
