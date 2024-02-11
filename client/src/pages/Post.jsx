import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import style from "../assets/css/Post.module.css";
import Navgation from "../components/Navgation";
import user from "/img/user.svg";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [noPost, setNoPost] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    axios({
      url: `/api/posts/id/${id}`,
      method: "GET",
    })
      .then((data) => {
        setPost(data.data);
      })
      .catch((e) => {
        if (e.response.status === 404) {
          setNoPost(true);
        }
        setError(true);
        console.log(e);
      });
  }, [id]);

  if (noPost) {
    return <> no post withat id </>;
  }
  return (
    <>
      <Navgation />
      {error && "Something went wrong "}
      <div className={style.container}>
        <div>
          <Link to={"/"} className={style.goback}>
            <svg
              width="11"
              height="16"
              viewBox="0 0 11 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.423224 6.98779L7.12472 0.408597C7.58791 -0.0461414 8.33007 -0.0393067 8.77992 0.42384L9.87323 1.53747C10.328 2.00066 10.3211 2.74282 9.85799 3.19267L5.10781 7.85616L9.77129 12.6063C10.226 13.0695 10.2192 13.8117 9.75605 14.2615L8.64721 15.3647C8.18402 15.8194 7.44187 15.8126 6.99201 15.3494L0.412819 8.64792C-0.0468019 8.18468 -0.0399672 7.44253 0.423224 6.98779Z"
                fill="black"
              />
            </svg>
            goback
          </Link>
        </div>

        <div className={style.post_big}>
          {post.user ? (
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
          ) : (
            "Loading ..."
          )}
          <div to={`/posts/post/${post._id}`} className={style.link}>
            <img src={post.img} alt="post-imgae" className={style.post_img} />
            <div className={style.category}>{post.category}</div>
            <p className={style.bold}> {post.title}</p>
            <p>{post.des}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
