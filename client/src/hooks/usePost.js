import { useEffect, useState } from "react";
import axios from "axios";

const usePost = (user, pageNumber) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: `/api/posts/user/${user}`,
      params: {
        page: pageNumber,
      },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setPosts((pvPosts) => {
          return [...new Set([...pvPosts, ...res.data])];
        });

        setHasMore(res.data.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        console.log(e);
        setLoading(false);
        setError(true);
      });

    return () => cancel();
  }, [user, pageNumber]);

  return { loading, error, posts, hasMore };
};

export default usePost;
