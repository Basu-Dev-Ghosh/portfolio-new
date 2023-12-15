"use client";
import { debounce } from "lodash";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects.data";

const Projects = () => {
  const [page, setPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  const [data, setData] = useState<Project[]>(projects.slice(0, 4));
  let itemsPerpage = 4;
  const totalPage = Math.ceil(projects.length / itemsPerpage);

  useEffect(() => {
    const start = (page - 1) * itemsPerpage;
    const end = page * itemsPerpage;
    const temp: Project[] = projects.slice(start, end);
    setData(temp);
  }, [page]);

  useEffect(() => {
    if (searchText === "") {
      const start = (page - 1) * itemsPerpage;
      const end = page * itemsPerpage;
      const temp: Project[] = projects.slice(start, end);
      setData(temp);
      return;
    }
    const temp = projects.filter(
      (project) =>
        project.name.toLowerCase().includes(searchText.toLowerCase()) ||
        project.skills.some((skill) =>
          skill.toLowerCase().includes(searchText.toLowerCase())
        )
    );
    setData(temp);
  }, [searchText]);
  const debouncedSearch = debounce(async (value) => {
    setSearchText(value);
  }, 300);
  return (
    <section className="flex flex-col min-h-screen  items-center px-20 py-10">
      <div className=" flex flex-col-reverse justify-center items-center md:flex-row md:justify-between ">
        <div className="border border-slate-300 p-2 flex items-center bg-white rounded-md">
          <FaSearch className="text-sm text-slate-400" />
          <input
            type="text"
            onChange={(e) => debouncedSearch(e.target.value)}
            className="focus:outline-none focus:border-none ml-2 placeholder:text-sm"
            placeholder="Search projects, skills"
          />
        </div>
        <h1 className="font-bold text-2xl mb-4 md:mb-0 md:ml-10 ">Projects</h1>
      </div>
      <div className="mt-10 ">
        {data?.map((project, i) => {
          return (
            <ProjectCard
              key={project.id}
              variant={i % 2 === 0 ? "left" : "right"}
              project={project}
            />
          );
        })}
      </div>
      <div className="mt-20 flex flex-wrap">
        {Array(totalPage)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              onClick={() => {
                setPage(i + 1);
                window.scrollTo({ top: 700, left: 0, behavior: "smooth" });
              }}
              className={`${
                page === i + 1
                  ? "bg-[#0013BA] text-white scale-125"
                  : "border border-black"
              } w-8 h-8 rounded-full  grid place-items-center ml-4 cursor-pointer`}
            >
              {i + 1}
            </div>
          ))}
      </div>
    </section>
  );
};

export default Projects;
