"use client";
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export interface StringCursorProps {
  color?: string;
  thickness?: number;
  elasticity?: number;
  nodes?: number;
}

export const StringCursor: React.FC<StringCursorProps> = ({
  color = "#6366f1",
  thickness = 2,
  elasticity = 0.15,
  nodes = 12,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const pointsRef = useRef<{ x: number; y: number }[]>([]);
  const animFrameRef = useRef<number | undefined>(undefined);
  const [isInside, setIsInside] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;

      // Init points at center
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      pointsRef.current = Array.from({ length: nodes }, () => ({ x: cx, y: cy }));
      mouseRef.current = { x: cx, y: cy };
    };

    resize();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const draw = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update points - each follows the one before it
      const points = pointsRef.current;
      points[0].x += (mouseRef.current.x - points[0].x) * elasticity * 3;
      points[0].y += (mouseRef.current.y - points[0].y) * elasticity * 3;

      for (let i = 1; i < points.length; i++) {
        points[i].x += (points[i - 1].x - points[i].x) * elasticity;
        points[i].y += (points[i - 1].y - points[i].y) * elasticity;
      }

      // Draw string
      ctx.beginPath();
      ctx.moveTo(mouseRef.current.x, mouseRef.current.y);

      for (let i = 0; i < points.length - 1; i++) {
        const midX = (points[i].x + points[i + 1].x) / 2;
        const midY = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, midX, midY);
      }

      ctx.strokeStyle = color;
      ctx.lineWidth = thickness;
      ctx.lineCap = "round";
      ctx.shadowColor = color;
      ctx.shadowBlur = 8;
      ctx.stroke();

      // Draw cursor dot
      ctx.beginPath();
      ctx.arc(mouseRef.current.x, mouseRef.current.y, thickness * 3, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.shadowBlur = 15;
      ctx.fill();

      // Draw tail dot
      const last = points[points.length - 1];
      ctx.beginPath();
      ctx.arc(last.x, last.y, thickness * 2, 0, Math.PI * 2);
      ctx.fillStyle = `${color}88`;
      ctx.fill();

      animFrameRef.current = requestAnimationFrame(draw);
    };

    const handleMouseEnter = () => setIsInside(true);
    const handleMouseLeave = () => setIsInside(false);

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", resize);

    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", resize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [color, thickness, elasticity, nodes]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[300px] flex items-center justify-center overflow-hidden cursor-none"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />
      <p className="text-zinc-600 text-sm select-none pointer-events-none relative z-10">
        Move your mouse to pull the string
      </p>
    </div>
  );
};