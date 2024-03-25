import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useFormAction } from "react-router-dom";

import { LogedIn } from "../context/IsLogedIn";
import Loading from "../components/Loading";
import google from "/img/google.png";
import FormCss from "../assets/css/Form.module.css";

const Login = () => {
  useEffect(() => {
    const dark = window.matchMedia("(prefers-color-scheme : dark)").matches;

    if (dark === false) {
      document.body.setAttribute("data-theme", "light");
    }
  }, []);
  const { isLogedIn, setIsLogedIn } = useContext(LogedIn);
  const [loginInfo, setLoginInfo] = useState({
    userName: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    axios
      .post("/api/auth/login", loginInfo)
      .then(() => {
        setIsLogedIn(true);
        setIsLoading(false);
      })
      .catch((e) => {
        setError(e.response.data);
        console.log(error);
        setIsLoading(false);
      });
  };
  const handleChange = (e) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value,
    });
  };

  if (isLogedIn === null) {
    return <Loading />;
  } else if (isLogedIn === true) {
    window.location = "/";
  } else {
    return (
      <section className={FormCss.login}>
        <div className={FormCss.wrapper}>
          <nav className={FormCss.nav}>
            <ul className={FormCss.ul}>
              <li className={FormCss.active}>
                <Link className={FormCss.link} to={"/login"}>
                  Login
                </Link>
              </li>
              <div className={FormCss.bar}></div>
              <li>
                <Link className={FormCss.link} to={"/register"}>
                  Register
                </Link>
              </li>
            </ul>
          </nav>
          <a href="/api/auth/google" className={FormCss.google}>
            <img src={google} alt="google-logo" />
            contine With Google
          </a>
          <div className={FormCss.line}></div>
          <p className={FormCss.p}> or</p>

          <form method="post" onSubmit={handleSubmit} className={FormCss.form}>
            {error}
            <input
              type="text"
              name="userName"
              placeholder=" User Name"
              className={FormCss.input}
              value={loginInfo.name}
              onChange={handleChange}
            />
            <input
              value={loginInfo.password}
              type="password"
              name="password"
              placeholder=" Your Passowrd"
              className={FormCss.input}
              onChange={handleChange}
            />

            <input
              type="submit"
              value={isLoading ? "loading ...." : "login"}
              className={FormCss.input}
              disabled={isLoading}
            />
          </form>
          <Link className={FormCss.link} to={"/register"}>
            I don’ t have an account ? Register
          </Link>
        </div>
      </section>
    );
  }
};

export default Login;
