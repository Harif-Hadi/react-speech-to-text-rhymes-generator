import { useEffect, useState } from "react";

const useFetch = (lastElement) => {
  const [isLoading, setIsLoading] = useState(false);
  const [rhymes, setRhymes] = useState([]);
  const [error, setError] = useState(false);

  const fetchRhymes = async (lastElement) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://api.api-ninjas.com/v1/rhyme?word=${lastElement}`,
        {
          method: "GET",
          headers: {
            "X-Api-Key": process.env.REACT_APP_API_KEY,
          },
          contentType: "application/json",
        }
      );

      if (!response.ok) {
        throw new Error("Newtork Error");
      }

      const data = await response.json();
      let slicedData;
      if (data.length === 10 || data.length < 10) return (slicedData = data);
      else slicedData = data.slice(0, 10);

      setIsLoading(false);
      setRhymes(slicedData);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    if (lastElement.length === 0) return;
    else fetchRhymes(lastElement);
  }, [lastElement]);

  return {
    isLoading,
    rhymes,
    error,
    fetchRhymes,
  };
};

export default useFetch;
