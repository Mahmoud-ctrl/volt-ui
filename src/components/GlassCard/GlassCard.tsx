"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export interface GlassCardProps {
  title?: string;
  description?: string;
  blur?: number;
  opacity?: number;
  borderOpacity?: number;
  color?: string;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  title = "Glass Card",
  description = "A beautiful glassmorphism card with blur and transparency",
  blur = 12,
  opacity = 10,
  borderOpacity = 20,
  color = "#6366f1",
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative w-72 rounded-2xl p-6 cursor-pointer overflow-hidden ${className}`}
      style={{
        backdropFilter: `blur(${blur}px)`,
        backgroundColor: `rgba(255,255,255,${opacity / 100})`,
        border: `1px solid rgba(255,255,255,${borderOpacity / 100})`,
        boxShadow: isHovered
          ? `0 20px 60px ${color}33, 0 0 0 1px ${color}22`
          : `0 8px 32px rgba(0,0,0,0.3)`,
      }}
    >
      {/* Background orb */}
      <motion.div
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-20 blur-2xl"
        style={{ backgroundColor: color }}
        animate={{ scale: isHovered ? 1.5 : 1 }}
        transition={{ duration: 0.4 }}
      />

      <div className="relative z-10">
        <motion.div
          className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
          style={{ backgroundColor: `${color}33`, border: `1px solid ${color}55` }}
          animate={{ rotate: isHovered ? 10 : 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
        </motion.div>

        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-white/50">{description}</p>

        <motion.div
          className="mt-4 flex items-center gap-2 text-xs font-semibold"
          style={{ color }}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
          transition={{ duration: 0.2 }}
        >
          Learn more →
        </motion.div>
      </div>
    </motion.div>
  );
};