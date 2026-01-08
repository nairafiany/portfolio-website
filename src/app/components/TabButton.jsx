"use client";
import React from "react";

const TabButton = ({ active, selectTab, children }) => {
  const buttonClasses = active
    ? "text-white border-emerald-400"
    : "text-[#ADB7BE] border-transparent hover:text-white";

  return (
    <button
      onClick={selectTab}
      className={`pb-2 text-lg sm:text-xl font-medium transition border-b-2 ${buttonClasses}`}
    >
      {children}
    </button>
  );
};

export default TabButton;
