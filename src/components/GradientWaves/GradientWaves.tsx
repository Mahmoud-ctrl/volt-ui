"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

export interface GradientWavesProps {
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  waveCount?: number;
  speed?: number;
  blur?: number;
  children?: React.ReactNode;
}

export const GradientWaves: React.FC<GradientWavesProps> = ({
  primaryColor = "#6366f1",
  secondaryColor = "#8b5cf6",
  accentColor = "#ec4899",
  waveCount = 3,
  speed = 20,
  blur = 120,
  children
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    // Normalize values between -0.5 and 0.5
    mouseX.set(clientX / innerWidth - 0.5);
    mouseY.set(clientY / innerHeight - 0.5);
  };

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const moveX = useTransform(smoothX, [-0.5, 0.5], ["-10%", "10%"]);
  const moveY = useTransform(smoothY, [-0.5, 0.5], ["-10%", "10%"]);

  const colors = [primaryColor, secondaryColor, accentColor];

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen bg-slate-950 overflow-hidden selection:bg-indigo-500/30"
    >
      <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none brightness-100 contrast-150" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3 Visual Thinking: Creating a grainy texture %3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      <motion.div style={{ x: moveX, y: moveY }} className="absolute inset-0 z-0">
        {Array.from({ length: waveCount }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              background: `radial-gradient(circle, ${colors[i % colors.length]} 0%, transparent 70%)`,
              filter: `blur(${blur}px)`,
              opacity: 0.5,
              width: '50%',
              height: '50%',
              left: `${10 + i * 20}%`,
              top: `${10 + i * 10}%`,
            }}
            animate={{
              x: [0, 50, -30, 0],
              y: [0, -30, 40, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: speed + i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </motion.div>

      <div className="absolute inset-0 z-[2] bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {children || (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { staggerChildren: 0.2 } 
              }
            }}
            className="text-center"
          >
            <motion.h1 
              variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
              className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tighter"
            >
              Build <span className="text-slate-500">Fast.</span>
              <br />
              <span className="bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
                Ship Beautiful.
              </span>
            </motion.h1>
            
            <motion.p 
              variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
              className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed"
            >
              The ultimate toolkit for building modern web applications with React and Tailwind CSS.
            </motion.p>

            <motion.div 
              variants={{ hidden: { scale: 0.9, opacity: 0 }, visible: { scale: 1, opacity: 1 } }}
              className="flex gap-4 justify-center"
            >
              <button className="group relative px-8 py-3 bg-white text-slate-950 rounded-full font-semibold overflow-hidden transition-all hover:pr-12">
                <span className="relative z-10">Get Started</span>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all">→</span>
              </button>
              <button className="px-8 py-3 bg-slate-900/50 text-white border border-white/10 rounded-full font-medium hover:bg-slate-800 transition-colors backdrop-blur-md">
                Documentation
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent z-[3]" />
    </div>
  );
};