"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { HiHome, HiUser, HiCodeBracket, HiEnvelope } from "react-icons/hi2";

const dockItems = [
  { id: 0, label: "Home", icon: HiHome },
  { id: 1, label: "About", icon: HiUser },
  { id: 2, label: "Projects", icon: HiCodeBracket },
  { id: 3, label: "Contact", icon: HiEnvelope },
];

const mascotMoods = ["cute", "sleepy", "curious", "grumpy", "happy"];
const mascotSpots = [-112, -57, 0];
const mascotMotion = {
  rest: { y: 15, rotate: 0, scaleX: 1, scaleY: 1 },
  cute: { y: -16, rotate: 0, scaleX: 1, scaleY: 1 },
  sleepy: { y: -11, rotate: -1.5, scaleX: 1.03, scaleY: 0.96 },
  curious: { y: -16, rotate: 2.5, scaleX: 1, scaleY: 1 },
  shy: { y: -9, rotate: -2, scaleX: 1.04, scaleY: 0.97 },
  grumpy: { y: -15, rotate: 0, scaleX: 1.08, scaleY: 0.94 },
  happy: { y: [-13, -18, -15], rotate: [-1, 1.5, 0], scaleX: [1, 1.06, 1], scaleY: [1, 0.94, 1] },
  squish: { y: -15, rotate: 0, scaleX: [1, 1.13, 1], scaleY: [1, 0.66, 1] },
  confused: { y: -15, rotate: [0, -7, -5], scaleX: 1, scaleY: 1 },
  startled: { y: [-15, -20, 14, -9], rotate: [0, 1, 0, -1], scaleX: [1, 0.96, 1, 1], scaleY: [1, 1.08, 1, 1] },
  pokeGrumpy: { y: -14, rotate: [0, -2, 2, 0], scaleX: 1.08, scaleY: 0.92 },
  shyHide: { y: [-10, 16, 16, -8], rotate: [0, 0, 0, -2], scaleX: 1.03, scaleY: 0.97 },
  pokeHappy: { y: [-14, -20, -17], rotate: [-2, 3, -2, 0], scaleX: [1, 1.08, 1], scaleY: [1, 0.92, 1] },
};

const reactionMarks = {
  confused: "?",
  startled: "!",
  pokeGrumpy: "#",
  pokeHappy: "✦",
  sleepy: "z",
};

export default function FloatingDock({ activeSection, onNavigate }) {
  const [mascotMood, setMascotMood] = useState("rest");
  const [mascotSpot, setMascotSpot] = useState(-57);
  const isReactingRef = useRef(false);
  const clickCountRef = useRef(0);
  const clickResetRef = useRef(null);
  const reactionTimerRef = useRef(null);
  const hoverTimerRef = useRef(null);

  useEffect(() => {
    let hideTimer;
    let revealTimer;
    const firstPeek = setTimeout(() => setMascotMood("cute"), 1800);
    const firstHide = setTimeout(() => setMascotMood("rest"), 4200);
    const moodLoop = setInterval(() => {
      if (isReactingRef.current) return;
      const nextMood = mascotMoods[Math.floor(Math.random() * mascotMoods.length)];
      setMascotMood("rest");
      setMascotSpot((currentSpot) => {
        const otherSpots = mascotSpots.filter((spot) => spot !== currentSpot);
        return otherSpots[Math.floor(Math.random() * otherSpots.length)];
      });
      revealTimer = setTimeout(() => setMascotMood(nextMood), 180);
      hideTimer = setTimeout(() => setMascotMood("rest"), 2600);
    }, 7000);

    return () => {
      clearTimeout(firstPeek);
      clearTimeout(firstHide);
      clearTimeout(hideTimer);
      clearTimeout(revealTimer);
      clearInterval(moodLoop);
      clearTimeout(clickResetRef.current);
      clearTimeout(reactionTimerRef.current);
      clearTimeout(hoverTimerRef.current);
    };
  }, []);

  const playClickReaction = () => {
    clearTimeout(clickResetRef.current);
    clearTimeout(reactionTimerRef.current);
    clearTimeout(hoverTimerRef.current);
    isReactingRef.current = true;
    clickCountRef.current += 1;

    let reaction;
    let duration = 720;
    const reactionChance = Math.random();

    if (clickCountRef.current >= 4) {
      reaction = "shyHide";
      duration = 1500;
      clickCountRef.current = 0;
    } else if (reactionChance < 0.12) {
      reaction = "pokeHappy";
      duration = 950;
    } else if (reactionChance < 0.2) {
      reaction = "startled";
      duration = 900;
    } else {
      reaction = ["squish", "confused", "pokeGrumpy"][clickCountRef.current - 1];
    }

    setMascotMood(reaction);
    reactionTimerRef.current = setTimeout(() => {
      setMascotMood(reaction === "pokeHappy" || reaction === "shyHide" ? "shy" : "cute");
      setTimeout(() => {
        setMascotMood("rest");
        isReactingRef.current = false;
      }, 650);
    }, duration);

    clickResetRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 1800);
  };

  const activeMascotMotion = mascotMotion[mascotMood];
  const usesMultipleKeyframes = Object.values(activeMascotMotion).some(Array.isArray);

  return (
    <div
      className="nav-companion-wrap relative"
      onPointerEnter={() => {
        if (isReactingRef.current) return;
        setMascotMood("rest");
        setMascotSpot((currentSpot) => mascotSpots.find((spot) => spot !== currentSpot) ?? 0);
        clearTimeout(hoverTimerRef.current);
        hoverTimerRef.current = setTimeout(() => {
          if (!isReactingRef.current) setMascotMood(Math.random() > 0.45 ? "shy" : "curious");
        }, 160);
      }}
      onPointerLeave={() => {
        clearTimeout(hoverTimerRef.current);
        if (!isReactingRef.current) setMascotMood("rest");
      }}
    >
      <motion.button
        type="button"
        onClick={playClickReaction}
        className="nav-lurker"
        data-mood={mascotMood}
        aria-label="Poke the tiny navigation mascot"
        animate={{ ...activeMascotMotion, x: mascotSpot }}
        transition={usesMultipleKeyframes
          ? { duration: mascotMood === "shyHide" ? 1.35 : 0.65, ease: [0.22, 0.8, 0.25, 1] }
          : { type: "spring", stiffness: 150, damping: 18, mass: 0.8 }}
      >
        <span className="lurker-ear lurker-ear-left" />
        <span className="lurker-ear lurker-ear-right" />
        <span className="lurker-brow lurker-brow-left" />
        <span className="lurker-brow lurker-brow-right" />
        <span className="lurker-eye lurker-eye-left" />
        <span className="lurker-eye lurker-eye-right" />
        <span className="lurker-cheek lurker-cheek-left" />
        <span className="lurker-cheek lurker-cheek-right" />
        <span className="lurker-mouth" />
        <span className="lurker-paws"><i /><i /></span>
        <span className="lurker-spark lurker-spark-left">✦</span>
        <span className="lurker-spark lurker-spark-right">✦</span>
        {reactionMarks[mascotMood] && <span className="mascot-reaction-mark" aria-hidden="true">{reactionMarks[mascotMood]}</span>}
      </motion.button>

      <motion.nav layout aria-label="Portfolio sections" className="nav-companion relative z-10 flex gap-1 sm:gap-2 bg-[#fffdf7]/95 backdrop-blur-md px-2 sm:px-3 py-2 rounded-[24px] border-2 border-[#29263b] shadow-[5px_6px_0_#29263b]">
      {dockItems.map((item) => {
        const isActive = activeSection === item.id;
        return (
          <motion.button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            aria-label={item.label}
            aria-current={isActive ? "page" : undefined}
            title={item.label}
            whileHover={{ y: -4, rotate: isActive ? -2 : 2 }}
            whileTap={{ scaleX: 1.1, scaleY: 0.82 }}
            transition={{ type: "spring", stiffness: 420, damping: 20 }}
            className={`dock-item relative isolate p-2.5 sm:p-3 rounded-2xl ${isActive ? "text-[#29263b]" : "text-[#5f676b]"}`}
          >
            {isActive && (
              <motion.span
                layoutId="active-dock-companion"
                className="absolute inset-0 -z-10 bg-[#82d9b8] border border-[#29263b] rounded-[45%_55%_48%_52%]"
                transition={{ type: "spring", stiffness: 360, damping: 24 }}
              />
            )}
            <motion.span className="block" animate={isActive ? { y: [0, -2, 0], rotate: [0, -3, 0] } : {}} transition={{ duration: 0.32 }}>
              <item.icon className="w-6 h-6" />
            </motion.span>
          </motion.button>
        );
      })}
      </motion.nav>
    </div>
  );
}
