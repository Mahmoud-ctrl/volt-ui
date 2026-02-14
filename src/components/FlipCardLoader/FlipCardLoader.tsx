"use client";
import React from 'react';
import { motion } from 'framer-motion';

export interface FlipCardLoaderProps {
  color?: string;
  cardCount?: number;
  size?: number;
  speed?: number;
}

export const FlipCardLoader: React.FC<FlipCardLoaderProps> = ({
  color = "#6366f1",
  cardCount = 4,
  size = 20,
  speed = 1.2,
}) => {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: cardCount }).map((_, i) => (
        <motion.div
          key={i}
          style={{
            width: size,
            height: size * 1.4,
            backgroundColor: color,
            borderRadius: 3,
            boxShadow: `0 0 ${size * 0.5}px ${color}44`,
          }}
          animate={{
            rotateY: [0, 180, 180, 0],
            backgroundColor: [color, `${color}44`, `${color}44`, color],
            boxShadow: [
              `0 0 ${size * 0.5}px ${color}44`,
              `0 0 ${size}px ${color}`,
              `0 0 ${size * 0.5}px ${color}44`,
              `0 0 ${size * 0.5}px ${color}44`,
            ],
          }}
          transition={{
            duration: speed,
            repeat: Infinity,
            delay: i * (speed / cardCount),
            ease: "easeInOut",
            times: [0, 0.3, 0.7, 1],
          }}
        />
      ))}
    </div>
  );
};