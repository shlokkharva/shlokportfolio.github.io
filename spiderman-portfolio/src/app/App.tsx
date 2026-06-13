import { motion } from "motion/react";
import { ParticleWeb } from "./components/ParticleWeb";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { EducationSection } from "./components/EducationSection";
import { SkillsSection } from "./components/SkillsSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { CertificatesSection } from "./components/CertificatesSection";
import { HackathonsSection } from "./components/HackathonsSection";
import { ContactSection } from "./components/ContactSection";
import { SpiderWebBg } from "./components/SpiderWebBg";

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#07000d",
        color: "#f0e6ff",
        fontFamily: "'Outfit', sans-serif",
        overflowX: "hidden",
        position: "relative",
        scrollBehavior: "smooth",
      }}
    >
      {/* Global styles */}
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #07000d; }
        ::-webkit-scrollbar-thumb { background: #cc1f1f; border-radius: 2px; }
        ::-webkit-scrollbar-thumb:hover { background: #a01515; }
        ::selection { background: rgba(204,31,31,0.35); color: #f0e6ff; }

        @keyframes sweep {
          from { left: -100%; }
          to { left: 200%; }
        }

        input::placeholder, textarea::placeholder {
          color: rgba(240,230,255,0.25) !important;
        }

        section {
          position: relative;
        }

        /* Responsive grid overrides */
        @media (max-width: 1024px) {
          .skills-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .projects-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .about-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
        }

        @media (max-width: 640px) {
          .skills-grid { grid-template-columns: 1fr !important; }
          .projects-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .contact-form-container { padding: 24px !important; }
          .floating-resume { 
            bottom: 20px !important; 
            right: 20px !important; 
            padding: 10px 16px !important; 
            font-size: 0.9rem !important; 
          }
          .floating-resume svg {
            width: 16px !important;
            height: 16px !important;
          }
        }
      `}</style>

      {/* Fixed background canvas */}
      <ParticleWeb />

      {/* Background spider web pattern */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <SpiderWebBg opacity={0.04} />
      </div>

      {/* High-tech Suit Grid Overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundSize: "40px 40px",
          backgroundImage: "linear-gradient(rgba(204, 31, 31, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(204, 31, 31, 0.02) 1px, transparent 1px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Ambient background gradients */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: `
            radial-gradient(ellipse 60% 50% at 80% 20%, rgba(204,31,31,0.07) 0%, transparent 60%),
            radial-gradient(ellipse 50% 60% at 20% 80%, rgba(26,58,143,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 50% 50%, rgba(120,0,160,0.05) 0%, transparent 60%)
          `,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        <HeroSection />
        <SectionDivider />
        <AboutSection />
        <SectionDivider />
        <ExperienceSection />
        <SectionDivider />
        <EducationSection />
        <SectionDivider />
        <SkillsSection />
        <SectionDivider />
        <ProjectsSection />
        <SectionDivider />
        <HackathonsSection />
        <SectionDivider />
        <CertificatesSection />
        <SectionDivider />
        <ContactSection />
        <Footer />
      </div>
      {/* Floating Download Resume Button */}
      <FloatingResumeButton />
    </div>
  );
}

function FloatingResumeButton() {
  return (
    <motion.a
      href="/Shlok_Kharva_Resume.pdf"
      download
      className="floating-resume"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1, type: "spring" }}
      whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(204,31,31,0.6)" }}
      whileTap={{ scale: 0.95 }}
      style={{
        position: "fixed",
        bottom: "30px",
        right: "30px",
        zIndex: 999,
        background: "linear-gradient(135deg, #cc1f1f, #8b0000)",
        color: "#fff",
        textDecoration: "none",
        padding: "14px 24px",
        borderRadius: "30px",
        fontFamily: "'Rajdhani', sans-serif",
        fontSize: "1.1rem",
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        boxShadow: "0 10px 30px rgba(204,31,31,0.4)",
        border: "1px solid rgba(255,255,255,0.2)",
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
      </svg>
      Resume
    </motion.a>
  );
}

function SectionDivider() {
  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 24px",
      }}
    >
      <div
        style={{
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(204,31,31,0.3), rgba(232,197,71,0.2), transparent)",
        }}
      />
    </div>
  );
}

function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(204,31,31,0.15)",
        padding: "40px 24px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          marginBottom: 12,
        }}
      >
        {/* Mini web icon */}
        <svg width="20" height="20" viewBox="0 0 20 20">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            return (
              <line key={i} x1="10" y1="10"
                x2={10 + Math.cos(rad) * 9}
                y2={10 + Math.sin(rad) * 9}
                stroke="#cc1f1f" strokeWidth="0.6"
              />
            );
          })}
          {[3, 6, 9].map((r) => (
            <circle key={r} cx="10" cy="10" r={r} fill="none" stroke="#cc1f1f" strokeWidth="0.4" />
          ))}
        </svg>
        <span
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "#cc1f1f",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          SPIDER<span style={{ color: "#f0e6ff" }}>FOLIO</span>
        </span>
      </div>
      <p
        style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "0.75rem",
          color: "rgba(240,230,255,0.3)",
          letterSpacing: "0.1em",
        }}
      >
        © 2026 · "With great code comes great responsibility"
      </p>
    </footer>
  );
}
