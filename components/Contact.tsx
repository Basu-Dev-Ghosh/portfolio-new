"use client";
import React, { useState } from "react";
import Button from "./Button";
import { BsSendFill } from "react-icons/bs";
import { generateEmailBody, sendEmail } from "@/nodemailer";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    phone: "",
    problem: "",
  });
  async function sendmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const emailTemplate: { subject: string; body: string } =
      await generateEmailBody(user);
    try {
      const isSent = await sendEmail(user, emailTemplate);
      if (isSent) alert("Email sent successfully");
      setUser({
        name: "",
        email: "",
        phone: "",
        problem: "",
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      alert("Email sent failed");
    }
  }
  return (
    <section className="flex flex-col  items-center px-20 py-10">
      <div className=" flex flex-col-reverse justify-center items-center md:flex-row md:justify-between ">
        <h1 className="font-semibold text-4xl mb-4 md:mb-0 text-white">
          Contact
        </h1>
      </div>
      <form
        autoComplete="off"
        className="flex flex-col justify-center w-[80%] md:w-[40%] mt-6"
        onSubmit={sendmail}
      >
        <input
          type="text"
          required
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          className="border border-black p-2 rounded-md mt-4"
          placeholder="Full name"
        />
        <input
          type="email"
          required
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="border border-black p-2 rounded-md mt-4"
          placeholder="Email"
        />
        <input
          type="text"
          required
          pattern="^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$"
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
          className="border border-black p-2 rounded-md mt-4"
          placeholder="Phone no"
        />
        <textarea
          rows={4}
          required
          onChange={(e) => setUser({ ...user, problem: e.target.value })}
          className="border border-black p-2 rounded-md mt-4"
          placeholder="Your problem"
        />
        <Button
          type="submit"
          fill
          icon={<BsSendFill className="mr-2" />}
          text={loading ? "Sending..." : "Send"}
          className=" text-white p-2 rounded-md mt-4 font-semibold"
        />
      </form>
    </section>
  );
};

export default Contact;
