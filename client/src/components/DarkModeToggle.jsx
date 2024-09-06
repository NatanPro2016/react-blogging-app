import React, { useContext, useEffect, useState } from "react";
import styles from "../assets/css/DarkModeToggle.module.css";
import axios from "axios";
import { LogedIn } from "../context/IsLogedIn";
const DarkModeToggle = () => {
  const { user, setUser } = useContext(LogedIn);
  const handleChangeMode = () => {
    axios
      .post("/api/user/edit", { darkmode: !user.darkmode })
      .then(() => {
        console.log("changed in server ");
      })
      .catch((e) => console.log(e));

    setUser({ ...user, darkmode: !user.darkmode });
  };
  useEffect(() => {
    if (user.darkmode === false) {
      document.body.setAttribute("data-theme", "light");
    } else if (user.darkmode === true) {
      document.body.removeAttribute("data-theme");
    }
  }, [user.darkmode]);

  return (
    <div className={styles.toggle}>
      <input
        type="checkbox"
        id="darkmode-toggle"
        onChange={handleChangeMode}
        checked={user.darkmode}
      />
      <label className={styles.label} htmlFor="darkmode-toggle">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.sun}
        >
          <path
            d="M11 1C11 0.447715 11.4477 0 12 0C12.5523 0 13 0.447715 13 1V3C13 3.55228 12.5523 4 12 4C11.4477 4 11 3.55228 11 3V1Z"
            fill="#0F0F0F"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12ZM8.06167 12C8.06167 14.1751 9.82492 15.9383 12 15.9383C14.1751 15.9383 15.9383 14.1751 15.9383 12C15.9383 9.82492 14.1751 8.06167 12 8.06167C9.82492 8.06167 8.06167 9.82492 8.06167 12Z"
            fill="#0F0F0F"
          />
          <path
            d="M20.4853 3.51472C20.0947 3.12419 19.4616 3.12419 19.0711 3.51472L17.6568 4.92893C17.2663 5.31946 17.2663 5.95262 17.6568 6.34315C18.0474 6.73367 18.6805 6.73367 19.0711 6.34315L20.4853 4.92893C20.8758 4.53841 20.8758 3.90524 20.4853 3.51472Z"
            fill="#0F0F0F"
          />
          <path
            d="M1 13C0.447715 13 0 12.5523 0 12C0 11.4477 0.447715 11 1 11H3C3.55228 11 4 11.4477 4 12C4 12.5523 3.55228 13 3 13H1Z"
            fill="#0F0F0F"
          />
          <path
            d="M3.51472 3.51472C3.1242 3.90524 3.1242 4.53841 3.51472 4.92893L4.92894 6.34315C5.31946 6.73367 5.95263 6.73367 6.34315 6.34315C6.73368 5.95262 6.73368 5.31946 6.34315 4.92893L4.92894 3.51472C4.53841 3.12419 3.90525 3.12419 3.51472 3.51472Z"
            fill="#0F0F0F"
          />
          <path
            d="M11 21C11 20.4477 11.4477 20 12 20C12.5523 20 13 20.4477 13 21V23C13 23.5523 12.5523 24 12 24C11.4477 24 11 23.5523 11 23V21Z"
            fill="#0F0F0F"
          />
          <path
            d="M6.34315 17.6569C5.95263 17.2663 5.31946 17.2663 4.92894 17.6569L3.51473 19.0711C3.1242 19.4616 3.1242 20.0948 3.51473 20.4853C3.90525 20.8758 4.53842 20.8758 4.92894 20.4853L6.34315 19.0711C6.73368 18.6805 6.73368 18.0474 6.34315 17.6569Z"
            fill="#0F0F0F"
          />
          <path
            d="M21 13C20.4477 13 20 12.5523 20 12C20 11.4477 20.4477 11 21 11H23C23.5523 11 24 11.4477 24 12C24 12.5523 23.5523 13 23 13H21Z"
            fill="#0F0F0F"
          />
          <path
            d="M17.6568 17.6569C17.2663 18.0474 17.2663 18.6805 17.6568 19.0711L19.0711 20.4853C19.4616 20.8758 20.0947 20.8758 20.4853 20.4853C20.8758 20.0948 20.8758 19.4616 20.4853 19.0711L19.0711 17.6569C18.6805 17.2663 18.0474 17.2663 17.6568 17.6569Z"
            fill="#0F0F0F"
          />
        </svg>

        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.moon}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.39703 11.6315C3.39703 16.602 7.42647 20.6315 12.397 20.6315C15.6858 20.6315 18.5656 18.8664 20.1358 16.23C16.7285 17.3289 12.6922 16.7548 9.98282 14.0455C7.25201 11.3146 6.72603 7.28415 7.86703 3.89293C5.20697 5.47927 3.39703 8.38932 3.39703 11.6315ZM21.187 13.5851C22.0125 13.1021 23.255 13.6488 23 14.5706C21.7144 19.2187 17.4543 22.6315 12.397 22.6315C6.3219 22.6315 1.39703 17.7066 1.39703 11.6315C1.39703 6.58874 4.93533 2.25845 9.61528 0.999986C10.5393 0.751502 11.0645 1.99378 10.5641 2.80935C8.70026 5.84656 8.83194 10.0661 11.397 12.6312C13.9319 15.1662 18.1365 15.3702 21.187 13.5851Z"
            fill="#0F0F0F"
          />
        </svg>
      </label>
    </div>
  );
};

export default DarkModeToggle;
