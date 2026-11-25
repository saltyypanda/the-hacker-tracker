import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

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
    <p className="font-mono text-base text-primary sm:text-lg">
      <span className="text-base-content/40" aria-hidden="true">
        &gt;{" "}
      </span>
      {/* Screen readers get one stable line instead of every keystroke. */}
      <span className="sr-only">{textIntros[0]}</span>
      <span aria-hidden="true">
        {shown || "\u00a0"}
        <span className="ml-0.5 inline-block w-[0.6ch] animate-pulse bg-primary/80">
          &nbsp;
        </span>
      </span>
    </p>
  );
};

export default TypingIntros;
