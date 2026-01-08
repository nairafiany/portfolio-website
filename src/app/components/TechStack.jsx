"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

const stacksList = [
  { src: "/stacks/nextjs_icon_dark.svg", alt: "Next.js" },
  { src: "/stacks/vue.svg", alt: "Vue.js" },
  { src: "/stacks/tailwindcss.svg", alt: "Tailwind" },
  { src: "/stacks/django.svg", alt: "Django" },
  { src: "/stacks/fastapi.svg", alt: "FastAPI" },
  { src: "/stacks/spring.svg", alt: "Spring Boot" },
  { src: "/stacks/flutter.svg", alt: "Flutter" },
  { src: "/stacks/docker.svg", alt: "Docker" },
  { src: "/stacks/postgresql.svg", alt: "PostgreSQL" },
  { src: "/stacks/aws_light.svg", alt: "AWS" },
  { src: "/stacks/figma.svg", alt: "Figma" },
  { src: "/stacks/openai_dark.svg", alt: "OpenAI" },
];

const TechStack = () => {
  const [rotation, setRotation] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Default values
  const [radiusX, setRadiusX] = useState(350);
  const [radiusZ, setRadiusZ] = useState(80);

  const requestRef = useRef();
  const SPEED = 0.2;

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        // MOBILE SETTINGS:
        setRadiusX(130);
        setRadiusZ(40);
      } else if (width < 1024) {
        setRadiusX(250);
        setRadiusZ(60);
      } else {
        setRadiusX(350);
        setRadiusZ(80);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const animate = () => {
    if (!isPaused) {
      setRotation((prev) => prev + SPEED);
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [isPaused]);

  const totalItems = stacksList.length;

  return (
    <section className="py-24 relative overflow-hidden flex flex-col items-center bg-transparent [mask-image:radial-gradient(ellipse_70%_90%_at_50%_60%,black_40%,transparent_100%)]">
      {/* SAYA HAPUS BAGIAN <div ... <svg filter="noiseFilter"> ... </div> DI SINI */}
      {/* Sekarang background benar-benar bersih/transparan */}

      <div className="container mx-auto px-6 mb-8 sm:mb-12 text-center z-10 relative">
        <ScrollReveal variant="fade-up">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Tech Stack & Tools
          </h2>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.2}>
          <p className="text-[#ADB7BE] text-sm sm:text-base max-w-2xl mx-auto">
            Powering applications with modern technologies.
          </p>
        </ScrollReveal>
      </div>

      <ScrollReveal
        variant="zoom-in"
        delay={0.3}
        className="w-full flex justify-center z-10"
      >
        <div
          // Container size logic
          className="relative w-full h-[140px] sm:h-[200px] flex items-center justify-center"
          style={{
            perspective: "1000px",
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{ transform: "rotateX(6deg)" }}
          >
            {stacksList.map((stack, index) => {
              const angle = (index / totalItems) * 360;
              const theta = ((angle + rotation) * Math.PI) / 180;
              const x = Math.sin(theta) * radiusX;
              const z = Math.cos(theta) * radiusZ;
              const normalizedDepth = (z + radiusZ) / (2 * radiusZ);

              const scale = 0.6 + normalizedDepth * 0.4;
              const opacity = 0.1 + normalizedDepth * 0.9;
              const blurValue = (1 - normalizedDepth) * 3;
              const zIndex = Math.round(z) + 1000;

              return (
                <div
                  key={index}
                  suppressHydrationWarning={true}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  onTouchStart={() => setIsPaused(true)}
                  onTouchEnd={() => setIsPaused(false)}
                  className="absolute flex items-center justify-center cursor-pointer will-change-transform"
                  style={{
                    transform: `translate3d(${x.toFixed(3)}px, 0, ${z.toFixed(
                      3
                    )}px) rotateX(-6deg) scale(${scale.toFixed(3)})`,
                    zIndex: zIndex,
                    opacity: opacity.toFixed(3),
                    filter: `blur(${blurValue.toFixed(1)}px)`,
                  }}
                >
                  {/* Card logic size tetap sama seperti request sebelumnya */}
                  <div className="group relative flex h-16 w-16 md:h-24 md:w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1f1f1f] to-[#0e0e0e] p-2 md:p-4 shadow-2xl border border-[#2a2a2a]/50 transition-all duration-300 ease-out hover:scale-125 hover:border-emerald-500/50 hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] hover:!opacity-100 hover:!filter-none hover:!z-[2000]">
                    <div className="absolute h-full w-full rounded-2xl border-2 border-b-0 border-r-0 border-[#2a2a2a] opacity-50" />

                    <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out">
                      <span className="text-[10px] md:text-xs font-bold text-white bg-black/80 backdrop-blur-md px-1.5 py-0.5 md:px-2 md:py-1 rounded-md border border-white/10 shadow-lg whitespace-nowrap">
                        {stack.alt}
                      </span>
                    </div>

                    <div className="relative h-full w-full transition-all duration-300 ease-out group-hover:blur-sm group-hover:opacity-30 group-hover:scale-110">
                      <Image
                        src={stack.src}
                        alt={stack.alt}
                        fill
                        className="select-none object-contain p-0.5 md:p-1"
                        draggable={false}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default TechStack;
