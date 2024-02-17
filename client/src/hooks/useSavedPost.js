import { useEffect, useState } from "react";
import axios from "axios";

const useSavedPost = (query, pageNumber) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setPosts([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: "/api/posts/saved",
      params: {
        page: pageNumber,
        title: query,
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
  }, [query, pageNumber]);

  return { loading, error, posts, hasMore };
};

export default useSavedPost;
