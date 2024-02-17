import React, { useCallback, useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";
import Post from "./Post";
import style from "../assets/css/Posts.module.css";
import Categories from "./Categories";
import Search from "./Search";
import useSavedPost from "../hooks/useSavedPost";

const SavedPost = () => {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNmber] = useState(0);
  const { loading, error, posts, hasMore } = useSavedPost(query, pageNumber);

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
      {loading && "loading"}
      <div>{error && "Error"}</div>
      <Link to={"/createPost"} className={style.create}></Link>
    </div>
  );
};

export default SavedPost;
