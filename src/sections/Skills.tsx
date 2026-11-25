import { Icon } from "@iconify/react";
import { motion, useReducedMotion } from "motion/react";
import { useMediaQuery } from "../hooks/useMediaQuery";
import {
  Languages,
  FrontendSkills,
  BackendSkills,
  CloudSkills,
} from "../skill-constants";
import { Skill } from "../types";

const allSkills = [
  ...Languages,
  ...FrontendSkills,
  ...BackendSkills,
  ...CloudSkills,
];

const ANIMATION_DELAY = 0.05;
const INITIAL_DELAY = 0.5;

function SkillTile({
  skill,
  index,
  animate,
}: {
  skill: Skill;
  index: number;
  animate: boolean;
}) {
  const { skill_name, icon, image } = skill;

  return (
    <motion.div
      // Only fade tiles in on large screens, and never for reduced-motion users.
      initial={animate ? { opacity: 0, y: 10 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * ANIMATION_DELAY + INITIAL_DELAY,
        duration: 0.4,
        ease: "easeIn",
      }}
      className="flex flex-col items-center w-20 sm:w-24 text-center"
    >
      {icon ? (
        <Icon
          icon={icon}
          width={50}
          height={50}
          className="sm:w-[60px] sm:h-[60px]"
        />
      ) : (
        <img
          src={image}
          alt=""
          width={50}
          height={50}
          className="sm:w-[60px] sm:h-[60px]"
        />
      )}
      <p className="text-sm sm:text-base text-base-content/60 mt-2">
        {skill_name}
      </p>
    </motion.div>
  );
}

export function Skills() {
  const isLarge = useMediaQuery("(min-width: 1024px)");
  const reduceMotion = useReducedMotion();
  const animate = isLarge && !reduceMotion;

  return (
    <section
      id="skills"
      className="flex flex-col items-center w-full px-4 sm:px-6 md:px-10 py-12 sm:py-16"
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
        {allSkills.map((skill, index) => (
          <SkillTile
            key={skill.skill_name}
            skill={skill}
            index={index}
            animate={animate}
          />
        ))}
      </div>
    </section>
  );
}
