"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

export interface MagneticCardProps {
  title?: string;
  description?: string;
  magnetStrength?: number;
  accentColor?: string;
  className?: string;
}

export const MagneticCard: React.FC<MagneticCardProps> = ({
  title = "Magnetic Card",
  description = "Feel the magnetic pull",
  magnetStrength = 0.3,
  accentColor = "#f97316",
  className = "",
}) => {
  const [isNearby, setIsNearby] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useSpring(0, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseY, [-100, 100], [10, -10]);
  const rotateY = useTransform(mouseX, [-100, 100], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;

      const distanceX = e.clientX - cardCenterX;
      const distanceY = e.clientY - cardCenterY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      const magnetRange = 300;
      
      if (distance < magnetRange) {
        setIsNearby(true);
        const pullX = distanceX * magnetStrength;
        const pullY = distanceY * magnetStrength;
        
        mouseX.set(pullX);
        mouseY.set(pullY);
      } else {
        setIsNearby(false);
        mouseX.set(0);
        mouseY.set(0);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, magnetStrength]);

  return (
    <motion.div
      ref={cardRef}
      className={`relative w-80 h-96 rounded-3xl cursor-pointer ${className}`}
      style={{
        x: mouseX,
        y: mouseY,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      {/* Magnetic field visualization */}
      <motion.div
        className="absolute inset-0 rounded-3xl"
        style={{
          background: `radial-gradient(circle at center, ${accentColor}10 0%, transparent 70%)`,
          filter: "blur(40px)",
          scale: isNearby ? 1.5 : 1,
        }}
        animate={{
          opacity: isNearby ? [0.3, 0.6, 0.3] : 0,
          scale: isNearby ? [1.3, 1.5, 1.3] : 1,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />

      {/* Main card */}
      <motion.div
        className="relative w-full h-full rounded-3xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)",
          border: `2px solid ${accentColor}40`,
          boxShadow: isNearby
            ? `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${accentColor}40`
            : "0 10px 30px rgba(0,0,0,0.3)",
          transformStyle: "preserve-3d",
        }}
        animate={{
          borderColor: isNearby ? `${accentColor}80` : `${accentColor}40`,
        }}
      >
        {/* Magnetic field lines */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border-2"
            style={{
              left: "50%",
              top: "50%",
              width: `${60 + i * 30}%`,
              height: `${60 + i * 30}%`,
              borderColor: `${accentColor}${(20 - i * 3).toString(16).padStart(2, '0')}`,
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              scale: isNearby ? [1, 1.1, 1] : 1,
              opacity: isNearby ? 0.5 : 0.2,
            }}
            transition={{
              duration: 2,
              delay: i * 0.1,
              repeat: Infinity,
            }}
          />
        ))}

        {/* Content */}
        <div
          className="relative h-full flex flex-col justify-between p-8 z-10"
          style={{ transform: "translateZ(50px)" }}
        >
          {/* Magnetic core */}
          <div className="flex justify-center">
            <motion.div
              className="relative w-32 h-32 flex items-center justify-center"
              animate={{
                rotate: isNearby ? 360 : 0,
              }}
              transition={{
                rotate: {
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              {/* Outer ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  border: `3px solid ${accentColor}`,
                  boxShadow: `0 0 30px ${accentColor}80`,
                }}
                animate={{
                  scale: isNearby ? [1, 1.1, 1] : 1,
                  boxShadow: isNearby
                    ? [
                        `0 0 30px ${accentColor}80`,
                        `0 0 50px ${accentColor}`,
                        `0 0 30px ${accentColor}80`,
                      ]
                    : `0 0 20px ${accentColor}40`,
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              />

              {/* Inner core */}
              <motion.div
                className="w-16 h-16 rounded-full relative"
                style={{
                  background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
                  boxShadow: `0 0 30px ${accentColor}`,
                }}
                animate={{
                  boxShadow: isNearby
                    ? [
                        `0 0 30px ${accentColor}`,
                        `0 0 60px ${accentColor}`,
                        `0 0 30px ${accentColor}`,
                      ]
                    : `0 0 20px ${accentColor}80`,
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
              >
                {/* Magnetic poles */}
                <motion.div
                  className="absolute top-1 left-1/2 w-2 h-2 rounded-full bg-white"
                  style={{ transform: "translateX(-50%)" }}
                  animate={{
                    scale: isNearby ? [1, 1.5, 1] : 1,
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                  }}
                />
                <motion.div
                  className="absolute bottom-1 left-1/2 w-2 h-2 rounded-full bg-black"
                  style={{ transform: "translateX(-50%)" }}
                  animate={{
                    scale: isNearby ? [1, 1.5, 1] : 1,
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: 0.25,
                  }}
                />
              </motion.div>

              {/* Rotating particles */}
              {[...Array(8)].map((_, i) => {
                const angle = (i * 45) * (Math.PI / 180);
                return (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      background: accentColor,
                      boxShadow: `0 0 10px ${accentColor}`,
                      left: "50%",
                      top: "50%",
                    }}
                    animate={{
                      x: Math.cos(angle) * 60,
                      y: Math.sin(angle) * 60,
                      scale: isNearby ? [1, 1.5, 1] : 1,
                      opacity: isNearby ? [0.5, 1, 0.5] : 0.3,
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.1,
                      repeat: Infinity,
                    }}
                  />
                );
              })}
            </motion.div>
          </div>

          {/* Text content */}
          <div>
            <motion.h3
              className="text-3xl font-bold mb-2"
              style={{
                color: accentColor,
                textShadow: isNearby
                  ? `0 0 20px ${accentColor}80`
                  : `0 0 10px ${accentColor}40`,
              }}
              animate={{
                textShadow: isNearby
                  ? [
                      `0 0 20px ${accentColor}80`,
                      `0 0 30px ${accentColor}`,
                      `0 0 20px ${accentColor}80`,
                    ]
                  : `0 0 10px ${accentColor}40`,
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            >
              {title}
            </motion.h3>
            <p className="text-gray-400 text-sm">{description}</p>

            {/* Attraction indicator */}
            <motion.div
              className="mt-4 flex items-center gap-2"
              animate={{
                opacity: isNearby ? 1 : 0.3,
              }}
            >
              <motion.div
                className="flex-1 h-2 rounded-full overflow-hidden"
                style={{ background: `${accentColor}20` }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${accentColor}, ${accentColor}cc)`,
                    boxShadow: `0 0 10px ${accentColor}`,
                  }}
                  animate={{
                    width: isNearby ? "100%" : "20%",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                  }}
                />
              </motion.div>
              <span
                className="text-xs font-mono"
                style={{ color: accentColor }}
              >
                {isNearby ? "PULL" : "IDLE"}
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};