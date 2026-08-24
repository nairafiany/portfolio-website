"use client";

import React, { useState } from "react";
import {
  FaArrowRight,
  FaCheck,
  FaCopy,
  FaEnvelope,
  FaLinkedin,
} from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";

export default function ContactCard() {
  const [status, setStatus] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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
    <div className="contact-board-shell w-full h-full overflow-y-auto custom-scrollbar pb-32 md:pb-5 px-2 sm:px-4 pt-7 md:pt-2 text-[#29263b]">
      <div className="contact-board grid gap-4 md:gap-5 max-w-[900px] min-h-full mx-auto">
        <section className="contact-intro-slip relative self-start pt-2 md:pt-4">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="contact-mascot group relative shrink-0 w-16 h-14 bg-[#ff9b8f] border-2 border-[#29263b] rounded-[48%_52%_42%_58%] shadow-[4px_5px_0_#29263b] flex flex-col items-center justify-center rotate-[-3deg]"
              aria-hidden="true"
            >
              <div className="face">
                <span className="face-eye" />
                <span className="face-eye" />
              </div>
              <span className="face-mouth mt-1" />
              <span className="contact-mascot-bubble">Hello world!</span>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 bg-[#e3f5eb] border border-[#247a60] rounded-full px-2.5 py-1 text-[8px] font-black tracking-[.11em] text-[#225f4b]">
                  <i className="w-1.5 h-1.5 rounded-full bg-[#35a875] animate-pulse" />{" "}
                  INBOX OPEN
                </span>
              </div>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-[-.045em] leading-none">
            Come say hello!
          </h2>
          <p className="text-xs sm:text-sm text-[#5f676b] mt-3 max-w-sm leading-relaxed">
            Have an idea, opportunity, or just want to chat? I&apos;d love to
            hear from you.
          </p>
          <a
            href="mailto:naira.afiany@gmail.com"
            className="inline-flex items-center gap-2 mt-4 text-xs font-black text-[#247a60] hover:underline underline-offset-4"
          >
            <FaEnvelope /> naira.afiany@gmail.com
          </a>
        </section>

        <motion.section
          whileHover={{ y: -3, rotate: -0.35 }}
          transition={{ type: "spring", stiffness: 250, damping: 20 }}
          className="contact-postcard relative bg-[#fff8df] border-[3px] border-[#29263b] shadow-[7px_8px_0_#29263b] rounded-[8px_4px_7px_5px] p-5 sm:p-6"
        >
          <div className="postcard-halftone" aria-hidden="true" />
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <p className="text-[8px] font-black tracking-[.18em] text-[#d9564b]">
                SEND A MESSAGE
              </p>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight mt-1">
                What&apos;s on your mind?
              </h3>
              <p className="text-[9px] font-bold text-[#5f676b] mt-1">
                I&apos;ll get back to you as soon as I can.
              </p>
            </div>
            <div className="postage-stamp" aria-hidden="true">
              <FaEnvelope />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="relative z-10 grid gap-3.5">
            <label className="postcard-field">
              <span>Name</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </label>
            <label className="postcard-field">
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </label>
            <label className="postcard-field">
              <span>Message</span>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                placeholder="Hello Naira..."
                required
              />
            </label>
            <button
              disabled={status === "sending" || status === "success"}
              className={`postcard-send justify-self-end flex items-center gap-2 border-2 border-[#29263b] px-4 py-2 rounded-sm font-black text-xs shadow-[3px_3px_0_#29263b] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all ${status === "success" ? "bg-[#82d9b8]" : status === "error" ? "bg-[#ff9b8f]" : "bg-[#ffd66b]"}`}
            >
              {status === "sending"
                ? "Sending..."
                : status === "success"
                  ? "Sent!"
                  : status === "error"
                    ? "Try again"
                    : "Send message"}
              <FaArrowRight />
            </button>
          </form>
        </motion.section>

        <motion.a
          href="https://linkedin.com/in/nairafiany"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ x: 3, rotate: 0.5 }}
          transition={{ type: "spring", stiffness: 260, damping: 21 }}
          className="contact-business-card group bg-[#dceff0] border-2 border-[#29263b] shadow-[5px_5px_0_#29263b] rounded-[7px_12px_8px_10px] p-4 flex items-center justify-between gap-4"
        >
          <div className="text-left">
            <p className="text-[8px] font-black tracking-[.15em] text-[#277b8b]">
              LET&apos;S CONNECT
            </p>
            <h3 className="text-sm font-black mt-1">Naira Shafiqa Afiany</h3>
            <p className="text-[10px] font-semibold text-[#5f676b] mt-0.5">
              Full-stack Developer
            </p>
            <span className="inline-flex items-center gap-1.5 text-xs font-black mt-3">
              Connect on LinkedIn{" "}
              <FaArrowRight className="transition-transform group-hover:translate-x-1" />
            </span>
          </div>
          <FaLinkedin className="text-[#277b8b] text-3xl shrink-0" />
        </motion.a>

        <div className="contact-small-objects grid grid-cols-1 gap-3">
          <motion.div
            whileHover={{ x: -2 }}
            className="portfolio-ticket relative bg-[#fffdf7] border-2 border-[#29263b] shadow-[4px_4px_0_#29263b] rounded-sm p-3 text-left"
          >
            <span className="ticket-perforation" aria-hidden="true" />
            <p className="text-[8px] font-black tracking-[.15em] text-[#d9564b]">
              SHARE MY PORTFOLIO
            </p>
            <p className="text-[10px] font-bold mt-1">Copy the link</p>
            <div className="flex items-center gap-2 mt-2">
              <code className="min-w-0 flex-1 truncate text-[10px] text-[#5f676b]">
                nairafiany.com
              </code>
              <button
                onClick={handleCopyLink}
                className={`shrink-0 border-2 border-[#29263b] rounded-sm p-2 shadow-[2px_2px_0_#29263b] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all ${isCopied ? "bg-[#82d9b8]" : "bg-[#ffd66b]"}`}
                aria-label="Copy portfolio link"
              >
                {isCopied ? <FaCheck size={12} /> : <FaCopy size={12} />}
              </button>
            </div>
            <AnimatePresence>
              {isCopied && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
                  animate={{ opacity: 1, scale: 1, rotate: -3 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="copied-stamp"
                >
                  Copied!
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
