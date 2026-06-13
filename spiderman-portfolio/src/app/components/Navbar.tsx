import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "motion/react";

const links = ["Home", "About", "Skills", "Projects", "Contact"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { stiffness: 100, damping: 20 });

  // 3D & Transform animations based on scroll
  const imgSize = useTransform(smoothScrollY, [0, 300], [240, 44]);
  const imgTop = useTransform(smoothScrollY, [0, 300], ["16vh", "12px"]);
  const imgLeft = useTransform(smoothScrollY, [0, 300], ["50%", "24px"]);
  const imgX = useTransform(smoothScrollY, [0, 300], ["-50%", "0%"]);
  const imgRotateY = useTransform(smoothScrollY, [0, 150, 300], [0, 45, 0]);
  const imgRotateX = useTransform(smoothScrollY, [0, 150, 300], [0, 20, 0]);
  const imgBorder = useTransform(smoothScrollY, [0, 300], ["3px solid rgba(204,31,31,0.8)", "2px solid rgba(204,31,31,0.4)"]);
  const imgShadow = useTransform(smoothScrollY, [0, 300], ["0 20px 50px rgba(204,31,31,0.5)", "0 0px 10px rgba(204,31,31,0)"]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase());
    el?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4"
        style={{
          background: scrolled
            ? "rgba(7,0,13,0.92)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(204,31,31,0.2)" : "none",
          transition: "all 0.4s ease",
        }}
      >
        {/* Logo */}
        <motion.div
          className="cursor-pointer flex items-center gap-2"
          onClick={() => scrollTo("home")}
          animate={{ x: 0 }} // Reset logo position
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <WebLogo />
          <span
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "1.4rem",
              fontWeight: 700,
              color: "#cc1f1f",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            SPIDER<span style={{ color: "#f0e6ff" }}>FOLIO</span>
          </span>
        </motion.div>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-8">
        {links.map((link) => (
          <button
            key={link}
            onClick={() => scrollTo(link)}
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "0.95rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: active === link ? "#cc1f1f" : "rgba(240,230,255,0.7)",
              background: "none",
              border: "none",
              cursor: "pointer",
              position: "relative",
              padding: "4px 0",
              transition: "color 0.3s ease",
            }}
          >
            {link}
            {active === link && (
              <motion.span
                layoutId="nav-underline"
                style={{
                  position: "absolute",
                  bottom: -2,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: "linear-gradient(90deg, #cc1f1f, #e8c547)",
                  borderRadius: 2,
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{
                rotate: menuOpen ? (i === 0 ? 45 : i === 2 ? -45 : 0) : 0,
                y: menuOpen ? (i === 0 ? 9 : i === 2 ? -9 : 0) : 0,
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
              style={{
                display: "block",
                width: 24,
                height: 2,
                background: "#cc1f1f",
                borderRadius: 2,
                transformOrigin: "center",
              }}
            />
          ))}
        </div>
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background: "rgba(7,0,13,0.97)",
              borderBottom: "1px solid rgba(204,31,31,0.3)",
              backdropFilter: "blur(20px)",
            }}
          >
            {links.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "16px 24px",
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: active === link ? "#cc1f1f" : "rgba(240,230,255,0.8)",
                  background: "none",
                  border: "none",
                  borderBottom: "1px solid rgba(204,31,31,0.1)",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                {link}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
    </>
  );
}

function WebLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="15" fill="none" stroke="#cc1f1f" strokeWidth="1" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <line
            key={i}
            x1="16" y1="16"
            x2={16 + Math.cos(rad) * 14}
            y2={16 + Math.sin(rad) * 14}
            stroke="#cc1f1f" strokeWidth="0.7"
          />
        );
      })}
      {[4, 8, 12].map((r) => (
        <circle key={r} cx="16" cy="16" r={r} fill="none" stroke="#cc1f1f" strokeWidth="0.5" />
      ))}
      <circle cx="16" cy="16" r="2.5" fill="#cc1f1f" />
    </svg>
  );
}
