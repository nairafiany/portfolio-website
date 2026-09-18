import Image from "next/image";
import {
  FaBrain,
  FaChartLine,
  FaExternalLinkAlt,
  FaGithub,
  FaMobileAlt,
  FaPython,
  FaShieldAlt,
} from "react-icons/fa";
import { FaGolang } from "react-icons/fa6";
import { SiGooglecloud, SiStreamlit, SiVercel } from "react-icons/si";
import TransitionLink from "./TransitionLink";
import styles from "./ProjectPrimitives.module.css";

const symbolIcons = {
  brain: <FaBrain aria-hidden="true" />,
  chart: <FaChartLine aria-hidden="true" />,
  gcp: <SiGooglecloud aria-hidden="true" />,
  go: <FaGolang aria-hidden="true" />,
  mobile: <FaMobileAlt aria-hidden="true" />,
  python: <FaPython aria-hidden="true" />,
  security: <FaShieldAlt aria-hidden="true" />,
  streamlit: <SiStreamlit aria-hidden="true" />,
  vercel: <SiVercel aria-hidden="true" />,
};

export function CategoryBadge({ children }) {
  return <span className={styles.category}>{children}</span>;
}

export function StatusBadge({ status }) {
  if (status !== "In Progress") return null;
  return <span className={styles.status}>{status}</span>;
}

export function TechnologyChip({ technology }) {
  return (
    <span className={styles.technology}>
      <span className={styles.technologyIcon} aria-hidden="true">
        {technology.icon ? (
          <Image src={technology.icon} alt="" width={16} height={16} />
        ) : symbolIcons[technology.symbol] ? (
          symbolIcons[technology.symbol]
        ) : (
          <span className={styles.technologyMark}>{technology.shortName ?? technology.name.slice(0, 3)}</span>
        )}
      </span>
      <span>{technology.name}</span>
    </span>
  );
}

export function ProjectAction({
  href,
  label,
  kind = "external",
  primary = false,
  transitionLabel,
  transitionNumber,
  direction,
}) {
  const icon = kind === "code" ? <FaGithub aria-hidden="true" /> : kind === "external" ? <FaExternalLinkAlt aria-hidden="true" /> : null;
  const className = `${styles.action} ${primary ? styles.actionPrimary : ""}`;
  const content = (
    <>
      {icon && <span className={styles.actionIcon}>{icon}</span>}
      <span>{label}</span>
      <span className={styles.actionArrow} aria-hidden="true">↗</span>
    </>
  );

  if (kind === "case-study") {
    return (
      <TransitionLink
        href={href}
        className={className}
        transitionLabel={transitionLabel}
        transitionNumber={transitionNumber}
        direction={direction}
      >
        {content}
      </TransitionLink>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={`${label} (opens in a new tab)`}
    >
      {content}
    </a>
  );
}
