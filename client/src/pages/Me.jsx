import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { LogedIn } from "../context/IsLogedIn";
import UserNameInput from "../components/UserNameInput";
import style from "../assets/css/Me.module.css";
import Navgation from "../components/Navgation";
import userIcon from "/img/user.svg";
import UserPosts from "../components/UserPosts";
import AddProfile from "../components/AddProfile";
import Notification from "../components/Notification";

const Me = () => {
  const [notify, setNotify] = useState("");
  const { setIsLogedIn } = useContext(LogedIn);
  const { user } = useContext(LogedIn);
  const handleClick = () => {
    if (confirm("Are you sure to logout")) {
      axios
        .delete("/api/auth/logout")
        .then((res) => {
          console.log("Suceess logout");
          setIsLogedIn(false);
        })
        .catch((e) => console.log(e));
    }
  };
  return (
    <>
      <Navgation />
      <div className={style.user_}>
        <div>
          <Link to={"/"} className={style.goback}>
            <svg
              width="11"
              height="16"
              viewBox="0 0 11 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.423224 6.98779L7.12472 0.408597C7.58791 -0.0461414 8.33007 -0.0393067 8.77992 0.42384L9.87323 1.53747C10.328 2.00066 10.3211 2.74282 9.85799 3.19267L5.10781 7.85616L9.77129 12.6063C10.226 13.0695 10.2192 13.8117 9.75605 14.2615L8.64721 15.3647C8.18402 15.8194 7.44187 15.8126 6.99201 15.3494L0.412819 8.64792C-0.0468019 8.18468 -0.0399672 7.44253 0.423224 6.98779Z"
                fill="black"
              />
            </svg>
            goback
          </Link>
        </div>
        <div className={style.container}>
          <div className={style.user}>
            <div className={style.profile}>
              {user.profile ? (
                <img
                  src={user.profile}
                  alt={user.name}
                  className={style.user_profile}
                />
              ) : (
                <img src={userIcon} alt="" />
              )}
              <div className={style.add}>
                <AddProfile setNotify={setNotify} />
              </div>
            </div>
            <p>{user.name}</p>
            {user.date ? <p>{user.date.substring(0, 10)}</p> : "Loading .."}
          </div>
          <UserPosts user={user._id} />
        </div>

        <button className={style.logout} onClick={handleClick}>
          <svg
            width="29"
            height="22"
            viewBox="0 0 29 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M28.5986 11.9732L18.9315 21.5966C18.0684 22.4558 16.5723 21.8544 16.5723 20.6228V15.1237H8.74647C7.98115 15.1237 7.36544 14.5108 7.36544 13.7489V8.24985C7.36544 7.488 7.98115 6.87508 8.74647 6.87508H16.5723V1.37599C16.5723 0.150152 18.0626 -0.457039 18.9315 0.402193L28.5986 10.0256C29.1338 10.564 29.1338 11.4347 28.5986 11.9732ZM11.0482 21.3102V19.0189C11.0482 18.6408 10.7374 18.3315 10.3577 18.3315H5.52408C4.50558 18.3315 3.68272 17.5124 3.68272 16.4985V5.50031C3.68272 4.48641 4.50558 3.66728 5.52408 3.66728H10.3577C10.7374 3.66728 11.0482 3.35795 11.0482 2.97989V0.688604C11.0482 0.310542 10.7374 0.00121831 10.3577 0.00121831H5.52408C2.47433 0.00121831 0 2.46435 0 5.50031V16.4985C0 19.5344 2.47433 21.9976 5.52408 21.9976H10.3577C10.7374 21.9976 11.0482 21.6882 11.0482 21.3102Z"
              fill="#1E1E1E"
            />
          </svg>
        </button>

        {/* {user.name}
        <UserNameInput user={user} /> */}
        {notify == "success" && (
          <Notification message={"Profile Added Successfully "} />
        )}
      </div>
    </>
  );
};

export default Me;
