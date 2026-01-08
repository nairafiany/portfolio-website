"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

import GitHubIcon from "../../../public/github-icon.svg";
import LinkedInIcon from "../../../public/linkedin-icon.svg";
import { HiEnvelope } from "react-icons/hi2";
const EmailSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const endpoint = "/api/send";

    const data = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(endpoint, options);
      const result = await response.json();

      if (response.status === 200) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus(null), 3000);
      } else {
        setStatus("error");
        console.error("Error sending email:", result);
        alert("Gagal mengirim email: " + (result.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setStatus("error");
    }
  };

  const buttonBaseClass =
    "mt-2 w-full py-3 rounded-lg font-bold text-white transition-all duration-300";
  const buttonStateClass =
    status === "success"
      ? "bg-emerald-600 cursor-default"
      : "bg-emerald-500 hover:bg-emerald-600 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]";

  return (
    <section
      id="contact"
      className="relative grid md:grid-cols-2 gap-12 py-24 px-6 max-w-6xl mx-auto z-10"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-900/20 rounded-full blur-[100px] -z-10" />

      <div className="flex flex-col justify-center">
        <ScrollReveal variant="fade-up">
          <h5 className="text-4xl font-extrabold text-white mb-4 tracking-tight">
            Let’s Connect
          </h5>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.2}>
          <p className="text-[#ADB7BE] text-lg leading-relaxed max-w-md mb-8">
            My inbox is always open! Whether you want to discuss a potential
            project, ask a question, or simply say hello, I'd love to hear from
            you. I'm currently available for new opportunities.
          </p>
        </ScrollReveal>

        <ScrollReveal variant="zoom-in" delay={0.4}>
          <div className="flex gap-6">
            <Link
              href="https://github.com/nairafiany"
              target="_blank"
              className="group relative"
            >
              <div className="absolute inset-0 bg-emerald-500 rounded-full blur opacity-0 group-hover:opacity-50 transition duration-300"></div>
              <Image
                src={GitHubIcon}
                alt="GitHub"
                width={40}
                height={40}
                className="relative z-10 hover:scale-110 transition-transform duration-300"
              />
            </Link>

            <Link
              href="https://www.linkedin.com/in/nairafiany/"
              target="_blank"
              className="group relative"
            >
              <div className="absolute inset-0 bg-emerald-500 rounded-full blur opacity-0 group-hover:opacity-50 transition duration-300"></div>
              <Image
                src={LinkedInIcon}
                alt="LinkedIn"
                width={40}
                height={40}
                className="relative z-10 hover:scale-110 transition-transform duration-300"
              />
            </Link>
            <Link
              href="mailto:naira.afiany@gmail.com"
              className="group relative"
            >
              <div className="absolute inset-0 bg-emerald-500 rounded-full blur opacity-0 group-hover:opacity-50 transition duration-300"></div>
              <HiEnvelope className="relative z-10 w-[45px] h-[45px] text-[#ADB7BE] hover:text-white hover:scale-110 transition-all duration-300" />
            </Link>
          </div>
        </ScrollReveal>
      </div>

      {/* RIGHT SIDE: Form */}
      <ScrollReveal variant="fade-up" delay={0.5} className="relative">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 bg-[#121212] border border-[#33353F] rounded-xl p-8 shadow-lg hover:border-emerald-500/50 transition-colors duration-500"
        >
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-white mb-2 block"
            >
              Your Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="joe@google.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block p-2.5 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-300"
            />
          </div>

          <div>
            <label
              htmlFor="subject"
              className="text-sm font-medium text-white mb-2 block"
            >
              Subject
            </label>
            <input
              type="text"
              name="name"
              placeholder="Just saying hi"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block p-2.5 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-300"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="text-sm font-medium text-white mb-2 block"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows={4}
              placeholder="Let's talk about..."
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block p-2.5 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-300 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className={`${buttonBaseClass} ${buttonStateClass}`}
          >
            {status === "sending" ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending...
              </span>
            ) : status === "success" ? (
              "Message Sent!"
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      </ScrollReveal>
    </section>
  );
};

export default EmailSection;
