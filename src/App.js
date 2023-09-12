import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import "./App.css";
import { useState, useEffect } from "react";

const App = () => {
  const [toggle, setToggle] = useState(false);
  const [rhymes, setRhymes] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState(false);

  const startListening = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: "en-US",
    });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  let splittedText = transcript.split(" ");
  let lastElement = splittedText[splittedText.length - 1];

  const fetchRhymes = (word) => {
    try {
      setIsLoading(true);
      fetch(`https://api.api-ninjas.com/v1/rhyme?word=${word}`, {
        method: "GET",
        headers: {
          "X-Api-Key": "bqxQ27vV1HFJgbBrerUbkw==7aZUaesurhAV9iM4",
        },
        contentType: "application/json",
      })
        .then((res) => res.json())
        .then((data) => {
          let slicedData;
          if (data.length === 10 || data.length < 10)
            return (slicedData = data);
          else slicedData = data.slice(0, 10);

          console.log(slicedData);
          setRhymes(slicedData);
          setIsLoading(false);
        })
        .catch(() => setError(true));
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    if (lastElement.length === 0) return;
    else fetchRhymes(lastElement);
  }, [lastElement]);

  const toggleHandler = () => {
    setToggle(!toggle);

    if (toggle === false) {
      startListening();
    } else if (toggle === true) stopListening();
  };

  if (!browserSupportsSpeechRecognition) return null;

  const tryAgainHandler = () => {
    fetchRhymes(lastElement);
  };

  let content;
  if (isLoading) content = <h3>Loading...</h3>;

  if (error)
    content = (
      <div>
        <h3>Faild to fetch</h3>
        <button onClick={tryAgainHandler} className="try-again_btn">
          Try Again
        </button>
      </div>
    );

  if (!isLoading) {
    content = (
      <div>
        {rhymes.map((rhyme) => (
          <h3 key={Math.random() * 6}>{rhyme}</h3>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="header">
        <button onClick={toggleHandler}>
          {toggle ? "Stop" : "Start"} Recording
        </button>
        <div className="content">
          <h2>{transcript}</h2>
        </div>
      </div>
      {transcript && (
        <div className="rhymes_container">
          <h1>Rhymes</h1>
          {content}
        </div>
      )}
    </div>
  );
};

export default App;
