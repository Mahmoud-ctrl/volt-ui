"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNotification, getRandomPhrase } from '@/components/NotificationProvider';

export interface LiquidFillButtonProps {
  children: React.ReactNode;
  fillColor?: string;
  textColor?: string;
  borderColor?: string;
  speed?: number;
  className?: string;
  onClick?: () => void;
}

export const LiquidFillButton: React.FC<LiquidFillButtonProps> = ({
  children,
  fillColor = "#3b82f6",
  textColor = "#ffffff",
  borderColor = "#3b82f6",
  speed = 0.4,
  className = "",
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
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
      className={`relative px-8 py-4 rounded-lg font-bold text-lg overflow-hidden ${className} cursor-pointer`}
      style={{
        border: `2px solid ${borderColor}`,
        color: isHovered ? textColor : borderColor,
      }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ backgroundColor: fillColor }}
        initial={{ y: '100%' }}
        animate={{ y: isHovered ? '0%' : '100%' }}
        transition={{ duration: speed, ease: "easeInOut" }}
      />
      <span className="relative z-10">{children}</span>
    </button>
  );
};