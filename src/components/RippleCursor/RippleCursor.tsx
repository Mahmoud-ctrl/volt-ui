"use client";
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface RippleCursorProps {
  color?: string;
  size?: number;
  duration?: number;
  rippleCount?: number;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export const RippleCursor: React.FC<RippleCursorProps> = ({
  color = "#6366f1",
  size = 80,
  duration = 0.8,
  rippleCount = 3,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isInside, setIsInside] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      setPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const newRipples = Array.from({ length: rippleCount }, (_, i) => ({
        id: Date.now() + i,
        x,
        y,
      }));

      setRipples((prev) => [...prev, ...newRipples]);

      setTimeout(() => {
        setRipples((prev) =>
          prev.filter((r) => !newRipples.find((nr) => nr.id === r.id))
        );
      }, duration * 1000 + 200);
    };

    const handleMouseEnter = () => setIsInside(true);
    const handleMouseLeave = () => {
      setIsInside(false);
      setPos({ x: -100, y: -100 });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("click", handleClick);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("click", handleClick);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [duration, rippleCount]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[300px] flex items-center justify-center overflow-hidden cursor-none"
    >
      <p className="text-zinc-600 text-sm select-none pointer-events-none">
        Click anywhere to ripple
      </p>

      {/* Cursor dot */}
      {isInside && (
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 10,
            height: 10,
            backgroundColor: color,
            left: pos.x,
            top: pos.y,
            transform: "translate(-50%, -50%)",
            boxShadow: `0 0 8px ${color}`,
          }}
        />
      )}

      {/* Ripples */}
      <AnimatePresence>
        {ripples.map((ripple, i) => (
          <motion.div
            key={ripple.id}
            className="absolute rounded-full border-2 pointer-events-none"
            style={{
              borderColor: color,
              left: ripple.x,
              top: ripple.y,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ width: 0, height: 0, opacity: 0.8 }}
            animate={{
              width: size * (i % rippleCount + 1),
              height: size * (i % rippleCount + 1),
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration,
              delay: (i % rippleCount) * 0.1,
              ease: "easeOut",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};