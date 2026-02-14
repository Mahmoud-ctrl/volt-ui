"use client";

import React from 'react';
import { motion } from 'framer-motion';

export interface BounceTextProps {
  text: string;
  height?: number;
  stagger?: number;
  elasticity?: number;
  className?: string;
}

export const BounceText: React.FC<BounceTextProps> = ({
  text,
  height = 30,
  stagger = 0.05,
  elasticity = 0.5,
  className = "",
}) => {
  return (
    <div className={`inline-flex ${className}`}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="text-6xl font-black inline-block"
          animate={{
            y: [0, -height, 0],
          }}
          transition={{
            duration: elasticity,
            repeat: Infinity,
            repeatDelay: 0.5,
            delay: i * stagger,
            ease: "easeOut",
            times: [0, 0.4, 1],
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  );
};