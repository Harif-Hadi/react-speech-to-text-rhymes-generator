import { useState } from "react";
import { startListening, stopListening } from "../helper/api-util";

const Header = ({ transcript }) => {
  const [toggle, setToggle] = useState(false);

  const toggleHandler = () => {
    setToggle(!toggle);

    if (toggle === false) {
      startListening();
    } else if (toggle === true) stopListening();
  };

  return (
    <div className="header">
      <button onClick={toggleHandler}>
        {toggle ? "Stop" : "Start"} Recording
      </button>
      <div className="content">
        <h2>{transcript}</h2>
      </div>
    </div>
  );
};

export default Header;
