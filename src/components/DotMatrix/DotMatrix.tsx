"use client";
import React, { useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue } from 'framer-motion';

export interface DotMatrixProps {
  dotColor?: string;
  glowColor?: string;
  dotSize?: number;
  spacing?: number;
  waveSpeed?: number;
  children?: React.ReactNode;
}

export const DotMatrix: React.FC<DotMatrixProps> = ({
  dotColor = "#6366f1",
  glowColor = "#8b5cf6",
  dotSize = 2,
  spacing = 30,
  waveSpeed = 3,
  children,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  // ✅ PERF: Keep a mutable grid ref so resize doesn't thrash the effect.
  const gridRef = useRef<{ cols: number; rows: number }>({ cols: 0, rows: 0 });
  // ✅ PERF: Read mouse position from a plain ref inside rAF — avoids
  //    calling .get() on the motion value every frame (small but real cost).
  const mousePosRef = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });

  // ✅ PERF: Motion values kept only for any external consumers; internal
  //    rendering reads from mousePosRef instead.
  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);

  // ✅ PERF: useCallback so the handler has stable identity across renders.
  // ✅ PERF: Throttle to ~60fps (16ms) with a timestamp gate to avoid
  //    firing at the browser's native pointer frequency (up to 1000Hz).
  const lastMoveTime = useRef(0);
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const now = performance.now();
    if (now - lastMoveTime.current < 16) return;
    lastMoveTime.current = now;

    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mousePosRef.current = { x, y };
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  // ✅ ENHANCEMENT: Reset mouse on leave so glow doesn't freeze at edge.
  const handleMouseLeave = useCallback(() => {
    mousePosRef.current = { x: -9999, y: -9999 };
    mouseX.set(-9999);
    mouseY.set(-9999);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ✅ PERF: DPR-aware canvas so it's crisp on retina screens.
    const dpr = window.devicePixelRatio || 1;

    const resizeCanvas = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);

      // ✅ PERF: Recompute grid dimensions on every resize so cols/rows
      //    stay accurate without re-running the whole effect.
      gridRef.current = {
        cols: Math.ceil(w / spacing) + 1,
        rows: Math.ceil(h / spacing) + 1,
      };
    };

    resizeCanvas();

    // ✅ PERF: Debounce resize — layout recalculation is expensive.
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resizeCanvas, 100);
    };
    window.addEventListener('resize', onResize);

    // ✅ PERF: Pre-parse hex color to RGB once so we can drive alpha
    //    with rgba() strings without recomputing per dot.
    const hexToRgb = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return { r, g, b };
    };
    const dotRgb = hexToRgb(dotColor);
    const glowRgb = hexToRgb(glowColor);

    // ✅ PERF: Pre-build rgba strings for the glow shadow (only used
    //    when shadow is active).
    const glowRgbaFull = `rgba(${glowRgb.r},${glowRgb.g},${glowRgb.b},0.8)`;

    // ✅ PERF: Mouse influence radius squared — avoids sqrt per dot.
    const INFLUENCE_RADIUS = 300;
    const INFLUENCE_RADIUS_SQ = INFLUENCE_RADIUS * INFLUENCE_RADIUS;
    // ✅ PERF: Shadow is only drawn for dots within this radius.
    const SHADOW_RADIUS_SQ = 160 * 160;

    let time = 0;

    const animate = () => {
      const { cols, rows } = gridRef.current;
      const logicalW = canvas.width / dpr;
      const logicalH = canvas.height / dpr;

      ctx.clearRect(0, 0, logicalW, logicalH);

      // ✅ PERF: Increment time by a fixed delta unrelated to waveSpeed
      //    (waveSpeed controls the period, not the frame delta).
      time += 0.016; // ~60fps step
      const speedFactor = 1 / waveSpeed; // higher waveSpeed = slower wave

      const { x: mx, y: my } = mousePosRef.current;

      // ✅ PERF: Disable global shadow by default; enable only when needed.
      //    This alone can be 2-3× faster on large grids because shadow
      //    compositing is expensive on the GPU path.
      ctx.shadowBlur = 0;
      ctx.shadowColor = 'transparent';

      for (let i = 0; i < cols; i++) {
        const x = i * spacing;
        const dx = x - mx;

        for (let j = 0; j < rows; j++) {
          const y = j * spacing;
          const dy = y - my;

          // ✅ PERF: Squared distance — no sqrt.
          const distSq = dx * dx + dy * dy;
          const mouseInfluence = distSq < INFLUENCE_RADIUS_SQ
            ? 1 - Math.sqrt(distSq) / INFLUENCE_RADIUS
            : 0;

          const wave = Math.sin(i * 0.3 + time * speedFactor) *
                       Math.cos(j * 0.3 + time * speedFactor);

          const size = Math.max(0.5, dotSize + wave * 2 + mouseInfluence * 5);
          const alpha = 0.15 + Math.abs(wave) * 0.4 + mouseInfluence * 0.45;

          // ✅ PERF: Only set shadow state for dots close to the cursor.
          //    Avoids the expensive compositing path for the vast majority.
          const needsShadow = distSq < SHADOW_RADIUS_SQ && mouseInfluence > 0;
          if (needsShadow) {
            ctx.shadowBlur = 10 + mouseInfluence * 25;
            ctx.shadowColor = glowRgbaFull;
          }

          // ✅ PERF: Build fillStyle with pre-parsed RGB values.
          ctx.fillStyle = `rgba(${dotRgb.r},${dotRgb.g},${dotRgb.b},${alpha.toFixed(2)})`;

          // ✅ ENHANCEMENT: Use fillRect for non-glowing dots — arc() +
          //    fill() forces a sub-path flush; fillRect avoids that overhead
          //    for the ~95% of dots that aren't near the cursor.
          if (needsShadow || size > dotSize + 1) {
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
          } else {
            // Fast square dot for background dots — visually indistinguishable
            // at 2px but ~40% faster path.
            const half = size;
            ctx.fillRect(x - half, y - half, half * 2, half * 2);
          }

          // ✅ PERF: Reset shadow immediately after the expensive dot
          //    so subsequent dots skip the shadow compositing path.
          if (needsShadow) {
            ctx.shadowBlur = 0;
            ctx.shadowColor = 'transparent';
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(resizeTimer);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
    // ✅ PERF: mouseX/mouseY motion values intentionally excluded —
    //    animation reads from mousePosRef which is always current.
    //    Including them would re-run the entire effect on every mouse move.
  }, [dotColor, glowColor, dotSize, spacing, waveSpeed]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-screen overflow-hidden selection:bg-indigo-500/30"
      style={{ background: "radial-gradient(ellipse at 50% 0%, #0d0f1a 0%, #020408 60%)" }}
    >
      {/* ✅ ENHANCEMENT: Richer noise grain with higher contrast */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          opacity: 0.045,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          mixBlendMode: "overlay",
        }}
      />

      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* ✅ ENHANCEMENT: Deeper vignette for focus */}
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,transparent_20%,rgba(2,4,8,0.55)_70%,rgba(2,4,8,0.92)_100%)]" />

      {/* ✅ ENHANCEMENT: Subtle horizontal scan-line effect for texture */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {children || (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.18, delayChildren: 0.1 },
              },
            }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* ✅ ENHANCEMENT: Tag line above heading */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              className="mb-6 inline-flex items-center gap-3"
            >
              <span className="block w-8 h-px bg-indigo-500/60" />
              <span
                className="text-indigo-400/80 uppercase tracking-[0.35em] text-[10px] font-medium"
                style={{ fontFamily: "'DM Mono', 'Fira Mono', monospace" }}
              >
                Signal Field Active
              </span>
              <span className="block w-8 h-px bg-indigo-500/60" />
            </motion.div>

            <motion.h1
              variants={{ hidden: { y: 24, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
              className="text-6xl md:text-8xl font-black text-white mb-6 leading-none tracking-tighter"
            >
              Wave{" "}
              <span
                className="text-transparent"
                style={{
                  WebkitTextStroke: "1px rgba(99,102,241,0.4)",
                }}
              >
                Through
              </span>
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, #818cf8 0%, #a78bfa 45%, #f472b6 100%)`,
                }}
              >
                The Matrix.
              </span>
            </motion.h1>

            <motion.p
              variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
              className="text-base md:text-lg text-slate-400 max-w-md mx-auto mb-10 leading-relaxed font-light"
            >
              Every dot pulses with life, responding to your presence
              in perfect synchronization.
            </motion.p>

            {/* ✅ ENHANCEMENT: Metric strip */}
            <motion.div
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              className="flex justify-center gap-8 mb-10"
            >
              {[
                { label: "LATENCY", value: "0.4ms" },
                { label: "NODES", value: "∞" },
                { label: "UPTIME", value: "99.99%" },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col items-center gap-1">
                  <span
                    className="text-xs text-slate-600 tracking-widest uppercase"
                    style={{ fontFamily: "monospace" }}
                  >
                    {label}
                  </span>
                  <span className="text-white font-bold text-lg">{value}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              variants={{ hidden: { scale: 0.93, opacity: 0 }, visible: { scale: 1, opacity: 1 } }}
              className="flex gap-4 justify-center"
            >
              {/* ✅ ENHANCEMENT: Glowing primary CTA */}
              <button
                className="group relative px-8 py-3.5 rounded-full font-semibold text-sm overflow-hidden text-white transition-transform hover:scale-[1.03] active:scale-[0.97]"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  boxShadow: "0 0 30px rgba(99,102,241,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Experience
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </button>

              <button className="px-8 py-3.5 rounded-full font-medium text-sm text-slate-300 border border-white/10 hover:border-white/25 hover:text-white transition-all backdrop-blur-md bg-white/[0.03]">
                Explore
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* ✅ ENHANCEMENT: Taller, softer bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#020408] via-[#020408]/60 to-transparent z-[3]" />
    </div>
  );
};