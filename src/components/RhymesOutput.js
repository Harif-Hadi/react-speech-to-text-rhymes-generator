import Content from "./Content";

const RhymesOutput = ({ lastElement }) => {
  return (
    <div className="rhymes_container">
      <h1>Rhymes</h1>
      <Content lastElement={lastElement} />
    </div>
  );
};

export default RhymesOutput;
