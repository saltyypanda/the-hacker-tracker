import headerImage from "../assets/header-img.svg";
import TypingIntros from "../components/TypingIntros";
import { motion } from "framer-motion";

export default function Banner() {
  return (
    <div id="home" className="hero w-full min-h-screen">
      <div className="hero-content flex-col gap-8 px-4 sm:px-8 md:px-12 xl:flex-row-reverse xl:gap-12 xl:w-11/12 mx-auto">        
        <motion.img
          className="hidden md:block sm:w-2/3 md:w-1/2 object-contain glow"
          src={headerImage}
          alt="Cute astronaut"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="flex flex-col gap-4 w-full sm:w-5/6 md:w-3/4 lg:w-2/3 xl:w-1/2 text-center xl:text-left">
          <TypingIntros />
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
            Esther Hacker
          </h1>
          <p className="py-4 sm:py-6 text-base sm:text-lg">
            I'm a third year software engineering major at the Rochester
            Institute of Technology. I enjoy software system design and
            optimizing code for maintainability and scalability. I'm passionate
            about accessibility in software and using technology to improve
            people's everyday lives.
          </p>
          <a
            href="#skills"
            className="btn btn-primary w-40 sm:w-52 md:w-60 mx-auto xl:mx-0 font-body text-md"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}
