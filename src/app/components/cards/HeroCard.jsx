"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaCode,
  FaLayerGroup,
  FaReact,
  FaDatabase,
} from "react-icons/fa6";

export default function HeroCard({ onContactClick }) {
  const [isHovering, setIsHovering] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    let timer;
    if (isHovering) {
      setShowMessage(false);
      timer = setTimeout(() => {
        setShowMessage(true);
      }, 600);
    } else {
      setShowMessage(false);
    }
    return () => clearTimeout(timer);
  }, [isHovering]);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center md:justify-between h-full w-full gap-8 md:gap-10 lg:gap-16 px-4 sm:px-6 md:px-8 lg:px-0">
      <div className="flex-1 flex flex-col justify-center text-center md:text-left order-2 md:order-1 w-full relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-sm mb-4 md:mb-6 hover:scale-105 transition-transform cursor-default select-none">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] md:text-xs font-medium text-emerald-300 tracking-wide">
              Available for work
            </span>
          </div>

          <h1 className="font-extrabold tracking-tight text-white mb-2 md:mb-3 leading-tight">
            <span className="text-lg sm:text-2xl md:text-3xl lg:text-4xl block mb-1 md:mb-2">
              Hi, I'm
            </span>

            <span className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent whitespace-nowrap pb-1 md:pb-2">
              Naira Shafiqa Afiany
            </span>
          </h1>

          <div className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 h-[24px] sm:h-[28px] md:h-[32px] lg:h-[40px] flex items-center justify-center md:justify-start mb-4 md:mb-6 font-medium">
            <TypeAnimation
              sequence={[
                "Information Systems Student",
                2000,
                "Fullstack Developer",
                2000,
                "AI Enthusiast",
                2000,
              ]}
              speed={50}
              repeat={Infinity}
              wrapper="span"
            />
          </div>

          <p className="text-gray-400 leading-relaxed max-w-lg mx-auto md:mx-0 text-xs sm:text-sm md:text-sm lg:text-base mb-6 md:mb-8 hidden sm:block">
            Passionate about building scalable and reliable systems to solve
            problems. I'm very dedicated to continuous learning and mastering
            new skills.
          </p>

          <p className="text-gray-400 leading-relaxed max-w-lg mx-auto md:mx-0 text-xs mb-6 block sm:hidden">
            Passionate about building scalable systems and mastering new skills.
          </p>

          <div className="flex gap-3 justify-center md:justify-start items-center">
            <button
              onClick={onContactClick}
              className="px-5 py-2.5 rounded-xl bg-white text-black font-bold hover:scale-105 transition-transform text-xs sm:text-sm md:text-sm lg:text-base shadow-lg hover:shadow-xl"
            >
              Contact Me
            </button>

            <div className="flex gap-2">
              <a
                href="https://github.com/nairafiany"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-gray-800 text-gray-300 hover:bg-emerald-900/50 hover:text-emerald-400 transition-all hover:-translate-y-1"
                aria-label="GitHub Profile"
              >
                <FaGithub size={18} className="md:w-5 md:h-5" />
              </a>
              <a
                href="https://linkedin.com/in/nairafiany"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-gray-800 text-gray-300 hover:bg-blue-900/50 hover:text-blue-400 transition-all hover:-translate-y-1"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin size={18} className="md:w-5 md:h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div
        className="flex-1 relative w-full max-w-[180px] sm:max-w-[240px] md:max-w-[280px] lg:max-w-[380px] aspect-square order-1 md:order-2 shrink-0 flex flex-col justify-center my-0 group perspective-1000"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <AnimatePresence>
          {isHovering && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 cursor-pointer hidden md:block"
              onClick={onContactClick}
            >
              <div className="relative bg-white text-black px-5 py-3 rounded-2xl shadow-xl border border-gray-100 flex items-center justify-center min-w-[80px] min-h-[46px]">
                {!showMessage ? (
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                  </div>
                ) : (
                  <TypeAnimation
                    sequence={["Well hello! this is me."]}
                    wrapper="span"
                    speed={20}
                    cursor={false}
                    className="font-medium text-sm whitespace-nowrap"
                  />
                )}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-white"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 rounded-full blur-[40px] md:blur-[60px] opacity-30 animate-pulse"></div>

        <div className="relative w-full h-full rounded-[2rem] overflow-hidden border-4 border-[#1a1a1a] shadow-2xl rotate-0 md:rotate-3 group-hover:md:rotate-0 transition-all duration-500 z-10">
          <Image
            src="/images/naira_pic.jpeg"
            alt="Naira Shafiqa Afiany"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 180px, (max-width: 1024px) 280px, 380px"
          />
        </div>

        <div className="absolute -right-6 top-8 hidden md:flex items-center justify-center w-10 h-10 lg:w-14 lg:h-14 bg-[#1a1a1a] rounded-2xl shadow-lg border border-gray-800 z-20 animate-bounce duration-[6000ms]">
          <FaCode className="text-lg lg:text-2xl text-emerald-500" />
        </div>
        <div className="absolute -right-2 bottom-12 hidden md:flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 bg-[#1a1a1a] rounded-full shadow-lg border border-gray-800 z-20 animate-bounce duration-[7000ms] delay-[1500ms]">
          <FaLayerGroup className="text-base lg:text-xl text-blue-500" />
        </div>
        <div className="absolute -left-6 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 bg-[#1a1a1a] rounded-full shadow-lg border border-gray-800 z-20 animate-bounce duration-[8000ms] delay-[3000ms]">
          <FaReact className="text-base lg:text-xl text-sky-500 rotate-[30deg]" />
        </div>
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center w-10 h-10 lg:w-14 lg:h-14 bg-[#1a1a1a] rounded-2xl shadow-lg border border-gray-800 z-20 animate-bounce duration-[6500ms] delay-[4500ms]">
          <FaDatabase className="text-lg lg:text-2xl text-orange-500" />
        </div>

        <div className="absolute -right-12 top-1/2 -translate-y-1/2 hidden lg:block opacity-20">
          <div className="grid grid-cols-2 gap-2">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-gray-500"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
