"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export interface FlipCardProps {
  frontTitle?: string;
  frontDescription?: string;
  backTitle?: string;
  backDescription?: string;
  speed?: number;
  color?: string;
  className?: string;
}

export const FlipCard: React.FC<FlipCardProps> = ({
  frontTitle = "Hover Me",
  frontDescription = "There's something on the other side...",
  backTitle = "Surprise!",
  backDescription = "You found the back of the card!",
  speed = 0.6,
  color = "#6366f1",
  className = "",
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`relative w-72 h-48 cursor-pointer ${className}`}
      style={{ perspective: 1000 }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: speed, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl p-6 flex flex-col justify-between"
          style={{
            backfaceVisibility: "hidden",
            backgroundColor: "#18181b",
            border: `1px solid ${color}33`,
          }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${color}22`, border: `1px solid ${color}44` }}
          >
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{frontTitle}</h3>
            <p className="text-sm text-zinc-400 mt-1">{frontDescription}</p>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl p-6 flex flex-col justify-between"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            backgroundColor: color,
            border: `1px solid ${color}`,
          }}
        >
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{backTitle}</h3>
            <p className="text-sm text-white/70 mt-1">{backDescription}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};