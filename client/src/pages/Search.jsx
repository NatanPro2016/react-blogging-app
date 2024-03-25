import React from "react";
import SideNav from "../components/SideNav";
import Result from "../components/Results";
import RecentUser from "../components/RecentUser";

const Search = () => {
  return (
    <section>
      <SideNav search saved />
      <Result />
      <RecentUser />
    </section>
  );
};

export default Search;
