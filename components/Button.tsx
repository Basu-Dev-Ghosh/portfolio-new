"use client";
import React from "react";
import { twMerge } from "tailwind-merge";
type ButtonProps = {
  fill: boolean;
  text: string;
  className?: string | undefined;
  icon: React.ReactNode;
  onClick?: () => void;
  type?: "submit" | "reset" | "button" | undefined;
};

const Button = ({
  fill,
  text,
  className,
  icon,
  onClick,
  type,
}: ButtonProps) => {
  return (
    <button
      {...(onClick && { onClick })}
      className={twMerge(
        className,
        `flex items-center justify-center ${
          fill
            ? "bg-[#0013BA] transition-all hover:bg-[#2e3583]"
            : "border border-white text-white "
        } font-bold`
      )}
    >
      {icon}
      {text}
    </button>
  );
};

export default Button;
