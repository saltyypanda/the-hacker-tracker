import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import TypingIntros from "../components/TypingIntros";
import { OrbitSystem } from "../components/OrbitSystem";
import { ProjectInfos } from "../project-constants";
import { ExperienceInfos } from "../experience-constants";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const readouts = [
  {
    value: String(ExperienceInfos.filter((e) => e.company === "Microsoft").length).padStart(2, "0"),
    label: "Microsoft internships",
  },
  { value: "03", label: "Courses assisted at RIT" },
  { value: String(ProjectInfos.length).padStart(2, "0"), label: "Missions launched" },
];

export default function Banner() {
  return (
    <section
      id="home"
      className="relative mx-auto grid min-h-[100svh] max-w-6xl items-center gap-12 px-5 pb-16 pt-28 sm:px-8 lg:grid-cols-[1fr_1fr] lg:gap-6 lg:pt-20"
    >
      <div className="flex flex-col gap-6">
        <motion.div {...fadeUp(0.05)}>
          <TypingIntros />
        </motion.div>

        <motion.h1
          {...fadeUp(0.15)}
          className="whitespace-nowrap text-[clamp(2.6rem,9vw,5.25rem)] font-bold lg:text-[clamp(3rem,6.5vw,5.25rem)] leading-[0.9]"
        >
          Tess Hacker<span className="text-primary">.</span>
        </motion.h1>

        <motion.p {...fadeUp(0.25)} className="label-mono flex flex-wrap items-center gap-x-3 gap-y-1 text-base-content/60">
          <span>Software engineer</span>
          <span className="h-1 w-1 rounded-full bg-secondary" aria-hidden="true" />
          <span>RIT</span>
          <span className="h-1 w-1 rounded-full bg-secondary" aria-hidden="true" />
          <span>Accessibility-minded</span>
        </motion.p>

        <motion.p
          {...fadeUp(0.35)}
          className="max-w-[34rem] text-lg leading-relaxed text-base-content/75"
        >
          I'm a final-year software engineering student at the Rochester Institute
          of Technology and a three-time Microsoft intern on the Excel team, most
          recently working on evaluation tools for Excel's AI agent. I care about
          system design and code that stays maintainable as it scales, and I'm
          passionate about accessibility and using technology to improve people's
          everyday lives.
        </motion.p>

        <motion.div {...fadeUp(0.45)} className="flex flex-wrap gap-3">
          <a href="#projects" className="btn btn-primary h-12 gap-2 px-6 text-base">
            View missions <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href="#contact"
            className="btn h-12 border-base-content/25 bg-base-100/40 px-6 text-base backdrop-blur-sm hover:border-primary hover:bg-base-100/60 hover:text-primary"
          >
            Open a channel
          </a>
        </motion.div>

        <motion.dl
          {...fadeUp(0.55)}
          className="mt-2 grid max-w-[34rem] grid-cols-3 border-t border-base-content/10 pt-5"
        >
          {readouts.map(({ value, label }, i) => (
            <div
              key={label}
              className={`flex flex-col gap-1 ${i > 0 ? "border-l border-base-content/10 pl-4" : ""}`}
            >
              <dt className="sr-only">{label}</dt>
              <dd className="font-display text-3xl font-semibold text-base-content">{value}</dd>
              <dd className="label-mono text-[0.68rem] leading-snug text-base-content/50">{label}</dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto w-full max-w-[22rem] sm:max-w-md lg:max-w-none"
      >
        <OrbitSystem />
      </motion.div>

    </section>
  );
}
