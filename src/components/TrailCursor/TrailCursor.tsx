"use client";
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface TrailCursorProps {
  color?: string;
  size?: number;
  trailLength?: number;
  speed?: number;
}

interface TrailPoint {
  id: number;
  x: number;
  y: number;
}

export const TrailCursor: React.FC<TrailCursorProps> = ({
  color = "#6366f1",
  size = 8,
  trailLength = 12,
  speed = 0.3,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  let idCounter = 0;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Get position relative to container
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Ignore if outside container
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;

      const point: TrailPoint = { id: idCounter++, x, y };
      setTrail((prev) => [...prev.slice(-(trailLength - 1)), point]);
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [trailLength]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[300px] flex items-center justify-center overflow-hidden cursor-none"
    >
      {/* Instructions */}
      <p className="text-zinc-600 text-sm select-none pointer-events-none">
        Move your mouse here
      </p>

      {trail.map((point, i) => {
        const progress = (i + 1) / trail.length;
        return (
          <motion.div
            key={point.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: size * progress,
              height: size * progress,
              backgroundColor: color,
              left: point.x,
              top: point.y,
              translateX: "-50%",
              translateY: "-50%",
              opacity: progress,
              boxShadow: `0 0 ${size * progress}px ${color}`,
            }}
            initial={{ scale: 1 }}
            animate={{ scale: 0, opacity: 0 }}
            transition={{ duration: speed }}
          />
        );
      })}
    </div>
  );
};