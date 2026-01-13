"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaChevronRight, FaChevronLeft } from "react-icons/fa6";

// Import card components
import HeroCard from "./cards/HeroCard";
import AboutCard from "./cards/AboutCard";
import ProjectsCard from "./cards/ProjectsCard";
import ContactCard from "./cards/ContactCard";

const SECTIONS = [
  <HeroCard key="hero" />,
  <AboutCard key="about" />,
  <ProjectsCard key="projects" />,
  <ContactCard key="contact" />,
];

// KONFIGURASI UKURAN
const CARD_WIDTH_DESKTOP = 1000;
const GAP_DESKTOP = 300;
const CARD_WIDTH_MOBILE_VW = 90; // 90vw
const GAP_MOBILE = 20;

export default function TimelineCanvas({
  activeSection,
  onSectionChange,
  hasStarted,
  onStart,
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getCameraPosition = () => {
    let cardPx, gapPx;
    if (isMobile) {
      cardPx = (windowWidth * CARD_WIDTH_MOBILE_VW) / 100;
      gapPx = GAP_MOBILE;
    } else {
      cardPx = CARD_WIDTH_DESKTOP;
      gapPx = GAP_DESKTOP;
    }

    if (!hasStarted) {
      const totalCards = SECTIONS.length;
      const totalCanvasWidth = totalCards * cardPx + (totalCards - 1) * gapPx;
      return -(totalCanvasWidth / 2);
    }

    const offsetCenter = cardPx / 2;
    const sectionOffset = activeSection * (cardPx + gapPx);
    return -(offsetCenter + sectionOffset);
  };

  const handleConnect = () => {
    if (activeSection < SECTIONS.length - 1 && !isNavigating) {
      setIsNavigating(true);
      const delay = isMobile ? 0 : 600;
      setTimeout(() => {
        onSectionChange(activeSection + 1);
        setIsNavigating(false);
      }, delay);
    }
  };

  const handlePrev = () => {
    if (activeSection > 0 && !isNavigating) {
      setIsNavigating(true);
      onSectionChange(activeSection - 1);
      setTimeout(() => setIsNavigating(false), 500);
    }
  };

  // --- NEW: JUMP TO CONTACT HANDLER ---
  const handleJumpToContact = () => {
    if (!isNavigating) {
      setIsNavigating(true);
      onSectionChange(SECTIONS.length - 1); // Pindah ke index terakhir (Contact)
      setTimeout(() => setIsNavigating(false), 1200); // Waktu animasi travel sedikit lebih lama
    }
  };

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#0a0a0a]">
      {/* === OVERLAY LANDING UI === */}
      <AnimatePresence>
        {!hasStarted && (
          <motion.div
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm pointer-events-auto"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center px-4">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter"
              >
                Naira's <span className="text-emerald-500">Portfolio</span>
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-400 mb-8 text-lg"
              >
                Powered by coffee and curiosity.
              </motion.p>
              <motion.button
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ delay: 0.6 }}
                onClick={onStart}
                className="px-8 py-4 bg-white text-black rounded-full font-bold text-lg shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(16,185,129,0.6)] transition-shadow"
              >
                Start Exploring
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="absolute inset-0 w-[200vw] h-[200vh] -top-[50vh] -left-[50vw] z-0 pointer-events-none opacity-20"
        animate={{
          backgroundPositionX: hasStarted ? -(activeSection * 150) : 0,
          scale: hasStarted ? 1 : 1.5,
        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        style={{
          backgroundImage: "radial-gradient(#888 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <motion.div
        className="absolute top-0 left-1/2 h-full flex items-center"
        animate={{
          x: getCameraPosition(),
          scale: hasStarted ? 1 : isMobile ? 0.35 : 0.25,
        }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 20,
          mass: 1.2,
          duration: 1.5,
        }}
        style={{ width: "max-content" }}
      >
        {SECTIONS.map((SectionComponent, index) => (
          <React.Fragment key={index}>
            {/* === CARD FRAME === */}
            <div
              className={`
                relative flex flex-col shrink-0
                w-[90vw] lg:w-[1000px] h-[80vh] max-h-[700px] 
                bg-[#121212] rounded-[1.5rem] lg:rounded-[2rem] border-4
                transition-all duration-500 shadow-2xl
                ${
                  index === activeSection && hasStarted
                    ? "border-blue-500/50 shadow-[0_0_80px_rgba(59,130,246,0.15)] opacity-100 scale-100 z-10"
                    : hasStarted
                    ? "border-[#333] opacity-40 blur-[1px] scale-95 z-0"
                    : "!opacity-100 !blur-0 !scale-100 !border-gray-800"
                } 
              `}
            >
              <div className="absolute -top-8 left-0 flex items-center gap-2 select-none">
                <span
                  className={`text-xs font-bold font-mono ${
                    index === activeSection ? "text-blue-500" : "text-gray-600"
                  }`}
                >
                  FRAME {index + 1}
                </span>
              </div>

              <div className="h-10 md:h-12 border-b border-gray-800 flex items-center px-4 md:px-6 gap-2 bg-white/5 rounded-t-[1.3rem] md:rounded-t-[1.8rem] shrink-0">
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500"></div>
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500"></div>
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500"></div>
              </div>

              <div className="flex-1 overflow-hidden p-4 md:p-8 relative">
                {index === 0
                  ? React.cloneElement(SectionComponent, {
                      onContactClick: handleJumpToContact,
                    })
                  : SectionComponent}
              </div>

              {hasStarted && index === activeSection && (
                <>
                  {index < SECTIONS.length - 1 && (
                    <div className="absolute top-1/2 -right-[18px] -translate-y-1/2 z-50 group/node hidden lg:block">
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-2 py-0.5 rounded opacity-0 group-hover/node:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                        Next
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleConnect();
                        }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 bg-[#121212] border-[3px] ${
                          isNavigating
                            ? "border-blue-500 scale-110 shadow-[0_0_15px_#3b82f6]"
                            : "border-white hover:border-blue-500 hover:bg-blue-500 hover:scale-125"
                        }`}
                      >
                        <FaPlus
                          className={`w-3 h-3 text-white transition-opacity duration-200 ${
                            isNavigating
                              ? "opacity-100"
                              : "opacity-0 group-hover/node:opacity-100"
                          }`}
                        />
                      </button>
                    </div>
                  )}

                  {index > 0 && (
                    <div className="absolute top-1/2 -left-[18px] -translate-y-1/2 z-50 hidden lg:block group/back">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrev();
                        }}
                        className="w-8 h-8 bg-[#121212] border-[3px] border-gray-600 rounded-full flex items-center justify-center text-gray-400 hover:border-blue-500 hover:text-white transition-all hover:scale-110"
                      >
                        <FaPlus size={12} className="rotate-45" />
                      </button>
                    </div>
                  )}

                  {isMobile && (
                    <>
                      {index < SECTIONS.length - 1 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleConnect();
                          }}
                          className="absolute bottom-4 right-4 z-50 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg active:scale-90 transition-transform"
                        >
                          <FaChevronRight />
                        </button>
                      )}
                      {index > 0 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePrev();
                          }}
                          className="absolute bottom-4 left-4 z-50 w-12 h-12 bg-[#2a2a2a] rounded-full flex items-center justify-center text-white shadow-lg active:scale-90 transition-transform border border-gray-700"
                        >
                          <FaChevronLeft />
                        </button>
                      )}
                    </>
                  )}
                </>
              )}
            </div>

            {index < SECTIONS.length - 1 && (
              <div
                className="relative h-[4px] shrink-0 flex items-center hidden lg:flex"
                style={{ width: `${GAP_DESKTOP}px` }}
              >
                <motion.div
                  className={`h-[4px] bg-blue-500 rounded-full shadow-[0_0_15px_#3b82f6] origin-left`}
                  initial={{ width: "0%" }}
                  style={{ marginLeft: "-25px" }}
                  animate={{
                    width:
                      index < activeSection ||
                      (isNavigating && index === activeSection)
                        ? "calc(100% + 100px)"
                        : "0%",
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                />
              </div>
            )}

            <div className="w-[20px] shrink-0 lg:hidden"></div>
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}
