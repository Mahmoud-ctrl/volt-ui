"use client";

import React from 'react';
import { motion } from 'framer-motion';

export interface PulseTextProps {
  text: string;
  scale?: number;
  speed?: number;
  stagger?: boolean;
  className?: string;
}

export const PulseText: React.FC<PulseTextProps> = ({
  text,
  scale = 1.2,
  speed = 0.8,
  stagger = true,
  className = "",
}) => {
  if (!stagger) {
    return (
      <motion.div
        className={`text-6xl font-black ${className}`}
        animate={{
          scale: [1, scale, 1],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.div>
    );
  }

  return (
    <div className={`inline-flex ${className}`}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="text-6xl font-black inline-block"
          animate={{
            scale: [1, scale, 1],
          }}
          transition={{
            duration: speed,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.1,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  );
};