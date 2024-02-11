import React from "react";

const Loading = ({ type }) => {
  return (
    <div className={`container ${type}`}>
      <span className="loader"></span>
    </div>
  );
};

export default Loading;
