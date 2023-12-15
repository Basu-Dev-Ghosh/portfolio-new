import React from "react";
import Logo from "./logo";
import Links from "./Links";

const Header = () => {
  return (
    <div className=" p-6 z-50 flex items-center sm:px-12 md:px-32 justify-between w-full sticky top-0 bg-blue-700 md:bg-transparent text-white md:text-black">
      <Logo />
      <Links />
    </div>
  );
};

export default Header;
