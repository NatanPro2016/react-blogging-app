import React, { useCallback, useEffect, useRef, useState } from "react";

import usePostSearch from "../hooks/usePostSearch";
import { Link } from "react-router-dom";
import Post from "./Post";
import style from "../assets/css/Posts.module.css";
import Categories from "./Categories";
import Search from "./Search";

const Posts = () => {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNmber] = useState(0);
  const { loading, error, posts, hasMore } = usePostSearch(query, pageNumber);

  const observer = useRef();
  const lastPost = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNmber((curr) => curr + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );
  useEffect(() => {
    setPageNmber(0);
  }, [query]);

  return (
    <div className={style.posts}>
      <Search query={query} setQuery={setQuery} />
      <Categories />
      {posts.map((post, index) => {
        if (posts.length === index + 1) {
          return <Post post={post} key={post._id} ref_={lastPost} />;
        } else {
          return <Post post={post} key={post._id} />;
        }
      })}
      {loading && (
        <div className={style.loading}>
          <div className={style.fake_user}>
            <div className={style.user}></div>
          </div>
          <div className={style.fake_img}></div>
          <div className={style.text}></div>
        </div>
      )}
      {error && (
        <div className={style.error}>
          {" "}
          <svg
            width="50"
            height="50"
            viewBox="0 0 100 102"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_323_2)">
              <path
                d="M94.0795 27.6872C82.0912 2.25205 50.742 -6.9971 26.3161 6.00171C24.3964 7.08494 23.559 9.45972 24.621 11.6262C25.683 13.5843 28.0112 14.4384 30.1352 13.3552C50.5378 2.52286 76.577 10.2513 86.6456 31.3327C100.002 59.3093 82.7652 80.6407 68.7959 88.5358C49.7821 99.3056 25.6626 92.1605 14.144 73.808L28.2972 76.8285C30.4211 77.266 32.7494 75.9536 33.1782 73.5788C33.6071 71.4124 32.3205 69.0376 29.9923 68.6001L4.91287 63.3923C0.705738 62.9756 -0.192872 66.8503 0.0317807 68.1627L3.21776 93.952C3.42199 96.1184 5.13752 97.6391 7.26151 97.6391C9.87565 97.6391 11.5095 95.0352 11.3053 92.6604L10.0799 82.1405C21.8027 96.8892 44.8602 109.471 72.8601 96.3476C84.7258 90.0981 111.97 65.5796 94.0795 27.6872Z"
                fill="black"
              />
            </g>
            <defs>
              <clipPath id="clip0_323_2">
                <rect width="100" height="102" fill="white" />
              </clipPath>
            </defs>
          </svg>
          Error
        </div>
      )}
    </div>
  );
};

export default Posts;
