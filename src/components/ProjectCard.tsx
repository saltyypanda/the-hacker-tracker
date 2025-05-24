import { Tools, ToolCategories } from "../tool-constants";

interface Link {
  name: string;
  url: string;
}

interface Project {
  project_name: string;
  time_range: string;
  image: string;
  short_description: string;
  description: string;
  tools: string[];
  links: Link[];
}

interface Props {
  index: number;
  project: Project;
}

export function ProjectCard({ index, project }: Props) {
  return (
    <div className="card bg-transparent sm:border border-base-300 p-4 text-base-content w-full sm:w-96 shrink-0 transition-all duration-300 hover:bg-base-200 hover:shadow-lg hover:cursor-default hover:-translate-y-0.5">
      <figure>
        <div className="aspect-[1.86] w-full">
          <img
            src={project.image}
            alt={project.project_name}
            className="p-2 w-full object-cover overflow-hidden"
          />
        </div>
      </figure>

      <div className="card-body">
        <h2 className="card-title text-mg sm:text-2xl">
          {project.project_name}
        </h2>
        <p className="text-base sm:text-md opacity-80">
          {project.short_description}
        </p>

        <div className="card-actions justify-center mt-4">
          <button
            className="btn btn-primary w-full"
            onClick={() =>
              (
                document.getElementById(
                  `project-${index}-modal`
                ) as HTMLDialogElement
              ).showModal()
            }
          >
            See More
          </button>

          <dialog
            id={`project-${index}-modal`}
            className="modal transition-opacity duration-300"
          >
            <div className="modal-box m-auto w-[95vw] sm:w-[90vw] md:w-[45vw] max-w-5xl h-[85vh] grid grid-rows-[auto_auto_1fr_auto_auto] items-center bg-base-200 transition-opacity duration-300 ease-in-out">
              {/* Image */}
              <div className="flex justify-center aspect-[1.86] p-4">
                <img
                  src={project.image}
                  alt={project.project_name}
                  className="w-full object-cover overflow-hidden"
                />
              </div>

              {/* Title */}
              <h3 className="font-bold text-xl sm:text-2xl text-center">
                {project.project_name}
              </h3>

              {/* Description */}
              <div className="overflow-y-auto h-full px-2 sm:px-4">
                {project.description.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="my-2 text-sm sm:text-base">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Tools */}
              <p className="pt-4 px-2 sm:px-4 text-sm sm:text-base">
                <span className="font-bold text-base sm:text-lg">
                  Tools:&nbsp;
                </span>
                {project.tools.map((toolKey, i) => {
                  const tool = Tools[toolKey];
                  const category = ToolCategories[tool.category];

                  return (
                    <span
                      key={i}
                      className="inline-block rounded-md py-1 px-2 mx-1 my-1 text-sm"
                      style={{ backgroundColor: category.colorHex }}
                    >
                      {tool.name}
                    </span>
                  );
                })}
              </p>

              {/* Links */}
              <p className="pt-4 px-2 sm:px-4 text-sm sm:text-base">
                <span className="font-bold text-base sm:text-lg">
                  Links:&nbsp;
                </span>
                {project.links.length > 0 ? (
                  project.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      className="text-success underline bg-transparent rounded-md py-1 px-2 mx-1 transition-all duration-300 hover:bg-[#403bef] hover:text-base-content"
                    >
                      {link.name}
                    </a>
                  ))
                ) : (
                  <span className="opacity-80">None</span>
                )}
              </p>
            </div>

            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>
      </div>
    </div>
  );
}
