"use client";
import React from "react";
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
const Links = () => {
  return (
    <div className="flex cursor-pointer items-center md:justify-evenly justify-around text-2xl w-28 md:w-36 ">
      <FaInstagram
        className="text-white hover:scale-95 transition-all duration-150 ease-in-out active:scale-90"
        onClick={() =>
          window.open(
            "https://www.instagram.com/basudev___ghosh?igshid=MmVlMjlkMTBhMg==",
            "_blank"
          )
        }
      />
      <FaGithub
        className="text-white hover:scale-95 transition-all duration-150 ease-in-out active:scale-90"
        onClick={() =>
          window.open("https://github.com/Basu-Dev-Ghosh", "_blank")
        }
      />
      <FaLinkedin
        className="text-white hover:scale-95 transition-all duration-150 ease-in-out active:scale-90"
        onClick={() =>
          window.open("https://www.linkedin.com/in/basudev-ghosh/", "_blank")
        }
      />
    </div>
  );
};

export default Links;
