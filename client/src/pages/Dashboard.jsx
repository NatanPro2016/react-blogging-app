import React, { useContext, useState } from "react";
import Loading from "../components/Loading";

import { LogedIn } from "../context/IsLogedIn";
import Navgation from "../components/Navgation";
import { Categories } from "../components/Categories";
import Posts from "../components/Posts";
const Dashboard = () => {
  const { isLogedIn, setIsLogedIn } = useContext(LogedIn);
  const [query, setQuery] = useState("");

  if (isLogedIn === false) {
    window.location = "/login";
  }
  if (isLogedIn === null) {
    return <Loading />;
  } else if (isLogedIn === true) {
    return (
      <section>
        <Navgation setQuery={setQuery} query={query} />
        <Categories />
        <Posts query={query} />
      </section>
    );
  }
};

export default Dashboard;
