import SpeechRecognition from "react-speech-recognition";

export const fetchRhymes = async (lastElement) => {
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

  return slicedData;
};

export const startListening = () => {
  SpeechRecognition.startListening({
    continuous: true,
    language: "en-US",
  });
};

export const stopListening = () => {
  SpeechRecognition.stopListening();
};
