"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export interface SplitTextProps {
  text: string;
  direction?: 'horizontal' | 'vertical';
  distance?: number;
  speed?: number;
  className?: string;
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  direction = 'horizontal',
  distance = 50,
  speed = 0.6,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const midpoint = Math.ceil(text.length / 2);
  const firstHalf = text.slice(0, midpoint);
  const secondHalf = text.slice(midpoint);

  const getOffset = () => {
    if (!isHovered) return { x: 0, y: 0 };
    return direction === 'horizontal' 
      ? { x: -distance / 2, y: 0 }
      : { x: 0, y: -distance / 2 };
  };

  const offset = getOffset();

  return (
    <div
      className={`relative inline-block cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.span
        className="text-6xl font-black inline-block"
        animate={{
          x: direction === 'horizontal' ? offset.x : 0,
          y: direction === 'vertical' ? offset.y : 0,
        }}
        transition={{ duration: speed, ease: "easeInOut" }}
      >
        {firstHalf}
      </motion.span>
      <motion.span
        className="text-6xl font-black inline-block"
        animate={{
          x: direction === 'horizontal' ? -offset.x : 0,
          y: direction === 'vertical' ? -offset.y : 0,
        }}
        transition={{ duration: speed, ease: "easeInOut" }}
      >
        {secondHalf}
      </motion.span>
    </div>
  );
};