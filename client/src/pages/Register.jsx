import React, {
  Profiler,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

import { LogedIn } from "../context/IsLogedIn";
import google from "/img/google.png";
import Loading from "../components/Loading";
import FormCss from "../assets/css/Form.module.css";

const Register = () => {
  useEffect(() => {
    const dark = window.matchMedia("(prefers-color-scheme : dark)").matches;

    if (dark === false) {
      document.body.setAttribute("data-theme", "light");
    }
  }, []);
  const { isLogedIn, setIsLogedIn } = useContext(LogedIn);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });
  const [focused, setFocused] = useState({
    name: false,
    userName: false,
    password: false,
    confirmPassword: false,
  });
  const [userNameError, setUserNameError] = useState("");

  const [available, setAvailable] = useState(null);
  const userNameRef = useRef();
  const handleChangeUserName = (e) => {
    setRegisterInfo({ ...registerInfo, userName: e.target.value });
    if (e.target.value.length >= 3) {
      axios({
        url: "/api/auth/checkUserName",
        method: "GET",
        params: { userName: e.target.value },
      })
        .then(() => {
          setAvailable(true);
          setUserNameError("");

          userNameRef.current.classList.remove(FormCss.invalid);
        })

        .catch((e) => {
          setAvailable(false);

          userNameRef.current.classList.add(FormCss.invalid);

          if (e.response.status == 400) {
            setUserNameError(e.response.data);
          }
          console.log(e);
        });
    } else {
      setAvailable(null);
    }
  };
  const handleFocuse = (e) => {
    setFocused({ ...focused, [e.target.name]: true });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post("/api/auth/register", {
        name: registerInfo.name,
        userName: registerInfo.userName,
        password: registerInfo.password,
        darkmode: window.matchMedia("(prefers-color-scheme : dark)").matches,
      })
      .then(() => {
        setIsLogedIn(false);
        window.location = "/";
      })
      .catch((e) => {
        setError(e.response.data);
        setIsLoading(false);
      });
    console.log(registerInfo);
  };
  const handleChange = (e) => {
    setRegisterInfo({
      ...registerInfo,
      [e.target.name]: e.target.value,
    });
  };
  if (isLogedIn === null) {
    return <Loading />;
  } else if (isLogedIn === true) {
    window.location = "/";
  } else {
    return (
      <section className={FormCss.register}>
        <div className={FormCss.wrapper}>
          <nav className={FormCss.nav}>
            <ul className={FormCss.ul}>
              <li>
                <Link className={FormCss.link} to={"/login"}>
                  Login
                </Link>
              </li>
              <div className={FormCss.bar}></div>
              <li className={FormCss.active}>
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
              name="name"
              placeholder=" name"
              value={registerInfo.name}
              onChange={handleChange}
              required
              pattern="^[A-Za-z0-9]{3,20}$"
              className={FormCss.input}
              focused={focused.name.toString()}
              onBlur={handleFocuse}
            />
            <span className={FormCss.nameError}>
              Name shold be 3 - 20 caracter , Name canot be empty, spacal
              caracters not allowed
            </span>
            <input
              type="text"
              name="userName"
              placeholder=" User Name"
              value={registerInfo.userName}
              onChange={handleChangeUserName}
              required
              pattern="^[A-Za-z0-9]{3,20}$"
              className={FormCss.input}
              focused={focused.userName.toString()}
              onBlur={handleFocuse}
              ref={userNameRef}
            />
            {available && (
              <p className={FormCss.success}>That username is available</p>
            )}
            {available === false && (
              <p className={FormCss.error}>That username is taken</p>
            )}
            <span className={FormCss.userNameError}>
              {error}
              Name shold be 3 - 20 caracter, spacal character not allowed ,
              UserName canot be empty
            </span>
            <input
              value={registerInfo.password}
              type="password"
              name="password"
              placeholder=" Your Passowrd"
              onChange={handleChange}
              pattern="^{6,}$"
              required
              className={FormCss.input}
              focused={focused.password.toString()}
              onBlur={handleFocuse}
            />
            <span className={FormCss.passwordError}>
              Password should be 6 - 20 characters and include at least 1
              letter, 1 number and 1 spical character
            </span>
            <input
              value={registerInfo.confirmPassword}
              type="password"
              name="confirmPassword"
              placeholder=" confirm Passowrd"
              onChange={handleChange}
              pattern={registerInfo.password}
              required
              focused={focused.confirmPassword.toString()}
              onBlur={handleFocuse}
              onFocus={handleFocuse}
              className={FormCss.input}
            />
            <span className={FormCss.confirmPasswordError}>
              Password don't much
            </span>
            <input
              type="submit"
              value={isLoading ? "Loading" : "Register "}
              className={FormCss.input}
              disabled={isLoading}
            />
          </form>
          <Link className={FormCss.link} to={"/login"}>
            I already have an account Login
          </Link>
        </div>
      </section>
    );
  }
};

export default Register;
