"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNotification, getRandomPhrase } from '@/components/NotificationProvider';

export interface ExpandButtonProps {
  children: React.ReactNode;
  expandedText?: string;
  color?: string;
  speed?: number;
  className?: string;
  onClick?: () => void;
}

export const ExpandButton: React.FC<ExpandButtonProps> = ({
  children,
  expandedText,
  color = "#3b82f6",
  speed = 0.3,
  className = "",
  onClick,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { notify } = useNotification();

  return (
    <motion.button
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      onClick={() => {
        if (onClick) {
          onClick();
        } else {
          notify(getRandomPhrase(), "info");
        }
      }}
      className={`px-8 py-4 rounded-lg font-bold text-white text-lg overflow-hidden ${className} cursor-pointer`}
      style={{ backgroundColor: color }}
      animate={{
        width: isExpanded ? 'auto' : 'auto',
      }}
      transition={{ duration: speed, ease: "easeInOut" }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div className="flex items-center gap-2">
        <span>{children}</span>
        <motion.span
          initial={{ width: 0, opacity: 0 }}
          animate={{
            width: isExpanded ? 'auto' : 0,
            opacity: isExpanded ? 1 : 0,
          }}
          transition={{ duration: speed }}
          className="whitespace-nowrap overflow-hidden"
        >
          {expandedText && `→ ${expandedText}`}
        </motion.span>
      </motion.div>
    </motion.button>
  );
};