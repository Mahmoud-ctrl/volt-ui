"use client";
import React from 'react';
import { motion } from 'framer-motion';

export interface DNALoaderProps {
  color?: string;
  secondColor?: string;
  dotCount?: number;
  speed?: number;
  size?: number;
}

export const DNALoader: React.FC<DNALoaderProps> = ({
  color = "#6366f1",
  secondColor = "#06b6d4",
  dotCount = 8,
  speed = 1.5,
  size = 12,
}) => {
  return (
    <div className="flex gap-1 items-center">
      {Array.from({ length: dotCount }).map((_, i) => {
        const phase = (i / dotCount) * Math.PI * 2;
        return (
          <div key={i} className="flex flex-col items-center gap-1">
            {/* Top strand */}
            <motion.div
              className="rounded-full"
              style={{ width: size, height: size, backgroundColor: color }}
              animate={{
                y: [
                  Math.sin(phase) * 20,
                  Math.sin(phase + Math.PI) * 20,
                  Math.sin(phase + Math.PI * 2) * 20,
                ],
                scale: [
                  0.6 + Math.abs(Math.sin(phase)) * 0.4,
                  0.6 + Math.abs(Math.sin(phase + Math.PI)) * 0.4,
                  0.6 + Math.abs(Math.sin(phase)) * 0.4,
                ],
                opacity: [
                  0.4 + Math.abs(Math.sin(phase)) * 0.6,
                  0.4 + Math.abs(Math.sin(phase + Math.PI)) * 0.6,
                  0.4 + Math.abs(Math.sin(phase)) * 0.6,
                ],
                boxShadow: [
                  `0 0 ${size}px ${color}`,
                  `0 0 ${size * 0.5}px ${color}`,
                  `0 0 ${size}px ${color}`,
                ],
              }}
              transition={{
                duration: speed,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Bottom strand */}
            <motion.div
              className="rounded-full"
              style={{ width: size, height: size, backgroundColor: secondColor }}
              animate={{
                y: [
                  Math.sin(phase + Math.PI) * 20,
                  Math.sin(phase + Math.PI * 2) * 20,
                  Math.sin(phase + Math.PI * 3) * 20,
                ],
                scale: [
                  0.6 + Math.abs(Math.sin(phase + Math.PI)) * 0.4,
                  0.6 + Math.abs(Math.sin(phase)) * 0.4,
                  0.6 + Math.abs(Math.sin(phase + Math.PI)) * 0.4,
                ],
                opacity: [
                  0.4 + Math.abs(Math.sin(phase + Math.PI)) * 0.6,
                  0.4 + Math.abs(Math.sin(phase)) * 0.6,
                  0.4 + Math.abs(Math.sin(phase + Math.PI)) * 0.6,
                ],
                boxShadow: [
                  `0 0 ${size}px ${secondColor}`,
                  `0 0 ${size * 0.5}px ${secondColor}`,
                  `0 0 ${size}px ${secondColor}`,
                ],
              }}
              transition={{
                duration: speed,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        );
      })}
    </div>
  );
};