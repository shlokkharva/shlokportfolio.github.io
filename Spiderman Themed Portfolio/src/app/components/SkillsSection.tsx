import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";

const skillRows = [
  {
    title: "FRONTEND",
    color: "#cc1f1f",
    direction: -1,
    skills: ["JavaScript", "HTML/CSS", "Next.js", "React", "TailwindCSS", "Bootstrap", "Android Studio"]
  },
  {
    title: "BACKEND & ML",
    color: "#60a5fa",
    direction: 1,
    skills: ["Node.js", "Python / Flask", "Express.js", "PHP", "Django", "Java", "Machine Learning"]
  },
  {
    title: "DB & TOOLS",
    color: "#e8c547",
    direction: -1,
    skills: ["MySQL / SQL", "MongoDB", "PostgreSQL", "Firebase", "Git / GitHub", "Docker", "Google Cloud / Vercel", "GoDaddy"]
  }
];

function WebNode({ name, color, delay }: { name: string; color: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay, type: "spring" }}
      whileHover={{
        scale: 1.05,
        y: -5,
        boxShadow: `0 0 20px ${color}60`,
        borderColor: color,
        backgroundColor: `${color}15`,
      }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "8px 16px",
        margin: "6px",
        background: `${color}05`,
        border: `1px solid ${color}30`,
        borderRadius: "4px",
        clipPath: "polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)",
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: "0.85rem",
        color: "#f0e6ff",
        letterSpacing: "0.05em",
        cursor: "default",
        transition: "all 0.3s ease",
        position: "relative",
        transform: "translateZ(30px)", // Pop out of the 3D card
      }}
    >
      <span style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ width: 6, height: 6, background: color, borderRadius: "50%", display: "inline-block", boxShadow: `0 0 8px ${color}` }} />
        {name}
      </span>
      <div style={{
        position: "absolute",
        top: 0, left: 0, width: "100%", height: "2px",
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        opacity: 0.5
      }} />
    </motion.div>
  );
}

function TiltCard({ children, color, delay }: { children: React.ReactNode; color: string; delay: number }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const centerX = box.width / 2;
    const centerY = box.height / 2;
    const rx = ((y - centerY) / centerY) * -15; // Max 15 deg tilt
    const ry = ((x - centerX) / centerX) * 15;
    setRotateX(rx);
    setRotateY(ry);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        width: "100%",
        height: "100%",
      }}
    >
      <motion.div
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          padding: "40px 30px",
          background: `linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%)`,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: `1px solid rgba(255,255,255,0.15)`,
          boxShadow: `0 30px 60px 0 rgba(0, 0, 0, 0.6), inset 0 0 30px ${color}20, 0 0 20px ${color}40`,
          borderRadius: "8px",
          clipPath: "polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Suit Mesh Texture */}
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: `radial-gradient(circle at center, rgba(255,255,255,0.08) 1px, transparent 1px)`,
          backgroundSize: "14px 14px",
          pointerEvents: "none",
          zIndex: 0,
        }} />

        {/* Liquid Glass Highlight */}
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0, height: "40%",
          background: "linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%)",
          transform: "translateZ(1px)",
          pointerEvents: "none",
          zIndex: 1,
        }} />
        
        {children}
      </motion.div>
    </motion.div>
  );
}

export function SkillsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="skills" ref={ref} style={{ padding: "60px 24px", position: "relative", zIndex: 1, minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 60, position: "relative", width: "100%" }}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "2.8rem",
            fontWeight: 700,
            color: "#f0e6ff",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            position: "relative",
            display: "inline-block",
            margin: "0 auto",
          }}
        >
          My <span style={{ color: "#cc1f1f", textShadow: "0 0 20px rgba(204,31,31,0.5)" }}>Web Toolkit</span>
          {/* Decorative underlines */}
          <div style={{ position: "absolute", bottom: -10, left: "50%", transform: "translateX(-50%)", width: "120%", height: 2, background: "linear-gradient(90deg, transparent, rgba(204,31,31,0.8), transparent)" }} />
          <div style={{ position: "absolute", bottom: -16, left: "50%", transform: "translateX(-50%)", width: "60%", height: 1, background: "linear-gradient(90deg, transparent, rgba(96,165,250,0.5), transparent)" }} />
          
          {/* Background text */}
          <span style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "6rem",
            color: "rgba(255,255,255,0.02)",
            whiteSpace: "nowrap",
            zIndex: -1,
            pointerEvents: "none",
            WebkitTextStroke: "1px rgba(255,255,255,0.05)",
            backgroundClip: "text",
          }}>
            Arsenal
          </span>
        </motion.h2>
      </div>

      {/* Floating spiders decoration */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "15%",
          right: "10%",
          width: 30,
          opacity: 0.6,
          filter: "drop-shadow(0 0 8px #cc1f1f)"
        }}
      >
        <svg viewBox="0 0 24 24" fill="#cc1f1f"><path d="M12 2a2 2 0 0 1 2 2 c0 0.74-.4 1.39-1 1.73V7h1a3 3 0 0 1 3 3v1h1.5a1.5 1.5 0 0 1 0 3H17v1a3 3 0 0 1-3 3h-1v1.27a2 2 0 1 1-2 0V18H10a3 3 0 0 1-3-3v-1H5.5a1.5 1.5 0 0 1 0-3H7v-1a3 3 0 0 1 3-3h1V5.73A2 2 0 0 1 10 4a2 2 0 0 1 2-2z"/></svg>
      </motion.div>

      {/* 3 Square Glass Skill Boxes */}
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        alignItems: "start", // This prevents the boxes from stretching into massive empty rectangles!
        gap: "40px",
        width: "100%",
        padding: "0 20px"
      }}>
        {inView && skillRows.map((row, rowIndex) => (
          <TiltCard
            key={row.title}
            color={row.color}
            delay={rowIndex * 0.2}
          >
            {/* Box Label */}
            <div style={{
              borderBottom: `2px solid ${row.color}50`,
              paddingBottom: 10,
              marginBottom: 20,
              width: "100%",
              transform: "translateZ(40px)",
            }}>
              <h3 style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "1.8rem",
                fontWeight: 700,
                color: row.color,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                textShadow: `0 0 15px ${row.color}60`,
                margin: 0,
              }}>
                {row.title}
              </h3>
            </div>

            {/* Wrapped Skills Cluster */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "flex-start", // Left align nodes
                alignItems: "flex-start",
                gap: "12px",
                width: "100%",
                zIndex: 2,
                transform: "translateZ(20px)", // Slightly lower than title
              }}
            >
              {row.skills.map((skill, index) => (
                <WebNode
                  key={`${skill}-${index}`}
                  name={skill}
                  color={row.color}
                  delay={rowIndex * 0.2 + index * 0.05} // Staggered entry animation
                />
              ))}
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
