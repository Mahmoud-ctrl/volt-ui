"use client";
import React, { useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

export interface WormHoleVortexProps {
  ringColor?:          "phosphor" | "plasma" | "infra" | "ice";
  tunnelSpeed?:        number;
  ringCount?:          number;
  glitchIntensity?:    number;
  aberrationStrength?: number;
  children?:           React.ReactNode;
}

// ─── Color sets: [outerDim, mid, bright, white-hot, r-chan, g-chan, b-chan] ───
const RING_COLORS = {
  phosphor: { core: [80,255,120],  r:[255,80,60],   g:[80,255,120],  b:[60,120,255],  ui:"#50ff78" },
  plasma:   { core: [160,80,255],  r:[255,60,180],  g:[80,200,255],  b:[120,60,255],  ui:"#a050ff" },
  infra:    { core: [255,100,40],  r:[255,40,40],   g:[255,180,40],  b:[40,100,255],  ui:"#ff6428" },
  ice:      { core: [80,200,255],  r:[180,80,255],  g:[80,255,220],  b:[40,160,255],  ui:"#50c8ff" },
} as const;

// ─── Tiny seeded RNG for reproducible per-frame jitter ───────────────────────
function mulberry32(seed: number) {
  let s = seed;
  return () => {
    s |= 0; s = s + 0x6D2B79F5 | 0;
    let t = Math.imul(s ^ s >>> 15, 1 | s);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

export const WormHoleVortex: React.FC<WormHoleVortexProps> = ({
  ringColor          = "phosphor",
  tunnelSpeed        = 1.0,
  ringCount          = 24,
  glitchIntensity    = 0.5,
  aberrationStrength = 8,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  // Off-screen canvas for chromatic aberration compositing
  const offRef       = useRef<HTMLCanvasElement | null>(null);
  const rafRef       = useRef<number | undefined>(undefined);
  const sizeRef      = useRef({ w: 0, h: 0, dpr: 1 });
  const zRef         = useRef(0);               // tunnel Z scroll
  const glitchRef    = useRef({
    active:      false,
    framesLeft:  0,
    tearY:       0,
    tearH:       0,
    rgbShift:    0,
    framesSince: 0,
  });
  const mouseRef     = useRef({ nx: 0.5, ny: 0.5 });
  const smoothVP     = useRef({ x: 0, y: 0 });  // vanishing point offset
  const lastMoveRef  = useRef(0);
  const frameRef     = useRef(0);

  // ─── Resize ────────────────────────────────────────────────────────────
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

    // Rebuild offscreen buffer for aberration pass
    const off = document.createElement("canvas");
    off.width  = w * dpr;
    off.height = h * dpr;
    const offCtx = off.getContext("2d");
    if (offCtx) offCtx.scale(dpr, dpr);
    offRef.current = off;

    sizeRef.current = { w, h, dpr };
  }, []);

  // ─── Main loop ─────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    resizeCanvas();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resizeCanvas, 100); };
    window.addEventListener("resize", onResize);

    const col  = RING_COLORS[ringColor];
    const [cr, cg, cb] = col.core;

    const DEPTH     = 600;   // world-space tunnel depth
    const RING_SEP  = DEPTH / ringCount;
    const FOV       = 420;

    const animate = () => {
      const { w, h } = sizeRef.current;
      const frame = ++frameRef.current;
      const g     = glitchRef.current;
      const off   = offRef.current;

      // Advance Z (tunnel scroll)
      zRef.current = (zRef.current + tunnelSpeed * 1.2) % RING_SEP;

      // Smooth vanishing point toward mouse
      smoothVP.current.x += ((mouseRef.current.nx - 0.5) * 80  - smoothVP.current.x) * 0.05;
      smoothVP.current.y += ((mouseRef.current.ny - 0.5) * 50  - smoothVP.current.y) * 0.05;
      const vpX = w / 2 + smoothVP.current.x;
      const vpY = h / 2 + smoothVP.current.y;

      // ── Glitch scheduler ─────────────────────────────────────────────
      g.framesSince++;
      const glitchInterval = Math.round(90 / (glitchIntensity + 0.01));
      if (!g.active && g.framesSince > glitchInterval && Math.random() < glitchIntensity * 0.4) {
        g.active      = true;
        g.framesLeft  = 2 + Math.floor(Math.random() * 5);
        g.tearY       = Math.random() * h;
        g.tearH       = 2 + Math.random() * 14;
        g.rgbShift    = (Math.random() - 0.5) * aberrationStrength * 2;
        g.framesSince = 0;
      }
      if (g.active) {
        g.framesLeft--;
        if (g.framesLeft <= 0) g.active = false;
      }

      // ── Clear ─────────────────────────────────────────────────────────
      ctx.fillStyle = "rgba(0,0,2,1)";
      ctx.fillRect(0, 0, w, h);

      // ── Draw to off-screen first so we can aberrate it ─────────────────
      const target = off ? off.getContext("2d")! : ctx;
      if (off) {
        target.fillStyle = "rgba(0,0,2,1)";
        target.fillRect(0, 0, w, h);
      }

      // ── Rings — back to front ──────────────────────────────────────────
      // Seeded RNG so jitter is stable per ring index (no flicker randomness)
      const totalRings = ringCount + 2; // extra rings for seamless wrap

      for (let ri = totalRings - 1; ri >= 0; ri--) {
        let z = ri * RING_SEP + zRef.current;
        if (z <= 0) continue;

        const depth01  = 1 - Math.min(1, z / DEPTH); // 0=far, 1=near
        const persp    = FOV / (FOV + z);
        const baseR    = Math.min(w, h) * 0.82;       // ring radius at z=0
        const screenR  = baseR * persp;

        // Skip rings too small to see
        if (screenR < 1.5) continue;

        // ── Per-ring seeded jitter (glitchy imperfect circles) ────────────
        const rng    = mulberry32(ri * 7919 + Math.floor(frame / 3) * (ri % 5));
        const jitter = glitchIntensity * 4;

        // Alpha: near rings brighter, far rings dim
        const alpha = Math.pow(depth01, 1.4) * 0.85 + 0.08;

        // Draw ring as poly-arc with jittered radius per segment ────────────
        // Use 3-pass RGB split for rings near camera
        const doAberration = depth01 > 0.55 && aberrationStrength > 0;
        const abX = doAberration ? aberrationStrength * depth01 * 0.7 : 0;

        const drawRingPass = (
          ctx2: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
          offX: number,
          r: number, g: number, b: number,
          lineW: number,
          passAlpha: number,
        ) => {
          const cx = vpX + offX;
          const cy = vpY;
          const SEGS = 72;

          ctx2.beginPath();
          for (let si = 0; si <= SEGS; si++) {
            const angle = (si / SEGS) * Math.PI * 2;
            const rJit  = screenR + (rng() - 0.5) * jitter * persp;
            const px    = cx + Math.cos(angle) * rJit + offX * 0.3;
            const py    = cy + Math.sin(angle) * rJit;
            si === 0 ? ctx2.moveTo(px, py) : ctx2.lineTo(px, py);
          }
          ctx2.closePath();
          ctx2.strokeStyle = `rgba(${r},${g},${b},${passAlpha.toFixed(3)})`;
          ctx2.lineWidth   = lineW;
          ctx2.stroke();
        };

        if (doAberration) {
          // Red channel — shifted left
          drawRingPass(target, -abX, col.r[0], col.r[1], col.r[2], Math.max(0.4, (1-depth01)*1.5 + 0.4), alpha * 0.75);
          // Blue channel — shifted right
          drawRingPass(target,  abX, col.b[0], col.b[1], col.b[2], Math.max(0.4, (1-depth01)*1.5 + 0.4), alpha * 0.75);
          // Green channel — centered (core)
          drawRingPass(target, 0, col.g[0], col.g[1], col.g[2], Math.max(0.6, (1-depth01)*2 + 0.6), alpha);
        } else {
          // Far rings: single pass, dim
          drawRingPass(target, 0, cr, cg, cb, Math.max(0.5, (1-depth01)*2), alpha * 0.65);
        }

        // Phosphor glow on near rings
        if (depth01 > 0.7) {
          const grd = (off ? target : ctx).createRadialGradient(vpX, vpY, screenR * 0.85, vpX, vpY, screenR * 1.15);
          grd.addColorStop(0,   `rgba(${cr},${cg},${cb},0)`);
          grd.addColorStop(0.5, `rgba(${cr},${cg},${cb},${(alpha * 0.12).toFixed(3)})`);
          grd.addColorStop(1,   `rgba(${cr},${cg},${cb},0)`);
          target.fillStyle = grd;
          target.beginPath();
          target.arc(vpX, vpY, screenR * 1.15, 0, Math.PI * 2);
          target.fill();
        }
      }

      // ── Radial tunnel glow at vanishing point ─────────────────────────
      const tgrd = target.createRadialGradient(vpX, vpY, 0, vpX, vpY, Math.min(w,h) * 0.35);
      tgrd.addColorStop(0,   `rgba(${cr},${cg},${cb},0.28)`);
      tgrd.addColorStop(0.3, `rgba(${cr},${cg},${cb},0.07)`);
      tgrd.addColorStop(1,   `rgba(${cr},${cg},${cb},0)`);
      target.fillStyle = tgrd;
      target.fillRect(0, 0, w, h);

      // ── Composite offscreen → main canvas ─────────────────────────────
      if (off) {
        ctx.drawImage(off, 0, 0, w, h);
      }

      // ── Glitch effects (applied to main canvas after composite) ────────
      if (g.active) {
        // Scanline tear — copy a horizontal strip and offset it
        const tearSrc = Math.max(0, g.tearY - g.tearH);
        try {
          const strip = ctx.getImageData(0, tearSrc, w, g.tearH);
          ctx.putImageData(strip, g.rgbShift * 3, g.tearY);
        } catch (_) {}

        // RGB channel global shift overlay
        const shiftAmt = aberrationStrength * glitchIntensity;
        if (shiftAmt > 1) {
          ctx.globalCompositeOperation = "screen";
          ctx.fillStyle = `rgba(${cr},0,0,0.08)`;
          ctx.fillRect(-shiftAmt, 0, w, h);
          ctx.fillStyle = `rgba(0,0,${cb},0.08)`;
          ctx.fillRect(shiftAmt, 0, w, h);
          ctx.globalCompositeOperation = "source-over";
        }

        // Random horizontal noise lines
        const lineCount = Math.floor(glitchIntensity * 6);
        for (let li = 0; li < lineCount; li++) {
          const ly = Math.random() * h;
          const lh = 0.5 + Math.random() * 2;
          ctx.fillStyle = `rgba(${cr},${cg},${cb},${Math.random() * 0.35})`;
          ctx.fillRect(0, ly, w * (0.3 + Math.random() * 0.7), lh);
        }
      }

      // ── Periodic frame flicker ─────────────────────────────────────────
      if (glitchIntensity > 0.3 && Math.random() < glitchIntensity * 0.015) {
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${Math.random() * 0.06})`;
        ctx.fillRect(0, 0, w, h);
      }

      // ── Scanlines (always on — CRT feel) ──────────────────────────────
      ctx.fillStyle = "rgba(0,0,0,0.18)";
      for (let sy = 0; sy < h; sy += 3) {
        ctx.fillRect(0, sy, w, 1);
      }

      // ── Vignette ──────────────────────────────────────────────────────
      const vig = ctx.createRadialGradient(w/2, h/2, h*0.08, w/2, h/2, h*0.82);
      vig.addColorStop(0, "rgba(0,0,2,0)");
      vig.addColorStop(0.6, "rgba(0,0,2,0.25)");
      vig.addColorStop(1, "rgba(0,0,2,0.88)");
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
  }, [ringColor, tunnelSpeed, ringCount, glitchIntensity, aberrationStrength, resizeCanvas]);

  // ─── Mouse ─────────────────────────────────────────────────────────────
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const now = performance.now();
    if (now - lastMoveRef.current < 16) return;
    lastMoveRef.current = now;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = {
      nx: (e.clientX - rect.left) / rect.width,
      ny: (e.clientY - rect.top)  / rect.height,
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { nx: 0.5, ny: 0.5 };
  }, []);

  const ui = RING_COLORS[ringColor].ui;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-screen overflow-hidden flex flex-col"
      style={{ background: "#00000a" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Extra grain — CRT phosphor texture */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          opacity: 0.055,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          mixBlendMode: "overlay",
        }}
      />

      {/* ── Nav ─────────────────────────────────────────────────────────── */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative z-10 flex items-center justify-between px-10 md:px-16 pt-9"
      >
        <div style={{
          fontFamily: "monospace", fontSize: "11px", fontWeight: 700,
          letterSpacing: "0.3em", color: ui, textTransform: "uppercase",
        }}>
          VRX<span style={{ opacity: 0.35 }}>::</span>AI
        </div>
        <div className="flex items-center gap-6">
          {["Models", "API", "Research"].map(item => (
            <button key={item} style={{
              background:"none", border:"none", cursor:"pointer",
              fontFamily:"monospace", fontSize:"10px",
              letterSpacing:"0.18em", color:"rgba(255,255,255,0.28)",
              textTransform:"uppercase", padding:0,
              transition:"color 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = ui)}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.28)")}
            >{item}</button>
          ))}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              fontFamily:"monospace", fontSize:"10px",
              letterSpacing:"0.18em", textTransform:"uppercase",
              padding:"8px 20px", background:"transparent",
              border:`1px solid ${ui}44`, color:ui, cursor:"pointer",
              transition:"border-color 0.2s, background 0.2s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = ui;
              (e.currentTarget as HTMLElement).style.background  = `${ui}14`;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = `${ui}44`;
              (e.currentTarget as HTMLElement).style.background  = "transparent";
            }}
          >Request Beta</motion.button>
        </div>
      </motion.nav>

      {/* ── Hero content ────────────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6">
        {children || (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden:{opacity:0}, visible:{opacity:1, transition:{staggerChildren:0.14}} }}
            className="flex flex-col items-center max-w-4xl"
          >
            {/* Glitchy version tag */}
            <motion.div
              variants={{ hidden:{opacity:0,y:8}, visible:{opacity:1,y:0} }}
              className="mb-8 px-4 py-1.5 flex items-center gap-3"
              style={{
                border:`1px solid ${ui}28`,
                background:`${ui}0a`,
                backdropFilter:"blur(6px)",
                fontFamily:"monospace",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{background:ui, boxShadow:`0 0 8px ${ui}`}} />
              <span style={{fontSize:"10px", color:ui, letterSpacing:"0.3em", opacity:0.85, textTransform:"uppercase"}}>
                MODEL_VRX-4 · ONLINE
              </span>
              <span style={{fontSize:"10px", color:"rgba(255,255,255,0.25)", letterSpacing:"0.2em"}}>
                Ω
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={{ hidden:{opacity:0,y:40}, visible:{opacity:1,y:0,transition:{duration:1.1,ease:[0.22,1,0.36,1]}} }}
              style={{
                fontFamily:"monospace",
                fontWeight:900,
                fontSize:"clamp(2.6rem,8vw,7.8rem)",
                lineHeight:0.88,
                letterSpacing:"-0.04em",
                color:"#ffffff",
                textTransform:"uppercase",
                marginBottom:"1.1rem",
              }}
            >
              THINK<br />
              BEYOND<br />
              <span style={{
                color: ui,
                textShadow:`0 0 40px ${ui}90, 0 0 80px ${ui}30`,
              }}>
                HUMAN.
              </span>
            </motion.h1>

            <motion.div
              variants={{ hidden:{scaleX:0,opacity:0}, visible:{scaleX:1,opacity:1,transition:{duration:0.6}} }}
              className="my-5 h-px w-12 origin-center"
              style={{ background:`linear-gradient(to right, transparent, ${ui}80, transparent)` }}
            />

            <motion.p
              variants={{ hidden:{opacity:0,y:16}, visible:{opacity:1,y:0} }}
              style={{
                fontFamily:"monospace",
                fontSize:"12px",
                lineHeight:1.95,
                color:"rgba(255,255,255,0.32)",
                maxWidth:"380px",
                marginBottom:"2.8rem",
                letterSpacing:"0.05em",
              }}
            >
              Frontier models trained on structured reasoning chains. Not a wrapper. Not fine-tuned. Built from first principles at scale.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={{ hidden:{opacity:0,y:12}, visible:{opacity:1,y:0} }}
              className="flex items-center gap-4 flex-wrap justify-center"
            >
              <motion.button
                whileHover={{ scale:1.04, boxShadow:`0 0 40px ${ui}55` }}
                whileTap={{ scale:0.96 }}
                style={{
                  fontFamily:"monospace", fontSize:"11px",
                  letterSpacing:"0.2em", textTransform:"uppercase",
                  padding:"15px 38px",
                  background:ui, color:"#00000a",
                  border:"none", cursor:"pointer", fontWeight:700,
                  boxShadow:`0 0 24px ${ui}40`,
                  transition:"box-shadow 0.3s",
                }}
              >
                Access API →
              </motion.button>

              <motion.button
                whileHover={{ scale:1.04 }}
                whileTap={{ scale:0.96 }}
                style={{
                  fontFamily:"monospace", fontSize:"11px",
                  letterSpacing:"0.2em", textTransform:"uppercase",
                  padding:"14px 38px",
                  background:"transparent",
                  color:"rgba(255,255,255,0.38)",
                  border:"1px solid rgba(255,255,255,0.1)",
                  cursor:"pointer",
                  transition:"color 0.2s, border-color 0.2s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color = ui;
                  (e.currentTarget as HTMLElement).style.borderColor = `${ui}44`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.38)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                }}
              >
                Read Research
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* ── Bottom strip ────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.8 }}
        className="relative z-10 flex items-end justify-between px-10 md:px-16 pb-9"
      >
        <div className="flex items-center gap-8">
          {[
            { val:"1.8T",  label:"Parameters"  },
            { val:"128k",  label:"Context"     },
            { val:"#1",    label:"MMLU / MATH"  },
          ].map(({ val, label }, i) => (
            <React.Fragment key={label}>
              {i > 0 && <span className="w-px h-5 bg-white/10" />}
              <div className="flex flex-col gap-0.5">
                <span style={{fontFamily:"monospace",fontSize:"16px",fontWeight:900,color:"#fff",letterSpacing:"-0.03em"}}>{val}</span>
                <span style={{fontFamily:"monospace",fontSize:"9px",color:"rgba(255,255,255,0.22)",letterSpacing:"0.25em",textTransform:"uppercase"}}>{label}</span>
              </div>
            </React.Fragment>
          ))}
        </div>
        <div style={{fontFamily:"monospace",fontSize:"9px",color:"rgba(255,255,255,0.16)",letterSpacing:"0.18em",textAlign:"right"}}>
          <div>VORTEX ENGINE</div>
          <div style={{color:ui,opacity:0.4}}>
            {ringCount} RINGS · GLITCH {Math.round(glitchIntensity*100)}%
          </div>
        </div>
      </motion.div>
    </div>
  );
};