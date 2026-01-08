"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCode,
  FaSitemap,
  FaDatabase,
  FaBrain,
  FaBriefcase,
  FaChalkboardUser,
} from "react-icons/fa6";

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="flex items-center gap-3 bg-[#181818] p-3 rounded-xl border border-white/10 hover:border-emerald-500/50 transition-colors">
          <FaCode className="text-3xl text-emerald-400" />
          <div>
            <h4 className="font-semibold text-white">Programming</h4>
            <p className="text-xs text-[#ADB7BE]">Java, Python, TypeScript</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-[#181818] p-3 rounded-xl border border-white/10 hover:border-teal-500/50 transition-colors">
          <FaSitemap className="text-3xl text-teal-400" />
          <div>
            <h4 className="font-semibold text-white">System Analysis</h4>
            <p className="text-xs text-[#ADB7BE]">
              UML, DFD, ERD, Architecture
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-[#181818] p-3 rounded-xl border border-white/10 hover:border-blue-500/50 transition-colors">
          <FaDatabase className="text-3xl text-blue-400" />
          <div>
            <h4 className="font-semibold text-white">Data & Infra</h4>
            <p className="text-xs text-[#ADB7BE]">SQL, Docker, Cloud</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-[#181818] p-3 rounded-xl border border-white/10 hover:border-purple-500/50 transition-colors">
          <FaBrain className="text-3xl text-purple-400" />
          <div>
            <h4 className="font-semibold text-white">AI & Intelligence</h4>
            <p className="text-xs text-[#ADB7BE]">Machine Learning, NLP</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center bg-[#181818] p-4 rounded-xl border border-white/10 hover:border-yellow-500/50 transition-all duration-300 group">
          <div className="bg-white p-2 rounded-full h-16 w-16 flex items-center justify-center shrink-0 shadow-lg shadow-yellow-500/10 group-hover:scale-110 transition-transform duration-300">
            <Image
              src="/University_of_Indonesia_logo.svg"
              alt="University of Indonesia Logo"
              width={45}
              height={45}
              className="object-contain"
            />
          </div>

          <div className="flex-1">
            <h4 className="font-bold text-lg text-white">
              University of Indonesia
            </h4>
            <p className="text-yellow-400 font-medium">
              Undergraduate, Information Systems
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="text-xs bg-white/5 text-[#ADB7BE] px-2 py-1 rounded-md border border-white/5">
                Faculty of Computer Science
              </span>
              <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-md border border-emerald-500/10">
                Jul 2023 - Present
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Experience",
    id: "experience",
    content: (
      <div className="space-y-4">
        <div className="flex gap-4 items-start bg-[#181818] p-4 rounded-xl border border-white/10 hover:border-purple-500/50 transition-colors">
          <div className="bg-purple-500/20 p-3 rounded-full shrink-0">
            <FaBrain className="text-2xl text-purple-400" />
          </div>
          <div>
            <h4 className="font-bold text-lg text-white leading-tight">
              VPIC of Artificial Intelligence Innovation Challenge
            </h4>
            <p className="text-purple-400 font-medium mt-1">COMPFEST</p>
            <p className="text-sm text-[#ADB7BE] mt-1">Mar 2025 - Oct 2025</p>
          </div>
        </div>

        <div className="flex gap-4 items-start bg-[#181818] p-4 rounded-xl border border-white/10 hover:border-yellow-500/50 transition-colors">
          <div className="bg-yellow-500/20 p-3 rounded-full shrink-0">
            <FaChalkboardUser className="text-2xl text-yellow-400" />
          </div>
          <div>
            <h4 className="font-bold text-lg text-white leading-tight">
              Teaching Assistant of Discrete Mathematics 1
            </h4>
            <p className="text-yellow-400 font-medium mt-1">
              Faculty of Computer Science, Universitas Indonesia
            </p>
            <p className="text-sm text-[#ADB7BE] mt-1">Jul 2024 - Dec 2024</p>
          </div>
        </div>
      </div>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  const tabContentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  return (
    <section id="about" className="text-white py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 -z-10 opacity-20 transform translate-x-1/3 -translate-y-1/3">
        <div className="w-[500px] h-[500px] bg-gradient-to-br rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6 lg:px-12 relative z-10">
        <ScrollReveal
          variant="slide-left"
          className="hidden md:flex justify-center h-full"
        >
          <div className="relative group w-full max-w-[400px] aspect-[4/5]">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-emerald-500 to-teal-500 rounded-2xl blur opacity-20 group-hover:opacity-60 transition duration-500"></div>

            <div className="relative h-full w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="/images/ilya-pavlov-OqtafYT5kTw-unsplash.jpg"
                alt="About image"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-60"></div>
            </div>
          </div>
        </ScrollReveal>

        <div>
          <ScrollReveal variant="fade-up">
            <h2 className="text-4xl font-bold mb-6 flex items-center gap-3">
              About{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                Me
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.2}>
            <p className="text-[#ADB7BE] text-lg leading-relaxed mb-8 font-light">
              I am dedicated to bridging the gap between system analysis and
              hands-on development to craft scalable solutions that solve
              real-world problems.
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.4}>
            <div>
              <div className="flex space-x-1 bg-[#181818] p-1 rounded-full border border-white/10 mb-8 w-full">
                {TAB_DATA.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleTabChange(item.id)}
                    className={`
                      relative z-10 flex-1 py-2 text-sm font-semibold rounded-full transition-colors duration-300
                      ${
                        tab === item.id
                          ? "text-black"
                          : "text-gray-400 hover:text-white"
                      }
                    `}
                    style={{ WebkitTapHighlightColor: "transparent" }}
                  >
                    <span className="relative z-20">{item.title}</span>
                    {tab === item.id && (
                      <motion.span
                        layoutId="activeTab"
                        className="absolute inset-0 z-0 bg-emerald-500 rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>

              <div className="min-h-[220px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={tab}
                    variants={tabContentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {TAB_DATA.find((item) => item.id === tab)?.content}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
