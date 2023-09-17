import { useCallback, useEffect, useState } from "react";
import { fetchRhymes } from "../helper/api-util";

const useFetch = (lastElement) => {
  const [isLoading, setIsLoading] = useState(false);
  const [rhymes, setRhymes] = useState([]);
  const [error, setError] = useState(false);

  const fetchRhymesHandler = useCallback(async (lastElement) => {
    try {
      setIsLoading(true);
      const slicedData = await fetchRhymes(lastElement);
      setIsLoading(false);
      setRhymes(slicedData);
    } catch (err) {
      setError(true);
    }
  }, []);

  useEffect(() => {
    if (lastElement.length === 0) return;
    else fetchRhymesHandler(lastElement);
  }, [fetchRhymesHandler, lastElement]);

  return {
    isLoading,
    rhymes,
    error,
    fetchRhymesHandler,
  };
};

export default useFetch;
