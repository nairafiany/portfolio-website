"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import ToolsSection from "../ToolsSection";
import {
  FaCode,
  FaSitemap,
  FaDatabase,
  FaBrain,
  FaExternalLinkAlt,
  FaTimes,
  FaExpand,
  FaGraduationCap,
  FaBriefcase,
  FaAward,
} from "react-icons/fa";
import {
  SiDatacamp,
  SiKaggle,
  SiDotnet,
  SiSharp,
  SiPhp,
  SiLaravel,
  SiGooglecloud,
} from "react-icons/si";

const technologyGroups = [
  {
    name: "Backend",
    technologies: [
      { src: "/stacks/spring.svg", name: "Spring Boot" },
      { icon: <SiDotnet className="text-[#512bd4]" />, name: ".NET" },
      { icon: <SiSharp className="text-[#239120]" />, name: "C#" },
      { src: "/stacks/django.svg", name: "Django" },
      { src: "/stacks/fastapi.svg", name: "FastAPI" },
      { icon: <SiLaravel className="text-[#ff2d20]" />, name: "Laravel" },
      { icon: <SiPhp className="text-[#777bb4]" />, name: "PHP" },
    ],
  },
  {
    name: "Frontend & Mobile",
    technologies: [
      { src: "/stacks/nextjs_icon_dark.svg", name: "Next.js" },
      { src: "/stacks/vue.svg", name: "Vue.js" },
      { src: "/stacks/tailwindcss.svg", name: "Tailwind CSS" },
      { src: "/stacks/flutter.svg", name: "Flutter" },
    ],
  },
  {
    name: "Data & Infrastructure",
    technologies: [
      { src: "/stacks/postgresql.svg", name: "PostgreSQL" },
      { src: "/stacks/docker.svg", name: "Docker" },
      { src: "/stacks/aws_light.svg", name: "AWS" },
      { icon: <SiGooglecloud className="text-[#4285f4]" />, name: "Google Cloud" },
    ],
  },
  {
    name: "Tools",
    technologies: [
      { src: "/stacks/figma.svg", name: "Figma" },
      { src: "/stacks/openai.svg", name: "OpenAI" },
    ],
  },
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
    {
      id: "skills",
      label: "Skills & Tech",
      descriptor: "tools I use",
      icon: FaCode,
    },
    {
      id: "education",
      label: "Education",
      descriptor: "where I learned",
      icon: FaGraduationCap,
    },
    {
      id: "experience",
      label: "Experience",
      descriptor: "what I worked on",
      icon: FaBriefcase,
    },
    {
      id: "certificates",
      label: "Certificates",
      descriptor: "things I completed",
      icon: FaAward,
    },
  ];

  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedCert]);

  return (
    <div className="h-full flex flex-col relative text-[#29263b]">
      <h2 className="text-2xl sm:text-3xl font-black mb-4 sm:mb-6 text-[#29263b] tracking-tight">
        A little about me
      </h2>

      <div className="hover-safe-inline w-full mb-6">
        <div
          role="tablist"
          aria-label="About Naira"
          className="about-tablist grid grid-cols-2 sm:flex w-full items-stretch justify-between gap-1.5 bg-[#eee9dc] p-1.5 rounded-[20px] border-2 border-[#263238]/15"
        >
          {tabs.map((tab) => {
            const TabIcon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`
                about-editorial-tab group relative flex-1 min-w-0 h-11 sm:h-12 rounded-[13px_11px_14px_10px]
                flex items-center justify-start gap-1.5 sm:gap-2.5 transition-all whitespace-nowrap
                px-3
                ${
                  isActive
                    ? "is-active bg-[#ffd66b] text-[#263238] border-2 border-[#263238] shadow-[3px_3px_0_#263238] -translate-y-0.5 rotate-[-.5deg]"
                    : "text-[#5f676b] hover:text-[#263238] hover:bg-white/60"
                }
              `}
              >
                <TabIcon
                  className="about-tab-icon shrink-0 text-[12px] sm:text-sm"
                  aria-hidden="true"
                />
                <span className="min-w-0 flex-1 text-left leading-none">
                  <span className="block text-[10px] sm:text-xs font-black tracking-[-.01em] text-[#263238]">
                    {tab.label}
                  </span>
                  <span
                    className={`about-tab-descriptor mt-1.5 text-[6px] font-black uppercase tracking-[.14em] text-[#5f676b] ${isActive ? "hidden lg:block" : "hidden"}`}
                  >
                    {tab.descriptor}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        id={`about-panel-${activeTab}`}
        role="tabpanel"
        className="hover-safe-region flex-1 overflow-y-auto pr-1 sm:pr-2 custom-scrollbar pb-10"
      >
        {activeTab === "skills" && (
          <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="capability-grid">
              <SkillBox
                icon={<FaCode />}
                title="Backend Engineering"
                desc="Building APIs, integrations, backend services, and application logic for reliable software systems."
                variant="backend"
                prominent
              />
              <SkillBox
                icon={<FaDatabase />}
                title="Data & Infrastructure"
                desc="Working with databases, containers, and cloud environments to support application delivery."
                variant="data"
              />
              <SkillBox
                icon={<FaSitemap />}
                title="Product Engineering"
                desc="Turning product requirements into functional end-to-end web applications when needed."
                variant="product"
              />
              <SkillBox
                icon={<FaBrain />}
                title="AI Integration"
                desc="Integrating AI capabilities into software features and user workflows."
                variant="ai"
              />
            </div>
            <ToolsSection groups={technologyGroups} />
          </div>
        )}

        {activeTab === "education" && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex flex-row gap-4 items-start bg-[#fff8d9] p-5 rounded-[28px_20px_26px_22px] border-2 border-[#29263b]/20 hover:border-[#29263b] transition-colors">
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
                <h3 className="card-title font-bold text-base sm:text-lg leading-tight">
                  Universitas Indonesia
                </h3>
                <p className="text-[#247a60] font-medium text-xs sm:text-sm mt-0.5">
                  Undergraduate, Information Systems
                </p>
                <p className="card-muted text-xs mt-1">2023 - Present</p>
                <p className="card-muted text-xs sm:text-sm mt-3 leading-relaxed">
                  Last year Information Systems student. Relevant coursework
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
            <div className="readable-card p-4 rounded-xl border transition-colors hover:border-[#29263b]/40">
              <h3 className="card-title font-bold">
                Manufacturing Technology Development Intern
              </h3>
              <p className="text-sm text-[#247a60] font-medium mb-2">
                PT Kalventis Sinergi Farma · Jakarta · Jun 2026 – Present
              </p>
              <ul className="card-muted text-xs list-disc pl-4 space-y-1.5 leading-relaxed">
                <li>
                  Contributed to the development and rollout of internal
                  manufacturing systems, including daily operations management,
                  equipment calibration, and production effectiveness (OEE)
                  applications.
                </li>
                <li>
                  Developed and enhanced full-stack features using React, .NET,
                  SQL Server, and Laravel, translating existing business
                  requirements and workflows into application functionality.
                </li>
                <li>
                  Adapted existing Kalbe Group applications for implementation
                  at PT Kalventis Sinergi Farma, including UI, data input, and
                  business-process adjustments.
                </li>
              </ul>
            </div>
            <div className="readable-card p-4 rounded-xl border transition-colors hover:border-[#29263b]/40">
              <h3 className="card-title font-bold">
                VPIC of AI Innovation Challenge
              </h3>
              <p className="text-sm text-[#7651a8] font-medium mb-2">
                COMPFEST • Mar 2025 - Oct 2025
              </p>
              <p className="card-muted text-xs mb-2 leading-relaxed">
                Led the Artificial Intelligence Challenge at Indonesia’s largest
                student-led IT event (COMPFEST).
              </p>
              <ul className="card-muted text-xs list-disc pl-4 space-y-1">
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
            <div className="readable-card p-4 rounded-xl border transition-colors hover:border-[#29263b]/40">
              <h3 className="card-title font-bold">Teaching Assistant</h3>
              <p className="text-sm text-[#856312] font-medium mb-2">
                Discrete Mathematics 1 • Universitas Indonesia (Fasilkom) • Jul
                2024 - Dec 2024{" "}
              </p>
              <ul className="card-muted text-xs list-disc pl-4 space-y-1">
                <li>
                  Assisted course delivery by supporting lecturers in conducting
                  tutorials and grading assignments.
                </li>
                <li>
                  Guided students through foundational mathematical concepts
                  including logic, set theory, and combinatorics.
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === "certificates" && (
          <div className="pt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {certificatesList.map((cert, idx) => (
              <button
                type="button"
                key={idx}
                onClick={() => setSelectedCert(cert)}
                className="readable-card group relative flex flex-col justify-between p-4 rounded-2xl border hover:border-emerald-600 focus-visible:border-emerald-600 hover:-translate-y-1 hover:shadow-lg transition-all cursor-pointer text-left"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="p-2 bg-[#1A1A1A] rounded-lg border border-white/10 shadow-sm">
                    {cert.logo}
                  </div>
                  <span className="card-muted text-[10px] font-mono bg-[#f2ecdf] px-2 py-1 rounded">
                    {cert.date}
                  </span>
                </div>
                <div>
                  <h4 className="card-title text-sm font-bold leading-tight mb-1 group-hover:text-emerald-700 group-focus-visible:text-emerald-700 transition-colors line-clamp-2">
                    {cert.title}
                  </h4>
                  <p className="card-muted text-xs">{cert.issuer}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#29263b]/10 flex items-center justify-between">
                  <span className="card-muted text-[10px]">
                    {cert.length ? cert.length : "Credential"}
                  </span>
                  <div className="card-action flex items-center gap-1 text-xs font-bold transition-opacity group-hover:text-emerald-700 group-focus-visible:text-emerald-700">
                    <span>View</span>
                    <FaExpand />
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0.9)_90%)] backdrop-blur-sm animate-in fade-in duration-500 rounded-3xl"
            onClick={() => setSelectedCert(null)}
          ></div>

          <div
            className="
            relative w-full max-w-5xl 
            h-[50vh] sm:h-auto sm:aspect-video 
            bg-[#181818] 
            rounded-2xl shadow-2xl 
            flex flex-col 
            overflow-hidden 
            border border-white/10
            animate-in fade-in zoom-in-95 slide-in-from-bottom-8 duration-300 ease-out
          "
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#121212]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center bg-black/50 rounded-lg border border-white/10">
                  {selectedCert.logo}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white line-clamp-1">
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

            <div className="flex-1 bg-[#181818] relative">
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

const SkillBox = ({ icon, title, desc, variant, prominent = false }) => (
  <div className="capability-card group" data-variant={variant} data-prominent={prominent || undefined}>
    <div className="capability-copy">
      <div className="capability-badge" aria-hidden="true">{icon}</div>
      <h4>{title}</h4>
      {prominent && <span className="capability-focus-label">Primary Focus</span>}
      <p>{desc}</p>
    </div>
  </div>
);
