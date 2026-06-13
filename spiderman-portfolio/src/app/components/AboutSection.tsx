import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";

function Card3DTilt({ children, className }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg)");
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotY = (x - 0.5) * 20;
    const rotX = -(y - 0.5) * 20;
    setTransform(`perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.03,1.03,1.03)`);
    setGlare({ x: x * 100, y: y * 100, opacity: 0.2 });
  };

  const onMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)");
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
      style={{
        transform,
        transition: "transform 0.1s ease",
        transformStyle: "preserve-3d",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {children}
      {/* Glare effect */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 60%)`,
          pointerEvents: "none",
          transition: "opacity 0.3s ease",
          borderRadius: "inherit",
        }}
      />
    </div>
  );
}

const stats = [
  { label: "Projects Completed", value: "10+", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg> },
  { label: "Years Experience", value: "2+", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg> },
  { label: "Technologies", value: "15+", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg> },
  { label: "Hackathons", value: "4+", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg> },
];

function InteractiveWeb({ active }: { active: boolean }) {
  return (
    <motion.svg
      initial={{ scale: 0.5, opacity: 0, rotate: -30 }}
      animate={active ? { scale: 1, opacity: 0.25, rotate: 0 } : { scale: 0.8, opacity: 0, rotate: -10 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      style={{
        position: "absolute",
        top: "-20%", left: "-20%",
        width: "140%", height: "140%",
        pointerEvents: "none",
        zIndex: 0
      }}
      viewBox="0 0 100 100"
    >
      {[15, 30, 45, 60, 75, 90].map((r) => (
        <circle key={r} cx="50" cy="50" r={r} fill="none" stroke="#cc1f1f" strokeWidth="0.4" />
      ))}
      {[0, 30, 60, 90, 120, 150].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <line key={`line1-${i}`} x1="50" y1="50" x2={50 + Math.cos(rad) * 100} y2={50 + Math.sin(rad) * 100} stroke="#cc1f1f" strokeWidth="0.4" />
        );
      })}
      {[0, 30, 60, 90, 120, 150].map((angle, i) => {
        const rad = ((angle + 180) * Math.PI) / 180;
        return (
          <line key={`line2-${i}`} x1="50" y1="50" x2={50 + Math.cos(rad) * 100} y2={50 + Math.sin(rad) * 100} stroke="#cc1f1f" strokeWidth="0.4" />
        );
      })}
    </motion.svg>
  );
}

export function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [isProfileHovered, setIsProfileHovered] = useState(false);

  return (
    <section
      id="about"
      ref={ref}
      style={{
        padding: "60px 24px",
        maxWidth: 1200,
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7 }}
        style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 48 }}
      >
        <div style={{ width: 40, height: 1, background: "#cc1f1f" }} />
        <span style={{ fontFamily: "'Share Tech Mono', monospace", color: "#cc1f1f", fontSize: "0.85rem", letterSpacing: "0.2em" }}>
          01 / ABOUT
        </span>
      </motion.div>

      <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", position: "relative" }}>
        
        {/* Floating Daily Bugle Image */}
        <motion.div
          initial={{ opacity: 0, rotateZ: 10, y: 50 }}
          animate={inView ? { opacity: 0.15, rotateZ: 5, y: 0 } : {}}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          style={{
            position: "absolute",
            top: "-15%",
            right: "-5%",
            width: "350px",
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <img src="/images/daily_bugle_tech.png" alt="Daily Bugle Clipping" style={{ width: "100%", height: "auto", mixBlendMode: "screen", filter: "invert(1) sepia(0.5) hue-rotate(315deg) contrast(1.5)" }} />
        </motion.div>

        {/* Left: 3D Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: "easeOut" }}
          style={{ position: "relative" }}
        >
          <Card3DTilt>
            <div
              onMouseEnter={() => setIsProfileHovered(true)}
              onMouseLeave={() => setIsProfileHovered(false)}
              style={{
                background: "linear-gradient(180deg, rgba(20,0,30,0.9) 0%, rgba(10,0,15,0.95) 100%)",
                border: "1px solid rgba(204,31,31,0.3)",
                borderTop: "3px solid #cc1f1f",
                borderRadius: 12,
                padding: "30px 30px",
                backdropFilter: "blur(20px)",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 20px 50px rgba(0,0,0,0.5), inset 0 0 30px rgba(204,31,31,0.05)",
              }}
            >
              {/* Interactive Web Effect */}
              <InteractiveWeb active={isProfileHovered} />

              <div style={{ textAlign: "center", marginBottom: 30, position: "relative", zIndex: 2 }}>
                {/* Tech brackets around name */}
                <h3 style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "#f0e6ff",
                  letterSpacing: "0.05em",
                  marginBottom: 8,
                  textShadow: "0 0 20px rgba(204,31,31,0.5)"
                }}>
                  <span style={{ color: "rgba(204,31,31,0.5)", marginRight: 8 }}>[</span>
                  Shlok Kharva
                  <span style={{ color: "rgba(204,31,31,0.5)", marginLeft: 8 }}>]</span>
                </h3>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(204,31,31,0.1)", padding: "6px 16px", borderRadius: 20, border: "1px solid rgba(204,31,31,0.3)" }}>
                  <span style={{ width: 6, height: 6, background: "#cc1f1f", borderRadius: "50%", boxShadow: "0 0 10px #cc1f1f" }} />
                  <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.85rem", color: "#cc1f1f", letterSpacing: "0.15em", margin: 0 }}>
                    FULL STACK DEVELOPER
                  </p>
                </div>
              </div>

              {/* Spider Web Data Nodes */}
              <div style={{ position: "relative", padding: "10px 0 0", minHeight: 120, zIndex: 2 }}>
                {/* Central Hanging Silk Thread */}
                <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 2, background: "linear-gradient(to bottom, rgba(204,31,31,0.8), transparent)", boxShadow: "0 0 10px rgba(204,31,31,0.5)" }} />
                
                {/* Glowing Node Icon */}
                <motion.div 
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  style={{ position: "absolute", left: "50%", top: -5, transform: "translateX(-50%)", zIndex: 3 }}
                >
                  <div style={{ width: 16, height: 16, background: "#cc1f1f", borderRadius: "50%", boxShadow: "0 0 20px #cc1f1f", border: "2px solid #fff" }} />
                </motion.div>

                <div style={{ paddingTop: 20, display: "flex", flexDirection: "column", gap: 20 }}>
                  {[
                    { label: "Location", value: "Vadodara, India" },
                    { label: "Email", value: "shlokkharva@gmail.com" },
                  ].map(({ label, value }, i) => {
                    const isLeft = i % 2 === 0;
                    return (
                      <motion.div 
                        key={label}
                        initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.2 }}
                        style={{ display: "flex", justifyContent: isLeft ? "flex-start" : "flex-end", width: "100%" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: isLeft ? "flex-end" : "flex-start",
                            textAlign: isLeft ? "right" : "left",
                            width: "42%", // Leaves 8% gap to center line
                            position: "relative",
                            background: "rgba(204,31,31,0.03)",
                            padding: "10px 15px",
                            borderRadius: 6,
                            border: "1px solid rgba(204,31,31,0.1)",
                            boxShadow: isProfileHovered ? "0 0 15px rgba(204,31,31,0.1)" : "none",
                            transition: "all 0.3s ease"
                          }}
                        >
                          {/* Connection silk to central thread */}
                          <div style={{
                             position: "absolute",
                             top: "50%",
                             [isLeft ? "right" : "left"]: "-20%", // Cross the 8% gap + extra to cross center
                             width: "20%",
                             height: 1,
                             background: "linear-gradient(90deg, rgba(204,31,31,0.8), rgba(204,31,31,0.2))",
                          }} />
                          <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.75rem", color: "#cc1f1f", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4 }}>
                            {label}
                          </span>
                          <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.95rem", color: "#f0e6ff", fontWeight: 500 }}>
                            {value}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Card3DTilt>
        </motion.div>

        {/* Right: Text content */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
        >
          <h2
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              color: "#f0e6ff",
              marginBottom: 24,
              letterSpacing: "0.02em",
            }}
          >
            Friendly Neighborhood{" "}
            <span style={{
              background: "linear-gradient(135deg, #cc1f1f, #e8c547)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Developer
            </span>
          </h2>

          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "1rem",
            color: "rgba(240,230,255,0.65)",
            lineHeight: 1.85,
            marginBottom: 20,
          }}>
            Just like our friendly neighborhood hero swings between skyscrapers with precision and grace, I navigate the full stack — from elegant frontends to robust backends — with the same dedication and web-slinging efficiency. As a Computer Engineering student, I thrive on solving complex problems.
          </p>

          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "1rem",
            color: "rgba(240,230,255,0.65)",
            lineHeight: 1.85,
            marginBottom: 36,
          }}>
            I specialize in building high-performance web applications, machine learning models, and dynamic interfaces that combine cutting-edge technology with stunning visual experiences. Every project is a mission, and I never leave a bug uncaught.
          </p>

          {/* Download resume button */}
          <WebButton>
            <a href="Shlok Kharva.docx" download style={{ color: "inherit", textDecoration: "none" }}>Download Resume</a>
          </WebButton>
        </motion.div>
      </div>

      {/* Stats row */}
      <div
        className="stats-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 20,
          marginTop: 80,
        }}
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
          >
            <Card3DTilt>
              <div
                style={{
                  background: "rgba(20,0,30,0.6)",
                  border: "1px solid rgba(204,31,31,0.2)",
                  borderRadius: 12,
                  padding: "28px 20px",
                  backdropFilter: "blur(16px)",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "1.8rem", marginBottom: 8 }}>{stat.icon}</div>
                <div
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: "2.4rem",
                    fontWeight: 700,
                    color: "#cc1f1f",
                    lineHeight: 1,
                    marginBottom: 4,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "0.8rem",
                    color: "rgba(240,230,255,0.5)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            </Card3DTilt>
          </motion.div>
        ))}
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}

function CornerWeb() {
  return (
    <svg
      style={{ position: "absolute", top: 0, right: 0, opacity: 0.25, pointerEvents: "none" }}
      width="80" height="80" viewBox="0 0 80 80"
    >
      {[10, 25, 45, 65].map((r) => (
        <circle key={r} cx="80" cy="0" r={r} fill="none" stroke="#cc1f1f" strokeWidth="0.7" />
      ))}
      {[0, 30, 60, 90].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        return <line key={i} x1="80" y1="0" x2={80 + Math.cos(rad + Math.PI) * 70} y2={0 + Math.sin(rad + Math.PI / 2) * 70} stroke="#cc1f1f" strokeWidth="0.5" />;
      })}
    </svg>
  );
}

function WebButton({ children }: { children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "'Rajdhani', sans-serif",
        fontSize: "0.9rem",
        fontWeight: 700,
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        padding: "13px 28px",
        background: hovered ? "rgba(204,31,31,0.15)" : "transparent",
        border: "1px solid rgba(204,31,31,0.6)",
        borderRadius: 2,
        color: "#cc1f1f",
        cursor: "pointer",
        transition: "all 0.3s ease",
        display: "flex",
        alignItems: "center",
        gap: 10,
        boxShadow: hovered ? "0 0 20px rgba(204,31,31,0.2)" : "none",
      }}
    >
      <span style={{ fontSize: "1.1rem" }}>↓</span>
      {children}
    </button>
  );
}
