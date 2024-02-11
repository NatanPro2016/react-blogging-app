import React, { useState } from "react";
import axios from "axios";

const UserNameInput = ({ user }) => {
  const [userName, setUserName] = useState("");
  const [error, serError] = useState("");

  const [available, setAvailable] = useState(null);
  const handleChange = (e) => {
    setUserName(e.target.value);
    axios({
      url: "/api/auth/checkUserName",
      method: "GET",
      params: { userName: e.target.value },
    })
      .then(() => {
        setAvailable(true);
        serError("");
      })

      .catch((e) => {
        setAvailable(false);

        if (e.response.status == 400) {
          serError(e.response.data);
        }
        console.log(e);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/user/edit", { userName })
      .then((data) => {
        console.log(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div>
      {user.name}
      <form method="POST" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add UserName"
          onChange={handleChange}
          value={userName}
        />
        {available && "That username is available "}
        {error}
        <input type="submit" value={"change "} />
      </form>
    </div>
  );
};

export default UserNameInput;
