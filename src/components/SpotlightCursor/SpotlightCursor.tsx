"use client";
import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export interface SpotlightCursorProps {
  color?: string;
  size?: number;
  blur?: number;
  opacity?: number;
}

export const SpotlightCursor: React.FC<SpotlightCursorProps> = ({
  color = "#6366f1",
  size = 400, // Increased size for better effect
  blur = 60,
  opacity = 0.2,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInside, setIsInside] = useState(false);

  // 1. Use Motion Values to avoid React re-renders on every mouse move
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 2. Add a Spring for that "lagging" luxury feel
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Set values directly (no setState!)
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsInside(true)}
      onMouseLeave={() => setIsInside(false)}
      className="relative w-full h-full min-h-[400px] flex items-center justify-center overflow-hidden bg-zinc-950 rounded-xl border border-zinc-800"
    >
      <div className="z-10 text-center pointer-events-none select-none">
        <h3 className="text-zinc-200 font-medium">Interactive Spotlight</h3>
      </div>

      {/* The Spotlight */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          filter: `blur(${blur}px)`,
          // Use x/y instead of top/left for GPU performance
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          top: 0,
          left: 0,
        }}
        animate={{
          opacity: isInside ? opacity : 0,
          scale: isInside ? 1 : 0.8,
        }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};