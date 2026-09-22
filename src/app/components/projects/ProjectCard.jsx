"use client";

import Image from "next/image";
import { FaChartBar, FaExternalLinkAlt, FaGem, FaGithub } from "react-icons/fa";
import { getProjectNumber } from "@/app/data/projects";
import { CategoryBadge, StatusBadge, TechnologyChip } from "./ProjectPrimitives";
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
  const actions = [
    project.repositoryUrl && {
      href: project.repositoryUrl,
      label: "Code",
      icon: FaGithub,
      tone: "code",
    },
    project.liveUrl && {
      href: project.liveUrl,
      label: project.liveLabel === "Dashboard" ? "Dashboard" : "Live",
      icon: project.liveLabel === "Dashboard" ? FaChartBar : FaExternalLinkAlt,
      tone: project.liveLabel === "Dashboard" ? "dashboard" : "live",
    },
    project.dashboardUrl && {
      href: project.dashboardUrl,
      label: "Dashboard",
      icon: FaChartBar,
      tone: "dashboard",
    },
  ].filter(Boolean);

  return (
    <div className={styles.stack} data-action-count={actions.length}>
      <span className={`${styles.paperLayer} ${styles.paperLayerBack}`} aria-hidden="true" />
      <span className={`${styles.paperLayer} ${styles.paperLayerMiddle}`} aria-hidden="true" />

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
          </footer>
        </div>
      </article>

      {actions.length > 0 && (
        <nav className={styles.actionTabs} aria-label={`${project.title} links`}>
          {actions.map(({ href, label, icon: Icon, tone }, index) => (
            <a
              key={`${label}-${href}`}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.actionTab} ${styles[tone]}`}
              style={{ "--tab-order": index }}
              aria-label={`${label} for ${project.title} (opens in a new tab)`}
              onClick={(event) => event.stopPropagation()}
            >
              <Icon className={styles.tabIcon} aria-hidden="true" />
              <span className={styles.tabLabel}>{label}</span>
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}
