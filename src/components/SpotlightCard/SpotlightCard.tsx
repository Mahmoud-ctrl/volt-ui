"use client";
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export interface SpotlightCardProps {
  title?: string;
  description?: string;
  spotlightColor?: string;
  spotlightSize?: number;
  className?: string;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  title = "Spotlight Card",
  description = "Move your mouse around to see the spotlight follow",
  spotlightColor = "#6366f1",
  spotlightSize = 200,
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top } = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - left, y: e.clientY - top });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-72 rounded-2xl p-6 overflow-hidden cursor-pointer ${className}`}
      style={{
        backgroundColor: "#18181b",
        border: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Spotlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(${spotlightSize}px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}22, transparent 70%)`,
        }}
      />

      {/* Border glow at cursor */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        animate={{ opacity: isHovered ? 1 : 0 }}
        style={{
          background: `radial-gradient(${spotlightSize * 1.5}px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}44, transparent 70%)`,
          maskImage: `radial-gradient(${spotlightSize}px circle at ${pos.x}px ${pos.y}px, black, transparent)`,
          WebkitMaskImage: `radial-gradient(${spotlightSize}px circle at ${pos.x}px ${pos.y}px, black, transparent)`,
        }}
      />

      <div className="relative z-10">
        <motion.div
          className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
          style={{
            backgroundColor: `${spotlightColor}22`,
            border: `1px solid ${spotlightColor}44`,
          }}
          animate={{ scale: isHovered ? 1.1 : 1 }}
        >
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: spotlightColor }} />
        </motion.div>
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-zinc-400">{description}</p>

        <motion.div
          className="mt-6 h-px w-full"
          style={{
            background: `linear-gradient(90deg, ${spotlightColor}88, transparent)`,
          }}
          animate={{ scaleX: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </div>
  );
};