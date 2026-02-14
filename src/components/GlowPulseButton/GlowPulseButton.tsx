"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useNotification, getRandomPhrase } from '@/components/NotificationProvider';

export interface GlowPulseButtonProps {
  children: React.ReactNode;
  color?: string;
  glowColor?: string;
  intensity?: number;
  speed?: number;
  className?: string;
  onClick?: () => void;
}

export const GlowPulseButton: React.FC<GlowPulseButtonProps> = ({
  children,
  color = "#3b82f6",
  glowColor = "#3b82f6",
  intensity = 20,
  speed = 2,
  className = "",
  onClick,
}) => {
  const { notify } = useNotification(); 
  return (
    <motion.button
      onClick={() => {
        if (onClick) {
          onClick();
        } else {
          notify(getRandomPhrase(), 'info');
        }
      }}
      className={`px-8 py-4 rounded-lg font-bold text-white text-lg ${className} cursor-pointer`}
      style={{
        backgroundColor: color,
      }}
      animate={{
        boxShadow: [
          `0 0 ${intensity}px ${glowColor}`,
          `0 0 ${intensity * 2}px ${glowColor}`,
          `0 0 ${intensity}px ${glowColor}`,
        ],
      }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};