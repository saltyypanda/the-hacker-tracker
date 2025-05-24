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
      id="experience"
      className="flex flex-col items-center w-full px-4 sm:px-6 md:px-10 py-12 min-h-[85vh]"
    >
      <div className="w-full max-w-6xl flex flex-col items-center gap-8">
        <header className="text-4xl sm:text-5xl font-bold text-base-content text-center">
          Experience
        </header>
        <p className="text-base sm:text-lg text-center text-base-content/60">
          My leadership and work experience over the past few years.
        </p>

        <ul className="timeline timeline-snap-icon timeline-vertical w-full text-base-content max-[1024px]:timeline-compact max-[1024px]:timeline-box">
          {ExperienceInfos.map((experience, index) => {
            const { timelinePos, textPos } =
              index % 2 === 0
                ? { timelinePos: "start", textPos: "end" }
                : { timelinePos: "end", textPos: "start" };

            return (
              <li key={index}>
                <div className="timeline-middle pb-1.5">
                  {getIconForType(experience.type)}
                </div>

                <div
                  className={`${
                    timelinePos === "start" ? "timeline-start" : "timeline-end"
                  } mb-10 mx-2 sm:mx-4 ${
                    textPos === "start" ? "lg:text-start" : "lg:text-end"
                  }`}
                >
                  <time className="font-mono italic text-sm sm:text-base text-[#FF6BA3]">
                    {experience.time_range}
                  </time>

                  <div className="text-xl sm:text-2xl font-bold text-accent mt-1">
                    {experience.title}
                  </div>

                  <div className="text-sm sm:text-md font-semibold text-success">
                    {experience.organization}
                  </div>

                  <div className="text-sm sm:text-lg italic text-base-content/70 mb-2">
                    {experience.company} – {experience.location}
                  </div>

                  <div className="text-sm md:text-base leading-relaxed text-base-content">
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
