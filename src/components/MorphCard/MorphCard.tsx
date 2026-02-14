"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export interface MorphCardProps {
  title?: string;
  description?: string;
  color?: string;
  speed?: number;
  className?: string;
}

export const MorphCard: React.FC<MorphCardProps> = ({
  title = "Morph Card",
  description = "Watch the border morph and breathe on hover",
  color = "#6366f1",
  speed = 3,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const borderRadii = [
    "30% 70% 70% 30% / 30% 30% 70% 70%",
    "50% 50% 30% 70% / 50% 70% 30% 50%",
    "70% 30% 50% 50% / 30% 50% 70% 50%",
    "30% 70% 70% 30% / 30% 30% 70% 70%",
  ];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-72 cursor-pointer ${className}`}
    >
      {/* Morphing glow bg */}
      <motion.div
        className="absolute inset-0 blur-xl opacity-40"
        style={{ backgroundColor: color }}
        animate={{
          borderRadius: isHovered ? borderRadii : "16px",
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{
          duration: speed,
          repeat: isHovered ? Infinity : 0,
          ease: "easeInOut",
        }}
      />

      {/* Main card */}
      <motion.div
        className="relative p-6 overflow-hidden"
        style={{ backgroundColor: "#18181b" }}
        animate={{
          borderRadius: isHovered ? borderRadii : "16px",
          border: isHovered
            ? `1px solid ${color}88`
            : "1px solid rgba(255,255,255,0.05)",
        }}
        transition={{
          duration: speed,
          repeat: isHovered ? Infinity : 0,
          ease: "easeInOut",
        }}
      >
        {/* Inner shimmer */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${color}11, transparent, ${color}11)`,
          }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <div className="relative z-10">
          <motion.div
            className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
            style={{ backgroundColor: `${color}22`, border: `1px solid ${color}44` }}
            animate={{
              borderRadius: isHovered ? ["12px", "50%", "12px"] : "12px",
            }}
            transition={{ duration: speed, repeat: isHovered ? Infinity : 0 }}
          >
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
          </motion.div>
          <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
          <p className="text-sm text-zinc-400">{description}</p>
        </div>
      </motion.div>
    </div>
  );
};