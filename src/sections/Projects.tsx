import { ProjectCard } from "../components/ProjectCard";
import { ProjectInfos } from "../project-constants";

export function Projects() {
  return (
    <section
      id="projects"
      className="flex flex-col items-center w-full px-4 sm:px-6 md:px-10 py-12 sm:py-16 text-black"
    >
      <div className="w-full max-w-5xl flex flex-col items-center text-center gap-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-base-content">
          Projects
        </h2>
        <p className="text-base sm:text-lg text-base-content/60 max-w-xl">
          Some of the academic and personal projects I've done.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-16 lg:gap-8 w-full max-w-screen-xl">
        {ProjectInfos.slice(0, 4).map((project, index) => (
          <ProjectCard
            key={`project-card-${index}`}
            index={index}
            project={project}
          />
        ))}
      </div>
    </section>
  );
}
