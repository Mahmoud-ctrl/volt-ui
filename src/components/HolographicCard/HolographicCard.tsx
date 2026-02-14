"use client";
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export interface HolographicCardProps {
  title?: string;
  description?: string;
  intensity?: number;
  className?: string;
}

export const HolographicCard: React.FC<HolographicCardProps> = ({
  title = "Holographic",
  description = "Move your mouse over me to see the holographic effect",
  intensity = 1,
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    setPos({
      x: (e.clientX - left) / width,
      y: (e.clientY - top) / height,
    });
  };

  const rotateX = isHovered ? (pos.y - 0.5) * -20 * intensity : 0;
  const rotateY = isHovered ? (pos.x - 0.5) * 20 * intensity : 0;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{ rotateX, rotateY, scale: isHovered ? 1.05 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      className={`relative w-72 rounded-2xl p-6 cursor-pointer overflow-hidden ${className}`}
    >
      {/* Base dark background */}
      <div className="absolute inset-0 rounded-2xl bg-zinc-900" />

      {/* Holographic rainbow layer */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300"
        style={{
          background: `
            radial-gradient(ellipse at ${pos.x * 100}% ${pos.y * 100}%,
              rgba(255,0,128,0.3),
              rgba(255,165,0,0.2),
              rgba(0,255,128,0.2),
              rgba(0,128,255,0.2),
              rgba(128,0,255,0.2),
              transparent 70%
            )
          `,
          opacity: isHovered ? intensity * 0.8 : 0,
          mixBlendMode: "screen",
        }}
      />

      {/* Shine streak */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: `linear-gradient(
            ${105 + pos.x * 60}deg,
            transparent 30%,
            rgba(255,255,255,0.08) 50%,
            transparent 70%
          )`,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Border glow */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          border: '1px solid transparent',
          background: `linear-gradient(#1a1a1a, #1a1a1a) padding-box,
            linear-gradient(${pos.x * 360}deg, #ff0080, #ff8c00, #40e0d0, #7b2fff) border-box`,
          opacity: isHovered ? 1 : 0.3,
        }}
      />

      {/* Content */}
      <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-pink-400 to-purple-600" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-zinc-400">{description}</p>
      </div>
    </motion.div>
  );
};