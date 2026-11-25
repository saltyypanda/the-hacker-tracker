import { Icon } from "@iconify/react";
import { motion } from "motion/react";
import { SectionHeader } from "../components/SectionHeader";
import {
  Languages,
  FrontendSkills,
  BackendSkills,
  CloudSkills,
} from "../skill-constants";
import { Skill } from "../types";

const groups: { code: string; name: string; skills: Skill[] }[] = [
  { code: "SYS-A", name: "Languages", skills: Languages },
  { code: "SYS-B", name: "Frontend", skills: FrontendSkills },
  { code: "SYS-C", name: "Backend & data", skills: BackendSkills },
  { code: "SYS-D", name: "Cloud & infra", skills: CloudSkills },
];

const total = groups.reduce((n, g) => n + g.skills.length, 0);

/** Logos that are near-black and disappear on the dark panels; shown in white instead. */
const DARK_LOGOS = new Set(["Prisma", "Express.js", "Next.js"]);

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-5 py-28 sm:px-8">
      <SectionHeader
        index="03"
        eyebrow="Onboard systems"
        title="Skills"
        subtitle="Languages, frameworks and tools I've worked with."
        meta={`${total} modules`}
      />

      <div className="grid gap-5 md:grid-cols-2">
        {groups.map((group, i) => (
          <motion.div
            key={group.name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: (i % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="hud p-7"
          >
            <div className="mb-6 flex items-baseline justify-between gap-4">
              <h3 className="text-xl font-semibold">{group.name}</h3>
              <span className="label-mono text-base-content/35">
                {group.code} · {String(group.skills.length).padStart(2, "0")}
              </span>
            </div>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3">
              {group.skills.map((skill) => (
                <li key={skill.skill_name} className="flex items-center gap-2.5 text-[0.95rem] leading-tight text-base-content/80">
                  {skill.icon ? (
                    <Icon
                      icon={skill.icon}
                      width={18}
                      height={18}
                      className={`shrink-0 ${DARK_LOGOS.has(skill.skill_name) ? "brightness-0 invert" : ""}`}
                      aria-hidden="true"
                    />
                  ) : (
                    <img
                      src={skill.image}
                      alt=""
                      width={18}
                      height={18}
                      className={`h-[18px] w-[18px] shrink-0 object-contain ${DARK_LOGOS.has(skill.skill_name) ? "brightness-0 invert" : ""}`}
                    />
                  )}
                  <span>{skill.skill_name}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
