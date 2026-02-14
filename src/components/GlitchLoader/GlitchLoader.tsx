"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export interface GlitchLoaderProps {
  color?: string;
  speed?: number;
  intensity?: number;
}

export const GlitchLoader: React.FC<GlitchLoaderProps> = ({
  color = "#6366f1",
  speed = 0.3,
  intensity = 6,
}) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isGlitching, setIsGlitching] = useState(false);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";
  const [scrambled, setScrambled] = useState("LOADING");

  useEffect(() => {
    const glitch = setInterval(() => {
      setIsGlitching(true);
      setOffset({
        x: (Math.random() - 0.5) * intensity * 2,
        y: (Math.random() - 0.5) * intensity,
      });
      setScrambled(
        "LOADING".split("").map((c) =>
          Math.random() > 0.7 ? chars[Math.floor(Math.random() * chars.length)] : c
        ).join("")
      );
      setTimeout(() => {
        setIsGlitching(false);
        setOffset({ x: 0, y: 0 });
        setScrambled("LOADING");
      }, speed * 100);
    }, speed * 1000 + Math.random() * 500);

    return () => clearInterval(glitch);
  }, [speed, intensity]);

  return (
    <div className="relative inline-block">
      <motion.div
        className="text-3xl font-black font-mono tracking-widest"
        style={{ color }}
        animate={{ x: offset.x, y: offset.y }}
        transition={{ duration: 0.05 }}
      >
        {scrambled}
      </motion.div>

      {isGlitching && (
        <>
          <div
            className="absolute inset-0 text-3xl font-black font-mono tracking-widest opacity-70 mix-blend-screen"
            style={{
              color: "#ff0000",
              transform: `translate(${offset.x - intensity}px, ${offset.y}px)`,
            }}
          >
            {scrambled}
          </div>
          <div
            className="absolute inset-0 text-3xl font-black font-mono tracking-widest opacity-70 mix-blend-screen"
            style={{
              color: "#00ffff",
              transform: `translate(${offset.x + intensity}px, ${offset.y}px)`,
            }}
          >
            {scrambled}
          </div>
        </>
      )}
    </div>
  );
};