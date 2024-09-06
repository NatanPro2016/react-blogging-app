import React, { useEffect, useState } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";

const Users = () => {

  
  const { userName } = useParams();
  const [user, setUser] = useState({});
  const [noUser, setNoUser] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    axios({
      url: `/api/user/userName/${userName}`,
      method: "GET",
    })
      .then((data) => {
        setUser(data.data);
      })
      .catch((e) => {
        if (e.response.status === 404) {
          setNoUser(true);
        }
        setError(true);
      });
  }, [userName]);
  console.log(user);
  if (noUser) {
    return <> no user withat userName </>;
  }
  return (
    <div>
      {error && "Something wrong "}
      {user.name}
      {user.userName}
    </div>
  );
};

export default Users;
