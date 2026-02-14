"use client";
import React from 'react';
import { motion } from 'framer-motion';

export interface PulseLoaderProps {
  color?: string;
  size?: number;
  dotCount?: number;
  speed?: number;
}

export const PulseLoader: React.FC<PulseLoaderProps> = ({
  color = "#6366f1",
  size = 16,
  dotCount = 3,
  speed = 0.8,
}) => {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: dotCount }).map((_, i) => (
        <motion.div
          key={i}
          className="rounded-full"
          style={{ width: size, height: size, backgroundColor: color }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.4, 1, 0.4],
            boxShadow: [
              `0 0 0px ${color}`,
              `0 0 ${size}px ${color}`,
              `0 0 0px ${color}`,
            ],
          }}
          transition={{
            duration: speed,
            repeat: Infinity,
            delay: i * (speed / dotCount),
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};