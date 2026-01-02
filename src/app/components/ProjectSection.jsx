"use client";

import { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";

const projectsData = [
  {
    id: 1,
    title: "Project One",
    description: "Lorem ipsum dolor sit amet.",
    image: "/images/projects/1.jpg",
    gitUrl: "https://github.com/username/project-one",
    previewUrl: "#",
    tag: "Web",
  },
  {
    id: 2,
    title: "Project Two",
    description: "Consectetur adipiscing elit.",
    image: "/images/projects/2.jpg",
    gitUrl: "https://github.com/username/project-two",
    previewUrl: "#",
    tag: "Web",
  },
  {
    id: 3,
    title: "Project Three",
    description: "Sed do eiusmod tempor.",
    image: "/images/projects/3.jpg",
    gitUrl: "https://github.com/username/project-three",
    previewUrl: "#",
    tag: "AI",
  },
  {
    id: 4,
    title: "Project Four",
    description: "Incididunt ut labore.",
    image: "/images/projects/4.jpg",
    gitUrl: "https://github.com/username/project-four",
    previewUrl: "#",
    tag: "AI",
  },
  {
    id: 5,
    title: "Project Five",
    description: "Dolore magna aliqua.",
    image: "/images/projects/5.jpg",
    gitUrl: "https://github.com/username/project-five",
    previewUrl: "#",
    tag: "Web",
  },
  {
    id: 6,
    title: "Project Six",
    description: "Ut enim ad minim veniam.",
    image: "/images/projects/6.jpg",
    gitUrl: "https://github.com/username/project-six",
    previewUrl: "#",
    tag: "AI",
  },
];

const ProjectSection = () => {
  const [selectedTag, setSelectedTag] = useState("All");

  const filteredProjects =
    selectedTag === "All"
      ? projectsData
      : projectsData.filter((project) => project.tag === selectedTag);

  return (
    <section id="projects" className="py-16 px-6">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        My Projects
      </h2>

      {/* Tags */}
      <div className="flex justify-center gap-4 mb-10">
        <ProjectTag
          name="All"
          isSelected={selectedTag === "All"}
          onClick={() => setSelectedTag("All")}
        />
        <ProjectTag
          name="Web"
          isSelected={selectedTag === "Web"}
          onClick={() => setSelectedTag("Web")}
        />
        <ProjectTag
          name="AI"
          isSelected={selectedTag === "AI"}
          onClick={() => setSelectedTag("AI")}
        />
      </div>

      {/* Projects */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            imgUrl={project.image}
            title={project.title}
            description={project.description}
            gitUrl={project.gitUrl}
            previewUrl={project.previewUrl}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectSection;
