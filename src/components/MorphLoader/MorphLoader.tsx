"use client";
import React from 'react';
import { motion } from 'framer-motion';

export interface MorphLoaderProps {
  color?: string;
  size?: number;
  speed?: number;
}

export const MorphLoader: React.FC<MorphLoaderProps> = ({
  color = "#6366f1",
  size = 80,
  speed = 2,
}) => {
  const shapes = [
    "50% 50% 50% 50%",
    "30% 70% 70% 30% / 30% 30% 70% 70%",
    "60% 40% 30% 70% / 60% 30% 70% 40%",
    "30% 60% 70% 40% / 50% 60% 30% 60%",
    "50% 50% 50% 50%",
  ];

  return (
    <div className="flex items-center justify-center">
      <motion.div
        style={{
          width: size,
          height: size,
          backgroundColor: color,
          boxShadow: `0 0 ${size * 0.3}px ${color}88`,
        }}
        animate={{
          borderRadius: shapes,
          rotate: [0, 90, 180, 270, 360],
          scale: [1, 1.1, 0.95, 1.05, 1],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};