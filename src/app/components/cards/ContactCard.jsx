"use client";
import React, { useState } from "react";
import {
  FaEnvelope,
  FaLinkedin,
  FaLink,
  FaCheck,
  FaCopy,
} from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactCard() {
  const [status, setStatus] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isCopied, setIsCopied] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }

    setTimeout(() => setStatus(null), 3000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText("www.nairafiany.com");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-start md:justify-center overflow-y-auto custom-scrollbar pb-32 md:pb-0 px-4 pt-16 md:pt-0">
      <div className="w-full md:w-1/3 flex flex-col justify-center text-center md:text-left shrink-0">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-3 text-white">
          Let's Connect
        </h2>
        <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto md:mx-0 leading-relaxed">
          Have a project in mind? My inbox is always open.
        </p>

        <div className="flex flex-row gap-4 justify-center md:justify-start mb-8">
          <a
            href="mailto:naira.afiany@gmail.com"
            className="group transition-transform hover:scale-110"
            aria-label="Send Email"
          >
            <div className="p-3 bg-emerald-900/30 rounded-full text-emerald-600 hover:bg-emerald-800/50 transition-colors shadow-sm">
              <FaEnvelope size={22} />
            </div>
          </a>

          <a
            href="https://linkedin.com/in/nairafiany"
            className="group transition-transform hover:scale-110"
            aria-label="LinkedIn Profile"
          >
            <div className="p-3 bg-blue-900/30 rounded-full text-blue-600 hover:bg-blue-800/50 transition-colors shadow-sm">
              <FaLinkedin size={22} />
            </div>
          </a>
        </div>

        <div className="w-full max-w-[300px] mx-auto md:mx-0">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2.5 flex items-center justify-center md:justify-start gap-1.5">
            Like my work? Share with a friend!
          </p>

          <div className="relative flex items-center gap-2">
            <div className="flex-1 flex items-center gap-3 bg-white/5 border border-gray-700 rounded-xl px-4 py-3 shadow-sm transition-colors hover:border-emerald-300/50">
              <FaLink className="text-gray-400 text-sm shrink-0" />
              <span className="text-sm font-mono text-gray-300 truncate selection:bg-emerald-100 selection:text-emerald-700">
                nairafiany.com
              </span>
            </div>

            <button
              onClick={handleCopyLink}
              className={`shrink-0 p-3.5 rounded-xl border transition-all duration-200 shadow-sm active:scale-95 flex items-center justify-center ${
                isCopied
                  ? "bg-emerald-500 border-emerald-500 text-white shadow-emerald-200 dark:shadow-none"
                  : "bg-white/5 border-gray-700 text-gray-500 hover:border-emerald-400 hover:text-emerald-600"
              }`}
              aria-label="Copy Link"
            >
              {isCopied ? <FaCheck size={16} /> : <FaCopy size={16} />}
            </button>

            <AnimatePresence>
              {isCopied && (
                <motion.div
                  initial={{ opacity: 0, y: 10, x: "-50%" }}
                  animate={{ opacity: 1, y: -50, x: "-50%" }}
                  exit={{ opacity: 0, y: -40 }}
                  className="absolute left-1/2 top-0 bg-gray-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg pointer-events-none whitespace-nowrap z-50"
                >
                  URL Copied!
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="w-full md:w-2/3 bg-white/5 p-4 md:p-6 rounded-2xl border border-gray-800 shadow-sm flex flex-col justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="block text-[10px] md:text-xs font-bold text-gray-500 uppercase mb-1 ml-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full bg-black border border-gray-700 rounded-xl p-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none text-white placeholder-gray-600"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] md:text-xs font-bold text-gray-500 uppercase mb-1 ml-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full bg-black border border-gray-700 rounded-xl p-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none text-white placeholder-gray-600"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] md:text-xs font-bold text-gray-500 uppercase mb-1 ml-1">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              placeholder="Hello Naira..."
              className="w-full bg-black border border-gray-700 rounded-xl p-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none resize-none text-white placeholder-gray-600"
              required
            ></textarea>
          </div>

          <button
            disabled={status === "sending" || status === "success"}
            className={`w-full font-bold py-3 rounded-xl transition-all shadow-md active:scale-[0.98] mt-1 text-sm ${
              status === "success"
                ? "bg-green-600 text-white"
                : status === "error"
                ? "bg-red-600 text-white"
                : "bg-emerald-600 hover:bg-emerald-700 text-white"
            }`}
          >
            {status === "sending"
              ? "Sending..."
              : status === "success"
              ? "Sent!"
              : status === "error"
              ? "Failed"
              : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}
