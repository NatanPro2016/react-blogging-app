import React, { useContext } from "react";
import { Link } from "react-router-dom";
import style from "../assets/css/Navgation.module.css";
import logo from "/img/The Social Vibe.png";
import userIcon from "/img/user.svg";
import { LogedIn } from "../context/IsLogedIn";

const Navgation = ({ query, setQuery }) => {
  const { user } = useContext(LogedIn);
  const handleChange = (e) => {
    if (setQuery) {
      setQuery(e.target.value);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <nav className={style.nav}>
      <Link to={"/"}>
        <img src={logo} alt="" />
      </Link>
      <div className={style.search}>
        <form method="POST" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type Category"
            value={query}
            onChange={handleChange}
          />
          <input type="submit" value="Search" />
        </form>
      </div>
      <Link to={"/me"} className={style.user}>
        {user.name}{" "}
        {user.profile ? (
          <img src={user.profile} className={style.user_profile} />
        ) : (
          <img src={userIcon} />
        )}
      </Link>
    </nav>
  );
};

export default Navgation;
