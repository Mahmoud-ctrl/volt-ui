"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ParticleCardProps {
  title?: string;
  description?: string;
  particleCount?: number;
  color?: string;
  className?: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  angle: number;
  distance: number;
}

export const ParticleCard: React.FC<ParticleCardProps> = ({
  title = "Particle Card",
  description = "Hover to unleash the particles",
  particleCount = 16,
  color = "#6366f1",
  className = "",
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      angle: Math.random() * 360,
      distance: Math.random() * 60 + 20,
    }));
    setParticles(newParticles);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setParticles([]);
  };

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative w-72 rounded-2xl p-6 cursor-pointer overflow-hidden ${className}`}
      style={{
        backgroundColor: "#18181b",
        border: `1px solid ${isHovered ? color + "66" : "rgba(255,255,255,0.05)"}`,
        boxShadow: isHovered ? `0 0 40px ${color}22` : "none",
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
    >
      <AnimatePresence>
        {particles.map((p) => {
          const rad = (p.angle * Math.PI) / 180;
          return (
            <motion.div
              key={p.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: p.size,
                height: p.size,
                backgroundColor: color,
                left: `${p.x}%`,
                top: `${p.y}%`,
              }}
              initial={{ opacity: 0.8, scale: 1, x: 0, y: 0 }}
              animate={{
                opacity: 0,
                scale: 0,
                x: Math.cos(rad) * p.distance,
                y: Math.sin(rad) * p.distance,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          );
        })}
      </AnimatePresence>

      <div className="relative z-10">
        <motion.div
          className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
          style={{ backgroundColor: `${color}22`, border: `1px solid ${color}44` }}
          animate={{ rotate: isHovered ? 180 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
        </motion.div>
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-zinc-400">{description}</p>
      </div>
    </motion.div>
  );
};