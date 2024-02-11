import React, { useCallback, useEffect, useRef, useState } from "react";

import usePostSearch from "../hooks/usePostSearch";
import { Link } from "react-router-dom";
import Post from "./Post";
import style from "../assets/css/Posts.module.css";

const Posts = ({ query }) => {
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
  const handleChange = (e) => {
    setQuery(e.target.value);
    setPageNmber(0);
  };
  return (
    <div className={style.posts}>
      {/* <input type="text" onChange={handleChange} value={query} /> */}
      {posts.map((post, index) => {
        if (posts.length === index + 1) {
          return <Post post={post} key={post._id} ref_={lastPost} />;
        } else {
          return <Post post={post} key={post._id} />;
        }
      })}
      {loading && "loading"}
      <div>{error && "Error"}</div>
      <Link to={"/createPost"} className={style.create}></Link>
    </div>
  );
};

export default Posts;
