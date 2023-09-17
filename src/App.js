import { useSpeechRecognition } from "react-speech-recognition";
import Header from "./components/Header";
import RhymesOutput from "./components/RhymesOutput";

import "./App.css";

const App = () => {
  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  let splittedText = transcript.split(" ");
  let lastElement = splittedText.slice(-1)[0];

  if (!browserSupportsSpeechRecognition) return null;

  return (
    <div>
      <Header transcript={transcript} />
      {transcript && <RhymesOutput lastElement={lastElement} />}
    </div>
  );
};

export default App;
