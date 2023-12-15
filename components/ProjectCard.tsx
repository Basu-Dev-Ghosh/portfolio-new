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
      className={`h-auto items-center justify-center max-w-full flex flex-col mt-3   ${
        variant === "left" ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      <Image
        src={project.pic}
        width={250}
        height={250}
        alt="Picture of the project"
      />
      <div className="w-full mt-4 text-center md:text-left md:mt-0 md:w-2/4 md:p-4">
        <h1 className="text-lg font-semibold">{project.name}</h1>
        <p className="text-[.8rem] break-words md:w-[180px] mt-1">
          {project.description}
        </p>
        <div className="flex mt-3 justify-center items-center md:justify-start flex-wrap">
          {project.skills
            .filter((_, i) => i < 3)
            .map((skill, i) => (
              <div
                key={i}
                className="w-auto py-1 px-2 text-xs border border-black rounded-xl font-semibold mr-2 mt-2"
              >
                {skill}
              </div>
            ))}
        </div>
        <div className="flex items-center mt-4">
          <Button
            onClick={() => window.open(project.live_link, "_blank")}
            icon={<FaExternalLinkAlt className="mr-2 text-xs" />}
            fill
            text={"Demo"}
            className="w-24 py-1 px-4 mr-2 text-sm"
          />
          <Button
            onClick={() => window.open(project.github_link, "_blank")}
            icon={<AiFillGithub className="mr-2 " />}
            fill={false}
            text={"Code"}
            className="w-24 py-1 px-4 m-2 text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
