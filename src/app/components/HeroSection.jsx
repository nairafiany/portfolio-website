"use client";

import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import ScrollReveal from "./ScrollReveal";

const TypeAnimation = dynamic(
  () => import("react-type-animation").then((mod) => mod.TypeAnimation),
  { ssr: false }
);

const HeroSection = () => {
  return (
    <section className="px-4 sm:px-6 lg:px-8 pt-24 sm:py-16 lg:py-28 overflow-x-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-8 items-center">
        <div className="col-span-12 lg:col-span-7 text-center lg:text-left order-1 lg:order-1">
          <ScrollReveal variant="fade-up">
            <h1 className="mb-4 font-extrabold text-3xl sm:text-5xl lg:text-6xl leading-tight">
              <span className="bg-gradient-to-r from-emerald-700 via-emerald-400 to-teal-300 bg-clip-text text-transparent">
                Hello, I&apos;m
              </span>
              <br />
              <div className="h-[50px] sm:h-[60px] lg:h-[80px] inline-block">
                <TypeAnimation
                  sequence={[
                    "Naira Shafiqa Afiany",
                    2000,
                    "a Web Developer",
                    2000,
                    "an IS Student",
                    2000,
                    "an AI Enthusiast",
                    2000,
                  ]}
                  speed={60}
                  repeat={Infinity}
                  wrapper="span"
                  className="text-white"
                />
              </div>
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.2}>
            <p className="text-[#ADB7BE] text-sm sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-6">
              A curious third-year Information Systems student and aspiring
              developer. Constantly learning and refining skills through
              hands-on exploration.
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full sm:w-fit mx-auto lg:mx-0">
              <button className="px-6 py-3 w-full sm:w-auto rounded-full font-semibold text-white bg-gradient-to-r from-emerald-500 via-green-400 to-teal-400 shadow-[0_0_20px_rgba(16,185,129,0.6)] hover:shadow-[0_0_30px_rgba(16,185,129,0.9)] hover:scale-105 transition-all duration-300">
                Hire Me
              </button>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal
          variant="spin-in"
          delay={0.5}
          className="col-span-12 lg:col-span-5 flex justify-center relative group order-2 lg:order-2"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[340px] sm:w-[280px] sm:h-[380px] lg:w-[320px] lg:h-[420px] bg-gradient-to-tr from-emerald-600/40 via-teal-500/40 to-green-400/30 rounded-[3rem] blur-[30px] -z-10 animate-pulse transition-all duration-500 group-hover:blur-[50px] group-hover:opacity-100 opacity-80"></div>

          <div className="relative rounded-[2.5rem] bg-[#181818] w-[240px] h-[340px] sm:w-[280px] sm:h-[380px] lg:w-[320px] lg:h-[420px] overflow-hidden border-2 border-white/10 shadow-xl shadow-emerald-500/20 transition-all duration-500 ease-in-out group-hover:-translate-y-4 group-hover:shadow-2xl group-hover:shadow-emerald-500/40 group-hover:border-emerald-500/50">
            <Image
              src="/images/naira_pic.jpeg"
              alt="Naira profile picture"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
              priority
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default HeroSection;
