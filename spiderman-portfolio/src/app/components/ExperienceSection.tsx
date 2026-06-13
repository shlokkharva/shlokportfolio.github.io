import { useRef } from "react";
import { motion, useInView } from "motion/react";

const experiences = [
  {
    id: 1,
    role: "Software Developer Intern",
    company: "Parul Chemicals",
    period: "April 2026 - Present",
    description: "Developing robust software solutions and optimizing internal workflows. Implementing new features using modern web technologies.",
  },
  {
    id: 2,
    role: "Web Developer Intern",
    company: "Arth Technology",
    period: "July 2023 - Sept 2023",
    description: "Built responsive frontend applications, integrated REST APIs, and collaborated with the design team to improve user experience.",
  },
  {
    id: 3,
    role: "Frontend Developer Intern",
    company: "Technomax Solutions",
    period: "Aug 2022 - Sept 2022",
    description: "Assisted in creating landing pages, bug fixing, and writing clean, maintainable HTML/CSS and JavaScript code.",
  }
];

export function ExperienceSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="experience"
      ref={ref}
      style={{ padding: "60px 24px", maxWidth: 1000, margin: "0 auto", position: "relative" }}
    >
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7 }}
        style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}
      >
        <div style={{ width: 40, height: 1, background: "#cc1f1f" }} />
        <span style={{ fontFamily: "'Share Tech Mono', monospace", color: "#cc1f1f", fontSize: "0.85rem", letterSpacing: "0.2em" }}>
          02 / EXPERIENCE
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
          marginBottom: 60,
        }}
      >
        My{" "}
        <span style={{
          background: "linear-gradient(135deg, #cc1f1f, #e8c547)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          Internships
        </span>
      </motion.h2>

      <div style={{ position: "relative", paddingLeft: 40, display: "flex", flexDirection: "column", gap: 32 }}>
        {/* Vertical Web Thread Timeline */}
        <div style={{ position: "absolute", left: 14, top: 20, bottom: 20, width: 2, background: "linear-gradient(to bottom, transparent, rgba(204,31,31,0.6), rgba(204,31,31,0.6), transparent)" }} />
        
        {experiences.map((exp, i) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 + i * 0.2, type: "spring", stiffness: 60 }}
            style={{
              position: "relative",
              padding: "24px 32px",
              background: "rgba(20,0,30,0.6)",
              border: "1px solid rgba(204,31,31,0.2)",
              borderRadius: "16px",
              backdropFilter: "blur(12px)",
              transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              overflow: "hidden"
            }}
            whileHover={{
              x: 10,
              y: -5,
              background: "rgba(30,0,40,0.8)",
              border: "1px solid rgba(204,31,31,0.6)",
              boxShadow: "0 15px 40px rgba(204,31,31,0.3)",
            }}
          >
            {/* Background Glow */}
            <div style={{
              position: "absolute",
              top: -50,
              right: -50,
              width: 150,
              height: 150,
              background: "radial-gradient(circle, rgba(204,31,31,0.2) 0%, transparent 70%)",
              borderRadius: "50%",
              pointerEvents: "none",
            }} />

            {/* Web Node Marker */}
            <div style={{ position: "absolute", left: -42, top: "50%", marginTop: -8, width: 16, height: 16, background: "#07000d", border: "3px solid #cc1f1f", borderRadius: "50%", boxShadow: "0 0 15px rgba(204,31,31,1)", zIndex: 2 }} />
            {/* Silk Connection */}
            <div style={{ position: "absolute", left: -30, top: "50%", width: 30, height: 2, background: "rgba(204,31,31,0.5)", boxShadow: "0 0 5px rgba(204,31,31,0.8)" }} />

            <h3 style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "1.8rem",
              fontWeight: 700,
              color: "#f0e6ff",
              marginBottom: 8,
              position: "relative",
              zIndex: 1
            }}>
              {exp.role} <span style={{ color: "#cc1f1f", textShadow: "0 0 10px rgba(204,31,31,0.5)" }}>@ {exp.company}</span>
            </h3>
            
            <div style={{ display: "inline-block", background: "rgba(204,31,31,0.1)", border: "1px solid rgba(204,31,31,0.3)", borderRadius: "20px", padding: "4px 12px", marginBottom: 16 }}>
              <p style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.85rem",
                color: "#ff6b6b",
                margin: 0,
                letterSpacing: "0.05em"
              }}>
                {exp.period}
              </p>
            </div>
            
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "1.05rem",
              color: "rgba(240,230,255,0.75)",
              lineHeight: 1.7,
              margin: 0,
              position: "relative",
              zIndex: 1
            }}>
              {exp.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
