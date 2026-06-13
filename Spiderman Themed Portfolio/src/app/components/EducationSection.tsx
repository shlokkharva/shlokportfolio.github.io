import { useRef } from "react";
import { motion, useInView } from "motion/react";

const education = [
  {
    id: 1,
    degree: "B.E. Computer Engineering",
    school: "Gujarat Technological University (GTU) | SVIT Vasad",
    period: "2024 - Pursuing",
    cgpa: "7.22",
  },
  {
    id: 2,
    degree: "Diploma in Computer Engineering",
    school: "Gujarat Technological University (GTU) | Shree K.J. Polytechnic, Bharuch",
    period: "2021 - 2024",
    cgpa: "7.56",
  }
];

export function EducationSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="education"
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
          03 / EDUCATION
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
        Academic{" "}
        <span style={{
          background: "linear-gradient(135deg, #cc1f1f, #e8c547)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          Background
        </span>
      </motion.h2>

      <div style={{ position: "relative", paddingLeft: 40, display: "flex", flexDirection: "column", gap: 32 }}>
        {/* Vertical Web Thread Timeline */}
        <div style={{ position: "absolute", left: 14, top: 20, bottom: 20, width: 2, background: "linear-gradient(to bottom, transparent, rgba(96,165,250,0.6), rgba(96,165,250,0.6), transparent)" }} />
        
        {education.map((edu, i) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 + i * 0.2, type: "spring", stiffness: 60 }}
            style={{
              position: "relative",
              padding: "24px 32px",
              background: "rgba(10,20,40,0.6)",
              border: "1px solid rgba(96,165,250,0.2)",
              borderRadius: "16px",
              backdropFilter: "blur(12px)",
              transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              overflow: "hidden"
            }}
            whileHover={{
              x: 10,
              y: -5,
              background: "rgba(15,30,60,0.8)",
              border: "1px solid rgba(96,165,250,0.6)",
              boxShadow: "0 15px 40px rgba(96,165,250,0.2)",
            }}
          >
            {/* Background Glow */}
            <div style={{
              position: "absolute",
              bottom: -50,
              right: -50,
              width: 150,
              height: 150,
              background: "radial-gradient(circle, rgba(96,165,250,0.15) 0%, transparent 70%)",
              borderRadius: "50%",
              pointerEvents: "none",
            }} />

            {/* Web Node Marker */}
            <div style={{ position: "absolute", left: -42, top: "50%", marginTop: -8, width: 16, height: 16, background: "#07000d", border: "3px solid #60a5fa", borderRadius: "50%", boxShadow: "0 0 15px rgba(96,165,250,0.8)", zIndex: 2 }} />
            {/* Silk Connection */}
            <div style={{ position: "absolute", left: -30, top: "50%", width: 30, height: 2, background: "rgba(96,165,250,0.5)", boxShadow: "0 0 5px rgba(96,165,250,0.5)" }} />

            <h3 style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "1.8rem",
              fontWeight: 700,
              color: "#f0e6ff",
              marginBottom: 8,
              position: "relative",
              zIndex: 1
            }}>
              {edu.degree}
            </h3>
            
            <p style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "1rem",
              color: "#93c5fd",
              marginBottom: 16,
              letterSpacing: "0.05em",
              position: "relative",
              zIndex: 1
            }}>
              {edu.school}
            </p>
            
            <div style={{ display: "flex", gap: 16, alignItems: "center", position: "relative", zIndex: 1 }}>
              <div style={{ background: "rgba(96,165,250,0.1)", border: "1px solid rgba(96,165,250,0.3)", borderRadius: "20px", padding: "4px 12px" }}>
                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.95rem",
                  color: "rgba(240,230,255,0.8)",
                  margin: 0,
                }}>
                  {edu.period}
                </p>
              </div>
              
              <div style={{ background: "rgba(232,197,71,0.1)", border: "1px solid rgba(232,197,71,0.3)", borderRadius: "20px", padding: "4px 12px" }}>
                <p style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  color: "#e8c547",
                  margin: 0,
                  textShadow: "0 0 10px rgba(232,197,71,0.4)"
                }}>
                  CGPA: {edu.cgpa}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
