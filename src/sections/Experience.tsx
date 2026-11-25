import { useState } from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { SectionHeader } from "../components/SectionHeader";
import { ExperienceInfos } from "../experience-constants";

const INITIAL_COUNT = 4;

/** "January 2025 - May 2025" -> "Jan 2025 – May 2025" so dates fit their column. */
const shortRange = (range: string) =>
  range
    .replace(/\b(January|February|March|April|May|June|July|August|September|October|November|December)\b/g, (m) => m.slice(0, 3))
    .replace(" - ", " – ");

export const Experience = () => {
  const [showAll, setShowAll] = useState(false);
  const entries = showAll ? ExperienceInfos : ExperienceInfos.slice(0, INITIAL_COUNT);
  const hiddenCount = ExperienceInfos.length - INITIAL_COUNT;

  return (
    <section id="experience" className="mx-auto max-w-6xl px-5 py-28 sm:px-8">
      <SectionHeader
        index="02"
        eyebrow="Flight log"
        title="Experience"
        subtitle="Internships, teaching and leadership over the past few years."
        meta={`${String(ExperienceInfos.length).padStart(2, "0")} entries`}
      />

      <ol className="relative">
        {/* The log line: runs down the node column */}
        <div
          aria-hidden="true"
          className="absolute bottom-2 left-[5px] top-2 w-px bg-gradient-to-b from-base-content/25 via-base-content/12 to-transparent md:left-[calc(12rem+5px)]"
        />

        {entries.map((exp, i) => {
          const isFirst = i === 0;
          return (
            <motion.li
              key={`${exp.title}-${exp.time_range}`}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative grid gap-3 pb-14 pl-8 last:pb-0 md:grid-cols-[12rem_1fr] md:gap-10 md:pl-0"
            >
              {/* Node */}
              <span
                aria-hidden="true"
                className={`absolute left-0 top-1.5 h-[11px] w-[11px] rotate-45 border md:left-48 ${
                  isFirst
                    ? "border-primary bg-primary shadow-[0_0_12px] shadow-primary/60"
                    : "border-base-content/40 bg-base-100"
                }`}
              />

              <div className="flex flex-col gap-1 md:pr-4 md:text-right">
                <time className="label-mono whitespace-nowrap text-secondary">{shortRange(exp.time_range)}</time>
                <span className="label-mono text-[0.68rem] text-base-content/40">{exp.type}</span>
              </div>

              <div className="md:pl-10">
                <h3 className="text-2xl font-semibold leading-snug">{exp.title}</h3>
                <p className="mt-1 text-base-content/55">
                  <span className="text-base-content/80">{exp.company}</span>
                  {" · "}
                  {exp.organization}
                  {" · "}
                  {exp.location}
                </p>
                <p className="mt-4 max-w-2xl leading-relaxed text-base-content/75">
                  {exp.description}
                </p>
              </div>
            </motion.li>
          );
        })}
      </ol>

      {hiddenCount > 0 && (
        <div className="mt-12 md:pl-[calc(12rem+2.5rem)]">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            aria-expanded={showAll}
            className="label-mono inline-flex items-center gap-2 border-b border-base-content/20 pb-1 text-base-content/70 transition-colors hover:border-primary hover:text-primary"
          >
            {showAll ? "Collapse log" : `Show full log (+${hiddenCount})`}
            <ChevronDown
              className={`h-4 w-4 transition-transform ${showAll ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </button>
        </div>
      )}
    </section>
  );
};
