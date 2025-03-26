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
  links: Link[]; // hehehee linked list :))))
}

interface Props {
  index: number;
  project: Project;
}

export function ProjectCard({ index, project }: Props) {
  return (
    <div className="card bg-transparent text-base-content w-96 shrink-0 snap-start transition-all duration-300 hover:bg-base-200 hover:shadow-lg hover:cursor-default hover:-translate-y-0.5">
      {/* // hover:-translate-y-0.5 */}
      <figure>
        <div className="aspect-[1.86] w-full">
          <img
            src={project.image}
            alt={project.project_name}
            className="p-2 w-full object-cover overflow-hidden"
            // size of photos: 1860 x 1000
          />
        </div>
      </figure>
      <div className="card-body">
        <h2 className="card-title text-2xl">{project.project_name}</h2>
        <p className="text-lg opacity-80">{project.short_description}</p>
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
            <div className="modal-box m-auto min-w-[45vw] h-[85vh] grid grid-rows-[auto_auto_1fr_auto_auto] items-center bg-base-200 transition-opacity duration-300 ease-in-out">
              <div className="flex justify-center aspect-[1.86] p-4">
                <img
                  src={project.image}
                  alt={project.project_name}
                  className="w-full object-cover overflow-hidden"
                  // size of photos: 1860 x 1000
                />
              </div>

              <h3 className="font-bold text-2xl">{project.project_name}</h3>
              <div className="overflow-y-auto h-full">
                {project.description.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="my-2">
                    {paragraph}
                  </p>
                ))}
              </div>

              <p className="pt-4">
                <span className="font-bold text-lg">
                  Tools:&nbsp;&nbsp;&nbsp;
                </span>
                {project.tools.map((toolKey) => {
                  const tool = Tools[toolKey];
                  const category = ToolCategories[tool.category];

                  return (
                    <span
                      className="rounded-md py-1 px-2 mx-1"
                      style={{ backgroundColor: category.colorHex }}
                    >
                      {tool.name}
                    </span>
                  );
                })}
              </p>

              <p className="pt-4">
                <span className="font-bold text-lg">
                  Links:&nbsp;&nbsp;&nbsp;
                </span>
                {project.links.length > 0 ? (
                  project.links.map((link) => (
                    <a
                      href={link.url}
                      target="_blank"
                      className="text-[#AFD7FF] underline bg-transparent rounded-md py-1 px-2 mx-1 transition-all duration-300 hover:bg-success hover:text-base-content"
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
