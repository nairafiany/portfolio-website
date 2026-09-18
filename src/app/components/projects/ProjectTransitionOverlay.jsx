"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./ProjectTransitionOverlay.module.css";

export default function ProjectTransitionOverlay() {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);
  const [navigation, setNavigation] = useState(null);

  useEffect(() => {
    const handleNavigation = (event) => {
      setNavigation(event.detail ?? {});
    };

    window.addEventListener("portfolio:project-navigation", handleNavigation);
    return () => window.removeEventListener("portfolio:project-navigation", handleNavigation);
  }, []);

  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;
    const timer = window.setTimeout(() => setNavigation(null), 300);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (!navigation) return;
    const safetyTimer = window.setTimeout(() => setNavigation(null), 900);
    return () => window.clearTimeout(safetyTimer);
  }, [navigation]);

  if (!navigation) return null;

  const prefix = navigation.direction === "back" ? "RETURNING" : "OPENING";

  return (
    <div className={styles.overlay} aria-hidden="true">
      <span className={styles.scan} />
      <span className={styles.readout}>
        {navigation.number && <span className={styles.number}>{navigation.number}</span>}
        <span>{prefix} / {navigation.label ?? "PROJECT"}</span>
        <span className={styles.lights}><i /><i /><i /></span>
      </span>
    </div>
  );
}
