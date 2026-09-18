"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";
import { ProjectAction } from "@/app/components/projects/ProjectPrimitives";
import { projectBriefs, getProjectTechnologyAreas } from "@/app/data/projectDetails";
import TransitionLink from "@/app/components/projects/TransitionLink";

function Reveal({ children, className = "", delay = 0 }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: "some" }}
      transition={{ duration: 0.35, delay, ease: [0.2, 0.72, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function ProjectDetailClient({
  project,
  number,
  projectCount,
  previous,
  next,
  previousNumber,
  nextNumber,
}) {
  const prefersReducedMotion = useReducedMotion();
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const dialogRef = useRef(null);
  const lastTriggerRef = useRef(null);

  const media = useMemo(
    () => [
      ...(project.thumbnail
        ? [{ ...project.thumbnail, caption: `${project.title} project cover` }]
        : []),
      ...(project.gallery ?? []),
    ],
    [project],
  );
  const isLightboxOpen = lightboxIndex !== null;

  useEffect(() => {
    if (!isLightboxOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => {
      dialogRef.current?.querySelector(".pd-lightbox-close")?.focus();
    }, 0);

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setLightboxIndex(null);
      } else if (event.key === "ArrowRight") {
        setLightboxIndex((current) => (current + 1) % media.length);
      } else if (event.key === "ArrowLeft") {
        setLightboxIndex((current) => (current - 1 + media.length) % media.length);
      } else if (event.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll("button:not([disabled])");
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      lastTriggerRef.current?.focus();
    };
  }, [isLightboxOpen, media.length]);

  const openLightbox = (index, event) => {
    lastTriggerRef.current = event.currentTarget;
    setLightboxIndex(index);
  };

  const showPreviousMedia = () => {
    setLightboxIndex((current) => (current - 1 + media.length) % media.length);
  };

  const showNextMedia = () => {
    setLightboxIndex((current) => (current + 1) % media.length);
  };

  const brief = projectBriefs[project.slug];
  const technologyAreas = getProjectTechnologyAreas(project);
  const scope = project.features ?? brief?.scope ?? project.plannedFeatures ?? [];
  const gallery = project.gallery ?? [];
  const isInProgress = project.status === "In Progress";
  const hasVisuals = gallery.length > 0 || project.video?.src;

  return (
    <main className="project-detail-page">
      <div className="pd-container">
        <nav className="pd-topbar" aria-label="Project navigation">
          <TransitionLink href="/?section=projects" className="pd-back" transitionLabel="Projects" direction="back">
            <FaArrowLeft aria-hidden="true" /> Back to projects
          </TransitionLink>
          <span className="pd-top-number">Project {number} / {projectCount}</span>
        </nav>

        <header className="pd-hero">
          <div className="pd-introduction">
            <p className="pd-eyebrow">Project overview{project.year ? <span> / {project.year}</span> : null}</p>
            <h1 className="pd-title">{project.title}</h1>
            <p className="pd-deck">{brief?.purpose ?? project.shortDescription}</p>
            {isInProgress && <p className="pd-status"><span aria-hidden="true" /> In development ? features are still being built.</p>}
            {(project.repositoryUrl || project.liveUrl) && (
              <div className="pd-actions" aria-label="Project links">
                {project.liveUrl && <ProjectAction href={project.liveUrl} label={project.liveLabel === "Prototype" ? "View prototype" : project.liveLabel === "Dashboard" ? "Open dashboard" : "View live website"} primary />}
                {project.repositoryUrl && <ProjectAction href={project.repositoryUrl} label="View source code" kind="code" />}
              </div>
            )}
          </div>
          <aside className="pd-snapshot" aria-label="Project facts">
            <h2>At a glance</h2>
            <dl>
              {project.contribution && <div><dt>My role</dt><dd>{project.contribution.role}</dd></div>}
              <div><dt>Project type</dt><dd>{brief?.type ?? project.categories.join(" / ")}</dd></div>
              {brief?.audience && <div><dt>Who it is for</dt><dd>{brief.audience}</dd></div>}
              {project.technologies.length > 0 && <div><dt>Technology stack</dt><dd>{project.technologies.map((technology) => technology.name).join(", ")}</dd></div>}
            </dl>
          </aside>
        </header>

        <nav className="pd-page-nav" aria-label="On this page">
          <a href="#overview">Overview</a>
          {project.contribution && <a href="#contribution">My contribution</a>}
          <a href="#technology">Skills &amp; technologies</a>
          {hasVisuals && <a href="#project-visuals">Screenshots &amp; demo</a>}
        </nav>

        <section id="overview" className="pd-section" aria-labelledby="overview-heading">
          <Reveal className={project.thumbnail ? "pd-overview-grid" : "pd-overview-copy"}>
            <div>
              <div className="pd-section-heading">
                <p className="pd-kicker">The project</p>
                <h2 id="overview-heading">What it does</h2>
              </div>
              <p className="pd-body">{project.longDescription ?? brief?.purpose ?? project.shortDescription}</p>
              {project.context && <div className="pd-context"><h3>The problem it addresses</h3><p>{project.context}</p></div>}
              {scope.length > 0 && (
                <div className="pd-scope">
                  <h3>{isInProgress ? "Planned scope" : "Project scope"}</h3>
                  <ul>{scope.map((feature) => <li key={feature}>{feature}</li>)}</ul>
                </div>
              )}
              {project.developmentNote && <p className="pd-development-note">{project.developmentNote}</p>}
            </div>
            {project.thumbnail && (
              <figure className="pd-cover">
                <button type="button" className="pd-cover-button" onClick={(event) => openLightbox(0, event)} aria-label={`Enlarge: ${project.thumbnail.alt}`}>
                  <Image src={project.thumbnail.src} alt={project.thumbnail.alt} width={project.thumbnail.width ?? 1200} height={project.thumbnail.height ?? 630} sizes="(max-width: 767px) 90vw, 380px" priority />
                </button>
                <figcaption>Project preview <span>Click to enlarge</span></figcaption>
              </figure>
            )}
          </Reveal>
        </section>

        {project.contribution && (
          <section id="contribution" className="pd-section" aria-labelledby="contribution-heading">
            <Reveal>
              <div className="pd-section-heading"><p className="pd-kicker">My work</p><h2 id="contribution-heading">My contribution</h2></div>
              <p className="pd-body pd-contribution-intro"><strong>{project.contribution.role}</strong> · {project.contribution.focus}</p>
              <div className="pd-contribution-grid">
                {project.contribution.responsibilities.map((item) => (
                  <div key={item.title} className="pd-contribution-item">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p className="pd-work-tools">{item.technologies.join(" · ")}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>
        )}

        <section id="technology" className="pd-section" aria-labelledby="technology-heading">
          <Reveal>
            <div className="pd-section-heading">
              <p className="pd-kicker">Technical overview</p>
              <h2 id="technology-heading">Skills &amp; technologies</h2>
              <p>The project stack, grouped by technical area, with a plain-language guide to each tool.</p>
            </div>
            {project.technologies.length > 0 && (
              <div className="pd-technology-list" role="table" aria-label="Project technologies and their purpose">
                <div className="pd-technology-header" role="row"><span role="columnheader">Area</span><span role="columnheader">Technology</span><span role="columnheader">What it is used for</span></div>
                {technologyAreas.map(({ area, names, purpose }) => (
                  <div className="pd-technology-row" role="row" key={area}>
                    <span className="pd-technology-area" role="cell">{area}</span>
                    <strong role="cell">{names.join(", ")}</strong>
                    <span className="pd-technology-purpose" role="cell">{purpose}</span>
                  </div>
                ))}
              </div>
            )}
            {project.integration && (
              <div className="pd-integration-note">
                <h3>{project.integration.name} ? {project.integration.label}</h3>
                <p>{project.integration.description}</p>
              </div>
            )}
          </Reveal>
        </section>

        {hasVisuals && (
          <section id="project-visuals" className="pd-section" aria-labelledby="visuals-heading">
            <Reveal>
              <div className="pd-section-heading"><p className="pd-kicker">A closer look</p><h2 id="visuals-heading">Screenshots &amp; demo</h2><p>Explore the product workflows. Select an image to see the details.</p></div>
              {project.video?.src && <div className="pd-video-shell"><video controls playsInline preload="metadata" poster={project.video.poster} aria-label={project.video.label}><source src={project.video.src} type={project.video.type ?? "video/mp4"} />Your browser does not support embedded video.</video></div>}
              {gallery.length > 0 && (
                <div className="pd-gallery">
                  {gallery.map((item, index) => (
                    <figure className="pd-gallery-item" key={item.src}>
                      <button type="button" className="pd-screen" onClick={(event) => openLightbox((project.thumbnail ? 1 : 0) + index, event)} aria-label={`Enlarge: ${item.alt}`}>
                        <span className="pd-screen-media"><Image src={item.src} alt={item.alt} fill sizes="(max-width: 639px) 90vw, (max-width: 900px) 45vw, 330px" /></span>
                      </button>
                      <figcaption>{item.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              )}
            </Reveal>
          </section>
        )}

        <nav className="pd-project-nav" aria-label="Previous and next projects">
          {previous ? (
            <TransitionLink href={`/projects/${previous.slug}`} className="pd-nav-link is-previous" transitionLabel={previous.title} transitionNumber={previousNumber} direction="previous">
              <FaArrowLeft className="pd-nav-arrow" aria-hidden="true" />
              <span><span className="pd-nav-label">Previous project</span><span className="pd-nav-title">{previous.title}</span></span>
            </TransitionLink>
          ) : <span className="pd-nav-empty" aria-hidden="true" />}
          {next && (
            <TransitionLink href={`/projects/${next.slug}`} className="pd-nav-link is-next" transitionLabel={next.title} transitionNumber={nextNumber} direction="next">
              <span><span className="pd-nav-label">Next project</span><span className="pd-nav-title">{next.title}</span></span>
              <FaArrowRight className="pd-nav-arrow" aria-hidden="true" />
            </TransitionLink>
          )}
        </nav>
      </div>

      <AnimatePresence>
        {isLightboxOpen && media[lightboxIndex] && (
          <motion.div
            className="pd-lightbox"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.22 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setLightboxIndex(null);
            }}
          >
            <motion.div
              ref={dialogRef}
              className="pd-lightbox-dialog"
              role="dialog"
              aria-modal="true"
              aria-label={`${project.title} image viewer`}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.99 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.26, ease: [0.2, 0.72, 0.2, 1] }}
            >
              <button
                type="button"
                className="pd-lightbox-close"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close image viewer"
              >
                <FaTimes aria-hidden="true" />
              </button>
              {media.length > 1 && (
                <>
                  <button type="button" className="pd-lightbox-control is-previous" onClick={showPreviousMedia} aria-label="Previous image">
                    <FaArrowLeft aria-hidden="true" />
                  </button>
                  <button type="button" className="pd-lightbox-control is-next" onClick={showNextMedia} aria-label="Next image">
                    <FaArrowRight aria-hidden="true" />
                  </button>
                </>
              )}
              <div className="pd-lightbox-media">
                <Image
                  key={media[lightboxIndex].src}
                  src={media[lightboxIndex].src}
                  alt={media[lightboxIndex].alt}
                  fill
                  sizes="100vw"
                  priority
                />
              </div>
              <div className="pd-lightbox-caption" aria-live="polite">
                <span>{media[lightboxIndex].caption ?? media[lightboxIndex].alt}</span>
                <span>{String(lightboxIndex + 1).padStart(2, "0")} / {String(media.length).padStart(2, "0")}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
