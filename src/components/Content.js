import useFetch from "../hooks/useFetch";

const Content = ({ lastElement }) => {
  const { isLoading, rhymes, error, fetchRhymes } = useFetch(lastElement);

  let content;

  if (isLoading) {
    content = <h3>Loading...</h3>;
  }

  if (error) {
    content = (
      <div>
        <h3>Faild to fetch</h3>
        <button
          onClick={() => fetchRhymes(lastElement)}
          className="try-again_btn"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!isLoading) {
    content = (
      <div>
        {rhymes.map((rhyme, index) => (
          <h3 key={index}>{rhyme}</h3>
        ))}
      </div>
    );
  }

  return <div>{content}</div>;
};

export default Content;
