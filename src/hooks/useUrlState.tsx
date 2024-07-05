import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
interface QueryParams {
  [key: string]: string;
}
const useUrlState = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [queries, setQueries] = useState(new URLSearchParams(location.search));

  useEffect(() => {
    setQueries(new URLSearchParams(location.search));
  }, [location.search]);

  const appendQuery = (key: string, value: string) => {
    const newQueries = new URLSearchParams(location.search);
    newQueries.set(key, value);
    navigate({ search: newQueries.toString() }, { replace: true });
  };

  const deleteQuery = (key: string) => {
    const newQueries = new URLSearchParams(location.search);
    newQueries.delete(key);
    navigate({ search: newQueries.toString() }, { replace: true });
  };

  const getQueryValue = (key: string) => {
    const queries = new URLSearchParams(location.search);
    return queries.get(key)
  };
  

  return {
    queries,
    appendQuery,
    deleteQuery,
    getQueryValue
  };
};

export default useUrlState;
