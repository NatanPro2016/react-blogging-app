import React from "react";
import SideNav from "../components/SideNav";
import RecentUser from "../components/RecentUser";
import UserInfoLogout from "../components/UserInfoLogout";

const LogOut = () => {
  return (
    <section>
      <SideNav log_out password username />
      <UserInfoLogout />
      <RecentUser />
    </section>
  );
};

export default LogOut;
