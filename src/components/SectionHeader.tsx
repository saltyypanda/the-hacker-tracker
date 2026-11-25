import { motion } from "motion/react";

interface Props {
  index: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** Small mono readout on the right of the rule, e.g. "04 entries". */
  meta?: string;
}

/** "01 / MISSIONS ───────── 04 ENTRIES" header shared by every section. */
export function SectionHeader({ index, eyebrow, title, subtitle, meta }: Props) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mb-14 flex flex-col gap-5"
    >
      <div className="flex items-center gap-4">
        <p className="label-mono shrink-0 text-primary">
          {index} <span className="text-base-content/30">/</span> {eyebrow}
        </p>
        <div className="hairline flex-1" aria-hidden="true" />
        {meta && <p className="label-mono shrink-0 text-base-content/35">{meta}</p>}
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-none">{title}</h2>
        {subtitle && (
          <p className="max-w-xl text-lg text-base-content/60">{subtitle}</p>
        )}
      </div>
    </motion.header>
  );
}
