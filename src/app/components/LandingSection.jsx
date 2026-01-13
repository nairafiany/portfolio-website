"use client";

import React, { useState } from "react";
import TimelineCanvas from "./TimelineCanvas";
import FloatingDock from "./FloatingDock";
import DottedGrid from "./DottedGrid";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [hasStarted, setHasStarted] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  return (
    <main className="w-screen h-screen overflow-hidden bg-[#0a0a0a] relative font-sans text-foreground">
      <DottedGrid />

      <TimelineCanvas
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        hasStarted={hasStarted}
        onStart={() => setHasStarted(true)}
      />

      <AnimatePresence>
        {hasStarted && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
          >
            <FloatingDock
              activeSection={activeSection}
              onNavigate={setActiveSection}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
