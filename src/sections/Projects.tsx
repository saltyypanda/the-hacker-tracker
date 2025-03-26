import { ProjectCard } from "../components/ProjectCard";
import { ProjectInfos } from "../project-constants";

export function Projects() {
  return (
    <div
      className="flex flex-col items-center w-[85%] min-h-[85vh] mt-[64px] p-10 bg-transparent text-black rounded-[4rem] gap-8"
      style={{ transform: "scale(0.9)" }}
      id="projects"
    >
      <div className="w-[75%] flex flex-col items-center gap-8">
        <header className="flex text-5xl font-bold text-base-content text-center">
          Projects
        </header>
        <p className="text-xl text-center text-base-content opacity-60">
          Some of the academic and personal projects I've done.
        </p>
      </div>

      <div className="flex gap-8 py-4 overflow-x-scroll overflow-y-hidden snap-x snap-mandatory hide-scrollbar scroll-smooth max-w-[76rem]">
        {ProjectInfos.slice(0, 4).map((project, index) => (
          <ProjectCard
            key={`project-card-${index}`}
            index={index}
            project={project}
          />
        ))}
      </div>
    </div>
  );
}
