"use client";
import React, { useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

export interface AcidBathProps {
  palette?: "toxic" | "molten" | "void" | "blood";
  viscosity?: number;
  noiseScale?: number;
  heatRadius?: number;
  speed?: number;
  children?: React.ReactNode;
}

const PALETTES = {
  toxic:  [[0,0,0],[10,20,5],[20,60,10],[60,140,20],[140,230,30],[220,255,80],[255,255,180],[255,255,255]],
  molten: [[0,0,0],[20,5,0],[60,15,0],[140,40,0],[220,90,10],[255,160,30],[255,220,120],[255,255,200]],
  void:   [[0,0,0],[5,0,20],[15,0,60],[40,0,140],[80,20,220],[140,80,255],[200,160,255],[240,220,255]],
  blood:  [[0,0,0],[20,0,0],[60,5,5],[140,10,10],[220,30,20],[255,80,40],[255,160,100],[255,220,180]],
} as const;

const PERM = new Uint8Array(512);
const GRAD = [[1,1],[-1,1],[1,-1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1]];
(function buildPerm() {
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) PERM[i] = p[i & 255];
})();

function fade(t: number) { return t * t * t * (t * (t * 6 - 15) + 10); }
function lerp(a: number, b: number, t: number) { return a + t * (b - a); }

function noise2(x: number, y: number): number {
  const X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
  const xf = x - Math.floor(x), yf = y - Math.floor(y);
  const u = fade(xf), v = fade(yf);
  const aa = PERM[PERM[X]     + Y], ab = PERM[PERM[X]     + Y + 1];
  const ba = PERM[PERM[X + 1] + Y], bb = PERM[PERM[X + 1] + Y + 1];
  const dot = (h: number, px: number, py: number) => {
    const g = GRAD[h & 7]; return g[0] * px + g[1] * py;
  };
  return lerp(
    lerp(dot(aa, xf, yf),     dot(ba, xf - 1, yf),     u),
    lerp(dot(ab, xf, yf - 1), dot(bb, xf - 1, yf - 1), u),
    v
  );
}

function fbm(x: number, y: number, octaves: number): number {
  let val = 0, amp = 0.5, freq = 1, max = 0;
  for (let i = 0; i < octaves; i++) {
    val += noise2(x * freq, y * freq) * amp;
    max += amp; amp *= 0.5; freq *= 2.1;
  }
  return val / max;
}

function samplePalette(pal: readonly (readonly number[])[], t: number): [number, number, number] {
  const clamped = Math.max(0, Math.min(0.9999, t));
  const idx = clamped * (pal.length - 1);
  const lo  = Math.floor(idx), hi = lo + 1;
  const f   = idx - lo;
  const a   = pal[lo], b = pal[Math.min(hi, pal.length - 1)];
  return [
    Math.round(a[0] + (b[0] - a[0]) * f),
    Math.round(a[1] + (b[1] - a[1]) * f),
    Math.round(a[2] + (b[2] - a[2]) * f),
  ];
}

export const AcidBath: React.FC<AcidBathProps> = ({
  palette     = "toxic",
  viscosity   = 0.6,
  noiseScale  = 2.2,
  heatRadius  = 180,
  speed       = 0.4,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const rafRef       = useRef<number | undefined>(undefined);
  const mouseRef     = useRef({ x: -9999, y: -9999, active: false });
  const sizeRef      = useRef({ w: 0, h: 0, dpr: 1 });
  const timeRef      = useRef(0);
  const lastMoveRef  = useRef(0);

  const fieldA = useRef<Float32Array>(new Float32Array(0));
  const fieldB = useRef<Float32Array>(new Float32Array(0));
  const resRef = useRef({ cols: 0, rows: 0, cellW: 0, cellH: 0 });

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

    const CELL = 6; // px per cell
    const cols = Math.ceil(w / CELL) + 2;
    const rows = Math.ceil(h / CELL) + 2;
    fieldA.current = new Float32Array(cols * rows);
    fieldB.current = new Float32Array(cols * rows);
    for (let i = 0; i < cols * rows; i++) {
      const cx = (i % cols) / cols, cy = Math.floor(i / cols) / rows;
      fieldA.current[i] = Math.max(0, fbm(cx * 3 + 10, cy * 3 + 10, 4) * 0.5 + 0.25);
    }
    resRef.current = { cols, rows, cellW: CELL, cellH: CELL };
    sizeRef.current = { w, h, dpr };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    resizeCanvas();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resizeCanvas, 120); };
    window.addEventListener("resize", onResize);

    const pal = PALETTES[palette];

    const animate = () => {
      const { w, h } = sizeRef.current;
      const { cols, rows, cellW, cellH } = resRef.current;
      const A = fieldA.current;
      const B = fieldB.current;
      const t = (timeRef.current += speed * 0.008);
      const { x: mx, y: my, active } = mouseRef.current;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const wx = (col / cols) * noiseScale;
          const wy = (row / rows) * noiseScale;

          const vx = fbm(wx + t * 0.3,       wy + 1.7,          3) * 2;
          const vy = fbm(wx + 5.2 + t * 0.2, wy + 1.3 + t * 0.1, 3) * 2;

          const srcCol = col - vx * (1 - viscosity) * 0.8;
          const srcRow = row - vy * (1 - viscosity) * 0.8;

          const sc  = Math.max(0, Math.min(cols - 1.001, srcCol));
          const sr  = Math.max(0, Math.min(rows - 1.001, srcRow));
          const c0  = Math.floor(sc), c1 = c0 + 1;
          const r0  = Math.floor(sr), r1 = r0 + 1;
          const cf  = sc - c0, rf = sr - r0;
          const idx = (r: number, c: number) => Math.min(r, rows-1) * cols + Math.min(c, cols-1);
          const sampled =
            A[idx(r0,c0)] * (1-cf) * (1-rf) +
            A[idx(r0,c1)] *    cf  * (1-rf) +
            A[idx(r1,c0)] * (1-cf) *    rf  +
            A[idx(r1,c1)] *    cf  *    rf;

          const inject = Math.max(0, fbm(wx * 1.5 + t * 0.15, wy * 1.5 + t * 0.18, 3)) * 0.018;

          let heat = 0;
          if (active && mx > 0) {
            const px = col * cellW, py = row * cellH;
            const dSq = (px - mx) ** 2 + (py - my) ** 2;
            if (dSq < heatRadius * heatRadius) {
              heat = (1 - Math.sqrt(dSq) / heatRadius) * 0.35;
            }
          }

          B[row * cols + col] = Math.min(1, sampled * 0.986 + inject + heat);
        }
      }

      fieldA.current.set(B);

      const imgData = ctx.createImageData(w, h);
      const px      = imgData.data;

      for (let py = 0; py < h; py++) {
        const row = Math.min(rows - 1, Math.floor(py / cellH));
        for (let pxx = 0; pxx < w; pxx++) {
          const col = Math.min(cols - 1, Math.floor(pxx / cellW));
          const val = A[row * cols + col];
          const grain = (Math.random() - 0.5) * 0.06;
          const [r, g, b] = samplePalette(pal, Math.max(0, Math.min(1, val + grain)));
          const i = (py * w + pxx) * 4;
          px[i]     = r;
          px[i + 1] = g;
          px[i + 2] = b;
          px[i + 3] = 255;
        }
      }
      ctx.putImageData(imgData, 0, 0);

      const vgrd = ctx.createRadialGradient(w/2, h/2, h*0.1, w/2, h/2, h*0.9);
      vgrd.addColorStop(0,   "rgba(0,0,0,0)");
      vgrd.addColorStop(0.6, "rgba(0,0,0,0.3)");
      vgrd.addColorStop(1,   "rgba(0,0,0,0.82)");
      ctx.fillStyle = vgrd;
      ctx.fillRect(0, 0, w, h);

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [palette, viscosity, noiseScale, heatRadius, speed, resizeCanvas]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const now = performance.now();
    if (now - lastMoveRef.current < 16) return;
    lastMoveRef.current = now;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -9999, y: -9999, active: false };
  }, []);

  const accentColor = {
    toxic:  "#9aff1a",
    molten: "#ff9a1a",
    void:   "#a855f7",
    blood:  "#ff3a1a",
  }[palette];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center bg-black"
    >
      <canvas ref={canvasRef} className="absolute inset-0" style={{ mixBlendMode: "normal" }} />
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg,rgba(0,0,0,0.18) 0px,rgba(0,0,0,0.18) 1px,transparent 1px,transparent 3px)",
          mixBlendMode: "multiply",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          opacity: 0.06,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          mixBlendMode: "overlay",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 py-24 flex flex-col justify-between min-h-screen">

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between"
        >
          <div style={{ fontFamily: "monospace", fontSize: "11px", color: accentColor, letterSpacing: "0.3em" }}>
            CORROSIVE.SYS
          </div>
          <div className="flex items-center gap-6" style={{ fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em" }}>
            {["DOCS", "PRICING", "CHANGELOG", "LOGIN"].map(label => (
              <button
                key={label}
                className="hover:text-white transition-colors duration-150"
                style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: "inherit", letterSpacing: "inherit", color: "inherit" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = accentColor}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.3)"}
              >
                {label}
              </button>
            ))}
          </div>
        </motion.div>

        {children || (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
            className="flex flex-col gap-0"
          >
            <motion.div
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              className="mb-4 flex items-center gap-3"
            >
              <span
                className="px-2 py-0.5 text-[9px] font-bold tracking-[0.4em] uppercase"
                style={{
                  background: accentColor,
                  color: "#000",
                  fontFamily: "monospace",
                }}
              >
                v3.0.0-rc.1
              </span>
              <span style={{ fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em" }}>
                NOW IN PUBLIC BETA
              </span>
            </motion.div>
            <motion.div
              variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
            >
              <h1
                style={{
                  fontFamily: "monospace",
                  fontWeight: 900,
                  fontSize: "clamp(3.5rem, 9vw, 8.5rem)",
                  lineHeight: 0.88,
                  letterSpacing: "-0.04em",
                  color: "#ffffff",
                  textTransform: "uppercase",
                }}
              >
                SHIP<br />
                <span style={{ color: accentColor, WebkitTextStroke: "0px", textShadow: `0 0 60px ${accentColor}88` }}>
                  FASTER.
                </span><br />
                <span style={{ color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.25)" }}>
                  BREAK LESS.
                </span>
              </h1>
            </motion.div>
            <motion.div
              variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.6, ease: "easeOut" } } }}
              className="my-8 h-px origin-left"
              style={{ background: `linear-gradient(to right, ${accentColor}60, transparent)` }}
            />
            <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16"
            >
              <p
                className="max-w-xs text-sm leading-relaxed"
                style={{ fontFamily: "monospace", color: "rgba(255,255,255,0.45)", letterSpacing: "0.02em" }}
              >
                Infrastructure that gets out of the way. Deploy, observe, iterate — no YAML hell, no lock-in, no bullsh*t.
              </p>

              <div className="flex flex-col gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative px-8 py-4 text-sm font-bold tracking-widest uppercase overflow-hidden"
                  style={{
                    fontFamily: "monospace",
                    background: accentColor,
                    color: "#000",
                    border: "none",
                    cursor: "pointer",
                    letterSpacing: "0.18em",
                  }}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    $ GET STARTED FREE
                    <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                  <span
                    className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"
                    style={{ background: "linear-gradient(90deg,transparent,rgba(0,0,0,0.15),transparent)" }}
                  />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 text-xs tracking-widest uppercase text-left"
                  style={{
                    fontFamily: "monospace",
                    background: "transparent",
                    color: "rgba(255,255,255,0.4)",
                    border: `1px solid rgba(255,255,255,0.12)`,
                    cursor: "pointer",
                    letterSpacing: "0.18em",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = accentColor + "60";
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)";
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)";
                  }}
                >
                  READ THE DOCS →
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex items-end justify-between"
        >
          <div className="flex items-center gap-8">
            {[
              { val: "23ms", label: "p99 latency" },
              { val: "99.99%", label: "uptime SLA" },
              { val: "SOC 2", label: "type II" },
            ].map(({ val, label }, i) => (
              <React.Fragment key={label}>
                {i > 0 && <span className="w-px h-6 bg-white/10" />}
                <div className="flex flex-col gap-0.5">
                  <span style={{ fontFamily: "monospace", fontSize: "18px", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em" }}>{val}</span>
                  <span style={{ fontFamily: "monospace", fontSize: "9px", color: "rgba(255,255,255,0.28)", letterSpacing: "0.25em", textTransform: "uppercase" }}>{label}</span>
                </div>
              </React.Fragment>
            ))}
          </div>

          <div style={{ fontFamily: "monospace", fontSize: "9px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.2em", textAlign: "right" }}>
            <div>FLUID SIM ACTIVE</div>
            <div style={{ color: accentColor, opacity: 0.5 }}>VISCOSITY {(viscosity * 100).toFixed(0)}% · SCALE {noiseScale}×</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};