import React from "react";
import Link from "next/link";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/solid";

const ProjectCard = ({
  imgUrl,
  title,
  description,
  gitUrl,
  previewUrl,
  techStack = [],
  useContain = false,
  tags = [],
}) => {
  const bgClass = useContain
    ? "bg-contain bg-no-repeat bg-[#181818]"
    : "bg-cover";

  return (
    <div className="group rounded-2xl overflow-hidden bg-white/5 backdrop-blur border border-white/10 transition-all duration-300 hover:-translate-y-2 hover:border-emerald-400/40 hover:shadow-[0_16px_40px_rgba(16,185,129,0.18)] flex flex-col h-full">
      <div className="relative overflow-hidden shrink-0">
        <div className="absolute top-3 right-3 z-20 flex flex-wrap justify-end gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-[10px] uppercase tracking-wider font-bold text-emerald-300 bg-black/60 backdrop-blur-md border border-emerald-500/30 rounded-full shadow-lg"
            >
              {tag}
            </span>
          ))}
        </div>

        <div
          className={`h-52 md:h-64 bg-center transition-transform duration-500 group-hover:scale-105 ${bgClass}`}
          style={{ backgroundImage: `url(${imgUrl})` }}
        />

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-500" />

        <div className="absolute inset-0 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
          {gitUrl && (
            <Link
              href={gitUrl}
              target="_blank"
              className="p-3 rounded-full bg-black/60 hover:bg-emerald-400 transition"
            >
              <CodeBracketIcon className="w-6 h-6 text-white hover:text-black" />
            </Link>
          )}
          {previewUrl && (
            <Link
              href={previewUrl}
              target="_blank"
              className="p-3 rounded-full bg-black/60 hover:bg-emerald-400 transition"
            >
              <EyeIcon className="w-6 h-6 text-white hover:text-black" />
            </Link>
          )}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h5 className="text-lg font-semibold text-white mb-2">{title}</h5>
        <p className="text-sm text-[#ADB7BE] leading-relaxed mb-6 flex-grow">
          {description}
        </p>

        {techStack.length > 0 && (
          <div className="mt-auto pt-4 border-t border-white/10">
            <div className="flex items-center gap-4 flex-wrap">
              {techStack.map((tech, index) => (
                <div
                  key={index}
                  className="relative group/tooltip transition-transform hover:scale-110 duration-300"
                  title={tech.name}
                >
                  {typeof tech.icon === "string" ? (
                    <i className={`${tech.icon} text-2xl`}></i>
                  ) : (
                    <div className="text-2xl text-white">{tech.icon}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
