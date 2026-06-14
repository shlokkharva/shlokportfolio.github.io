import { useRef } from "react";
import { motion, useInView } from "motion/react";

const hackathons = [
  {
    title: "GDG Hackathon 2026",
    role: "Team Leader",
    year: "2026",
    organizer: "Google Development Group, SVIT",
    project: "Medical Disease Prediction System using Flask",
    description: "Led a team to build a medical disease prediction system. Contributed as a fullstack developer using Flask framework, implemented machine learning models for disease prediction, and designed both frontend and backend components.",
  },
  {
    title: "Mecia Hacks 2024",
    role: "Team Leader",
    year: "2024",
    organizer: "SVIT Campus",
    project: "CloudBurst Prediction System",
    description: "Led a team to develop a cloudburst prediction system. Served as a fullstack developer, implementing machine learning models for weather prediction and building both the frontend interface and backend logic.",
  },
  {
    title: "Tinkerthon 3.0 2025",
    role: "Team Member",
    year: "2025",
    organizer: "Navrachana University",
    project: "Local Canteen Management System for employees",
    description: "Contributed as a frontend developer. Developed user interfaces for the canteen management system, collaborated with backend developers for API integration, and implemented responsive design for different devices.",
  },
];

export function HackathonsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="hackathons"
      ref={ref}
      style={{ padding: "60px 24px", maxWidth: 1200, margin: "0 auto", position: "relative" }}
    >
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7 }}
        style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}
      >
        <div style={{ width: 40, height: 1, background: "#cc1f1f" }} />
        <span style={{ fontFamily: "'Share Tech Mono', monospace", color: "#cc1f1f", fontSize: "0.85rem", letterSpacing: "0.2em" }}>
          05 / HACKATHONS
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1 }}
        style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: 700,
          color: "#f0e6ff",
          marginBottom: 40,
        }}
      >
        My{" "}
        <span style={{
          background: "linear-gradient(135deg, #cc1f1f, #e8c547)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          Achievements
        </span>
      </motion.h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        {hackathons.map((hackathon, i) => (
          <motion.div
            key={hackathon.title}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: i * 0.15, type: "spring", stiffness: 70 }}
            style={{
              background: "rgba(20,0,30,0.6)",
              padding: "32px",
              position: "relative",
              overflow: "hidden",
              borderRadius: "16px",
              border: "1px solid rgba(204,31,31,0.2)",
              backdropFilter: "blur(12px)",
              transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            }}
            whileHover={{ 
              scale: 1.02, 
              y: -5,
              background: "rgba(30,0,40,0.8)",
              border: "1px solid rgba(204,31,31,0.6)",
              boxShadow: "0 20px 40px rgba(204,31,31,0.3)"
            }}
          >
            {/* Ambient Background Glow */}
            <div style={{
              position: "absolute",
              bottom: -50,
              left: -50,
              width: 150,
              height: 150,
              background: "radial-gradient(circle, rgba(204,31,31,0.15) 0%, transparent 70%)",
              borderRadius: "50%",
              pointerEvents: "none",
            }} />

            {/* Background Spidey Web Accent */}
            <svg
              style={{ position: "absolute", top: -20, right: -20, opacity: 0.15, pointerEvents: "none" }}
              width="150" height="150" viewBox="0 0 80 80"
            >
              {[10, 25, 45, 65].map((r) => (
                <circle key={r} cx="80" cy="0" r={r} fill="none" stroke="#cc1f1f" strokeWidth="1" />
              ))}
              {[0, 30, 60, 90].map((angle, j) => {
                const rad = (angle * Math.PI) / 180;
                return <line key={j} x1="80" y1="0" x2={80 + Math.cos(rad + Math.PI) * 70} y2={0 + Math.sin(rad + Math.PI / 2) * 70} stroke="#cc1f1f" strokeWidth="0.8" />;
              })}
            </svg>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px", marginBottom: "20px", position: "relative", zIndex: 2 }}>
              <div>
                <h3 style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "#f0e6ff",
                  marginBottom: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  textShadow: "0 0 10px rgba(204,31,31,0.4)"
                }}>
                  {hackathon.title}
                  <span style={{
                    fontSize: "0.85rem",
                    padding: "4px 14px",
                    borderRadius: "20px",
                    background: hackathon.role.includes("Leader") ? "rgba(204,31,31,0.2)" : "rgba(232,197,71,0.2)",
                    color: hackathon.role.includes("Leader") ? "#ff4d4d" : "#e8c547",
                    border: hackathon.role.includes("Leader") ? "1px solid rgba(204,31,31,0.5)" : "1px solid rgba(232,197,71,0.5)",
                    boxShadow: hackathon.role.includes("Leader") ? "0 0 10px rgba(204,31,31,0.3)" : "0 0 10px rgba(232,197,71,0.3)",
                    textShadow: "none"
                  }}>
                    {hackathon.role}
                  </span>
                </h3>
                <div style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  color: "#cc1f1f",
                  fontSize: "1rem",
                  background: "rgba(204,31,31,0.1)",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  display: "inline-block",
                  border: "1px solid rgba(204,31,31,0.2)"
                }}>
                  <span style={{ color: "rgba(240,230,255,0.7)" }}>Organizer: </span>
                  {hackathon.organizer}
                </div>
              </div>
              <div style={{
                background: "linear-gradient(135deg, #cc1f1f, #a01515)",
                color: "#fff",
                padding: "8px 20px",
                borderRadius: "20px",
                fontFamily: "'Share Tech Mono', monospace",
                fontWeight: 600,
                fontSize: "1rem",
                boxShadow: "0 5px 15px rgba(204,31,31,0.4)",
                border: "1px solid rgba(255,255,255,0.2)"
              }}>
                {hackathon.year}
              </div>
            </div>

            <div style={{ position: "relative", zIndex: 2, background: "rgba(0,0,0,0.3)", padding: "20px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                color: "#f0e6ff",
                fontSize: "1.15rem",
                marginBottom: "12px",
              }}>
                Project: <span style={{ color: "#e8c547", fontWeight: 700, textShadow: "0 0 10px rgba(232,197,71,0.3)" }}>{hackathon.project}</span>
              </div>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                color: "rgba(240,230,255,0.75)",
                lineHeight: 1.8,
                fontSize: "1.05rem",
                margin: 0
              }}>
                {hackathon.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
