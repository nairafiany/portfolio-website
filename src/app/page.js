"use client";

import React, { useState } from "react";
import LandingSection from "./components/LandingSection";
import TimelineCanvas from "./components/TimelineCanvas";
import FloatingDock from "./components/FloatingDock";
import DottedGrid from "./components/DottedGrid";

export default function Home() {
  const [hasStarted, setHasStarted] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  if (!hasStarted) {
    return <LandingSection onStart={() => setHasStarted(true)} />;
  }

  return (
    <main className="w-screen h-screen overflow-hidden bg-[#fafafa] dark:bg-[#0a0a0a] relative font-sans text-foreground">
      <DottedGrid />

      <TimelineCanvas
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      <div
        className="fixed z-50 left-1/2 -translate-x-1/2 transition-all duration-300 ease-out origin-bottom
        bottom-0 scale-75 
        md:bottom-0 md:scale-100"
      >
        <FloatingDock
          activeSection={activeSection}
          onNavigate={setActiveSection}
        />
      </div>
    </main>
  );
}
