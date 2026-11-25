import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import "animate.css";

const textIntros = [
  "Welcome! My name is",
  "They call me...",
  "The name's Hacker...",
  "Hi, my name is",
  "On Earth, I'm called",
  "Some know me as",
  "Greetings, I'm",
  "Access granted. Welcome,",
  "To those who seek, I am",
  "Hello, world! I am",
  "Logging in as:",
  "Tracing signal...Found:",
];

const TYPE_MS = 60;
const DELETE_MS = 30;
const HOLD_MS = 2000; // pause once a phrase is fully typed
const GAP_MS = 300; // pause before typing the next phrase

const TypingIntros = () => {
  const reduceMotion = useReducedMotion();
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    if (reduceMotion) return;

    const fullText = textIntros[loopNum % textIntros.length];
    let delay = isDeleting ? DELETE_MS : TYPE_MS;
    let next: () => void;

    if (!isDeleting && text === fullText) {
      delay = HOLD_MS;
      next = () => setIsDeleting(true);
    } else if (isDeleting && text === "") {
      delay = GAP_MS;
      next = () => {
        setIsDeleting(false);
        setLoopNum((n) => n + 1);
      };
    } else {
      next = () =>
        setText(
          fullText.substring(0, text.length + (isDeleting ? -1 : 1))
        );
    }

    const timeout = setTimeout(next, delay);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, loopNum, reduceMotion]);

  const shown = reduceMotion ? textIntros[0] : text;

  return (
    <div id="typing-intros" className="w-full flex flex-col gap-2">
      <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl whitespace-nowrap overflow-hidden shrink text-accent animate__animated animate__fadeIn animate__delay-1s">
        {shown || " "}
        <span className="animate-pulse" aria-hidden="true">
          |
        </span>
      </p>
    </div>
  );
};

export default TypingIntros;
