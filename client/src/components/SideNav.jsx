import React from "react";
import { Link } from "react-router-dom";
import homeicon from "/icons/home.png";
import bookmark from "/icons/bookmark.png";
import plus from "/icons/plus.png";
import user from "/icons/user.png";
import key from "/icons/user.png";
import searchicon from "/icons/search.png";

import style from "../assets/css/SideNav.module.css";
import logo from "/img/The Social Vibe.png";

const SideNav = ({ saved, search, password, username }) => {
  return (
    <div className={style.sidenav}>
      <Link to={"/"} className={style.logo}>
        <img src={logo} alt="" />
      </Link>
      <ul>
        <li>
          <img src={homeicon} />

          <Link to={"/"}> Home</Link>
        </li>
        <li>
          <img src={plus} />
          <Link to={"/createpost"}>Create</Link>
        </li>
        {saved && (
          <li>
            <img src={bookmark} />
            <Link to={"/saved"}> Saved</Link>
          </li>
        )}
        {search && (
          <li>
            <img src={searchicon} />
            <Link to={"/search"}> Search</Link>
          </li>
        )}
        {password && (
          <li>
            <img src={key} />
            <Link to={"/changepassword"}> Password</Link>
          </li>
        )}
        {username && (
          <li>
            <img src={user} />
            <Link to={"/changeusername"}> Username</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default SideNav;
