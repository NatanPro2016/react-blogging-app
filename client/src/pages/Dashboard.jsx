import React from "react";
import style from "../assets/css/Dashboard.module.css";

import Posts from "../components/Posts";
import SideNav from "../components/SideNav";
import RecentUser from "../components/RecentUser";
const Dashboard = () => {
  return (
    <section className={style.dashboard}>
      <SideNav search={true} saved={true} />
      <Posts />
      <RecentUser />
    </section>
  );
};

export default Dashboard;
