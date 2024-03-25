import React from "react";
import style from "../assets/css/Navgation.module.css";

const Search = ({ query, setQuery }) => {
  const handleChange = (e) => {
    if (setQuery) {
      setQuery(e.target.value);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className={style.search}>
      <form method="POST" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type Category"
          value={query}
          onChange={handleChange}
        />
        <input type="submit" value="Search" />
      </form>
    </div>
  );
};

export default Search;
