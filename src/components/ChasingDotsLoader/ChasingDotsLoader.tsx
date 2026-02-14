"use client";
import React from 'react';
import { motion } from 'framer-motion';

export interface ChasingDotsLoaderProps {
  color?: string;
  size?: number;
  dotCount?: number;
  speed?: number;
}

export const ChasingDotsLoader: React.FC<ChasingDotsLoaderProps> = ({
  color = "#6366f1",
  size = 60,
  dotCount = 12,
  speed = 1.2,
}) => {
  return (
    <div 
      className="relative flex items-center justify-center" 
      style={{ width: size, height: size }}
    >
      {Array.from({ length: dotCount }).map((_, i) => {
        // Calculate the "Trail" look
        const opacity = 1 - (i / dotCount) * 0.8;
        const scale = 1 - (i / dotCount) * 0.5;
        const delay = i * (speed / (dotCount * 2)); // Tighten delay for a connected snake feel

        return (
          <motion.div
            key={i}
            className="absolute flex justify-center"
            style={{
              width: "100%",
              height: "100%",
            }}
            // Each wrapper rotates, carrying the dot with it
            animate={{ rotate: 360 }}
            transition={{
              duration: speed,
              repeat: Infinity,
              ease: "linear",
              delay: -delay, // Negative delay starts the animation "in progress"
            }}
          >
            <motion.div
              style={{
                width: size / 8, // Proportional dot size
                height: size / 8,
                backgroundColor: color,
                borderRadius: "50%",
                opacity: opacity,
                scale: scale,
                // Leading dot gets a nice glow
                boxShadow: i === 0 ? `0 0 12px ${color}` : "none",
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
};