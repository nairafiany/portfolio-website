"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
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

const TRANSITION_PHASES = {
  IDLE: "idle",
  PRESSING: "pressing",
  DRAWING: "drawing",
  CONNECTED: "connected",
  SCROLLING: "scrolling",
  SETTLING: "settling",
};

export default function TimelineCanvas({
  activeSection,
  onSectionChange,
  hasStarted,
  onStart,
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [travelDirection, setTravelDirection] = useState(1);
  const [transitionPhase, setTransitionPhase] = useState(
    TRANSITION_PHASES.IDLE,
  );
  const [transitionRoute, setTransitionRoute] = useState(null);
  const previousSection = useRef(activeSection);
  const transitionRun = useRef(0);
  const commandedTarget = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const isNavigating = transitionPhase !== TRANSITION_PHASES.IDLE;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (activeSection === previousSection.current) return;

    const nextDirection = activeSection > previousSection.current ? 1 : -1;
    previousSection.current = activeSection;

    if (commandedTarget.current === activeSection) {
      commandedTarget.current = null;
      return;
    }

    const settleFrame = window.requestAnimationFrame(() => {
      setTravelDirection(nextDirection);
      setTransitionPhase(TRANSITION_PHASES.SETTLING);
    });
    const settleTimer = window.setTimeout(
      () => setTransitionPhase(TRANSITION_PHASES.IDLE),
      prefersReducedMotion ? 0 : 360,
    );

    return () => {
      window.cancelAnimationFrame(settleFrame);
      window.clearTimeout(settleTimer);
    };
  }, [activeSection, prefersReducedMotion]);

  useEffect(
    () => () => {
      transitionRun.current += 1;
    },
    [],
  );

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

  const startConnectorTransition = async (targetSection) => {
    if (
      isNavigating ||
      targetSection < 0 ||
      targetSection >= SECTIONS.length ||
      Math.abs(targetSection - activeSection) !== 1
    )
      return;

    const direction = targetSection > activeSection ? 1 : -1;
    const runId = transitionRun.current + 1;
    transitionRun.current = runId;
    const wait = (duration) =>
      new Promise((resolve) => window.setTimeout(resolve, duration));
    const continueRun = () => transitionRun.current === runId;
    setTravelDirection(direction);
    setTransitionRoute({ from: activeSection, to: targetSection });

    if (prefersReducedMotion) {
      setTransitionPhase(TRANSITION_PHASES.CONNECTED);
      commandedTarget.current = targetSection;
      onSectionChange(targetSection);
      await wait(0);
      if (!continueRun()) return;
      setTransitionPhase(TRANSITION_PHASES.IDLE);
      setTransitionRoute(null);
      return;
    }

    if (isMobile) {
      setTransitionPhase(TRANSITION_PHASES.PRESSING);
      await wait(90);
      if (!continueRun()) return;
      setTransitionPhase(TRANSITION_PHASES.SCROLLING);
      commandedTarget.current = targetSection;
      onSectionChange(targetSection);
      await wait(360);
      if (!continueRun()) return;
      setTransitionPhase(TRANSITION_PHASES.SETTLING);
      await wait(120);
      if (!continueRun()) return;
      setTransitionPhase(TRANSITION_PHASES.IDLE);
      setTransitionRoute(null);
      return;
    }

    const timings = {
      press: 120,
      draw: 500,
      impact: 140,
      travel: 560,
      settle: 190,
    };

    setTransitionPhase(TRANSITION_PHASES.PRESSING);
    await wait(timings.press);
    if (!continueRun()) return;
    setTransitionPhase(TRANSITION_PHASES.DRAWING);

    await wait(timings.draw);
    if (!continueRun()) return;
    setTransitionPhase(TRANSITION_PHASES.CONNECTED);

    await wait(timings.impact);
    if (!continueRun()) return;
    setTransitionPhase(TRANSITION_PHASES.SCROLLING);
    commandedTarget.current = targetSection;
    onSectionChange(targetSection);

    await wait(timings.travel);
    if (!continueRun()) return;
    setTransitionPhase(TRANSITION_PHASES.SETTLING);

    await wait(timings.settle);
    if (!continueRun()) return;
    setTransitionPhase(TRANSITION_PHASES.IDLE);
    setTransitionRoute(null);
  };

  const handleConnect = () => startConnectorTransition(activeSection + 1);
  const handlePrev = () => startConnectorTransition(activeSection - 1);

  // --- NEW: JUMP TO CONTACT HANDLER ---
  const handleJumpToContact = () => {
    if (!isNavigating) {
      setTravelDirection(1);
      onSectionChange(SECTIONS.length - 1); // Pindah ke index terakhir (Contact)
    }
  };

  return (
    <div className="w-full h-full relative overflow-hidden personal-world">
      {/* === OVERLAY LANDING UI === */}
      <AnimatePresence>
        {!hasStarted && (
          <motion.div
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#f7f3e9]/90 backdrop-blur-md pointer-events-auto"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center px-5 relative max-w-3xl">
              <motion.div
                initial={{ rotate: -8, y: 15, opacity: 0 }}
                animate={{ rotate: 0, y: 0, opacity: 1 }}
                transition={{ type: "spring", delay: 0.05 }}
                className="group mx-auto mb-7 w-24 h-24 bg-[#ffd66b] border-2 border-[#29263b] rounded-[42%_58%_48%_52%] shadow-[6px_7px_0_#29263b] flex flex-col items-center justify-center gap-2"
                aria-hidden="true"
              >
                <div className="face text-[#29263b]">
                  <span className="face-eye" />
                  <span className="face-eye" />
                </div>
                <span className="face-mouth" />
              </motion.div>
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-5xl md:text-7xl font-black text-[#29263b] mb-5 tracking-[-0.055em] leading-[.95]"
              >
                Hi, I&apos;m Naira.
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-[#5f676b] mb-9 text-base md:text-lg font-medium italic"
              >
                Software projects, experiments, and things I&apos;m learning.
                Powered by coffee and curiosity.
              </motion.p>
              <motion.button
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.03, rotate: -1 }}
                whileTap={{ scale: 0.96 }}
                transition={{ delay: 0.6 }}
                onClick={onStart}
                className="playful-button px-8 py-4 bg-[#82d9b8] text-[#29263b] font-black text-lg"
              >
                Explore <span aria-hidden="true">→</span>
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
          backgroundImage: "radial-gradient(#29263b 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />

      <motion.div
        className="absolute top-0 left-1/2 h-full flex items-center"
        animate={{
          x: getCameraPosition(),
          scale: hasStarted ? 1 : isMobile ? 0.35 : 0.25,
        }}
        transition={{
          type: "tween",
          duration: prefersReducedMotion
            ? 0
            : transitionPhase === TRANSITION_PHASES.SCROLLING
              ? 0.56
              : 0.42,
          ease: [0.22, 0.8, 0.32, 1],
        }}
        style={{ width: "max-content" }}
      >
        {SECTIONS.map((SectionComponent, index) => (
          <React.Fragment key={index}>
            {/* === CARD FRAME === */}
            <motion.div
              initial={false}
              animate={
                !hasStarted
                  ? "overview"
                  : index === activeSection
                    ? "active"
                    : index < activeSection
                      ? "before"
                      : "after"
              }
              variants={{
                overview: {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  x: 0,
                  filter: "blur(0px)",
                },
                active: {
                  opacity: 1,
                  scale: 1,
                  y:
                    prefersReducedMotion ||
                    transitionPhase !== TRANSITION_PHASES.SETTLING
                      ? 0
                      : [6, -1, 0],
                  x: 0,
                  filter: "blur(0px)",
                },
                before: {
                  opacity: 0.48,
                  scale: 1,
                  y: 0,
                  x: 0,
                  filter: "blur(1px)",
                },
                after: {
                  opacity: 0.48,
                  scale: 1,
                  y: 0,
                  x: 0,
                  filter: "blur(1px)",
                },
              }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.52,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`
                relative flex flex-col shrink-0
                w-[90vw] lg:w-[1000px] h-[80vh] max-h-[700px] 
                organic-shell ${index === 0 ? "hero-main-card" : ""}
                ${index === activeSection && hasStarted ? "z-10" : "z-0"}
              `}
            >
              <motion.div
                animate={{
                  y: index === activeSection && hasStarted ? 0 : 3,
                  opacity: !hasStarted || index === activeSection ? 1 : 0.72,
                }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.28,
                  delay: index === activeSection ? 0.1 : 0,
                }}
                className={`absolute -top-10 left-7 flex items-center gap-2 select-none bg-[#ffd66b] border-2 border-[#29263b] rounded-full px-4 py-1 rotate-[-2deg] ${index === 0 ? "hero-speech-bubble" : ""}`}
              >
                <span className="text-[10px] font-black uppercase tracking-[.18em] text-[#29263b]">
                  {["Hello", "My story", "Things I made", "Say hello"][index]}
                </span>
              </motion.div>

              <div className="flex-1 overflow-hidden p-4 md:p-8 relative text-[#29263b]">
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
                      <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-[#ffd66b] text-[#29263b] border border-[#29263b] shadow-[2px_2px_0_#29263b] text-[9px] font-black tracking-[.14em] px-2.5 py-1 rounded-full opacity-0 translate-y-1 group-hover/node:opacity-100 group-hover/node:translate-y-0 group-focus-within/node:opacity-100 group-focus-within/node:translate-y-0 transition-all pointer-events-none whitespace-nowrap">
                        NEXT
                      </div>
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleConnect();
                        }}
                        aria-label="Next section"
                        disabled={isNavigating}
                        aria-busy={isNavigating}
                        whileHover={
                          prefersReducedMotion
                            ? undefined
                            : {
                                x: 2,
                                y: -2,
                                scale: 1.04,
                                boxShadow: "2px 2px 0 #29263b",
                              }
                        }
                        whileTap={
                          prefersReducedMotion
                            ? undefined
                            : {
                                scaleX: 1.06,
                                scaleY: 0.9,
                                y: 1,
                                boxShadow: "1px 1px 0 #29263b",
                              }
                        }
                        animate={{
                          rotate: 0,
                          scaleX:
                            transitionPhase === TRANSITION_PHASES.PRESSING
                              ? 1.08
                              : 1,
                          scaleY:
                            transitionPhase === TRANSITION_PHASES.PRESSING
                              ? 0.88
                              : 1,
                          y:
                            transitionPhase === TRANSITION_PHASES.PRESSING
                              ? 1
                              : 0,
                          boxShadow:
                            transitionPhase === TRANSITION_PHASES.PRESSING
                              ? "1px 1px 0 #29263b"
                              : "3px 3px 0 #29263b",
                        }}
                        transition={{
                          duration: prefersReducedMotion ? 0 : 0.24,
                          ease: "easeOut",
                        }}
                        className="w-10 h-10 rounded-full flex items-center justify-center bg-[#82d9b8] border-2 border-[#29263b] shadow-[3px_3px_0_#29263b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e85f52]"
                      >
                        <FaPlus className="w-3 h-3 text-[#29263b]" />
                      </motion.button>
                    </div>
                  )}

                  {index > 0 && (
                    <div className="absolute top-1/2 -left-[18px] -translate-y-1/2 z-50 hidden lg:block group/back">
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrev();
                        }}
                        aria-label="Previous section"
                        disabled={isNavigating}
                        aria-busy={isNavigating}
                        whileHover={
                          prefersReducedMotion
                            ? undefined
                            : { x: -2, y: -2, scale: 1.04 }
                        }
                        animate={{
                          rotate: 0,
                          scaleY:
                            transitionPhase === TRANSITION_PHASES.PRESSING
                              ? 0.88
                              : 1,
                          y:
                            transitionPhase === TRANSITION_PHASES.PRESSING
                              ? 1
                              : 0,
                          boxShadow:
                            transitionPhase === TRANSITION_PHASES.PRESSING
                              ? "1px 1px 0 #29263b"
                              : "3px 3px 0 #29263b",
                        }}
                        transition={{
                          duration: prefersReducedMotion ? 0 : 0.18,
                        }}
                        className="w-10 h-10 bg-[#ffd66b] border-2 border-[#29263b] shadow-[3px_3px_0_#29263b] rounded-full flex items-center justify-center text-[#29263b]"
                      >
                        <FaPlus size={12} className="rotate-45" />
                      </motion.button>
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
                          aria-label="Next section"
                          disabled={isNavigating}
                          className="absolute bottom-4 right-4 z-50 w-12 h-12 bg-[#82d9b8] border-2 border-[#29263b] rounded-full flex items-center justify-center text-[#29263b] shadow-[3px_3px_0_#29263b] active:scale-90 transition-transform"
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
                          aria-label="Previous section"
                          disabled={isNavigating}
                          className="absolute bottom-4 left-4 z-50 w-12 h-12 bg-[#ffd66b] rounded-full flex items-center justify-center text-[#29263b] shadow-[3px_3px_0_#29263b] active:scale-90 transition-transform border-2 border-[#29263b]"
                        >
                          <FaChevronLeft />
                        </button>
                      )}
                    </>
                  )}
                </>
              )}
            </motion.div>

            {index < SECTIONS.length - 1 && (
              <div
                className="relative h-[4px] shrink-0 flex items-center hidden lg:flex"
                style={{ width: `${GAP_DESKTOP}px` }}
              >
                {(() => {
                  const routeIndex = transitionRoute
                    ? Math.min(transitionRoute.from, transitionRoute.to)
                    : -1;
                  const isActiveRoute = index === routeIndex;
                  const connectorVisible =
                    isActiveRoute &&
                    ![
                      TRANSITION_PHASES.IDLE,
                      TRANSITION_PHASES.PRESSING,
                    ].includes(transitionPhase);
                  const connectorReached =
                    isActiveRoute &&
                    [
                      TRANSITION_PHASES.CONNECTED,
                      TRANSITION_PHASES.SCROLLING,
                      TRANSITION_PHASES.SETTLING,
                    ].includes(transitionPhase);

                  return (
                    <>
                      <svg
                        className="absolute inset-x-0 h-8 overflow-visible pointer-events-none"
                        viewBox={`0 0 ${GAP_DESKTOP} 32`}
                        preserveAspectRatio="none"
                        aria-hidden="true"
                      >
                        <motion.path
                          d={
                            travelDirection > 0
                              ? `M 0 16 H ${GAP_DESKTOP}`
                              : `M ${GAP_DESKTOP} 16 H 0`
                          }
                          fill="none"
                          stroke="#29263b"
                          strokeWidth="3"
                          strokeLinecap="round"
                          initial={false}
                          animate={{
                            pathLength: connectorVisible ? 1 : 0,
                            opacity: connectorVisible ? 1 : 0,
                          }}
                          transition={{
                            pathLength: {
                              duration: prefersReducedMotion
                                ? 0
                                : isMobile
                                  ? 0.31
                                  : 0.5,
                              ease: [0.2, 0.75, 0.15, 1],
                            },
                            opacity: {
                              duration: prefersReducedMotion ? 0 : 0.1,
                            },
                          }}
                        />
                        <motion.circle
                          cy="16"
                          r="4"
                          fill="#e85f52"
                          initial={false}
                          animate={{
                            cx:
                              transitionPhase === TRANSITION_PHASES.DRAWING
                                ? travelDirection > 0
                                  ? GAP_DESKTOP
                                  : 0
                                : travelDirection > 0
                                  ? 0
                                  : GAP_DESKTOP,
                            opacity:
                              isActiveRoute &&
                              transitionPhase === TRANSITION_PHASES.DRAWING
                                ? [0, 1, 1, 0]
                                : 0,
                          }}
                          transition={{
                            cx: {
                              duration: prefersReducedMotion ? 0 : 0.5,
                              ease: [0.2, 0.75, 0.15, 1],
                            },
                            opacity: {
                              duration: prefersReducedMotion ? 0 : 0.5,
                              times: [0, 0.12, 0.82, 1],
                            },
                          }}
                        />
                      </svg>
                      <motion.div
                        className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 border-[#29263b] bg-[#ffd66b] shadow-[2px_2px_0_#29263b] ${travelDirection > 0 ? "-right-[10px]" : "-left-[10px]"}`}
                        initial={false}
                        animate={{
                          opacity: connectorVisible ? 1 : 0,
                          scale:
                            transitionPhase === TRANSITION_PHASES.CONNECTED
                              ? [1, 1.12, 0.97, 1]
                              : connectorReached
                                ? 1
                                : 0.72,
                          boxShadow:
                            transitionPhase === TRANSITION_PHASES.CONNECTED
                              ? [
                                  "2px 2px 0 #29263b",
                                  "1px 1px 0 #29263b",
                                  "3px 3px 0 #29263b",
                                ]
                              : "2px 2px 0 #29263b",
                        }}
                        transition={{
                          duration: prefersReducedMotion ? 0 : 0.24,
                          ease: "easeOut",
                        }}
                      />
                      <motion.div
                        className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-[#e85f52] pointer-events-none ${travelDirection > 0 ? "-right-[16px]" : "-left-[16px]"}`}
                        animate={{
                          opacity:
                            transitionPhase === TRANSITION_PHASES.CONNECTED
                              ? [0, 0.65, 0]
                              : 0,
                          scale:
                            transitionPhase === TRANSITION_PHASES.CONNECTED
                              ? [0.7, 1.35]
                              : 0.7,
                        }}
                        transition={{
                          duration: prefersReducedMotion ? 0 : 0.32,
                        }}
                      />
                    </>
                  );
                })()}
              </div>
            )}

            <div className="w-[20px] shrink-0 lg:hidden"></div>
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}
