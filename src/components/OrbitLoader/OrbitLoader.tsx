"use client";
import React from 'react';
import { motion } from 'framer-motion';

export interface OrbitLoaderProps {
  color?: string;
  size?: number;
  orbitCount?: number;
  speed?: number;
}

export const OrbitLoader: React.FC<OrbitLoaderProps> = ({
  color = "#6366f1",
  size = 80,
  orbitCount = 3,
  speed = 2,
}) => {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* Core */}
      <motion.div
        className="absolute rounded-full z-10"
        style={{
          width: size * 0.2,
          height: size * 0.2,
          backgroundColor: color,
          boxShadow: `0 0 ${size * 0.2}px ${color}`,
        }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: speed, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Orbits */}
      {Array.from({ length: orbitCount }).map((_, i) => {
        const orbitSize = size * (0.4 + i * 0.25);
        const dotSize = size * 0.08;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full border"
            style={{
              width: orbitSize,
              height: orbitSize,
              borderColor: `${color}33`,
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: speed * (i + 1) * 0.7,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* Planet dot */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: dotSize,
                height: dotSize,
                backgroundColor: color,
                top: -dotSize / 2,
                left: "50%",
                marginLeft: -dotSize / 2,
                boxShadow: `0 0 ${dotSize * 2}px ${color}`,
                opacity: 1 - i * 0.2,
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
};