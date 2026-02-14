"use client";
import React from 'react';
import { motion } from 'framer-motion';

export interface LiquidTextProps {
  text: string;
  blur?: number;
  speed?: number;
  className?: string;
}

export const LiquidText: React.FC<LiquidTextProps> = ({
  text,
  blur = 10,
  speed = 2,
  className = "",
}) => {
  return (
    <div className={`relative ${className}`}>
      {/* SVG Filter Definition */}
      <svg className="absolute h-0 w-0">
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation={blur} result="blur" />
          <feColorMatrix 
            in="blur" 
            mode="matrix" 
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" 
            result="goo" 
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </svg>

      <motion.div 
        className="flex justify-center"
        style={{ filter: 'url(#goo)' }}
      >
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            className="text-7xl font-black text-white inline-block"
            initial={{ y: -20, opacity: 0, scale: 0.5 }}
            animate={{ 
              y: [0, -10, 0],
              opacity: 1, 
              scale: 1 
            }}
            transition={{
              y: {
                duration: speed,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.1
              },
              opacity: { duration: 0.5, delay: i * 0.1 }
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};