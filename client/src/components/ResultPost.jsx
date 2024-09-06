import React, { useState } from "react";
import styles from "../assets/css/ResultPost.module.css";
import { Link } from "react-router-dom";
import { Blurhash } from "react-blurhash";

const ResultPost = ({ post, ref_ }) => {
  const [loadingImage, setLoadingImage] = useState(true)
  const calculateWidth = ()=>{
    return 280
  }
  const calculateHeight = ()=>{
    return 180
  }
  return (
    <div className={styles.post} ref={ref_}>
      <Link to={`/posts/post/${post._id}`}>
        <p>{post.title}</p>
        {loadingImage&&
        
        <div className={styles.blured}>
              <Blurhash
                hash={post.bluredHash}
                className={styles.post_img}
                height={calculateHeight()}
                width={calculateWidth()}
                resolutionX={32}
                resolutionY={32}
                punch={1}
              />
            </div>
        }
        <img style={{display: loadingImage ? 'none ': 'block'}} className={styles.img} src={post.img} alt={post.title} onLoad={()=>setLoadingImage(false)} />
      </Link>
    </div>
  );
};
export default ResultPost;
