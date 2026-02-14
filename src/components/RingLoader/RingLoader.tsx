"use client";
import React from 'react';
import { motion } from 'framer-motion';

export interface RingLoaderProps {
  color?: string;
  size?: number;
  thickness?: number;
  speed?: number;
  segments?: number;
}

export const RingLoader: React.FC<RingLoaderProps> = ({
  color = "#6366f1",
  size = 80,
  thickness = 6,
  speed = 1.2,
  segments = 3,
}) => {
  return (
    <div className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {Array.from({ length: segments }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: size - i * (thickness * 2.5),
            height: size - i * (thickness * 2.5),
            border: `${thickness}px solid transparent`,
            borderTopColor: color,
            borderRightColor: i % 2 === 0 ? color : "transparent",
            opacity: 1 - i * 0.25,
            filter: `blur(${i * 0.5}px)`,
          }}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{
            duration: speed * (i + 1) * 0.6,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Center glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: size * 0.2,
          height: size * 0.2,
          backgroundColor: color,
          boxShadow: `0 0 ${size * 0.3}px ${color}`,
        }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: speed, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};