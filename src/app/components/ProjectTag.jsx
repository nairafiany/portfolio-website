"use client";
import React from "react";

const ProjectTag = ({ name, isSelected, onClick }) => {
  const buttonStyles = isSelected
    ? "bg-emerald-400 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]"
    : "bg-white/5 text-[#ADB7BE] border border-white/10 hover:text-white hover:border-emerald-400/40";

  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 rounded-full text-sm font-medium transition ${buttonStyles}`}
    >
      {name}
    </button>
  );
};

export default ProjectTag;
