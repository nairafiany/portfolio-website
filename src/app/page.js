import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import AboutSection from "./components/AboutSection";
import ProjectSection from "./components/ProjectSection";
import EmailSection from "./components/EmailSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main
      className="relative min-h-screen font-sans overflow-hidden
                 bg-gradient-to-br from-black via-zinc-900 to-emerald-950"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -top-40 -left-40 w-[500px] h-[500px]
                        bg-emerald-500/20 rounded-full blur-[120px] animate-pulse"
        />
        <div
          className="absolute top-1/3 -right-40 w-[450px] h-[450px]
                        bg-teal-400/20 rounded-full blur-[120px] animate-pulse delay-200"
        />
        <div
          className="absolute bottom-0 left-1/3 w-[400px] h-[400px]
                        bg-green-400/10 rounded-full blur-[120px]"
        />
      </div>

      <Navbar />

      <div className="container mx-auto px-6 lg:px-12 py-4">
        <HeroSection />
        <AboutSection />
        <ProjectSection />
        <EmailSection />
        <Footer />
      </div>
    </main>
  );
}
