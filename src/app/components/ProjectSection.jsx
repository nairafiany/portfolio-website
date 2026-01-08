"use client";

import { useState } from "react";
import Image from "next/image";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import ScrollReveal from "./ScrollReveal";
import { FaMobileAlt, FaShieldAlt } from "react-icons/fa";

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
      {
        name: "Django",
        icon: (
          <div className="relative w-5 h-5">
            <Image
              src="/stacks/django.svg"
              alt="Django"
              fill
              className="object-contain"
            />
          </div>
        ),
      },
      {
        name: "Flutter",
        icon: (
          <div className="relative w-5 h-5">
            <Image
              src="/stacks/flutter.svg"
              alt="Flutter"
              fill
              className="object-contain"
            />
          </div>
        ),
      },
      {
        name: "Tailwind",
        icon: (
          <div className="relative w-5 h-5">
            <Image
              src="/stacks/tailwindcss.svg"
              alt="Tailwind"
              fill
              className="object-contain"
            />
          </div>
        ),
      },
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
      {
        name: "Figma",
        icon: (
          <div className="relative w-5 h-5">
            <Image
              src="/stacks/figma.svg"
              alt="Figma"
              fill
              className="object-contain"
            />
          </div>
        ),
      },
      {
        name: "UI/UX",
        icon: <FaMobileAlt className="w-5 h-5 text-gray-200" />,
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
      {
        name: "Next.js",
        icon: (
          <div className="relative w-5 h-5">
            <Image
              src="/stacks/nextjs_icon_dark.svg"
              alt="Next.js"
              fill
              className="object-contain"
            />
          </div>
        ),
      },
      {
        name: "Django",
        icon: (
          <div className="relative w-5 h-5">
            <Image
              src="/stacks/django.svg"
              alt="Django"
              fill
              className="object-contain"
            />
          </div>
        ),
      },
      {
        name: "PostgreSQL",
        icon: (
          <div className="relative w-5 h-5">
            <Image
              src="/stacks/postgresql.svg"
              alt="PostgreSQL"
              fill
              className="object-contain"
            />
          </div>
        ),
      },
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
      {
        name: "Next.js",
        icon: (
          <div className="relative w-5 h-5">
            <Image
              src="/stacks/nextjs_icon_dark.svg"
              alt="Next.js"
              fill
              className="object-contain"
            />
          </div>
        ),
      },
      {
        name: "Django",
        icon: (
          <div className="relative w-5 h-5">
            <Image
              src="/stacks/django.svg"
              alt="Django"
              fill
              className="object-contain"
            />
          </div>
        ),
      },
      {
        name: "Security",
        icon: <FaShieldAlt className="w-5 h-5 text-emerald-500" />,
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
      {
        name: "OpenAI API",
        icon: (
          <div className="relative w-5 h-5">
            <Image
              src="/stacks/openai_dark.svg"
              alt="OpenAI"
              fill
              className="object-contain"
            />
          </div>
        ),
      },
      {
        name: "Next.js",
        icon: (
          <div className="relative w-5 h-5">
            <Image
              src="/stacks/nextjs_icon_dark.svg"
              alt="Next.js"
              fill
              className="object-contain"
            />
          </div>
        ),
      },
      {
        name: "FastAPI",
        icon: (
          <div className="relative w-5 h-5">
            <Image
              src="/stacks/fastapi.svg"
              alt="FastAPI"
              fill
              className="object-contain"
            />
          </div>
        ),
      },
    ],
  },
  {
    id: 6,
    title: "TravelAPAP",
    description:
      "Integrated travel booking platform. Specifically developed the Vehicle Rental module, enabling users to browse, book, and manage vehicle reservations efficiently.",
    image: "/images/projects/travelapap.png",
    gitUrl: null,
    previewUrl: null,
    tags: ["Web"],
    techStack: [
      {
        name: "Vue.js",
        icon: (
          <div className="relative w-5 h-5">
            <Image
              src="/stacks/vue.svg"
              alt="Vue.js"
              fill
              className="object-contain"
            />
          </div>
        ),
      },
      {
        name: "Spring Boot",
        icon: (
          <div className="relative w-5 h-5">
            <Image
              src="/stacks/spring.svg"
              alt="Spring Boot"
              fill
              className="object-contain"
            />
          </div>
        ),
      },
      {
        name: "Docker",
        icon: (
          <div className="relative w-5 h-5">
            <Image
              src="/stacks/docker.svg"
              alt="Docker"
              fill
              className="object-contain"
            />
          </div>
        ),
      },
      {
        name: "AWS",
        icon: (
          <div className="relative w-5 h-5">
            <Image
              src="/stacks/aws_light.svg"
              alt="AWS"
              fill
              className="object-contain"
            />
          </div>
        ),
      },
      {
        name: "Tailwind",
        icon: (
          <div className="relative w-5 h-5">
            <Image
              src="/stacks/tailwindcss.svg"
              alt="Tailwind"
              fill
              className="object-contain"
            />
          </div>
        ),
      },
    ],
  },
  {
    id: 7,
    title: "Personal Portfolio",
    description:
      "A responsive portfolio website to showcase my projects, skills, and experience. Built with modern web technologies.",
    image: "/images/projects/portfolio.png",
    gitUrl: "https://github.com/nairafiany/portfolio-website",
    previewUrl: "#",
    tags: ["Web"],
    useContain: true,
    techStack: [
      {
        name: "Next.js",
        icon: (
          <div className="relative w-5 h-5">
            <Image
              src="/stacks/nextjs_icon_dark.svg"
              alt="Next.js"
              fill
              className="object-contain"
            />
          </div>
        ),
      },
      {
        name: "Tailwind",
        icon: (
          <div className="relative w-5 h-5">
            <Image
              src="/stacks/tailwindcss.svg"
              alt="Tailwind"
              fill
              className="object-contain"
            />
          </div>
        ),
      },
    ],
  },
];

const ProjectSection = () => {
  const [selectedTag, setSelectedTag] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filteredProjects =
    selectedTag === "All"
      ? projectsData
      : projectsData.filter((project) => project.tags.includes(selectedTag));

  const displayedProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, 6);

  const handleTagChange = (newTag) => {
    setSelectedTag(newTag);
    setShowAll(false);
  };

  return (
    <section id="projects" className="py-16 px-6">
      <ScrollReveal variant="fade-up">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          My Projects
        </h2>
      </ScrollReveal>

      <ScrollReveal variant="fade-up" delay={0.2}>
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {["All", "Web", "Mobile", "UI/UX", "AI"].map((tag) => (
            <ProjectTag
              key={tag}
              name={tag}
              isSelected={selectedTag === tag}
              onClick={() => handleTagChange(tag)}
            />
          ))}
        </div>
      </ScrollReveal>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto mb-12">
        {displayedProjects.map((project, index) => (
          <ScrollReveal key={project.id} variant="fade-up" delay={index * 0.1}>
            <ProjectCard
              imgUrl={project.image}
              title={project.title}
              description={project.description}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
              techStack={project.techStack}
              useContain={project.useContain}
              tags={project.tags}
            />
          </ScrollReveal>
        ))}
      </div>

      {filteredProjects.length > 6 && (
        <ScrollReveal variant="fade-up">
          <div className="flex justify-center w-full">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 rounded-full border border-white/10 bg-[#181818] text-white font-medium hover:bg-white hover:text-black transition-all duration-300 shadow-lg"
            >
              {showAll ? "Show Less" : "See All Projects"}
            </button>
          </div>
        </ScrollReveal>
      )}
    </section>
  );
};

export default ProjectSection;
