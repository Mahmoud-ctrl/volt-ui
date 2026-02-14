"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Search, Command } from 'lucide-react';

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-4 inset-x-0 z-[100] mx-auto max-w-5xl px-6"
    >
      <div className="flex items-center justify-between rounded-full border border-white/10 bg-black/60 py-3 px-6 backdrop-blur-xl">
        <div className="flex items-center gap-8">
          <span className="text-lg font-bold tracking-tighter text-white">AURA/UI</span>
          <div className="hidden gap-6 text-sm font-medium text-zinc-400 md:flex">
            <a href="#components" className="hover:text-white transition-colors">Components</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-500 lg:flex">
            <Search size={14} />
            <span>Search...</span>
            <kbd className="flex items-center gap-0.5 rounded bg-white/10 px-1.5 py-0.5 text-[10px]">
              <Command size={10} />K
            </kbd>
          </div>
          <a href="https://github.com" target="_blank" rel="noreferrer">
            <Github size={20} className="text-zinc-400 hover:text-white transition-colors" />
          </a>
        </div>
      </div>
    </motion.nav>
  );
}