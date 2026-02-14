"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotification, getRandomPhrase } from '@/components/NotificationProvider';

export interface ParticleButtonProps {
  children: React.ReactNode;
  color?: string;
  particleColor?: string;
  particleCount?: number;
  className?: string;
  onClick?: () => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
}

export const ParticleButton: React.FC<ParticleButtonProps> = ({
  children,
  color = "#3b82f6",
  particleColor = "#60a5fa",
  particleCount = 12,
  className = "",
  onClick,
}) => {
  const { notify } = useNotification();
  const [particles, setParticles] = useState<Particle[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: Date.now() + i,
      x: centerX,
      y: centerY,
      angle: (360 / particleCount) * i,
    }));

    setParticles(newParticles);

    setTimeout(() => {
      setParticles([]);
    }, 1000);

    if (onClick) {
      onClick();
    } else {
      notify(getRandomPhrase(), "info");
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`relative px-8 py-4 rounded-lg font-bold text-white text-lg overflow-visible ${className} cursor-pointer`}
      style={{ backgroundColor: color }}
    >
      <motion.span
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-block"
      >
        {children}
      </motion.span>

      <AnimatePresence>
        {particles.map((particle) => {
          const distance = 100;
          const radian = (particle.angle * Math.PI) / 180;
          const x = Math.cos(radian) * distance;
          const y = Math.sin(radian) * distance;

          return (
            <motion.div
              key={particle.id}
              className="absolute w-2 h-2 rounded-full pointer-events-none"
              style={{
                backgroundColor: particleColor,
                left: particle.x,
                top: particle.y,
              }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{
                x,
                y,
                opacity: 0,
                scale: 0,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          );
        })}
      </AnimatePresence>
    </button>
  );
};