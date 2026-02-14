"use client";
import React, { useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

export interface MonsoonProps {
  colorScheme?: "nightcity" | "bloodmoon" | "arctic" | "toxic";
  intensity?: number;
  windAngle?: number;
  streakPersistence?: number;
  rippleCount?: number;
  children?: React.ReactNode;
}

const SCHEMES = {
  nightcity: {
    bg:      ["#04060f", "#080d1a", "#0d1525"],
    cityGlow: ["rgba(40,80,180,", "rgba(80,40,140,", "rgba(180,100,40,"],
    drop:    "rgba(140,180,255,",
    ripple:  "rgba(100,150,220,",
    streak:  "rgba(80,120,200,",
    accent:  "#4a9eff",
    ui:      "#a0c4ff",
  },
  bloodmoon: {
    bg:      ["#0f0404", "#1a0808", "#250d0d"],
    cityGlow: ["rgba(180,40,40,", "rgba(140,20,60,", "rgba(80,10,20,"],
    drop:    "rgba(255,160,140,",
    ripple:  "rgba(220,80,80,",
    streak:  "rgba(180,60,60,",
    accent:  "#ff4a4a",
    ui:      "#ffa0a0",
  },
  arctic: {
    bg:      ["#04080f", "#08121a", "#0d1e28"],
    cityGlow: ["rgba(40,160,200,", "rgba(20,120,180,", "rgba(10,60,120,"],
    drop:    "rgba(180,230,255,",
    ripple:  "rgba(120,200,240,",
    streak:  "rgba(80,160,220,",
    accent:  "#00d4ff",
    ui:      "#80e8ff",
  },
  toxic: {
    bg:      ["#040f04", "#081a08", "#0d250d"],
    cityGlow: ["rgba(40,180,40,", "rgba(20,140,60,", "rgba(80,180,20,"],
    drop:    "rgba(160,255,160,",
    ripple:  "rgba(80,220,80,",
    streak:  "rgba(60,180,60,",
    accent:  "#00ff88",
    ui:      "#80ffb0",
  },
} as const;

interface Drop {
  x: number; y: number;
  len: number;          // streak length in px
  speed: number;
  layer: number;        // 0=far,1=mid,2=near
  alpha: number;
  landed: boolean;
}

interface Ripple {
  x: number; y: number;
  r: number;            // current radius
  maxR: number;
  alpha: number;
  speed: number;
}
interface Streak {
  x: number; y: number;
  vy: number;
  len: number;
  alpha: number;
  wobble: number;
  wobblePhase: number;
}

function makeDrop(w: number, windVx: number, layer: number): Drop {
  const speeds = [12, 7, 4];       // far=fast apparent, near=slow (closer to camera)
  const lens   = [18, 30, 50];
  const alphas = [0.25, 0.45, 0.7];
  return {
    x:       Math.random() * (w + 200) - 100,
    y:       -Math.random() * 200,
    len:     lens[layer]   + Math.random() * lens[layer] * 0.5,
    speed:   speeds[layer] + Math.random() * 3,
    layer,
    alpha:   alphas[layer] + Math.random() * 0.15,
    landed:  false,
  };
}

export const Monsoon: React.FC<MonsoonProps> = ({
  colorScheme      = "nightcity",
  intensity        = 1.0,
  windAngle        = 15,
  streakPersistence = 0.6,
  rippleCount      = 1.0,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  // Second canvas for glass streaks
  const glassRef     = useRef<HTMLCanvasElement>(null);
  const rafRef       = useRef<number | undefined>(undefined);
  const sizeRef      = useRef({ w: 0, h: 0 });
  const mouseRef     = useRef({ nx: 0.5 });   // 0–1, controls wind lean
  const smoothWind   = useRef(0.5);
  const lastMoveRef  = useRef(0);

  const dropsRef   = useRef<Drop[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);
  const streaksRef = useRef<Streak[]>([]);

  const initDrops = useCallback((w: number, count: number) => {
    const drops: Drop[] = [];
    const perLayer = [
      Math.round(count * 0.5),   // far — most numerous
      Math.round(count * 0.33),  // mid
      Math.round(count * 0.17),  // near — fewest
    ];
    for (let layer = 0; layer < 3; layer++) {
      for (let i = 0; i < perLayer[layer]; i++) {
        const d = makeDrop(w, 0, layer);
        d.y = Math.random() * 800 - 800; // stagger vertical start
        drops.push(d);
      }
    }
    dropsRef.current = drops;
  }, []);

  const resizeCanvas = useCallback(() => {
    const container = containerRef.current;
    const canvas    = canvasRef.current;
    const glass     = glassRef.current;
    if (!container || !canvas || !glass) return;

    const dpr = window.devicePixelRatio || 1;
    const w   = container.clientWidth;
    const h   = container.clientHeight;

    for (const c of [canvas, glass]) {
      c.width        = w * dpr;
      c.height       = h * dpr;
      c.style.width  = `${w}px`;
      c.style.height = `${h}px`;
      const ctx = c.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
    }

    sizeRef.current = { w, h };
    const count = Math.round(180 * intensity);
    initDrops(w, count);
    ripplesRef.current = [];
    streaksRef.current = [];
  }, [intensity, initDrops]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const glass  = glassRef.current;
    if (!canvas || !glass) return;
    const ctx  = canvas.getContext("2d");
    const gCtx = glass.getContext("2d");
    if (!ctx || !gCtx) return;

    resizeCanvas();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resizeCanvas, 100); };
    window.addEventListener("resize", onResize);

    const s = SCHEMES[colorScheme];

    const animate = () => {
      const { w, h } = sizeRef.current;

      // Smooth wind from mouse
      smoothWind.current += (mouseRef.current.nx - smoothWind.current) * 0.04;
      const windLean = windAngle + (smoothWind.current - 0.5) * 30; // degrees
      const windRad  = (windLean * Math.PI) / 180;
      const windVx   = Math.sin(windRad);
      const windVy   = Math.cos(windRad);

      const bgGrd = ctx.createLinearGradient(0, 0, 0, h);
      bgGrd.addColorStop(0,   s.bg[0]);
      bgGrd.addColorStop(0.5, s.bg[1]);
      bgGrd.addColorStop(1,   s.bg[2]);
      ctx.fillStyle = bgGrd;
      ctx.fillRect(0, 0, w, h);

      const horizonY = h * 0.72;
      // Three overlapping colored light sources
      const glowPositions = [0.2, 0.5, 0.8];
      glowPositions.forEach((xFrac, i) => {
        const gx  = w * xFrac;
        const grd = ctx.createRadialGradient(gx, horizonY, 0, gx, horizonY, w * 0.35);
        const col = s.cityGlow[i % s.cityGlow.length];
        grd.addColorStop(0,   col + "0.22)");
        grd.addColorStop(0.5, col + "0.07)");
        grd.addColorStop(1,   col + "0)");
        ctx.fillStyle = grd;
        ctx.fillRect(0, horizonY - w * 0.35, w, w * 0.7);
      });

      const drops = dropsRef.current;
      const layerWidths  = [0.6, 1.0, 1.6];   // line width per layer
      const layerBlur    = [0, 0, 0];          // no shadow for perf; use alpha instead

      ctx.lineCap = "round";

      for (const d of drops) {
        // Move
        d.x += windVx * d.speed * (0.4 + d.layer * 0.3);
        d.y += windVy * d.speed;

        // Spawn ripple + streak on landing
        if (d.y > h + d.len && !d.landed) {
          d.landed = true;

          if (Math.random() < rippleCount * 0.7) {
            ripplesRef.current.push({
              x: d.x, y: h - 2,
              r: 1, maxR: 18 + Math.random() * 22,
              alpha: 0.6 + d.layer * 0.15,
              speed: 0.8 + Math.random() * 0.6,
            });
          }

          // Glass streak spawns mainly for near/mid drops
          if (d.layer >= 1 && Math.random() < streakPersistence * 0.55) {
            streaksRef.current.push({
              x: d.x + (Math.random() - 0.5) * 4,
              y: Math.random() * h * 0.85,
              vy: 0.3 + Math.random() * 0.5,
              len: 20 + Math.random() * 60,
              alpha: 0.35 + Math.random() * 0.3,
              wobble: 0.6 + Math.random() * 1.2,
              wobblePhase: Math.random() * Math.PI * 2,
            });
          }

          // Respawn
          Object.assign(d, makeDrop(w, windVx, d.layer));
        }

        // Draw streak — elongated line along velocity
        const tx = -windVx * d.len;
        const ty = -windVy * d.len;
        const grd = ctx.createLinearGradient(d.x, d.y, d.x + tx, d.y + ty);
        grd.addColorStop(0,   s.drop + d.alpha + ")");
        grd.addColorStop(1,   s.drop + "0)");
        ctx.strokeStyle = grd;
        ctx.lineWidth   = layerWidths[d.layer];
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x + tx, d.y + ty);
        ctx.stroke();
      }

      const ripples = ripplesRef.current;
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.r     += rp.speed;
        rp.alpha *= 0.93;

        if (rp.alpha < 0.01 || rp.r > rp.maxR) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.ellipse(rp.x, rp.y, rp.r * 1.8, rp.r * 0.55, 0, 0, Math.PI * 2);
        ctx.strokeStyle = s.ripple + rp.alpha.toFixed(3) + ")";
        ctx.lineWidth   = 0.8;
        ctx.stroke();
      }

      // Fade existing streaks very slowly
      gCtx.fillStyle = `rgba(0,0,0,${0.008 + (1 - streakPersistence) * 0.025})`;
      gCtx.fillRect(0, 0, w, h);

      const streaks = streaksRef.current;
      for (let i = streaks.length - 1; i >= 0; i--) {
        const sk = streaks[i];
        sk.wobblePhase += 0.04;
        sk.y  += sk.vy;
        sk.x  += Math.sin(sk.wobblePhase) * sk.wobble * 0.3;
        sk.alpha *= 0.998;

        if (sk.y > h + sk.len || sk.alpha < 0.04) {
          streaks.splice(i, 1);
          continue;
        }

        const grd = gCtx.createLinearGradient(sk.x, sk.y, sk.x, sk.y + sk.len);
        grd.addColorStop(0,   s.streak + (sk.alpha * 0.6).toFixed(3) + ")");
        grd.addColorStop(0.7, s.streak + (sk.alpha * 0.3).toFixed(3) + ")");
        grd.addColorStop(1,   s.streak + "0)");
        gCtx.strokeStyle = grd;
        gCtx.lineWidth   = 1.2 + Math.sin(sk.wobblePhase * 0.5) * 0.4;
        gCtx.lineCap     = "round";
        gCtx.beginPath();
        gCtx.moveTo(sk.x, sk.y);
        gCtx.lineTo(sk.x + Math.sin(sk.wobblePhase) * sk.wobble, sk.y + sk.len);
        gCtx.stroke();
      }

      if (streaks.length > 120) streaks.splice(0, streaks.length - 120);

      const vig = ctx.createRadialGradient(w/2, h/2, h * 0.1, w/2, h/2, h * 0.85);
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.7)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);

      const mistGrd = ctx.createLinearGradient(0, h * 0.8, 0, h);
      mistGrd.addColorStop(0, "rgba(0,0,0,0)");
      mistGrd.addColorStop(1, s.bg[2] + "cc");
      ctx.fillStyle = mistGrd;
      ctx.fillRect(0, h * 0.8, w, h * 0.2);

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [colorScheme, intensity, windAngle, streakPersistence, rippleCount, resizeCanvas]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const now = performance.now();
    if (now - lastMoveRef.current < 20) return;
    lastMoveRef.current = now;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current.nx = (e.clientX - rect.left) / rect.width;
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.nx = 0.5;
  }, []);

  const s = SCHEMES[colorScheme];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-screen overflow-hidden flex flex-col"
      style={{ background: s.bg[0] }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      <canvas ref={glassRef}  className="absolute inset-0 z-[1]" style={{ mixBlendMode: "screen", opacity: 0.7 }} />

      {/* Grain */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          opacity: 0.045,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          mixBlendMode: "overlay",
        }}
      />

      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 flex items-center justify-between px-10 md:px-16 pt-9"
      >
        <div style={{
          fontFamily: "monospace",
          fontSize: "12px",
          fontWeight: 700,
          letterSpacing: "0.22em",
          color: s.accent,
          textTransform: "uppercase",
        }}>
          MNSON<span style={{ opacity: 0.4 }}>_SYS</span>
        </div>
        <div className="flex items-center gap-6">
          {["Platform", "Docs", "Pricing"].map(item => (
            <button key={item} style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "monospace", fontSize: "10px",
              letterSpacing: "0.18em", color: "rgba(255,255,255,0.3)",
              textTransform: "uppercase", padding: 0,
              transition: "color 0.25s",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = s.ui)}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
            >{item}</button>
          ))}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            style={{
              fontFamily: "monospace", fontSize: "10px",
              letterSpacing: "0.15em", textTransform: "uppercase",
              padding: "8px 20px",
              background: "transparent",
              border: `1px solid ${s.accent}55`,
              color: s.accent, cursor: "pointer",
              transition: "border-color 0.25s, background 0.25s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = `${s.accent}18`;
              (e.currentTarget as HTMLElement).style.borderColor = s.accent;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.borderColor = `${s.accent}55`;
            }}
          >Early Access</motion.button>
        </div>
      </motion.nav>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6">
        {children || (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } }}
            className="flex flex-col items-center max-w-4xl"
          >
            <motion.div
              variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
              className="mb-8 flex items-center gap-3 px-4 py-2"
              style={{
                border: `1px solid ${s.accent}30`,
                background: `${s.accent}08`,
                backdropFilter: "blur(8px)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: s.accent, boxShadow: `0 0 8px ${s.accent}` }} />
              <span style={{ fontFamily: "monospace", fontSize: "10px", color: s.ui, letterSpacing: "0.25em", opacity: 0.8 }}>
                ALL SYSTEMS OPERATIONAL · v4.1.0
              </span>
            </motion.div>

            <motion.h1
              variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } } }}
              style={{
                fontFamily: "monospace",
                fontWeight: 900,
                fontSize: "clamp(2.8rem, 8.5vw, 8rem)",
                lineHeight: 0.9,
                letterSpacing: "-0.04em",
                color: "#ffffff",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              BUILT FOR<br />
              <span style={{
                color: s.accent,
                textShadow: `0 0 60px ${s.accent}80, 0 0 120px ${s.accent}30`,
              }}>
                THE STORM.
              </span>
            </motion.h1>

            <motion.div
              variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.7 } } }}
              className="my-6 h-px w-16 origin-center"
              style={{ background: `linear-gradient(to right, transparent, ${s.accent}80, transparent)` }}
            />

            <motion.p
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              style={{
                fontFamily: "monospace",
                fontSize: "13px",
                lineHeight: 1.9,
                color: "rgba(255,255,255,0.35)",
                maxWidth: "420px",
                marginBottom: "2.8rem",
                letterSpacing: "0.04em",
              }}
            >
              Distributed compute at planetary scale. Zero single points of failure. Engineered to run when everything else goes down.
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              className="flex items-center gap-4 flex-wrap justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: `0 0 40px ${s.accent}55` }}
                whileTap={{ scale: 0.96 }}
                style={{
                  fontFamily: "monospace", fontSize: "11px",
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  padding: "15px 38px",
                  background: s.accent,
                  color: "#04060f",
                  border: "none", cursor: "pointer", fontWeight: 700,
                  boxShadow: `0 0 28px ${s.accent}40`,
                  transition: "box-shadow 0.3s",
                }}
              >
                Deploy Now →
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  fontFamily: "monospace", fontSize: "11px",
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  padding: "14px 38px",
                  background: "transparent",
                  color: "rgba(255,255,255,0.4)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  cursor: "pointer",
                  transition: "color 0.25s, border-color 0.25s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color = s.ui;
                  (e.currentTarget as HTMLElement).style.borderColor = `${s.accent}50`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)";
                }}
              >
                Read the Docs
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.9 }}
        className="relative z-10 flex items-end justify-between px-10 md:px-16 pb-9"
      >
        <div className="flex items-center gap-8">
          {[
            { val: "99.999%", label: "Uptime" },
            { val: "<1ms",    label: "P99 latency" },
            { val: "180+",    label: "Regions" },
          ].map(({ val, label }, i) => (
            <React.Fragment key={label}>
              {i > 0 && <span className="w-px h-5 bg-white/10" />}
              <div className="flex flex-col gap-0.5">
                <span style={{ fontFamily: "monospace", fontSize: "16px", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em" }}>{val}</span>
                <span style={{ fontFamily: "monospace", fontSize: "9px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.25em", textTransform: "uppercase" }}>{label}</span>
              </div>
            </React.Fragment>
          ))}
        </div>
        <div style={{ fontFamily: "monospace", fontSize: "9px", color: "rgba(255,255,255,0.18)", letterSpacing: "0.18em", textAlign: "right" }}>
          <div>MONSOON ENGINE</div>
          <div style={{ color: s.accent, opacity: 0.45 }}>
            INTENSITY {Math.round(intensity * 100)}% · WIND {windAngle}°
          </div>
        </div>
      </motion.div>
    </div>
  );
};