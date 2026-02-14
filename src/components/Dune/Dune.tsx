"use client";
import React, { useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

export interface DuneProps {
  palette?: "sahara" | "mars" | "arctic" | "obsidian";
  duneCount?: number;
  windStrength?: number;
  particleDensity?: number;
  parallaxDepth?: number;
  children?: React.ReactNode;
}

const PALETTES = {
  sahara:   ["#2d1f0e", "#6b3d1e", "#c4822a", "#d4944a", "#e8b060", "#f0c878", "#f5d490"],
  mars:     ["#1a0a08", "#4a1a10", "#8b3520", "#b04530", "#c85540", "#d06848", "#e08858"],
  arctic:   ["#0a1520", "#1a3045", "#3a6080", "#5a8aaa", "#8ab0c8", "#b0cce0", "#d0e8f0"],
  obsidian: ["#080808", "#1a1a1a", "#2a2520", "#3a3028", "#504538", "#6a5c48", "#887060"],
} as const;

const ACCENTS = {
  sahara:   "#f5d490",
  mars:     "#e08858",
  arctic:   "#d0e8f0",
  obsidian: "#887060",
};

function smoothNoise(x: number, seed: number): number {
  const n = Math.sin(x * 127.1 + seed * 311.7) * 43758.5453;
  return n - Math.floor(n);
}

function smoothedNoise(x: number, seed: number): number {
  const ix = Math.floor(x);
  const fx = x - ix;
  const ux = fx * fx * (3 - 2 * fx); // smoothstep
  return smoothNoise(ix, seed) * (1 - ux) + smoothNoise(ix + 1, seed) * ux;
}

function fbm1D(x: number, seed: number, octaves: number): number {
  let v = 0, a = 0.5, f = 1, mx = 0;
  for (let i = 0; i < octaves; i++) {
    v += smoothedNoise(x * f, seed + i * 17) * a;
    mx += a; a *= 0.5; f *= 2.1;
  }
  return v / mx;
}

interface Grain {
  x: number; y: number;
  vx: number; vy: number;
  size: number;
  alpha: number;
  layer: number; // 0=far, 1=mid, 2=near drives size/speed/alpha
  phase: number; // sinuous drift phase
}

function makeGrains(count: number, w: number, h: number, layers: number): Grain[] {
  return Array.from({ length: count }, () => {
    const layer = Math.floor(Math.random() * layers);
    const speed = 0.4 + layer * 0.6 + Math.random() * 0.5;
    return {
      x:     Math.random() * w,
      y:     h * (0.2 + layer * 0.22) + (Math.random() - 0.5) * h * 0.18,
      vx:    speed,
      vy:    (Math.random() - 0.5) * 0.15,
      size:  0.5 + layer * 0.6 + Math.random() * 0.8,
      alpha: 0.25 + layer * 0.2 + Math.random() * 0.25,
      layer,
      phase: Math.random() * Math.PI * 2,
    };
  });
}

interface DuneLayer {
  seed:      number;
  baseY:     number;   // 0–1 fraction of height
  amplitude: number;   // height variation in px
  speed:     number;   // horizontal scroll speed
  offset:    number;   // current scroll offset
  colorIdx:  number;   // which palette color to use
  parallax:  number;   // parallax factor (far=slow, near=fast)
}

export const Dune: React.FC<DuneProps> = ({
  palette        = "sahara",
  duneCount      = 5,
  windStrength   = 1.0,
  particleDensity = 1.0,
  parallaxDepth  = 1.0,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const rafRef       = useRef<number | undefined>(undefined);
  const sizeRef      = useRef({ w: 0, h: 0 });
  const mouseRef     = useRef({ nx: 0, ny: 0.5 }); // normalised
  const smoothWind   = useRef({ nx: 0, ny: 0.5 });
  const lastMoveRef  = useRef(0);
  const timeRef      = useRef(0);

  const dunesRef = useRef<DuneLayer[]>([]);
  const grainsRef = useRef<Grain[]>([]);

  const buildScene = useCallback((w: number, h: number) => {
    const count = Math.max(3, duneCount);
    // Dunes: far (index 0) to near (index count-1)
    dunesRef.current = Array.from({ length: count }, (_, i) => {
      const t        = i / (count - 1);          // 0=far, 1=near
      const baseY    = 0.38 + t * 0.42;          // horizon → bottom
      const amp      = 30 + t * h * 0.12;        // bigger ripples up close
      const spd      = (0.08 + t * 0.28) * windStrength;
      const colorIdx = 2 + Math.round(t * 3);    // palette index 2–5
      return {
        seed:      Math.random() * 1000,
        baseY:     baseY * h,
        amplitude: amp,
        speed:     spd,
        offset:    Math.random() * 1000,
        colorIdx,
        parallax:  (0.2 + t * 0.8) * parallaxDepth,
      };
    });

    const gCount = Math.round(120 * particleDensity);
    grainsRef.current = makeGrains(gCount, w, h, 3);
  }, [duneCount, windStrength, particleDensity, parallaxDepth]);

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
    buildScene(w, h);
  }, [buildScene]);

  function drawDune(
    ctx: CanvasRenderingContext2D,
    dune: DuneLayer,
    w: number, h: number,
    pal: readonly string[],
    mouseNX: number,
  ) {
    const pts: number[] = [];
    const steps = 60;
    const mShift = (mouseNX - 0.5) * 40 * dune.parallax;

    for (let i = 0; i <= steps; i++) {
      const xFrac = i / steps;
      const xWorld = xFrac * w * 1.2 - w * 0.1 + mShift;
      const noiseX = (xWorld + dune.offset) * 0.003;
      const ny     = fbm1D(noiseX, dune.seed, 4);
      pts.push(
        xFrac * w,
        dune.baseY - ny * dune.amplitude,
      );
    }

    // Draw filled shape from ridge down to bottom of canvas
    ctx.beginPath();
    ctx.moveTo(pts[0], pts[1]);

    for (let i = 0; i < pts.length - 2; i += 2) {
      const x0 = i === 0 ? pts[0] : pts[i - 2];
      const y0 = i === 0 ? pts[1] : pts[i - 1];
      const x1 = pts[i],     y1 = pts[i + 1];
      const x2 = pts[i + 2], y2 = pts[i + 3];
      const x3 = i + 4 < pts.length ? pts[i + 4] : x2;
      const y3 = i + 5 < pts.length ? pts[i + 5] : y2;
      const cpx1 = x1 + (x2 - x0) / 6;
      const cpy1 = y1 + (y2 - y0) / 6;
      const cpx2 = x2 - (x3 - x1) / 6;
      const cpy2 = y2 - (y3 - y1) / 6;
      ctx.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, x2, y2);
    }

    ctx.lineTo(w, h + 2);
    ctx.lineTo(0, h + 2);
    ctx.closePath();

    const topY   = dune.baseY - dune.amplitude;
    const fillGrd = ctx.createLinearGradient(0, topY - 20, 0, dune.baseY + dune.amplitude * 0.5);
    const c1 = pal[dune.colorIdx] ?? pal[pal.length - 1];
    fillGrd.addColorStop(0,   lighten(c1, 0.15));
    fillGrd.addColorStop(0.3, c1);
    fillGrd.addColorStop(1,   darken(c1, 0.3));
    ctx.fillStyle = fillGrd;
    ctx.fill();

    // Crest rim highlight line
    ctx.beginPath();
    ctx.moveTo(pts[0], pts[1]);
    for (let i = 0; i < pts.length - 2; i += 2) {
      const x0 = i === 0 ? pts[0] : pts[i - 2];
      const y0 = i === 0 ? pts[1] : pts[i - 1];
      const x1 = pts[i],     y1 = pts[i + 1];
      const x2 = pts[i + 2], y2 = pts[i + 3];
      const x3 = i + 4 < pts.length ? pts[i + 4] : x2;
      const y3 = i + 5 < pts.length ? pts[i + 5] : y2;
      ctx.bezierCurveTo(
        x1 + (x2 - x0) / 6, y1 + (y2 - y0) / 6,
        x2 - (x3 - x1) / 6, y2 - (y3 - y1) / 6,
        x2, y2
      );
    }
    ctx.strokeStyle = lighten(c1, 0.35) + "88";
    ctx.lineWidth   = 1.5;
    ctx.stroke();
  }

  function hexToRgb(hex: string): [number, number, number] {
    const n = parseInt(hex.replace("#", ""), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function rgbToHex(r: number, g: number, b: number): string {
    return "#" + [r, g, b].map(v => Math.min(255, Math.max(0, Math.round(v))).toString(16).padStart(2, "0")).join("");
  }
  function lighten(hex: string, amt: number): string {
    const [r, g, b] = hexToRgb(hex);
    return rgbToHex(r + (255 - r) * amt, g + (255 - g) * amt, b + (255 - b) * amt);
  }
  function darken(hex: string, amt: number): string {
    const [r, g, b] = hexToRgb(hex);
    return rgbToHex(r * (1 - amt), g * (1 - amt), b * (1 - amt));
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    resizeCanvas();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resizeCanvas, 100); };
    window.addEventListener("resize", onResize);

    const pal = PALETTES[palette] as unknown as string[];

    const animate = () => {
      const { w, h } = sizeRef.current;
      timeRef.current += 0.016;

      smoothWind.current.nx += (mouseRef.current.nx - smoothWind.current.nx) * 0.025;
      smoothWind.current.ny += (mouseRef.current.ny - smoothWind.current.ny) * 0.025;
      const wNX = smoothWind.current.nx; // 0–1
      const windBias = (wNX - 0.5) * windStrength;

      const skyGrd = ctx.createLinearGradient(0, 0, 0, h * 0.65);
      skyGrd.addColorStop(0,   pal[0]);
      skyGrd.addColorStop(0.7, pal[1]);
      skyGrd.addColorStop(1,   pal[2]);
      ctx.fillStyle = skyGrd;
      ctx.fillRect(0, 0, w, h);

      const horizonY = h * 0.42;
      const hazeGrd  = ctx.createLinearGradient(0, horizonY - 20, 0, horizonY + 30);
      hazeGrd.addColorStop(0,   pal[2] + "00");
      hazeGrd.addColorStop(0.5, pal[3] + "55");
      hazeGrd.addColorStop(1,   pal[2] + "00");
      ctx.fillStyle = hazeGrd;
      ctx.fillRect(0, horizonY - 20, w, 50);

      for (const dune of dunesRef.current) {
        dune.offset += (dune.speed + windBias * dune.parallax * 0.4);
        drawDune(ctx, dune, w, h, pal, wNX);
      }

      const grains = grainsRef.current;
      for (const g of grains) {
        const windX  = (0.8 + windBias * 1.2) * windStrength * (0.6 + g.layer * 0.5);
        const draft  = -(smoothWind.current.ny - 0.5) * 0.3 * g.layer;
        g.phase += 0.04 + g.layer * 0.02;
        g.x   += windX + Math.sin(g.phase * 0.7) * 0.3;
        g.y   += g.vy + draft + Math.sin(g.phase) * 0.15;

        if (g.x > w + 10)  g.x = -10;
        if (g.x < -10)     g.x = w + 10;
        const baseY = h * (0.25 + g.layer * 0.22);
        if (g.y > baseY + h * 0.18 || g.y < baseY - h * 0.18) {
          g.y = baseY + (Math.random() - 0.5) * h * 0.12;
        }

        const angle = Math.atan2(g.vy, windX);
        const alpha = g.alpha * (0.5 + 0.5 * Math.abs(Math.sin(g.phase * 0.3)));
        const gCol  = pal[Math.min(3 + g.layer, pal.length - 1)];

        ctx.save();
        ctx.translate(g.x, g.y);
        ctx.rotate(angle);
        ctx.globalAlpha = alpha;
        ctx.fillStyle   = lighten(gCol, 0.3);
        ctx.beginPath();
        ctx.ellipse(0, 0, g.size * 2.5, g.size * 0.7, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        ctx.globalAlpha = 1;
      }

      const sunX = w * 0.78, sunY = h * 0.14;
      const sunGrd = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, h * 0.32);
      sunGrd.addColorStop(0,   lighten(pal[6] ?? pal[pal.length - 1], 0.6) + "cc");
      sunGrd.addColorStop(0.15, lighten(pal[5] ?? pal[pal.length - 1], 0.3) + "44");
      sunGrd.addColorStop(0.5, pal[1] + "22");
      sunGrd.addColorStop(1,   pal[0] + "00");
      ctx.fillStyle = sunGrd;
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = darken(pal[5] ?? pal[pal.length - 1], 0.15);
      ctx.fillRect(0, h * 0.92, w, h * 0.1);

      const vig = ctx.createRadialGradient(w/2, h/2, h * 0.15, w/2, h/2, h * 0.9);
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.52)");
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
  }, [palette, duneCount, windStrength, particleDensity, parallaxDepth, resizeCanvas]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const now = performance.now();
    if (now - lastMoveRef.current < 20) return;
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

  const accent = ACCENTS[palette];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-screen overflow-hidden flex flex-col"
      style={{ background: PALETTES[palette][0] }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Fine dust grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          opacity: 0.07,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.92' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          mixBlendMode: "overlay",
        }}
      />

      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative z-10 flex items-center justify-between px-10 md:px-16 pt-10"
      >
        <div style={{
          fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif",
          fontSize: "16px",
          fontWeight: 400,
          letterSpacing: "0.25em",
          color: accent,
          textTransform: "uppercase",
        }}>
          Silt
        </div>
        <div className="flex items-center gap-8">
          {["Work", "Studio", "Contact"].map(item => (
            <button
              key={item}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "Georgia, serif",
                fontSize: "11px", letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)",
                transition: "color 0.4s", padding: 0,
              }}
              onMouseEnter={e => (e.currentTarget.style.color = accent)}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
            >
              {item}
            </button>
          ))}
        </div>
      </motion.nav>

      <div className="relative z-10 flex-1 flex flex-col justify-center px-10 md:px-16">
        {children || (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }}
            className="max-w-2xl"
          >
            {/* Eyebrow */}
            <motion.div
              variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0 } }}
              className="flex items-center gap-4 mb-10"
            >
              <div className="w-10 h-px" style={{ background: accent, opacity: 0.7 }} />
              <span style={{
                fontFamily: "Georgia, serif",
                fontSize: "10px",
                letterSpacing: "0.45em",
                color: accent,
                opacity: 0.8,
                textTransform: "uppercase",
              }}>
                Creative Studio · Est. 2019
              </span>
            </motion.div>

            <motion.h1
              variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } } }}
              style={{
                fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif",
                fontWeight: 400,
                fontStyle: "italic",
                fontSize: "clamp(3.2rem, 7.5vw, 7.5rem)",
                lineHeight: 1.0,
                letterSpacing: "-0.01em",
                color: "#ffffff",
                marginBottom: "0.2em",
              }}
            >
              Shape what
            </motion.h1>
            <motion.h1
              variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.08 } } }}
              style={{
                fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif",
                fontWeight: 700,
                fontStyle: "normal",
                fontSize: "clamp(3.2rem, 7.5vw, 7.5rem)",
                lineHeight: 1.0,
                letterSpacing: "0.06em",
                color: "transparent",
                WebkitTextStroke: `1.5px ${accent}`,
                textTransform: "uppercase",
                marginBottom: "0.2em",
              }}
            >
              endures.
            </motion.h1>

            {/* Rule */}
            <motion.div
              variants={{ hidden: { scaleX: 0, opacity: 0 }, visible: { scaleX: 1, opacity: 1, transition: { duration: 0.8 } } }}
              className="origin-left my-8 h-px w-24"
              style={{ background: `linear-gradient(to right, ${accent}80, transparent)` }}
            />

            {/* Body */}
            <motion.p
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              style={{
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
                fontSize: "15px",
                lineHeight: 1.9,
                color: "rgba(255,255,255,0.45)",
                maxWidth: "340px",
                marginBottom: "3rem",
              }}
            >
              We build brands that outlast the moment. Strategy, identity, and experience — crafted with the patience of the desert.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              className="flex items-center gap-6"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "11px",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  padding: "15px 38px",
                  background: accent,
                  color: "#1a0e06",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 700,
                  transition: "opacity 0.3s",
                  clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                See Our Work
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "11px",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  padding: "14px 38px",
                  background: "transparent",
                  color: "rgba(255,255,255,0.45)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  cursor: "pointer",
                  transition: "color 0.35s, border-color 0.35s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color = accent;
                  (e.currentTarget as HTMLElement).style.borderColor = `${accent}60`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.18)";
                }}
              >
                Start a Project →
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="relative z-10 flex items-end justify-between px-10 md:px-16 pb-10"
      >
        <div className="flex items-center gap-8">
          {[["12", "Years"], ["80+", "Brands"], ["4", "Continents"]].map(([val, label]) => (
            <div key={label} className="flex flex-col gap-0.5">
              <span style={{ fontFamily: "Georgia, serif", fontSize: "22px", fontWeight: 700, color: accent, letterSpacing: "-0.02em" }}>{val}</span>
              <span style={{ fontFamily: "Georgia, serif", fontSize: "9px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.3em", textTransform: "uppercase" }}>{label}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-2">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: "1px", height: "36px", background: `linear-gradient(to bottom, ${accent}60, transparent)` }}
          />
          <span style={{ fontFamily: "Georgia, serif", fontSize: "9px", color: "rgba(255,255,255,0.22)", letterSpacing: "0.3em", textTransform: "uppercase" }}>Scroll</span>
        </div>
      </motion.div>
    </div>
  );
};