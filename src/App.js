import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import "./App.css";
import { useState, useEffect } from "react";

const App = () => {
  const [toggle, setToggle] = useState(false);
  const [rhymes, setRhymes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const lastElement = transcript.split(" ").slice(-1)[0];

  const fetchRhymes = async (word) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`https://api.api-ninjas.com/v1/rhyme?word=${word}`, {
        method: "GET",
        headers: {
          "X-Api-Key": "bqxQ27vV1HFJgbBrerUbkw==7aZUaesurhAV9iM4",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setRhymes(data.slice(0, 10));
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (lastElement) {
      fetchRhymes(lastElement);
    }
  }, [lastElement]);

  const toggleHandler = () => {
    setToggle((prevToggle) => !prevToggle);

    if (!toggle) {
      SpeechRecognition.startListening({ continuous: true, language: "en-US" });
    } else {
      SpeechRecognition.stopListening();
    }
  };

  if (!browserSupportsSpeechRecognition) return null;

  const content = isLoading ? (
    <h3>Loading...</h3>
  ) : error ? (
    <div>
      <h3>Failed to fetch</h3>
      <button onClick={() => fetchRhymes(lastElement)} className="try-again_btn">
        Try Again
      </button>
    </div>
  ) : (
    rhymes.map((rhyme, index) => <h3 key={index}>{rhyme}</h3>)
  );

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
