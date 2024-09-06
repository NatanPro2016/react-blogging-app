import React from "react";
import styles from "../assets/css/ResultUsers.module.css";

import usericon from "/img/user.svg";
import { Link } from "react-router-dom";

const ResultUsers = ({ user }) => {
  return (
    <Link className={styles.user} to={`/user/id/${user._id}`}>
      <img src={user.profile ? user.profile : usericon} alt="" />

      <div className={styles.details}>
        <p> {user.name}</p>
        <p> {user.date.substring(0, 10)}</p>
      </div>
    </Link>
  );
};

export default ResultUsers;
