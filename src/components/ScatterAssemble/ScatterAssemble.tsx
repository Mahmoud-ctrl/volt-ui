"use client";
import React from 'react';
import { motion } from 'framer-motion';

export interface ScatterTextProps {
  text: string;
  scatterRange?: number;
  duration?: number;
  stagger?: number;
  className?: string;
}

export const ScatterAssemble: React.FC<ScatterTextProps> = ({
  text,
  scatterRange = 200,
  duration = 0.8,
  stagger = 0.03,
  className = "",
}) => {
  const letters = text.split("");

  return (
    <motion.div 
      className={`flex flex-wrap justify-center overflow-hidden py-10 ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {letters.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block text-6xl font-black text-white"
          style={{ whiteSpace: 'pre' }}
          variants={{
            hidden: { 
              opacity: 0, 
              x: (Math.random() - 0.5) * scatterRange * 2,
              y: (Math.random() - 0.5) * scatterRange * 2,
              rotate: Math.random() * 90 - 45,
              scale: 2
            },
            visible: { 
              opacity: 1, 
              x: 0, 
              y: 0, 
              rotate: 0, 
              scale: 1,
              transition: { 
                type: "spring", 
                damping: 12, 
                stiffness: 100,
                delay: i * stagger 
              }
            }
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};