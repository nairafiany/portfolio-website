"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaCode, FaSitemap, FaDatabase, FaBrain } from "react-icons/fa6";

// Tech Stack Data
const stacksList = [
  { src: "/stacks/nextjs_icon_dark.svg", alt: "Next.js" },
  { src: "/stacks/vue.svg", alt: "Vue.js" },
  { src: "/stacks/tailwindcss.svg", alt: "Tailwind" },
  { src: "/stacks/django.svg", alt: "Django" },
  { src: "/stacks/fastapi.svg", alt: "FastAPI" },
  { src: "/stacks/spring.svg", alt: "Spring Boot" },
  { src: "/stacks/flutter.svg", alt: "Flutter" },
  { src: "/stacks/docker.svg", alt: "Docker" },
  { src: "/stacks/postgresql.svg", alt: "PostgreSQL" },
  { src: "/stacks/aws_light.svg", alt: "AWS" },
  { src: "/stacks/figma.svg", alt: "Figma" },
  { src: "/stacks/openai_dark.svg", alt: "Platform OpenAI API" },
];

export default function AboutCard() {
  const [activeTab, setActiveTab] = useState("skills");

  const tabs = [
    { id: "skills", label: "Skills & Tech" },
    { id: "education", label: "Education" },
    { id: "experience", label: "Experience" },
  ];

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        About Me
      </h2>

      {/* Tabs Header */}
      <div className="flex space-x-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl mb-6 w-fit mx-auto md:mx-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "bg-white dark:bg-[#121212] text-emerald-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tabs Content */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {activeTab === "skills" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SkillBox
                icon={<FaCode />}
                title="Development"
                desc="Building robust web & mobile apps."
                color="text-emerald-500"
              />
              <SkillBox
                icon={<FaSitemap />}
                title="System Analysis"
                desc="Designing scalable architectures."
                color="text-blue-500"
              />
              <SkillBox
                icon={<FaDatabase />}
                title="Data & Infra"
                desc="Managing data and cloud deployment."
                color="text-orange-500"
              />
              <SkillBox
                icon={<FaBrain />}
                title="AI & ML"
                desc="Integrating intelligent solutions."
                color="text-purple-500"
              />
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
                Tools & Technologies
              </h3>
              <div className="flex flex-wrap gap-3">
                {stacksList.map((stack, idx) => (
                  <div
                    key={idx}
                    className="group relative bg-gray-50 dark:bg-white/5 p-2 rounded-xl border border-gray-200 dark:border-white/10 hover:border-emerald-500 transition-colors"
                  >
                    <Image
                      src={stack.src}
                      alt={stack.alt}
                      width={28}
                      height={28}
                      className="w-7 h-7 object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                    />
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                      {stack.alt}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "education" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/10 hover:border-yellow-500/50 transition-colors">
              {/* Logo UI */}
              <div className="bg-white p-2 rounded-full shrink-0 shadow-sm">
                <Image
                  src="/University_of_Indonesia_logo.svg"
                  alt="Universitas Indonesia Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>

              <div>
                <h3 className="font-bold text-lg dark:text-white">
                  Universitas Indonesia
                </h3>
                <p className="text-emerald-600 font-medium text-sm">
                  Undergraduate, Information Systems
                </p>
                <p className="text-xs text-gray-500 mt-1">2023 - Present</p>

                <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">
                  3rd-year Information Systems student. Relevant coursework
                  includes Artificial Intelligence & Basic Data Science, Data
                  Communication & Networks, Enterprise Application Architecture,
                  Systems Analysis & Design, Interaction Systems, and Databases.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "experience" && (
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/5">
              <h3 className="font-bold dark:text-white">
                VPIC of AI Innovation Challenge
              </h3>
              <p className="text-sm text-purple-500 font-medium mb-2">
                COMPFEST • Mar 2025 - Oct 2025
              </p>
              <p className="text-xs text-gray-500">
                Leading the Artificial Intelligence division for the biggest
                student-led IT event in Indonesia.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/5">
              <h3 className="font-bold dark:text-white">Teaching Assistant</h3>
              <p className="text-sm text-yellow-500 font-medium mb-2">
                Discrete Mathematics 1 • Jul 2024 - Dec 2024
              </p>
              <p className="text-xs text-gray-500">
                Assisted in grading and tutoring students on fundamental
                computing concepts.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const SkillBox = ({ icon, title, desc, color }) => (
  <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-xl hover:border-emerald-500 transition-colors group bg-white dark:bg-transparent">
    <div className={`text-2xl mb-2 ${color}`}>{icon}</div>
    <h4 className="font-bold text-sm md:text-base text-gray-800 dark:text-gray-200">
      {title}
    </h4>
    <p className="text-[10px] md:text-xs text-gray-500 mt-1 leading-snug">
      {desc}
    </p>
  </div>
);
