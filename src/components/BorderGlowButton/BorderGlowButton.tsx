"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useNotification, getRandomPhrase } from '@/components/NotificationProvider';

export interface BorderGlowButtonProps {
  children: React.ReactNode;
  color?: string;
  glowColor?: string;
  speed?: number;
  className?: string;
  onClick?: () => void;
}

export const BorderGlowButton: React.FC<BorderGlowButtonProps> = ({
  children,
  color = "#000000",
  glowColor = "#3b82f6",
  speed = 2,
  className = "",
  onClick,
}) => {
  const { notify } = useNotification();

  return (
    <button
      onClick={() => {
        if (onClick) {
          onClick();
        } else {
          notify(getRandomPhrase(), 'info');
        }
      }}
      className={`relative px-8 py-4 rounded-lg font-bold text-white text-lg ${className} cursor-pointer`}
      style={{ backgroundColor: color }}
    >
      <motion.div
        className="absolute inset-0 rounded-lg"
        style={{
          padding: '2px',
          background: `linear-gradient(90deg, ${glowColor}, transparent, ${glowColor})`,
          backgroundSize: '200% 100%',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '200% 0%'],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div 
          className="w-full h-full rounded-lg" 
          style={{ backgroundColor: color }}
        />
      </motion.div>
      <span className="relative z-10">{children}</span>
    </button>
  );
};