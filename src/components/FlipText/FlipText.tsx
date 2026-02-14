"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export interface FlipTextProps {
  text: string;
  backText?: string;
  speed?: number;
  axis?: 'x' | 'y';
  className?: string;
}

export const FlipText: React.FC<FlipTextProps> = ({
  text,
  backText,
  speed = 0.6,
  axis = 'y',
  className = "",
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`inline-block cursor-pointer perspective-1000 ${className}`}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="relative"
        animate={{
          rotateX: axis === 'x' ? (isFlipped ? 180 : 0) : 0,
          rotateY: axis === 'y' ? (isFlipped ? 180 : 0) : 0,
        }}
        transition={{
          duration: speed,
          ease: "easeInOut",
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div
          className="text-6xl font-black"
          style={{
            backfaceVisibility: 'hidden',
          }}
        >
          {text}
        </div>

        {/* Back */}
        <div
          className="text-6xl font-black absolute top-0 left-0"
          style={{
            backfaceVisibility: 'hidden',
            transform: axis === 'x' ? 'rotateX(180deg)' : 'rotateY(180deg)',
          }}
        >
          {backText || text}
        </div>
      </motion.div>
    </div>
  );
};