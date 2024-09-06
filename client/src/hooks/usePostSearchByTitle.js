import axios from "axios";
import { useEffect, useState } from "react";

const usePostSearchByTitle = (title, pageNumber) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    setPosts([]);
  }, [title]);

  useEffect(() => {
    if (title) {
      setLoading(true);
      setError(false);
      let cancel;

      axios
        .get("/api/posts/search", {
          params: {
            title,
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
          setError(true);
          setLoading(false);
        });
    }
  }, [pageNumber, title]);
  return { loading, hasMore, error, posts };
};

export default usePostSearchByTitle;
