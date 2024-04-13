"use client";
import React from "react";
import Button from "./Button";
import { FaPhoneAlt, FaExternalLinkAlt } from "react-icons/fa";
const Buttons = () => {
  return (
    <>
      <Button
        onClick={() => {
          window.scrollTo({ top: 300, left: 0, behavior: "smooth" });
        }}
        icon={<FaExternalLinkAlt className="mr-3 text-white" />}
        fill={false}
        text={"View projects"}
        className="py-3 px-6 m-2 w-[188px] md:w-50 text-white"
      />
      <Button
        onClick={() => {
          window.scrollTo({ top: 2200, left: 0, behavior: "smooth" });
        }}
        icon={<FaPhoneAlt className="mr-3 text-white" />}
        fill
        text={"Contact me"}
        className="py-3 px-6 m-2 w-[188px] md:w-50 text-white"
      />
    </>
  );
};

export default Buttons;
