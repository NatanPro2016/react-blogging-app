import React, { useCallback, useEffect, useRef, useState } from "react";

import styles from "../assets/css/Result.module.css";

import usePostSearchByTitle from "../hooks/usePostSearchByTitle";
import ResultPost from "./ResultPost";
import useUserSeach from "../hooks/useUserSearch";
import ResultUsers from "./ResultUsers";

const Result = () => {
  const [onPosts, setOnPosts] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [userPageNumber, setUserPageNumber] = useState(0);
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const postResult = usePostSearchByTitle(title, pageNumber);
  const userResult = useUserSeach(title, userPageNumber);

  const userObserver = useRef();
  const postObserver = useRef();
  const results = useRef();
  const handleChangeToPost = () => {
    if (!onPosts) {
      results.current.scrollBy(-390, 0);
      setOnPosts(true);
    }
  };
  const handleChangeToUser = () => {
    if (onPosts) {
      console.log("to posts");
      results.current.scrollBy(300, 0);
      setOnPosts(false);
    }
  };
  const lastPost = useCallback(
    (node) => {
      if (postResult.loading) return;
      if (postObserver.current) postObserver.current.disconnect();
      postObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && postResult.hasMore) {
          setPageNumber((curr) => curr + 1);
        }
      });
      if (node) postObserver.current.observe(node);
    },
    [postResult.loading, postResult.hasMore]
  );
  const lastUser = useCallback(
    (node) => {
      if (userResult.loading) return;
      if (userObserver.current) userObserver.current.disconnect();
      userObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && userResult.hasMore) {
          setUserPageNumber((curr) => curr + 1);
        }
      });
      if (node) userObserver.current.observe(node);
    },
    [userResult.loading, userResult.hasMore]
  );
  useEffect(() => {
    setPageNumber(0);
    setUserPageNumber(0);
  }, [title]);
  const handleSearch = (e) => {
    setTitle(e.target.value);
    setUsername(e.target.value);
  };
  return (
    <div className={styles.result}>
      <input
        type="text"
        placeholder="Search "
        className={styles.search}
        onChange={handleSearch}
      />
      <div className={styles.nav}>
        <div className={styles.post} onClick={handleChangeToPost}>
          <svg
            version="1.1"
            id="_x32_"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="20px"
            height="20px"
            viewBox="0 0 512 512"
            xml:space="preserve"
          >
            <g>
              <path
                class="st0"
                d="M421.073,221.719c-0.578,11.719-9.469,26.188-23.797,40.094v183.25c-0.016,4.719-1.875,8.719-5.016,11.844
		c-3.156,3.063-7.25,4.875-12.063,4.906H81.558c-4.781-0.031-8.891-1.844-12.047-4.906c-3.141-3.125-4.984-7.125-5-11.844V152.219
		c0.016-4.703,1.859-8.719,5-11.844c3.156-3.063,7.266-4.875,12.047-4.906h158.609c12.828-16.844,27.781-34.094,44.719-49.906
		c0.078-0.094,0.141-0.188,0.219-0.281H81.558c-18.75-0.016-35.984,7.531-48.25,19.594c-12.328,12.063-20.016,28.938-20,47.344
		v292.844c-0.016,18.406,7.672,35.313,20,47.344C45.573,504.469,62.808,512,81.558,512h298.641c18.781,0,36.016-7.531,48.281-19.594
		c12.297-12.031,20-28.938,19.984-47.344V203.469c0,0-0.125-0.156-0.328-0.313C440.37,209.813,431.323,216.156,421.073,221.719z"
              />
              <path
                class="st0"
                d="M498.058,0c0,0-15.688,23.438-118.156,58.109C275.417,93.469,211.104,237.313,211.104,237.313
		c-15.484,29.469-76.688,151.906-76.688,151.906c-16.859,31.625,14.031,50.313,32.156,17.656
		c34.734-62.688,57.156-119.969,109.969-121.594c77.047-2.375,129.734-69.656,113.156-66.531c-21.813,9.5-69.906,0.719-41.578-3.656
		c68-5.453,109.906-56.563,96.25-60.031c-24.109,9.281-46.594,0.469-51-2.188C513.386,138.281,498.058,0,498.058,0z"
              />
            </g>
          </svg>
          Post
        </div>
        <div className={styles.user} onClick={handleChangeToUser}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 27 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.3214 7.5C18.3214 6.2568 17.8135 5.06451 16.9093 4.18544C16.0051 3.30636 14.7787 2.8125 13.5 2.8125C12.2213 2.8125 10.9949 3.30636 10.0907 4.18544C9.18654 5.06451 8.67857 6.2568 8.67857 7.5C8.67857 8.7432 9.18654 9.93549 10.0907 10.8146C10.9949 11.6936 12.2213 12.1875 13.5 12.1875C14.7787 12.1875 16.0051 11.6936 16.9093 10.8146C17.8135 9.93549 18.3214 8.7432 18.3214 7.5ZM5.78571 7.5C5.78571 5.51088 6.59847 3.60322 8.04518 2.1967C9.49189 0.790176 11.454 0 13.5 0C15.546 0 17.5081 0.790176 18.9548 2.1967C20.4015 3.60322 21.2143 5.51088 21.2143 7.5C21.2143 9.48912 20.4015 11.3968 18.9548 12.8033C17.5081 14.2098 15.546 15 13.5 15C11.454 15 9.49189 14.2098 8.04518 12.8033C6.59847 11.3968 5.78571 9.48912 5.78571 7.5ZM2.97121 27.1875H24.0288C23.4924 23.4785 20.2138 20.625 16.2542 20.625H10.7458C6.78616 20.625 3.50759 23.4785 2.97121 27.1875ZM0 28.2598C0 22.4883 4.80937 17.8125 10.7458 17.8125H16.2542C22.1906 17.8125 27 22.4883 27 28.2598C27 29.2207 26.1984 30 25.21 30H1.78996C0.801563 30 0 29.2207 0 28.2598Z"
              fill="black"
            />
          </svg>
          User
        </div>
      </div>
      <div className={onPosts ? styles.bar : styles.end}>
        <div className={styles.active}></div>
      </div>
      <div className={styles.results} ref={results}>
        <div className={styles.posts}>
          {postResult.posts.map((post, index) => {
            if (postResult.posts.length === index + 1) {
              return <ResultPost post={post} key={post._id} ref_={lastPost} />;
            } else {
              return <ResultPost post={post} key={post._id} />;
            }
          })}
          {title && postResult.posts.length === 0 && !postResult.loading && (
            <div className={styles.notfound}>
              <svg
                width="180"
                height="180"
                viewBox="0 0 210 210"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M172.167 24.3973C192.891 42.0987 207.129 67.6834 209.316 95.1082C210.912 123.272 203.431 150.866 184.649 172.422C164.705 194.556 138.957 207.73 109.042 209.386C79.9212 210.376 53.5603 199.698 32.3158 180.108C31.3219 179.236 31.3219 179.236 30.308 178.346C11.7927 161.252 1.28231 134.288 0.0618607 109.557C-0.903741 79.8996 9.46115 53.8881 29.3158 32.1082C29.8984 31.443 30.4811 30.7779 31.0814 30.0926C67.5946 -9.37115 132.375 -8.70489 172.167 24.3973ZM40.3158 36.1082C39.7035 36.6367 39.0912 37.1652 38.4603 37.7098C21.815 53.1743 12.046 77.1702 11.0775 99.6316C10.4612 126.653 19.1068 149.919 37.3158 170.108C44.1585 177.157 51.7844 182.293 60.3158 187.108C61.5997 187.835 61.5997 187.835 62.9095 188.577C83.4517 199.515 108.042 200.952 130.316 195.108C143.187 191.102 155.054 184.85 165.316 176.108C166.053 175.515 166.79 174.922 167.55 174.311C181.895 162.34 192.082 144.215 196.316 126.108C196.539 125.172 196.762 124.236 196.992 123.272C201.84 99.1956 196.797 73.6327 183.445 53.1355C167.822 30.9205 146.777 16.8865 120.132 11.7996C90.5385 7.01105 62.6191 16.6967 40.3158 36.1082Z"
                  fill="#232323"
                />
                <rect
                  x="151.508"
                  y="50"
                  width="11.2371"
                  height="143.554"
                  transform="rotate(45 151.508 50)"
                  fill="#232323"
                />
                <rect
                  x="50"
                  y="57.9458"
                  width="11.2371"
                  height="143.554"
                  transform="rotate(-45 50 57.9458)"
                  fill="#232323"
                />
              </svg>

              <div className={styles.title}> Nothing found </div>
            </div>
          )}
          {postResult.loading && (
            <div className={styles.loading_post}>
              <div className={styles.img}> </div>
              <div className={styles.detalis}></div>
            </div>
          )}
        </div>

        <div className={styles.users}>
          {userResult.users.map((user, index) => {
            return userResult.users.length === index + 1 ? (
              <ResultUsers user={user} key={user._id} ref_={lastUser} />
            ) : (
              <ResultUsers user={user} key={user._id} />
            );
          })}
          {title && userResult.users.length === 0 && !userResult.loading && (
            <div className={styles.notfound}>
              <svg
                width="180"
                height="180"
                viewBox="0 0 210 210"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M172.167 24.3973C192.891 42.0987 207.129 67.6834 209.316 95.1082C210.912 123.272 203.431 150.866 184.649 172.422C164.705 194.556 138.957 207.73 109.042 209.386C79.9212 210.376 53.5603 199.698 32.3158 180.108C31.3219 179.236 31.3219 179.236 30.308 178.346C11.7927 161.252 1.28231 134.288 0.0618607 109.557C-0.903741 79.8996 9.46115 53.8881 29.3158 32.1082C29.8984 31.443 30.4811 30.7779 31.0814 30.0926C67.5946 -9.37115 132.375 -8.70489 172.167 24.3973ZM40.3158 36.1082C39.7035 36.6367 39.0912 37.1652 38.4603 37.7098C21.815 53.1743 12.046 77.1702 11.0775 99.6316C10.4612 126.653 19.1068 149.919 37.3158 170.108C44.1585 177.157 51.7844 182.293 60.3158 187.108C61.5997 187.835 61.5997 187.835 62.9095 188.577C83.4517 199.515 108.042 200.952 130.316 195.108C143.187 191.102 155.054 184.85 165.316 176.108C166.053 175.515 166.79 174.922 167.55 174.311C181.895 162.34 192.082 144.215 196.316 126.108C196.539 125.172 196.762 124.236 196.992 123.272C201.84 99.1956 196.797 73.6327 183.445 53.1355C167.822 30.9205 146.777 16.8865 120.132 11.7996C90.5385 7.01105 62.6191 16.6967 40.3158 36.1082Z"
                  fill="#232323"
                />
                <rect
                  x="151.508"
                  y="50"
                  width="11.2371"
                  height="143.554"
                  transform="rotate(45 151.508 50)"
                  fill="#232323"
                />
                <rect
                  x="50"
                  y="57.9458"
                  width="11.2371"
                  height="143.554"
                  transform="rotate(-45 50 57.9458)"
                  fill="#232323"
                />
              </svg>

              <div className={styles.title}> Nothing found </div>
            </div>
          )}
          {userResult.loading && (
            <div className={styles.loading_user}>
              <div className={styles.img}> </div>
              <div className={styles.detalis}></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Result;
