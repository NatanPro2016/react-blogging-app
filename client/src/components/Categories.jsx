import React, { useState } from "react";
import style from "../assets/css/Categories.module.css";
import axios from "axios";

export const Categories = () => {
  const [categories, setCategories] = useState([]);
  useState(() => {
    axios
      .get("/api/posts/categories")
      .then((data) => {
        setCategories(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  });
  const handleClick = (e) => {
    e.target.classList.toggle(style.active);
  };
  return (
    <div className={style.categories}>
      {categories.map((category) => {
        return (
          <p key={category} onClick={handleClick}>
            {category}
          </p>
        );
      })}
    </div>
  );
};
export default Categories;
