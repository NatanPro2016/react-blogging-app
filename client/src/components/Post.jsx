import React from "react";
import { Link } from "react-router-dom";
import style from "../assets/css/Post.module.css";
import user from "/img/user.svg";

const Post = ({ post, ref_ }) => {
  return (
    <div ref={ref_} className={style.post}>
      <div className={style.user}>
        <div>
          {post.user.profile ? (
            <img
              className={style.userImg}
              src={post.user.profile}
              alt="user_profile"
            />
          ) : (
            <img className={style.userImg} src={user} alt="user-img" />
          )}
        </div>
        <div>
          <p className={style.bold}> {post.user.name}</p>
          <p> {post.user.date.substring(0, 10)}</p>
        </div>
        <Link to={`/user/id/${post.user._id}`} className={style.gotouser}>
          <svg
            width="11"
            height="16"
            viewBox="0 0 11 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.74365 8.64502L3.10303 15.2856C2.64404 15.7446 1.90186 15.7446 1.44775 15.2856L0.344238 14.1821C-0.114746 13.7231 -0.114746 12.981 0.344238 12.5269L5.05127 7.81982L0.344238 3.11279C-0.114746 2.65381 -0.114746 1.91162 0.344238 1.45752L1.44287 0.344238C1.90186 -0.114746 2.64404 -0.114746 3.09814 0.344238L9.73877 6.98486C10.2026 7.44385 10.2026 8.18604 9.74365 8.64502Z"
              fill="black"
            />
          </svg>
        </Link>
      </div>
      <Link to={`/posts/post/${post._id}`} className={style.link}>
        <img src={post.img} alt="post-imgae" className={style.post_img} />
        <div className={style.category}>{post.category}</div>
        <p className={style.bold}> {post.title}</p>
        <p>
          {post.des.substring(0, 40)} {post.des.length >= 39 ? "..." : ""}
        </p>
      </Link>
    </div>
  );
};

export default Post;
