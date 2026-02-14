"use client";
import React, { useRef, useCallback, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export interface VortexBackgroundProps {
  color?: string;
  ringCount?: number;
  speed?: number;
  depth?: number;
  children?: React.ReactNode;
}

export const VortexBackground: React.FC<VortexBackgroundProps> = ({
  color = "#6366f1",
  ringCount = 15,
  speed = 10,
  depth = 0.9,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 30, stiffness: 80 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 80 });

  const bgTiltX = useTransform(springY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const bgTiltY = useTransform(springX, [-0.5, 0.5], ["-15deg", "15deg"]);
  const textTranslateX = useTransform(springX, [-0.5, 0.5], [20, -20]);
  const textTranslateY = useTransform(springY, [-0.5, 0.5], [20, -20]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [mouseX, mouseY]);
  const rings = useMemo(() => {
    const glowColor = `${color}44`;

    return Array.from({ length: ringCount }, (_, i) => {
      const progress = i / ringCount;
      const size = 100 + Math.pow(progress, 2) * 2000;
      const opacity = (1 - progress) * 0.5;
      const isDashed = i % 2 === 0;
      const hasGlow = progress < 0.3;

      return {
        i,
        size,
        opacity,
        isDashed,
        duration: speed * (1 + progress * 3),
        boxShadow: hasGlow ? `0 0 30px ${glowColor}` : "none",
        rotateTo: i % 2 === 0 ? 360 : -360,
      };
    });
  }, [ringCount, speed, color]);

  const singularityStyle = useMemo(() => ({
    background: `radial-gradient(circle, ${color} 0%, transparent 80%)`,
    filter: "blur(40px)",
  }), [color]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen bg-[#020205] overflow-hidden flex items-center justify-center selection:bg-indigo-500/30"
      style={{ perspective: "1200px", willChange: "transform" }}
    >
      {/* 3D Vortex Container */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          rotateX: bgTiltX,
          rotateY: bgTiltY,
          scale: 1.1,
          willChange: "transform",
        }}
      >
        {rings.map(({ i, size, opacity, isDashed, duration, boxShadow, rotateTo }) => (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              width: size,
              height: size,
              borderRadius: "9999px",
              borderColor: color,
              opacity,
              borderStyle: isDashed ? "dashed" : "solid",
              borderWidth: isDashed ? "1px" : "2px",
              borderBottomWidth: 0,
              boxShadow,
              willChange: "transform",
            }}
            animate={{ rotate: rotateTo }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        <div
          className="absolute w-32 h-32 rounded-full opacity-40"
          style={singularityStyle}
        />
      </motion.div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.8)_100%)] z-[2]" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Hero Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl"
        style={{
          x: textTranslateX,
          y: textTranslateY,
          willChange: "transform",
        }}
      >
        {children || (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-8 inline-flex items-center gap-4">
              <div className="h-[1px] w-12 bg-indigo-500/50" />
              <span className="text-indigo-400 font-mono text-xs tracking-[0.4em] uppercase">
                Dimension Shift Enabled
              </span>
              <div className="h-[1px] w-12 bg-indigo-500/50" />
            </div>

            <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter mb-8 leading-none">
              QUANTUM <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-indigo-500">
                STORM.
              </span>
            </h1>

            <p className="text-zinc-400 text-lg md:text-xl max-w-xl mx-auto mb-12 font-light leading-relaxed">
              Navigate the fabric of space-time with our zero-latency
              infrastructure. Built for the next era of decentralized computing.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="relative group px-12 py-5 bg-white text-black rounded-full font-bold overflow-hidden transition-all hover:scale-105 active:scale-95">
                <span className="relative z-10">Initiate Warp</span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="absolute inset-0 bg-white group-hover:hidden" />
              </button>

              <button className="px-12 py-5 border border-white/10 text-white rounded-full font-bold backdrop-blur-md transition-all hover:bg-white/5 hover:border-white/30">
                Systems Check
              </button>
            </div>

            {/* Bottom Coordinates */}
            <div className="mt-20 flex justify-center gap-12 font-mono text-[10px] text-zinc-600 tracking-widest">
              <div>LAT: 40.7128° N</div>
              <div>LNG: 74.0060° W</div>
              <div>ALT: 402.12 KM</div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};