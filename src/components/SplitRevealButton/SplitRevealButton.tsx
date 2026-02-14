"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNotification, getRandomPhrase } from '@/components/NotificationProvider';

export interface SplitRevealButtonProps {
  children: React.ReactNode;
  hoverText?: string;
  color?: string;
  hoverColor?: string;
  speed?: number;
  className?: string;
  onClick?: () => void;
}

export const SplitRevealButton: React.FC<SplitRevealButtonProps> = ({
  children,
  hoverText,
  color = "#3b82f6",
  hoverColor = "#8b5cf6",
  speed = 0.3,
  className = "",
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const displayText = hoverText || children;
  const { notify } = useNotification();

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        if (onClick) {
          onClick();
        } else {
          notify(getRandomPhrase(), "info");
        }
      }}
      className={`relative px-8 py-4 rounded-lg font-bold text-white text-lg overflow-hidden ${className} cursor-pointer`}
      style={{ backgroundColor: isHovered ? hoverColor : color }}
    >
      <div className="relative h-6 w-8 flex items-center justify-center">
        {/* Original Text - Top Half */}
        <motion.span
          className="absolute"
          initial={{ y: 0, opacity: 1 }}
          animate={{
            y: isHovered ? -30 : 0,
            opacity: isHovered ? 0 : 1,
          }}
          transition={{ duration: speed, ease: "easeInOut" }}
        >
          {children}
        </motion.span>

        {/* Hover Text - Bottom Half */}
        <motion.span
          className="absolute"
          initial={{ y: 30, opacity: 0 }}
          animate={{
            y: isHovered ? 0 : 30,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: speed, ease: "easeInOut" }}
        >
          {displayText}
        </motion.span>
      </div>
    </button>
  );
};