"use client";
import React from 'react';
import { motion } from 'framer-motion';

export interface WaveLoaderProps {
  color?: string;
  barCount?: number;
  speed?: number;
  height?: number;
  gap?: number;
}

export const WaveLoader: React.FC<WaveLoaderProps> = ({
  color = "#6366f1",
  barCount = 8,
  speed = 0.6,
  height = 60,
  gap = 4,
}) => {
  return (
    <div
      className="flex items-end"
      style={{ gap, height }}
    >
      {Array.from({ length: barCount }).map((_, i) => {
        const delay = (i / barCount) * speed;
        return (
          <motion.div
            key={i}
            className="rounded-full"
            style={{
              width: 6,
              backgroundColor: color,
              boxShadow: `0 0 8px ${color}88`,
            }}
            animate={{
              height: [
                height * 0.2,
                height * (0.5 + Math.sin((i / barCount) * Math.PI) * 0.5),
                height * 0.2,
              ],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: speed,
              repeat: Infinity,
              ease: "easeInOut",
              delay,
            }}
          />
        );
      })}
    </div>
  );
};