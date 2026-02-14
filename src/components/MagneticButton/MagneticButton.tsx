"use client";
import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useNotification, getRandomPhrase } from '@/components/NotificationProvider';

export interface MagneticButtonProps {
  children: React.ReactNode;
  strength?: number;
  color?: string;
  className?: string;
  onClick?: () => void;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  strength = 0.3,
  color = "#3b82f6",
  className = "",
  onClick,
}) => {
  const { notify } = useNotification();

  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useSpring(0, { stiffness: 150, damping: 15 });
  const y = useSpring(0, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    x.set((clientX - centerX) * strength);
    y.set((clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        if (onClick) {
          onClick();
        } else {
          notify(getRandomPhrase(), "info");
        }
      }}
      style={{ x, y, backgroundColor: color }}
      className={`px-8 py-4 rounded-lg font-bold text-white text-lg relative overflow-hidden ${className} cursor-pointer`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-0 bg-white/20"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};