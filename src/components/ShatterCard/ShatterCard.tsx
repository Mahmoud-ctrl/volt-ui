"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ShatterCardProps {
  title?: string;
  description?: string;
  shardCount?: number;
  glassColor?: string;
  className?: string;
}

export const ShatterCard: React.FC<ShatterCardProps> = ({
  title = "Shatter Card",
  description = "Click to shatter into pieces",
  shardCount = 20,
  glassColor = "#60a5fa",
  className = "",
}) => {
  const [isShattered, setIsShattered] = useState(false);

  const createShards = () => {
    const shards = [];
    for (let i = 0; i < shardCount; i++) {
      const angle = (Math.random() - 0.5) * 180;
      const distance = 150 + Math.random() * 200;
      const size = 30 + Math.random() * 40;
      
      shards.push({
        id: i,
        angle,
        distance,
        size,
        rotation: Math.random() * 360,
        x: (Math.random() - 0.5) * 100,
        y: (Math.random() - 0.5) * 100,
      });
    }
    return shards;
  };

  const shards = createShards();

  const handleClick = () => {
    setIsShattered(true);
    setTimeout(() => setIsShattered(false), 2000);
  };

  return (
    <motion.div
      onClick={handleClick}
      className={`relative w-80 h-96 rounded-2xl cursor-pointer overflow-visible ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        perspective: "1000px",
      }}
    >
      {/* Main card with glass effect */}
      <AnimatePresence>
        {!isShattered && (
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))`,
              backdropFilter: "blur(10px)",
              border: `1px solid ${glassColor}40`,
              boxShadow: `0 8px 32px rgba(0,0,0,0.1), inset 0 0 20px ${glassColor}20`,
            }}
            initial={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 0.8,
              transition: { duration: 0.3 },
            }}
          >
            {/* Glass reflections */}
            <div
              className="absolute inset-0 rounded-2xl opacity-30"
              style={{
                background: `linear-gradient(135deg, transparent 0%, ${glassColor}30 50%, transparent 100%)`,
              }}
            />

            {/* Crack lines preview on hover */}
            <motion.svg
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.3 }}
              transition={{ duration: 0.3 }}
            >
              {[...Array(5)].map((_, i) => (
                <motion.line
                  key={i}
                  x1={`${50 + (Math.random() - 0.5) * 20}%`}
                  y1={`${50 + (Math.random() - 0.5) * 20}%`}
                  x2={`${(Math.random() * 100)}%`}
                  y2={`${(Math.random() * 100)}%`}
                  stroke={glassColor}
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileHover={{
                    pathLength: 1,
                    opacity: 0.5,
                    transition: { duration: 0.5, delay: i * 0.05 },
                  }}
                />
              ))}
            </motion.svg>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-center items-center p-8 text-center">
              <motion.div
                className="w-20 h-20 rounded-full mb-6"
                style={{
                  background: `linear-gradient(135deg, ${glassColor}60, ${glassColor}30)`,
                  boxShadow: `0 0 30px ${glassColor}40`,
                }}
                animate={{
                  boxShadow: [
                    `0 0 30px ${glassColor}40`,
                    `0 0 50px ${glassColor}60`,
                    `0 0 30px ${glassColor}40`,
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              <h3 className="text-3xl font-bold text-white mb-3">
                {title}
              </h3>
              <p className="text-gray-300 text-sm">{description}</p>

              <motion.div
                className="mt-6 px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  background: `${glassColor}20`,
                  border: `1px solid ${glassColor}40`,
                  color: glassColor,
                }}
                whileHover={{
                  background: `${glassColor}30`,
                  scale: 1.05,
                }}
              >
                Click to Shatter
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shattered pieces */}
      <AnimatePresence>
        {isShattered && shards.map((shard) => (
          <motion.div
            key={shard.id}
            className="absolute"
            style={{
              left: `${50 + shard.x}%`,
              top: `${50 + shard.y}%`,
              width: `${shard.size}px`,
              height: `${shard.size}px`,
              background: `linear-gradient(${shard.rotation}deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))`,
              backdropFilter: "blur(5px)",
              border: `1px solid ${glassColor}60`,
              boxShadow: `0 4px 15px rgba(0,0,0,0.2), inset 0 0 10px ${glassColor}30`,
              clipPath: "polygon(50% 0%, 100% 30%, 80% 100%, 20% 100%, 0% 30%)",
            }}
            initial={{
              x: 0,
              y: 0,
              rotate: 0,
              opacity: 1,
              scale: 1,
            }}
            animate={{
              x: Math.cos((shard.angle * Math.PI) / 180) * shard.distance,
              y: Math.sin((shard.angle * Math.PI) / 180) * shard.distance,
              rotate: shard.rotation + (Math.random() - 0.5) * 360,
              opacity: 0,
              scale: 0.5,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
          />
        ))}
      </AnimatePresence>

      {/* Impact flash */}
      <AnimatePresence>
        {isShattered && (
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${glassColor}60 0%, transparent 70%)`,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 2, 2] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};