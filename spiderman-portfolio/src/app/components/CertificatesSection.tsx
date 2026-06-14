import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";

// Dynamically import all webp images from the certificates folder
const certFiles = import.meta.glob("/public/images/certificates/*.webp", { eager: true, query: "?url", import: "default" });

const certificates = Object.entries(certFiles).map(([path, url], i) => {
  const filename = path.split("/").pop()?.replace(".webp", "") || `Certificate ${i + 1}`;
  
  let label = "Certification";
  let priority = 99;
  let color = "#8b9bb4"; // Muted blue
  let title = filename.replace(/[-_]/g, " ");

  const lowerName = filename.toLowerCase();

  // Analyzing and categorizing based on filename heuristics
  if (lowerName.includes("sap")) {
    label = "SAP Enterprise";
    priority = 1;
    color = "#38bdf8"; // Light Blue
    title = lowerName.includes("roa") ? "SAP Record of Achievement" : "SAP 2024 Certification";
  } else if (lowerName.includes("microsoft") && lowerName.includes("coursera")) {
    label = "Microsoft Tech";
    priority = 2;
    color = "#4ade80"; // Green
    title = "Microsoft Generative AI";
  } else if (lowerName.includes("microsoft")) {
    label = "Microsoft Tech";
    priority = 2;
    color = "#4ade80"; // Green
  } else if (lowerName.includes("ibm") || lowerName.includes("skillbuild")) {
    label = "IBM Certified";
    priority = 3;
    color = "#60a5fa"; // Blue
    title = "IBM SkillBuild Certificate";
  } else if (lowerName.includes("coursera")) {
    label = "Coursera Spec.";
    priority = 4;
    color = "#a78bfa"; // Purple
    title = "Coursera Certification";
  } else if (lowerName.includes("s2s")) {
    label = "S2S Academy";
    priority = 5;
    color = "#f472b6"; // Pink
    title = "S2S Academy Achievement";
  } else if (lowerName.includes("participation")) {
    label = "Participation";
    priority = 6;
    color = "#fbbf24"; // Yellow
    title = "Participation Certificate";
  }

  // Fallback for remaining if title wasn't explicitly set above
  if (title === filename.replace(/[-_]/g, " ")) {
    title = title.replace(/\b[A-Z0-9]{10,}\b/g, "").trim();
    if (!title || title.length < 2 || title.toLowerCase() === "coursera") {
      title = `${label} Achievement`;
    }
    if (title.includes("Shlok Kharva") || title === "Certificate") {
      title = "Professional Certificate";
    }
  }

  return {
    id: i,
    img: url as string,
    title,
    label,
    priority,
    color,
  };
}).sort((a, b) => a.priority - b.priority || a.title.localeCompare(b.title));

export function CertificatesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [selectedCert, setSelectedCert] = useState<typeof certificates[0] | null>(null);
  const [showAll, setShowAll] = useState(false);
  
  const visibleCertificates = showAll ? certificates : certificates.slice(0, 3);

  return (
    <section
      id="certificates"
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
          06 / CERTIFICATES
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
          Certifications
        </span>
      </motion.h2>

      <motion.div
        layout
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 24,
        }}
      >
        <AnimatePresence mode="popLayout">
          {visibleCertificates.map((cert, i) => (
            <motion.div
              layout
              key={cert.id}
              onClick={() => setSelectedCert(cert)}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              style={{
                background: "rgba(20,0,30,0.6)",
                border: "1px solid rgba(204,31,31,0.2)",
                borderRadius: 12,
                overflow: "hidden",
                backdropFilter: "blur(20px)",
                cursor: "pointer",
                transition: "box-shadow 0.3s ease",
              }}
              whileHover={{
                y: -8,
                boxShadow: "0 15px 40px rgba(204,31,31,0.4)",
                borderColor: "rgba(204,31,31,0.6)",
              }}
            >
              <div style={{ position: "relative", width: "100%", paddingTop: "70%", overflow: "hidden" }}>
                <img
                  src={cert.img}
                  alt={cert.title}
                  loading="lazy"
                  style={{
                    position: "absolute",
                    top: 0, left: 0, width: "100%", height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                  }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.transform = "scale(1.05)"; }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.transform = "scale(1)"; }}
                />
                <div style={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  background: "rgba(10,0,15,0.8)",
                  backdropFilter: "blur(8px)",
                  border: `1px solid ${cert.color}60`,
                  color: cert.color,
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "0.7rem",
                  fontFamily: "'Share Tech Mono', monospace",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  zIndex: 10,
                  boxShadow: `0 0 10px ${cert.color}40`
                }}>
                  {cert.label}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* View More / Less Button */}
      {certificates.length > 3 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ display: "flex", justifyContent: "center", marginTop: 48 }}
        >
          <button
            onClick={() => setShowAll(!showAll)}
            style={{
              padding: "12px 32px",
              background: "transparent",
              border: "1px solid #cc1f1f",
              borderRadius: "8px",
              color: "#f0e6ff",
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "1.1rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: showAll ? "0 0 15px rgba(204,31,31,0.2)" : "none",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = "rgba(204,31,31,0.1)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(204,31,31,0.4)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.boxShadow = showAll ? "0 0 15px rgba(204,31,31,0.2)" : "none";
            }}
          >
            {showAll ? "View Less Certificates" : "View All Certificates"}
          </button>
        </motion.div>
      )}

      {/* Modal for full certificate */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            style={{
              position: "fixed",
              top: 0, left: 0, width: "100%", height: "100%",
              background: "rgba(0,0,0,0.85)",
              backdropFilter: "blur(10px)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px"
            }}
          >
            <motion.div
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                maxWidth: "900px",
                width: "100%",
                background: "rgba(20,0,30,1)",
                border: `1px solid ${selectedCert.color}50`,
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: `0 20px 60px ${selectedCert.color}40`,
              }}
            >
              <button
                onClick={() => setSelectedCert(null)}
                style={{
                  position: "absolute",
                  top: 16, right: 16,
                  background: "rgba(0,0,0,0.5)",
                  border: `1px solid ${selectedCert.color}`,
                  color: "#fff",
                  width: 36, height: 36,
                  borderRadius: "50%",
                  cursor: "pointer",
                  zIndex: 20,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.2rem",
                  transition: "background 0.3s"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = selectedCert.color)}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.5)")}
              >
                ×
              </button>
              
              <div style={{ padding: "24px", borderBottom: `1px solid rgba(255,255,255,0.1)` }}>
                <h3 style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "1.5rem",
                  color: "#fff",
                  margin: 0
                }}>{selectedCert.title}</h3>
                <span style={{ color: selectedCert.color, fontFamily: "'Share Tech Mono', monospace", fontSize: "0.9rem" }}>{selectedCert.label}</span>
              </div>

              <div style={{ width: "100%", background: "#fff", display: "flex", justifyContent: "center", padding: "10px" }}>
                <img 
                  src={selectedCert.img} 
                  alt={selectedCert.title} 
                  style={{ width: "100%", maxHeight: "65vh", objectFit: "contain" }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
