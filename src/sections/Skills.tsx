import { IndividualSkill } from "../components/IndividualSkill";
import { Languages, FrontendSkills, BackendSkills } from "../constants";

export function Skills() {
  return (
    <div
      className="flex flex-col items-center w-[85%] min-h-[85vh] mt-[64px] p-10 bg-[#121212] text-black rounded-[4rem]"
      style={{ transform: "scale(0.9" }}
    >
      <div className="w-[75%] flex flex-col items-center">
        <header className="flex text-5xl font-bold text-base-content text-center my-8">
          Skills
        </header>
        <p className="text-xl text-center text-base-content opacity-60">
          Here's some cool useful stuff I learned over the past few years.
        </p>
      </div>

      <div className="flex flex-row justify-center flex-wrap mt-6 gap-12 items-baseline">
        {Languages.map((image, index) => (
          <IndividualSkill
            key={index}
            name={image.skill_name}
            src={image.Image}
            width={image.width}
            height={image.height}
            index={index}
          />
        ))}
      </div>

      <div className="flex flex-row justify-center flex-wrap mt-6 gap-12 items-baseline">
        {FrontendSkills.map((image, index) => (
          <IndividualSkill
            key={index}
            name={image.skill_name}
            src={image.Image}
            width={image.width}
            height={image.height}
            index={index + Languages.length}
          />
        ))}
      </div>

      <div className="flex flex-row justify-center flex-wrap mt-6 gap-12 items-baseline">
        {BackendSkills.map((image, index) => (
          <IndividualSkill
            key={index}
            name={image.skill_name}
            src={image.Image}
            width={image.width}
            height={image.height}
            index={index + Languages.length + FrontendSkills.length}
          />
        ))}
      </div>

      {/* Languages, Frontend Dev, Backend Dev, Full stack, Cloud */}
    </div>
  );
}
