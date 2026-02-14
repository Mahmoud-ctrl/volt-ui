"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export interface TypewriterTextProps {
  text: string;
  speed?: number;
  showCursor?: boolean;
  loop?: boolean;
  className?: string;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  speed = 100,
  showCursor = true,
  loop = false,
  className = "",
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (loop && currentIndex === text.length) {
      const timeout = setTimeout(() => {
        setDisplayText('');
        setCurrentIndex(0);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed, loop]);

  return (
    <div className={`inline-flex items-center ${className}`}>
      <span className="text-6xl font-black tracking-tight">
        {displayText}
      </span>
      {showCursor && (
        <motion.span
          className="text-6xl font-black ml-1"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          |
        </motion.span>
      )}
    </div>
  );
};