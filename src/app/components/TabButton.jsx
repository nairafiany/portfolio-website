"use client";
import React from "react";

const TabButton = ({ active, selectTab, children }) => {
  return (
    <button
      onClick={selectTab}
      className={`pb-2 text-lg sm:text-xl font-medium transition border-b-2 ${
        active
          ? "text-white border-emerald-400"
          : "text-[#ADB7BE] border-transparent hover:text-white"
      }`}
    >
      {children}
    </button>
  );
};

export default TabButton;
