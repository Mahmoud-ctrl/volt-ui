"use client";
import React from 'react';
import { motion } from 'framer-motion';

export interface SkeletonLoaderProps {
  color?: string;
  shimmerColor?: string;
  speed?: number;
  rows?: number;
  showAvatar?: boolean;
}

const SkeletonBlock = ({
  width,
  height,
  color,
  shimmerColor,
  speed,
  delay = 0,
}: {
  width: string;
  height: number;
  color: string;
  shimmerColor: string;
  speed: number;
  delay?: number;
}) => (
  <div
    className="relative overflow-hidden rounded-lg"
    style={{ width, height, backgroundColor: color }}
  >
    <motion.div
      className="absolute inset-0"
      style={{
        background: `linear-gradient(90deg, transparent 0%, ${shimmerColor} 50%, transparent 100%)`,
        backgroundSize: "200% 100%",
      }}
      animate={{ backgroundPosition: ["-200% 0%", "200% 0%"] }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: "linear",
        delay,
      }}
    />
  </div>
);

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  color = "#27272a",
  shimmerColor = "rgba(255,255,255,0.06)",
  speed = 1.5,
  rows = 3,
  showAvatar = true,
}) => {
  return (
    <div className="flex flex-col gap-4 w-72 p-4 rounded-2xl border border-white/5 bg-zinc-900/50">
      {/* Header row */}
      <div className="flex items-center gap-3">
        {showAvatar && (
          <SkeletonBlock
            width="40px"
            height={40}
            color={color}
            shimmerColor={shimmerColor}
            speed={speed}
          />
        )}
        <div className="flex flex-col gap-2 flex-1">
          <SkeletonBlock
            width="60%"
            height={12}
            color={color}
            shimmerColor={shimmerColor}
            speed={speed}
            delay={0.1}
          />
          <SkeletonBlock
            width="40%"
            height={10}
            color={color}
            shimmerColor={shimmerColor}
            speed={speed}
            delay={0.2}
          />
        </div>
      </div>

      {/* Content rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonBlock
          key={i}
          width={i === rows - 1 ? "75%" : "100%"}
          height={10}
          color={color}
          shimmerColor={shimmerColor}
          speed={speed}
          delay={i * 0.1}
        />
      ))}

      {/* Bottom image placeholder */}
      <SkeletonBlock
        width="100%"
        height={120}
        color={color}
        shimmerColor={shimmerColor}
        speed={speed}
        delay={0.3}
      />
    </div>
  );
};