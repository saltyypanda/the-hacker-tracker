import { ProjectRow } from "../components/ProjectRow";
import { SectionHeader } from "../components/SectionHeader";
import { ProjectInfos } from "../project-constants";

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-28 sm:px-8">
      <SectionHeader
        index="01"
        eyebrow="Missions"
        title="Projects"
        subtitle="Academic and personal projects, from 24-hour hackathon prototypes to full-stack cloud apps."
        meta={`${String(ProjectInfos.length).padStart(2, "0")} entries`}
      />

      <div className="flex flex-col gap-24 lg:gap-32">
        {ProjectInfos.map((project, index) => (
          <ProjectRow key={project.slug} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
