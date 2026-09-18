"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { FaArrowRight, FaGithub, FaLinkedin } from "react-icons/fa6";
import { getProjectNumber, projects } from "@/app/data/projects";
import TransitionLink from "../projects/TransitionLink";

const companionSpring = { type: "spring", stiffness: 330, damping: 18 };
const sceneMotionQuery = "(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
const selectedProjects = projects.slice(0, 3);
// An intentionally sparse illustration, not dates, counts, or GitHub activity.
const journeySketch = [
  "000001000000000000", "010012000000010000", "000000001000000000",
  "001020000001000000", "000100001200000000", "010000010000000000",
  "000012200000100000", "001001000100000000", "010120000000000000",
  "000010010000010000", "001230001000000000", "010100000010000000",
  "000021001000000000", "001100000000000000",
];

export default function HeroCard({ onContactClick, onProjectsClick }) {
  const [isCoverPointerOver, setIsCoverPointerOver] = useState(false);
  const [isInsertOpen, setIsInsertOpen] = useState(false);
  const insertId = useId();
  const insertTriggerRef = useRef(null);
  const coverRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const isCoverHovered = isCoverPointerOver && !prefersReducedMotion;
  const sceneRef = useRef(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const cardX = useSpring(pointerX, { stiffness: 90, damping: 24 });
  const cardY = useSpring(pointerY, { stiffness: 90, damping: 24 });
  const paperX = useTransform(cardX, (value) => value * 0.64);
  const paperY = useTransform(cardY, (value) => value * 0.64);
  const detailX = useTransform(cardX, (value) => value * 0.36);
  const detailY = useTransform(cardY, (value) => value * 0.36);
  const tiltX = useTransform(cardY, [-7, 7], [3, -3]);
  const tiltY = useTransform(cardX, [-7, 7], [-4, 4]);
  // Small offsets give the clipped cover's printed layers a sense of depth.
  const photoX = useTransform(cardX, (value) => value * 0.22);
  const photoY = useTransform(cardY, (value) => value * 0.22);
  const stickerX = useTransform(cardX, (value) => value * 0.4);
  const stickerY = useTransform(cardY, (value) => value * 0.4);
  const stampX = useTransform(cardX, (value) => value * 0.55);
  const stampY = useTransform(cardY, (value) => value * 0.55);
  const typeX = useTransform(cardX, (value) => value * 0.12);
  const typeY = useTransform(cardY, (value) => value * 0.12);

  const closeInsert = () => {
    setIsInsertOpen(false);
    insertTriggerRef.current?.focus({ preventScroll: true });
  };

  useEffect(() => {
    if (!isInsertOpen) return;
    const handleOutsidePointer = (event) => {
      if (sceneRef.current?.contains(event.target)) return;
      if (sceneRef.current?.contains(document.activeElement)) {
        insertTriggerRef.current?.focus({ preventScroll: true });
      }
      setIsInsertOpen(false);
    };
    const handleEscape = (event) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setIsInsertOpen(false);
      insertTriggerRef.current?.focus({ preventScroll: true });
    };
    const handleFocusOutside = (event) => {
      if (!sceneRef.current?.contains(event.target)) setIsInsertOpen(false);
    };
    document.addEventListener("pointerdown", handleOutsidePointer);
    document.addEventListener("keydown", handleEscape);
    document.addEventListener("focusin", handleFocusOutside);
    return () => {
      document.removeEventListener("pointerdown", handleOutsidePointer);
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("focusin", handleFocusOutside);
    };
  }, [isInsertOpen]);

  useEffect(() => {
    const media = window.matchMedia(sceneMotionQuery);
    const resetMotion = () => {
      if (!media.matches) {
        pointerX.set(0);
        pointerY.set(0);
        cardX.jump(0);
        cardY.jump(0);
        setIsCoverPointerOver(false);
      }
    };
    media.addEventListener("change", resetMotion);
    return () => media.removeEventListener("change", resetMotion);
  }, [pointerX, pointerY, cardX, cardY]);

  const handleScenePointerMove = (event) => {
    if (event.pointerType !== "mouse" || !window.matchMedia(sceneMotionQuery).matches) return;
    const bounds = coverRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const normalize = (position, start, size) =>
      Math.max(-1, Math.min(1, ((position - start) / size - 0.5) * 2));
    pointerX.set(normalize(event.clientX, bounds.left, bounds.width) * 7);
    pointerY.set(normalize(event.clientY, bounds.top, bounds.height) * 7);
  };

  const resetScenePointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <div className="hero-layout">
    <div
      className="hero-stage h-full w-full flex flex-col md:flex-row items-center justify-center gap-7 md:gap-12 px-2 md:px-6 text-[#29263b] overflow-y-auto overflow-x-clip custom-scrollbar"
      data-insert-open={isInsertOpen}
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

      <div
        ref={sceneRef}
        className="hero-editorial-scene relative order-1 md:order-2 shrink-0"
        data-insert-open={isInsertOpen}
      >
        <motion.div
          className="editorial-texture-layer scene-parallax"
          style={{ x: detailX, y: detailY }}
          aria-hidden="true"
        >
          <span className="editorial-halftone" />
        </motion.div>
        <motion.div
          className="editorial-journey-layer scene-parallax"
          style={{ x: detailX, y: detailY }}
          aria-hidden="true"
        >
          <figure className="editorial-journey-sheet">
            <figcaption>Journey sketch</figcaption>
            <svg className="editorial-journey-grid" viewBox="0 0 216 168" focusable="false">
              {journeySketch.flatMap((row, rowIndex) =>
                [...row].map((tone, columnIndex) => (
                  <rect
                    key={`${rowIndex}-${columnIndex}`}
                    className="journey-cell"
                    data-tone={tone}
                    x={columnIndex * 12}
                    y={rowIndex * 12}
                    width="9"
                    height="9"
                    rx="1.5"
                  />
                )),
              )}
            </svg>
            <small>ILLUSTRATIVE</small>
          </figure>
        </motion.div>
        <motion.div
          className="editorial-detail-layer scene-parallax"
          style={{ x: detailX, y: detailY }}
          aria-hidden="true"
        >
          <span className="editorial-handnote editorial-commit-note">A COMMIT<br />AT A TIME</span>
          <svg className="editorial-drawn-arrow editorial-commit-arrow" viewBox="0 0 80 44" fill="none" focusable="false">
            <path d="M3 9C32-2 65 5 69 33M60 27l10 8 5-12" />
          </svg>
          <span className="editorial-handnote editorial-started-note">JUST GETTING<br />STARTED...</span>
          <svg className="editorial-drawn-arrow editorial-started-arrow" viewBox="0 0 42 58" fill="none" focusable="false">
            <path d="M9 54C6 36 13 19 31 7M21 9l12-4-1 12" />
          </svg>
          <span className="editorial-handnote editorial-more-note">MORE<br />TO COME</span>
          <svg className="editorial-drawn-arrow editorial-more-arrow" viewBox="0 0 48 58" fill="none" focusable="false">
            <path d="M38 54C42 33 31 16 8 9M15 3 5 8l8 10" />
          </svg>
          <span className="editorial-log-note">01 / DEV LOG</span>
        </motion.div>
        <motion.div
          className="editorial-paper-layer scene-parallax"
          style={{ x: paperX, y: paperY }}
          aria-hidden="true"
        >
          <svg className="editorial-paper" viewBox="0 0 320 430" preserveAspectRatio="none" focusable="false">
            <path className="editorial-paper-cutout" d="M17 9 285 3 311 26 316 134 311 253 317 404 287 423 154 418 13 427 5 316 9 191 3 40Z" />
            <path className="editorial-paper-fold" d="m285 3 1 26 25-3" />
          </svg>
        </motion.div>
        <motion.div
          ref={coverRef}
          style={{ x: cardX, y: cardY }}
          onPointerMove={handleScenePointerMove}
          onPointerLeave={resetScenePointer}
          onPointerCancel={resetScenePointer}
          onHoverStart={() =>
            setIsCoverPointerOver(window.matchMedia(sceneMotionQuery).matches)
          }
          onHoverEnd={() => setIsCoverPointerOver(false)}
          className={`portrait-character comic-cover-wrap scene-parallax ${isCoverHovered ? "is-cover-hovered" : ""}`}
          aria-label="Naira editorial profile cover"
        >
          <motion.div
            initial={false}
            style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1200 }}
            animate={{ y: isCoverHovered ? -5 : 0, rotate: isCoverHovered ? 0 : -1 }}
            transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 190, damping: 23 }}
            className="portrait-body"
          >
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
                <motion.strong className="cover-depth" style={{ x: typeX, y: typeY }}>DEV NOTES</motion.strong>
                <small>A PORTFOLIO SNAPSHOT · WORK IN PROGRESS</small>
              </header>
              <div className="comic-photo-window">
                <motion.div className="cover-photo-depth cover-depth" style={{ x: photoX, y: photoY }}>
                  <Image
                    src="/images/naira_pic.jpeg"
                    alt="Naira S. Afiany"
                    fill
                    priority
                    sizes="(min-width:1024px) 300px, 244px"
                    className="hero-profile-photo object-cover"
                  />
                </motion.div>
                <span className="photo-halftone" aria-hidden="true" />
                <motion.span
                  animate={
                    isCoverHovered ? { rotate: -1, scale: 1.025 } : { rotate: 1, scale: 1 }
                  }
                  style={{ x: stickerX, y: stickerY }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  className="cover-code-mark cover-depth"
                  aria-label="Web development editorial mark"
                >
                  <small>WEB</small>
                  <b>&lt;/&gt;</b>
                </motion.span>
                <motion.span
                  className="cover-stamp cover-depth"
                  style={{ x: stampX, y: stampY }}
                  animate={{ scale: isCoverHovered ? 1.03 : 1 }}
                  transition={prefersReducedMotion ? { duration: 0 } : companionSpring}
                  aria-hidden="true"
                >
                  KEEP
                  <br />
                  BUILDING!
                </motion.span>
              </div>
                <button
                  ref={insertTriggerRef}
                  type="button"
                  className="comic-cover-caption cover-project-trigger"
                  aria-label="View projects"
                  aria-expanded={isInsertOpen}
                  aria-controls={insertId}
                  onClick={() => setIsInsertOpen((open) => !open)}
                >
                  <span className="cover-cta-heading">
                    <strong>THINGS I’VE BUILT.</strong>
                    <span className="cover-project-label">
                      VIEW PROJECTS <span className="cover-project-arrow" aria-hidden="true">↗</span>
                    </span>
                  </span>
                  <span className="cover-cta-meta">
                    <small>Projects and experiments by nairafiany</small>
                    <span className="cover-systems-mark">SYSTEMS</span>
                  </span>
                </button>
            </article>
          </motion.div>
        </motion.div>
        <div
          id={insertId}
          className="portfolio-insert-reveal"
          role="region"
          aria-labelledby={`${insertId}-heading`}
          aria-hidden={!isInsertOpen}
          inert={!isInsertOpen}
        >
          <div className="portfolio-insert-clip">
            <article className="portfolio-insert-page">
              <header className="portfolio-insert-heading">
                <h2 id={`${insertId}-heading`}>SELECTED PROJECTS</h2>
                <button type="button" onClick={closeInsert} aria-label="Close selected projects">×</button>
              </header>
              <ol className="portfolio-insert-list">
                {selectedProjects.map((project) => (
                  <li key={project.slug}>
                    <TransitionLink
                      href={`/projects/${project.slug}`}
                      transitionLabel={project.title}
                      transitionNumber={getProjectNumber(project.slug)}
                    >
                      <span className="portfolio-insert-number" aria-hidden="true">{getProjectNumber(project.slug)}</span>
                      <span>{project.title}</span>
                      <span className="portfolio-insert-arrow" aria-hidden="true">↗</span>
                    </TransitionLink>
                  </li>
                ))}
              </ol>
              <Link
                href="/?section=projects"
                className="portfolio-insert-all"
                onClick={(event) => {
                  if (!onProjectsClick || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                  event.preventDefault();
                  setIsInsertOpen(false);
                  onProjectsClick();
                }}
              >
                View all projects <span aria-hidden="true">→</span>
              </Link>
            </article>
          </div>
        </div>
      </div>
    </div>
      <footer className="hero-editorial-rail">
        <span>BASED IN JAKARTA <i>/</i> BACKEND DEVELOPMENT <i>/</i> LEARNING IN PUBLIC <i>/</i> BUILDING THINGS THAT WORK</span>
        <span className="hero-rail-rule" aria-hidden="true" />
        <span className="hero-rail-folio">PROGRESS, NOT PERFECTION <b>01</b></span>
      </footer>
    </div>
  );
}
