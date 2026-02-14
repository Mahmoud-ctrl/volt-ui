"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export interface ProgressLoaderProps {
  color?: string;
  height?: number;
  speed?: number;
  showPercent?: boolean;
  loop?: boolean;
}

export const ProgressLoader: React.FC<ProgressLoaderProps> = ({
  color = "#6366f1",
  height = 8,
  speed = 2,
  showPercent = true,
  loop = true,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!loop) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 1;
      });
    }, (speed * 1000) / 100);
    return () => clearInterval(interval);
  }, [speed, loop]);

  return (
    <div className="flex flex-col items-center gap-3 w-64">
      {showPercent && (
        <div className="flex justify-between w-full">
          <span className="text-xs text-zinc-500 font-mono">Loading...</span>
          <motion.span
            className="text-xs font-mono font-bold"
            style={{ color }}
          >
            {progress}%
          </motion.span>
        </div>
      )}

      {/* Track */}
      <div
        className="relative w-full rounded-full overflow-hidden"
        style={{ height, backgroundColor: `${color}22` }}
      >
        {/* Fill */}
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            backgroundColor: color,
            boxShadow: `0 0 ${height * 2}px ${color}`,
            width: `${progress}%`,
          }}
          transition={{ duration: 0.1, ease: "linear" }}
        />

        {/* Shimmer */}
        <motion.div
          className="absolute inset-y-0 w-20"
          style={{
            background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)`,
            left: `${progress}%`,
          }}
          animate={{ x: [-80, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
};