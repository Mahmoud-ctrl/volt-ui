"use client";
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export interface ParticleConstellationBackgroundProps {
  color?: string;
  particleCount?: number;
  connectionDistance?: number;
  speed?: number;
  particleSize?: number;
  children?: React.ReactNode;
}

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

export const ParticleConstellationBackground: React.FC<ParticleConstellationBackgroundProps> = ({
  color = "#818cf8", // Indigo-400
  particleCount = 100,
  connectionDistance = 150,
  speed = 0.6,
  particleSize = 2,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = container.offsetWidth * dpr;
      canvas.height = container.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${container.offsetWidth}px`;
      canvas.style.height = `${container.offsetHeight}px`;

      starsRef.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * container.offsetWidth,
        y: Math.random() * container.offsetHeight,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        size: Math.random() * particleSize + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      }));
    };

    resize();

    const hexToRgb = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `${r}, ${g}, ${b}`;
    };

    const rgb = hexToRgb(color);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const stars = starsRef.current;
      const mouse = mouseRef.current;
      const width = container.offsetWidth;
      const height = container.offsetHeight;

      // Update positions
      stars.forEach((star) => {
        star.x += star.vx;
        star.y += star.vy;

        const dx = star.x - mouse.x;
        const dy = star.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Gentle magnetic pull toward mouse
        if (dist < 200) {
          star.vx += (dx / dist) * 0.02;
          star.vy += (dy / dist) * 0.02;
        }

        // Boundary wrap
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;
      });

      // Drawing connections with gradient look
      ctx.lineWidth = 0.8;
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const s1 = stars[i];
          const s2 = stars[j];
          const dx = s1.x - s2.x;
          const dy = s1.y - s2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.4;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${rgb}, ${alpha})`;
            ctx.moveTo(s1.x, s1.y);
            ctx.lineTo(s2.x, s2.y);
            ctx.stroke();
          }
        }
      }

      // Draw Star Nodes
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${star.opacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = color;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset for performance
      });

      animRef.current = requestAnimationFrame(draw);
    };

    container.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", resize);
    animRef.current = requestAnimationFrame(draw);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [color, particleCount, connectionDistance, speed, particleSize]);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-[#050505] overflow-hidden flex items-center justify-center">
      {/* Background Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-60" />

      {/* Decorative Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(5,5,5,1)_80%)] z-1" />
      
      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl px-6">
        {children || (
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="inline-block px-3 py-1 mb-6 text-xs font-medium tracking-widest text-indigo-400 uppercase border border-indigo-500/30 rounded-full bg-indigo-500/10 backdrop-blur-md">
                Protocol v2.0 Live
              </span>
              
              <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tight mb-8">
                Neural <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Connectivity</span>
              </h1>
              
              <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
                Build infinitely scalable node networks with our decentralized architecture. 
                Experience seamless data flow across the synthetic universe.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="relative group px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold transition-all hover:bg-indigo-500 hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] active:scale-95">
                  Launch Console
                </button>
                
                <button className="px-8 py-4 bg-white/5 text-white border border-white/10 rounded-xl font-semibold backdrop-blur-xl transition-all hover:bg-white/10 hover:border-white/20 active:scale-95">
                  View Documentation
                </button>
              </div>
            </motion.div>

            {/* Bottom Stats Grid */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 w-full max-w-4xl border-t border-white/5 pt-12"
            >
              {[
                { label: "Active Nodes", value: "1.2M+" },
                { label: "Latency", value: "0.4ms" },
                { label: "Throughput", value: "85GB/s" },
                { label: "Uptime", value: "99.99%" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-zinc-500 text-sm uppercase tracking-wider mb-1">{stat.label}</p>
                  <p className="text-white text-2xl font-mono font-bold">{stat.value}</p>
                </div>
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};