"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Make sure these paths are correct for your project
import GitHubIcon from "../../../public/github-icon.svg";
import LinkedInIcon from "../../../public/linkedin-icon.svg";

const EmailSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState(null); // null, "sending", "success", "error"

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const endpoint = "/api/send"; // Pastikan ini sesuai nama folder di app/api/..

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

  return (
    <section
      id="contact"
      className="relative grid md:grid-cols-2 gap-12 py-24 px-6 max-w-6xl mx-auto z-10"
    >
      {/* Decorative Background Blob - Adds depth behind the form */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-900/20 rounded-full blur-[100px] -z-10" />

      {/* LEFT SIDE: Content */}
      <div className="flex flex-col justify-center">
        <h5 className="text-4xl font-extrabold text-white mb-4 tracking-tight">
          Let’s Connect
        </h5>

        <p className="text-[#ADB7BE] text-lg leading-relaxed max-w-md mb-8">
          I’m currently looking for new opportunities. Whether you have a
          question, a project collaboration, or just want to say hi, my inbox is
          always open!
        </p>

        <div className="flex gap-6">
          <Link
            href="https://github.com/username"
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
            href="https://linkedin.com/in/username"
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
        </div>
      </div>

      {/* RIGHT SIDE: Form */}
      <div className="relative">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 bg-[#121212] border border-[#33353F]
                     rounded-xl p-8 shadow-lg hover:border-emerald-500/50 transition-colors duration-500"
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
              className="w-full bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block p-2.5 
                       focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-300"
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
              name="name" // reusing name field for subject often works better for general forms, or add a subject field to state
              placeholder="Just saying hi"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block p-2.5 
                       focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-300"
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
              className="w-full bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block p-2.5 
                       focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-300 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className={`
              mt-2 w-full py-3 rounded-lg font-bold text-white transition-all duration-300
              ${
                status === "success"
                  ? "bg-emerald-600 cursor-default"
                  : "bg-emerald-500 hover:bg-emerald-600 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
              }
            `}
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
      </div>
    </section>
  );
};

export default EmailSection;
