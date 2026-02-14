"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useNotification, getRandomPhrase } from '@/components/NotificationProvider';

export interface ShimmerButtonProps {
  children: React.ReactNode;
  color?: string;
  shimmerColor?: string;
  speed?: number;
  className?: string;
  onClick?: () => void;
}

export const ShimmerButton: React.FC<ShimmerButtonProps> = ({
  children,
  color = "#3b82f6",
  shimmerColor = "rgba(255, 255, 255, 0.5)",
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
          notify(getRandomPhrase(), "info");
        }
      }}
      className={`relative px-8 py-4 rounded-lg font-bold text-white text-lg overflow-hidden ${className} cursor-pointer`}
      style={{ backgroundColor: color }}
    >
      <motion.div
        className="absolute inset-0 -translate-x-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${shimmerColor}, transparent)`,
        }}
        animate={{
          x: ['0%', '200%'],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <span className="relative z-10">{children}</span>
    </button>
  );
};