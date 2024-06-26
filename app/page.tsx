import Buttons from "@/components/Buttons";
import Chatbot from "@/components/Chatbot";
import Contact from "@/components/Contact";
import Projects from "@/components/Projects";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <section className="flex flex-col  items-center  px-20 py-4">
        <div className="rounded-full p-1 bg-[#0013BA] overflow-hidden">
          <Image
            src="/profile.png"
            className="rounded-full"
            width={160}
            height={160}
            alt="Picture of the author"
          />
        </div>
        <div className="flex flex-col justify-center text-center w-auto mt-4 ">
          <h1 className="font-bold text-4xl md:text-4xl text-white">
            Hi, I am Basudev
          </h1>
          <p className="mt-1 text-xl md:text-xl font-semibold text-white">
            Full stack developer
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between  w-auto mt-6 ">
          <Buttons />
        </div>
      </section>

      <Projects />
      <Contact />
      <Chatbot />
    </main>
  );
}
