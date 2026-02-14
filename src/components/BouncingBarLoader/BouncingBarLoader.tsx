"use client";
import React from 'react';
import { motion } from 'framer-motion';

export interface BouncingBarLoaderProps {
  color?: string;
  barCount?: number;
  speed?: number;
  height?: number;
  width?: number;
}

export const BouncingBarLoader: React.FC<BouncingBarLoaderProps> = ({
  color = "#6366f1",
  barCount = 5,
  speed = 0.7,
  height = 60,
  width = 8,
}) => {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: barCount }).map((_, i) => (
        <motion.div
          key={i}
          className="rounded-full"
          style={{ width, backgroundColor: color }}
          animate={{
            height: [height * 0.2, height, height * 0.2],
            opacity: [0.5, 1, 0.5],
            boxShadow: [
              `0 0 0px ${color}`,
              `0 0 12px ${color}88`,
              `0 0 0px ${color}`,
            ],
          }}
          transition={{
            duration: speed,
            repeat: Infinity,
            delay: i * (speed / barCount),
            ease: [0.45, 0, 0.55, 1],
          }}
        />
      ))}
    </div>
  );
};