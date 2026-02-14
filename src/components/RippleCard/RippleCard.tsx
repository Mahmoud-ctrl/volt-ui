"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface RippleCardProps {
  title?: string;
  description?: string;
  rippleColor?: string;
  rippleCount?: number;
  className?: string;
}

export const RippleCard: React.FC<RippleCardProps> = ({
  title = "Ripple Card",
  description = "Click to create ripples",
  rippleColor = "#06b6d4",
  rippleCount = 3,
  className = "",
}) => {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [rippleId, setRippleId] = useState(0);

  const createRipple = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const newRipple = { id: rippleId, x, y };
    setRipples((prev) => [...prev, newRipple]);
    setRippleId((prev) => prev + 1);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 2000);
  };

  return (
    <motion.div
      onClick={createRipple}
      className={`relative w-80 h-96 rounded-3xl overflow-hidden cursor-pointer ${className}`}
      whileHover={{ scale: 1.02 }}
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      }}
    >
      {/* Water surface gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at top, ${rippleColor}15, transparent 60%)`,
        }}
      />

      {/* Animated water waves background */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 opacity-10"
          style={{
            background: `linear-gradient(${45 + i * 45}deg, transparent 40%, ${rippleColor}30 50%, transparent 60%)`,
          }}
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Ripple effects */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <React.Fragment key={ripple.id}>
            {[...Array(rippleCount)].map((_, i) => (
              <motion.div
                key={`${ripple.id}-${i}`}
                className="absolute rounded-full pointer-events-none"
                style={{
                  left: `${ripple.x}%`,
                  top: `${ripple.y}%`,
                  border: `2px solid ${rippleColor}`,
                  boxShadow: `0 0 20px ${rippleColor}80, inset 0 0 20px ${rippleColor}40`,
                }}
                initial={{
                  width: 0,
                  height: 0,
                  x: "-50%",
                  y: "-50%",
                  opacity: 0.8,
                }}
                animate={{
                  width: "500px",
                  height: "500px",
                  opacity: 0,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.15,
                  ease: "easeOut",
                }}
              />
            ))}
            
            {/* Center splash */}
            <motion.div
              className="absolute w-4 h-4 rounded-full pointer-events-none"
              style={{
                left: `${ripple.x}%`,
                top: `${ripple.y}%`,
                background: rippleColor,
                boxShadow: `0 0 30px ${rippleColor}`,
              }}
              initial={{
                scale: 0,
                x: "-50%",
                y: "-50%",
                opacity: 1,
              }}
              animate={{
                scale: [1, 3, 0],
                opacity: [1, 0.5, 0],
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
              }}
            />
          </React.Fragment>
        ))}
      </AnimatePresence>

      {/* Content container with glass effect */}
      <div className="relative h-full flex flex-col justify-between p-8">
        {/* Floating element */}
        <motion.div
          className="flex justify-center"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="relative"
            whileHover={{
              scale: 1.1,
              rotate: [0, -5, 5, -5, 0],
              transition: { duration: 0.5 },
            }}
          >
            {/* Lifebuoy / Float */}
            <div
              className="w-28 h-28 rounded-full flex items-center justify-center relative"
              style={{
                background: `conic-gradient(from 0deg, ${rippleColor}80 0deg 90deg, transparent 90deg 180deg, ${rippleColor}80 180deg 270deg, transparent 270deg 360deg)`,
                boxShadow: `0 10px 40px ${rippleColor}40`,
              }}
            >
              <div
                className="w-16 h-16 rounded-full"
                style={{
                  background: "linear-gradient(135deg, #1e293b, #0f172a)",
                  border: `3px solid ${rippleColor}`,
                }}
              />

              {/* Reflection shimmer */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `linear-gradient(135deg, transparent, ${rippleColor}40, transparent)`,
                }}
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>

            {/* Water droplets */}
            {[...Array(6)].map((_, i) => {
              const angle = (i * 60) * (Math.PI / 180);
              return (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    background: rippleColor,
                    boxShadow: `0 0 10px ${rippleColor}`,
                    left: "50%",
                    top: "50%",
                  }}
                  animate={{
                    x: Math.cos(angle) * 50,
                    y: Math.sin(angle) * 50,
                    scale: [1, 0.5, 1],
                    opacity: [0.8, 0.3, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    repeat: Infinity,
                  }}
                />
              );
            })}
          </motion.div>
        </motion.div>

        {/* Text content */}
        <div className="relative">
          <motion.div
            className="mb-6"
            animate={{
              y: [0, -3, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <h3
              className="text-3xl font-bold mb-2"
              style={{
                background: `linear-gradient(135deg, white, ${rippleColor})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: `0 0 30px ${rippleColor}40`,
              }}
            >
              {title}
            </h3>
            <p className="text-gray-400 text-sm">{description}</p>
          </motion.div>

          {/* Wave indicator */}
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-full overflow-hidden"
                style={{
                  height: "4px",
                  background: `${rippleColor}20`,
                }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: rippleColor,
                    boxShadow: `0 0 10px ${rippleColor}`,
                  }}
                  animate={{
                    scaleY: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* Interactive hint */}
          <motion.p
            className="text-xs text-center mt-4"
            style={{ color: `${rippleColor}80` }}
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            Click anywhere to create ripples
          </motion.p>
        </div>
      </div>

      {/* Surface shimmer overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(180deg, ${rippleColor}10, transparent 50%, ${rippleColor}05)`,
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};