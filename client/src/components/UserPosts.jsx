import React, { useCallback, useEffect, useRef, useState } from "react";
import usePost from "../hooks/usePost";
import Swal from "sweetalert2";

import style from "../assets/css/UserPosts.module.css";
import delete_icon from "/icons/delete.png";
import { Link } from "react-router-dom";
import axios from "axios";
import Notifcation from "./Notification";

const UserPosts = ({ user, with_delete }) => {
  const [pageNumber, setPageNmber] = useState(0);
  const { loading, error, posts, hasMore } = usePost(user, pageNumber);
  const [message, setMessage] = useState("");

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

  const handelDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#338afc",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post("/api/posts/delete", { id })
          .then(() => {
            console.log("successfully deleted");
            setMessage("Post Deleted successfully");

            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          })
          .catch((e) => {
            setMessage("");
            console.log(e);
            Swal.fire({
              title: "Error !",
              text: "something went wrong",
              icon: "error",
            });
          });
      }
    });
  };
  useEffect(() => {
    setTimeout(() => {
      setMessage("");
    }, 3000);
  }, [message]);
  return (
    <div className={style.userPosts}>
      {posts.map((post, index) => {
        if (posts.length === index + 1) {
          return (
            <div className={style.post} key={post._id}>
              <Link
                to={`/posts/post/${post._id}`}
                className={style.link}
                ref={lastPost}
              >
                <img src={post.img} />
                <p className={style.title}>{post.title}</p>
              </Link>
              {with_delete && (
                <button
                  className={style.delete}
                  onClick={() => {
                    handelDelete(post._id);
                  }}
                >
                  <img src={delete_icon} alt="" />
                </button>
              )}
            </div>
          );
        }
        return (
          <div className={style.post} key={post._id}>
            <Link
              key={post._id}
              to={`/posts/post/${post._id}`}
              className={style.link}
            >
              <img src={post.img} />
              <p className={style.title}>{post.title}</p>
            </Link>
            {with_delete && (
              <button
                className={style.delete}
                onClick={() => {
                  handelDelete(post._id);
                }}
              >
                <img src={delete_icon} alt="" />
              </button>
            )}
          </div>
        );
      })}

      {message && <Notifcation message={message} />}
    </div>
  );
};

export default UserPosts;
