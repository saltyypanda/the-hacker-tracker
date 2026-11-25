import { useRef } from "react";
import { X } from "lucide-react";
import { Tools, ToolCategories } from "../tool-constants";
import { Project } from "../types";

interface Props {
  project: Project;
}

export function ProjectCard({ project }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isMobile = project.image_type === "mobile";

  return (
    <div className="card bg-transparent sm:border border-base-300 p-4 text-base-content w-full sm:w-96 shrink-0 transition-all duration-300 hover:bg-base-200 hover:shadow-lg hover:cursor-default hover:-translate-y-0.5">
      <div className="card-body justify-between h-full p-0">
        {/* Phone screenshots sit beside the text; desktop ones sit above it. */}
        <div className={isMobile ? "flex flex-row-reverse" : undefined}>
          <figure>
            <div
              className={`${isMobile ? "aspect-[9/16]" : "aspect-[1.86]"} w-full overflow-hidden`}
            >
              <img
                src={project.image}
                alt={`${project.project_name} screenshot`}
                loading="lazy"
                className="p-2 w-full object-cover"
              />
            </div>
          </figure>

          <div className="flex flex-col p-4 gap-2">
            <h3 className="card-title text-md sm:text-2xl">
              {project.project_name}
            </h3>
            <p className="text-base sm:text-md opacity-80">
              {project.short_description}
            </p>
          </div>
        </div>

        <div className="card-actions justify-center p-3">
          <button
            className="btn btn-primary w-full"
            onClick={() => dialogRef.current?.showModal()}
          >
            See More
          </button>

          <dialog
            ref={dialogRef}
            className="modal transition-opacity duration-300"
            aria-label={project.project_name}
          >
            <div className="modal-box m-auto w-[95vw] sm:w-[90vw] md:w-[75vw] lg:w-[60vw] xl:w-[45vw] max-w-5xl h-auto max-h-[85vh] grid grid-rows-[auto_auto_auto_1fr_auto_auto] items-center bg-base-200 transition-opacity duration-300 ease-in-out">
              <form method="dialog">
                {/* A button inside a method="dialog" form closes the modal. */}
                <button
                  aria-label="Close"
                  className="btn btn-sm btn-circle btn-ghost shadow-none border-none bg-transparent absolute right-2 top-2"
                >
                  <X className="w-4 h-4" />
                </button>
              </form>

              <div className="flex justify-center aspect-[1.86] p-4">
                <img
                  src={project.image}
                  alt={`${project.project_name} screenshot`}
                  loading="lazy"
                  className="w-full object-cover"
                />
              </div>

              <h3 className="font-bold text-xl sm:text-2xl text-center">
                {project.project_name}
              </h3>

              <div className="overflow-y-auto h-full px-2 sm:px-4">
                {project.description.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="my-2 text-sm sm:text-base">
                    {paragraph}
                  </p>
                ))}
              </div>

              <p className="pt-4 px-2 sm:px-4 text-sm sm:text-base">
                <span className="font-bold text-base sm:text-lg">
                  Tools:&nbsp;
                </span>
                {project.tools.map((toolKey) => {
                  const tool = Tools[toolKey];
                  const category = ToolCategories[tool.category];

                  return (
                    <span
                      key={toolKey}
                      className="inline-block rounded-md py-1 px-2 mx-1 my-1 text-sm"
                      style={{ backgroundColor: category.colorHex }}
                    >
                      {tool.name}
                    </span>
                  );
                })}
              </p>

              <p className="pt-4 px-2 sm:px-4 text-sm sm:text-base">
                <span className="font-bold text-base sm:text-lg">
                  Links:&nbsp;
                </span>
                {project.links.length > 0 ? (
                  project.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
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
