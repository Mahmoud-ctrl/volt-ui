"use client";
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export interface MatrixRainBackgroundProps {
  color?: string;
  fontSize?: number;
  speed?: number;
  density?: number;
  children?: React.ReactNode;
}

interface Drop {
  x: number;
  y: number;
  speed: number;
  chars: string[];
}

export const MatrixRainBackground: React.FC<MatrixRainBackgroundProps> = ({
  color = "#00ff41", // Matrix Green
  fontSize = 16,
  speed = 1, // Normalized speed multiplier
  density = 0.95,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | undefined>(undefined);
  const dropsRef = useRef<Drop[]>([]);

  const charList = "ｱｲｳｴｵｶｷｸｹｺｻシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      const cols = Math.floor(canvas.width / fontSize);
      
      // Initialize drops with varying speeds for parallax effect
      dropsRef.current = Array.from({ length: cols }, (_, i) => ({
        x: i * fontSize,
        y: Math.random() * -canvas.height,
        speed: (Math.random() * 2 + 1) * speed,
        chars: []
      }));
    };

    resize();

    const draw = () => {
      // Create trailing effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      dropsRef.current.forEach((drop) => {
        const char = charList[Math.floor(Math.random() * charList.length)];
        
        // Draw the glowing "head" character
        ctx.fillStyle = "#fff"; // White head for high contrast
        ctx.font = `bold ${fontSize}px monospace`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = color;
        ctx.fillText(char, drop.x, drop.y);

        // Draw the body/trail
        ctx.fillStyle = color;
        ctx.font = `${fontSize}px monospace`;
        ctx.shadowBlur = 0; // Reset blur for trail to save performance
        ctx.fillText(char, drop.x, drop.y - fontSize);

        // Update position
        drop.y += drop.speed * 5;

        // Reset if off screen
        if (drop.y > canvas.height && Math.random() > density) {
          drop.y = -fontSize;
          drop.speed = (Math.random() * 2 + 1) * speed;
        }
      });

      animRef.current = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    animRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [color, fontSize, speed, density]);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen bg-black overflow-hidden flex items-center justify-center font-mono"
    >
      <canvas ref={canvasRef} className="absolute inset-0 opacity-40" />

      {/* CRT Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none z-[2] opacity-[0.03]" 
           style={{ backgroundImage: `linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))`, backgroundSize: '100% 2px, 3px 100%' }} 
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] z-[1]" />

      <div className="relative z-10 w-full max-w-5xl px-6 text-center">
        {children || (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6 inline-flex items-center gap-3 px-3 py-1 border border-green-500/30 bg-green-500/5 rounded text-[10px] tracking-[0.2em] text-green-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              SYSTEM_LINK_ESTABLISHED
            </div>

            <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter text-white uppercase italic">
              Terminal <span className="text-green-500 [text-shadow:0_0_20px_rgba(34,197,94,0.6)]">Velocity</span>
            </h1>

            <p className="text-green-500/60 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
              Decoding the architecture of the digital void. <br className="hidden md:block" />
              Your interface with the hidden layer of the internet.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="group relative px-10 py-4 bg-green-500 text-black font-bold uppercase tracking-widest transition-all hover:bg-white hover:shadow-[0_0_30px_rgba(34,197,94,0.8)]">
                <span className="relative z-10">Wake up, Neo</span>
                {/* Glitch Effect Border */}
                <div className="absolute inset-0 border-2 border-green-400 scale-105 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
              </button>

              <button className="px-10 py-4 border border-green-500/40 text-green-500 font-bold uppercase tracking-widest hover:bg-green-500/10 transition-colors backdrop-blur-sm">
                Ignore Truth
              </button>
            </div>

            <div className="mt-20 grid grid-cols-3 gap-4 max-w-xl mx-auto opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
              <div className="text-left border-l border-green-500/30 pl-4">
                <div className="text-xs text-green-700">LATENCY</div>
                <div className="text-sm text-green-500 uppercase">0.003ms</div>
              </div>
              <div className="text-left border-l border-green-500/30 pl-4">
                <div className="text-xs text-green-700">ENCRYPTION</div>
                <div className="text-sm text-green-500 uppercase">RSA-4096</div>
              </div>
              <div className="text-left border-l border-green-500/30 pl-4">
                <div className="text-xs text-green-700">PACKETS</div>
                <div className="text-sm text-green-500 uppercase">SYN/ACK</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};