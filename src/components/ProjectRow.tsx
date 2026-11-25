import { CSSProperties, useRef } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { Tools } from "../tool-constants";
import { Project } from "../types";

interface Props {
  project: Project;
  index: number;
}

/** Splits a template-literal description into clean paragraphs. */
function paragraphs(text: string) {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

function ToolChips({ tools }: { tools: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Tools used">
      {tools.map((key) => (
        <li
          key={key}
          className="rounded border border-base-content/12 bg-base-100/40 px-2 py-1 font-mono text-xs text-base-content/70"
        >
          {Tools[key]?.name ?? key}
        </li>
      ))}
    </ul>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <>
      {project.links.map((link) => (
        <a
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-base-content/75 underline-offset-4 transition-colors hover:text-primary hover:underline"
        >
          {link.name}
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      ))}
    </>
  );
}

export function ProjectRow({ project, index }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const missionNo = String(index + 1).padStart(2, "0");
  const titleId = `project-${project.slug}-title`;
  const flipped = index % 2 === 1;
  const accentStyle = { "--hud-c": project.accent } as CSSProperties;

  return (
    <motion.article
      id={`project-${project.slug}`}
      aria-labelledby={titleId}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12"
    >
      {/* Screenshot */}
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        aria-label={`Open mission log for ${project.project_name}`}
        className={`group relative block lg:col-span-7 ${flipped ? "lg:order-2" : ""}`}
      >
        <div
          aria-hidden="true"
          className="absolute -inset-6 -z-10 opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-70"
          style={{ background: `radial-gradient(closest-side, ${project.accent}55, transparent)` }}
        />
        <div className="hud p-2" style={accentStyle}>
          <div className="aspect-[16/10] overflow-hidden">
            <img
              src={project.image}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.03]"
            />
          </div>
        </div>
      </button>

      {/* Text */}
      <div className={`flex flex-col gap-5 lg:col-span-5 ${flipped ? "lg:order-1" : ""}`}>
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: project.accent, boxShadow: `0 0 12px ${project.accent}` }}
          />
          <p className="label-mono text-base-content/60">Mission {missionNo}</p>
          <div className="hairline flex-1" aria-hidden="true" />
        </div>

        <h3 id={titleId} className="text-3xl font-semibold leading-tight sm:text-4xl">
          {project.project_name}
        </h3>
        <p className="text-lg leading-relaxed text-base-content/70">{project.short_description}</p>
        <ToolChips tools={project.tools} />

        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-1">
          <button
            type="button"
            onClick={() => dialogRef.current?.showModal()}
            className="btn btn-sm h-10 border-base-content/20 bg-transparent px-4 hover:border-primary hover:bg-transparent hover:text-primary"
          >
            Read mission log
          </button>
          <ProjectLinks project={project} />
        </div>
      </div>

      <dialog ref={dialogRef} className="modal" aria-labelledby={`${titleId}-dialog`}>
        <div className="hud modal-box max-h-[88vh] w-[94vw] max-w-3xl rounded-none bg-base-200 p-0" style={{ ...accentStyle, "--hud-bg": "var(--color-base-200)" } as CSSProperties}>
          <form method="dialog">
            <button
              aria-label="Close"
              className="btn btn-circle btn-ghost btn-sm absolute right-3 top-3 z-10 bg-base-100/70 backdrop-blur"
            >
              <X className="h-4 w-4" />
            </button>
          </form>

          <img
            src={project.image}
            alt={`${project.project_name} screenshot`}
            loading="lazy"
            className="aspect-[16/9] w-full border-b border-base-content/10 object-cover object-top"
          />

          <div className="flex flex-col gap-6 p-6 sm:p-10">
            <div className="flex flex-col gap-2">
              <p className="label-mono" style={{ color: project.accent }}>
                Mission {missionNo} · Log
              </p>
              <h3 id={`${titleId}-dialog`} className="text-3xl font-semibold sm:text-4xl">
                {project.project_name}
              </h3>
            </div>

            <div className="flex flex-col gap-4 text-lg leading-relaxed text-base-content/80">
              {paragraphs(project.description).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="flex flex-col gap-3 border-t border-base-content/10 pt-6">
              <p className="label-mono text-base-content/45">Tools</p>
              <ToolChips tools={project.tools} />
            </div>

            {project.links.length > 0 && (
              <div className="flex flex-col gap-3">
                <p className="label-mono text-base-content/45">Links</p>
                <div className="flex flex-wrap gap-5">
                  <ProjectLinks project={project} />
                </div>
              </div>
            )}
          </div>
        </div>
        <form method="dialog" className="modal-backdrop bg-black/70 backdrop-blur-sm">
          <button aria-label="Close">close</button>
        </form>
      </dialog>
    </motion.article>
  );
}
