import React from "react";
import styles from "../assets/css/ResultPost.module.css";
import { Link } from "react-router-dom";

const ResultPost = ({ post, ref_ }) => {
  return (
    <div className={styles.post} ref={ref_}>
      <Link to={`/posts/post/${post._id}`}>
        <p>{post.title}</p>
        <img className={styles.img} src={post.img} alt={post.title} />
      </Link>
    </div>
  );
};
export default ResultPost;
