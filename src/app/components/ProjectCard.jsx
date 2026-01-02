import React from "react";
import Link from "next/link";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/solid";

const ProjectCard = ({ imgUrl, title, description, gitUrl, previewUrl }) => {
  return (
    <div
      className="group rounded-2xl overflow-hidden
                 bg-white/5 backdrop-blur
                 border border-white/10
                 transition-all duration-300
                 hover:-translate-y-2
                 hover:border-emerald-400/40
                 hover:shadow-[0_16px_40px_rgba(16,185,129,0.18)]"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <div
          className="h-52 md:h-64 bg-cover bg-center
                     transition-transform duration-500
                     group-hover:scale-105"
          style={{ backgroundImage: `url(${imgUrl})` }}
        />

        {/* Dark overlay */}
        <div
          className="absolute inset-0
                     bg-black/0
                     group-hover:bg-black/50
                     transition-colors duration-500"
        />

        {/* Hover Icons */}
        <div
          className="absolute inset-0 flex items-center justify-center gap-6
                     opacity-0 group-hover:opacity-100
                     transition-opacity duration-500"
        >
          {gitUrl && (
            <Link
              href={gitUrl}
              target="_blank"
              className="p-3 rounded-full bg-black/60
                         hover:bg-emerald-400 transition"
            >
              <CodeBracketIcon className="w-6 h-6 text-white hover:text-black" />
            </Link>
          )}

          {previewUrl && (
            <Link
              href={previewUrl}
              target="_blank"
              className="p-3 rounded-full bg-black/60
                         hover:bg-emerald-400 transition"
            >
              <EyeIcon className="w-6 h-6 text-white hover:text-black" />
            </Link>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h5 className="text-lg font-semibold text-white mb-1">{title}</h5>

        <p className="text-sm text-[#ADB7BE] leading-relaxed mb-4">
          {description}
        </p>

        <span
          className="inline-flex items-center gap-1
                     text-sm font-medium
                     text-emerald-400
                     group-hover:text-emerald-300
                     transition"
        ></span>
      </div>
    </div>
  );
};

export default ProjectCard;
