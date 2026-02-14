"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export interface GlitchTextProps {
  text: string;
  intensity?: number;
  speed?: number;
  colors?: boolean;
  className?: string;
}

export const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  intensity = 5,
  speed = 0.3,
  colors = true,
  className = "",
}) => {
  const [glitchOffset, setGlitchOffset] = useState({ x: 0, y: 0 });
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setGlitchOffset({
        x: (Math.random() - 0.5) * intensity * 2,
        y: (Math.random() - 0.5) * intensity * 2,
      });

      setTimeout(() => {
        setIsGlitching(false);
        setGlitchOffset({ x: 0, y: 0 });
      }, speed * 100);
    }, speed * 1000 + Math.random() * 1000);

    return () => clearInterval(glitchInterval);
  }, [intensity, speed]);

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Main text */}
      <motion.div
        className="text-6xl font-black tracking-tighter text-white relative z-10"
        animate={{
          x: glitchOffset.x,
          y: glitchOffset.y,
        }}
        transition={{
          duration: 0.05,
          ease: "linear",
        }}
      >
        {text}
      </motion.div>

      {/* Glitch layers with color distortion */}
      {colors && isGlitching && (
        <>
          <motion.div
            className="text-6xl font-black tracking-tighter text-red-500 absolute top-0 left-0 opacity-70 mix-blend-screen"
            style={{
              transform: `translate(${glitchOffset.x - intensity}px, ${glitchOffset.y}px)`,
            }}
          >
            {text}
          </motion.div>
          <motion.div
            className="text-6xl font-black tracking-tighter text-cyan-500 absolute top-0 left-0 opacity-70 mix-blend-screen"
            style={{
              transform: `translate(${glitchOffset.x + intensity}px, ${glitchOffset.y}px)`,
            }}
          >
            {text}
          </motion.div>
        </>
      )}

      {/* Scanline effect */}
      {isGlitching && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: speed * 0.3 }}
        >
          <div className="h-full w-full bg-gradient-to-b from-transparent via-white to-transparent opacity-10" 
               style={{ 
                 backgroundSize: '100% 4px',
                 backgroundRepeat: 'repeat',
               }}
          />
        </motion.div>
      )}
    </div>
  );
};