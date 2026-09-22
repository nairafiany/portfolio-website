"use client";

import ProjectCard from "../projects/ProjectCard";
import { groupProjectsByYear, projects } from "@/app/data/projects";

const groupedProjects = groupProjectsByYear();

export default function ProjectsCard() {
  const iosScrollbarStyle = `
    overflow-x-hidden
    overflow-y-auto
    scrollbar-thin
    [&::-webkit-scrollbar]:w-1.5
    [&::-webkit-scrollbar-track]:bg-transparent
    [&::-webkit-scrollbar-thumb]:bg-[#8ecfd3]
    [&::-webkit-scrollbar-thumb]:rounded-full
  `;

  return (
    <section className="flex h-full flex-col text-[#29263b]" aria-labelledby="projects-heading">
      <div className="mb-6 shrink-0 px-1">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 id="projects-heading" className="text-3xl font-black tracking-tight text-[#29263b]">
              Things I&apos;ve built
            </h2>
            <p className="mt-1 text-sm text-[#5f676b]">
              {projects.length} projects, each with a story and a tiny bit of personality.
            </p>
          </div>
          <div
            className="hidden rotate-3 flex-col items-center rounded-[45%] border-2 border-[#29263b] bg-[#ffd66b] p-3 sm:flex"
            aria-hidden="true"
          >
            <div className="face">
              <span className="face-eye" />
              <span className="face-eye" />
            </div>
            <span className="face-mouth mt-1" />
          </div>
        </div>
      </div>

      <div className={`hover-safe-region flex flex-1 flex-col gap-8 pb-32 pr-2 ${iosScrollbarStyle}`}>
        {groupedProjects.map((group) => (
          <section key={group.label} aria-labelledby={`project-year-${group.label}`}>
            <div className="mb-3 flex items-center gap-3">
              <h3
                id={`project-year-${group.label}`}
                className="font-mono text-xs font-black uppercase tracking-[0.18em] text-[#5d536d]"
              >
                {group.label}
              </h3>
              <span className="h-px flex-1 bg-[#29263b]/15" aria-hidden="true" />
              <span className="font-mono text-[10px] text-[#77717e]">
                {String(group.projects.length).padStart(2, "0")}
              </span>
            </div>
            <div className="flex flex-col gap-5">
              {group.projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
