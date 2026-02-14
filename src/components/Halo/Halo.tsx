"use client";
import React, { useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

export interface HaloProps {
  accentColor?: string;
  orbCount?: number;
  sizeScale?: number;
  frostAmount?: number;
  driftSpeed?: number;
  children?: React.ReactNode;
}

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

interface Orb {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  isAccent: boolean;
  opacity: number;
  phase: number;
  phaseSpeed: number;
}

function makeOrbs(
  count: number,
  w: number,
  h: number,
  sizeScale: number,
  accentIdx: number,
): Orb[] {
  return Array.from({ length: count }, (_, i) => {
    const r = (60 + Math.random() * 140) * sizeScale;
    return {
      x: r + Math.random() * (w - r * 2),
      y: r + Math.random() * (h - r * 2),
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r,
      isAccent: i === accentIdx,
      opacity: 0.55 + Math.random() * 0.3,
      phase: Math.random() * Math.PI * 2,
      phaseSpeed: 0.003 + Math.random() * 0.004,
    };
  });
}

function drawOrb(
  ctx: CanvasRenderingContext2D,
  orb: Orb,
  ar: number, ag: number, ab: number,
  frostAmount: number,
  breathR: number,
) {
  const { x, y, isAccent, opacity } = orb;
  const r = breathR;

  const bloom = ctx.createRadialGradient(x, y + r * 0.15, 0, x, y, r * 1.6);
  if (isAccent) {
    bloom.addColorStop(0,   `rgba(${ar},${ag},${ab},0.18)`);
    bloom.addColorStop(0.5, `rgba(${ar},${ag},${ab},0.06)`);
    bloom.addColorStop(1,   `rgba(${ar},${ag},${ab},0)`);
  } else {
    bloom.addColorStop(0,   `rgba(200,200,220,0.10)`);
    bloom.addColorStop(0.5, `rgba(180,180,200,0.03)`);
    bloom.addColorStop(1,   `rgba(180,180,200,0)`);
  }
  ctx.fillStyle = bloom;
  ctx.beginPath();
  ctx.arc(x, y, r * 1.6, 0, Math.PI * 2);
  ctx.fill();

  const bodyGrd = ctx.createRadialGradient(
    x - r * 0.25, y - r * 0.25, 0,
    x,            y,            r,
  );
  const frost = frostAmount;
  if (isAccent) {
    bodyGrd.addColorStop(0,   `rgba(${ar},${ag},${ab},${(0.22 + frost * 0.18) * opacity})`);
    bodyGrd.addColorStop(0.5, `rgba(${ar},${ag},${ab},${(0.10 + frost * 0.12) * opacity})`);
    bodyGrd.addColorStop(1,   `rgba(${ar},${ag},${ab},${(0.04 + frost * 0.06) * opacity})`);
  } else {
    bodyGrd.addColorStop(0,   `rgba(240,240,255,${(0.18 + frost * 0.22) * opacity})`);
    bodyGrd.addColorStop(0.5, `rgba(210,210,235,${(0.08 + frost * 0.12) * opacity})`);
    bodyGrd.addColorStop(1,   `rgba(190,190,220,${(0.02 + frost * 0.06) * opacity})`);
  }
  ctx.fillStyle = bodyGrd;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();

  const rimGrd = ctx.createRadialGradient(x, y, r * 0.72, x, y, r);
  if (isAccent) {
    rimGrd.addColorStop(0,   `rgba(${ar},${ag},${ab},0)`);
    rimGrd.addColorStop(0.7, `rgba(${ar},${ag},${ab},${0.08 * opacity})`);
    rimGrd.addColorStop(1,   `rgba(${ar},${ag},${ab},${0.22 * opacity})`);
  } else {
    rimGrd.addColorStop(0,   "rgba(255,255,255,0)");
    rimGrd.addColorStop(0.7, `rgba(255,255,255,${0.06 * opacity})`);
    rimGrd.addColorStop(1,   `rgba(255,255,255,${0.18 * opacity})`);
  }
  ctx.fillStyle = rimGrd;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();

  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, r * 0.88, 0, Math.PI * 2);
  ctx.clip();
  const arcGrd = ctx.createLinearGradient(
    x - r * 0.6, y - r * 0.6,
    x + r * 0.3, y + r * 0.3,
  );
  arcGrd.addColorStop(0,   `rgba(255,255,255,${0.22 * opacity})`);
  arcGrd.addColorStop(0.3, `rgba(255,255,255,${0.06 * opacity})`);
  arcGrd.addColorStop(1,   "rgba(255,255,255,0)");
  ctx.fillStyle = arcGrd;
  ctx.fillRect(x - r, y - r, r * 2, r * 2);
  ctx.restore();

  const specR = r * 0.22;
  const specX = x - r * 0.38;
  const specY = y - r * 0.38;
  const spec  = ctx.createRadialGradient(specX, specY, 0, specX, specY, specR);
  spec.addColorStop(0,   `rgba(255,255,255,${0.85 * opacity})`);
  spec.addColorStop(0.4, `rgba(255,255,255,${0.25 * opacity})`);
  spec.addColorStop(1,   "rgba(255,255,255,0)");
  ctx.fillStyle = spec;
  ctx.beginPath();
  ctx.arc(specX, specY, specR, 0, Math.PI * 2);
  ctx.fill();

  const spec2X = x + r * 0.42;
  const spec2Y = y + r * 0.42;
  const spec2  = ctx.createRadialGradient(spec2X, spec2Y, 0, spec2X, spec2Y, r * 0.28);
  if (isAccent) {
    spec2.addColorStop(0,   `rgba(${ar},${ag},${ab},${0.35 * opacity})`);
    spec2.addColorStop(1,   "rgba(0,0,0,0)");
  } else {
    spec2.addColorStop(0,   `rgba(220,220,255,${0.20 * opacity})`);
    spec2.addColorStop(1,   "rgba(0,0,0,0)");
  }
  ctx.fillStyle = spec2;
  ctx.beginPath();
  ctx.arc(spec2X, spec2Y, r * 0.28, 0, Math.PI * 2);
  ctx.fill();
}

export const Halo: React.FC<HaloProps> = ({
  accentColor = "#7c3aed",
  orbCount    = 8,
  sizeScale   = 1.0,
  frostAmount = 0.5,
  driftSpeed  = 1.0,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const cursorRef    = useRef<HTMLDivElement>(null);
  const rafRef       = useRef<number | undefined>(undefined);
  const orbsRef      = useRef<Orb[]>([]);
  const sizeRef      = useRef({ w: 0, h: 0 });
  const mouseRef     = useRef({ x: -9999, y: -9999, down: false, downAt: 0 });
  const lastMoveRef  = useRef(0);

  const resizeCanvas = useCallback(() => {
    const canvas    = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const dpr = window.devicePixelRatio || 1;
    const w   = container.clientWidth;
    const h   = container.clientHeight;
    canvas.width        = w * dpr;
    canvas.height       = h * dpr;
    canvas.style.width  = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);
    sizeRef.current = { w, h };

    const accentIdx = orbsRef.current.findIndex(o => o.isAccent);
    orbsRef.current = makeOrbs(orbCount, w, h, sizeScale, accentIdx >= 0 ? accentIdx : Math.floor(orbCount / 2));
  }, [orbCount, sizeScale]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    resizeCanvas();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resizeCanvas, 100); };
    window.addEventListener("resize", onResize);

    const [ar, ag, ab] = hexToRgb(accentColor);

    const animate = () => {
      const { w, h } = sizeRef.current;
      const orbs = orbsRef.current;
      const { x: mx, y: my, down, downAt } = mouseRef.current;

      ctx.fillStyle = "rgba(7, 6, 14, 1)";
      ctx.fillRect(0, 0, w, h);

      const speed = driftSpeed;
      const holdMs = down ? performance.now() - downAt : 0;
      // Short press = repel, long press (>600ms) = attract
      const mouseMode: "repel" | "attract" | "none" =
        !down && mx > 0 ? "none" :
        holdMs > 600    ? "attract" : "repel";

      for (let i = 0; i < orbs.length; i++) {
        const o = orbs[i];

        // Breath
        o.phase += o.phaseSpeed;

        // Mouse force
        if (mx > 0) {
          const dx   = o.x - mx, dy = o.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const zone = o.r * 3.5;
          if (dist < zone && dist > 1) {
            const force = ((zone - dist) / zone) * 0.012;
            if (mouseMode === "repel") {
              o.vx += (dx / dist) * force;
              o.vy += (dy / dist) * force;
            } else if (mouseMode === "attract") {
              o.vx -= (dx / dist) * force * 0.6;
              o.vy -= (dy / dist) * force * 0.6;
            }
          }
        }

        for (let j = i + 1; j < orbs.length; j++) {
          const b   = orbs[j];
          const dx  = o.x - b.x, dy = o.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minD = o.r + b.r;
          if (dist < minD && dist > 0.5) {
            const push = (minD - dist) / minD * 0.018;
            const nx = dx / dist, ny = dy / dist;
            o.vx += nx * push; o.vy += ny * push;
            b.vx -= nx * push; b.vy -= ny * push;
          }
        }

        o.vx *= 0.985;
        o.vy *= 0.985;

        const spd = Math.sqrt(o.vx * o.vx + o.vy * o.vy);
        if (spd < 0.08 * speed) {
          o.vx += (Math.random() - 0.5) * 0.04 * speed;
          o.vy += (Math.random() - 0.5) * 0.04 * speed;
        }

        const maxSpd = 1.2 * speed;
        if (spd > maxSpd) { o.vx = (o.vx / spd) * maxSpd; o.vy = (o.vy / spd) * maxSpd; }

        o.x += o.vx * speed;
        o.y += o.vy * speed;

        const pad = o.r * 0.1;
        if (o.x < o.r + pad)     { o.x = o.r + pad;     o.vx = Math.abs(o.vx) * 0.7; }
        if (o.x > w - o.r - pad) { o.x = w - o.r - pad; o.vx = -Math.abs(o.vx) * 0.7; }
        if (o.y < o.r + pad)     { o.y = o.r + pad;     o.vy = Math.abs(o.vy) * 0.7; }
        if (o.y > h - o.r - pad) { o.y = h - o.r - pad; o.vy = -Math.abs(o.vy) * 0.7; }
      }

      const sorted = [...orbs].sort((a, b) => b.r - a.r);

      for (const orb of sorted) {
        const breathR = orb.r * (1 + Math.sin(orb.phase) * 0.04);
        drawOrb(ctx, { ...orb, r: breathR }, ar, ag, ab, frostAmount, breathR);
      }

      const vig = ctx.createRadialGradient(w/2, h/2, h * 0.25, w/2, h/2, h * 0.85);
      vig.addColorStop(0, "rgba(7,6,14,0)");
      vig.addColorStop(1, "rgba(7,6,14,0.55)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [accentColor, orbCount, sizeScale, frostAmount, driftSpeed, resizeCanvas]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const now = performance.now();
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const rx = e.clientX - rect.left;
    const ry = e.clientY - rect.top;

    if (cursorRef.current) {
      cursorRef.current.style.left    = `${rx}px`;
      cursorRef.current.style.top     = `${ry}px`;
      cursorRef.current.style.opacity = "1";
    }

    if (now - lastMoveRef.current < 16) return;
    lastMoveRef.current = now;
    mouseRef.current.x = rx;
    mouseRef.current.y = ry;
  }, []);

  const handleMouseDown = useCallback(() => {
    mouseRef.current.down   = true;
    mouseRef.current.downAt = performance.now();
  }, []);

  const handleMouseUp = useCallback(() => {
    mouseRef.current.down = false;
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -9999, y: -9999, down: false, downAt: 0 };
    if (cursorRef.current) cursorRef.current.style.opacity = "0";
  }, []);

  const [ar, ag, ab] = hexToRgb(accentColor);
  const accentRgb = `${ar},${ag},${ab}`;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-screen overflow-hidden flex flex-col halo-wrap"
      style={{ background: "#07060e", cursor: "none" }}
    >
      <style>{`.halo-wrap, .halo-wrap * { cursor: none !important; }`}</style>
      <div
        ref={cursorRef}
        className="absolute pointer-events-none z-50 rounded-full"
        style={{
          width: "12px",
          height: "12px",
          background: `rgba(${accentRgb},0.9)`,
          boxShadow: `0 0 16px 4px rgba(${accentRgb},0.5)`,
          transform: "translate(-50%,-50%)",
          transition: "opacity 0.2s",
          opacity: 0,
          top: 0,
          left: 0,
          willChange: "left, top",
        }}
      />

      <canvas ref={canvasRef} className="absolute inset-0" />

      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          mixBlendMode: "overlay",
        }}
      />

      <motion.nav
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 flex items-center justify-between px-10 md:px-16 pt-10"
      >
        <div style={{
          fontFamily: "system-ui, sans-serif",
          fontSize: "13px",
          fontWeight: 600,
          letterSpacing: "0.08em",
          color: "#fff",
        }}>
          halo<span style={{ color: accentColor }}>.</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{
              background: `rgba(${accentRgb},0.12)`,
              border: `1px solid rgba(${accentRgb},0.25)`,
              color: accentColor,
              fontFamily: "monospace",
              letterSpacing: "0.05em",
              backdropFilter: "blur(8px)",
            }}
          >
            click + hold to attract
          </div>
        </div>
      </motion.nav>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6">
        {children || (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.18 } } }}
            className="flex flex-col items-center max-w-3xl"
          >
            <motion.div
              variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
              className="mb-8 px-4 py-1.5 rounded-full flex items-center gap-2"
              style={{
                background: `rgba(${accentRgb},0.08)`,
                border: `1px solid rgba(${accentRgb},0.2)`,
                backdropFilter: "blur(16px)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: accentColor, boxShadow: `0 0 8px ${accentColor}` }}
              />
              <span style={{ fontFamily: "monospace", fontSize: "11px", color: accentColor, letterSpacing: "0.15em" }}>
                INTERACTIVE BACKGROUND
              </span>
            </motion.div>

            <motion.h1
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } } }}
              style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(3rem, 8vw, 7rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
                color: "#ffffff",
                marginBottom: "1.5rem",
              }}
            >
              Glass that<br />
              <span style={{
                color: "transparent",
                WebkitTextStroke: `1.5px rgba(${accentRgb},0.7)`,
                textShadow: `0 0 80px rgba(${accentRgb},0.3)`,
              }}>
                moves.
              </span>
            </motion.h1>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              style={{
                fontFamily: "system-ui, sans-serif",
                fontSize: "16px",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.38)",
                maxWidth: "380px",
                marginBottom: "3rem",
                fontWeight: 300,
              }}
            >
              Physically-simulated glass orbs with specular highlights, inner refraction, and soft collision.
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              className="flex items-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  padding: "14px 32px",
                  borderRadius: "999px",
                  background: accentColor,
                  color: "#fff",
                  fontFamily: "system-ui, sans-serif",
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.03em",
                  border: "none",
                  cursor: "none",
                  boxShadow: `0 0 40px rgba(${accentRgb},0.4), 0 0 80px rgba(${accentRgb},0.15)`,
                  transition: "box-shadow 0.3s",
                }}
              >
                Use this component →
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  padding: "13px 32px",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.04)",
                  color: "rgba(255,255,255,0.5)",
                  fontFamily: "system-ui, sans-serif",
                  fontSize: "13px",
                  fontWeight: 500,
                  border: "1px solid rgba(255,255,255,0.1)",
                  cursor: "none",
                  backdropFilter: "blur(12px)",
                  transition: "color 0.3s, border-color 0.3s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color = "#fff";
                  (e.currentTarget as HTMLElement).style.borderColor = `rgba(${accentRgb},0.3)`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                }}
              >
                View source
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="relative z-10 flex items-center justify-center pb-10 gap-2"
        style={{ fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,0.18)", letterSpacing: "0.2em" }}
      >
        <span>MOVE</span>
        <span style={{ color: `rgba(${accentRgb},0.4)` }}>·</span>
        <span>CLICK</span>
        <span style={{ color: `rgba(${accentRgb},0.4)` }}>·</span>
        <span>HOLD</span>
      </motion.div>


    </div>
  );
};