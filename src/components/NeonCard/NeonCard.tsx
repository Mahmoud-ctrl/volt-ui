"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export interface NeonCardProps {
  title?: string;
  description?: string;
  color?: string;
  flicker?: boolean;
  className?: string;
}

export const NeonCard: React.FC<NeonCardProps> = ({
  title = "Neon Card",
  description = "Cyberpunk-style card with neon glow effects",
  color = "#00ffff",
  flicker = true,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.03, y: -4 }}
      className={`relative w-72 rounded-2xl p-6 cursor-pointer overflow-hidden ${className}`}
      style={{ backgroundColor: "#050505" }}
      animate={{
        boxShadow: isHovered
          ? [
              `0 0 20px ${color}66, inset 0 0 20px ${color}11`,
              `0 0 40px ${color}88, inset 0 0 30px ${color}22`,
              `0 0 20px ${color}66, inset 0 0 20px ${color}11`,
            ]
          : `0 0 0px transparent`,
      }}
      transition={{
        scale: { type: "spring", stiffness: 300, damping: 20 },
        y: { type: "spring", stiffness: 300, damping: 20 },
        boxShadow: {
          duration: flicker ? 1.5 : 0.3,
          repeat: isHovered && flicker ? Infinity : 0,
          ease: "easeInOut",
        },
      }}
    >
      {/* Neon corner accents */}
      {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos, i) => (
        <motion.div
          key={i}
          className={`absolute w-4 h-4 ${pos}`}
          style={{
            borderTop: i < 2 ? `2px solid ${color}` : "none",
            borderBottom: i >= 2 ? `2px solid ${color}` : "none",
            borderLeft: i % 2 === 0 ? `2px solid ${color}` : "none",
            borderRight: i % 2 === 1 ? `2px solid ${color}` : "none",
            borderRadius: i === 0 ? "16px 0 0 0" : i === 1 ? "0 16px 0 0" : i === 2 ? "0 0 0 16px" : "0 0 16px 0",
          }}
          animate={{ opacity: isHovered ? [0.5, 1, 0.5] : 0.3 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      ))}

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)",
        }}
      />

      <div className="relative z-10">
        <motion.div
          className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
          style={{
            backgroundColor: `${color}11`,
            border: `1px solid ${color}`,
            boxShadow: `0 0 10px ${color}66`,
          }}
          animate={{
            boxShadow: isHovered
              ? [`0 0 10px ${color}66`, `0 0 20px ${color}99`, `0 0 10px ${color}66`]
              : `0 0 5px ${color}44`,
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
          />
        </motion.div>

        <h3
          className="text-lg font-bold mb-2"
          style={{
            color,
            textShadow: `0 0 10px ${color}`,
          }}
        >
          {title}
        </h3>
        <p className="text-sm" style={{ color: `${color}99` }}>
          {description}
        </p>

        <motion.div
          className="mt-4 h-px"
          style={{
            background: `linear-gradient(90deg, ${color}, transparent)`,
            boxShadow: `0 0 8px ${color}`,
          }}
          animate={{ opacity: isHovered ? [0.5, 1, 0.5] : 0.3 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
};