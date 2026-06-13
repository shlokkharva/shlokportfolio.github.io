import { useEffect, useRef } from "react";

interface Spider {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  speed: number;
  angle: number;
  legPhase: number;
  fleeing: number;
}

export function ParticleWeb() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);

    // Initialize mouse to center if not moved
    mouseRef.current = { x: canvas.width / 2, y: canvas.height / 2 };

    let frame = 0;
    const numRadials = 16;
    const numRings = 12;

    // Initialize interactive spiders
    const spiders: Spider[] = Array.from({ length: 7 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      targetX: Math.random() * window.innerWidth,
      targetY: Math.random() * window.innerHeight,
      speed: 0.6 + Math.random() * 0.8,
      angle: 0,
      legPhase: Math.random() * Math.PI * 2,
      fleeing: 0,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      // Slowly track mouse for parallax effect
      const targetX = mouseRef.current.x;
      const targetY = mouseRef.current.y;
      
      // Calculate center of web with slight parallax
      const centerX = canvas.width / 2 + (targetX - canvas.width / 2) * 0.05;
      const centerY = canvas.height / 2 + (targetY - canvas.height / 2) * 0.05;
      
      const maxRadius = Math.max(canvas.width, canvas.height) * 1.2;

      ctx.lineWidth = 1;

      // Draw radial anchor lines
      ctx.strokeStyle = `rgba(200, 140, 200, 0.08)`;
      for (let i = 0; i < numRadials; i++) {
        const angle = (i * Math.PI * 2) / numRadials;
        const endX = centerX + Math.cos(angle) * maxRadius;
        const endY = centerY + Math.sin(angle) * maxRadius;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }

      // Draw concentric drooping rings (web silk)
      for (let r = 1; r <= numRings; r++) {
        const baseRadius = (maxRadius / numRings) * Math.pow(r / numRings, 1.2) * numRings; // non-linear spacing
        
        ctx.beginPath();
        for (let i = 0; i < numRadials; i++) {
          const angle1 = (i * Math.PI * 2) / numRadials;
          const angle2 = ((i + 1) * Math.PI * 2) / numRadials;
          
          // Organic breathing animation
          const wave = Math.sin(frame * 0.02 + r * 0.5) * (r * 2);
          const currentRadius = baseRadius + wave;
          
          const p1x = centerX + Math.cos(angle1) * currentRadius;
          const p1y = centerY + Math.sin(angle1) * currentRadius;
          const p2x = centerX + Math.cos(angle2) * currentRadius;
          const p2y = centerY + Math.sin(angle2) * currentRadius;
          
          if (i === 0) ctx.moveTo(p1x, p1y);
          
          // Control point pulling inward to create the distinct spider web "droop"
          const midAngle = (angle1 + angle2) / 2;
          const droopRadius = currentRadius * 0.88; // 88% creates a nice curve
          const cx = centerX + Math.cos(midAngle) * droopRadius;
          const cy = centerY + Math.sin(midAngle) * droopRadius;
          
          ctx.quadraticCurveTo(cx, cy, p2x, p2y);
        }
        ctx.closePath();
        
        // Fading opacity based on distance
        const ringAlpha = 0.15 * (1 - r / (numRings + 2));
        ctx.strokeStyle = `rgba(200, 160, 255, ${ringAlpha})`;
        ctx.stroke();

        // Draw little "dew drops" at intersections randomly
        for (let i = 0; i < numRadials; i++) {
          if (Math.random() > 0.98) {
             const angle = (i * Math.PI * 2) / numRadials;
             const dropX = centerX + Math.cos(angle) * baseRadius;
             const dropY = centerY + Math.sin(angle) * baseRadius;
             ctx.beginPath();
             ctx.arc(dropX, dropY, 1.5, 0, Math.PI*2);
             ctx.fillStyle = `rgba(255, 255, 255, ${ringAlpha * 3})`;
             ctx.fill();
          }
        }
      }

      // Update and draw spiders
      for (const sp of spiders) {
        const dx = sp.targetX - sp.x;
        const dy = sp.targetY - sp.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Flee mechanism
        const mdx = sp.x - mouseRef.current.x;
        const mdy = sp.y - mouseRef.current.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mDist < 120) {
           sp.fleeing = 40; // scramble for 40 frames
           // Pick new target away from mouse
           sp.targetX = sp.x + (mdx / mDist) * 400 + (Math.random() - 0.5) * 200;
           sp.targetY = sp.y + (mdy / mDist) * 400 + (Math.random() - 0.5) * 200;
        }

        // Reached target, pick new node on the web
        if (dist < 10 && sp.fleeing <= 0) {
           const r = Math.floor(Math.random() * numRings) + 1;
           const rad = Math.floor(Math.random() * numRadials);
           const angle = (rad * Math.PI * 2) / numRadials;
           
           const baseRadius = (maxRadius / numRings) * Math.pow(r / numRings, 1.2) * numRings;
           sp.targetX = centerX + Math.cos(angle) * baseRadius;
           sp.targetY = centerY + Math.sin(angle) * baseRadius;
        }

        if (sp.fleeing > 0) sp.fleeing--;

        // Calculate movement
        sp.angle = Math.atan2(sp.targetY - sp.y, sp.targetX - sp.x);
        const currentSpeed = sp.fleeing > 0 ? sp.speed * 4.5 : sp.speed; // Fast scramble when fleeing
        
        sp.x += Math.cos(sp.angle) * currentSpeed;
        sp.y += Math.sin(sp.angle) * currentSpeed;
        sp.legPhase += currentSpeed * 0.4; // Animate legs based on speed

        // Draw spider
        ctx.save();
        ctx.translate(sp.x, sp.y);
        ctx.rotate(sp.angle);

        // Glow
        ctx.shadowColor = "#cc1f1f";
        ctx.shadowBlur = 10;
        
        ctx.fillStyle = "#cc1f1f";
        
        // Abdomen
        ctx.beginPath();
        ctx.ellipse(-2, 0, 5, 3.5, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Head
        ctx.beginPath();
        ctx.arc(3, 0, 2, 0, Math.PI * 2);
        ctx.fill();

        // Glowing white eyes
        ctx.fillStyle = "#fff";
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(4, -1, 0.6, 0, Math.PI * 2);
        ctx.arc(4, 1, 0.6, 0, Math.PI * 2);
        ctx.fill();

        // Legs (4 per side)
        ctx.strokeStyle = "#cc1f1f";
        ctx.lineWidth = 1;
        for (let i = 0; i < 4; i++) {
           const legSwing = Math.sin(sp.legPhase + i * (Math.PI / 2)) * 4;
           
           // Right leg
           ctx.beginPath();
           ctx.moveTo(1 - i, 2);
           ctx.lineTo(2 - i + legSwing * 0.5, 6);
           ctx.lineTo(4 - i + legSwing, 9);
           ctx.stroke();

           // Left leg
           ctx.beginPath();
           ctx.moveTo(1 - i, -2);
           ctx.lineTo(2 - i - legSwing * 0.5, -6);
           ctx.lineTo(4 - i - legSwing, -9);
           ctx.stroke();
        }

        ctx.restore();
      }

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
