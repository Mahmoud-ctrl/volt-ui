"use client";
import React, { useEffect, useRef } from 'react';

export interface GravityCursorProps {
  color?: string;
  dotCount?: number;
  gravity?: number;
  dotSize?: number;
}

interface GravityDot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  size: number;
}

export const GravityCursor: React.FC<GravityCursorProps> = ({
  color = "#6366f1",
  dotCount = 40,
  gravity = 0.3,
  dotSize = 3,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -999, y: -999 });
  const dotsRef = useRef<GravityDot[]>([]);
  const animFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;

      // Scatter dots randomly
      dotsRef.current = Array.from({ length: dotCount }, () => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        return {
          x, y,
          vx: 0, vy: 0,
          baseX: x, baseY: y,
          size: Math.random() * dotSize + 1,
        };
      });
    };

    resize();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -999, y: -999 };
    };

    const draw = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;
      const dots = dotsRef.current;

      dots.forEach((dot) => {
        const dx = mouse.x - dot.x;
        const dy = mouse.y - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 150;

        if (dist < maxDist) {
          // Pull toward cursor
          const force = (maxDist - dist) / maxDist;
          dot.vx += dx * force * gravity * 0.1;
          dot.vy += dy * force * gravity * 0.1;
        }

        // Spring back to base
        dot.vx += (dot.baseX - dot.x) * 0.05;
        dot.vy += (dot.baseY - dot.y) * 0.05;

        // Damping
        dot.vx *= 0.85;
        dot.vy *= 0.85;

        dot.x += dot.vx;
        dot.y += dot.vy;

        const distFromMouse = Math.sqrt(
          (mouse.x - dot.x) ** 2 + (mouse.y - dot.y) ** 2
        );
        const proximity = Math.max(0, 1 - distFromMouse / 150);

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.3 + proximity * 0.7;
        ctx.shadowColor = color;
        ctx.shadowBlur = proximity * 10;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Cursor dot
      if (mouse.x > 0) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, dotSize * 2, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 20;
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", resize);
    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", resize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [color, dotCount, gravity, dotSize]);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[300px] flex items-center justify-center overflow-hidden cursor-none"
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      <p className="text-zinc-600 text-sm select-none pointer-events-none relative z-10">
        Watch the dots get pulled in
      </p>
    </div>
  );
};