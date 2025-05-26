import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Languages,
  FrontendSkills,
  BackendSkills,
  CloudSkills,
} from "../skill-constants";

export function Skills() {
  /**
   * The Skills component renders a list of skills as a row of cards,
   * with each card containing an icon and the name of the skill.
   *
   * @returns {JSX.Element} The JSX element representing the Skills component.
   */
  const allSkills = [
    ...Languages,
    ...FrontendSkills,
    ...BackendSkills,
    ...CloudSkills,
  ];

  const animationDelay = 0.05;
  const initialDelay = 0.5;

  return (
    <section
      id="skills"
      className="flex flex-col items-center w-full px-4 sm:px-6 md:px-10 py-12 sm:py-16 bg-transparent text-black"
    >
      <div className="w-full max-w-5xl flex flex-col items-center text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-base-content mb-6">
          Skills
        </h2>
        <p className="text-base sm:text-lg text-base-content/60 max-w-xl">
          Here's some cool useful stuff I learned over the past few years.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-8 sm:gap-10 md:gap-12 mt-10 w-full max-w-6xl">
        {allSkills.map(({ skill_name, icon }, index) => {
          const { ref, inView } = useInView({ triggerOnce: true });

          return (
            <>
              <div className="hidden lg:block">
                <motion.div
                  key={index}
                  ref={ref}
                  initial={{ opacity: 0, y: 10 }}
                  animate={
                    inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                  }
                  transition={{
                    delay: index * animationDelay + initialDelay,
                    duration: 0.4,
                    ease: "easeIn",
                  }}
                  className="flex flex-col items-center w-20 sm:w-24 text-center"
                >
                  <Icon
                    icon={icon}
                    width={50}
                    height={50}
                    className="sm:w-[60px] sm:h-[60px]"
                  />
                  <p className="text-sm sm:text-base text-base-content/60 mt-2">
                    {skill_name}
                  </p>
                </motion.div>
              </div>

              <div
                key={index}
                className="lg:hidden flex flex-col items-center w-20 sm:w-24 text-center"
              >
                <Icon
                  icon={icon}
                  width={50}
                  height={50}
                  className="sm:w-[60px] sm:h-[60px]"
                />
                <p className="text-sm sm:text-base text-base-content/60 mt-2">
                  {skill_name}
                </p>
              </div>
            </>
          );
        })}
      </div>
    </section>
  );
}
