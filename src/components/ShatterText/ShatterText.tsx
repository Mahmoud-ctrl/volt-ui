"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export interface ShatterTextProps {
  text: string;
  explosive?: boolean;
  speed?: number;
  scatter?: number;
  className?: string;
}

export const ShatterText: React.FC<ShatterTextProps> = ({
  text,
  explosive = true,
  speed = 0.5,
  scatter = 100,
  className = "",
}) => {
  const [isShattered, setIsShattered] = useState(false);

  return (
    <div 
      className={`relative inline-block cursor-pointer ${className}`}
      onMouseEnter={() => setIsShattered(true)}
      onMouseLeave={() => setIsShattered(false)}
    >
      {text.split('').map((char, i) => {
        const angle = (Math.PI * 2 * i) / text.length;
        const distance = isShattered ? scatter : 0;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        return (
          <motion.span
            key={i}
            className="text-6xl font-black inline-block"
            animate={{
              x: explosive ? x : 0,
              y: explosive ? y : 0,
              opacity: isShattered ? 0 : 1,
              rotate: isShattered ? Math.random() * 360 - 180 : 0,
            }}
            transition={{
              duration: speed,
              ease: "easeOut",
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        );
      })}
    </div>
  );
};