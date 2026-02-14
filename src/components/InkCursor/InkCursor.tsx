"use client";
import React, { useEffect, useRef } from 'react';

export interface InkCursorProps {
  color?: string;
  opacity?: number;
  size?: number;
  speed?: number;
}

export const InkCursor: React.FC<InkCursorProps> = ({
  color = "#6366f1",
  opacity = 0.6,
  size = 20,
  speed = 5,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const isDrawingRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const hexToRgb = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `${r}, ${g}, ${b}`;
    };

    const drawInk = (x: number, y: number, lastX: number, lastY: number) => {
      const dist = Math.sqrt((x - lastX) ** 2 + (y - lastY) ** 2);
      const steps = Math.max(1, Math.floor(dist / speed));

      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const px = lastX + (x - lastX) * t;
        const py = lastY + (y - lastY) * t;

        // Main blob
        const gradient = ctx.createRadialGradient(px, py, 0, px, py, size);
        gradient.addColorStop(0, `rgba(${hexToRgb(color)}, ${opacity})`);
        gradient.addColorStop(0.5, `rgba(${hexToRgb(color)}, ${opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(${hexToRgb(color)}, 0)`);

        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Splatter drops
        if (Math.random() > 0.7) {
          for (let j = 0; j < 3; j++) {
            const splatterX = px + (Math.random() - 0.5) * size * 3;
            const splatterY = py + (Math.random() - 0.5) * size * 3;
            const splatterSize = Math.random() * size * 0.4;

            ctx.beginPath();
            ctx.arc(splatterX, splatterY, splatterSize, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${hexToRgb(color)}, ${opacity * 0.4})`;
            ctx.fill();
          }
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDrawingRef.current) return;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (lastPosRef.current) {
        drawInk(x, y, lastPosRef.current.x, lastPosRef.current.y);
      }
      lastPosRef.current = { x, y };
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDrawingRef.current = true;
      const rect = container.getBoundingClientRect();
      lastPosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseUp = () => {
      isDrawingRef.current = false;
      lastPosRef.current = null;
    };

    const handleDoubleClick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mouseleave", handleMouseUp);
    container.addEventListener("dblclick", handleDoubleClick);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mouseleave", handleMouseUp);
      container.removeEventListener("dblclick", handleDoubleClick);
    };
  }, [color, opacity, size, speed]);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[300px] flex items-center justify-center overflow-hidden cursor-crosshair"
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
      <p className="text-zinc-700 text-sm select-none pointer-events-none relative z-10">
        Click and drag to paint • Double click to clear
      </p>
    </div>
  );
};