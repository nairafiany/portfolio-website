"use client";

import Image from "next/image";
import { FaGem } from "react-icons/fa";
import { getProjectNumber } from "@/app/data/projects";
import {
  CategoryBadge,
  ProjectAction,
  StatusBadge,
  TechnologyChip,
} from "./ProjectPrimitives";
import TransitionLink from "./TransitionLink";
import styles from "./ProjectCard.module.css";

function ProjectPlaceholder({ project }) {
  if (project.slug === "relay") {
    return (
      <div className={`${styles.placeholder} ${styles.relayPlaceholder}`}>
        <span className={styles.placeholderEyebrow}>MARKET / 2026</span>
        <div className={styles.relayExchange} aria-hidden="true">
          <span>GEAR</span>
          <b>⇄</b>
          <span>NEXT</span>
        </div>
        <small>RELAY ARCHIVE ENTRY</small>
      </div>
    );
  }

  return (
    <div className={styles.placeholder}>
      <FaGem className={styles.placeholderIcon} aria-hidden="true" />
      <span className={styles.placeholderEyebrow}>MODEL STUDY / ARCHIVE</span>
    </div>
  );
}

export default function ProjectCard({ project }) {
  const number = getProjectNumber(project.slug);
  const projectHref = `/projects/${project.slug}`;

  return (
    <article className={`${styles.card} group`}>
      <TransitionLink
        href={projectHref}
        className={styles.overlayLink}
        aria-label={`View ${project.title} case study`}
        transitionLabel={project.title}
        transitionNumber={number}
        direction="forward"
      >
        <span className="sr-only">View {project.title} case study</span>
      </TransitionLink>

      <span className={styles.registrationMark} aria-hidden="true">⌜</span>

      <div className={styles.mediaFrame}>
        {project.thumbnail ? (
          <Image
            src={project.thumbnail.src}
            alt={project.thumbnail.alt}
            fill
            sizes="(max-width: 640px) 82vw, 256px"
            className={`${styles.media} ${project.slug === "sikafa" ? styles.sikafaMedia : ""}`}
            style={{ viewTransitionName: `project-image-${project.slug}` }}
          />
        ) : (
          <ProjectPlaceholder project={project} />
        )}
        <span className={styles.mediaScan} aria-hidden="true" />
      </div>

      <div className={styles.content}>
        <header>
          <p className={styles.index}>
            <span>{number}</span> / {project.year ?? "Year not listed"}
          </p>
          <h3
            className={styles.title}
            style={{ viewTransitionName: `project-title-${project.slug}` }}
          >
            {project.title}
          </h3>
          {(project.status || project.categories.length > 0) && (
            <div className={styles.badges} aria-label="Project metadata">
              <StatusBadge status={project.status} />
              {project.categories.map((category) => (
                <CategoryBadge key={category}>{category}</CategoryBadge>
              ))}
            </div>
          )}
        </header>

        <p className={styles.description}>{project.shortDescription}</p>

        <footer className={styles.footer}>
          <div className={styles.technologies} aria-label="Technology stack">
            {project.technologies.map((technology) => (
              <TechnologyChip key={technology.name} technology={technology} />
            ))}
          </div>
          <div className={styles.footerRule} aria-hidden="true">
            <span />
          </div>
          <div className={styles.actions}>
            <ProjectAction
              href={projectHref}
              label="View case study"
              kind="case-study"
              primary
              transitionLabel={project.title}
              transitionNumber={number}
              direction="forward"
            />
            {project.repositoryUrl && (
              <ProjectAction href={project.repositoryUrl} label="Code" kind="code" />
            )}
            {project.liveUrl && (
              <ProjectAction href={project.liveUrl} label={project.liveLabel ?? "Live Demo"} />
            )}
          </div>
        </footer>
      </div>
    </article>
  );
}
