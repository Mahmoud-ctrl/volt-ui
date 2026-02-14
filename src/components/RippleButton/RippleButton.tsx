"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotification, getRandomPhrase } from '@/components/NotificationProvider';

export interface RippleButtonProps {
  children: React.ReactNode;
  color?: string;
  rippleColor?: string;
  className?: string;
  onClick?: () => void;
}

interface Ripple {
  x: number;
  y: number;
  id: number;
}

export const RippleButton: React.FC<RippleButtonProps> = ({
  children,
  color = "#3b82f6",
  rippleColor = "rgba(255, 255, 255, 0.6)",
  className = "",
  onClick,
}) => {
  const { notify } = useNotification();
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = {
      x,
      y,
      id: Date.now(),
    };

    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);

    if (onClick) {
      onClick();
    } else {
      notify(getRandomPhrase(), "info");
    }
  };


  return (
    <button
      onClick={handleClick}
      className={`relative overflow-hidden px-8 py-4 rounded-lg font-bold text-white text-lg ${className} cursor-pointer`}
      style={{ backgroundColor: color }}
    >
      {children}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              backgroundColor: rippleColor,
            }}
            initial={{ width: 0, height: 0, opacity: 1 }}
            animate={{ width: 400, height: 400, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </button>
  );
};