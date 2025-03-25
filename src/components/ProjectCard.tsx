interface Props {
  name: string;
  image: string;
  shortDescription: string;
  // tools: string[];
}

export function ProjectCard({ name, image, shortDescription }: Props) {
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
        {/* <p>Tools Used: {tools.join(", ")}</p> */}
        <div className="card-actions justify-center mt-4">
          <button className="btn btn-disabled w-full">See More</button>
        </div>
      </div>
    </div>
  );
}
