"use client";
import React from 'react';
import { motion } from 'framer-motion';

export interface InfinityLoaderProps {
  color?: string;
  size?: number;
  speed?: number;
  thickness?: number;
}

export const InfinityLoader: React.FC<InfinityLoaderProps> = ({
  color = "#6366f1",
  size = 120,
  speed = 2.5,
  thickness = 3,
}) => {
  const w = size;
  const h = size / 2;
  const r = h / 2;
  const cx1 = r;
  const cx2 = w - r;
  const cy = h / 2;

  const path = `
    M ${w / 2} ${cy}
    C ${w / 2} ${cy - r} ${cx1 - r} ${cy - r} ${cx1} ${cy}
    C ${cx1 + r} ${cy + r} ${w / 2} ${cy + r} ${w / 2} ${cy}
    C ${w / 2} ${cy - r} ${cx2 - r} ${cy - r} ${cx2} ${cy}
    C ${cx2 + r} ${cy + r} ${w / 2} ${cy + r} ${w / 2} ${cy}
  `;

  return (
    <div style={{ width: size, height: h + 20 }} className="flex items-center justify-center">
      <svg width={size} height={h + 20} viewBox={`0 0 ${w} ${h + 10}`}>
        {/* Track */}
        <path
          d={path}
          fill="none"
          stroke={`${color}22`}
          strokeWidth={thickness}
        />

        {/* Animated trace */}
        <motion.path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth={thickness}
          strokeLinecap="round"
          style={{
            filter: `drop-shadow(0 0 4px ${color})`,
          }}
          initial={{ pathLength: 0, pathOffset: 0 }}
          animate={{ pathOffset: [0, 1] }}
          transition={{
            duration: speed,
            repeat: Infinity,
            ease: "linear",
          }}
          strokeDasharray="0.15 0.85"
        />

        {/* Glowing dot */}
        <motion.circle
          r={thickness * 2}
          fill={color}
          style={{ filter: `drop-shadow(0 0 6px ${color})` }}
        >
          <animateMotion
            dur={`${speed}s`}
            repeatCount="indefinite"
            path={path}
          />
        </motion.circle>
      </svg>
    </div>
  );
};