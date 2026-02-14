"use client";
import React, { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export interface MagneticCursorProps {
  color?: string;
  size?: number;
  strength?: number;
  ringSize?: number;
}

export const MagneticCursor: React.FC<MagneticCursorProps> = ({
  color = "#6366f1",
  size = 12,
  strength = 0.3,
  ringSize = 36,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isInside, setIsInside] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);

  const springX = useSpring(ringX, { stiffness: 150, damping: 15 });
  const springY = useSpring(ringY, { stiffness: 150, damping: 15 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      cursorX.set(x);
      cursorY.set(y);
      ringX.set(x);
      ringY.set(y);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button, a, [data-magnetic]")) {
        setIsHovering(true);
      }
    };

    const handleMouseEnter = () => setIsInside(true);
    const handleMouseLeave = () => {
      setIsInside(false);
      setIsHovering(false);
      cursorX.set(-100);
      cursorY.set(-100);
      ringX.set(-100);
      ringY.set(-100);
    };
    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("button, a, [data-magnetic]")) {
        setIsHovering(false);
      }
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseover", handleMouseOver);
    container.addEventListener("mouseout", handleMouseOut);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseover", handleMouseOver);
      container.removeEventListener("mouseout", handleMouseOut);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[300px] flex items-center justify-center overflow-hidden cursor-none"
    >
      <p className="text-zinc-600 text-sm select-none pointer-events-none">
        Move over the button below
      </p>

      {/* Example magnetic target */}
      <button
        data-magnetic
        className="absolute bottom-8 px-6 py-3 rounded-xl font-bold text-white text-sm"
        style={{ backgroundColor: color }}
      >
        Magnetic Target
      </button>

      {/* Inner dot */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: size,
          height: size,
          backgroundColor: color,
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          boxShadow: `0 0 10px ${color}`,
          opacity: isInside ? 1 : 0,
        }}
        animate={{ scale: isHovering ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />

      {/* Outer ring */}
      <motion.div
        className="absolute rounded-full border-2 pointer-events-none"
        style={{
          width: ringSize,
          height: ringSize,
          borderColor: color,
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isInside ? 1 : 0,
        }}
        animate={{
          scale: isHovering ? 1.8 : 1,
          backgroundColor: isHovering ? `${color}22` : "transparent",
        }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
};