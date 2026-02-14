"use client";
import React, { useState } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

export interface PortalCardProps {
  title?: string;
  description?: string;
  portalColor?: string;
  className?: string;
}

export const PortalCard: React.FC<PortalCardProps> = ({
  title = "Event Horizon",
  description = "A window into the quantum realm.",
  portalColor = "#8b5cf6",
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Smooth spring physics for the tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  // Map mouse position to rotation degrees
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXRelative = e.clientX - rect.left;
    const mouseYRelative = e.clientY - rect.top;
    
    x.set(mouseXRelative / width - 0.5);
    y.set(mouseYRelative / height - 0.5);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1200px",
      }}
      className={`relative w-80 h-96 cursor-pointer group ${className}`}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full bg-slate-950 rounded-3xl border border-white/10 shadow-2xl transition-shadow duration-500 group-hover:shadow-[0_0_50px_-12px_rgba(139,92,246,0.5)]"
      >
        {/* The "Internal" Void Space */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          {/* Depth Rings */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 border-[2px] rounded-full opacity-20"
              style={{
                borderColor: portalColor,
                transform: `translateZ(${(i + 1) * -40}px) scale(${1 - i * 0.1})`,
                filter: `blur(${i}px)`,
              }}
              animate={isHovered ? {
                rotate: i % 2 === 0 ? 360 : -360,
                scale: [1 - i * 0.1, 1.1 - i * 0.1, 1 - i * 0.1],
              } : {}}
              transition={{
                rotate: { duration: 10 + i * 5, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            />
          ))}

          {/* Central Singularity */}
          <motion.div 
            className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: `radial-gradient(circle, ${portalColor} 0%, transparent 70%)`,
              transform: "translateZ(-250px)",
              filter: "blur(20px)",
            }}
            animate={{
              opacity: isHovered ? 0.8 : 0.4,
              scale: isHovered ? 1.5 : 1,
            }}
          />
        </div>

        {/* Floating Glass UI Layer */}
        <div 
          className="absolute inset-0 p-8 flex flex-col justify-between"
          style={{ transform: "translateZ(50px)" }} // Pops out towards user
        >
          {/* Top Icon Area */}
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md">
               <div className="w-4 h-4 rounded-full border-2" style={{ borderColor: portalColor }} />
            </div>
            <div className="text-[10px] uppercase tracking-widest text-white/40 font-mono">
              Sector // 7G
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-2">
            <motion.h3 
              className="text-2xl font-bold text-white tracking-tight"
              style={{ textShadow: "0 4px 10px rgba(0,0,0,0.5)" }}
            >
              {title}
            </motion.h3>
            <p className="text-sm text-white/60 leading-relaxed">
              {description}
            </p>
            
            <motion.div 
              className="pt-4 flex items-center gap-3 text-xs font-mono"
              animate={{ color: isHovered ? portalColor : "#94a3b8" }}
            >
              <span className="h-px w-8 bg-current opacity-50" />
              ENTER DIMENSION
            </motion.div>
          </div>
        </div>

        {/* Outer Frame Glow */}
        <div 
          className="absolute inset-0 rounded-3xl border-2 border-transparent transition-colors duration-500 group-hover:border-white/20 pointer-events-none" 
          style={{ transform: "translateZ(20px)" }}
        />
      </motion.div>
    </motion.div>
  );
};