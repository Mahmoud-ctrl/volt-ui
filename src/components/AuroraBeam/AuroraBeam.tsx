"use client";
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export interface AuroraBeamProps {
  color1?: string;
  color2?: string;
  color3?: string;
  speed?: number;
  beamCount?: number;
  children?: React.ReactNode;
}

export const AuroraBeam: React.FC<AuroraBeamProps> = ({
  color1 = "#00f2fe", // Electric Cyan
  color2 = "#7000ff", // Deep Violet
  color3 = "#00c9ff", // Aurora Green/Blue
  speed = 0.5,
  beamCount = 40,
  children
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let frame = 0;
    let animationId: number;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    const drawAurora = () => {
      // Clear with a very slight fade for motion blur
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      // 'lighter' blend mode creates the "glowing gas" effect
      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < beamCount; i++) {
        const x = (window.innerWidth / beamCount) * i;
        
        // Multi-layered noise for organic movement
        const time = frame * 0.01 * speed;
        const noise = Math.sin(i * 0.2 + time) * Math.cos(i * 0.1 - time * 0.5);
        const shift = Math.sin(time * 0.5 + i * 0.1) * 50;
        
        // Dynamic height and width for each "curtain"
        const height = window.innerHeight * 0.6 + (noise * 150);
        const width = (window.innerWidth / beamCount) * 2.5;

        // Cycle through our 3 colors
        const colors = [color1, color2, color3];
        const color = colors[i % colors.length];

        const gradient = ctx.createLinearGradient(0, window.innerHeight, 0, window.innerHeight - height);
        gradient.addColorStop(0, "transparent");
        gradient.addColorStop(0.2, color + "44"); // Low opacity base
        gradient.addColorStop(0.5, color + "aa"); // Strong middle
        gradient.addColorStop(1, "transparent"); // Fade out top

        ctx.beginPath();
        ctx.fillStyle = gradient;
        
        // Draw the "curtain" with a slight skew
        ctx.moveTo(x + shift, window.innerHeight);
        ctx.lineTo(x + width + shift, window.innerHeight);
        ctx.lineTo(x + width * 1.5 + shift, window.innerHeight - height);
        ctx.lineTo(x - width * 0.5 + shift, window.innerHeight - height);
        
        ctx.fill();

        // Add a "core" bright line for the beam effect
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.2;
        ctx.moveTo(x + width / 2 + shift, window.innerHeight);
        ctx.lineTo(x + width / 2 + shift, window.innerHeight - height);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      ctx.globalCompositeOperation = "source-over";
      frame++;
      animationId = requestAnimationFrame(drawAurora);
    };

    window.addEventListener('resize', resize);
    resize();
    drawAurora();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [color1, color2, color3, speed, beamCount]);

  return (
    <div className="relative w-full min-h-screen bg-[#02040a] overflow-hidden selection:bg-cyan-500/30">
      {/* The Aurora Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 opacity-80 mix-blend-screen" 
      />
      
      {/* Noise Overlay */}
      <div className="absolute inset-0 z-[1] opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} 
      />

      {/* Atmospheric Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_20%,rgba(0,0,0,0.8)_100%)] z-[2]" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {children || (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
            }}
            className="text-center"
          >
            <motion.span
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-4 block"
            >
              Atmospheric Sync Active
            </motion.span>

            <motion.h1 
              variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }}
              className="text-7xl md:text-9xl font-bold text-white mb-6 tracking-tight"
            >
              AURORA<span className="text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 to-blue-600">BEAM</span>
            </motion.h1>
            
            <motion.p 
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              className="text-slate-400 max-w-lg mx-auto mb-10 text-lg font-light leading-relaxed"
            >
              Next-generation luminance engine powered by atmospheric noise and spectral gradients.
            </motion.p>

            <motion.div 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="flex gap-6 justify-center"
            >
              <button className="px-10 py-4 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform">
                Initialize
              </button>
              <button className="px-10 py-4 border border-white/20 text-white rounded-full font-bold hover:bg-white/10 transition-colors backdrop-blur-md">
                Documentation
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Bottom Bloom */}
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-[#02040a] to-transparent z-[3]" />
    </div>
  );
};