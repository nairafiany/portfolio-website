"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  FaCode,
  FaSitemap,
  FaDatabase,
  FaBrain,
  FaExternalLinkAlt,
  FaTimes,
  FaExpand,
} from "react-icons/fa";
import { SiDatacamp, SiKaggle } from "react-icons/si";

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
  { src: "/stacks/openai_dark.svg", alt: "OpenAI Platform" },
];

const certificatesList = [
  {
    title: "Developing LLM Applications with LangChain",
    issuer: "DataCamp",
    date: "Aug 2025",
    length: "3 HRS",
    logo: <SiDatacamp className="w-8 h-8 text-[#03EFA5]" />,
    embedSrc: "/certificates/Developing LLM Applications with LangChain.pdf",
    fileType: "pdf",
    link: "https://www.datacamp.com/statement-of-accomplishment/course/906774a9e35abdf88a80488f4cd8e35b2960635c?raw=1",
  },
  {
    title: "Deep Learning for Images with PyTorch",
    issuer: "DataCamp",
    date: "Aug 2025",
    length: "4 HRS",
    logo: <SiDatacamp className="w-8 h-8 text-[#03EFA5]" />,
    embedSrc: "/certificates/Deep Learning for Images with PyTorch.pdf",
    fileType: "pdf",
    link: "https://www.datacamp.com/statement-of-accomplishment/course/79d8fa05b4f96d55fce8003f736f8db9305f0c22?raw=1",
  },
  {
    title: "MLOps Concepts",
    issuer: "DataCamp",
    date: "Aug 2025",
    length: "2 HRS",
    logo: <SiDatacamp className="w-8 h-8 text-[#03EFA5]" />,
    embedSrc: "/certificates/MLOps Concepts.pdf",
    fileType: "pdf",
    link: "https://www.datacamp.com/statement-of-accomplishment/course/5f49eea7aa812d2a5a6095253b982b4ff2142989?raw=1",
  },
  {
    title: "Working with Llama 3",
    issuer: "DataCamp",
    date: "Jul 2025",
    length: "2 HRS",
    logo: <SiDatacamp className="w-8 h-8 text-[#03EFA5]" />,
    embedSrc: "/certificates/Working with Llama 3.pdf",
    fileType: "pdf",
    link: "https://www.datacamp.com/statement-of-accomplishment/course/f9a71e6deaddadc4441c92fafbe06d27cdf2570d?raw=1",
  },
  {
    title: "Introduction to LLMs in Python",
    issuer: "DataCamp",
    date: "Jul 2025",
    length: "3 HRS",
    logo: <SiDatacamp className="w-8 h-8 text-[#03EFA5]" />,
    embedSrc: "/certificates/Introduction to LLMs in Python.pdf",
    fileType: "pdf",
    link: "https://www.datacamp.com/statement-of-accomplishment/course/6726803f3d114e5a8f48558864874de63b01930a?raw=1",
  },
  {
    title: "Explainable AI in Python",
    issuer: "DataCamp",
    date: "Jul 2025",
    length: "4 HRS",
    logo: <SiDatacamp className="w-8 h-8 text-[#03EFA5]" />,
    embedSrc: "/certificates/Explainable AI in Python.pdf",
    fileType: "pdf",
    link: "https://www.datacamp.com/statement-of-accomplishment/course/40ed3eb2cb59b185a97e13ca4201baa51db99517?raw=1",
  },
  {
    title: "Introduction to Deep Learning with PyTorch",
    issuer: "DataCamp",
    date: "Jul 2025",
    length: "4 HRS",
    logo: <SiDatacamp className="w-8 h-8 text-[#03EFA5]" />,
    embedSrc: "/certificates/Introduction to Deep Learning with PyTorch.pdf",
    fileType: "pdf",
    link: "https://www.datacamp.com/completed/statement-of-accomplishment/course/e6d8a3616b9a4be82f05afb74a6d985b9d7f0429",
  },
  {
    title: "Unsupervised Learning in Python",
    issuer: "DataCamp",
    date: "Jul 2025",
    length: "4 HRS",
    logo: <SiDatacamp className="w-8 h-8 text-[#03EFA5]" />,
    embedSrc: "/certificates/Unsupervised Learning in Python.pdf",
    fileType: "pdf",
    link: "https://www.datacamp.com/statement-of-accomplishment/course/cf247b99722e50373a513ebdeefd60ed15cd32e5?raw=1",
  },
  {
    title: "Working with Hugging Face",
    issuer: "DataCamp",
    date: "Jul 2025",
    length: "2 HRS",
    logo: <SiDatacamp className="w-8 h-8 text-[#03EFA5]" />,
    embedSrc: "/certificates/Working with Hugging Face.pdf",
    fileType: "pdf",
    link: "https://www.datacamp.com/statement-of-accomplishment/course/fa7c401aa2c6ca85d23a05aacc4f084cf467aca2?raw=1",
  },
  {
    title: "Exploratory Data Analysis in Python",
    issuer: "DataCamp",
    date: "Jul 2025",
    length: "4 HRS",
    logo: <SiDatacamp className="w-8 h-8 text-[#03EFA5]" />,
    embedSrc: "/certificates/Exploratory Data Analysis in Python.pdf",
    fileType: "pdf",
    link: "https://www.datacamp.com/statement-of-accomplishment/course/f34cf790ec11b67764eb8cb4a2fbe2de959c788d?raw=1",
  },
  {
    title: "Intro to Machine Learning",
    issuer: "Kaggle",
    date: "Mar 2025",
    length: null,
    logo: <SiKaggle className="w-8 h-8 text-[#20BEFF]" />,
    embedSrc: "/certificates/Naira S. Afiany - Intro to Machine Learning.png",
    fileType: "image",
    link: "#",
  },
];

export default function AboutCard() {
  const [activeTab, setActiveTab] = useState("skills");
  const [selectedCert, setSelectedCert] = useState(null);

  const tabs = [
    { id: "skills", label: "Skills & Tech" },
    { id: "education", label: "Education" },
    { id: "experience", label: "Experience" },
    { id: "certificates", label: "Certificates" },
  ];

  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedCert]);

  return (
    <div className="h-full flex flex-col relative">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">
        About Me
      </h2>

      <div className="w-full mb-6">
        <div className="flex w-full items-center justify-between gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-1 py-2 rounded-lg transition-all whitespace-nowrap font-medium
                text-[10px] xs:text-[11px] sm:text-sm
                px-0 sm:px-4
                ${
                  activeTab === tab.id
                    ? "bg-white dark:bg-[#121212] text-emerald-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-1 sm:pr-2 custom-scrollbar pb-10">
        {activeTab === "skills" && (
          <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
              <div className="flex flex-wrap gap-2 sm:gap-3">
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
                      className="w-6 h-6 sm:w-7 sm:h-7 object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                    />
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                      {stack.alt}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "education" && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex flex-row gap-4 items-start bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/10 hover:border-yellow-500/50 transition-colors">
              <div className="bg-white p-2 rounded-full shrink-0 shadow-sm">
                <Image
                  src="/University_of_Indonesia_logo.svg"
                  alt="UI Logo"
                  width={36}
                  height={36}
                  className="object-contain w-9 h-9 sm:w-10 sm:h-10"
                />
              </div>
              <div>
                <h3 className="font-bold text-base sm:text-lg dark:text-white leading-tight">
                  Universitas Indonesia
                </h3>
                <p className="text-emerald-600 font-medium text-xs sm:text-sm mt-0.5">
                  Undergraduate, Information Systems
                </p>
                <p className="text-xs text-gray-500 mt-1">2023 - Present</p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">
                  3rd-year Information Systems student. Relevant coursework
                  includes Artificial Intelligence & Basic Data Science, Data
                  Communication & Networks, and Enterprise Application
                  Architecture.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "experience" && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/5">
              <h3 className="font-bold dark:text-white">
                VPIC of AI Innovation Challenge
              </h3>
              <p className="text-sm text-purple-500 font-medium mb-2">
                COMPFEST • Mar 2025 - Oct 2025
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 leading-relaxed">
                Led the Artificial Intelligence Challenge at Indonesia’s largest
                student-led IT event (COMPFEST).
              </p>
              <ul className="text-xs text-gray-500 dark:text-gray-400 list-disc pl-4 space-y-1">
                <li>
                  Managed a team of <strong>13 staff members</strong> to execute
                  the competition.
                </li>
                <li>
                  Successfully attracted{" "}
                  <strong>100+ teams (400+ participants)</strong> nationwide.
                </li>
                <li>
                  Orchestrated end-to-end event planning, from conceptualization
                  to final execution.
                </li>
              </ul>
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

        {activeTab === "certificates" && (
          <div className="pt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {certificatesList.map((cert, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedCert(cert)}
                className="group relative flex flex-col justify-between bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/5 hover:border-emerald-500 hover:-translate-y-1 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="p-2 bg-white dark:bg-[#1A1A1A] rounded-lg border border-gray-100 dark:border-white/10 shadow-sm">
                    {cert.logo}
                  </div>
                  <span className="text-[10px] font-mono text-gray-400 bg-black/5 dark:bg-white/5 px-2 py-1 rounded">
                    {cert.date}
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white leading-tight mb-1 group-hover:text-emerald-500 transition-colors line-clamp-2">
                    {cert.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {cert.issuer}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-200 dark:border-white/5 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400">
                    {cert.length ? cert.length : "Credential"}
                  </span>
                  <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>View</span>
                    <FaExpand />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.5)_0%,transparent_90%)] backdrop-blur-[2px] animate-in fade-in duration-500"
            onClick={() => setSelectedCert(null)}
          ></div>

          <div
            className="
            relative w-full max-w-5xl 
            h-[50vh] sm:h-auto sm:aspect-video 
            bg-white dark:bg-[#181818] 
            rounded-2xl shadow-2xl 
            flex flex-col 
            overflow-hidden 
            border border-white/10
            
            /* ANIMATION CLASSES */
            animate-in 
            fade-in 
            zoom-in-95 
            slide-in-from-bottom-8  
            duration-300            
            ease-out                
          "
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#121212]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center bg-white dark:bg-black/50 rounded-lg border border-white/10">
                  {selectedCert.logo}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1">
                    {selectedCert.title}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {selectedCert.issuer} • {selectedCert.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={selectedCert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-400 hover:text-emerald-500 hover:bg-emerald-500/10 rounded-lg transition-colors"
                  title="Verify at Source"
                >
                  <FaExternalLinkAlt size={14} />
                </a>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <FaTimes size={16} />
                </button>
              </div>
            </div>

            <div className="flex-1 bg-white relative">
              {selectedCert.fileType === "pdf" ? (
                <iframe
                  src={`${selectedCert.embedSrc}#toolbar=0&navpanes=0`}
                  className="w-full h-full"
                  title={selectedCert.title}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center p-4">
                  <div className="relative w-full h-full max-w-2xl max-h-full">
                    <Image
                      src={selectedCert.embedSrc}
                      alt={selectedCert.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const SkillBox = ({ icon, title, desc, color }) => (
  <div className="border border-gray-200 dark:border-gray-700 p-3 sm:p-4 rounded-xl hover:border-emerald-500 transition-colors group bg-white dark:bg-transparent">
    <div className={`text-xl sm:text-2xl mb-2 ${color}`}>{icon}</div>
    <h4 className="font-bold text-sm sm:text-base text-gray-800 dark:text-gray-200">
      {title}
    </h4>
    <p className="text-[10px] sm:text-xs text-gray-500 mt-1 leading-snug">
      {desc}
    </p>
  </div>
);
