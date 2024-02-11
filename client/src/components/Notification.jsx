import React from "react";
import Loading from "./Loading";

const Notifcation = ({ message, type }) => {
  return (
    <div className={`${type} notification `}>
      {" "}
      {type == "loading" ? <Loading type="mini" /> : " "}
      {message}
    </div>
  );
};

export default Notifcation;
