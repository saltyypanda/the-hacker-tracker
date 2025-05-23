import { ExperienceInfos } from "../experience-constants";
import {
  Briefcase,
  BookOpenCheck,
  ServerCog,
  Microscope,
  Users,
  Star,
} from "lucide-react";

const getIconForType = (type: string) => {
  switch (type) {
    case "internship":
      return <Briefcase className="w-5 h-5 text-sky-400" />;
    case "teaching":
      return <BookOpenCheck className="w-5 h-5 text-emerald-400" />;
    case "leadership":
      return <ServerCog className="w-5 h-5 text-pink-400" />;
    case "outreach":
      return <Users className="w-5 h-5 text-orange-400" />;
    case "research":
      return <Microscope className="w-5 h-5 text-purple-400" />;
    default:
      return <Star className="w-5 h-5 text-yellow-400" />;
  }
};

export const Experience = () => {
  return (
    <div
      className="flex flex-col items-center w-[85%] min-h-[85vh] mt-[64px] p-10 bg-transparent text-black rounded-[4rem] gap-8"
      style={{ transform: "scale(0.9)" }}
      id="experience"
    >
      <div className="w-[75%] flex flex-col items-center gap-8">
        <header className="text-5xl font-bold text-base-content text-center">
          Experience
        </header>
        <p className="text-xl text-center text-base-content/60">
          My leadership and work experience over the past few years.
        </p>

        <ul className="timeline timeline-snap-icon w-full timeline-vertical text-base-content">
          {ExperienceInfos.map((experience, index) => {
            const { timelinePos, textPos } =
              index % 2 === 0
                ? { timelinePos: "start", textPos: "end" }
                : { timelinePos: "end", textPos: "start" };

            return (
              <li key={index}>
                <div className="timeline-middle">
                  <div className="timeline-middle pb-1.5">
                    {getIconForType(experience.type)}
                  </div>
                </div>

                <div
                  className={`${
                    timelinePos === "start" ? "timeline-start" : "timeline-end"
                  } mb-8 mx-4 ${
                    textPos === "start" ? "md:text-start" : "md:text-end"
                  }`}
                >
                  <time className="font-mono italic text-md text-[#FF6BA3]">
                    {experience.time_range}
                  </time>

                  <div className="text-2xl font-bold text-accent mt-1">
                    {experience.title}
                  </div>

                  <div className="text-md font-semibold text-success">
                    {experience.organization}
                  </div>

                  <div className="text-lg italic text-base-content/70 mb-2">
                    {experience.company} – {experience.location}
                  </div>

                  <div className="text-lg leading-relaxed text-base-content">
                    {experience.description}
                  </div>
                </div>

                <hr />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
