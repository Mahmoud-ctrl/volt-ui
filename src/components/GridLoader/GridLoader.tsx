"use client";
import React from 'react';
import { motion } from 'framer-motion';

export interface GridLoaderProps {
  color?: string;
  size?: number;
  gap?: number;
  speed?: number;
}

export const GridLoader: React.FC<GridLoaderProps> = ({
  color = "#6366f1",
  size = 20,
  gap = 4,
  speed = 0.8,
}) => {
  const sequence = [0, 1, 2, 5, 8, 7, 6, 3, 4];

  return (
    <div
      className="grid grid-cols-3"
      style={{ gap }}
    >
      {Array.from({ length: 9 }).map((_, i) => (
        <motion.div
          key={i}
          className="rounded-sm"
          style={{ width: size, height: size, backgroundColor: color }}
          animate={{
            opacity: [0.15, 1, 0.15],
            scale: [0.8, 1, 0.8],
            boxShadow: [
              `0 0 0px ${color}`,
              `0 0 ${size}px ${color}`,
              `0 0 0px ${color}`,
            ],
          }}
          transition={{
            duration: speed * 2,
            repeat: Infinity,
            delay: sequence.indexOf(i) * (speed / sequence.length),
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};