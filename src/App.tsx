import { MotionConfig } from "motion/react";
import { Background } from "./components/Background";
import { NavBar } from "./components/Navbar";
import Banner from "./sections/Banner";
import { Projects } from "./sections/Projects";
import { Experience } from "./sections/Experience";
import { Skills } from "./sections/Skills";
import { Contact } from "./sections/Contact";
import { Footer } from "./sections/Footer";

function App() {
  return (
    // "user" turns off transform animations for people who prefer reduced motion.
    <MotionConfig reducedMotion="user">
      <Background />
      <NavBar />
      <main>
        <Banner />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}

export default App;
