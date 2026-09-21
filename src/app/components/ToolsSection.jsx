"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./ToolsSection.module.css";

export default function ToolsSection({ groups }) {
  const reducedMotion = useReducedMotion();

  return (
    <section className={styles.section} aria-labelledby="tools-heading">
      <h3 id="tools-heading" className={styles.heading}>
        Tools &amp; Technologies
      </h3>
      <div className={styles.layout}>
        <div className={styles.groups}>
          {groups.map((group, groupIndex) => (
            <div key={group.name} className={styles.group}>
              <h4 className={styles.groupHeading}>
                <span className={styles.groupNumber} aria-hidden="true">
                  0{groupIndex + 1}
                </span>
                {group.name}
              </h4>
              <ul className={styles.technologies}>
                {group.technologies.map((technology, index) => (
                  <motion.li
                    key={technology.name}
                    className={styles.technology}
                    initial={reducedMotion ? false : { opacity: 0, y: 9 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{
                      duration: reducedMotion ? 0 : 0.32,
                      delay: reducedMotion ? 0 : index * 0.035,
                    }}
                    style={{
                      "--tile-tilt": `${[0.6, -0.7, 0.3, -0.4][index % 4]}deg`,
                    }}
                  >
                    <div className={styles.iconContainer}>
                      {technology.src ? (
                        <Image
                          src={technology.src}
                          alt=""
                          width={26}
                          height={26}
                          className={styles.icon}
                        />
                      ) : (
                        <span className={styles.icon} aria-hidden="true">
                          {technology.icon}
                        </span>
                      )}
                    </div>
                    <span className={styles.technologyName}>
                      {technology.name}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <motion.div
          className={styles.illustration}
          aria-hidden="true"
          initial={reducedMotion ? false : { opacity: 0, y: 16, rotate: -3 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: reducedMotion ? 0 : 0.65,
            ease: [0.2, 0.8, 0.2, 1],
          }}
        ></motion.div>
      </div>
    </section>
  );
}
