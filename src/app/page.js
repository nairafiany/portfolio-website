import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import AboutSection from "./components/AboutSection";
import ProjectSection from "./components/ProjectSection";
import EmailSection from "./components/EmailSection";
import Footer from "./components/Footer";
import TechStack from "./components/TechStack";

export default function Home() {
  return (
    <main className="relative min-h-screen font-sans overflow-hidden bg-[#0a0a0a]">
      {/* ================= BACKGROUND DESIGN ================= */}

      {/* 1. TOP PART: Grid Pattern (Engineering Feel) */}
      {/* Grid ini cuma ada di 60% tinggi layar bagian atas, lalu memudar ke bawah */}
      <div
        className="absolute top-0 left-0 w-full h-[60%] 
        bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] 
        bg-[size:24px_24px] 
        [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)] 
        z-0 pointer-events-none"
      ></div>

      {/* 2. BOTTOM PART: Dot/Matrix Pattern (Data Feel) */}
      {/* Dot ini muncul di bagian bawah, memudar ke atas */}
      <div
        className="absolute bottom-0 left-0 w-full h-[50%] 
        bg-[radial-gradient(#ffffff15_1px,transparent_1px)] 
        [background-size:20px_20px] 
        [mask-image:linear-gradient(to_top,black_40%,transparent_100%)] 
        z-0 pointer-events-none"
      ></div>

      {/* 3. Spotlights (Pencahayaan) */}
      {/* Lampu Atas (Emerald) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/10 blur-[100px] rounded-full -z-10"></div>

      {/* Lampu Bawah (Teal - Biar footer ada highlightnya) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-teal-900/20 blur-[120px] rounded-full -z-10"></div>

      {/* 4. Moving Blobs (Aksen warna-warni yang gerak) */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 -left-20 w-[400px] h-[400px] bg-emerald-600/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute top-[40%] -right-20 w-[300px] h-[300px] bg-teal-500/10 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

      {/* ================= CONTENT ================= */}
      <Navbar />

      <div className="container mx-auto px-6 lg:px-12 py-4 relative z-10">
        <HeroSection />
        <AboutSection />
        <TechStack />
        <ProjectSection />
        <EmailSection />
        <Footer />
      </div>
    </main>
  );
}
