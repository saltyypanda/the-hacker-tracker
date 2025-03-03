import { useState, useEffect } from "react";
import "animate.css";

const textIntros = [
  "Welcome! I'm",
  "They call me...",
  "The name's Hacker...",
  "Hi, my name is",
  "On Earth, I'm called",
  "Some know me as",
  "Greetings, I'm",
  "Access granted. Welcome,",
  "To those who seek, I am",
  "Hello, world! I'm",
  "Logging in as:",
  "Tracing signal...Found:",
];

const TypingIntros = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [delta, setDelta] = useState(50 - Math.random() * 10);
  const [text, setText] = useState("");
  const period = 2000;

  const tick = () => {
    let i = loopNum % textIntros.length;
    let fullText = textIntros[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(200);
    }
  };

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [text]);

  return (
    <div className="flex flex-col gap-2">
      <p className="text-3xl whitespace-nowrap overflow-hidden flex-1 !font-jura shrink text-white animate__animated animate__fadeIn animate__delay-1s">
        {text || "\u00a0"}
        <span className="animate-pulse">|</span>
      </p>
    </div>
  );
};

export default TypingIntros;
