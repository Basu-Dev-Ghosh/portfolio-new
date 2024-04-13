import Image from "next/image";
import React from "react";
import Button from "./Button";
import { FaReact, FaExternalLinkAlt } from "react-icons/fa";
import { AiFillGithub } from "react-icons/ai";
const ProjectCard = ({
  variant,
  project,
}: {
  variant: "left" | "right";
  project: Project;
}) => {
  return (
    <div
      className={`project-border h-auto px-6 min-h-[400px] items-center justify-center max-w-full flex flex-col mt-8 pb-4  shadow-xl   ${
        variant === "left" ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      <Image
        src={project.pic}
        width={400}
        height={300}
        style={{ objectFit: "scale-down" }}
        alt="Picture of the project"
        className="md:px-6 max-h-[200px] md:max-h-[400px] py-6 md:py-4"
      />
      <div className="w-full mt-4  md:mt-0 md:w-[55%] md:p-4 text-white">
        <h1
          className={`text-xl md:text-4xl md:w-[400px] font-semibold text-center ${
            variant === "left" ? "md:text-right" : "md:text-left"
          }`}
        >
          {project.name}
        </h1>
        <p
          className={`text-[.9rem] text-center md:text-[1rem] md:w-[400px] mt-1 ${
            variant === "left" ? "md:text-right" : "md:text-left"
          }`}
        >
          {project.description}
        </p>
        <div
          className={`flex w-full mt-3 justify-center items-center ${
            variant === "left" ? "md:justify-end" : "md:justify-start"
          } flex-wrap`}
        >
          {project.skills
            .filter((_, i) => i < 3)
            .map((skill, i) => (
              <div
                key={i}
                className="w-auto py-1 px-3 text-sm md:text-md border border-[#0013BA] rounded-xl font-semibold mr-2 mt-2"
              >
                {skill}
              </div>
            ))}
        </div>
        <div
          className={`flex items-center mt-4 justify-center ${
            variant === "left" ? "md:justify-end" : "md:justify-start"
          }`}
        >
          <Button
            onClick={() => window.open(project.live_link, "_blank")}
            icon={<FaExternalLinkAlt className="mr-2 text-xs" />}
            fill
            text={"Demo"}
            className="w-32 md:w-40 py-3 px-4 mr-2 text-sm md:text-md"
          />
          <Button
            onClick={() => window.open(project.github_link, "_blank")}
            icon={<AiFillGithub className="mr-2 " />}
            fill={false}
            text={"Code"}
            className="w-32 md:w-40 py-3 px-4 m-2 text-sm md:text-md"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
