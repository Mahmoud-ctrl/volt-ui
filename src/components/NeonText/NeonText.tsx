"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export interface NeonTextProps {
  text: string;
  color?: string;
  flicker?: boolean;
  glow?: number;
  className?: string;
}

export const NeonText: React.FC<NeonTextProps> = ({
  text,
  color = "#00ffff",
  flicker = true,
  glow = 20,
  className = "",
}) => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (!flicker) return;

    const flickerInterval = setInterval(() => {
      if (Math.random() > 0.9) {
        setOpacity(Math.random() * 0.5 + 0.5);
        setTimeout(() => setOpacity(1), 50);
      }
    }, 100);

    return () => clearInterval(flickerInterval);
  }, [flicker]);

  return (
    <motion.div
      className={`text-6xl font-black tracking-wider ${className}`}
      style={{
        color: color,
        textShadow: `
          0 0 ${glow}px ${color},
          0 0 ${glow * 2}px ${color},
          0 0 ${glow * 3}px ${color},
          0 0 ${glow * 4}px ${color}
        `,
        opacity: opacity,
      }}
      animate={{
        textShadow: flicker ? [
          `0 0 ${glow}px ${color}, 0 0 ${glow * 2}px ${color}`,
          `0 0 ${glow * 1.5}px ${color}, 0 0 ${glow * 3}px ${color}`,
          `0 0 ${glow}px ${color}, 0 0 ${glow * 2}px ${color}`,
        ] : undefined,
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {text}
    </motion.div>
  );
};