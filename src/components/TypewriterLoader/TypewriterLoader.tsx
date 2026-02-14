"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface TypewriterLoaderProps {
  color?: string;
  messages?: string[];
  speed?: number;
  showCursor?: boolean;
}

export const TypewriterLoader: React.FC<TypewriterLoaderProps> = ({
  color = "#6366f1",
  messages = ["Loading", "Please wait", "Almost there", "Hang tight"],
  speed = 80,
  showCursor = true,
}) => {
  const [msgIndex, setMsgIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = messages[msgIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayed.length < current.length) {
          setDisplayed(current.slice(0, displayed.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1000);
        }
      } else {
        if (displayed.length > 0) {
          setDisplayed(displayed.slice(0, -1));
        } else {
          setIsDeleting(false);
          setMsgIndex((prev) => (prev + 1) % messages.length);
        }
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, msgIndex, messages, speed]);

  return (
    <div className="flex items-center gap-1">
      <span
        className="text-2xl font-mono font-bold tracking-tight"
        style={{ color }}
      >
        {displayed}
      </span>
      {showCursor && (
        <motion.span
          className="text-2xl font-mono font-bold"
          style={{ color }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          |
        </motion.span>
      )}
    </div>
  );
};