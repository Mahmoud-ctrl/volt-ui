"use client";
import React, { useRef, useState } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

export interface MagneticTextProps {
  text: string;
  strength?: number;
  className?: string;
}

const MagneticLetter = ({ char, strength }: { char: string, strength: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Calculate distance and pull
    x.set((clientX - centerX) * strength);
    y.set((clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY, display: 'inline-block', whiteSpace: 'pre' }}
      className="text-6xl font-black text-white cursor-pointer"
    >
      {char}
    </motion.span>
  );
};

export const MagneticText: React.FC<MagneticTextProps> = ({ text, strength = 0.5, className = "" }) => {
  return (
    <div className={`flex justify-center gap-1 ${className}`}>
      {text.split("").map((char, i) => (
        <MagneticLetter key={i} char={char} strength={strength} />
      ))}
    </div>
  );
};