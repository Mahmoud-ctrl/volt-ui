"use client";
import React, { useEffect, useRef } from 'react';

export interface BlackHoleCursorProps {
  color?: string;
  particleCount?: number;
  suckStrength?: number;
  particleSize?: number;
}

interface BlackHoleParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  angle: number;
  orbitRadius: number;
  orbitSpeed: number;
  isOrbiting: boolean;
}

export const BlackHoleCursor: React.FC<BlackHoleCursorProps> = ({
  color = "#6366f1",
  particleCount = 60,
  suckStrength = 0.5,
  particleSize = 2,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -999, y: -999 });
  const particlesRef = useRef<BlackHoleParticle[]>([]);
  const animFrameRef = useRef<number | undefined>(undefined);

  const spawnParticle = (w: number, h: number): BlackHoleParticle => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 1,
    vy: (Math.random() - 0.5) * 1,
    size: Math.random() * particleSize + 0.5,
    opacity: Math.random() * 0.6 + 0.2,
    angle: Math.random() * Math.PI * 2,
    orbitRadius: Math.random() * 30 + 10,
    orbitSpeed: (Math.random() * 0.05 + 0.02) * (Math.random() > 0.5 ? 1 : -1),
    isOrbiting: false,
  });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      particlesRef.current = Array.from({ length: particleCount }, () =>
        spawnParticle(canvas.width, canvas.height)
      );
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
      particlesRef.current.forEach((p) => (p.isOrbiting = false));
    };

    const draw = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouse = mouseRef.current;

      // Draw black hole vortex rings
      if (mouse.x > 0) {
        for (let ring = 3; ring >= 1; ring--) {
          const gradient = ctx.createRadialGradient(
            mouse.x, mouse.y, 0,
            mouse.x, mouse.y, ring * 20
          );
          gradient.addColorStop(0, `${color}44`);
          gradient.addColorStop(0.5, `${color}22`);
          gradient.addColorStop(1, "transparent");

          ctx.beginPath();
          ctx.arc(mouse.x, mouse.y, ring * 20, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        // Black hole center
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = "#000";
        ctx.shadowColor = color;
        ctx.shadowBlur = 20;
        ctx.fill();
      }

      particlesRef.current.forEach((p) => {
        if (mouse.x < 0) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        } else {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 15) {
            // Absorbed - respawn
            Object.assign(p, spawnParticle(canvas.width, canvas.height));
            p.isOrbiting = false;
          } else if (dist < 60) {
            // Orbiting
            p.isOrbiting = true;
            p.angle += p.orbitSpeed * (1 + (60 - dist) / 60);
            p.orbitRadius = Math.max(15, p.orbitRadius - 0.3);
            p.x = mouse.x + Math.cos(p.angle) * p.orbitRadius;
            p.y = mouse.y + Math.sin(p.angle) * p.orbitRadius;
          } else {
            // Being pulled
            const force = suckStrength / (dist * 0.5);
            p.vx += dx * force;
            p.vy += dy * force;
            p.vx *= 0.92;
            p.vy *= 0.92;
            p.x += p.vx;
            p.y += p.vy;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = p.isOrbiting ? p.opacity * 1.5 : p.opacity;
        ctx.shadowColor = color;
        ctx.shadowBlur = p.isOrbiting ? 8 : 2;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

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
  }, [color, particleCount, suckStrength, particleSize]);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[300px] flex items-center justify-center overflow-hidden cursor-none"
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      <p className="text-zinc-600 text-sm select-none pointer-events-none relative z-10">
        Move to create a black hole
      </p>
    </div>
  );
};