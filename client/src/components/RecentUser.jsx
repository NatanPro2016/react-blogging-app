import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LogedIn } from "../context/IsLogedIn";
import userIcon from "/img/user.svg";
import style from "../assets/css/Navgation.module.css";

const RecentUser = () => {
  const { user } = useContext(LogedIn);

  return (
    <div className={style.recentuser}>
      <Link to={"/me"} className={style.user}>
        {user.name}
        {user.profile ? (
          <img src={user.profile} className={style.user_profile} />
        ) : (
          <img src={userIcon} />
        )}
      </Link>
    </div>
  );
};

export default RecentUser;
