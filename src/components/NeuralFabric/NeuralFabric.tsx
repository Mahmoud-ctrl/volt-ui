"use client";
import React, { useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

export interface NeuralFabricProps {
  color?: string;
  gridSize?: number;
  repelStrength?: number;
  repelRadius?: number;
  opacity?: number;
  children?: React.ReactNode;
}

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export const NeuralFabric: React.FC<NeuralFabricProps> = ({
  color = "#6366f1",
  gridSize = 20,
  repelStrength = 0.5,
  repelRadius = 300,
  opacity = 0.4,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | undefined>(undefined);

  const mouseRef = useRef({ x: -9999, y: -9999 });
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });

  const nodesRef = useRef<Float32Array>(new Float32Array(0));
  const NODE_STRIDE = 6;

  const edgesRef = useRef<Uint16Array>(new Uint16Array(0));

  // ─── Build grid ─────────────────────────────────────────────────────────────
  const buildGrid = useCallback((w: number, h: number) => {
    const count = (gridSize + 1) * (gridSize + 1);
    const nodes = new Float32Array(count * NODE_STRIDE);

    for (let i = 0; i <= gridSize; i++) {
      for (let j = 0; j <= gridSize; j++) {
        const idx = (i * (gridSize + 1) + j) * NODE_STRIDE;
        const ox = (i / gridSize) * w;
        const oy = (j / gridSize) * h;
        nodes[idx]     = ox; // originX
        nodes[idx + 1] = oy; // originY
        nodes[idx + 2] = ox; // currentX
        nodes[idx + 3] = oy; // currentY
        nodes[idx + 4] = 0;  // velX
        nodes[idx + 5] = 0;  // velY
      }
    }
    nodesRef.current = nodes;

    const edgeList: number[] = [];
    for (let i = 0; i <= gridSize; i++) {
      for (let j = 0; j <= gridSize; j++) {
        const a = i * (gridSize + 1) + j;
        if (i < gridSize) edgeList.push(a, a + (gridSize + 1)); // down
        if (j < gridSize) edgeList.push(a, a + 1);              // right
        if (i < gridSize && j < gridSize) edgeList.push(a, a + (gridSize + 1) + 1);
        if (i < gridSize && j > 0)        edgeList.push(a, a + (gridSize + 1) - 1);
      }
    }
    edgesRef.current = new Uint16Array(edgeList);
  }, [gridSize]);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = window.devicePixelRatio || 1;
    const w = container.clientWidth;
    const h = container.clientHeight;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);

    sizeRef.current = { w, h, dpr };
    buildGrid(w, h);
  }, [buildGrid]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    resizeCanvas();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resizeCanvas, 100);
    };
    window.addEventListener("resize", onResize);

    const [r, g, b] = hexToRgb(color);
    const STIFFNESS  = 150;
    const DAMPING    = 20;
    const DT         = 1 / 60;
    const repelRadiusSq = repelRadius * repelRadius;

    const MAX_EDGE_DIST_SQ = repelRadius * repelRadius * 0.25;

    const animate = () => {
      const { w, h } = sizeRef.current;
      const nodes = nodesRef.current;
      const edges = edgesRef.current;
      const { x: mx, y: my } = mouseRef.current;

      ctx.clearRect(0, 0, w, h);
      const nodeCount = nodes.length / NODE_STRIDE;
      for (let n = 0; n < nodeCount; n++) {
        const base = n * NODE_STRIDE;
        const ox = nodes[base];
        const oy = nodes[base + 1];
        let cx = nodes[base + 2];
        let cy = nodes[base + 3];
        let vx = nodes[base + 4];
        let vy = nodes[base + 5];

        // Target: origin + repulsion offset
        let tx = ox;
        let ty = oy;

        const dxM = cx - mx;
        const dyM = cy - my;
        const distSqM = dxM * dxM + dyM * dyM;

        if (distSqM < repelRadiusSq && distSqM > 0.001) {
          const distM = Math.sqrt(distSqM);
          const force = ((repelRadius - distM) / repelRadius) * repelStrength;
          tx += (dxM / distM) * force * repelRadius;
          ty += (dyM / distM) * force * repelRadius;
        }

        const ax = (tx - cx) * STIFFNESS - vx * DAMPING;
        const ay = (ty - cy) * STIFFNESS - vy * DAMPING;
        vx += ax * DT;
        vy += ay * DT;
        cx += vx * DT;
        cy += vy * DT;

        nodes[base + 2] = cx;
        nodes[base + 3] = cy;
        nodes[base + 4] = vx;
        nodes[base + 5] = vy;
      }

      ctx.lineWidth = 0.5;

      for (let e = 0; e < edges.length; e += 2) {
        const aBase = edges[e]     * NODE_STRIDE;
        const bBase = edges[e + 1] * NODE_STRIDE;

        const ax = nodes[aBase + 2];
        const ay = nodes[aBase + 3];
        const bx = nodes[bBase + 2];
        const by = nodes[bBase + 3];

        const dispA = (ax - nodes[aBase])     ** 2 + (ay - nodes[aBase + 1]) ** 2;
        const dispB = (bx - nodes[bBase])     ** 2 + (by - nodes[bBase + 1]) ** 2;
        const disp  = Math.min(1, (dispA + dispB) / MAX_EDGE_DIST_SQ);

        const edgeAlpha = (0.06 + disp * 0.35) * opacity;

        ctx.beginPath();
        ctx.strokeStyle = `rgba(${r},${g},${b},${edgeAlpha.toFixed(3)})`;
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.fillStyle = `rgba(${r},${g},${b},${(opacity * 0.5).toFixed(3)})`;

      for (let n = 0; n < nodeCount; n++) {
        const base = n * NODE_STRIDE;
        const cx = nodes[base + 2];
        const cy = nodes[base + 3];
        const ox = nodes[base];
        const oy = nodes[base + 1];
        const disp = Math.sqrt((cx - ox) ** 2 + (cy - oy) ** 2);

        if (disp < 2) {
          ctx.moveTo(cx + 1.5, cy);
          ctx.arc(cx, cy, 1.5, 0, Math.PI * 2);
        }
      }
      ctx.fill();

      for (let n = 0; n < nodeCount; n++) {
        const base = n * NODE_STRIDE;
        const cx = nodes[base + 2];
        const cy = nodes[base + 3];
        const ox = nodes[base];
        const oy = nodes[base + 1];
        const disp = Math.sqrt((cx - ox) ** 2 + (cy - oy) ** 2);

        if (disp >= 2) {
          const t = Math.min(1, disp / (repelRadius * repelStrength));
          const glowAlpha = (opacity * 0.5 + t * 0.5) * opacity;
          const radius = 1.5 + t * 2;

          ctx.shadowBlur = 6 + t * 14;
          ctx.shadowColor = `rgba(${r},${g},${b},0.8)`;
          ctx.fillStyle   = `rgba(${r},${g},${b},${glowAlpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.shadowColor = "transparent";
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [color, gridSize, repelStrength, repelRadius, opacity, resizeCanvas]);

  const lastMoveTime = useRef(0);
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const now = performance.now();
    if (now - lastMoveTime.current < 16) return;
    lastMoveTime.current = now;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -9999, y: -9999 };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[500px] overflow-hidden flex items-center justify-center"
      style={{
        background: "radial-gradient(ellipse at 50% 40%, #0a0a14 0%, #000000 100%)",
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,transparent_30%,rgba(0,0,0,0.65)_100%)]" />

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-[500px] px-6">
        {children || (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
            }}
            className="text-center"
          >
            {/* Node count indicator */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
              className="mb-5 flex items-center justify-center gap-3"
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: color, boxShadow: `0 0 6px ${color}` }}
              />
              <span
                className="text-[10px] tracking-[0.4em] uppercase font-medium"
                style={{ color, fontFamily: "monospace", opacity: 0.7 }}
              >
                {(gridSize + 1) ** 2} nodes active
              </span>
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: color, boxShadow: `0 0 6px ${color}`, animationDelay: "0.5s" }}
              />
            </motion.div>

            <motion.h1
              variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
              className="text-white text-6xl md:text-7xl font-thin tracking-tighter leading-none mb-3 pointer-events-none"
            >
              NEURAL{" "}
              <span
                className="font-black italic"
                style={{
                  color,
                  textShadow: `0 0 40px ${color}66`,
                }}
              >
                FABRIC
              </span>
            </motion.h1>

            <motion.div
              variants={{ hidden: { scaleX: 0, opacity: 0 }, visible: { scaleX: 1, opacity: 1 } }}
              className="mx-auto my-4 h-px w-32 pointer-events-none"
              style={{ background: `linear-gradient(to right, transparent, ${color}60, transparent)` }}
            />

            <motion.p
              variants={{ hidden: { y: 10, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
              className="text-zinc-400 text-base md:text-lg max-w-md mx-auto mb-2 leading-relaxed font-light pointer-events-none"
            >
              A self-organizing mesh that bends to your intent.
              Infrastructure that thinks at the speed of interaction.
            </motion.p>

            <motion.p
              variants={{ hidden: { y: 10, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
              className="text-zinc-600 font-mono uppercase tracking-[0.45em] text-xs mb-10 pointer-events-none"
            >
              Adaptive Infrastructure 1.0
            </motion.p>

            <motion.div
              variants={{ hidden: { y: 16, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="group relative px-8 py-3.5 rounded-full font-semibold text-sm text-white overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${color}, #8b5cf6)`,
                  boxShadow: `0 0 32px ${color}55, inset 0 1px 0 rgba(255,255,255,0.15)`,
                }}
              >
                <span
                  className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
                  }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  Connect to Network
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </motion.button>

              {/* Secondary CTA */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="group px-8 py-3.5 rounded-full font-medium text-sm text-zinc-300 hover:text-white transition-colors relative"
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(12px)",
                }}
              >
                {/* Border glow on hover */}
                <span
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ boxShadow: `inset 0 0 0 1px ${color}50` }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                  </svg>
                  See How It Works
                </span>
              </motion.button>
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 0.3 } } }}
              className="mt-10 flex items-center justify-center gap-6 pointer-events-none"
            >
              {[
                { value: "0.4ms", label: "avg latency" },
                { value: "99.99%", label: "uptime" },
                { value: "∞", label: "scale" },
              ].map(({ value, label }, i) => (
                <React.Fragment key={label}>
                  {i > 0 && (
                    <span className="w-px h-6" style={{ background: "rgba(255,255,255,0.08)" }} />
                  )}
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="text-white font-bold text-base" style={{ textShadow: `0 0 20px ${color}44` }}>
                      {value}
                    </span>
                    <span className="text-zinc-600 text-[10px] uppercase tracking-widest font-mono">
                      {label}
                    </span>
                  </div>
                </React.Fragment>
              ))}
            </motion.div>

            <motion.p
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 0.5 } } }}
              className="mt-8 text-zinc-700 text-xs font-mono tracking-widest pointer-events-none"
            >
              ↑ move cursor to disturb the field
            </motion.p>
          </motion.div>
        )}
      </div>
    </div>
  );
};