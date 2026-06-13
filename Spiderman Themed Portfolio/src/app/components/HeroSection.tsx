import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "motion/react";

const GLITCH_CHARS = "!@#$%^&*<>?/\\|~`";

function useGlitch(text: string, active: boolean) {
  const [display, setDisplay] = useState(text);
  useEffect(() => {
    if (!active) { setDisplay(text); return; }
    let frame = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((ch, i) =>
            i < frame / 2
              ? ch
              : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
          )
          .join("")
      );
      frame++;
      if (frame > text.length * 2) clearInterval(interval);
    }, 35);
    return () => clearInterval(interval);
  }, [active, text]);
  return display;
}

export function HeroSection() {
  const [glitching, setGlitching] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const parallaxX1 = useTransform(springX, [-1, 1], [-30, 30]);
  const parallaxY1 = useTransform(springY, [-1, 1], [-30, 30]);
  const parallaxX2 = useTransform(springX, [-1, 1], [20, -20]);
  const parallaxY2 = useTransform(springY, [-1, 1], [20, -20]);
  const parallaxX3 = useTransform(springX, [-1, 1], [-60, 60]);
  const parallaxY3 = useTransform(springY, [-1, 1], [-60, 60]);
  const rotateX = useTransform(springY, [-1, 1], [15, -15]);
  const rotateY = useTransform(springX, [-1, 1], [-15, 15]);
  const swing = useTransform(springX, [-1, 1], [-10, 10]);

  useEffect(() => {
    setTimeout(() => { setRevealed(true); }, 300);
    const glitchLoop = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 800);
    }, 4000);
    return () => clearInterval(glitchLoop);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mouseX.set(x);
    mouseY.set(y);
  };

  const name = useGlitch("SHLOK KHARVA", glitching);

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "0 24px",
      }}
    >
      {/* Floating web orbs */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          x: parallaxX1,
          y: parallaxY1,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(204,31,31,0.18) 0%, transparent 70%)",
          position: "absolute",
          top: "5%",
          right: "-10%",
          pointerEvents: "none",
        }}
      />
      <motion.div
        style={{
          x: parallaxX2,
          y: parallaxY2,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(26,58,143,0.22) 0%, transparent 70%)",
          position: "absolute",
          bottom: "5%",
          left: "-8%",
          pointerEvents: "none",
        }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Floating spider silhouette */}
      <motion.div
        style={{
          x: parallaxX1,
          y: parallaxY1,
          position: "absolute",
          top: "15%",
          right: "8%",
          opacity: 0.08,
          pointerEvents: "none",
        }}
      >
        <SpiderSilhouette size={280} />
      </motion.div>
      {/* 3D Newspaper Element 1 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotateZ: -10 }}
        animate={{ opacity: revealed ? 1 : 0, scale: revealed ? 1 : 0.5, rotateZ: revealed ? -15 : -10 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
        style={{
          x: parallaxX3,
          y: parallaxY3,
          rotateX,
          rotateY,
          position: "absolute",
          top: "15%",
          left: "8%",
          width: 250,
          background: "#f4f0e6",
          padding: "12px 12px 30px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
          border: "1px solid #d1c8b4",
          transformStyle: "preserve-3d",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <div style={{ border: "2px solid #333", height: "100%", padding: 4 }}>
          <h4 style={{ fontFamily: "'Share Tech Mono', monospace", color: "#111", fontSize: "0.8rem", textAlign: "center", marginBottom: 8, borderBottom: "1px solid #333", paddingBottom: 4 }}>THE DAILY BUGLE</h4>
          <img src="/images/spider1.webp" alt="Spider Graphic" style={{ width: "100%", height: "auto", filter: "grayscale(100%) sepia(50%)" }} />
        </div>
      </motion.div>

      {/* 3D Newspaper Element 2 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotateZ: 20 }}
        animate={{ opacity: revealed ? 1 : 0, scale: revealed ? 1 : 0.5, rotateZ: revealed ? 12 : 20 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.6 }}
        style={{
          x: parallaxX2,
          y: parallaxY2,
          rotateX,
          rotateY,
          position: "absolute",
          bottom: "10%",
          right: "10%",
          width: 220,
          background: "#f4f0e6",
          padding: "10px 10px 25px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
          border: "1px solid #d1c8b4",
          transformStyle: "preserve-3d",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <div style={{ border: "2px solid #333", height: "100%", padding: 4 }}>
          <h4 style={{ fontFamily: "'Share Tech Mono', monospace", color: "#111", fontSize: "0.7rem", textAlign: "center", marginBottom: 6, borderBottom: "1px solid #333", paddingBottom: 4 }}>SPIDER SIGHTING</h4>
          <img src="/images/spider2.webp" alt="Spider Graphic" style={{ width: "100%", height: "auto", filter: "grayscale(100%) sepia(50%)" }} />
        </div>
      </motion.div>

      {/* Hanging Spider Animation */}
      <motion.div
        initial={{ y: -300 }}
        animate={{ y: revealed ? 0 : -300 }}
        transition={{ duration: 2, type: "spring", bounce: 0.5, delay: 1 }}
        style={{
          position: "absolute",
          top: 0,
          right: "25%",
          x: parallaxX1,
          rotateZ: swing,
          transformOrigin: "top center",
          zIndex: 3,
          pointerEvents: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ width: 1, height: "15vh", background: "linear-gradient(to bottom, transparent, rgba(204,31,31,0.5))" }} />
        <img src="/images/hanging_spider.png" alt="Hanging Spider" style={{ width: 120, height: "auto", filter: "drop-shadow(0 10px 10px rgba(204,31,31,0.4))", marginTop: -5 }} />
      </motion.div>
      {/* Hero Character Image (Left side) */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: revealed ? 1 : 0, x: revealed ? 0 : -100 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "65vh", // Scaled down from 85vh to prevent overlap
          maxWidth: "35vw", // Strictly constrain width so it can't touch the center
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        <img 
          src="/images/profile.webp" 
          alt="Shlok Kharva"
          style={{ height: "100%", width: "100%", objectFit: "contain", objectPosition: "left bottom", filter: "drop-shadow(0 0 30px rgba(204,31,31,0.3))" }}
        />
      </motion.div>

      {/* Content */}
      <div style={{ 
        textAlign: "center", 
        position: "relative", 
        zIndex: 2, 
        maxWidth: 800,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        
        {/* Web strand line */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: revealed ? 1 : 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          style={{
            width: 1,
            height: 80,
            background: "linear-gradient(to bottom, transparent, #cc1f1f)",
            margin: "0 auto 24px",
            transformOrigin: "top",
          }}
        />

        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: revealed ? 1 : 0, letterSpacing: revealed ? "0.35em" : "0.5em" }}
          transition={{ duration: 1, delay: 0.4 }}
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.8rem",
            color: "#cc1f1f",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          — With Great Power Comes Great Code —
        </motion.p>

        {/* Main name with glitch */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 40 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "clamp(2rem, 8vw, 6rem)", // Reduced max font size
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: "#f0e6ff",
            position: "relative",
            marginBottom: 8,
            whiteSpace: "nowrap", // Force single line
          }}
        >
          <GlitchText text={name} active={glitching} />
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "clamp(1.2rem, 4vw, 2.8rem)",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            background: "linear-gradient(135deg, #cc1f1f, #e8c547)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: 24,
          }}
        >
          Full Stack Developer
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: revealed ? 1 : 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
            color: "rgba(240,230,255,0.65)",
            maxWidth: 560,
            margin: "0 auto 40px",
            lineHeight: 1.7,
          }}
        >
          Weaving digital experiences with precision and artistry. From concept to deployment — every line of code is a strand in the greater web.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}
        >
          <HeroButton primary onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
            View My Work
          </HeroButton>
          <HeroButton onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
            Get In Touch
          </HeroButton>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: revealed ? 1 : 0 }}
          transition={{ duration: 1, delay: 2 }}
          style={{ marginTop: 64, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}
        >
          <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.7rem", color: "rgba(204,31,31,0.7)", letterSpacing: "0.2em" }}>SCROLL</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 1, height: 40, background: "linear-gradient(to bottom, #cc1f1f, transparent)" }}
          />
        </motion.div>
      </div>
    </section>
  );
}

function GlitchText({ text, active }: { text: string; active: boolean }) {
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      {text}
      {active && (
        <>
          <span style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            color: "#cc1f1f",
            clipPath: "polygon(0 25%, 100% 25%, 100% 50%, 0 50%)",
            transform: "translateX(-3px)",
            opacity: 0.8,
          }}>{text}</span>
          <span style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            color: "#1a3a8f",
            clipPath: "polygon(0 65%, 100% 65%, 100% 80%, 0 80%)",
            transform: "translateX(3px)",
            opacity: 0.8,
          }}>{text}</span>
        </>
      )}
    </span>
  );
}

function HeroButton({ children, primary, onClick }: { children: React.ReactNode; primary?: boolean; onClick?: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "'Rajdhani', sans-serif",
        fontSize: "0.95rem",
        fontWeight: 700,
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        padding: "14px 32px",
        border: primary ? "none" : "1px solid rgba(204,31,31,0.5)",
        borderRadius: 2,
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        background: primary
          ? hovered
            ? "linear-gradient(135deg, #a01515, #cc1f1f)"
            : "linear-gradient(135deg, #cc1f1f, #a01515)"
          : hovered
            ? "rgba(204,31,31,0.12)"
            : "transparent",
        color: "#f0e6ff",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-2px)" : "none",
        boxShadow: primary
          ? hovered
            ? "0 8px 30px rgba(204,31,31,0.4)"
            : "0 4px 20px rgba(204,31,31,0.25)"
          : "none",
      }}
    >
      {children}
      {hovered && primary && (
        <span style={{
          position: "absolute",
          top: 0, left: "-100%",
          width: "200%", height: "100%",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
          animation: "sweep 0.5s ease-out forwards",
        }} />
      )}
    </button>
  );
}

function SpiderSilhouette({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="currentColor" style={{ color: "#cc1f1f" }}>
      {/* Body */}
      <ellipse cx="100" cy="110" rx="22" ry="30" fill="currentColor" />
      <ellipse cx="100" cy="75" rx="15" ry="18" fill="currentColor" />
      {/* Eyes */}
      <ellipse cx="93" cy="70" rx="5" ry="4" fill="rgba(232,197,71,0.9)" />
      <ellipse cx="107" cy="70" rx="5" ry="4" fill="rgba(232,197,71,0.9)" />
      {/* Legs */}
      {[
        [100, 95, 40, 60], [100, 95, 30, 80], [100, 105, 35, 130], [100, 115, 40, 150],
        [100, 95, 160, 60], [100, 95, 170, 80], [100, 105, 165, 130], [100, 115, 160, 150],
      ].map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      ))}
    </svg>
  );
}
