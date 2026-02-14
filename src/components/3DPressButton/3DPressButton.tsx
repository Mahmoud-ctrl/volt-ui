"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNotification, getRandomPhrase } from '@/components/NotificationProvider';

export interface PressButtonProps {
  children: React.ReactNode;
  color?: string;
  shadowColor?: string;
  depth?: number;
  className?: string;
  onClick?: () => void;
}

export const PressButton: React.FC<PressButtonProps> = ({
  children,
  color = "#3b82f6",
  shadowColor = "#1e40af",
  depth = 8,
  className = "",
  onClick,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const { notify } = useNotification();

  return (
    <motion.button
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onClick={() => {
        if (onClick) {
          onClick();
        } else {
          notify(getRandomPhrase(), "info");
        }
      }}
      className={`px-8 py-4 rounded-lg font-bold text-white text-lg relative ${className} cursor-pointer`}
      style={{
        backgroundColor: color,
        boxShadow: isPressed 
          ? `0 2px 0 ${shadowColor}`
          : `0 ${depth}px 0 ${shadowColor}`,
        transform: isPressed ? `translateY(${depth - 2}px)` : 'translateY(0)',
        transition: 'all 0.1s ease',
      }}
      whileHover={{ scale: 1.02 }}
    >
      {children}
    </motion.button>
  );
};