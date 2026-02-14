"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export interface StackCardProps {
  title?: string;
  description?: string;
  stackCount?: number;
  color?: string;
  spread?: number;
  className?: string;
}

export const StackCard: React.FC<StackCardProps> = ({
  title = "Stack Card",
  description = "Hover to fan out the card stack",
  stackCount = 3,
  color = "#6366f1",
  spread = 12,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const stackColors = [color, `${color}cc`, `${color}88`];

  return (
    <div
      className={`relative w-72 cursor-pointer ${className}`}
      style={{ height: "180px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {Array.from({ length: stackCount }).reverse().map((_, reverseI) => {
        const i = stackCount - 1 - reverseI;
        const isTop = i === 0;

        return (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-2xl p-6"
            style={{
              backgroundColor: i === 0 ? "#18181b" : `${color}${i === 1 ? "22" : "11"}`,
              border: `1px solid ${stackColors[i] || color}44`,
              zIndex: stackCount - i,
            }}
            animate={{
              rotate: isHovered ? (i === 0 ? 0 : i % 2 === 0 ? spread * i : -spread * i) : i * 2,
              y: isHovered ? i * -8 : i * -4,
              scale: isHovered ? 1 - i * 0.02 : 1 - i * 0.03,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25, delay: i * 0.05 }}
          >
            {isTop && (
              <div className="relative z-10">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${color}22`, border: `1px solid ${color}44` }}
                >
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
                </div>
                <h3 className="text-lg font-bold text-white">{title}</h3>
                <p className="text-sm text-zinc-400 mt-1">{description}</p>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};