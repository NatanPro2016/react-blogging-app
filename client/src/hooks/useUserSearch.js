import axios from "axios";
import { useEffect, useState } from "react";

const useUserSeach = (username, pageNumber) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    setUsers([]);
  }, [username]);

  useEffect(() => {
    if (username) {
      setLoading(true);
      setError(false);
      let cancel;
      axios
        .get("/api/user/search", {
          params: {
            userName: username,
            page: pageNumber,
          },
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        })
        .then((res) => {
          setUsers((pvUsers) => {
            return [...new Set([...pvUsers, ...res.data])];
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
  }, [pageNumber, username]);
  return { loading, hasMore, error, users };
};

export default useUserSeach;
