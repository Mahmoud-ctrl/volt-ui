"use client";
import React, { useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

export interface ArcProps {
  boltColor?: "plasma" | "toxic" | "inferno" | "void";
  arcCount?: number;
  branchProbability?: number;
  dischargeFrequency?: number;
  intensity?: number;
  children?: React.ReactNode;
}

// ─── Color sets [outerGlow, midGlow, core, white-hot] ────────────────────────
const COLORS = {
  plasma:  ["rgba(120,80,255,",  "rgba(160,120,255,", "rgba(200,180,255,", "rgba(240,230,255,"],
  toxic:   ["rgba(40,200,80,",   "rgba(80,230,120,",  "rgba(160,255,180,", "rgba(220,255,230,"],
  inferno: ["rgba(220,60,0,",    "rgba(255,120,20,",  "rgba(255,200,80,",  "rgba(255,240,200,"],
  void:    ["rgba(0,180,220,",   "rgba(40,220,255,",  "rgba(160,240,255,", "rgba(220,250,255,"],
} as const;

// ─── Midpoint displacement lightning ─────────────────────────────────────────
// Recursively splits a line segment, displacing the midpoint perpendicular
// to the segment direction. This is the algorithm real lightning simulators use.
interface Pt { x: number; y: number }

function buildBolt(
  x1: number, y1: number,
  x2: number, y2: number,
  depth: number,
  roughness: number,
  branchProb: number,
  branches: Array<[Pt, Pt, number]>, // collected branch segments [start, end, depth]
): Pt[] {
  if (depth === 0) return [{ x: x1, y: y1 }, { x: x2, y: y2 }];

  // Midpoint
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;

  // Perpendicular displacement
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const disp = (Math.random() - 0.5) * len * roughness;
  const nx = -dy / len, ny = dx / len; // normal
  const mpx = mx + nx * disp;
  const mpy = my + ny * disp;

  // Random branch from midpoint
  if (depth >= 2 && Math.random() < branchProb) {
    const angle = (Math.random() - 0.5) * Math.PI * 0.7;
    const bLen  = len * (0.4 + Math.random() * 0.35);
    const cos   = Math.cos(angle), sin = Math.sin(angle);
    const bdx   = (dx / len) * cos - (dy / len) * sin;
    const bdy   = (dx / len) * sin + (dy / len) * cos;
    branches.push([
      { x: mpx, y: mpy },
      { x: mpx + bdx * bLen, y: mpy + bdy * bLen },
      depth - 1,
    ]);
  }

  const left  = buildBolt(x1,  y1,  mpx, mpy, depth - 1, roughness, branchProb, branches);
  const right = buildBolt(mpx, mpy, x2,  y2,  depth - 1, roughness, branchProb, branches);
  return [...left.slice(0, -1), ...right];
}

// ─── Draw one bolt chain with multi-pass glow ─────────────────────────────────
function drawBoltChain(
  ctx: CanvasRenderingContext2D,
  pts: Pt[],
  colors: readonly string[],
  alpha: number,
  isBranch: boolean,
) {
  if (pts.length < 2) return;

  const passes = isBranch
    ? [[8, 0.3], [3, 0.5], [1, 0.8]]   // branch: thinner, dimmer
    : [[18, 0.18], [8, 0.35], [3, 0.6], [1.2, 1.0]]; // main: full 4-pass

  passes.forEach(([lineW, alphaScale], pi) => {
    const colorIdx = Math.min(pi, colors.length - 1);
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
    ctx.strokeStyle = colors[colorIdx] + (alpha * alphaScale).toFixed(3) + ")";
    ctx.lineWidth   = lineW;
    ctx.lineCap     = "round";
    ctx.lineJoin    = "round";
    ctx.stroke();
  });
}

// ─── Arc descriptor ───────────────────────────────────────────────────────────
interface Arc {
  // Angle from origin to target (radians)
  angle: number;
  // Target distance as fraction of min(w,h)/2
  distFrac: number;
  // Redraw every N frames (lower = more jittery)
  redrawEvery: number;
  frameCount: number;
  // Current bolt points
  pts: Pt[];
  branches: Array<{ pts: Pt[]; alpha: number }>;
  alpha: number;
  targetAlpha: number;
}

export const Arc: React.FC<ArcProps> = ({
  boltColor         = "plasma",
  arcCount          = 6,
  branchProbability = 0.35,
  dischargeFrequency = 3,
  intensity         = 0.85,
  children,
}) => {
  const containerRef   = useRef<HTMLDivElement>(null);
  const canvasRef      = useRef<HTMLCanvasElement>(null);
  const rafRef         = useRef<number | undefined>(undefined);
  const arcsRef        = useRef<Arc[]>([]);
  const sizeRef        = useRef({ w: 0, h: 0 });
  const mouseRef       = useRef({ x: -1, y: -1 }); // -1 = inactive
  const lastMoveRef    = useRef(0);
  const flashRef       = useRef(0);      // flash alpha, decays each frame
  const frameRef       = useRef(0);
  const dischargeTimer = useRef(0);

  const buildArcs = useCallback((count: number): Arc[] => {
    return Array.from({ length: count }, (_, i) => ({
      angle:       (i / count) * Math.PI * 2 + Math.random() * 0.3,
      distFrac:    0.55 + Math.random() * 0.4,
      redrawEvery: 2 + Math.floor(Math.random() * 4),
      frameCount:  Math.floor(Math.random() * 6),
      pts:         [],
      branches:    [],
      alpha:       0.4 + Math.random() * 0.5,
      targetAlpha: 0.4 + Math.random() * 0.5,
    }));
  }, []);

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
    arcsRef.current = buildArcs(arcCount);
  }, [arcCount, buildArcs]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    resizeCanvas();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resizeCanvas, 100); };
    window.addEventListener("resize", onResize);

    const colors = COLORS[boltColor];

    const animate = () => {
      const { w, h } = sizeRef.current;
      const frame = ++frameRef.current;
      const arcs  = arcsRef.current;
      const { x: mx, y: my } = mouseRef.current;
      const hasM  = mx >= 0;

      // Origin: center of canvas
      const ox = w / 2, oy = h / 2;

      dischargeTimer.current++;
      const dischargeInterval = Math.round(180 / dischargeFrequency);
      if (dischargeTimer.current >= dischargeInterval) {
        dischargeTimer.current = 0;
        flashRef.current = intensity * 0.35; // screen flash
        arcs.forEach(a => {
          a.targetAlpha  = Math.min(1, intensity * (0.8 + Math.random() * 0.2));
          a.frameCount   = 0; // force immediate redraw
        });
      }

      flashRef.current *= 0.82;

      ctx.fillStyle = "rgba(4, 3, 8, 1)";
      ctx.fillRect(0, 0, w, h);

      const ogrd = ctx.createRadialGradient(ox, oy, 0, ox, oy, 80);
      ogrd.addColorStop(0,   colors[3] + (0.6 * intensity) + ")");
      ogrd.addColorStop(0.3, colors[1] + (0.25 * intensity) + ")");
      ogrd.addColorStop(1,   colors[0] + "0)");
      ctx.fillStyle = ogrd;
      ctx.beginPath();
      ctx.arc(ox, oy, 80, 0, Math.PI * 2);
      ctx.fill();

      const roughness = 0.45;
      const depth     = 7;

      for (const arc of arcs) {
        arc.frameCount++;

        let tx: number, ty: number;
        if (hasM) {
          const mdx    = mx - ox, mdy = my - oy;
          const mDist  = Math.sqrt(mdx * mdx + mdy * mdy);
          const mAngle = Math.atan2(mdy, mdx);
          const angleDiff = Math.atan2(Math.sin(mAngle - arc.angle), Math.cos(mAngle - arc.angle));
          const pull       = Math.max(0, 1 - Math.abs(angleDiff) / (Math.PI * 0.33));
          const blendAngle = arc.angle + angleDiff * pull * 0.55;
          const baseDist   = Math.min(w, h) * 0.5 * arc.distFrac;
          const tDist = baseDist + (mDist - baseDist) * pull * 0.4;
          tx = ox + Math.cos(blendAngle) * tDist;
          ty = oy + Math.sin(blendAngle) * tDist;
        } else {
          const baseDist = Math.min(w, h) * 0.5 * arc.distFrac;
          tx = ox + Math.cos(arc.angle) * baseDist;
          ty = oy + Math.sin(arc.angle) * baseDist;
        }

        arc.targetAlpha = 0.3 + Math.random() * 0.6 * intensity;
        arc.alpha += (arc.targetAlpha - arc.alpha) * 0.08;

        if (arc.frameCount >= arc.redrawEvery || arc.pts.length === 0) {
          arc.frameCount = 0;
          const rawBranches: Array<[Pt, Pt, number]> = [];
          arc.pts = buildBolt(ox, oy, tx, ty, depth, roughness, branchProbability, rawBranches);

          arc.branches = rawBranches.map(([start, end, d]) => {
            const bBranches: Array<[Pt, Pt, number]> = [];
            const bPts = buildBolt(start.x, start.y, end.x, end.y, d, roughness * 1.1, branchProbability * 0.5, bBranches);
            return { pts: bPts, alpha: 0.3 + Math.random() * 0.45 };
          });
        }

        for (const branch of arc.branches) {
          drawBoltChain(ctx, branch.pts, colors, branch.alpha * arc.alpha * intensity, true);
        }

        drawBoltChain(ctx, arc.pts, colors, arc.alpha * intensity, false);

        if (arc.pts.length > 0) {
          const ep   = arc.pts[arc.pts.length - 1];
          const egrd = ctx.createRadialGradient(ep.x, ep.y, 0, ep.x, ep.y, 20);
          egrd.addColorStop(0,   colors[3] + (arc.alpha * intensity * 0.8) + ")");
          egrd.addColorStop(0.5, colors[1] + (arc.alpha * intensity * 0.3) + ")");
          egrd.addColorStop(1,   colors[0] + "0)");
          ctx.fillStyle = egrd;
          ctx.beginPath();
          ctx.arc(ep.x, ep.y, 20, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (hasM) {
        const mgrd = ctx.createRadialGradient(mx, my, 0, mx, my, 60);
        mgrd.addColorStop(0,   colors[2] + (0.25 * intensity) + ")");
        mgrd.addColorStop(0.4, colors[0] + (0.10 * intensity) + ")");
        mgrd.addColorStop(1,   colors[0] + "0)");
        ctx.fillStyle = mgrd;
        ctx.beginPath();
        ctx.arc(mx, my, 60, 0, Math.PI * 2);
        ctx.fill();
      }

      if (flashRef.current > 0.01) {
        ctx.fillStyle = colors[2] + flashRef.current.toFixed(3) + ")";
        ctx.fillRect(0, 0, w, h);
      }

      const vig = ctx.createRadialGradient(w/2, h/2, h * 0.2, w/2, h/2, h * 0.85);
      vig.addColorStop(0, "rgba(4,3,8,0)");
      vig.addColorStop(1, "rgba(4,3,8,0.75)");
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
  }, [boltColor, arcCount, branchProbability, dischargeFrequency, intensity, resizeCanvas]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const now = performance.now();
    if (now - lastMoveRef.current < 16) return;
    lastMoveRef.current = now;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -1, y: -1 };
  }, []);

  const accentCss = {
    plasma:  "#a78bfa",
    toxic:   "#4ade80",
    inferno: "#fb923c",
    void:    "#38bdf8",
  }[boltColor];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-screen overflow-hidden flex flex-col"
      style={{ background: "#04030a" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg,rgba(0,0,0,0.12) 0px,rgba(0,0,0,0.12) 1px,transparent 1px,transparent 4px)",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          mixBlendMode: "overlay",
        }}
      />

      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative z-10 flex items-center justify-between px-8 md:px-14 pt-8"
      >
        <div style={{ fontFamily: "monospace", fontSize: "13px", fontWeight: 700, letterSpacing: "0.15em", color: accentCss }}>
          ARC //
        </div>
        <div className="flex items-center gap-6">
          {["Protocol", "Validators", "Docs"].map(item => (
            <button
              key={item}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "monospace", fontSize: "11px",
                letterSpacing: "0.15em", color: "rgba(255,255,255,0.3)",
                textTransform: "uppercase", padding: 0,
                transition: "color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = accentCss)}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
            >
              {item}
            </button>
          ))}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            style={{
              fontFamily: "monospace", fontSize: "10px",
              letterSpacing: "0.15em", textTransform: "uppercase",
              padding: "8px 18px",
              background: "transparent",
              border: `1px solid ${accentCss}50`,
              color: accentCss, cursor: "pointer",
              transition: "background 0.2s, border-color 0.2s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = `${accentCss}18`;
              (e.currentTarget as HTMLElement).style.borderColor = accentCss;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.borderColor = `${accentCss}50`;
            }}
          >
            Launch App
          </motion.button>
        </div>
      </motion.nav>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6">
        {children || (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.14 } } }}
            className="flex flex-col items-center max-w-4xl"
          >
            <motion.div
              variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
              className="mb-8 flex items-center gap-3"
              style={{ fontFamily: "monospace" }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: accentCss, boxShadow: `0 0 10px ${accentCss}` }} />
              <span style={{ fontSize: "10px", letterSpacing: "0.4em", color: accentCss, opacity: 0.8, textTransform: "uppercase" }}>
                Mainnet Live · Block #19,847,203
              </span>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: accentCss, boxShadow: `0 0 10px ${accentCss}`, animationDelay: "0.5s" }} />
            </motion.div>

            <motion.h1
              variants={{ hidden: { opacity: 0, y: 36 }, visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } } }}
              style={{
                fontFamily: "monospace",
                fontWeight: 900,
                fontSize: "clamp(3rem, 9vw, 8.5rem)",
                lineHeight: 0.9,
                letterSpacing: "-0.04em",
                color: "#ffffff",
                textTransform: "uppercase",
                marginBottom: "1.2rem",
              }}
            >
              POWER THE<br />
              <span style={{
                color: "transparent",
                WebkitTextStroke: `2px ${accentCss}`,
                textShadow: `0 0 80px ${accentCss}60`,
              }}>
                CHAIN.
              </span>
            </motion.h1>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              style={{
                fontFamily: "monospace",
                fontSize: "13px",
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.35)",
                maxWidth: "400px",
                marginBottom: "3rem",
                letterSpacing: "0.04em",
              }}
            >
              Sub-second finality. Zero-knowledge proofs. Permissionless validators. The infrastructure the next financial system runs on.
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              className="flex items-center gap-4 flex-wrap justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: `0 0 40px ${accentCss}60` }}
                whileTap={{ scale: 0.96 }}
                style={{
                  fontFamily: "monospace", fontSize: "11px",
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  padding: "16px 36px",
                  background: accentCss,
                  color: "#04030a",
                  border: "none", cursor: "pointer", fontWeight: 700,
                  boxShadow: `0 0 24px ${accentCss}40`,
                  transition: "box-shadow 0.3s",
                }}
              >
                Run a Node →
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  fontFamily: "monospace", fontSize: "11px",
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  padding: "15px 36px",
                  background: "transparent",
                  color: "rgba(255,255,255,0.45)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  cursor: "pointer",
                  transition: "color 0.25s, border-color 0.25s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color = accentCss;
                  (e.currentTarget as HTMLElement).style.borderColor = `${accentCss}50`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)";
                }}
              >
                Read Whitepaper
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.8 }}
        className="relative z-10 flex items-center justify-between px-8 md:px-14 pb-8"
      >
        <div className="flex items-center gap-8">
          {[
            { val: "0.4s",  label: "Finality" },
            { val: "50k",   label: "TPS" },
            { val: "$0.001",label: "Avg Fee" },
          ].map(({ val, label }, i) => (
            <React.Fragment key={label}>
              {i > 0 && <span className="w-px h-6 bg-white/10" />}
              <div className="flex flex-col gap-0.5">
                <span style={{ fontFamily: "monospace", fontSize: "17px", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em" }}>{val}</span>
                <span style={{ fontFamily: "monospace", fontSize: "9px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.25em", textTransform: "uppercase" }}>{label}</span>
              </div>
            </React.Fragment>
          ))}
        </div>

        <div style={{ fontFamily: "monospace", fontSize: "9px", color: "rgba(255,255,255,0.18)", letterSpacing: "0.2em", textAlign: "right" }}>
          <div>ARC PROTOCOL v3.1</div>
          <div style={{ color: accentCss, opacity: 0.45 }}>
            {arcCount} ARCS · BRANCH {Math.round(branchProbability * 100)}%
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Arc;