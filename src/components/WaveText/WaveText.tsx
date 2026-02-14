"use client";

import React from 'react';
import { motion } from 'framer-motion';

export interface WaveTextProps {
  text: string;
  delay?: number;
  duration?: number;
  amplitude?: number;
  className?: string;
}

export const WaveText: React.FC<WaveTextProps> = ({
  text,
  delay = 0.05,
  duration = 0.6,
  amplitude = 20,
  className = "",
}) => {
  const characters = text.split('');

  return (
    <div className={`flex flex-wrap justify-center ${className}`}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          className="text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 inline-block"
          initial={{ y: 0 }}
          animate={{
            y: [0, -amplitude, 0],
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            delay: index * delay,
            ease: "easeInOut",
          }}
          style={{
            display: 'inline-block',
            minWidth: char === ' ' ? '0.5em' : 'auto',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  );
};