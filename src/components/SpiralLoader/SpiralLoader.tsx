"use client";
import React from 'react';
import { motion } from 'framer-motion';

export interface SpiralLoaderProps {
  color?: string;
  size?: number;
  speed?: number;
  turns?: number;
}

export const SpiralLoader: React.FC<SpiralLoaderProps> = ({
  color = "#6366f1",
  size = 100,
  speed = 3,
  turns = 3,
}) => {
  const points: string[] = [];
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size / 2 - 4;
  const steps = turns * 60;

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const angle = t * turns * Math.PI * 2;
    const r = t * maxR;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    points.push(i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`);
  }

  const path = points.join(" ");

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Static track */}
      <path
        d={path}
        fill="none"
        stroke={`${color}22`}
        strokeWidth={2}
        strokeLinecap="round"
      />

      {/* Animated draw */}
      <motion.path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        style={{ filter: `drop-shadow(0 0 4px ${color})` }}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 0] }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </svg>
  );
};