"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ExpandCardProps {
  title?: string;
  description?: string;
  expandedContent?: string;
  color?: string;
  speed?: number;
  className?: string;
}

export const ExpandCard: React.FC<ExpandCardProps> = ({
  title = "Expand Card",
  description = "Hover to reveal hidden content below",
  expandedContent = "This is the hidden content that appears when you hover! You can put anything here - stats, actions, links, or more details.",
  color = "#6366f1",
  speed = 0.4,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-72 rounded-2xl overflow-hidden cursor-pointer ${className}`}
      style={{
        backgroundColor: "#18181b",
        border: `1px solid ${isHovered ? color + "55" : "rgba(255,255,255,0.05)"}`,
        transition: "border-color 0.3s",
        boxShadow: isHovered ? `0 20px 40px ${color}22` : "none",
      }}
    >
      {/* Top color bar */}
      <motion.div
        className="h-1 w-full"
        style={{ backgroundColor: color }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        initial={{ scaleX: 0 }}
        transition={{ duration: speed }}
      />

      <div className="p-6">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
          style={{ backgroundColor: `${color}22`, border: `1px solid ${color}44` }}
        >
          <motion.div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: color }}
            animate={{ scale: isHovered ? 1.3 : 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </div>

        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-zinc-400">{description}</p>

        {/* Expanded content */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: speed, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div
                className="pt-4 border-t text-sm text-zinc-300 leading-relaxed"
                style={{ borderColor: `${color}33` }}
              >
                {expandedContent}
              </div>

              <motion.button
                className="mt-4 px-4 py-2 rounded-lg text-xs font-bold text-white"
                style={{ backgroundColor: color }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More →
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};