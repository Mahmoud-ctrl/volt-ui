"use client";
import React from 'react';
import { motion } from 'framer-motion';

export interface ParticleRingLoaderProps {
  color?: string;
  size?: number;
  particleCount?: number;
  speed?: number;
}

export const ParticleRingLoader: React.FC<ParticleRingLoaderProps> = ({
  color = "#6366f1",
  size = 80,
  particleCount = 12,
  speed = 2,
}) => {
  const radius = size / 2 - 8;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {Array.from({ length: particleCount }).map((_, i) => {
        const angle = (i / particleCount) * Math.PI * 2;
        const x = Math.cos(angle) * radius + size / 2;
        const y = Math.sin(angle) * radius + size / 2;
        const particleSize = 4 + Math.sin(angle) * 2;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: particleSize,
              height: particleSize,
              backgroundColor: color,
              left: x,
              top: y,
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.3, 1, 0.3],
              boxShadow: [
                `0 0 0px ${color}`,
                `0 0 ${particleSize * 3}px ${color}`,
                `0 0 0px ${color}`,
              ],
            }}
            transition={{
              duration: speed,
              repeat: Infinity,
              delay: (i / particleCount) * speed,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
};