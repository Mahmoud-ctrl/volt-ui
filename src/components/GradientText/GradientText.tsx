"use client";

import React from 'react';
import { motion } from 'framer-motion';

export interface GradientTextProps {
  text: string;
  colors?: string[];
  speed?: number;
  angle?: number;
  className?: string;
}

export const GradientText: React.FC<GradientTextProps> = ({
  text,
  colors = ['#ff0080', '#ff8c00', '#40e0d0'],
  speed = 3,
  angle = 45,
  className = "",
}) => {
  const gradientColors = colors.join(', ');

  return (
    <motion.div
      className={`text-6xl font-black ${className}`}
      style={{
        backgroundImage: `linear-gradient(${angle}deg, ${gradientColors})`,
        backgroundSize: '200% 200%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {text}
    </motion.div>
  );
};