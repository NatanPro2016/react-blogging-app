import React, { useContext, useEffect } from "react";
import style from "../assets/css/Dashboard.module.css";

import Posts from "../components/Posts";
import SideNav from "../components/SideNav";
import RecentUser from "../components/RecentUser";
import { LogedIn } from "../context/IsLogedIn";
const Dashboard = () => {
  const { user } = useContext(LogedIn);
  useEffect(() => {
    if (user.darkmode === false) {
      document.body.setAttribute("data-theme", "light");
      console.log(user.darkmode);
    }
  }, [user]);
  return (
    <section className={style.dashboard}>
      <SideNav search={true} saved={true} />
      <Posts />
      <RecentUser />
    </section>
  );
};

export default Dashboard;
