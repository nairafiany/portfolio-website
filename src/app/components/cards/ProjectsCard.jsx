"use client";
import React, { useRef } from "react";
import Image from "next/image";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaFigma,
  FaMobileAlt,
  FaShieldAlt,
  FaPython,
  FaBrain,
  FaGem,
  FaChartLine,
  FaTrophy, // Ditambahkan untuk icon Oscars
} from "react-icons/fa";

const projectsData = [
  {
    id: 1,
    title: "JOGJAPPETITE",
    description:
      "Food review platform focused on Yogyakarta culinary scene. Platform-based programming utilizing Web & Mobile interfaces.",
    image: "/images/projects/jogjappetite.png",
    gitUrl: null,
    previewUrl: null,
    tags: ["Mobile", "Web"],
    techStack: [
      { name: "Django", src: "/stacks/django.svg" },
      { name: "Flutter", src: "/stacks/flutter.svg" },
      { name: "Tailwind", src: "/stacks/tailwindcss.svg" },
    ],
  },
  {
    id: 2,
    title: "ELEVFIT",
    description:
      "Fitness app design with physical activity & food tracking. Focus on Human–Computer Interaction.",
    image: "/images/projects/elevfit.png",
    gitUrl: null,
    previewUrl: "https://ristek.link/ElevFit",
    tags: ["UI/UX"],
    techStack: [
      { name: "Figma", src: "/stacks/figma.svg" },
      {
        name: "UI/UX",
        icon: <FaMobileAlt className="w-4 h-4 text-gray-300" />,
      },
    ],
  },
  {
    id: 3,
    title: "SIZOPI",
    description:
      "Smart Zoo Information System for modern zoo management. Built with robust Database Systems.",
    image: "/images/projects/sizopi.png",
    gitUrl: "https://github.com/ezarsurahman/sizopi-a-16",
    previewUrl: null,
    tags: ["Web"],
    techStack: [
      { name: "Next.js", src: "/stacks/nextjs_icon_dark.svg" },
      { name: "Django", src: "/stacks/django.svg" },
      { name: "PostgreSQL", src: "/stacks/postgresql.svg" },
    ],
  },
  {
    id: 4,
    title: "RENT AND DRIVE",
    description:
      "Secure car rental website with advanced security features. Implements best practices in Software Security.",
    image: "/images/projects/rent-drive.png",
    gitUrl: null,
    previewUrl: null,
    tags: ["Web"],
    techStack: [
      { name: "Next.js", src: "/stacks/nextjs_icon_dark.svg" },
      { name: "Django", src: "/stacks/django.svg" },
      {
        name: "Security",
        icon: <FaShieldAlt className="w-4 h-4 text-emerald-500" />,
      },
    ],
  },
  {
    id: 5,
    title: "INGRESYNC",
    description:
      "AI-powered skincare ingredient compatibility checker. An experimental personal project using LLM.",
    image: "/images/projects/ingresync.png",
    gitUrl: "https://github.com/ingresync/frontend",
    previewUrl: null,
    tags: ["AI", "Web"],
    techStack: [
      { name: "OpenAI Platform", src: "/stacks/openai_dark.svg" },
      { name: "Next.js", src: "/stacks/nextjs_icon_dark.svg" },
      { name: "FastAPI", src: "/stacks/fastapi.svg" },
    ],
  },
  {
    id: 6,
    title: "TravelAPAP",
    description:
      "Integrated travel booking platform (Vehicle Rental module). Enabling users to browse and book reservations.",
    image: "/images/projects/travelapap.png",
    gitUrl: null,
    previewUrl: null,
    tags: ["Web"],
    techStack: [
      { name: "Vue.js", src: "/stacks/vue.svg" },
      { name: "Spring Boot", src: "/stacks/spring.svg" },
      { name: "Docker", src: "/stacks/docker.svg" },
      { name: "AWS", src: "/stacks/aws_light.svg" },
    ],
  },
  {
    id: 7,
    title: "Personal Portfolio",
    description:
      "Responsive portfolio website showcasing projects and skills. Built with modern web technologies.",
    image: "/images/preview.png",
    gitUrl: "https://github.com/nairafiany/portfolio-website",
    previewUrl: "#",
    tags: ["Web"],
    techStack: [
      { name: "Next.js", src: "/stacks/nextjs_icon_dark.svg" },
      { name: "Tailwind", src: "/stacks/tailwindcss.svg" },
    ],
  },
  {
    id: 8,
    title: "Diamond Analytics",
    description:
      "Kaggle Final Project for KASDAD. Implemented Classification, Prediction, and Clustering models to estimate diamond prices and visual quality.",
    image: null,
    thumbnailIcon: (
      <FaGem className="w-14 h-14 text-cyan-300/80 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
    ),
    gitUrl: null,
    previewUrl: null,
    tags: ["Data Science", "AI"],
    techStack: [
      {
        name: "Python",
        icon: <FaPython className="w-4 h-4 text-yellow-400" />,
      },
      {
        name: "Machine Learning",
        icon: <FaBrain className="w-4 h-4 text-pink-400" />,
      },
    ],
  },
  {
    id: 9,
    title: "E-Commerce Dashboard",
    description:
      "Comprehensive data visualization project analyzing sales funnel, product metrics, and logistics performance using Looker Studio on a 100k+ dataset.",
    image: "/images/projects/ecomm_dashboard.png",
    gitUrl: null,
    previewUrl:
      "https://lookerstudio.google.com/u/0/reporting/8ef341d2-93cd-4913-96a8-b0f77ba7e4c2/page/Pf5QF",
    tags: ["Data Analytics", "Visualization"],
    techStack: [
      {
        name: "Looker Studio",
        icon: <FaChartLine className="w-4 h-4 text-blue-500" />,
      },
      {
        name: "Python",
        icon: <FaPython className="w-4 h-4 text-yellow-400" />,
      },
    ],
  },
  {
    id: 10,
    title: "Oscars Dashboard",
    description:
      "Interactive data dashboard tracking the 98th Academy Awards nominations and precursor awards (Golden Globes, Critics Choice). Built with Python & Streamlit.",
    image: "/images/projects/oscars.png",
    thumbnailIcon: (
      <FaTrophy className="w-14 h-14 text-yellow-500/80 drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
    ),
    gitUrl: "https://github.com/nairafiany/oscars-dashboard",
    previewUrl:
      "https://oscars-dashboard-s5hmnzsgglbtq77eqfbt7y.streamlit.app/",
    tags: ["Data Analytics", "Visualization"],
    techStack: [
      {
        name: "Python",
        icon: <FaPython className="w-4 h-4 text-yellow-400" />,
      },
      {
        name: "Streamlit",
        icon: <FaChartLine className="w-4 h-4 text-red-500" />,
      },
    ],
  },
];

export default function ProjectsCard() {
  const containerRef = useRef(null);

  const iosScrollbarStyle = `
    overflow-y-auto
    scrollbar-thin
    [&::-webkit-scrollbar]:w-1.5
    [&::-webkit-scrollbar-track]:bg-transparent
    [&::-webkit-scrollbar-thumb]:bg-[#8ecfd3]
    [&::-webkit-scrollbar-thumb]:rounded-full
    hover:[&::-webkit-scrollbar-thumb]:bg-[#8e78cc]
  `;

  const getLinkIcon = (url) => {
    if (url.includes("figma") || url.includes("ristek.link"))
      return <FaFigma />;
    return <FaExternalLinkAlt />;
  };

  const getLinkLabel = (url) => {
    if (url.includes("figma") || url.includes("ristek.link"))
      return "Prototype";
    if (url.includes("kaggle")) return "Kaggle";
    if (url.includes("lookerstudio")) return "Dashboard";
    if (url.includes("streamlit")) return "Dashboard";
    return "Visit";
  };

  return (
    <div className="h-full flex flex-col text-[#29263b]">
      <div className="shrink-0 mb-6 px-1">
        <div className="flex items-end justify-between gap-3">
        <div><h2 className="text-3xl font-black tracking-tight text-[#29263b]">Things I’ve built</h2>
        <p className="text-[#5f676b] text-sm mt-1">
          Ten projects, each with a story and a tiny bit of personality.
        </p>
        </div><div className="hidden sm:flex flex-col items-center bg-[#ffd66b] border-2 border-[#29263b] rounded-[45%] p-3 rotate-3" aria-hidden="true"><div className="face"><span className="face-eye"/><span className="face-eye"/></div><span className="face-mouth mt-1"/></div></div>
      </div>

      <div
        ref={containerRef}
        className={`hover-safe-region flex-1 flex flex-col gap-6 pr-2 pb-32 ${iosScrollbarStyle}`}
      >
        {projectsData.map((project) => (
          <div
            key={project.id}
            className="readable-card wiggle-card group relative bg-white border-2 border-[#29263b]/20 rounded-[26px_20px_28px_22px] p-4 flex flex-col sm:flex-row gap-5 hover:border-[#29263b] focus-within:border-[#29263b] transition-all duration-300"
          >
            {/* 1. IMAGE / THUMBNAIL SECTION (Left) */}
            <div className="w-full sm:w-64 aspect-video shrink-0 relative rounded-[18px_14px_20px_15px] overflow-hidden bg-[#e9e2d4] border-2 border-[#29263b]/20">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#ffe8d6] to-[#d5eff1] text-[#5f676b] text-xs font-mono">
                  {project.thumbnailIcon ? project.thumbnailIcon : "No Image"}
                </div>
              )}

              {/* Mobile Tags Overlay */}
              <div className="absolute top-2 left-2 flex gap-1 sm:hidden">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[9px] font-bold px-1.5 py-0.5 bg-black/60 text-white rounded backdrop-blur-md border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 2. CONTENT SECTION (Right) */}
            <div className="flex-1 flex flex-col min-w-0">
              {/* Title & Tags (Desktop) */}
              <div className="flex justify-between items-start mb-2">
                <h3 className="card-title text-lg font-black group-hover:text-[#d9564b] group-focus-within:text-[#d9564b] transition-colors">
                  {project.title}
                </h3>
                <div className="hidden sm:flex gap-2 shrink-0">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                    className="text-[10px] uppercase font-black px-2 py-1 bg-[#fff1ba] text-[#5d536d] rounded-full border border-[#29263b]/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <p className="card-muted text-sm leading-relaxed mb-4 line-clamp-3">
                {project.description}
              </p>

              <div className="mt-auto pt-4 border-t-2 border-dashed border-[#29263b]/15 flex flex-wrap items-center justify-between gap-4">
                {/* Tech Stack Icons */}
                <div className="flex items-center gap-3">
                  {project.techStack.map((tech, idx) => (
                    <div key={idx} className="relative group/tooltip">
                      {tech.src ? (
                        <Image
                          src={tech.src}
                          alt={tech.name}
                          width={18}
                          height={18}
                          className="opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all"
                        />
                      ) : (
                        <div className="opacity-60 group-hover:opacity-100 transition-opacity">
                          {tech.icon}
                        </div>
                      )}
                      {/* Simple Tooltip */}
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {project.gitUrl && (
                    <a
                      href={project.gitUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="playful-button flex items-center gap-2 text-xs font-black text-[#29263b] bg-white px-3 py-1.5"
                    >
                      <FaGithub className="text-sm" />
                      <span>Code</span>
                    </a>
                  )}
                  {project.previewUrl && (
                    <a
                      href={project.previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="playful-button flex items-center gap-2 text-xs font-black text-[#29263b] bg-[#82d9b8] px-3 py-1.5"
                    >
                      {getLinkIcon(project.previewUrl)}
                      <span>{getLinkLabel(project.previewUrl)}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
