"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import TabButton from "./TabButton";

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <ul className="list-disc pl-5 space-y-2">
        <li>React & Next.js</li>
        <li>Tailwind CSS</li>
        <li>Python</li>
        <li>AI & Machine Learning</li>
      </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="list-disc pl-5 space-y-2">
        <li>System Information Student</li>
        <li>University XYZ</li>
      </ul>
    ),
  },
  {
    title: "Experience",
    id: "experience",
    content: (
      <ul className="list-disc pl-5 space-y-2">
        <li>Frontend Projects with Next.js</li>
        <li>AI-related academic projects</li>
      </ul>
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

  return (
    <section id="about" className="text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center py-16 px-6 lg:px-12">
        {/* Image */}
        <div className="flex justify-center">
          <Image
            src="/images/ilya-pavlov-OqtafYT5kTw-unsplash.jpg"
            alt="About image"
            width={500}
            height={500}
            className="rounded-2xl object-cover shadow-lg"
          />
        </div>

        {/* Text */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
            About Me
          </h2>

          <p className="text-[#ADB7BE] text-base sm:text-lg leading-relaxed mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          {/* Tabs */}
          <div className="flex gap-6 border-b border-white/20">
            {TAB_DATA.map((item) => (
              <TabButton
                key={item.id}
                active={tab === item.id}
                selectTab={() => handleTabChange(item.id)}
              >
                {item.title}
              </TabButton>
            ))}
          </div>

          {/* Tab Content */}
          <div className="mt-6 text-[#ADB7BE]">
            {TAB_DATA.find((item) => item.id === tab)?.content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
