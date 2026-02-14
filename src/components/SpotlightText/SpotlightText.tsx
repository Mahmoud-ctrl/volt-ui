"use client";
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export interface SpotlightTextProps {
  text: string;
  radius?: number;
  spotlightColor?: string;
  className?: string;
}

export const SpotlightText: React.FC<SpotlightTextProps> = ({
  text,
  radius = 150,
  spotlightColor = "rgba(255,255,255,0.2)",
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - left,
      y: e.clientY - top
    });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative cursor-default select-none ${className}`}
    >
      {/* Background (Dark) Text */}
      <h1 className="text-6xl font-black text-white/10 uppercase tracking-tighter">
        {text}
      </h1>

      {/* Spotlight revealed text */}
      <motion.h1 
        className="absolute inset-0 text-6xl font-black text-white uppercase tracking-tighter"
        style={{
          clipPath: `circle(${radius}px at ${mousePos.x}px ${mousePos.y}px)`,
          textShadow: `0 0 20px ${spotlightColor}`
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {text}
      </motion.h1>
    </div>
  );
};