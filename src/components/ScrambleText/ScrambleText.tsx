"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export interface ScrambleTextProps {
  text: string;
  speed?: number;
  scrambleSpeed?: number;
  characters?: string;
  className?: string;
}

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  speed = 50,
  scrambleSpeed = 20,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>?/',
  className = "",
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(true);

  useEffect(() => {
    let iteration = 0;
    const maxIterations = text.length * scrambleSpeed;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (index < iteration / scrambleSpeed) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('')
      );

      iteration++;

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, scrambleSpeed, characters]);

  return (
    <motion.div
      className={`text-6xl font-mono font-bold tracking-tight ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {displayText}
    </motion.div>
  );
};