"use client";
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export interface TiltCardProps {
  title?: string;
  description?: string;
  intensity?: number;
  glare?: boolean;
  scale?: number;
  className?: string;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  title = "Tilt Card",
  description = "Hover me to see the 3D tilt effect in action",
  intensity = 15,
  glare = true,
  scale = 1.05,
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setRotateX((y - 0.5) * -intensity * 2);
    setRotateY((x - 0.5) * intensity * 2);
    setGlarePos({ x: x * 100, y: y * 100 });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY, scale: isHovered ? scale : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      className={`relative w-72 rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-800 p-6 cursor-pointer ${className}`}
    >
      {/* Glare overlay */}
      {glare && isHovered && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
          }}
        />
      )}

      {/* Card content */}
      <div style={{ transform: "translateZ(40px)" }}>
        <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center mb-4">
          <div className="w-4 h-4 rounded-full bg-indigo-400" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-zinc-400">{description}</p>
      </div>

      {/* Bottom shimmer line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px rounded-full"
        style={{
          background: `linear-gradient(90deg, transparent, rgba(99,102,241,${isHovered ? 0.8 : 0}), transparent)`,
        }}
      />
    </motion.div>
  );
};