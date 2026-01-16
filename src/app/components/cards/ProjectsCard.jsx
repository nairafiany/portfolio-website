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
];

export default function ProjectsCard() {
  const containerRef = useRef(null);

  // Scrollbar style locked to dark theme colors
  const iosScrollbarStyle = `
    overflow-y-auto
    scrollbar-thin
    [&::-webkit-scrollbar]:w-1.5
    [&::-webkit-scrollbar-track]:bg-transparent
    [&::-webkit-scrollbar-thumb]:bg-gray-700
    [&::-webkit-scrollbar-thumb]:rounded-full
    hover:[&::-webkit-scrollbar-thumb]:bg-gray-500
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
    return "Visit";
  };

  return (
    <div className="h-full flex flex-col text-white">
      <div className="shrink-0 mb-6 px-1">
        <h2 className="text-3xl font-bold text-white">Featured Projects</h2>
        <p className="text-gray-400 text-sm mt-1">
          A collection of my recent work & experiments.
        </p>
      </div>

      <div
        ref={containerRef}
        className={`flex-1 flex flex-col gap-6 pr-2 pb-32 ${iosScrollbarStyle}`}
      >
        {projectsData.map((project) => (
          <div
            key={project.id}
            // Card Style: Locked to Dark Gray Background & Borders
            className="group relative bg-[#181818] border border-white/5 rounded-2xl p-4 flex flex-col sm:flex-row gap-5 hover:border-emerald-500/50 hover:bg-[#1f1f1f] transition-all duration-300"
          >
            {/* 1. IMAGE / THUMBNAIL SECTION (Left) */}
            <div className="w-full sm:w-64 aspect-video shrink-0 relative rounded-xl overflow-hidden bg-black/50 border border-white/5">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-black text-gray-500 text-xs font-mono">
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
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {project.title}
                </h3>
                <div className="hidden sm:flex gap-2 shrink-0">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] uppercase font-bold px-2 py-1 bg-white/5 text-gray-400 rounded-md border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-3">
                {project.description}
              </p>

              <div className="mt-auto pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
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
                          className="opacity-60 group-hover:opacity-100 transition-opacity"
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
                      className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full"
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
                      className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-emerald-400 transition-colors bg-white/5 hover:bg-emerald-500/10 border border-transparent hover:border-emerald-500/20 px-3 py-1.5 rounded-full"
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
