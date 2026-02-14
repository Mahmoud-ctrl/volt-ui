"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView } from 'framer-motion';
import { ChevronRight, Zap, Sparkles, Layers, ArrowUpRight, MousePointer2, Box, Play, Github } from 'lucide-react';

import { TypewriterText } from '@/components';
import { TiltCard } from '@/components/TiltCard/TitlCard';
import { FlipCardLoader } from '@/components/FlipCardLoader/FlipCardLoader';
import { GlassCard } from '@/components/GlassCard/GlassCard';
import { TrailCursor } from '@/components/TrailCursor/TrailCursor';
import { SpotlightCursor } from '@/components/SpotlightCursor/SpotlightCursor';
import { Dune } from '@/components/Dune/Dune';
import { MatrixRainBackground } from '@/components/MatrixRainBackground/MatrixRainBackground';

function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const SPACING = 36;
    const INFLUENCE = 180;
    const MAX_PUSH = 28;

    const onMouseMove = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', onMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cols = Math.ceil(canvas.width / SPACING) + 1;
      const rows = Math.ceil(canvas.height / SPACING) + 1;
      const { x: mx, y: my } = mouseRef.current;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const bx = c * SPACING, by = r * SPACING;
          const dx = bx - mx, dy = by - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const push = Math.max(0, 1 - dist / INFLUENCE);
          const angle = Math.atan2(dy, dx);
          const x = bx + Math.cos(angle) * push * MAX_PUSH;
          const y = by + Math.sin(angle) * push * MAX_PUSH;
          const alpha = 0.08 + push * 0.35;
          const size = 1.2 + push * 1.8;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = push > 0.1 ? `rgba(99,102,241,${alpha})` : `rgba(255,255,255,${alpha * 0.5})`;
          ctx.fill();
        }
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

function MagneticWrapper({ children, strength = 0.35 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { damping: 15, stiffness: 150 });
  const sy = useSpring(y, { damping: 15, stiffness: 150 });
  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        x.set((e.clientX - (left + width / 2)) * strength);
        y.set((e.clientY - (top + height / 2)) * strength);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-indigo-400 mb-6">
      <Sparkles size={10} />
      {children}
    </div>
  );
}

function ShowcaseFrame({
  label,
  icon,
  children,
  className = '',
  delay = 0,
}: {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={`relative rounded-2xl border border-white/5 overflow-hidden ${className}`}
    >
      <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-[10px] font-mono font-semibold text-zinc-400 backdrop-blur-sm">
        {icon ?? <Box size={10} />}
        {label}
      </div>
      {children}
    </motion.div>
  );
}

export default function LandingPage() {
  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 80], ['rgba(3,3,3,0)', 'rgba(3,3,3,0.85)']);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#030303] text-white selection:bg-indigo-500/30 font-sans">

      <motion.nav
        style={{ backgroundColor: navBg }}
        className="fixed top-0 z-[100] flex w-full items-center justify-between px-6 py-4 border-b border-white/[0.04] backdrop-blur-md md:px-10"
      >
        <a href="/" className="flex items-center gap-2.5 font-black text-xl tracking-tighter">
          <motion.div
            whileHover={{ scale: 1.1, rotate: -5 }}
            className="h-7 w-7 bg-indigo-600 rounded-md flex items-center justify-center text-[11px] font-black shadow-[0_0_16px_rgba(99,102,241,0.5)]"
          >
            V
          </motion.div>
          VOLT <span className="text-indigo-500 ml-1">UI</span>
        </a>

        <div className="hidden md:flex items-center gap-1 text-sm font-medium">
          {[
            { label: 'Components', href: '/components' },
            { label: 'Docs',       href: '/components?docs=true' },
            { label: 'Showcase',   href: '#showcase' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="group relative px-4 py-2 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            >
              {label}
              <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 h-px w-0 bg-indigo-500 group-hover:w-4 transition-all duration-300 rounded-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/Mahmoud-ctrl/volt-ui.git"
            className="hidden md:flex items-center gap-2 rounded-lg border border-white/8 bg-white/4 px-3.5 py-2 text-xs font-semibold text-zinc-300 hover:text-white hover:border-white/15 transition-all"
          >
            <Github size={13} />
            Star
            <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[10px] font-bold">2.4k</span>
          </a>
          <MagneticWrapper strength={0.2}>
            <motion.a
              href="/components"
              whileTap={{ scale: 0.96 }}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-500 transition-colors shadow-[0_0_20px_rgba(99,102,241,0.3)]"
            >
              Get Started →
            </motion.a>
          </MagneticWrapper>
        </div>
      </motion.nav>

      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 overflow-hidden">
        <DotGrid />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#030303_75%)]" />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative z-10 mb-8 flex items-center gap-2 rounded-full border border-indigo-500/25 bg-indigo-500/8 px-5 py-2 text-xs font-semibold text-indigo-300 backdrop-blur-sm"
        >
          <motion.span
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-1.5 w-1.5 rounded-full bg-indigo-400"
          />
          Now with 80+ animated components
          <ArrowUpRight size={12} />
        </motion.div>

        <div className="relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, filter: 'blur(20px)', scale: 0.9 }}
            animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-7xl font-black tracking-tighter sm:text-9xl lg:text-[13rem] leading-none"
          >
            VOLT <span className="text-indigo-500 [text-shadow:0_0_80px_rgba(99,102,241,0.5)]">UI</span>
          </motion.h1>
        </div>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ delay: 0.6, duration: 1.2 }}
          className="relative z-10 mx-auto mt-6 h-px max-w-xl bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="relative z-10 mt-8 max-w-2xl text-center text-lg text-zinc-500 md:text-xl leading-relaxed"
        >
          Production-ready.{' '}
          <span className="font-bold italic text-white">"Not Dribbble-ready."</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="relative z-10 mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticWrapper>
            <motion.a
              href="/components"
              whileTap={{ scale: 0.96 }}
              className="group relative flex h-14 items-center gap-3 overflow-hidden rounded-xl bg-indigo-600 px-10 font-bold text-white shadow-[0_0_40px_rgba(99,102,241,0.35)] hover:shadow-[0_0_60px_rgba(99,102,241,0.5)] transition-all"
            >
              <Zap size={18} className="fill-current" />
              Browse Components
              <motion.span
                initial={{ x: '-150%' }}
                whileHover={{ x: '250%' }}
                transition={{ duration: 0.55 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 pointer-events-none"
              />
            </motion.a>
          </MagneticWrapper>

          <MagneticWrapper>
            <a
              href="https://github.com/Mahmoud-ctrl/volt-ui.git"
              className="flex h-14 items-center gap-3 rounded-xl border border-white/8 bg-white/4 px-8 font-bold text-zinc-300 backdrop-blur-sm hover:border-white/15 hover:text-white transition-all"
            >
              <Github size={18} />
              View on GitHub
            </a>
          </MagneticWrapper>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-8 w-5 rounded-full border border-white/10 flex items-start justify-center pt-1.5"
          >
            <div className="h-2 w-1 rounded-full bg-white/30" />
          </motion.div>
        </motion.div>
      </section>

      <div className="relative border-y border-white/5 bg-zinc-900/20 py-5 overflow-hidden">
        <motion.div
          animate={{ x: [0, -1200] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          className="flex whitespace-nowrap gap-16 text-5xl font-black text-white/[0.07] uppercase tracking-tighter select-none"
        >
          {[...Array(12)].map((_, i) => (
            <span key={i} className="flex items-center gap-10">
              80+ Components <Sparkles className="text-indigo-600/40" size={32} />
              Zero Config <Layers className="text-indigo-600/40" size={32} />
              Next.js Ready <Zap className="text-indigo-600/40" size={32} />
            </span>
          ))}
        </motion.div>
      </div>

      <section className="relative py-24 px-6"></section>

      <section id="showcase" className="relative px-6 pb-32">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Components in the wild</SectionLabel>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <h2 className="text-5xl font-black tracking-tighter md:text-7xl leading-none">
              SEE IT.<br />
              <span className="text-zinc-700">SHIP IT.</span>
            </h2>
            <a
              href="/components"
              className="group flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors shrink-0"
            >
              Browse all components
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <ShowcaseFrame label="TypewriterText" delay={0} className="h-72 bg-zinc-950 flex items-center justify-center p-8">
              <TypewriterText
                text="Volt UI"
              />
            </ShowcaseFrame>

            <ShowcaseFrame label="TiltCard" delay={0.1} className="h-72 bg-zinc-950 flex items-center justify-center p-8">
              <TiltCard
                title="Tilt Card"
                description="Hover to see the 3D tilt effect"
                intensity={15}
                glare={true}
                scale={1.05}
              />
            </ShowcaseFrame>

            <ShowcaseFrame label="FlipCard" delay={0.2} className="h-72 bg-gradient-to-br from-indigo-900/20 to-violet-900/20 flex items-center justify-center p-8">
              <FlipCardLoader />
            </ShowcaseFrame>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
            <ShowcaseFrame
              label="TrailCursor"
              icon={<MousePointer2 size={10} />}
              delay={0}
              className="md:col-span-4 h-64"
            >
              <TrailCursor color="#6366f1" size={18} trailLength={18} speed={0.9} />
            </ShowcaseFrame>

            <ShowcaseFrame
              label="SpotlightCursor"
              icon={<MousePointer2 size={10} />}
              delay={0.1}
              className="md:col-span-4 h-64"
            >
              <SpotlightCursor color="#6366f1" size={350} blur={60} opacity={0.18} />
            </ShowcaseFrame>

            <ShowcaseFrame
              label="MatrixRainBackground"
              delay={0.2}
              className="md:col-span-4 h-64 overflow-hidden"
            >
              <div className="h-64 w-full overflow-hidden">
                <MatrixRainBackground color="#6366f1" fontSize={13} speed={1.2} density={0.95}>
                  <div />
                </MatrixRainBackground>
              </div>
            </ShowcaseFrame>
          </div>

          <ShowcaseFrame label="Dune — obsidian" delay={0.1} className="h-96 overflow-hidden mb-4">
            <div className="h-96 w-full overflow-hidden">
              <Dune palette="obsidian" duneCount={5} windStrength={0.8} particleDensity={0.8} parallaxDepth={1}>
                <div />
              </Dune>
            </div>
          </ShowcaseFrame>

          <motion.a
            href="/components"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="group flex items-center justify-center gap-3 rounded-2xl border border-dashed border-white/8 py-5 text-sm font-semibold text-zinc-600 hover:border-indigo-500/30 hover:text-indigo-400 transition-all"
          >
            <Play size={14} className="fill-current" />
            + 74 more components waiting
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.a>
        </div>
      </section>

      <section className="relative overflow-hidden py-48 text-center px-6">
        <div className="absolute left-1/2 top-1/2 -z-10 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/15 blur-[200px]" />
        <div className="absolute left-1/2 top-1/2 -z-10 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/20 blur-[100px]" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <SectionLabel>Ready to ship?</SectionLabel>
          <h2 className="mt-4 text-6xl font-black tracking-tighter md:text-[9rem] leading-none">
            STOP<br />WAITING.
          </h2>
          <p className="mx-auto mt-8 max-w-lg text-zinc-500 text-lg leading-relaxed">
            The future of the web is being built right now. Are you in the room, or watching from the hallway?
          </p>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-5">
            <MagneticWrapper>
              <motion.a
                href="/components"
                whileTap={{ scale: 0.96 }}
                className="group relative flex h-16 items-center gap-4 overflow-hidden rounded-2xl bg-white px-12 text-lg font-black text-black hover:bg-zinc-100 transition-all"
              >
                START BUILDING
                <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </MagneticWrapper>
          </div>
        </motion.div>
      </section>

      <footer className="border-t border-white/5 px-6 py-10 md:px-10">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-600">
          <div className="flex items-center gap-2 font-black text-base tracking-tighter text-zinc-400">
            <div className="h-5 w-5 bg-indigo-600 rounded-sm flex items-center justify-center text-[9px] font-black">V</div>
            VOLT UI
          </div>
          <div className="flex items-center gap-6">
          {[
            { label: 'Components', href: '/components' },
            { label: 'Docs',       href: '/components?docs=true' },
            { label: 'Showcase',   href: '#showcase' },
            { label: 'GitHub',     href: 'https://github.com/volt-ui/volt-ui' },
            { label: 'Twitter',    href: 'https://twitter.com/volt_ui' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="hover:text-zinc-300 transition-colors"
            >
              {label}
              <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 h-px w-0 bg-indigo-500 group-hover:w-4 transition-all duration-300 rounded-full" />
            </a>
          ))}
        </div>
          <div>© 2026 Volt UI. Built for builders.</div>
        </div>
      </footer>

    </main>
  );
}