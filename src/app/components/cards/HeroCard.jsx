"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaArrowRight, FaGithub, FaLinkedin } from "react-icons/fa6";

const companionSpring = { type: "spring", stiffness: 330, damping: 18 };

export default function HeroCard({ onContactClick }) {
  const heroRef = useRef(null);
  const [isCoverHovered, setIsCoverHovered] = useState(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 110, damping: 22 });
  const smoothY = useSpring(pointerY, { stiffness: 110, damping: 22 });
  const portraitX = useTransform(smoothX, [-1, 1], [-6, 6]);
  const portraitY = useTransform(smoothY, [-1, 1], [-4, 4]);

  const handlePointerMove = (event) => {
    const bounds = heroRef.current?.getBoundingClientRect();
    if (!bounds) return;
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 2);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 2);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <div
      ref={heroRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      className="hero-stage h-full w-full flex flex-col md:flex-row items-center justify-center gap-7 md:gap-12 px-2 md:px-6 text-[#29263b] overflow-y-auto overflow-x-clip custom-scrollbar"
    >
      <div className="flex-1 order-2 md:order-1 text-center md:text-left relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ rotate: 1 }}
          className="availability-badge group inline-flex items-center gap-2 bg-[#dff6e9] border-2 border-[#29263b] rounded-full px-3 py-1.5 mb-4 rotate-[-1deg]"
        >
          <span className="availability-dot" />
          <span className="text-[11px] font-black tracking-wide">
            I&apos;m available!
          </span>
        </motion.div>

        <p className="text-base md:text-xl font-bold mb-1 text-[#5f676b]">
          Hi there, I&apos;m
        </p>
        <h1 className="font-black text-3xl sm:text-4xl lg:text-6xl tracking-[-.055em] leading-[.95] mb-4">
          Naira S. Afiany
        </h1>
        <div className="h-8 text-sm sm:text-base md:text-lg font-bold text-[#5f676b] mb-3">
          <TypeAnimation
            sequence={[
              "Information Systems Student",
              1800,
              "Fullstack Developer",
              1800,
              "AI Enthusiast",
              1800,
            ]}
            speed={55}
            repeat={Infinity}
          />
        </div>
        <p className="max-w-xl mx-auto md:mx-0 text-xs sm:text-sm md:text-base leading-relaxed text-[#5f676b] mb-6">
          I build scalable, reliable systems that solve real problems—with a
          soft spot for thoughtful details, learning in public, and making
          technology feel more human.
        </p>

        <div className="hero-actions flex flex-wrap gap-3 justify-center md:justify-start items-center">
          <span className="contact-action-wrap">
            <motion.button
              onClick={onContactClick}
              whileTap={{ scaleX: 1.04, scaleY: 0.9 }}
              transition={companionSpring}
              className="physical-button contact-button group bg-[#82d9b8] px-5 py-3 font-black text-sm flex items-center gap-2"
            >
              Contact Me
              <FaArrowRight className="button-arrow" />
              <span className="comic-pop" aria-hidden="true">
                SAY HI!
              </span>
            </motion.button>
          </span>
          <motion.a
            href="https://github.com/nairafiany"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            whileTap={{ scaleX: 1.08, scaleY: 0.88 }}
            transition={companionSpring}
            className="physical-button social-button bg-white p-3"
          >
            <FaGithub />
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/nairafiany"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
            whileTap={{ scaleX: 1.08, scaleY: 0.88 }}
            transition={companionSpring}
            className="physical-button social-button bg-[#b9dced] p-3"
          >
            <FaLinkedin />
          </motion.a>
        </div>
      </div>

      <motion.div
        style={{ x: portraitX, y: portraitY }}
        onHoverStart={() => setIsCoverHovered(true)}
        onHoverEnd={() => setIsCoverHovered(false)}
        whileTap={{ y: -1, scale: 0.99 }}
        className={`portrait-character comic-cover-wrap relative order-1 md:order-2 w-56 h-64 sm:w-64 sm:h-80 lg:w-[310px] lg:h-[390px] shrink-0 ${isCoverHovered ? "is-cover-hovered" : ""}`}
        aria-label="Naira editorial profile cover"
      >
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.94 }}
          animate={{
            opacity: 1,
            y: isCoverHovered ? -3 : 0,
            rotate: isCoverHovered ? 1.1 : 0,
            scale: 1,
          }}
          transition={{ type: "spring", stiffness: 210, damping: 19 }}
          className="portrait-body absolute inset-0"
        >
          <div className="comic-cover-shadow" />
          <article className="comic-cover-panel">
            <header className="comic-cover-header">
              <div className="cover-kicker">
                <span>VOL. 01</span>
                <span>JKT / WWW</span>
              </div>
              <motion.span
                animate={
                  isCoverHovered
                    ? { scaleY: 0.94, rotate: 1 }
                    : { scaleY: 1, rotate: -1 }
                }
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
                className="cover-backend-mark"
              >
                BACKEND
              </motion.span>
              <strong>DEV NOTES</strong>
              <small>A PORTFOLIO SNAPSHOT · WORK IN PROGRESS</small>
            </header>
            <div className="comic-photo-window">
              <Image
                src="/images/naira_pic.jpeg"
                alt="Naira S. Afiany"
                fill
                priority
                sizes="(max-width:768px) 240px, 288px"
                className={`hero-profile-photo object-cover transition-transform duration-300 ${isCoverHovered ? "translate-x-[2px] -translate-y-[1px] scale-[1.018]" : ""}`}
              />
              <span className="photo-halftone" aria-hidden="true" />
              <motion.span
                animate={
                  isCoverHovered ? { x: -3, rotate: -1 } : { x: 0, rotate: 1 }
                }
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="cover-code-mark"
                aria-label="Web development editorial mark"
              >
                <small>WEB</small>
                <b>&lt;/&gt;</b>
              </motion.span>
              <span className="cover-stamp" aria-hidden="true">
                KEEP
                <br />
                BUILDING!
              </span>
            </div>
            <footer className="comic-cover-caption">
              <strong>THINGS I’VE BUILT.</strong>
              <small>Projects and experiments by nairafiany</small>
              <motion.span
                animate={isCoverHovered ? { x: -2 } : { x: 0 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className="cover-systems-mark"
              >
                SYSTEMS
              </motion.span>
            </footer>
          </article>
        </motion.div>
      </motion.div>
    </div>
  );
}
