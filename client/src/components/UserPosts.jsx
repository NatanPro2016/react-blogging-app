import React, { useCallback, useRef, useState } from "react";
import usePost from "../hooks/usePost";

import style from "../assets/css/UserPosts.module.css";
import { Link } from "react-router-dom";

const UserPosts = ({ user }) => {
  const [pageNumber, setPageNmber] = useState(0);
  const { loading, error, posts, hasMore } = usePost(user, pageNumber);

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
  return (
    <div className={style.userPosts}>
      {posts.map((post, index) => {
        if (posts.length === index + 1) {
          return (
            <Link
              key={post._id}
              to={`/posts/post/${post._id}`}
              className={style.link}
              ref={lastPost}
            >
              <img src={post.img} />
              <p className={style.title}>{post.title}</p>
            </Link>
          );
        }
        return (
          <Link
            key={post._id}
            to={`/posts/post/${post._id}`}
            className={style.link}
          >
            <img src={post.img} />
            <p className={style.title}>{post.title}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default UserPosts;
