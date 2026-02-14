"use client";
import React, { useEffect, useRef, useState } from 'react';

export interface WebCursorProps {
  color?: string;
  thickness?: number;
  points?: number;
}

export const WebCursor: React.FC<WebCursorProps> = ({
  color = "#6366f1",
  thickness = 1,
  points = 8,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -999, y: -999 });
  const animFrameRef = useRef<number | undefined>(undefined);
  const anchorPointsRef = useRef<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;

      // Generate anchor points around edges
      const w = canvas.width;
      const h = canvas.height;
      const anchors = [];

      for (let i = 0; i < points; i++) {
        const t = i / points;
        if (t < 0.25) {
          anchors.push({ x: t * 4 * w, y: 0 });
        } else if (t < 0.5) {
          anchors.push({ x: w, y: (t - 0.25) * 4 * h });
        } else if (t < 0.75) {
          anchors.push({ x: w - (t - 0.5) * 4 * w, y: h });
        } else {
          anchors.push({ x: 0, y: h - (t - 0.75) * 4 * h });
        }
      }

      anchorPointsRef.current = anchors;
      mouseRef.current = { x: w / 2, y: h / 2 };
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

      const mouse = mouseRef.current;
      const anchors = anchorPointsRef.current;

      anchors.forEach((anchor, i) => {
        const nextAnchor = anchors[(i + 1) % anchors.length];

        // Line from anchor to cursor
        ctx.beginPath();
        ctx.moveTo(anchor.x, anchor.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `${color}66`;
        ctx.lineWidth = thickness;
        ctx.shadowColor = color;
        ctx.shadowBlur = 4;
        ctx.stroke();

        // Cross web lines between anchors through cursor
        ctx.beginPath();
        ctx.moveTo(anchor.x, anchor.y);
        ctx.quadraticCurveTo(mouse.x, mouse.y, nextAnchor.x, nextAnchor.y);
        ctx.strokeStyle = `${color}33`;
        ctx.lineWidth = thickness * 0.5;
        ctx.stroke();

        // Anchor dots
        ctx.beginPath();
        ctx.arc(anchor.x, anchor.y, thickness * 2, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowBlur = 8;
        ctx.fill();
      });

      // Cursor dot
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, thickness * 4, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 20;
      ctx.fill();

      animFrameRef.current = requestAnimationFrame(draw);
    };

    container.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", resize);
    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [color, thickness, points]);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[300px] flex items-center justify-center overflow-hidden cursor-none"
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      <p className="text-zinc-600 text-sm select-none pointer-events-none relative z-10">
        Move to stretch the web
      </p>
    </div>
  );
};