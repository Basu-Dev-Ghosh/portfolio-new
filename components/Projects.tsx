"use client";
import { debounce } from "lodash";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects.data";

const Projects = () => {
  const [page, setPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
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
      setLoading(false);
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
    setLoading(false);
  }, [searchText]);
  const debouncedSearch = debounce(async (value) => {
    setSearchText(value);
  }, 500);
  return (
    <section className="flex flex-col min-h-screen  items-center px-8 md:px-20 py-10">
      <div className="md:w-[60%] w-full flex flex-col items-center md:flex-row md:justify-between md:mt-16">
        <h1 className="font-bold text-4xl mb-4 md:mb-0 md:mr-10 text-white ">
          Projects
        </h1>
        <div className="form__group field flex-1">
          <input
            type="input"
            className="form__field"
            placeholder="Name"
            required
            onChange={(e) => {
              setLoading(true);
              debouncedSearch(e.target.value);
            }}
          />
          <label htmlFor="name" className="form__label">
            <FaSearch className="text-sm text-slate-400 mx-6" size={20} />
            <p>Search projects, skills</p>
          </label>
        </div>
      </div>
      {loading ? (
        <div className="loader mt-20">
          <div data-glitch="Loading..." className="glitch">
            Loading...
          </div>
        </div>
      ) : (
        <div className="mt-10">
          {data.length === 0 && (
            <p className="text-4xl text-white font-semibold">
              No projects found
            </p>
          )}
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
      )}
      {!loading && data && data.length !== 0 && (
        <div className="mt-20 flex flex-wrap">
          {Array(totalPage)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                onClick={() => {
                  setPage(i + 1);
                  window.scrollTo({ top: 500, left: 0, behavior: "smooth" });
                }}
                className={`${
                  page === i + 1
                    ? "bg-[#0013BA] text-white scale-150"
                    : "border border-white text-white"
                } w-8 h-8 rounded-full  grid place-items-center ml-4 cursor-pointer`}
              >
                {i + 1}
              </div>
            ))}
        </div>
      )}
    </section>
  );
};

export default Projects;
