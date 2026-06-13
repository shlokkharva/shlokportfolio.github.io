import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";

const socials = [
  { label: "GitHub", icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>, handle: "@shlokkharva", color: "#f0e6ff" },
  { label: "LinkedIn", icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>, handle: "shlokkharva", color: "#0a66c2" },
  { label: "Portfolio", icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>, handle: "shlokportfolio.github.io", color: "#1d9bf0" },
  { label: "Email", icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>, handle: "shlokkharva@gmail.com", color: "#cc1f1f" },
];

function FloatingElement({ style, delay }: { style: React.CSSProperties; delay: number }) {
  return (
    <motion.div
      animate={{ y: [0, -20, 0], rotate: [-5, 5, -5], opacity: [0.15, 0.3, 0.15] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut", delay }}
      style={{ position: "absolute", pointerEvents: "none", ...style }}
    >
      <svg width="40" height="40" viewBox="0 0 40 40">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <line key={i} x1="20" y1="20"
              x2={20 + Math.cos(rad) * 18}
              y2={20 + Math.sin(rad) * 18}
              stroke="#cc1f1f" strokeWidth="0.8"
            />
          );
        })}
        {[5, 10, 15].map((r) => (
          <circle key={r} cx="20" cy="20" r={r} fill="none" stroke="#cc1f1f" strokeWidth="0.5" />
        ))}
        <circle cx="20" cy="20" r="2" fill="#cc1f1f" />
      </svg>
    </motion.div>
  );
}

export function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSent(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSent(false), 4000);
      } else {
        alert("Failed to send email. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please check if the server is running.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        padding: "60px 24px 80px",
        maxWidth: 1200,
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* Floating web decorations */}
      <FloatingElement style={{ top: "10%", left: "2%" }} delay={0} />
      <FloatingElement style={{ top: "40%", right: "3%" }} delay={1.5} />
      <FloatingElement style={{ bottom: "20%", left: "5%" }} delay={2.5} />

      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7 }}
        style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}
      >
        <div style={{ width: 40, height: 1, background: "#cc1f1f" }} />
        <span style={{ fontFamily: "'Share Tech Mono', monospace", color: "#cc1f1f", fontSize: "0.85rem", letterSpacing: "0.2em" }}>
          07 / CONTACT
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
          marginBottom: 16,
        }}
      >
        Contact{" "}
        <span style={{
          background: "linear-gradient(135deg, #cc1f1f, #e8c547)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          Me
        </span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "1rem",
          color: "rgba(240,230,255,0.55)",
          maxWidth: 500,
          marginBottom: 64,
          lineHeight: 1.7,
        }}
      >
        Have a project in mind? Let's build something amazing together. Your friendly neighborhood developer is just a message away.
      </motion.p>

      <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 56, alignItems: "start" }}>
        {/* Left: Socials */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.8rem",
            color: "rgba(204,31,31,0.7)",
            letterSpacing: "0.2em",
            marginBottom: 24,
            textTransform: "uppercase",
          }}>
            // Find me at
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 48 }}>
            {socials.map((s, i) => (
              <motion.a
                key={s.label}
                href="#"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                whileHover={{ x: 8 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "14px 20px",
                  background: "rgba(20,0,30,0.6)",
                  border: "1px solid rgba(204,31,31,0.15)",
                  borderRadius: 10,
                  backdropFilter: "blur(16px)",
                  textDecoration: "none",
                  transition: "border-color 0.3s ease, background 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(204,31,31,0.45)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(204,31,31,0.08)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(204,31,31,0.15)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(20,0,30,0.6)";
                }}
              >
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: `${s.color}20`,
                  border: `1px solid ${s.color}40`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: s.color,
                  flexShrink: 0,
                }}>
                  {s.icon}
                </div>
                <div>
                  <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.9rem", fontWeight: 700, color: "#f0e6ff", letterSpacing: "0.05em" }}>
                    {s.label}
                  </div>
                  <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.75rem", color: "rgba(240,230,255,0.45)" }}>
                    {s.handle}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Availability indicator */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "16px 20px",
            background: "rgba(20,100,20,0.15)",
            border: "1px solid rgba(74,222,128,0.25)",
            borderRadius: 10,
          }}>
            <div style={{ position: "relative" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80" }} />
              <motion.div
                animate={{ scale: [1, 2, 1], opacity: [0.8, 0, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background: "#4ade80",
                }}
              />
            </div>
            <div>
              <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.9rem", fontWeight: 700, color: "#4ade80" }}>
                Available for Work
              </div>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.72rem", color: "rgba(240,230,255,0.4)" }}>
                Open to freelance & full-time roles
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Contact form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <form onSubmit={handleSubmit}>
            <div
              className="contact-form-container"
              style={{
                background: "rgba(20,0,30,0.75)",
                border: "1px solid rgba(204,31,31,0.2)",
                borderRadius: 16,
                padding: 40,
                backdropFilter: "blur(24px)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Form top line */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 2,
                background: "linear-gradient(90deg, #cc1f1f, transparent)",
              }} />

              {[
                { label: "Name", key: "name", type: "text", placeholder: "Peter Parker" },
                { label: "Email", key: "email", type: "email", placeholder: "peter@dailybugle.com" },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key} style={{ marginBottom: 20 }}>
                  <label style={{
                    display: "block",
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: "0.75rem",
                    color: "rgba(204,31,31,0.8)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: 8,
                  }}>
                    {label}
                  </label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={formData[key as keyof typeof formData]}
                    onChange={e => setFormData(prev => ({ ...prev, [key]: e.target.value }))}
                    required
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(204,31,31,0.2)",
                      borderRadius: 8,
                      color: "#f0e6ff",
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "0.9rem",
                      outline: "none",
                      transition: "all 0.3s ease",
                      boxSizing: "border-box",
                    }}
                    onFocus={e => { 
                      e.target.style.borderColor = "rgba(204,31,31,0.8)"; 
                      e.target.style.boxShadow = "0 0 15px rgba(204,31,31,0.4)"; 
                      e.target.style.background = "rgba(204,31,31,0.05)";
                    }}
                    onBlur={e => { 
                      e.target.style.borderColor = "rgba(204,31,31,0.2)"; 
                      e.target.style.boxShadow = "none";
                      e.target.style.background = "rgba(255,255,255,0.04)";
                    }}
                  />
                </div>
              ))}

              <div style={{ marginBottom: 28 }}>
                <label style={{
                  display: "block",
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "0.75rem",
                  color: "rgba(204,31,31,0.8)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}>
                  Message
                </label>
                <textarea
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  required
                  rows={5}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(204,31,31,0.2)",
                    borderRadius: 8,
                    color: "#f0e6ff",
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "0.9rem",
                    outline: "none",
                    resize: "vertical",
                    transition: "all 0.3s ease",
                    boxSizing: "border-box",
                  }}
                  onFocus={e => { 
                    e.target.style.borderColor = "rgba(204,31,31,0.8)"; 
                    e.target.style.boxShadow = "0 0 15px rgba(204,31,31,0.4)"; 
                    e.target.style.background = "rgba(204,31,31,0.05)";
                  }}
                  onBlur={e => { 
                    e.target.style.borderColor = "rgba(204,31,31,0.2)"; 
                    e.target.style.boxShadow = "none";
                    e.target.style.background = "rgba(255,255,255,0.04)";
                  }}
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={sending}
                style={{
                  width: "100%",
                  padding: "15px 28px",
                  background: sent
                    ? "linear-gradient(135deg, #16a34a, #4ade80)"
                    : "linear-gradient(135deg, #cc1f1f, #8b0000)",
                  border: "none",
                  borderRadius: 8,
                  color: "#fff",
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "1rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  cursor: sending ? "not-allowed" : "pointer",
                  opacity: sending ? 0.7 : 1,
                  transition: "background 0.4s ease",
                  boxShadow: "0 4px 20px rgba(204,31,31,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                }}
              >
                {sending ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      style={{ display: "inline-block", fontSize: "1.1rem" }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
                    </motion.span>
                    Sending...
                  </>
                ) : sent ? (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Message Sent!
                  </>
                ) : (
                  <>Send an Email →</>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
