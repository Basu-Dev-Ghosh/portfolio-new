"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { TextGenerateEffect } from "./ui/text-generate-effect";
const variants = {
  open: { scale: [0, 1], x: [400, 0] },
  closed: { scale: [1, 0], x: [0, 400] },
};
const emptyInputMessages = [
  "Your message took a vacation, try again!",
  "Did a ghost just type that? I see nothing!",
  "Your message is on a secret mission, can't see it!",
  "Message not found. Insert coin to try again.",
  "Your message is practicing its camouflage skills!",
  "Error 404: Message not found!",
  "Your message is shy, try to encourage it!",
  "Your message is out of the office, please type again later.",
  "Your message is playing invisible man, try again!",
  "Your message decided to be a mime, type again!",
];
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<
    {
      role: string;
      message: string;
    }[]
  >([
    {
      role: "basu",
      message: "Hey Buddy, Whats up!!",
    },
  ]);
  async function sentMessage(e: any) {
    e.preventDefault();
    if (message === "") {
      const randomMessage =
        emptyInputMessages[
          Math.floor(Math.random() * emptyInputMessages.length)
        ];
      setMessages([...messages, { role: "basu", message: randomMessage }]);
    }

    try {
      setMessages([
        ...messages,
        {
          role: "user",
          message,
        },
      ]);
      setMessage("");
      setIsLoading(true);
      const response = await fetch(
        `https://portfolio-chatbot-server.onrender.com/ask?question=${encodeURIComponent(
          message
        )}`
      );
      const data = await response.json();
      setMessages((oldMessages) => {
        return [
          ...oldMessages,
          {
            role: "basu",
            message: data,
          },
        ];
      });
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      setMessages((oldMessages) => {
        return [
          ...oldMessages,
          {
            role: "basu",
            message: "Oops! Sorry there is some problem in my side",
          },
        ];
      });
    }
  }
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);
  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 inline-flex items-center justify-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50 border rounded-full w-16 h-16 bg-black hover:bg-gray-700 m-0 cursor-pointer border-gray-200 bg-none p-0 normal-case leading-5 hover:text-gray-900"
        type="button"
        aria-haspopup="dialog"
        aria-expanded="false"
        data-state="closed"
      >
        <svg
          xmlns=" http://www.w3.org/2000/svg"
          width={30}
          height={40}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white block border-gray-200 align-middle"
        >
          <path
            d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"
            className="border-gray-200"
          ></path>
        </svg>
      </button>
      <motion.div
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        style={{
          boxShadow: "0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05)",
        }}
        className={`fixed ${
          isOpen ? "block" : "hidden"
        } overflow-hidden  bottom-[calc(4rem+1.5rem)] right-0 mr-4 bg-white  rounded-lg border border-[#e5e7eb] w-[90%] md:w-[400px] h-[460px] md:h-[440px]`}
      >
        {/* Heading */}
        <div className="flex flex-col space-y-1.5 pb-6 p-6">
          <h2 className="font-semibold text-lg tracking-tight">
            Hi, I am Basu
          </h2>
          <p className="text-gray-600 text-sm">
            Ask me anything about me (Not personal obviously).
          </p>
        </div>
        {/* Chat Container */}
        <div className="overflow-x-hidden  h-[66%] overflow-y-auto p-4">
          {messages.map((message, index) =>
            message.role === "basu" ? (
              <div
                className="flex gap-2 my-4 text-gray-600 text-sm flex-1"
                key={index}
              >
                <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                  <div className="rounded-full bg-gray-100 border p-1">
                    <Image
                      src="/profile.png"
                      alt="Profile Picture"
                      fill
                      className="w-full h-full rounded-full"
                    />
                  </div>
                </span>
                <div className="leading-relaxed">
                  <span className="block font-bold text-gray-700">Basu</span>
                  {isOpen && <TextGenerateEffect words={message.message} />}
                </div>
              </div>
            ) : (
              <div
                className="flex gap-2 justify-end my-4 text-gray-600 text-sm flex-1"
                key={index}
              >
                <div className="leading-relaxed">
                  <span className="block font-bold text-gray-700 text-right">
                    You{" "}
                  </span>
                  {message.message}
                </div>
                <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                  <div className="rounded-full bg-gray-100 border p-1">
                    <svg
                      stroke="none"
                      fill="black"
                      strokeWidth={0}
                      viewBox="0 0 16 16"
                      height={20}
                      width={20}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"></path>
                    </svg>
                  </div>
                </span>
              </div>
            )
          )}
          {isLoading && (
            <div className="flex gap-2 my-4 text-gray-600 text-sm flex-1">
              <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                <div className="rounded-full bg-gray-100 border p-1">
                  <Image
                    src="/profile.png"
                    alt="Profile Picture"
                    fill
                    className="w-full h-full rounded-full"
                  />
                </div>
              </span>
              <div className="leading-relaxed">
                <span className="block font-bold text-gray-700">Basu</span>
                <div className="dots"></div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
        {/* Input box  */}
        <div className="flex items-center pt-0 absolute bottom-2 w-full mx-auto px-2">
          <form
            className="flex items-center justify-between w-full"
            onSubmit={sentMessage}
          >
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex h-12 flex-1 rounded-md mr-2 border border-[#e5e7eb] px-3 py-3 text-sm placeholder-[#6b7280] focus:outline-none   disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] f"
              placeholder="Type your message"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-[#111827E6] h-10 px-4 py-3"
            >
              Send
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Chatbot;
