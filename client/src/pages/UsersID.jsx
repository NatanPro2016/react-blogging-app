import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import style from "../assets/css/Me.module.css";
import userIcon from "/img/user.svg";
import axios from "axios";
import Navgation from "../components/Navgation";

import UserPosts from "../components/UserPosts";

const UsersID = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [noUser, setNoUser] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    axios({
      url: `/api/user/id/${id}`,
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
        console.log(e);
      });
  }, [id]);

  if (noUser) {
    return <> no user withat id </>;
  }
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
                <img src={user.profile} alt={user.name} />
              ) : (
                <img src={userIcon} alt="" />
              )}
            </div>
            <p>{user.name}</p>
            {user.date ? <p>{user.date.substring(0, 10)}</p> : "Loading .."}
          </div>
          <UserPosts user={user._id} />
        </div>

        <Link to={"/createPost"} className={style.create}>
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.3125 8.59375H13.2812V1.5625C13.2812 0.699707 12.5815 0 11.7188 0H10.1562C9.29346 0 8.59375 0.699707 8.59375 1.5625V8.59375H1.5625C0.699707 8.59375 0 9.29346 0 10.1562V11.7188C0 12.5815 0.699707 13.2812 1.5625 13.2812H8.59375V20.3125C8.59375 21.1753 9.29346 21.875 10.1562 21.875H11.7188C12.5815 21.875 13.2812 21.1753 13.2812 20.3125V13.2812H20.3125C21.1753 13.2812 21.875 12.5815 21.875 11.7188V10.1562C21.875 9.29346 21.1753 8.59375 20.3125 8.59375Z"
              fill="black"
            />
          </svg>
        </Link>

        {/* {user.name}
        <UserNameInput user={user} /> */}
      </div>
    </>
  );
};

export default UsersID;
