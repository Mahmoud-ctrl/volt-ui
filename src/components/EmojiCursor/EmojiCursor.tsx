"use client";
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface EmojiCursorProps {
  emojis?: string[];
  rate?: number;
  size?: number;
  spread?: number;
}

interface EmojiParticle {
  id: number;
  x: number;
  y: number;
  emoji: string;
  angle: number;
  distance: number;
}

export const EmojiCursor: React.FC<EmojiCursorProps> = ({
  emojis = ["🔥", "⚡", "✨", "💥", "🌟"],
  rate = 3,
  size = 20,
  spread = 80,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<EmojiParticle[]>([]);
  let counter = 0;
  let frame = 0;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      frame++;
      if (frame % Math.max(1, Math.round(10 / rate)) !== 0) return;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;

      const particle: EmojiParticle = {
        id: counter++,
        x,
        y,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        angle: Math.random() * 360,
        distance: Math.random() * spread + 20,
      };

      setParticles((prev) => [...prev.slice(-30), particle]);

      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== particle.id));
      }, 800);
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [emojis, rate, spread]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[300px] flex items-center justify-center overflow-hidden cursor-none"
    >
      <p className="text-zinc-600 text-sm select-none pointer-events-none">
        Move your mouse here
      </p>

      <AnimatePresence>
        {particles.map((p) => {
          const rad = (p.angle * Math.PI) / 180;
          return (
            <motion.div
              key={p.id}
              className="absolute select-none pointer-events-none"
              style={{
                fontSize: size,
                left: p.x,
                top: p.y,
                transform: "translate(-50%, -50%)",
              }}
              initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              animate={{
                opacity: 0,
                x: Math.cos(rad) * p.distance,
                y: Math.sin(rad) * p.distance,
                scale: 0.3,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {p.emoji}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};