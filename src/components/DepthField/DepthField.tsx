"use client";
import React, { useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

export interface DepthFieldProps {
  gridColor?: string;
  gridDensity?: number;
  driftSpeed?: number;
  fov?: number;
  tiltStrength?: number;
  children?: React.ReactNode;
}

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function project(
  x3: number, y3: number, z3: number,
  fov: number, cx: number, cy: number
): [number, number, number] {
  const perspective = fov / (fov + z3);
  return [cx + x3 * perspective, cy + y3 * perspective, perspective];
}

export const DepthField: React.FC<DepthFieldProps> = ({
  gridColor   = "#00ffe0",
  gridDensity = 12,
  driftSpeed  = 0.4,
  fov         = 400,
  tiltStrength = 0.35,
  children,
}) => {
  const containerRef  = useRef<HTMLDivElement>(null);
  const canvasRef     = useRef<HTMLCanvasElement>(null);
  const rafRef        = useRef<number | undefined>(undefined);
  const mouseRef      = useRef({ nx: 0, ny: 0 }); // normalised −1…1
  const tiltRef       = useRef({ x: 0, y: 0 });   // smoothed tilt
  const sizeRef       = useRef({ w: 0, h: 0, dpr: 1 });
  const zOffsetRef    = useRef(0);                 // drives forward drift
  const lastMoveRef   = useRef(0);

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
    sizeRef.current = { w, h, dpr };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    resizeCanvas();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resizeCanvas, 100); };
    window.addEventListener("resize", onResize);

    const [r, g, b] = hexToRgb(gridColor);

    const DEPTH     = 600;
    const NEAR_CLIP = 10;

    const animate = () => {
      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);

      // Smooth tilt toward mouse
      const { nx, ny } = mouseRef.current;
      tiltRef.current.x += (ny * tiltStrength * 60 - tiltRef.current.x) * 0.06;
      tiltRef.current.y += (nx * tiltStrength * 60 - tiltRef.current.y) * 0.06;

      zOffsetRef.current = (zOffsetRef.current + driftSpeed) % (DEPTH / gridDensity);

      const cx = w / 2;
      const cy = h / 2;
      const tX = tiltRef.current.x; // world-space Y shift (tilt around X axis)
      const tY = tiltRef.current.y; // world-space X shift (tilt around Y axis)

      const halfW = w * 1.8;
      const halfH = h * 1.8;

      const stepZ = DEPTH / gridDensity;

      ctx.lineCap = "round";

      for (let zi = 0; zi <= gridDensity; zi++) {
        let z = zi * stepZ + zOffsetRef.current;
        if (z < NEAR_CLIP) z += DEPTH;

        const depth01  = 1 - z / DEPTH;
        const alpha    = Math.pow(depth01, 2.2) * 0.9;
        const lineW    = depth01 * 1.6;
        if (alpha < 0.01) continue;

        ctx.strokeStyle = `rgba(${r},${g},${b},${alpha.toFixed(3)})`;
        ctx.lineWidth   = lineW;

        const rows = gridDensity + 1;
        for (let ri = 0; ri <= rows; ri++) {
          const wy = -halfH + (ri / rows) * halfH * 2;
          const [x0, y0] = project(-halfW + tY * z * 0.003, wy + tX * z * 0.003, z, fov, cx, cy);
          const [x1, y1] = project( halfW + tY * z * 0.003, wy + tX * z * 0.003, z, fov, cx, cy);

          if (x1 < 0 && x0 < 0) continue;
          if (x0 > w && x1 > w) continue;

          ctx.beginPath();
          ctx.moveTo(x0, y0);
          ctx.lineTo(x1, y1);
          ctx.stroke();
        }

        const cols = gridDensity + 1;
        for (let ci = 0; ci <= cols; ci++) {
          const wx = -halfW + (ci / cols) * halfW * 2;
          const [x0, y0] = project(wx + tY * z * 0.003, -halfH + tX * z * 0.003, z, fov, cx, cy);
          const [x1, y1] = project(wx + tY * z * 0.003,  halfH + tX * z * 0.003, z, fov, cx, cy);

          if (y1 < 0 && y0 < 0) continue;
          if (y0 > h && y1 > h) continue;

          ctx.beginPath();
          ctx.moveTo(x0, y0);
          ctx.lineTo(x1, y1);
          ctx.stroke();
        }
      }

      const vpX = cx + tY * 4;
      const vpY = cy + tX * 4;
      const grd = ctx.createRadialGradient(vpX, vpY, 0, vpX, vpY, w * 0.35);
      grd.addColorStop(0,   `rgba(${r},${g},${b},0.18)`);
      grd.addColorStop(0.4, `rgba(${r},${g},${b},0.04)`);
      grd.addColorStop(1,   `rgba(${r},${g},${b},0)`);
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [gridColor, gridDensity, driftSpeed, fov, tiltStrength, resizeCanvas]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const now = performance.now();
    if (now - lastMoveRef.current < 16) return;
    lastMoveRef.current = now;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = {
      nx: (e.clientX - rect.left) / rect.width  * 2 - 1,
      ny: (e.clientY - rect.top)  / rect.height * 2 - 1,
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { nx: 0, ny: 0 };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center"
      style={{ background: "linear-gradient(160deg, #020d0b 0%, #000000 50%, #060210 100%)" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 20%, rgba(0,0,0,0.5) 65%, rgba(0,0,0,0.92) 100%)",
        }}
      />

      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black to-transparent pointer-events-none z-[2]" />
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent pointer-events-none z-[2]" />

      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          opacity: 0.035,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          mixBlendMode: "overlay",
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 md:px-16 flex flex-col items-start">
        {children || (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.14 } } }}
          >
            <motion.div
              variants={{ hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0 } }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-8 h-px" style={{ background: gridColor }} />
              <span
                className="text-[10px] uppercase tracking-[0.5em] font-medium"
                style={{ color: gridColor, fontFamily: "monospace", opacity: 0.8 }}
              >
                Creative Studio — Est. 2026
              </span>
            </motion.div>

            <motion.h1
              variants={{ hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } } }}
              className="text-left leading-[0.9] tracking-tight mb-8"
              style={{
                fontFamily: "'Georgia', 'Times New Roman', serif",
                fontStyle: "italic",
                fontSize: "clamp(4rem, 10vw, 9rem)",
                color: "#ffffff",
              }}
            >
              We make
              <br />
              <span
                style={{
                  fontStyle: "normal",
                  fontFamily: "'Georgia', serif",
                  fontWeight: 900,
                  color: "transparent",
                  WebkitTextStroke: `1.5px ${gridColor}`,
                  letterSpacing: "-0.03em",
                }}
              >
                the impossible
              </span>
              <br />
              <span style={{ color: "#ffffff", fontWeight: 300 }}>feel inevitable.</span>
            </motion.h1>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="flex flex-col sm:flex-row items-start sm:items-end gap-10"
            >
              <p
                className="text-sm md:text-base leading-relaxed max-w-xs"
                style={{ color: "rgba(255,255,255,0.38)", fontFamily: "monospace" }}
              >
                Brand identities, digital experiences, and motion work for companies that refuse to be ordinary.
              </p>

              <div className="flex flex-col gap-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative px-9 py-4 text-sm font-semibold tracking-wide overflow-hidden"
                  style={{
                    background: gridColor,
                    color: "#000",
                    clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
                    fontFamily: "monospace",
                    letterSpacing: "0.1em",
                  }}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    START A PROJECT
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                  <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-600"
                    style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)" }} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="group px-9 py-4 text-sm tracking-widest text-left"
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontFamily: "monospace",
                    letterSpacing: "0.15em",
                    borderBottom: "1px solid rgba(255,255,255,0.12)",
                    transition: "color 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.color = gridColor;
                    (e.currentTarget as HTMLButtonElement).style.borderColor = gridColor;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.5)";
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.12)";
                  }}
                >
                  VIEW OUR WORK →
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 0.6 } } }}
              className="mt-20 flex items-center gap-10"
            >
              {[
                { n: "140+", label: "Projects shipped" },
                { n: "98%", label: "Client retention" },
                { n: "12",  label: "Awards won" },
              ].map(({ n, label }, i) => (
                <React.Fragment key={label}>
                  {i > 0 && <span className="w-px h-8" style={{ background: "rgba(255,255,255,0.08)" }} />}
                  <div className="flex flex-col gap-0.5">
                    <span className="text-2xl font-black text-white" style={{ fontFamily: "monospace", letterSpacing: "-0.03em" }}>{n}</span>
                    <span className="text-[10px] uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }}>{label}</span>
                  </div>
                </React.Fragment>
              ))}
            </motion.div>
          </motion.div>
        )}
      </div>

      <div
        className="absolute bottom-8 right-8 z-10 text-right pointer-events-none"
        style={{ fontFamily: "monospace", fontSize: "9px", color: "rgba(255,255,255,0.18)", letterSpacing: "0.2em" }}
      >
        <div>CAM / PERSPECTIVE</div>
        <div style={{ color: gridColor, opacity: 0.5 }}>FOV {fov}mm · {gridDensity}×{gridDensity}</div>
      </div>
    </div>
  );
};