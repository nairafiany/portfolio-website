"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({
  children,
  className = "",
  variant = "fade-up",
  delay = 0,
  duration = 0.8,
}) => {
  const ref = useRef(null);

  useGSAP(
    () => {
      const element = ref.current;
      let initialVars = {};

      let targetVars = {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        rotation: 0,
        rotationX: 0,
        rotationY: 0,
      };

      switch (variant) {
        case "fade-up":
          initialVars = { y: 50, opacity: 0 };
          break;
        case "fade-in":
          initialVars = { opacity: 0 };
          break;
        case "slide-left":
          initialVars = { x: -50, opacity: 0 };
          break;
        case "slide-right":
          initialVars = { x: 50, opacity: 0 };
          break;
        case "zoom-in":
          initialVars = { scale: 0.8, opacity: 0 };
          break;

        case "spin-in":
          initialVars = {
            scale: 0.5,
            opacity: 0,
            rotationX: 180,
            transformPerspective: 1000,
            transformOrigin: "center center",
          };
          break;

        default:
          initialVars = { y: 50, opacity: 0 };
      }

      gsap.fromTo(element, initialVars, {
        ...targetVars,
        duration: duration,
        delay: delay,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default ScrollReveal;
