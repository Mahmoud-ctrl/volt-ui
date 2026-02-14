"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface MatrixTextProps {
  text: string;
  speed?: number;
  color?: string;
  className?: string;
}

const GLYPHS = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ";

export const MatrixText: React.FC<MatrixTextProps> = ({
  text,
  speed = 0.1,
  color = "#00FF41",
  className = "",
}) => {
  const [displayText, setDisplayText] = useState(text.split("").map(() => " "));

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        text.split("").map((char, i) => {
          if (i < iteration) return char;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
      );

      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, speed * 1000);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <div className={`font-mono text-6xl font-bold tracking-widest ${className}`} style={{ color }}>
      {displayText.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, textShadow: `0 0 0px ${color}` }}
          animate={{ opacity: 1, textShadow: `0 0 8px ${color}` }}
          className="inline-block"
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
};