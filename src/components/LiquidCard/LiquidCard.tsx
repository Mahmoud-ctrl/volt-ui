"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export interface LiquidCardProps {
  title?: string;
  description?: string;
  liquidColor?: string;
  className?: string;
}

export const LiquidCard: React.FC<LiquidCardProps> = ({
  title = "Liquid Metal",
  description = "A true organic fluid effect using SVG filters.",
  liquidColor = "#c084fc",
  className = "",
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.01 }}
      className={`relative w-80 h-96 rounded-3xl overflow-hidden bg-slate-950 border border-white/10 ${className}`}
    >
      {/* SVG Filter Definition - This is the "Magic" secret sauce */}
      <svg className="hidden">
        <defs>
          <filter id="liquid-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix 
              in="blur" 
              mode="matrix" 
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" 
              result="goo" 
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Liquid Container */}
      <div 
        className="absolute inset-0 z-0" 
        style={{ filter: 'url(#liquid-goo)' }}
      >
        {/* The "Follower" Blob */}
        <motion.div
          className="absolute rounded-full"
          style={{
            background: liquidColor,
            width: 150,
            height: 150,
            left: -75,
            top: -75,
            filter: 'blur(5px)',
          }}
          animate={{
            x: mousePos.x,
            y: mousePos.y,
            scale: isHovered ? 1.2 : 0,
            opacity: isHovered ? 0.8 : 0,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 150 }}
        />

        {/* Persistent Floating Blobs */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              background: liquidColor,
              width: 100 + i * 20,
              height: 100 + i * 20,
              opacity: 0.6,
            }}
            animate={{
              x: [20 + i * 40, 150 + i * 10, 20 + i * 40],
              y: [50 + i * 20, 250 - i * 20, 50 + i * 20],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Glass Overlay for Content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent">
        <div className="backdrop-blur-sm bg-white/5 border border-white/10 p-6 rounded-2xl">
          <motion.h3 
            className="text-xl font-bold text-white mb-2"
            animate={{ color: isHovered ? liquidColor : "#ffffff" }}
          >
            {title}
          </motion.h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            {description}
          </p>
          
          <div className="mt-4 flex items-center gap-2">
             <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full"
                  style={{ backgroundColor: liquidColor }}
                  initial={{ width: "0%" }}
                  animate={{ width: isHovered ? "100%" : "30%" }}
                />
             </div>
          </div>
        </div>
      </div>

      {/* Shine/Reflection effect */}
      <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-br from-white/5 to-transparent" />
    </motion.div>
  );
};