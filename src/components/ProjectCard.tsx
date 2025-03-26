interface Props {
  index: number;
  name: string;
  image: string;
  shortDescription: string;
  description: string;
}

export function ProjectCard({ index, name, image, shortDescription, description }: Props) {
  return (
    <div className="card bg-transparent text-base-content w-96 shrink-0 snap-start transition-all duration-300 hover:bg-base-200 hover:-translate-y-0.5 hover:shadow-lg">
      <figure>
        <img
          src={image}
          alt={name}
          className="p-2 w-full object-cover overflow-hidden"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-2xl">{name}</h2>
        <p className="text-lg opacity-80">{shortDescription}</p>
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
          <dialog id={`project-${index}-modal`} className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">{name}</h3>
              <p className="py-4">
                {description}
              </p>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
}
