"use client";
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export interface MeshGradientBackgroundProps {
  colors?: string[];
  speed?: number;
  blur?: number;
  interactive?: boolean;
  children?: React.ReactNode;
}

export const MeshGradientBackground: React.FC<MeshGradientBackgroundProps> = ({
  colors = ["#4f46e5", "#c026d3", "#f59e0b", "#10b981"],
  speed = 12,
  blur = 120,
  interactive = true,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springX = useSpring(mouseX, { damping: 30, stiffness: 100 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 100 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive) return;
    const { clientX, clientY } = e;
    mouseX.set(clientX / window.innerWidth);
    mouseY.set(clientY / window.innerHeight);
  };

  const blobs = [
    { x: "10%", y: "15%", animX: [0, 80, -60, 40, 0], animY: [0, -50, 70, -30, 0] },
    { x: "85%", y: "20%", animX: [0, -70, 40, -80, 0], animY: [0, 60, -40, 50, 0] },
    { x: "75%", y: "80%", animX: [0, 50, -70, 30, 0], animY: [0, -70, 40, -50, 0] },
    { x: "15%", y: "85%", animX: [0, -40, 60, -50, 0], animY: [0, 50, -60, 40, 0] },
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen bg-[#020205] overflow-hidden selection:bg-white/20"
    >
      {/* Mesh blobs with 'screen' blend mode for better color mixing */}
      <div className="absolute inset-0 mix-blend-screen overflow-hidden">
        {blobs.map((blob, i) => (
          <motion.div
            key={i}
            className="absolute w-[600px] h-[600px] rounded-full opacity-60"
            style={{
              left: blob.x,
              top: blob.y,
              transform: "translate(-50%, -50%)",
              background: `radial-gradient(circle, ${colors[i % colors.length]} 0%, transparent 75%)`,
              filter: `blur(${blur}px)`,
            }}
            animate={{
              x: blob.animX,
              y: blob.animY,
              scale: [1, 1.25, 0.9, 1.15, 1],
            }}
            transition={{
              duration: speed + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Interactive Cursor Glow */}
      {interactive && (
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full pointer-events-none opacity-40 mix-blend-screen"
          style={{
            left: useTransform(springX, [0, 1], ["0%", "100%"]),
            top: useTransform(springY, [0, 1], ["0%", "100%"]),
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, ${colors[0]} 0%, transparent 70%)`,
            filter: `blur(${blur}px)`,
          }}
        />
      )}

      {/* Noise + Texture */}
      <div className="absolute inset-0 opacity-[0.15] mix-blend-soft-light pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} 
      />

      {/* Content Layer */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        {children || (
          <div className="max-w-4xl w-full text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-xs font-semibold tracking-widest text-white uppercase bg-white/10 border border-white/20 rounded-full backdrop-blur-xl">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                System Operational
              </span>

              <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tighter mb-6 leading-[0.9]">
                Redefining the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-emerald-300">
                  Digital Canvas
                </span>
              </h1>

              <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
                Our fluid engine generates real-time interactive meshes that adapt to user behavior. 
                Experience design that moves at the speed of thought.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="group relative px-8 py-4 bg-white text-black rounded-full font-bold transition-all hover:scale-105 active:scale-95">
                  <span className="relative z-10">Get Started Now</span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 opacity-0 group-hover:opacity-20 transition-opacity" />
                </button>
                
                <button className="px-8 py-4 bg-transparent text-white border border-white/20 rounded-full font-semibold backdrop-blur-md transition-all hover:bg-white/5 active:scale-95">
                  View Components
                </button>
              </div>

              <div className="mt-16 flex items-center justify-center gap-8 text-zinc-500">
                <p className="text-sm font-medium">Trusted by teams at</p>
                <div className="flex gap-6 grayscale opacity-50 contrast-125">
                  {/* Placeholder SVG "Logos" */}
                  <div className="h-5 w-20 bg-zinc-700 rounded" />
                  <div className="h-5 w-24 bg-zinc-700 rounded" />
                  <div className="h-5 w-16 bg-zinc-700 rounded" />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* Dark Vignette for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#020205_100%)] pointer-events-none" />
    </div>
  );
};