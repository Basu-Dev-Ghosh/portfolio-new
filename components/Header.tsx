import React from "react";
import Logo from "./logo";
import Links from "./Links";

const Header = () => {
  return (
    <div className=" p-4 z-50 flex items-center sm:px-12 md:px-32 justify-between w-full sticky top-0 bg-[#0013BA] md:bg-transparent text-white md:text-black">
      <Logo />
      <Links />
    </div>
  );
};

export default Header;
