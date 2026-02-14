var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

// src/components/WaveText/WaveText.tsx
import { motion } from "framer-motion";
import { jsx } from "react/jsx-runtime";
var WaveText = ({
  text,
  delay = 0.05,
  duration = 0.6,
  amplitude = 20,
  className = ""
}) => {
  const characters = text.split("");
  return /* @__PURE__ */ jsx("div", { className: `flex flex-wrap justify-center ${className}`, children: characters.map((char, index) => /* @__PURE__ */ jsx(
    motion.span,
    {
      className: "text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 inline-block",
      initial: { y: 0 },
      animate: {
        y: [0, -amplitude, 0]
      },
      transition: {
        duration,
        repeat: Infinity,
        delay: index * delay,
        ease: "easeInOut"
      },
      style: {
        display: "inline-block",
        minWidth: char === " " ? "0.5em" : "auto"
      },
      children: char === " " ? "\xA0" : char
    },
    index
  )) });
};

// src/components/GlitchText/GlitchText.tsx
import { useEffect, useState } from "react";
import { motion as motion2 } from "framer-motion";
import { Fragment, jsx as jsx2, jsxs } from "react/jsx-runtime";
var GlitchText = ({
  text,
  intensity = 5,
  speed = 0.3,
  colors = true,
  className = ""
}) => {
  const [glitchOffset, setGlitchOffset] = useState({ x: 0, y: 0 });
  const [isGlitching, setIsGlitching] = useState(false);
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setGlitchOffset({
        x: (Math.random() - 0.5) * intensity * 2,
        y: (Math.random() - 0.5) * intensity * 2
      });
      setTimeout(() => {
        setIsGlitching(false);
        setGlitchOffset({ x: 0, y: 0 });
      }, speed * 100);
    }, speed * 1e3 + Math.random() * 1e3);
    return () => clearInterval(glitchInterval);
  }, [intensity, speed]);
  return /* @__PURE__ */ jsxs("div", { className: `relative inline-block ${className}`, children: [
    /* @__PURE__ */ jsx2(
      motion2.div,
      {
        className: "text-6xl font-black tracking-tighter text-white relative z-10",
        animate: {
          x: glitchOffset.x,
          y: glitchOffset.y
        },
        transition: {
          duration: 0.05,
          ease: "linear"
        },
        children: text
      }
    ),
    colors && isGlitching && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx2(
        motion2.div,
        {
          className: "text-6xl font-black tracking-tighter text-red-500 absolute top-0 left-0 opacity-70 mix-blend-screen",
          style: {
            transform: `translate(${glitchOffset.x - intensity}px, ${glitchOffset.y}px)`
          },
          children: text
        }
      ),
      /* @__PURE__ */ jsx2(
        motion2.div,
        {
          className: "text-6xl font-black tracking-tighter text-cyan-500 absolute top-0 left-0 opacity-70 mix-blend-screen",
          style: {
            transform: `translate(${glitchOffset.x + intensity}px, ${glitchOffset.y}px)`
          },
          children: text
        }
      )
    ] }),
    isGlitching && /* @__PURE__ */ jsx2(
      motion2.div,
      {
        className: "absolute inset-0 pointer-events-none",
        initial: { opacity: 0 },
        animate: { opacity: [0, 0.3, 0] },
        transition: { duration: speed * 0.3 },
        children: /* @__PURE__ */ jsx2(
          "div",
          {
            className: "h-full w-full bg-gradient-to-b from-transparent via-white to-transparent opacity-10",
            style: {
              backgroundSize: "100% 4px",
              backgroundRepeat: "repeat"
            }
          }
        )
      }
    )
  ] });
};

// src/components/TypewriterText/TypewriterText.tsx
import { useEffect as useEffect2, useState as useState2 } from "react";
import { motion as motion3 } from "framer-motion";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var TypewriterText = ({
  text,
  speed = 100,
  showCursor = true,
  loop = false,
  className = ""
}) => {
  const [displayText, setDisplayText] = useState2("");
  const [currentIndex, setCurrentIndex] = useState2(0);
  useEffect2(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (loop && currentIndex === text.length) {
      const timeout = setTimeout(() => {
        setDisplayText("");
        setCurrentIndex(0);
      }, 2e3);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed, loop]);
  return /* @__PURE__ */ jsxs2("div", { className: `inline-flex items-center ${className}`, children: [
    /* @__PURE__ */ jsx3("span", { className: "text-6xl font-black tracking-tight", children: displayText }),
    showCursor && /* @__PURE__ */ jsx3(
      motion3.span,
      {
        className: "text-6xl font-black ml-1",
        animate: { opacity: [1, 0] },
        transition: { duration: 0.8, repeat: Infinity },
        children: "|"
      }
    )
  ] });
};

// src/components/ShatterText/ShatterText.tsx
import { useState as useState3 } from "react";
import { motion as motion4 } from "framer-motion";
import { jsx as jsx4 } from "react/jsx-runtime";
var ShatterText = ({
  text,
  explosive = true,
  speed = 0.5,
  scatter = 100,
  className = ""
}) => {
  const [isShattered, setIsShattered] = useState3(false);
  return /* @__PURE__ */ jsx4(
    "div",
    {
      className: `relative inline-block cursor-pointer ${className}`,
      onMouseEnter: () => setIsShattered(true),
      onMouseLeave: () => setIsShattered(false),
      children: text.split("").map((char, i) => {
        const angle = Math.PI * 2 * i / text.length;
        const distance = isShattered ? scatter : 0;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        return /* @__PURE__ */ jsx4(
          motion4.span,
          {
            className: "text-6xl font-black inline-block",
            animate: {
              x: explosive ? x : 0,
              y: explosive ? y : 0,
              opacity: isShattered ? 0 : 1,
              rotate: isShattered ? Math.random() * 360 - 180 : 0
            },
            transition: {
              duration: speed,
              ease: "easeOut"
            },
            children: char === " " ? "\xA0" : char
          },
          i
        );
      })
    }
  );
};

// src/components/NeonText/NeonText.tsx
import { useEffect as useEffect3, useState as useState4 } from "react";
import { motion as motion5 } from "framer-motion";
import { jsx as jsx5 } from "react/jsx-runtime";
var NeonText = ({
  text,
  color = "#00ffff",
  flicker = true,
  glow = 20,
  className = ""
}) => {
  const [opacity, setOpacity] = useState4(1);
  useEffect3(() => {
    if (!flicker) return;
    const flickerInterval = setInterval(() => {
      if (Math.random() > 0.9) {
        setOpacity(Math.random() * 0.5 + 0.5);
        setTimeout(() => setOpacity(1), 50);
      }
    }, 100);
    return () => clearInterval(flickerInterval);
  }, [flicker]);
  return /* @__PURE__ */ jsx5(
    motion5.div,
    {
      className: `text-6xl font-black tracking-wider ${className}`,
      style: {
        color,
        textShadow: `
          0 0 ${glow}px ${color},
          0 0 ${glow * 2}px ${color},
          0 0 ${glow * 3}px ${color},
          0 0 ${glow * 4}px ${color}
        `,
        opacity
      },
      animate: {
        textShadow: flicker ? [
          `0 0 ${glow}px ${color}, 0 0 ${glow * 2}px ${color}`,
          `0 0 ${glow * 1.5}px ${color}, 0 0 ${glow * 3}px ${color}`,
          `0 0 ${glow}px ${color}, 0 0 ${glow * 2}px ${color}`
        ] : void 0
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      },
      children: text
    }
  );
};

// src/components/SplitText/SplitText.tsx
import { useState as useState5 } from "react";
import { motion as motion6 } from "framer-motion";
import { jsx as jsx6, jsxs as jsxs3 } from "react/jsx-runtime";
var SplitText = ({
  text,
  direction = "horizontal",
  distance = 50,
  speed = 0.6,
  className = ""
}) => {
  const [isHovered, setIsHovered] = useState5(false);
  const midpoint = Math.ceil(text.length / 2);
  const firstHalf = text.slice(0, midpoint);
  const secondHalf = text.slice(midpoint);
  const getOffset = () => {
    if (!isHovered) return { x: 0, y: 0 };
    return direction === "horizontal" ? { x: -distance / 2, y: 0 } : { x: 0, y: -distance / 2 };
  };
  const offset = getOffset();
  return /* @__PURE__ */ jsxs3(
    "div",
    {
      className: `relative inline-block cursor-pointer ${className}`,
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
      children: [
        /* @__PURE__ */ jsx6(
          motion6.span,
          {
            className: "text-6xl font-black inline-block",
            animate: {
              x: direction === "horizontal" ? offset.x : 0,
              y: direction === "vertical" ? offset.y : 0
            },
            transition: { duration: speed, ease: "easeInOut" },
            children: firstHalf
          }
        ),
        /* @__PURE__ */ jsx6(
          motion6.span,
          {
            className: "text-6xl font-black inline-block",
            animate: {
              x: direction === "horizontal" ? -offset.x : 0,
              y: direction === "vertical" ? -offset.y : 0
            },
            transition: { duration: speed, ease: "easeInOut" },
            children: secondHalf
          }
        )
      ]
    }
  );
};

// src/components/MatrixText/MatrixText.tsx
import { useState as useState6, useEffect as useEffect4 } from "react";
import { motion as motion7 } from "framer-motion";
import { jsx as jsx7 } from "react/jsx-runtime";
var GLYPHS = "01\u30A2\u30A4\u30A6\u30A8\u30AA\u30AB\u30AD\u30AF\u30B1\u30B3\u30B5\u30B7\u30B9\u30BB\u30BD\u30BF\u30C1\u30C4\u30C6\u30C8\u30CA\u30CB\u30CC\u30CD\u30CE\u30CF\u30D2\u30D5\u30D8\u30DB";
var MatrixText = ({
  text,
  speed = 0.1,
  color = "#00FF41",
  className = ""
}) => {
  const [displayText, setDisplayText] = useState6(text.split("").map(() => " "));
  useEffect4(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        (prev) => text.split("").map((char, i) => {
          if (i < iteration) return char;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, speed * 1e3);
    return () => clearInterval(interval);
  }, [text, speed]);
  return /* @__PURE__ */ jsx7("div", { className: `font-mono text-6xl font-bold tracking-widest ${className}`, style: { color }, children: displayText.map((char, i) => /* @__PURE__ */ jsx7(
    motion7.span,
    {
      initial: { opacity: 0, textShadow: `0 0 0px ${color}` },
      animate: { opacity: 1, textShadow: `0 0 8px ${color}` },
      className: "inline-block",
      children: char
    },
    i
  )) });
};

// src/components/BounceText/BounceText.tsx
import { motion as motion8 } from "framer-motion";
import { jsx as jsx8 } from "react/jsx-runtime";
var BounceText = ({
  text,
  height = 30,
  stagger = 0.05,
  elasticity = 0.5,
  className = ""
}) => {
  return /* @__PURE__ */ jsx8("div", { className: `inline-flex ${className}`, children: text.split("").map((char, i) => /* @__PURE__ */ jsx8(
    motion8.span,
    {
      className: "text-6xl font-black inline-block",
      animate: {
        y: [0, -height, 0]
      },
      transition: {
        duration: elasticity,
        repeat: Infinity,
        repeatDelay: 0.5,
        delay: i * stagger,
        ease: "easeOut",
        times: [0, 0.4, 1]
      },
      children: char === " " ? "\xA0" : char
    },
    i
  )) });
};

// src/components/FlipText/FlipText.tsx
import { useState as useState7 } from "react";
import { motion as motion9 } from "framer-motion";
import { jsx as jsx9, jsxs as jsxs4 } from "react/jsx-runtime";
var FlipText = ({
  text,
  backText,
  speed = 0.6,
  axis = "y",
  className = ""
}) => {
  const [isFlipped, setIsFlipped] = useState7(false);
  return /* @__PURE__ */ jsx9(
    "div",
    {
      className: `inline-block cursor-pointer perspective-1000 ${className}`,
      onMouseEnter: () => setIsFlipped(true),
      onMouseLeave: () => setIsFlipped(false),
      style: { perspective: "1000px" },
      children: /* @__PURE__ */ jsxs4(
        motion9.div,
        {
          className: "relative",
          animate: {
            rotateX: axis === "x" ? isFlipped ? 180 : 0 : 0,
            rotateY: axis === "y" ? isFlipped ? 180 : 0 : 0
          },
          transition: {
            duration: speed,
            ease: "easeInOut"
          },
          style: { transformStyle: "preserve-3d" },
          children: [
            /* @__PURE__ */ jsx9(
              "div",
              {
                className: "text-6xl font-black",
                style: {
                  backfaceVisibility: "hidden"
                },
                children: text
              }
            ),
            /* @__PURE__ */ jsx9(
              "div",
              {
                className: "text-6xl font-black absolute top-0 left-0",
                style: {
                  backfaceVisibility: "hidden",
                  transform: axis === "x" ? "rotateX(180deg)" : "rotateY(180deg)"
                },
                children: backText || text
              }
            )
          ]
        }
      )
    }
  );
};

// src/components/GradientText/GradientText.tsx
import { motion as motion10 } from "framer-motion";
import { jsx as jsx10 } from "react/jsx-runtime";
var GradientText = ({
  text,
  colors = ["#ff0080", "#ff8c00", "#40e0d0"],
  speed = 3,
  angle = 45,
  className = ""
}) => {
  const gradientColors = colors.join(", ");
  return /* @__PURE__ */ jsx10(
    motion10.div,
    {
      className: `text-6xl font-black ${className}`,
      style: {
        backgroundImage: `linear-gradient(${angle}deg, ${gradientColors})`,
        backgroundSize: "200% 200%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text"
      },
      animate: {
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
      },
      transition: {
        duration: speed,
        repeat: Infinity,
        ease: "linear"
      },
      children: text
    }
  );
};

// src/components/ScrambleText/ScrambleText.tsx
import { useEffect as useEffect5, useState as useState8 } from "react";
import { motion as motion11 } from "framer-motion";
import { jsx as jsx11 } from "react/jsx-runtime";
var ScrambleText = ({
  text,
  speed = 50,
  scrambleSpeed = 20,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>?/",
  className = ""
}) => {
  const [displayText, setDisplayText] = useState8(text);
  const [isScrambling, setIsScrambling] = useState8(true);
  useEffect5(() => {
    let iteration = 0;
    const maxIterations = text.length * scrambleSpeed;
    const interval = setInterval(() => {
      setDisplayText(
        text.split("").map((char, index) => {
          if (index < iteration / scrambleSpeed) {
            return text[index];
          }
          return characters[Math.floor(Math.random() * characters.length)];
        }).join("")
      );
      iteration++;
      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, scrambleSpeed, characters]);
  return /* @__PURE__ */ jsx11(
    motion11.div,
    {
      className: `text-6xl font-mono font-bold tracking-tight ${className}`,
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.3 },
      children: displayText
    }
  );
};

// src/components/PulseText/PulseText.tsx
import { motion as motion12 } from "framer-motion";
import { jsx as jsx12 } from "react/jsx-runtime";
var PulseText = ({
  text,
  scale = 1.2,
  speed = 0.8,
  stagger = true,
  className = ""
}) => {
  if (!stagger) {
    return /* @__PURE__ */ jsx12(
      motion12.div,
      {
        className: `text-6xl font-black ${className}`,
        animate: {
          scale: [1, scale, 1]
        },
        transition: {
          duration: speed,
          repeat: Infinity,
          ease: "easeInOut"
        },
        children: text
      }
    );
  }
  return /* @__PURE__ */ jsx12("div", { className: `inline-flex ${className}`, children: text.split("").map((char, i) => /* @__PURE__ */ jsx12(
    motion12.span,
    {
      className: "text-6xl font-black inline-block",
      animate: {
        scale: [1, scale, 1]
      },
      transition: {
        duration: speed,
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 0.1
      },
      children: char === " " ? "\xA0" : char
    },
    i
  )) });
};

// src/components/ScatterAssemble/ScatterAssemble.tsx
import { motion as motion13 } from "framer-motion";
import { jsx as jsx13 } from "react/jsx-runtime";
var ScatterAssemble = ({
  text,
  scatterRange = 200,
  duration = 0.8,
  stagger = 0.03,
  className = ""
}) => {
  const letters = text.split("");
  return /* @__PURE__ */ jsx13(
    motion13.div,
    {
      className: `flex flex-wrap justify-center overflow-hidden py-10 ${className}`,
      initial: "hidden",
      whileInView: "visible",
      viewport: { once: true },
      children: letters.map((char, i) => /* @__PURE__ */ jsx13(
        motion13.span,
        {
          className: "inline-block text-6xl font-black text-white",
          style: { whiteSpace: "pre" },
          variants: {
            hidden: {
              opacity: 0,
              x: (Math.random() - 0.5) * scatterRange * 2,
              y: (Math.random() - 0.5) * scatterRange * 2,
              rotate: Math.random() * 90 - 45,
              scale: 2
            },
            visible: {
              opacity: 1,
              x: 0,
              y: 0,
              rotate: 0,
              scale: 1,
              transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
                delay: i * stagger
              }
            }
          },
          children: char
        },
        i
      ))
    }
  );
};

// src/components/SpotlightText/SpotlightText.tsx
import { useRef, useState as useState9 } from "react";
import { motion as motion14 } from "framer-motion";
import { jsx as jsx14, jsxs as jsxs5 } from "react/jsx-runtime";
var SpotlightText = ({
  text,
  radius = 150,
  spotlightColor = "rgba(255,255,255,0.2)",
  className = ""
}) => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState9({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - left,
      y: e.clientY - top
    });
  };
  return /* @__PURE__ */ jsxs5(
    "div",
    {
      ref: containerRef,
      onMouseMove: handleMouseMove,
      className: `relative cursor-default select-none ${className}`,
      children: [
        /* @__PURE__ */ jsx14("h1", { className: "text-6xl font-black text-white/10 uppercase tracking-tighter", children: text }),
        /* @__PURE__ */ jsx14(
          motion14.h1,
          {
            className: "absolute inset-0 text-6xl font-black text-white uppercase tracking-tighter",
            style: {
              clipPath: `circle(${radius}px at ${mousePos.x}px ${mousePos.y}px)`,
              textShadow: `0 0 20px ${spotlightColor}`
            },
            transition: { type: "spring", stiffness: 300, damping: 30 },
            children: text
          }
        )
      ]
    }
  );
};

// src/components/LiquidText/LiquidText.tsx
import { motion as motion15 } from "framer-motion";
import { jsx as jsx15, jsxs as jsxs6 } from "react/jsx-runtime";
var LiquidText = ({
  text,
  blur = 10,
  speed = 2,
  className = ""
}) => {
  return /* @__PURE__ */ jsxs6("div", { className: `relative ${className}`, children: [
    /* @__PURE__ */ jsx15("svg", { className: "absolute h-0 w-0", children: /* @__PURE__ */ jsxs6("filter", { id: "goo", children: [
      /* @__PURE__ */ jsx15("feGaussianBlur", { in: "SourceGraphic", stdDeviation: blur, result: "blur" }),
      /* @__PURE__ */ jsx15(
        "feColorMatrix",
        {
          in: "blur",
          mode: "matrix",
          values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7",
          result: "goo"
        }
      ),
      /* @__PURE__ */ jsx15("feComposite", { in: "SourceGraphic", in2: "goo", operator: "atop" })
    ] }) }),
    /* @__PURE__ */ jsx15(
      motion15.div,
      {
        className: "flex justify-center",
        style: { filter: "url(#goo)" },
        children: text.split("").map((char, i) => /* @__PURE__ */ jsx15(
          motion15.span,
          {
            className: "text-7xl font-black text-white inline-block",
            initial: { y: -20, opacity: 0, scale: 0.5 },
            animate: {
              y: [0, -10, 0],
              opacity: 1,
              scale: 1
            },
            transition: {
              y: {
                duration: speed,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.1
              },
              opacity: { duration: 0.5, delay: i * 0.1 }
            },
            children: char === " " ? "\xA0" : char
          },
          i
        ))
      }
    )
  ] });
};

// src/components/MagneticLetter/MagneticLetter.tsx
import { useRef as useRef2 } from "react";
import { motion as motion16, useSpring, useMotionValue } from "framer-motion";
import { jsx as jsx16 } from "react/jsx-runtime";
var MagneticLetter = ({ char, strength }) => {
  const ref = useRef2(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });
  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * strength);
    y.set((clientY - centerY) * strength);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  return /* @__PURE__ */ jsx16(
    motion16.span,
    {
      ref,
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      style: { x: springX, y: springY, display: "inline-block", whiteSpace: "pre" },
      className: "text-6xl font-black text-white cursor-pointer",
      children: char
    }
  );
};
var MagneticText = ({ text, strength = 0.5, className = "" }) => {
  return /* @__PURE__ */ jsx16("div", { className: `flex justify-center gap-1 ${className}`, children: text.split("").map((char, i) => /* @__PURE__ */ jsx16(MagneticLetter, { char, strength }, i)) });
};

// src/components/RippleButton/RippleButton.tsx
import { useState as useState12 } from "react";
import { motion as motion18, AnimatePresence as AnimatePresence3 } from "framer-motion";

// src/components/NotificationProvider.tsx
import { createContext, useContext, useState as useState11, useCallback } from "react";
import { motion as motion17, AnimatePresence as AnimatePresence2 } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, TriangleAlert } from "lucide-react";
import { jsx as jsx17, jsxs as jsxs7 } from "react/jsx-runtime";
var NotificationContext = createContext(null);
var PHRASES = [
  "Look at you, interacting with things. \u{1F5B1}\uFE0F",
  "Task failed successfully. (Wait, no, it worked)",
  "Your click has been noted by the overlords.",
  "Executing sudo get_coffee...",
  "Error: Success? That's a first.",
  "You clicked it. I felt that. \u26A1",
  "Processing... mostly just vibes though.",
  "Another one for the logs. \u{1F4DD}",
  "Warning: User is becoming too powerful.",
  "If you keep clicking, I'm telling your mom."
];
var getRandomPhrase = () => PHRASES[Math.floor(Math.random() * PHRASES.length)];
var useNotification = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotification must be used inside NotificationProvider");
  return ctx;
};

// src/components/RippleButton/RippleButton.tsx
import { jsx as jsx18, jsxs as jsxs8 } from "react/jsx-runtime";
var RippleButton = ({
  children,
  color = "#3b82f6",
  rippleColor = "rgba(255, 255, 255, 0.6)",
  className = "",
  onClick
}) => {
  const { notify } = useNotification();
  const [ripples, setRipples] = useState12([]);
  const handleClick = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = {
      x,
      y,
      id: Date.now()
    };
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
    if (onClick) {
      onClick();
    } else {
      notify(getRandomPhrase(), "info");
    }
  };
  return /* @__PURE__ */ jsxs8(
    "button",
    {
      onClick: handleClick,
      className: `relative overflow-hidden px-8 py-4 rounded-lg font-bold text-white text-lg ${className} cursor-pointer`,
      style: { backgroundColor: color },
      children: [
        children,
        /* @__PURE__ */ jsx18(AnimatePresence3, { children: ripples.map((ripple) => /* @__PURE__ */ jsx18(
          motion18.span,
          {
            className: "absolute rounded-full pointer-events-none",
            style: {
              left: ripple.x,
              top: ripple.y,
              backgroundColor: rippleColor
            },
            initial: { width: 0, height: 0, opacity: 1 },
            animate: { width: 400, height: 400, opacity: 0 },
            exit: { opacity: 0 },
            transition: { duration: 0.6, ease: "easeOut" }
          },
          ripple.id
        )) })
      ]
    }
  );
};

// src/components/MagneticButton/MagneticButton.tsx
import { useRef as useRef3, useState as useState13 } from "react";
import { motion as motion19, useSpring as useSpring2 } from "framer-motion";
import { jsx as jsx19, jsxs as jsxs9 } from "react/jsx-runtime";
var MagneticButton = ({
  children,
  strength = 0.3,
  color = "#3b82f6",
  className = "",
  onClick
}) => {
  const { notify } = useNotification();
  const ref = useRef3(null);
  const [isHovered, setIsHovered] = useState13(false);
  const x = useSpring2(0, { stiffness: 150, damping: 15 });
  const y = useSpring2(0, { stiffness: 150, damping: 15 });
  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * strength);
    y.set((clientY - centerY) * strength);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };
  return /* @__PURE__ */ jsxs9(
    motion19.button,
    {
      ref,
      onMouseMove: handleMouseMove,
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: handleMouseLeave,
      onClick: () => {
        if (onClick) {
          onClick();
        } else {
          notify(getRandomPhrase(), "info");
        }
      },
      style: { x, y, backgroundColor: color },
      className: `px-8 py-4 rounded-lg font-bold text-white text-lg relative overflow-hidden ${className} cursor-pointer`,
      whileHover: { scale: 1.05 },
      whileTap: { scale: 0.95 },
      children: [
        /* @__PURE__ */ jsx19(
          motion19.div,
          {
            className: "absolute inset-0 bg-white/20",
            initial: { scale: 0, opacity: 0 },
            animate: { scale: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 },
            transition: { duration: 0.3 }
          }
        ),
        /* @__PURE__ */ jsx19("span", { className: "relative z-10", children })
      ]
    }
  );
};

// src/components/LiquidFillButton/LiquidFillButton.tsx
import { useState as useState14 } from "react";
import { motion as motion20 } from "framer-motion";
import { jsx as jsx20, jsxs as jsxs10 } from "react/jsx-runtime";
var LiquidFillButton = ({
  children,
  fillColor = "#3b82f6",
  textColor = "#ffffff",
  borderColor = "#3b82f6",
  speed = 0.4,
  className = "",
  onClick
}) => {
  const [isHovered, setIsHovered] = useState14(false);
  const { notify } = useNotification();
  return /* @__PURE__ */ jsxs10(
    "button",
    {
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
      onClick: () => {
        if (onClick) {
          onClick();
        } else {
          notify(getRandomPhrase(), "info");
        }
      },
      className: `relative px-8 py-4 rounded-lg font-bold text-lg overflow-hidden ${className} cursor-pointer`,
      style: {
        border: `2px solid ${borderColor}`,
        color: isHovered ? textColor : borderColor
      },
      children: [
        /* @__PURE__ */ jsx20(
          motion20.div,
          {
            className: "absolute inset-0",
            style: { backgroundColor: fillColor },
            initial: { y: "100%" },
            animate: { y: isHovered ? "0%" : "100%" },
            transition: { duration: speed, ease: "easeInOut" }
          }
        ),
        /* @__PURE__ */ jsx20("span", { className: "relative z-10", children })
      ]
    }
  );
};

// src/components/ShimmerButton/ShimmerButton.tsx
import { motion as motion21 } from "framer-motion";
import { jsx as jsx21, jsxs as jsxs11 } from "react/jsx-runtime";
var ShimmerButton = ({
  children,
  color = "#3b82f6",
  shimmerColor = "rgba(255, 255, 255, 0.5)",
  speed = 2,
  className = "",
  onClick
}) => {
  const { notify } = useNotification();
  return /* @__PURE__ */ jsxs11(
    "button",
    {
      onClick: () => {
        if (onClick) {
          onClick();
        } else {
          notify(getRandomPhrase(), "info");
        }
      },
      className: `relative px-8 py-4 rounded-lg font-bold text-white text-lg overflow-hidden ${className} cursor-pointer`,
      style: { backgroundColor: color },
      children: [
        /* @__PURE__ */ jsx21(
          motion21.div,
          {
            className: "absolute inset-0 -translate-x-full",
            style: {
              background: `linear-gradient(90deg, transparent, ${shimmerColor}, transparent)`
            },
            animate: {
              x: ["0%", "200%"]
            },
            transition: {
              duration: speed,
              repeat: Infinity,
              ease: "linear"
            }
          }
        ),
        /* @__PURE__ */ jsx21("span", { className: "relative z-10", children })
      ]
    }
  );
};

// src/components/GlowPulseButton/GlowPulseButton.tsx
import { motion as motion22 } from "framer-motion";
import { jsx as jsx22 } from "react/jsx-runtime";
var GlowPulseButton = ({
  children,
  color = "#3b82f6",
  glowColor = "#3b82f6",
  intensity = 20,
  speed = 2,
  className = "",
  onClick
}) => {
  const { notify } = useNotification();
  return /* @__PURE__ */ jsx22(
    motion22.button,
    {
      onClick: () => {
        if (onClick) {
          onClick();
        } else {
          notify(getRandomPhrase(), "info");
        }
      },
      className: `px-8 py-4 rounded-lg font-bold text-white text-lg ${className} cursor-pointer`,
      style: {
        backgroundColor: color
      },
      animate: {
        boxShadow: [
          `0 0 ${intensity}px ${glowColor}`,
          `0 0 ${intensity * 2}px ${glowColor}`,
          `0 0 ${intensity}px ${glowColor}`
        ]
      },
      transition: {
        duration: speed,
        repeat: Infinity,
        ease: "easeInOut"
      },
      whileHover: { scale: 1.05 },
      whileTap: { scale: 0.95 },
      children
    }
  );
};

// src/components/3DPressButton/3DPressButton.tsx
import { useState as useState15 } from "react";
import { motion as motion23 } from "framer-motion";
import { jsx as jsx23 } from "react/jsx-runtime";
var PressButton = ({
  children,
  color = "#3b82f6",
  shadowColor = "#1e40af",
  depth = 8,
  className = "",
  onClick
}) => {
  const [isPressed, setIsPressed] = useState15(false);
  const { notify } = useNotification();
  return /* @__PURE__ */ jsx23(
    motion23.button,
    {
      onMouseDown: () => setIsPressed(true),
      onMouseUp: () => setIsPressed(false),
      onMouseLeave: () => setIsPressed(false),
      onClick: () => {
        if (onClick) {
          onClick();
        } else {
          notify(getRandomPhrase(), "info");
        }
      },
      className: `px-8 py-4 rounded-lg font-bold text-white text-lg relative ${className} cursor-pointer`,
      style: {
        backgroundColor: color,
        boxShadow: isPressed ? `0 2px 0 ${shadowColor}` : `0 ${depth}px 0 ${shadowColor}`,
        transform: isPressed ? `translateY(${depth - 2}px)` : "translateY(0)",
        transition: "all 0.1s ease"
      },
      whileHover: { scale: 1.02 },
      children
    }
  );
};

// src/components/SplitRevealButton/SplitRevealButton.tsx
import { useState as useState16 } from "react";
import { motion as motion24 } from "framer-motion";
import { jsx as jsx24, jsxs as jsxs12 } from "react/jsx-runtime";
var SplitRevealButton = ({
  children,
  hoverText,
  color = "#3b82f6",
  hoverColor = "#8b5cf6",
  speed = 0.3,
  className = "",
  onClick
}) => {
  const [isHovered, setIsHovered] = useState16(false);
  const displayText = hoverText || children;
  const { notify } = useNotification();
  return /* @__PURE__ */ jsx24(
    "button",
    {
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
      onClick: () => {
        if (onClick) {
          onClick();
        } else {
          notify(getRandomPhrase(), "info");
        }
      },
      className: `relative px-8 py-4 rounded-lg font-bold text-white text-lg overflow-hidden ${className} cursor-pointer`,
      style: { backgroundColor: isHovered ? hoverColor : color },
      children: /* @__PURE__ */ jsxs12("div", { className: "relative h-6 w-8 flex items-center justify-center", children: [
        /* @__PURE__ */ jsx24(
          motion24.span,
          {
            className: "absolute",
            initial: { y: 0, opacity: 1 },
            animate: {
              y: isHovered ? -30 : 0,
              opacity: isHovered ? 0 : 1
            },
            transition: { duration: speed, ease: "easeInOut" },
            children
          }
        ),
        /* @__PURE__ */ jsx24(
          motion24.span,
          {
            className: "absolute",
            initial: { y: 30, opacity: 0 },
            animate: {
              y: isHovered ? 0 : 30,
              opacity: isHovered ? 1 : 0
            },
            transition: { duration: speed, ease: "easeInOut" },
            children: displayText
          }
        )
      ] })
    }
  );
};

// src/components/ParticleButton/ParticleButton.tsx
import { useState as useState17 } from "react";
import { motion as motion25, AnimatePresence as AnimatePresence4 } from "framer-motion";
import { jsx as jsx25, jsxs as jsxs13 } from "react/jsx-runtime";
var ParticleButton = ({
  children,
  color = "#3b82f6",
  particleColor = "#60a5fa",
  particleCount = 12,
  className = "",
  onClick
}) => {
  const { notify } = useNotification();
  const [particles, setParticles] = useState17([]);
  const handleClick = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: Date.now() + i,
      x: centerX,
      y: centerY,
      angle: 360 / particleCount * i
    }));
    setParticles(newParticles);
    setTimeout(() => {
      setParticles([]);
    }, 1e3);
    if (onClick) {
      onClick();
    } else {
      notify(getRandomPhrase(), "info");
    }
  };
  return /* @__PURE__ */ jsxs13(
    "button",
    {
      onClick: handleClick,
      className: `relative px-8 py-4 rounded-lg font-bold text-white text-lg overflow-visible ${className} cursor-pointer`,
      style: { backgroundColor: color },
      children: [
        /* @__PURE__ */ jsx25(
          motion25.span,
          {
            whileHover: { scale: 1.05 },
            whileTap: { scale: 0.95 },
            className: "inline-block",
            children
          }
        ),
        /* @__PURE__ */ jsx25(AnimatePresence4, { children: particles.map((particle) => {
          const distance = 100;
          const radian = particle.angle * Math.PI / 180;
          const x = Math.cos(radian) * distance;
          const y = Math.sin(radian) * distance;
          return /* @__PURE__ */ jsx25(
            motion25.div,
            {
              className: "absolute w-2 h-2 rounded-full pointer-events-none",
              style: {
                backgroundColor: particleColor,
                left: particle.x,
                top: particle.y
              },
              initial: { x: 0, y: 0, opacity: 1, scale: 1 },
              animate: {
                x,
                y,
                opacity: 0,
                scale: 0
              },
              exit: { opacity: 0 },
              transition: { duration: 0.8, ease: "easeOut" }
            },
            particle.id
          );
        }) })
      ]
    }
  );
};

// src/components/BorderGlowButton/BorderGlowButton.tsx
import { motion as motion26 } from "framer-motion";
import { jsx as jsx26, jsxs as jsxs14 } from "react/jsx-runtime";
var BorderGlowButton = ({
  children,
  color = "#000000",
  glowColor = "#3b82f6",
  speed = 2,
  className = "",
  onClick
}) => {
  const { notify } = useNotification();
  return /* @__PURE__ */ jsxs14(
    "button",
    {
      onClick: () => {
        if (onClick) {
          onClick();
        } else {
          notify(getRandomPhrase(), "info");
        }
      },
      className: `relative px-8 py-4 rounded-lg font-bold text-white text-lg ${className} cursor-pointer`,
      style: { backgroundColor: color },
      children: [
        /* @__PURE__ */ jsx26(
          motion26.div,
          {
            className: "absolute inset-0 rounded-lg",
            style: {
              padding: "2px",
              background: `linear-gradient(90deg, ${glowColor}, transparent, ${glowColor})`,
              backgroundSize: "200% 100%"
            },
            animate: {
              backgroundPosition: ["0% 0%", "200% 0%"]
            },
            transition: {
              duration: speed,
              repeat: Infinity,
              ease: "linear"
            },
            children: /* @__PURE__ */ jsx26(
              "div",
              {
                className: "w-full h-full rounded-lg",
                style: { backgroundColor: color }
              }
            )
          }
        ),
        /* @__PURE__ */ jsx26("span", { className: "relative z-10", children })
      ]
    }
  );
};

// src/components/ExpandButton/ExpandButton.tsx
import { useState as useState18 } from "react";
import { motion as motion27 } from "framer-motion";
import { jsx as jsx27, jsxs as jsxs15 } from "react/jsx-runtime";
var ExpandButton = ({
  children,
  expandedText,
  color = "#3b82f6",
  speed = 0.3,
  className = "",
  onClick
}) => {
  const [isExpanded, setIsExpanded] = useState18(false);
  const { notify } = useNotification();
  return /* @__PURE__ */ jsx27(
    motion27.button,
    {
      onMouseEnter: () => setIsExpanded(true),
      onMouseLeave: () => setIsExpanded(false),
      onClick: () => {
        if (onClick) {
          onClick();
        } else {
          notify(getRandomPhrase(), "info");
        }
      },
      className: `px-8 py-4 rounded-lg font-bold text-white text-lg overflow-hidden ${className} cursor-pointer`,
      style: { backgroundColor: color },
      animate: {
        width: isExpanded ? "auto" : "auto"
      },
      transition: { duration: speed, ease: "easeInOut" },
      whileHover: { scale: 1.05 },
      whileTap: { scale: 0.95 },
      children: /* @__PURE__ */ jsxs15(motion27.div, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx27("span", { children }),
        /* @__PURE__ */ jsx27(
          motion27.span,
          {
            initial: { width: 0, opacity: 0 },
            animate: {
              width: isExpanded ? "auto" : 0,
              opacity: isExpanded ? 1 : 0
            },
            transition: { duration: speed },
            className: "whitespace-nowrap overflow-hidden",
            children: expandedText && `\u2192 ${expandedText}`
          }
        )
      ] })
    }
  );
};

// src/components/TiltCard/TitlCard.tsx
import { useRef as useRef4, useState as useState19 } from "react";
import { motion as motion28 } from "framer-motion";
import { jsx as jsx28, jsxs as jsxs16 } from "react/jsx-runtime";
var TiltCard = ({
  title = "Tilt Card",
  description = "Hover me to see the 3D tilt effect in action",
  intensity = 15,
  glare = true,
  scale = 1.05,
  className = ""
}) => {
  const ref = useRef4(null);
  const [rotateX, setRotateX] = useState19(0);
  const [rotateY, setRotateY] = useState19(0);
  const [glarePos, setGlarePos] = useState19({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState19(false);
  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setRotateX((y - 0.5) * -intensity * 2);
    setRotateY((x - 0.5) * intensity * 2);
    setGlarePos({ x: x * 100, y: y * 100 });
  };
  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };
  return /* @__PURE__ */ jsxs16(
    motion28.div,
    {
      ref,
      onMouseMove: handleMouseMove,
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: handleMouseLeave,
      animate: { rotateX, rotateY, scale: isHovered ? scale : 1 },
      transition: { type: "spring", stiffness: 300, damping: 30 },
      style: { transformStyle: "preserve-3d", perspective: 1e3 },
      className: `relative w-72 rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-800 p-6 cursor-pointer ${className}`,
      children: [
        glare && isHovered && /* @__PURE__ */ jsx28(
          "div",
          {
            className: "absolute inset-0 rounded-2xl pointer-events-none overflow-hidden",
            style: {
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.15) 0%, transparent 60%)`
            }
          }
        ),
        /* @__PURE__ */ jsxs16("div", { style: { transform: "translateZ(40px)" }, children: [
          /* @__PURE__ */ jsx28("div", { className: "w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx28("div", { className: "w-4 h-4 rounded-full bg-indigo-400" }) }),
          /* @__PURE__ */ jsx28("h3", { className: "text-lg font-bold text-white mb-2", children: title }),
          /* @__PURE__ */ jsx28("p", { className: "text-sm text-zinc-400", children: description })
        ] }),
        /* @__PURE__ */ jsx28(
          motion28.div,
          {
            className: "absolute bottom-0 left-0 right-0 h-px rounded-full",
            style: {
              background: `linear-gradient(90deg, transparent, rgba(99,102,241,${isHovered ? 0.8 : 0}), transparent)`
            }
          }
        )
      ]
    }
  );
};

// src/components/GlassCard/GlassCard.tsx
import { useState as useState20 } from "react";
import { motion as motion29 } from "framer-motion";
import { jsx as jsx29, jsxs as jsxs17 } from "react/jsx-runtime";
var GlassCard = ({
  title = "Glass Card",
  description = "A beautiful glassmorphism card with blur and transparency",
  blur = 12,
  opacity = 10,
  borderOpacity = 20,
  color = "#6366f1",
  className = ""
}) => {
  const [isHovered, setIsHovered] = useState20(false);
  return /* @__PURE__ */ jsxs17(
    motion29.div,
    {
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
      whileHover: { y: -6 },
      transition: { type: "spring", stiffness: 300, damping: 20 },
      className: `relative w-72 rounded-2xl p-6 cursor-pointer overflow-hidden ${className}`,
      style: {
        backdropFilter: `blur(${blur}px)`,
        backgroundColor: `rgba(255,255,255,${opacity / 100})`,
        border: `1px solid rgba(255,255,255,${borderOpacity / 100})`,
        boxShadow: isHovered ? `0 20px 60px ${color}33, 0 0 0 1px ${color}22` : `0 8px 32px rgba(0,0,0,0.3)`
      },
      children: [
        /* @__PURE__ */ jsx29(
          motion29.div,
          {
            className: "absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-20 blur-2xl",
            style: { backgroundColor: color },
            animate: { scale: isHovered ? 1.5 : 1 },
            transition: { duration: 0.4 }
          }
        ),
        /* @__PURE__ */ jsxs17("div", { className: "relative z-10", children: [
          /* @__PURE__ */ jsx29(
            motion29.div,
            {
              className: "w-10 h-10 rounded-xl flex items-center justify-center mb-4",
              style: { backgroundColor: `${color}33`, border: `1px solid ${color}55` },
              animate: { rotate: isHovered ? 10 : 0 },
              transition: { type: "spring", stiffness: 300 },
              children: /* @__PURE__ */ jsx29("div", { className: "w-4 h-4 rounded-full", style: { backgroundColor: color } })
            }
          ),
          /* @__PURE__ */ jsx29("h3", { className: "text-lg font-bold text-white mb-2", children: title }),
          /* @__PURE__ */ jsx29("p", { className: "text-sm text-white/50", children: description }),
          /* @__PURE__ */ jsx29(
            motion29.div,
            {
              className: "mt-4 flex items-center gap-2 text-xs font-semibold",
              style: { color },
              initial: { opacity: 0, x: -10 },
              animate: { opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 },
              transition: { duration: 0.2 },
              children: "Learn more \u2192"
            }
          )
        ] })
      ]
    }
  );
};

// src/components/HolographicCard/HolographicCard.tsx
import { useRef as useRef5, useState as useState21 } from "react";
import { motion as motion30 } from "framer-motion";
import { jsx as jsx30, jsxs as jsxs18 } from "react/jsx-runtime";
var HolographicCard = ({
  title = "Holographic",
  description = "Move your mouse over me to see the holographic effect",
  intensity = 1,
  className = ""
}) => {
  const ref = useRef5(null);
  const [pos, setPos] = useState21({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState21(false);
  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    setPos({
      x: (e.clientX - left) / width,
      y: (e.clientY - top) / height
    });
  };
  const rotateX = isHovered ? (pos.y - 0.5) * -20 * intensity : 0;
  const rotateY = isHovered ? (pos.x - 0.5) * 20 * intensity : 0;
  return /* @__PURE__ */ jsxs18(
    motion30.div,
    {
      ref,
      onMouseMove: handleMouseMove,
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
      animate: { rotateX, rotateY, scale: isHovered ? 1.05 : 1 },
      transition: { type: "spring", stiffness: 300, damping: 30 },
      style: { transformStyle: "preserve-3d", perspective: 1e3 },
      className: `relative w-72 rounded-2xl p-6 cursor-pointer overflow-hidden ${className}`,
      children: [
        /* @__PURE__ */ jsx30("div", { className: "absolute inset-0 rounded-2xl bg-zinc-900" }),
        /* @__PURE__ */ jsx30(
          motion30.div,
          {
            className: "absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300",
            style: {
              background: `
            radial-gradient(ellipse at ${pos.x * 100}% ${pos.y * 100}%,
              rgba(255,0,128,0.3),
              rgba(255,165,0,0.2),
              rgba(0,255,128,0.2),
              rgba(0,128,255,0.2),
              rgba(128,0,255,0.2),
              transparent 70%
            )
          `,
              opacity: isHovered ? intensity * 0.8 : 0,
              mixBlendMode: "screen"
            }
          }
        ),
        /* @__PURE__ */ jsx30(
          motion30.div,
          {
            className: "absolute inset-0 rounded-2xl",
            style: {
              background: `linear-gradient(
            ${105 + pos.x * 60}deg,
            transparent 30%,
            rgba(255,255,255,0.08) 50%,
            transparent 70%
          )`,
              opacity: isHovered ? 1 : 0
            }
          }
        ),
        /* @__PURE__ */ jsx30(
          "div",
          {
            className: "absolute inset-0 rounded-2xl",
            style: {
              border: "1px solid transparent",
              background: `linear-gradient(#1a1a1a, #1a1a1a) padding-box,
            linear-gradient(${pos.x * 360}deg, #ff0080, #ff8c00, #40e0d0, #7b2fff) border-box`,
              opacity: isHovered ? 1 : 0.3
            }
          }
        ),
        /* @__PURE__ */ jsxs18("div", { className: "relative z-10", style: { transform: "translateZ(30px)" }, children: [
          /* @__PURE__ */ jsx30("div", { className: "w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx30("div", { className: "w-4 h-4 rounded-full bg-gradient-to-br from-pink-400 to-purple-600" }) }),
          /* @__PURE__ */ jsx30("h3", { className: "text-lg font-bold text-white mb-2", children: title }),
          /* @__PURE__ */ jsx30("p", { className: "text-sm text-zinc-400", children: description })
        ] })
      ]
    }
  );
};

// src/components/FlipCard/FlipCard.tsx
import { useState as useState22 } from "react";
import { motion as motion31 } from "framer-motion";
import { jsx as jsx31, jsxs as jsxs19 } from "react/jsx-runtime";
var FlipCard = ({
  frontTitle = "Hover Me",
  frontDescription = "There's something on the other side...",
  backTitle = "Surprise!",
  backDescription = "You found the back of the card!",
  speed = 0.6,
  color = "#6366f1",
  className = ""
}) => {
  const [isFlipped, setIsFlipped] = useState22(false);
  return /* @__PURE__ */ jsx31(
    "div",
    {
      className: `relative w-72 h-48 cursor-pointer ${className}`,
      style: { perspective: 1e3 },
      onMouseEnter: () => setIsFlipped(true),
      onMouseLeave: () => setIsFlipped(false),
      children: /* @__PURE__ */ jsxs19(
        motion31.div,
        {
          className: "relative w-full h-full",
          animate: { rotateY: isFlipped ? 180 : 0 },
          transition: { duration: speed, ease: "easeInOut" },
          style: { transformStyle: "preserve-3d" },
          children: [
            /* @__PURE__ */ jsxs19(
              "div",
              {
                className: "absolute inset-0 rounded-2xl p-6 flex flex-col justify-between",
                style: {
                  backfaceVisibility: "hidden",
                  backgroundColor: "#18181b",
                  border: `1px solid ${color}33`
                },
                children: [
                  /* @__PURE__ */ jsx31(
                    "div",
                    {
                      className: "w-8 h-8 rounded-lg flex items-center justify-center",
                      style: { backgroundColor: `${color}22`, border: `1px solid ${color}44` },
                      children: /* @__PURE__ */ jsx31("div", { className: "w-3 h-3 rounded-full", style: { backgroundColor: color } })
                    }
                  ),
                  /* @__PURE__ */ jsxs19("div", { children: [
                    /* @__PURE__ */ jsx31("h3", { className: "text-lg font-bold text-white", children: frontTitle }),
                    /* @__PURE__ */ jsx31("p", { className: "text-sm text-zinc-400 mt-1", children: frontDescription })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxs19(
              "div",
              {
                className: "absolute inset-0 rounded-2xl p-6 flex flex-col justify-between",
                style: {
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  backgroundColor: color,
                  border: `1px solid ${color}`
                },
                children: [
                  /* @__PURE__ */ jsx31("div", { className: "w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center", children: /* @__PURE__ */ jsx31("div", { className: "w-3 h-3 rounded-full bg-white" }) }),
                  /* @__PURE__ */ jsxs19("div", { children: [
                    /* @__PURE__ */ jsx31("h3", { className: "text-lg font-bold text-white", children: backTitle }),
                    /* @__PURE__ */ jsx31("p", { className: "text-sm text-white/70 mt-1", children: backDescription })
                  ] })
                ]
              }
            )
          ]
        }
      )
    }
  );
};

// src/components/ParticleCard/ParticleCard.tsx
import { useState as useState23 } from "react";
import { motion as motion32, AnimatePresence as AnimatePresence5 } from "framer-motion";
import { jsx as jsx32, jsxs as jsxs20 } from "react/jsx-runtime";
var ParticleCard = ({
  title = "Particle Card",
  description = "Hover to unleash the particles",
  particleCount = 16,
  color = "#6366f1",
  className = ""
}) => {
  const [particles, setParticles] = useState23([]);
  const [isHovered, setIsHovered] = useState23(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      angle: Math.random() * 360,
      distance: Math.random() * 60 + 20
    }));
    setParticles(newParticles);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
    setParticles([]);
  };
  return /* @__PURE__ */ jsxs20(
    motion32.div,
    {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      whileHover: { scale: 1.03, y: -4 },
      transition: { type: "spring", stiffness: 300, damping: 20 },
      className: `relative w-72 rounded-2xl p-6 cursor-pointer overflow-hidden ${className}`,
      style: {
        backgroundColor: "#18181b",
        border: `1px solid ${isHovered ? color + "66" : "rgba(255,255,255,0.05)"}`,
        boxShadow: isHovered ? `0 0 40px ${color}22` : "none",
        transition: "border-color 0.3s, box-shadow 0.3s"
      },
      children: [
        /* @__PURE__ */ jsx32(AnimatePresence5, { children: particles.map((p) => {
          const rad = p.angle * Math.PI / 180;
          return /* @__PURE__ */ jsx32(
            motion32.div,
            {
              className: "absolute rounded-full pointer-events-none",
              style: {
                width: p.size,
                height: p.size,
                backgroundColor: color,
                left: `${p.x}%`,
                top: `${p.y}%`
              },
              initial: { opacity: 0.8, scale: 1, x: 0, y: 0 },
              animate: {
                opacity: 0,
                scale: 0,
                x: Math.cos(rad) * p.distance,
                y: Math.sin(rad) * p.distance
              },
              exit: { opacity: 0 },
              transition: { duration: 1.2, ease: "easeOut" }
            },
            p.id
          );
        }) }),
        /* @__PURE__ */ jsxs20("div", { className: "relative z-10", children: [
          /* @__PURE__ */ jsx32(
            motion32.div,
            {
              className: "w-10 h-10 rounded-xl flex items-center justify-center mb-4",
              style: { backgroundColor: `${color}22`, border: `1px solid ${color}44` },
              animate: { rotate: isHovered ? 180 : 0 },
              transition: { duration: 0.4 },
              children: /* @__PURE__ */ jsx32("div", { className: "w-4 h-4 rounded-full", style: { backgroundColor: color } })
            }
          ),
          /* @__PURE__ */ jsx32("h3", { className: "text-lg font-bold text-white mb-2", children: title }),
          /* @__PURE__ */ jsx32("p", { className: "text-sm text-zinc-400", children: description })
        ] })
      ]
    }
  );
};

// src/components/SpotlightCard/SpotlightCard.tsx
import { useRef as useRef6, useState as useState24 } from "react";
import { motion as motion33 } from "framer-motion";
import { jsx as jsx33, jsxs as jsxs21 } from "react/jsx-runtime";
var SpotlightCard = ({
  title = "Spotlight Card",
  description = "Move your mouse around to see the spotlight follow",
  spotlightColor = "#6366f1",
  spotlightSize = 200,
  className = ""
}) => {
  const ref = useRef6(null);
  const [pos, setPos] = useState24({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState24(false);
  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { left, top } = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - left, y: e.clientY - top });
  };
  return /* @__PURE__ */ jsxs21(
    "div",
    {
      ref,
      onMouseMove: handleMouseMove,
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
      className: `relative w-72 rounded-2xl p-6 overflow-hidden cursor-pointer ${className}`,
      style: {
        backgroundColor: "#18181b",
        border: "1px solid rgba(255,255,255,0.05)"
      },
      children: [
        /* @__PURE__ */ jsx33(
          motion33.div,
          {
            className: "absolute inset-0 pointer-events-none rounded-2xl",
            animate: { opacity: isHovered ? 1 : 0 },
            transition: { duration: 0.3 },
            style: {
              background: `radial-gradient(${spotlightSize}px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}22, transparent 70%)`
            }
          }
        ),
        /* @__PURE__ */ jsx33(
          motion33.div,
          {
            className: "absolute inset-0 pointer-events-none rounded-2xl",
            animate: { opacity: isHovered ? 1 : 0 },
            style: {
              background: `radial-gradient(${spotlightSize * 1.5}px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}44, transparent 70%)`,
              maskImage: `radial-gradient(${spotlightSize}px circle at ${pos.x}px ${pos.y}px, black, transparent)`,
              WebkitMaskImage: `radial-gradient(${spotlightSize}px circle at ${pos.x}px ${pos.y}px, black, transparent)`
            }
          }
        ),
        /* @__PURE__ */ jsxs21("div", { className: "relative z-10", children: [
          /* @__PURE__ */ jsx33(
            motion33.div,
            {
              className: "w-10 h-10 rounded-xl flex items-center justify-center mb-4",
              style: {
                backgroundColor: `${spotlightColor}22`,
                border: `1px solid ${spotlightColor}44`
              },
              animate: { scale: isHovered ? 1.1 : 1 },
              children: /* @__PURE__ */ jsx33("div", { className: "w-4 h-4 rounded-full", style: { backgroundColor: spotlightColor } })
            }
          ),
          /* @__PURE__ */ jsx33("h3", { className: "text-lg font-bold text-white mb-2", children: title }),
          /* @__PURE__ */ jsx33("p", { className: "text-sm text-zinc-400", children: description }),
          /* @__PURE__ */ jsx33(
            motion33.div,
            {
              className: "mt-6 h-px w-full",
              style: {
                background: `linear-gradient(90deg, ${spotlightColor}88, transparent)`
              },
              animate: { scaleX: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 },
              transition: { duration: 0.4 }
            }
          )
        ] })
      ]
    }
  );
};

// src/components/MorphCard/MorphCard.tsx
import { useState as useState25 } from "react";
import { motion as motion34 } from "framer-motion";
import { jsx as jsx34, jsxs as jsxs22 } from "react/jsx-runtime";
var MorphCard = ({
  title = "Morph Card",
  description = "Watch the border morph and breathe on hover",
  color = "#6366f1",
  speed = 3,
  className = ""
}) => {
  const [isHovered, setIsHovered] = useState25(false);
  const borderRadii = [
    "30% 70% 70% 30% / 30% 30% 70% 70%",
    "50% 50% 30% 70% / 50% 70% 30% 50%",
    "70% 30% 50% 50% / 30% 50% 70% 50%",
    "30% 70% 70% 30% / 30% 30% 70% 70%"
  ];
  return /* @__PURE__ */ jsxs22(
    "div",
    {
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
      className: `relative w-72 cursor-pointer ${className}`,
      children: [
        /* @__PURE__ */ jsx34(
          motion34.div,
          {
            className: "absolute inset-0 blur-xl opacity-40",
            style: { backgroundColor: color },
            animate: {
              borderRadius: isHovered ? borderRadii : "16px",
              scale: isHovered ? 1.05 : 1
            },
            transition: {
              duration: speed,
              repeat: isHovered ? Infinity : 0,
              ease: "easeInOut"
            }
          }
        ),
        /* @__PURE__ */ jsxs22(
          motion34.div,
          {
            className: "relative p-6 overflow-hidden",
            style: { backgroundColor: "#18181b" },
            animate: {
              borderRadius: isHovered ? borderRadii : "16px",
              border: isHovered ? `1px solid ${color}88` : "1px solid rgba(255,255,255,0.05)"
            },
            transition: {
              duration: speed,
              repeat: isHovered ? Infinity : 0,
              ease: "easeInOut"
            },
            children: [
              /* @__PURE__ */ jsx34(
                motion34.div,
                {
                  className: "absolute inset-0 pointer-events-none",
                  style: {
                    background: `linear-gradient(135deg, ${color}11, transparent, ${color}11)`
                  },
                  animate: { opacity: isHovered ? 1 : 0 },
                  transition: { duration: 0.3 }
                }
              ),
              /* @__PURE__ */ jsxs22("div", { className: "relative z-10", children: [
                /* @__PURE__ */ jsx34(
                  motion34.div,
                  {
                    className: "w-10 h-10 rounded-xl flex items-center justify-center mb-4",
                    style: { backgroundColor: `${color}22`, border: `1px solid ${color}44` },
                    animate: {
                      borderRadius: isHovered ? ["12px", "50%", "12px"] : "12px"
                    },
                    transition: { duration: speed, repeat: isHovered ? Infinity : 0 },
                    children: /* @__PURE__ */ jsx34("div", { className: "w-4 h-4 rounded-full", style: { backgroundColor: color } })
                  }
                ),
                /* @__PURE__ */ jsx34("h3", { className: "text-lg font-bold text-white mb-2", children: title }),
                /* @__PURE__ */ jsx34("p", { className: "text-sm text-zinc-400", children: description })
              ] })
            ]
          }
        )
      ]
    }
  );
};

// src/components/ExpandCard/ExpandCard.tsx
import { useState as useState26 } from "react";
import { motion as motion35, AnimatePresence as AnimatePresence6 } from "framer-motion";
import { jsx as jsx35, jsxs as jsxs23 } from "react/jsx-runtime";
var ExpandCard = ({
  title = "Expand Card",
  description = "Hover to reveal hidden content below",
  expandedContent = "This is the hidden content that appears when you hover! You can put anything here - stats, actions, links, or more details.",
  color = "#6366f1",
  speed = 0.4,
  className = ""
}) => {
  const [isHovered, setIsHovered] = useState26(false);
  return /* @__PURE__ */ jsxs23(
    motion35.div,
    {
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
      className: `relative w-72 rounded-2xl overflow-hidden cursor-pointer ${className}`,
      style: {
        backgroundColor: "#18181b",
        border: `1px solid ${isHovered ? color + "55" : "rgba(255,255,255,0.05)"}`,
        transition: "border-color 0.3s",
        boxShadow: isHovered ? `0 20px 40px ${color}22` : "none"
      },
      children: [
        /* @__PURE__ */ jsx35(
          motion35.div,
          {
            className: "h-1 w-full",
            style: { backgroundColor: color },
            animate: { scaleX: isHovered ? 1 : 0 },
            initial: { scaleX: 0 },
            transition: { duration: speed }
          }
        ),
        /* @__PURE__ */ jsxs23("div", { className: "p-6", children: [
          /* @__PURE__ */ jsx35(
            "div",
            {
              className: "w-10 h-10 rounded-xl flex items-center justify-center mb-4",
              style: { backgroundColor: `${color}22`, border: `1px solid ${color}44` },
              children: /* @__PURE__ */ jsx35(
                motion35.div,
                {
                  className: "w-4 h-4 rounded-full",
                  style: { backgroundColor: color },
                  animate: { scale: isHovered ? 1.3 : 1 },
                  transition: { type: "spring", stiffness: 300 }
                }
              )
            }
          ),
          /* @__PURE__ */ jsx35("h3", { className: "text-lg font-bold text-white mb-2", children: title }),
          /* @__PURE__ */ jsx35("p", { className: "text-sm text-zinc-400", children: description }),
          /* @__PURE__ */ jsx35(AnimatePresence6, { children: isHovered && /* @__PURE__ */ jsxs23(
            motion35.div,
            {
              initial: { opacity: 0, height: 0, marginTop: 0 },
              animate: { opacity: 1, height: "auto", marginTop: 16 },
              exit: { opacity: 0, height: 0, marginTop: 0 },
              transition: { duration: speed, ease: "easeInOut" },
              className: "overflow-hidden",
              children: [
                /* @__PURE__ */ jsx35(
                  "div",
                  {
                    className: "pt-4 border-t text-sm text-zinc-300 leading-relaxed",
                    style: { borderColor: `${color}33` },
                    children: expandedContent
                  }
                ),
                /* @__PURE__ */ jsx35(
                  motion35.button,
                  {
                    className: "mt-4 px-4 py-2 rounded-lg text-xs font-bold text-white",
                    style: { backgroundColor: color },
                    whileHover: { scale: 1.05 },
                    whileTap: { scale: 0.95 },
                    children: "Learn More \u2192"
                  }
                )
              ]
            }
          ) })
        ] })
      ]
    }
  );
};

// src/components/NeonCard/NeonCard.tsx
import { useState as useState27 } from "react";
import { motion as motion36 } from "framer-motion";
import { jsx as jsx36, jsxs as jsxs24 } from "react/jsx-runtime";
var NeonCard = ({
  title = "Neon Card",
  description = "Cyberpunk-style card with neon glow effects",
  color = "#00ffff",
  flicker = true,
  className = ""
}) => {
  const [isHovered, setIsHovered] = useState27(false);
  return /* @__PURE__ */ jsxs24(
    motion36.div,
    {
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
      whileHover: { scale: 1.03, y: -4 },
      className: `relative w-72 rounded-2xl p-6 cursor-pointer overflow-hidden ${className}`,
      style: { backgroundColor: "#050505" },
      animate: {
        boxShadow: isHovered ? [
          `0 0 20px ${color}66, inset 0 0 20px ${color}11`,
          `0 0 40px ${color}88, inset 0 0 30px ${color}22`,
          `0 0 20px ${color}66, inset 0 0 20px ${color}11`
        ] : `0 0 0px transparent`
      },
      transition: {
        scale: { type: "spring", stiffness: 300, damping: 20 },
        y: { type: "spring", stiffness: 300, damping: 20 },
        boxShadow: {
          duration: flicker ? 1.5 : 0.3,
          repeat: isHovered && flicker ? Infinity : 0,
          ease: "easeInOut"
        }
      },
      children: [
        ["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos, i) => /* @__PURE__ */ jsx36(
          motion36.div,
          {
            className: `absolute w-4 h-4 ${pos}`,
            style: {
              borderTop: i < 2 ? `2px solid ${color}` : "none",
              borderBottom: i >= 2 ? `2px solid ${color}` : "none",
              borderLeft: i % 2 === 0 ? `2px solid ${color}` : "none",
              borderRight: i % 2 === 1 ? `2px solid ${color}` : "none",
              borderRadius: i === 0 ? "16px 0 0 0" : i === 1 ? "0 16px 0 0" : i === 2 ? "0 0 0 16px" : "0 0 16px 0"
            },
            animate: { opacity: isHovered ? [0.5, 1, 0.5] : 0.3 },
            transition: { duration: 1.5, repeat: Infinity }
          },
          i
        )),
        /* @__PURE__ */ jsx36(
          "div",
          {
            className: "absolute inset-0 pointer-events-none opacity-5",
            style: {
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)"
            }
          }
        ),
        /* @__PURE__ */ jsxs24("div", { className: "relative z-10", children: [
          /* @__PURE__ */ jsx36(
            motion36.div,
            {
              className: "w-10 h-10 rounded-xl flex items-center justify-center mb-4",
              style: {
                backgroundColor: `${color}11`,
                border: `1px solid ${color}`,
                boxShadow: `0 0 10px ${color}66`
              },
              animate: {
                boxShadow: isHovered ? [`0 0 10px ${color}66`, `0 0 20px ${color}99`, `0 0 10px ${color}66`] : `0 0 5px ${color}44`
              },
              transition: { duration: 1.5, repeat: Infinity },
              children: /* @__PURE__ */ jsx36(
                "div",
                {
                  className: "w-4 h-4 rounded-full",
                  style: { backgroundColor: color, boxShadow: `0 0 8px ${color}` }
                }
              )
            }
          ),
          /* @__PURE__ */ jsx36(
            "h3",
            {
              className: "text-lg font-bold mb-2",
              style: {
                color,
                textShadow: `0 0 10px ${color}`
              },
              children: title
            }
          ),
          /* @__PURE__ */ jsx36("p", { className: "text-sm", style: { color: `${color}99` }, children: description }),
          /* @__PURE__ */ jsx36(
            motion36.div,
            {
              className: "mt-4 h-px",
              style: {
                background: `linear-gradient(90deg, ${color}, transparent)`,
                boxShadow: `0 0 8px ${color}`
              },
              animate: { opacity: isHovered ? [0.5, 1, 0.5] : 0.3 },
              transition: { duration: 1.5, repeat: Infinity }
            }
          )
        ] })
      ]
    }
  );
};

// src/components/StackCard/StackCard.tsx
import { useState as useState28 } from "react";
import { motion as motion37 } from "framer-motion";
import { jsx as jsx37, jsxs as jsxs25 } from "react/jsx-runtime";
var StackCard = ({
  title = "Stack Card",
  description = "Hover to fan out the card stack",
  stackCount = 3,
  color = "#6366f1",
  spread = 12,
  className = ""
}) => {
  const [isHovered, setIsHovered] = useState28(false);
  const stackColors = [color, `${color}cc`, `${color}88`];
  return /* @__PURE__ */ jsx37(
    "div",
    {
      className: `relative w-72 cursor-pointer ${className}`,
      style: { height: "180px" },
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
      children: Array.from({ length: stackCount }).reverse().map((_, reverseI) => {
        const i = stackCount - 1 - reverseI;
        const isTop = i === 0;
        return /* @__PURE__ */ jsx37(
          motion37.div,
          {
            className: "absolute inset-0 rounded-2xl p-6",
            style: {
              backgroundColor: i === 0 ? "#18181b" : `${color}${i === 1 ? "22" : "11"}`,
              border: `1px solid ${stackColors[i] || color}44`,
              zIndex: stackCount - i
            },
            animate: {
              rotate: isHovered ? i === 0 ? 0 : i % 2 === 0 ? spread * i : -spread * i : i * 2,
              y: isHovered ? i * -8 : i * -4,
              scale: isHovered ? 1 - i * 0.02 : 1 - i * 0.03
            },
            transition: { type: "spring", stiffness: 300, damping: 25, delay: i * 0.05 },
            children: isTop && /* @__PURE__ */ jsxs25("div", { className: "relative z-10", children: [
              /* @__PURE__ */ jsx37(
                "div",
                {
                  className: "w-10 h-10 rounded-xl flex items-center justify-center mb-4",
                  style: { backgroundColor: `${color}22`, border: `1px solid ${color}44` },
                  children: /* @__PURE__ */ jsx37("div", { className: "w-4 h-4 rounded-full", style: { backgroundColor: color } })
                }
              ),
              /* @__PURE__ */ jsx37("h3", { className: "text-lg font-bold text-white", children: title }),
              /* @__PURE__ */ jsx37("p", { className: "text-sm text-zinc-400 mt-1", children: description })
            ] })
          },
          i
        );
      })
    }
  );
};

// src/components/LiquidCard/LiquidCard.tsx
import { useState as useState29 } from "react";
import { motion as motion38 } from "framer-motion";
import { jsx as jsx38, jsxs as jsxs26 } from "react/jsx-runtime";
var LiquidCard = ({
  title = "Liquid Metal",
  description = "A true organic fluid effect using SVG filters.",
  liquidColor = "#c084fc",
  className = ""
}) => {
  const [mousePos, setMousePos] = useState29({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState29(false);
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };
  return /* @__PURE__ */ jsxs26(
    motion38.div,
    {
      onMouseMove: handleMouseMove,
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
      whileHover: { scale: 1.01 },
      className: `relative w-80 h-96 rounded-3xl overflow-hidden bg-slate-950 border border-white/10 ${className}`,
      children: [
        /* @__PURE__ */ jsx38("svg", { className: "hidden", children: /* @__PURE__ */ jsx38("defs", { children: /* @__PURE__ */ jsxs26("filter", { id: "liquid-goo", children: [
          /* @__PURE__ */ jsx38("feGaussianBlur", { in: "SourceGraphic", stdDeviation: "10", result: "blur" }),
          /* @__PURE__ */ jsx38(
            "feColorMatrix",
            {
              in: "blur",
              mode: "matrix",
              values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7",
              result: "goo"
            }
          ),
          /* @__PURE__ */ jsx38("feComposite", { in: "SourceGraphic", in2: "goo", operator: "atop" })
        ] }) }) }),
        /* @__PURE__ */ jsxs26(
          "div",
          {
            className: "absolute inset-0 z-0",
            style: { filter: "url(#liquid-goo)" },
            children: [
              /* @__PURE__ */ jsx38(
                motion38.div,
                {
                  className: "absolute rounded-full",
                  style: {
                    background: liquidColor,
                    width: 150,
                    height: 150,
                    left: -75,
                    top: -75,
                    filter: "blur(5px)"
                  },
                  animate: {
                    x: mousePos.x,
                    y: mousePos.y,
                    scale: isHovered ? 1.2 : 0,
                    opacity: isHovered ? 0.8 : 0
                  },
                  transition: { type: "spring", damping: 20, stiffness: 150 }
                }
              ),
              [...Array(4)].map((_, i) => /* @__PURE__ */ jsx38(
                motion38.div,
                {
                  className: "absolute rounded-full",
                  style: {
                    background: liquidColor,
                    width: 100 + i * 20,
                    height: 100 + i * 20,
                    opacity: 0.6
                  },
                  animate: {
                    x: [20 + i * 40, 150 + i * 10, 20 + i * 40],
                    y: [50 + i * 20, 250 - i * 20, 50 + i * 20],
                    scale: [1, 1.2, 1]
                  },
                  transition: {
                    duration: 10 + i * 2,
                    repeat: Infinity,
                    ease: "linear"
                  }
                },
                i
              ))
            ]
          }
        ),
        /* @__PURE__ */ jsx38("div", { className: "absolute inset-0 z-10 flex flex-col justify-end p-8 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent", children: /* @__PURE__ */ jsxs26("div", { className: "backdrop-blur-sm bg-white/5 border border-white/10 p-6 rounded-2xl", children: [
          /* @__PURE__ */ jsx38(
            motion38.h3,
            {
              className: "text-xl font-bold text-white mb-2",
              animate: { color: isHovered ? liquidColor : "#ffffff" },
              children: title
            }
          ),
          /* @__PURE__ */ jsx38("p", { className: "text-sm text-slate-400 leading-relaxed", children: description }),
          /* @__PURE__ */ jsx38("div", { className: "mt-4 flex items-center gap-2", children: /* @__PURE__ */ jsx38("div", { className: "h-1 w-full bg-white/10 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx38(
            motion38.div,
            {
              className: "h-full",
              style: { backgroundColor: liquidColor },
              initial: { width: "0%" },
              animate: { width: isHovered ? "100%" : "30%" }
            }
          ) }) })
        ] }) }),
        /* @__PURE__ */ jsx38("div", { className: "absolute inset-0 z-20 pointer-events-none bg-gradient-to-br from-white/5 to-transparent" })
      ]
    }
  );
};

// src/components/ShatterCard/ShatterCard.tsx
import { useState as useState30 } from "react";
import { motion as motion39, AnimatePresence as AnimatePresence7 } from "framer-motion";
import { jsx as jsx39, jsxs as jsxs27 } from "react/jsx-runtime";
var ShatterCard = ({
  title = "Shatter Card",
  description = "Click to shatter into pieces",
  shardCount = 20,
  glassColor = "#60a5fa",
  className = ""
}) => {
  const [isShattered, setIsShattered] = useState30(false);
  const createShards = () => {
    const shards2 = [];
    for (let i = 0; i < shardCount; i++) {
      const angle = (Math.random() - 0.5) * 180;
      const distance = 150 + Math.random() * 200;
      const size = 30 + Math.random() * 40;
      shards2.push({
        id: i,
        angle,
        distance,
        size,
        rotation: Math.random() * 360,
        x: (Math.random() - 0.5) * 100,
        y: (Math.random() - 0.5) * 100
      });
    }
    return shards2;
  };
  const shards = createShards();
  const handleClick = () => {
    setIsShattered(true);
    setTimeout(() => setIsShattered(false), 2e3);
  };
  return /* @__PURE__ */ jsxs27(
    motion39.div,
    {
      onClick: handleClick,
      className: `relative w-80 h-96 rounded-2xl cursor-pointer overflow-visible ${className}`,
      whileHover: { scale: 1.02 },
      whileTap: { scale: 0.98 },
      style: {
        perspective: "1000px"
      },
      children: [
        /* @__PURE__ */ jsx39(AnimatePresence7, { children: !isShattered && /* @__PURE__ */ jsxs27(
          motion39.div,
          {
            className: "absolute inset-0 rounded-2xl",
            style: {
              background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))`,
              backdropFilter: "blur(10px)",
              border: `1px solid ${glassColor}40`,
              boxShadow: `0 8px 32px rgba(0,0,0,0.1), inset 0 0 20px ${glassColor}20`
            },
            initial: { opacity: 1, scale: 1 },
            exit: {
              opacity: 0,
              scale: 0.8,
              transition: { duration: 0.3 }
            },
            children: [
              /* @__PURE__ */ jsx39(
                "div",
                {
                  className: "absolute inset-0 rounded-2xl opacity-30",
                  style: {
                    background: `linear-gradient(135deg, transparent 0%, ${glassColor}30 50%, transparent 100%)`
                  }
                }
              ),
              /* @__PURE__ */ jsx39(
                motion39.svg,
                {
                  className: "absolute inset-0 w-full h-full",
                  initial: { opacity: 0 },
                  whileHover: { opacity: 0.3 },
                  transition: { duration: 0.3 },
                  children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx39(
                    motion39.line,
                    {
                      x1: `${50 + (Math.random() - 0.5) * 20}%`,
                      y1: `${50 + (Math.random() - 0.5) * 20}%`,
                      x2: `${Math.random() * 100}%`,
                      y2: `${Math.random() * 100}%`,
                      stroke: glassColor,
                      strokeWidth: "1",
                      initial: { pathLength: 0, opacity: 0 },
                      whileHover: {
                        pathLength: 1,
                        opacity: 0.5,
                        transition: { duration: 0.5, delay: i * 0.05 }
                      }
                    },
                    i
                  ))
                }
              ),
              /* @__PURE__ */ jsxs27("div", { className: "relative h-full flex flex-col justify-center items-center p-8 text-center", children: [
                /* @__PURE__ */ jsx39(
                  motion39.div,
                  {
                    className: "w-20 h-20 rounded-full mb-6",
                    style: {
                      background: `linear-gradient(135deg, ${glassColor}60, ${glassColor}30)`,
                      boxShadow: `0 0 30px ${glassColor}40`
                    },
                    animate: {
                      boxShadow: [
                        `0 0 30px ${glassColor}40`,
                        `0 0 50px ${glassColor}60`,
                        `0 0 30px ${glassColor}40`
                      ]
                    },
                    transition: { duration: 2, repeat: Infinity }
                  }
                ),
                /* @__PURE__ */ jsx39("h3", { className: "text-3xl font-bold text-white mb-3", children: title }),
                /* @__PURE__ */ jsx39("p", { className: "text-gray-300 text-sm", children: description }),
                /* @__PURE__ */ jsx39(
                  motion39.div,
                  {
                    className: "mt-6 px-4 py-2 rounded-full text-sm font-medium",
                    style: {
                      background: `${glassColor}20`,
                      border: `1px solid ${glassColor}40`,
                      color: glassColor
                    },
                    whileHover: {
                      background: `${glassColor}30`,
                      scale: 1.05
                    },
                    children: "Click to Shatter"
                  }
                )
              ] })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx39(AnimatePresence7, { children: isShattered && shards.map((shard) => /* @__PURE__ */ jsx39(
          motion39.div,
          {
            className: "absolute",
            style: {
              left: `${50 + shard.x}%`,
              top: `${50 + shard.y}%`,
              width: `${shard.size}px`,
              height: `${shard.size}px`,
              background: `linear-gradient(${shard.rotation}deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))`,
              backdropFilter: "blur(5px)",
              border: `1px solid ${glassColor}60`,
              boxShadow: `0 4px 15px rgba(0,0,0,0.2), inset 0 0 10px ${glassColor}30`,
              clipPath: "polygon(50% 0%, 100% 30%, 80% 100%, 20% 100%, 0% 30%)"
            },
            initial: {
              x: 0,
              y: 0,
              rotate: 0,
              opacity: 1,
              scale: 1
            },
            animate: {
              x: Math.cos(shard.angle * Math.PI / 180) * shard.distance,
              y: Math.sin(shard.angle * Math.PI / 180) * shard.distance,
              rotate: shard.rotation + (Math.random() - 0.5) * 360,
              opacity: 0,
              scale: 0.5
            },
            exit: { opacity: 0 },
            transition: {
              duration: 1,
              ease: "easeOut"
            }
          },
          shard.id
        )) }),
        /* @__PURE__ */ jsx39(AnimatePresence7, { children: isShattered && /* @__PURE__ */ jsx39(
          motion39.div,
          {
            className: "absolute inset-0 rounded-2xl pointer-events-none",
            style: {
              background: `radial-gradient(circle, ${glassColor}60 0%, transparent 70%)`
            },
            initial: { opacity: 0, scale: 0.5 },
            animate: { opacity: [0, 1, 0], scale: [0.5, 2, 2] },
            exit: { opacity: 0 },
            transition: { duration: 0.6 }
          }
        ) })
      ]
    }
  );
};

// src/components/PortalCard/PortalCard.tsx
import { useState as useState31 } from "react";
import { motion as motion40, useSpring as useSpring3, useMotionValue as useMotionValue2, useTransform as useTransform2 } from "framer-motion";
import { jsx as jsx40, jsxs as jsxs28 } from "react/jsx-runtime";
var PortalCard = ({
  title = "Event Horizon",
  description = "A window into the quantum realm.",
  portalColor = "#8b5cf6",
  className = ""
}) => {
  const [isHovered, setIsHovered] = useState31(false);
  const x = useMotionValue2(0);
  const y = useMotionValue2(0);
  const mouseX = useSpring3(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring3(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform2(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform2(mouseX, [-0.5, 0.5], [-15, 15]);
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXRelative = e.clientX - rect.left;
    const mouseYRelative = e.clientY - rect.top;
    x.set(mouseXRelative / width - 0.5);
    y.set(mouseYRelative / height - 0.5);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };
  return /* @__PURE__ */ jsx40(
    motion40.div,
    {
      onMouseMove: handleMouseMove,
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: handleMouseLeave,
      style: {
        perspective: "1200px"
      },
      className: `relative w-80 h-96 cursor-pointer group ${className}`,
      children: /* @__PURE__ */ jsxs28(
        motion40.div,
        {
          style: {
            rotateX,
            rotateY,
            transformStyle: "preserve-3d"
          },
          className: "relative w-full h-full bg-slate-950 rounded-3xl border border-white/10 shadow-2xl transition-shadow duration-500 group-hover:shadow-[0_0_50px_-12px_rgba(139,92,246,0.5)]",
          children: [
            /* @__PURE__ */ jsxs28("div", { className: "absolute inset-0 overflow-hidden rounded-3xl", children: [
              [...Array(6)].map((_, i) => /* @__PURE__ */ jsx40(
                motion40.div,
                {
                  className: "absolute inset-0 border-[2px] rounded-full opacity-20",
                  style: {
                    borderColor: portalColor,
                    transform: `translateZ(${(i + 1) * -40}px) scale(${1 - i * 0.1})`,
                    filter: `blur(${i}px)`
                  },
                  animate: isHovered ? {
                    rotate: i % 2 === 0 ? 360 : -360,
                    scale: [1 - i * 0.1, 1.1 - i * 0.1, 1 - i * 0.1]
                  } : {},
                  transition: {
                    rotate: { duration: 10 + i * 5, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }
                },
                i
              )),
              /* @__PURE__ */ jsx40(
                motion40.div,
                {
                  className: "absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2 rounded-full",
                  style: {
                    background: `radial-gradient(circle, ${portalColor} 0%, transparent 70%)`,
                    transform: "translateZ(-250px)",
                    filter: "blur(20px)"
                  },
                  animate: {
                    opacity: isHovered ? 0.8 : 0.4,
                    scale: isHovered ? 1.5 : 1
                  }
                }
              )
            ] }),
            /* @__PURE__ */ jsxs28(
              "div",
              {
                className: "absolute inset-0 p-8 flex flex-col justify-between",
                style: { transform: "translateZ(50px)" },
                children: [
                  /* @__PURE__ */ jsxs28("div", { className: "flex justify-between items-start", children: [
                    /* @__PURE__ */ jsx40("div", { className: "w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md", children: /* @__PURE__ */ jsx40("div", { className: "w-4 h-4 rounded-full border-2", style: { borderColor: portalColor } }) }),
                    /* @__PURE__ */ jsx40("div", { className: "text-[10px] uppercase tracking-widest text-white/40 font-mono", children: "Sector // 7G" })
                  ] }),
                  /* @__PURE__ */ jsxs28("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx40(
                      motion40.h3,
                      {
                        className: "text-2xl font-bold text-white tracking-tight",
                        style: { textShadow: "0 4px 10px rgba(0,0,0,0.5)" },
                        children: title
                      }
                    ),
                    /* @__PURE__ */ jsx40("p", { className: "text-sm text-white/60 leading-relaxed", children: description }),
                    /* @__PURE__ */ jsxs28(
                      motion40.div,
                      {
                        className: "pt-4 flex items-center gap-3 text-xs font-mono",
                        animate: { color: isHovered ? portalColor : "#94a3b8" },
                        children: [
                          /* @__PURE__ */ jsx40("span", { className: "h-px w-8 bg-current opacity-50" }),
                          "ENTER DIMENSION"
                        ]
                      }
                    )
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsx40(
              "div",
              {
                className: "absolute inset-0 rounded-3xl border-2 border-transparent transition-colors duration-500 group-hover:border-white/20 pointer-events-none",
                style: { transform: "translateZ(20px)" }
              }
            )
          ]
        }
      )
    }
  );
};

// src/components/MagneticCard/MagneticCard.tsx
import { useState as useState32, useRef as useRef7, useEffect as useEffect6 } from "react";
import { motion as motion41, useSpring as useSpring4, useTransform as useTransform3 } from "framer-motion";
import { jsx as jsx41, jsxs as jsxs29 } from "react/jsx-runtime";
var MagneticCard = ({
  title = "Magnetic Card",
  description = "Feel the magnetic pull",
  magnetStrength = 0.3,
  accentColor = "#f97316",
  className = ""
}) => {
  const [isNearby, setIsNearby] = useState32(false);
  const cardRef = useRef7(null);
  const mouseX = useSpring4(0, { stiffness: 150, damping: 20 });
  const mouseY = useSpring4(0, { stiffness: 150, damping: 20 });
  const rotateX = useTransform3(mouseY, [-100, 100], [10, -10]);
  const rotateY = useTransform3(mouseX, [-100, 100], [-10, 10]);
  useEffect6(() => {
    const handleMouseMove = (e) => {
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
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, magnetStrength]);
  return /* @__PURE__ */ jsxs29(
    motion41.div,
    {
      ref: cardRef,
      className: `relative w-80 h-96 rounded-3xl cursor-pointer ${className}`,
      style: {
        x: mouseX,
        y: mouseY,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px"
      },
      children: [
        /* @__PURE__ */ jsx41(
          motion41.div,
          {
            className: "absolute inset-0 rounded-3xl",
            style: {
              background: `radial-gradient(circle at center, ${accentColor}10 0%, transparent 70%)`,
              filter: "blur(40px)",
              scale: isNearby ? 1.5 : 1
            },
            animate: {
              opacity: isNearby ? [0.3, 0.6, 0.3] : 0,
              scale: isNearby ? [1.3, 1.5, 1.3] : 1
            },
            transition: {
              duration: 2,
              repeat: Infinity
            }
          }
        ),
        /* @__PURE__ */ jsxs29(
          motion41.div,
          {
            className: "relative w-full h-full rounded-3xl overflow-hidden",
            style: {
              background: "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)",
              border: `2px solid ${accentColor}40`,
              boxShadow: isNearby ? `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${accentColor}40` : "0 10px 30px rgba(0,0,0,0.3)",
              transformStyle: "preserve-3d"
            },
            animate: {
              borderColor: isNearby ? `${accentColor}80` : `${accentColor}40`
            },
            children: [
              [...Array(6)].map((_, i) => /* @__PURE__ */ jsx41(
                motion41.div,
                {
                  className: "absolute rounded-full border-2",
                  style: {
                    left: "50%",
                    top: "50%",
                    width: `${60 + i * 30}%`,
                    height: `${60 + i * 30}%`,
                    borderColor: `${accentColor}${(20 - i * 3).toString(16).padStart(2, "0")}`,
                    transform: "translate(-50%, -50%)"
                  },
                  animate: {
                    scale: isNearby ? [1, 1.1, 1] : 1,
                    opacity: isNearby ? 0.5 : 0.2
                  },
                  transition: {
                    duration: 2,
                    delay: i * 0.1,
                    repeat: Infinity
                  }
                },
                i
              )),
              /* @__PURE__ */ jsxs29(
                "div",
                {
                  className: "relative h-full flex flex-col justify-between p-8 z-10",
                  style: { transform: "translateZ(50px)" },
                  children: [
                    /* @__PURE__ */ jsx41("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxs29(
                      motion41.div,
                      {
                        className: "relative w-32 h-32 flex items-center justify-center",
                        animate: {
                          rotate: isNearby ? 360 : 0
                        },
                        transition: {
                          rotate: {
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                          }
                        },
                        children: [
                          /* @__PURE__ */ jsx41(
                            motion41.div,
                            {
                              className: "absolute inset-0 rounded-full",
                              style: {
                                border: `3px solid ${accentColor}`,
                                boxShadow: `0 0 30px ${accentColor}80`
                              },
                              animate: {
                                scale: isNearby ? [1, 1.1, 1] : 1,
                                boxShadow: isNearby ? [
                                  `0 0 30px ${accentColor}80`,
                                  `0 0 50px ${accentColor}`,
                                  `0 0 30px ${accentColor}80`
                                ] : `0 0 20px ${accentColor}40`
                              },
                              transition: {
                                duration: 1.5,
                                repeat: Infinity
                              }
                            }
                          ),
                          /* @__PURE__ */ jsxs29(
                            motion41.div,
                            {
                              className: "w-16 h-16 rounded-full relative",
                              style: {
                                background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
                                boxShadow: `0 0 30px ${accentColor}`
                              },
                              animate: {
                                boxShadow: isNearby ? [
                                  `0 0 30px ${accentColor}`,
                                  `0 0 60px ${accentColor}`,
                                  `0 0 30px ${accentColor}`
                                ] : `0 0 20px ${accentColor}80`
                              },
                              transition: {
                                duration: 1,
                                repeat: Infinity
                              },
                              children: [
                                /* @__PURE__ */ jsx41(
                                  motion41.div,
                                  {
                                    className: "absolute top-1 left-1/2 w-2 h-2 rounded-full bg-white",
                                    style: { transform: "translateX(-50%)" },
                                    animate: {
                                      scale: isNearby ? [1, 1.5, 1] : 1
                                    },
                                    transition: {
                                      duration: 0.5,
                                      repeat: Infinity
                                    }
                                  }
                                ),
                                /* @__PURE__ */ jsx41(
                                  motion41.div,
                                  {
                                    className: "absolute bottom-1 left-1/2 w-2 h-2 rounded-full bg-black",
                                    style: { transform: "translateX(-50%)" },
                                    animate: {
                                      scale: isNearby ? [1, 1.5, 1] : 1
                                    },
                                    transition: {
                                      duration: 0.5,
                                      repeat: Infinity,
                                      delay: 0.25
                                    }
                                  }
                                )
                              ]
                            }
                          ),
                          [...Array(8)].map((_, i) => {
                            const angle = i * 45 * (Math.PI / 180);
                            return /* @__PURE__ */ jsx41(
                              motion41.div,
                              {
                                className: "absolute w-2 h-2 rounded-full",
                                style: {
                                  background: accentColor,
                                  boxShadow: `0 0 10px ${accentColor}`,
                                  left: "50%",
                                  top: "50%"
                                },
                                animate: {
                                  x: Math.cos(angle) * 60,
                                  y: Math.sin(angle) * 60,
                                  scale: isNearby ? [1, 1.5, 1] : 1,
                                  opacity: isNearby ? [0.5, 1, 0.5] : 0.3
                                },
                                transition: {
                                  duration: 2,
                                  delay: i * 0.1,
                                  repeat: Infinity
                                }
                              },
                              i
                            );
                          })
                        ]
                      }
                    ) }),
                    /* @__PURE__ */ jsxs29("div", { children: [
                      /* @__PURE__ */ jsx41(
                        motion41.h3,
                        {
                          className: "text-3xl font-bold mb-2",
                          style: {
                            color: accentColor,
                            textShadow: isNearby ? `0 0 20px ${accentColor}80` : `0 0 10px ${accentColor}40`
                          },
                          animate: {
                            textShadow: isNearby ? [
                              `0 0 20px ${accentColor}80`,
                              `0 0 30px ${accentColor}`,
                              `0 0 20px ${accentColor}80`
                            ] : `0 0 10px ${accentColor}40`
                          },
                          transition: {
                            duration: 1.5,
                            repeat: Infinity
                          },
                          children: title
                        }
                      ),
                      /* @__PURE__ */ jsx41("p", { className: "text-gray-400 text-sm", children: description }),
                      /* @__PURE__ */ jsxs29(
                        motion41.div,
                        {
                          className: "mt-4 flex items-center gap-2",
                          animate: {
                            opacity: isNearby ? 1 : 0.3
                          },
                          children: [
                            /* @__PURE__ */ jsx41(
                              motion41.div,
                              {
                                className: "flex-1 h-2 rounded-full overflow-hidden",
                                style: { background: `${accentColor}20` },
                                children: /* @__PURE__ */ jsx41(
                                  motion41.div,
                                  {
                                    className: "h-full rounded-full",
                                    style: {
                                      background: `linear-gradient(90deg, ${accentColor}, ${accentColor}cc)`,
                                      boxShadow: `0 0 10px ${accentColor}`
                                    },
                                    animate: {
                                      width: isNearby ? "100%" : "20%"
                                    },
                                    transition: {
                                      type: "spring",
                                      stiffness: 100,
                                      damping: 15
                                    }
                                  }
                                )
                              }
                            ),
                            /* @__PURE__ */ jsx41(
                              "span",
                              {
                                className: "text-xs font-mono",
                                style: { color: accentColor },
                                children: isNearby ? "PULL" : "IDLE"
                              }
                            )
                          ]
                        }
                      )
                    ] })
                  ]
                }
              )
            ]
          }
        )
      ]
    }
  );
};

// src/components/RippleCard/RippleCard.tsx
import React33, { useState as useState33 } from "react";
import { motion as motion42, AnimatePresence as AnimatePresence8 } from "framer-motion";
import { jsx as jsx42, jsxs as jsxs30 } from "react/jsx-runtime";
var RippleCard = ({
  title = "Ripple Card",
  description = "Click to create ripples",
  rippleColor = "#06b6d4",
  rippleCount = 3,
  className = ""
}) => {
  const [ripples, setRipples] = useState33([]);
  const [rippleId, setRippleId] = useState33(0);
  const createRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width * 100;
    const y = (e.clientY - rect.top) / rect.height * 100;
    const newRipple = { id: rippleId, x, y };
    setRipples((prev) => [...prev, newRipple]);
    setRippleId((prev) => prev + 1);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 2e3);
  };
  return /* @__PURE__ */ jsxs30(
    motion42.div,
    {
      onClick: createRipple,
      className: `relative w-80 h-96 rounded-3xl overflow-hidden cursor-pointer ${className}`,
      whileHover: { scale: 1.02 },
      style: {
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)"
      },
      children: [
        /* @__PURE__ */ jsx42(
          "div",
          {
            className: "absolute inset-0",
            style: {
              background: `radial-gradient(ellipse at top, ${rippleColor}15, transparent 60%)`
            }
          }
        ),
        [...Array(4)].map((_, i) => /* @__PURE__ */ jsx42(
          motion42.div,
          {
            className: "absolute inset-0 opacity-10",
            style: {
              background: `linear-gradient(${45 + i * 45}deg, transparent 40%, ${rippleColor}30 50%, transparent 60%)`
            },
            animate: {
              x: ["-100%", "100%"]
            },
            transition: {
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5
            }
          },
          i
        )),
        /* @__PURE__ */ jsx42(AnimatePresence8, { children: ripples.map((ripple) => /* @__PURE__ */ jsxs30(React33.Fragment, { children: [
          [...Array(rippleCount)].map((_, i) => /* @__PURE__ */ jsx42(
            motion42.div,
            {
              className: "absolute rounded-full pointer-events-none",
              style: {
                left: `${ripple.x}%`,
                top: `${ripple.y}%`,
                border: `2px solid ${rippleColor}`,
                boxShadow: `0 0 20px ${rippleColor}80, inset 0 0 20px ${rippleColor}40`
              },
              initial: {
                width: 0,
                height: 0,
                x: "-50%",
                y: "-50%",
                opacity: 0.8
              },
              animate: {
                width: "500px",
                height: "500px",
                opacity: 0
              },
              exit: {
                opacity: 0
              },
              transition: {
                duration: 2,
                delay: i * 0.15,
                ease: "easeOut"
              }
            },
            `${ripple.id}-${i}`
          )),
          /* @__PURE__ */ jsx42(
            motion42.div,
            {
              className: "absolute w-4 h-4 rounded-full pointer-events-none",
              style: {
                left: `${ripple.x}%`,
                top: `${ripple.y}%`,
                background: rippleColor,
                boxShadow: `0 0 30px ${rippleColor}`
              },
              initial: {
                scale: 0,
                x: "-50%",
                y: "-50%",
                opacity: 1
              },
              animate: {
                scale: [1, 3, 0],
                opacity: [1, 0.5, 0]
              },
              exit: {
                opacity: 0
              },
              transition: {
                duration: 0.6,
                ease: "easeOut"
              }
            }
          )
        ] }, ripple.id)) }),
        /* @__PURE__ */ jsxs30("div", { className: "relative h-full flex flex-col justify-between p-8", children: [
          /* @__PURE__ */ jsx42(
            motion42.div,
            {
              className: "flex justify-center",
              animate: {
                y: [0, -10, 0]
              },
              transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              },
              children: /* @__PURE__ */ jsxs30(
                motion42.div,
                {
                  className: "relative",
                  whileHover: {
                    scale: 1.1,
                    rotate: [0, -5, 5, -5, 0],
                    transition: { duration: 0.5 }
                  },
                  children: [
                    /* @__PURE__ */ jsxs30(
                      "div",
                      {
                        className: "w-28 h-28 rounded-full flex items-center justify-center relative",
                        style: {
                          background: `conic-gradient(from 0deg, ${rippleColor}80 0deg 90deg, transparent 90deg 180deg, ${rippleColor}80 180deg 270deg, transparent 270deg 360deg)`,
                          boxShadow: `0 10px 40px ${rippleColor}40`
                        },
                        children: [
                          /* @__PURE__ */ jsx42(
                            "div",
                            {
                              className: "w-16 h-16 rounded-full",
                              style: {
                                background: "linear-gradient(135deg, #1e293b, #0f172a)",
                                border: `3px solid ${rippleColor}`
                              }
                            }
                          ),
                          /* @__PURE__ */ jsx42(
                            motion42.div,
                            {
                              className: "absolute inset-0 rounded-full",
                              style: {
                                background: `linear-gradient(135deg, transparent, ${rippleColor}40, transparent)`
                              },
                              animate: {
                                rotate: 360
                              },
                              transition: {
                                duration: 8,
                                repeat: Infinity,
                                ease: "linear"
                              }
                            }
                          )
                        ]
                      }
                    ),
                    [...Array(6)].map((_, i) => {
                      const angle = i * 60 * (Math.PI / 180);
                      return /* @__PURE__ */ jsx42(
                        motion42.div,
                        {
                          className: "absolute w-2 h-2 rounded-full",
                          style: {
                            background: rippleColor,
                            boxShadow: `0 0 10px ${rippleColor}`,
                            left: "50%",
                            top: "50%"
                          },
                          animate: {
                            x: Math.cos(angle) * 50,
                            y: Math.sin(angle) * 50,
                            scale: [1, 0.5, 1],
                            opacity: [0.8, 0.3, 0.8]
                          },
                          transition: {
                            duration: 2,
                            delay: i * 0.2,
                            repeat: Infinity
                          }
                        },
                        i
                      );
                    })
                  ]
                }
              )
            }
          ),
          /* @__PURE__ */ jsxs30("div", { className: "relative", children: [
            /* @__PURE__ */ jsxs30(
              motion42.div,
              {
                className: "mb-6",
                animate: {
                  y: [0, -3, 0]
                },
                transition: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                children: [
                  /* @__PURE__ */ jsx42(
                    "h3",
                    {
                      className: "text-3xl font-bold mb-2",
                      style: {
                        background: `linear-gradient(135deg, white, ${rippleColor})`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        textShadow: `0 0 30px ${rippleColor}40`
                      },
                      children: title
                    }
                  ),
                  /* @__PURE__ */ jsx42("p", { className: "text-gray-400 text-sm", children: description })
                ]
              }
            ),
            /* @__PURE__ */ jsx42("div", { className: "flex gap-1", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx42(
              motion42.div,
              {
                className: "flex-1 rounded-full overflow-hidden",
                style: {
                  height: "4px",
                  background: `${rippleColor}20`
                },
                children: /* @__PURE__ */ jsx42(
                  motion42.div,
                  {
                    className: "h-full rounded-full",
                    style: {
                      background: rippleColor,
                      boxShadow: `0 0 10px ${rippleColor}`
                    },
                    animate: {
                      scaleY: [0.3, 1, 0.3]
                    },
                    transition: {
                      duration: 1.5,
                      delay: i * 0.1,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }
                )
              },
              i
            )) }),
            /* @__PURE__ */ jsx42(
              motion42.p,
              {
                className: "text-xs text-center mt-4",
                style: { color: `${rippleColor}80` },
                animate: {
                  opacity: [0.5, 1, 0.5]
                },
                transition: {
                  duration: 2,
                  repeat: Infinity
                },
                children: "Click anywhere to create ripples"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx42(
          motion42.div,
          {
            className: "absolute inset-0 pointer-events-none",
            style: {
              background: `linear-gradient(180deg, ${rippleColor}10, transparent 50%, ${rippleColor}05)`
            },
            animate: {
              opacity: [0.3, 0.6, 0.3]
            },
            transition: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }
        )
      ]
    }
  );
};

// src/components/TrailCursor/TrailCursor.tsx
import { useEffect as useEffect7, useState as useState34, useRef as useRef8 } from "react";
import { motion as motion43 } from "framer-motion";
import { jsx as jsx43, jsxs as jsxs31 } from "react/jsx-runtime";
var TrailCursor = ({
  color = "#6366f1",
  size = 8,
  trailLength = 12,
  speed = 0.3
}) => {
  const containerRef = useRef8(null);
  const [trail, setTrail] = useState34([]);
  let idCounter = 0;
  useEffect7(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;
      const point = { id: idCounter++, x, y };
      setTrail((prev) => [...prev.slice(-(trailLength - 1)), point]);
    };
    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [trailLength]);
  return /* @__PURE__ */ jsxs31(
    "div",
    {
      ref: containerRef,
      className: "relative w-full h-full min-h-[300px] flex items-center justify-center overflow-hidden cursor-none",
      children: [
        /* @__PURE__ */ jsx43("p", { className: "text-zinc-600 text-sm select-none pointer-events-none", children: "Move your mouse here" }),
        trail.map((point, i) => {
          const progress = (i + 1) / trail.length;
          return /* @__PURE__ */ jsx43(
            motion43.div,
            {
              className: "absolute rounded-full pointer-events-none",
              style: {
                width: size * progress,
                height: size * progress,
                backgroundColor: color,
                left: point.x,
                top: point.y,
                translateX: "-50%",
                translateY: "-50%",
                opacity: progress,
                boxShadow: `0 0 ${size * progress}px ${color}`
              },
              initial: { scale: 1 },
              animate: { scale: 0, opacity: 0 },
              transition: { duration: speed }
            },
            point.id
          );
        })
      ]
    }
  );
};

// src/components/MagneticCursor/MagneticCursor.tsx
import { useEffect as useEffect8, useRef as useRef9, useState as useState35 } from "react";
import { motion as motion44, useSpring as useSpring5, useMotionValue as useMotionValue3 } from "framer-motion";
import { jsx as jsx44, jsxs as jsxs32 } from "react/jsx-runtime";
var MagneticCursor = ({
  color = "#6366f1",
  size = 12,
  strength = 0.3,
  ringSize = 36
}) => {
  const containerRef = useRef9(null);
  const [isHovering, setIsHovering] = useState35(false);
  const [isInside, setIsInside] = useState35(false);
  const cursorX = useMotionValue3(-100);
  const cursorY = useMotionValue3(-100);
  const ringX = useMotionValue3(-100);
  const ringY = useMotionValue3(-100);
  const springX = useSpring5(ringX, { stiffness: 150, damping: 15 });
  const springY = useSpring5(ringY, { stiffness: 150, damping: 15 });
  useEffect8(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cursorX.set(x);
      cursorY.set(y);
      ringX.set(x);
      ringY.set(y);
    };
    const handleMouseOver = (e) => {
      const target = e.target;
      if (target.closest("button, a, [data-magnetic]")) {
        setIsHovering(true);
      }
    };
    const handleMouseEnter = () => setIsInside(true);
    const handleMouseLeave = () => {
      setIsInside(false);
      setIsHovering(false);
      cursorX.set(-100);
      cursorY.set(-100);
      ringX.set(-100);
      ringY.set(-100);
    };
    const handleMouseOut = (e) => {
      const target = e.target;
      if (!target.closest("button, a, [data-magnetic]")) {
        setIsHovering(false);
      }
    };
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseover", handleMouseOver);
    container.addEventListener("mouseout", handleMouseOut);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseover", handleMouseOver);
      container.removeEventListener("mouseout", handleMouseOut);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);
  return /* @__PURE__ */ jsxs32(
    "div",
    {
      ref: containerRef,
      className: "relative w-full h-full min-h-[300px] flex items-center justify-center overflow-hidden cursor-none",
      children: [
        /* @__PURE__ */ jsx44("p", { className: "text-zinc-600 text-sm select-none pointer-events-none", children: "Move over the button below" }),
        /* @__PURE__ */ jsx44(
          "button",
          {
            "data-magnetic": true,
            className: "absolute bottom-8 px-6 py-3 rounded-xl font-bold text-white text-sm",
            style: { backgroundColor: color },
            children: "Magnetic Target"
          }
        ),
        /* @__PURE__ */ jsx44(
          motion44.div,
          {
            className: "absolute rounded-full pointer-events-none",
            style: {
              width: size,
              height: size,
              backgroundColor: color,
              x: cursorX,
              y: cursorY,
              translateX: "-50%",
              translateY: "-50%",
              boxShadow: `0 0 10px ${color}`,
              opacity: isInside ? 1 : 0
            },
            animate: { scale: isHovering ? 0 : 1 },
            transition: { duration: 0.15 }
          }
        ),
        /* @__PURE__ */ jsx44(
          motion44.div,
          {
            className: "absolute rounded-full border-2 pointer-events-none",
            style: {
              width: ringSize,
              height: ringSize,
              borderColor: color,
              x: springX,
              y: springY,
              translateX: "-50%",
              translateY: "-50%",
              opacity: isInside ? 1 : 0
            },
            animate: {
              scale: isHovering ? 1.8 : 1,
              backgroundColor: isHovering ? `${color}22` : "transparent"
            },
            transition: { duration: 0.2 }
          }
        )
      ]
    }
  );
};

// src/components/RippleCursor/RippleCursor.tsx
import { useEffect as useEffect9, useRef as useRef10, useState as useState36 } from "react";
import { motion as motion45, AnimatePresence as AnimatePresence10 } from "framer-motion";
import { jsx as jsx45, jsxs as jsxs33 } from "react/jsx-runtime";
var RippleCursor = ({
  color = "#6366f1",
  size = 80,
  duration = 0.8,
  rippleCount = 3
}) => {
  const containerRef = useRef10(null);
  const [ripples, setRipples] = useState36([]);
  const [pos, setPos] = useState36({ x: -100, y: -100 });
  const [isInside, setIsInside] = useState36(false);
  useEffect9(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      setPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };
    const handleClick = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const newRipples = Array.from({ length: rippleCount }, (_, i) => ({
        id: Date.now() + i,
        x,
        y
      }));
      setRipples((prev) => [...prev, ...newRipples]);
      setTimeout(() => {
        setRipples(
          (prev) => prev.filter((r) => !newRipples.find((nr) => nr.id === r.id))
        );
      }, duration * 1e3 + 200);
    };
    const handleMouseEnter = () => setIsInside(true);
    const handleMouseLeave = () => {
      setIsInside(false);
      setPos({ x: -100, y: -100 });
    };
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("click", handleClick);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("click", handleClick);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [duration, rippleCount]);
  return /* @__PURE__ */ jsxs33(
    "div",
    {
      ref: containerRef,
      className: "relative w-full h-full min-h-[300px] flex items-center justify-center overflow-hidden cursor-none",
      children: [
        /* @__PURE__ */ jsx45("p", { className: "text-zinc-600 text-sm select-none pointer-events-none", children: "Click anywhere to ripple" }),
        isInside && /* @__PURE__ */ jsx45(
          "div",
          {
            className: "absolute rounded-full pointer-events-none",
            style: {
              width: 10,
              height: 10,
              backgroundColor: color,
              left: pos.x,
              top: pos.y,
              transform: "translate(-50%, -50%)",
              boxShadow: `0 0 8px ${color}`
            }
          }
        ),
        /* @__PURE__ */ jsx45(AnimatePresence10, { children: ripples.map((ripple, i) => /* @__PURE__ */ jsx45(
          motion45.div,
          {
            className: "absolute rounded-full border-2 pointer-events-none",
            style: {
              borderColor: color,
              left: ripple.x,
              top: ripple.y,
              transform: "translate(-50%, -50%)"
            },
            initial: { width: 0, height: 0, opacity: 0.8 },
            animate: {
              width: size * (i % rippleCount + 1),
              height: size * (i % rippleCount + 1),
              opacity: 0
            },
            exit: { opacity: 0 },
            transition: {
              duration,
              delay: i % rippleCount * 0.1,
              ease: "easeOut"
            }
          },
          ripple.id
        )) })
      ]
    }
  );
};

// src/components/SpotlightCursor/SpotlightCursor.tsx
import { useRef as useRef11, useState as useState37 } from "react";
import { motion as motion46, useMotionValue as useMotionValue4, useSpring as useSpring6 } from "framer-motion";
import { jsx as jsx46, jsxs as jsxs34 } from "react/jsx-runtime";
var SpotlightCursor = ({
  color = "#6366f1",
  size = 400,
  // Increased size for better effect
  blur = 60,
  opacity = 0.2
}) => {
  const containerRef = useRef11(null);
  const [isInside, setIsInside] = useState37(false);
  const mouseX = useMotionValue4(0);
  const mouseY = useMotionValue4(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring6(mouseX, springConfig);
  const smoothY = useSpring6(mouseY, springConfig);
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };
  return /* @__PURE__ */ jsxs34(
    "div",
    {
      ref: containerRef,
      onMouseMove: handleMouseMove,
      onMouseEnter: () => setIsInside(true),
      onMouseLeave: () => setIsInside(false),
      className: "relative w-full h-full min-h-[400px] flex items-center justify-center overflow-hidden bg-zinc-950 rounded-xl border border-zinc-800",
      children: [
        /* @__PURE__ */ jsx46("div", { className: "z-10 text-center pointer-events-none select-none", children: /* @__PURE__ */ jsx46("h3", { className: "text-zinc-200 font-medium", children: "Interactive Spotlight" }) }),
        /* @__PURE__ */ jsx46(
          motion46.div,
          {
            className: "absolute rounded-full pointer-events-none",
            style: {
              width: size,
              height: size,
              background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
              filter: `blur(${blur}px)`,
              // Use x/y instead of top/left for GPU performance
              x: smoothX,
              y: smoothY,
              translateX: "-50%",
              translateY: "-50%",
              top: 0,
              left: 0
            },
            animate: {
              opacity: isInside ? opacity : 0,
              scale: isInside ? 1 : 0.8
            },
            transition: { duration: 0.3 }
          }
        )
      ]
    }
  );
};

// src/components/EmojiCursor/EmojiCursor.tsx
import { useEffect as useEffect10, useRef as useRef12, useState as useState38 } from "react";
import { motion as motion47, AnimatePresence as AnimatePresence11 } from "framer-motion";
import { jsx as jsx47, jsxs as jsxs35 } from "react/jsx-runtime";
var EmojiCursor = ({
  emojis = ["\u{1F525}", "\u26A1", "\u2728", "\u{1F4A5}", "\u{1F31F}"],
  rate = 3,
  size = 20,
  spread = 80
}) => {
  const containerRef = useRef12(null);
  const [particles, setParticles] = useState38([]);
  let counter = 0;
  let frame = 0;
  useEffect10(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleMouseMove = (e) => {
      frame++;
      if (frame % Math.max(1, Math.round(10 / rate)) !== 0) return;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;
      const particle = {
        id: counter++,
        x,
        y,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        angle: Math.random() * 360,
        distance: Math.random() * spread + 20
      };
      setParticles((prev) => [...prev.slice(-30), particle]);
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== particle.id));
      }, 800);
    };
    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [emojis, rate, spread]);
  return /* @__PURE__ */ jsxs35(
    "div",
    {
      ref: containerRef,
      className: "relative w-full h-full min-h-[300px] flex items-center justify-center overflow-hidden cursor-none",
      children: [
        /* @__PURE__ */ jsx47("p", { className: "text-zinc-600 text-sm select-none pointer-events-none", children: "Move your mouse here" }),
        /* @__PURE__ */ jsx47(AnimatePresence11, { children: particles.map((p) => {
          const rad = p.angle * Math.PI / 180;
          return /* @__PURE__ */ jsx47(
            motion47.div,
            {
              className: "absolute select-none pointer-events-none",
              style: {
                fontSize: size,
                left: p.x,
                top: p.y,
                transform: "translate(-50%, -50%)"
              },
              initial: { opacity: 1, x: 0, y: 0, scale: 1 },
              animate: {
                opacity: 0,
                x: Math.cos(rad) * p.distance,
                y: Math.sin(rad) * p.distance,
                scale: 0.3
              },
              exit: { opacity: 0 },
              transition: { duration: 0.8, ease: "easeOut" },
              children: p.emoji
            },
            p.id
          );
        }) })
      ]
    }
  );
};

// src/components/StringCursor/StringCursor.tsx
import { useEffect as useEffect11, useRef as useRef13, useState as useState39 } from "react";
import { jsx as jsx48, jsxs as jsxs36 } from "react/jsx-runtime";
var StringCursor = ({
  color = "#6366f1",
  thickness = 2,
  elasticity = 0.15,
  nodes = 12
}) => {
  const containerRef = useRef13(null);
  const canvasRef = useRef13(null);
  const mouseRef = useRef13({ x: 0, y: 0 });
  const pointsRef = useRef13([]);
  const animFrameRef = useRef13(void 0);
  const [isInside, setIsInside] = useState39(false);
  useEffect11(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      pointsRef.current = Array.from({ length: nodes }, () => ({ x: cx, y: cy }));
      mouseRef.current = { x: cx, y: cy };
    };
    resize();
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };
    const draw = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const points = pointsRef.current;
      points[0].x += (mouseRef.current.x - points[0].x) * elasticity * 3;
      points[0].y += (mouseRef.current.y - points[0].y) * elasticity * 3;
      for (let i = 1; i < points.length; i++) {
        points[i].x += (points[i - 1].x - points[i].x) * elasticity;
        points[i].y += (points[i - 1].y - points[i].y) * elasticity;
      }
      ctx.beginPath();
      ctx.moveTo(mouseRef.current.x, mouseRef.current.y);
      for (let i = 0; i < points.length - 1; i++) {
        const midX = (points[i].x + points[i + 1].x) / 2;
        const midY = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, midX, midY);
      }
      ctx.strokeStyle = color;
      ctx.lineWidth = thickness;
      ctx.lineCap = "round";
      ctx.shadowColor = color;
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(mouseRef.current.x, mouseRef.current.y, thickness * 3, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.shadowBlur = 15;
      ctx.fill();
      const last = points[points.length - 1];
      ctx.beginPath();
      ctx.arc(last.x, last.y, thickness * 2, 0, Math.PI * 2);
      ctx.fillStyle = `${color}88`;
      ctx.fill();
      animFrameRef.current = requestAnimationFrame(draw);
    };
    const handleMouseEnter = () => setIsInside(true);
    const handleMouseLeave = () => setIsInside(false);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", resize);
    animFrameRef.current = requestAnimationFrame(draw);
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", resize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [color, thickness, elasticity, nodes]);
  return /* @__PURE__ */ jsxs36(
    "div",
    {
      ref: containerRef,
      className: "relative w-full h-full min-h-[300px] flex items-center justify-center overflow-hidden cursor-none",
      children: [
        /* @__PURE__ */ jsx48(
          "canvas",
          {
            ref: canvasRef,
            className: "absolute inset-0 pointer-events-none"
          }
        ),
        /* @__PURE__ */ jsx48("p", { className: "text-zinc-600 text-sm select-none pointer-events-none relative z-10", children: "Move your mouse to pull the string" })
      ]
    }
  );
};

// src/components/WebCursor/WebCursor.tsx
import { useEffect as useEffect12, useRef as useRef14 } from "react";
import { jsx as jsx49, jsxs as jsxs37 } from "react/jsx-runtime";
var WebCursor = ({
  color = "#6366f1",
  thickness = 1,
  points = 8
}) => {
  const containerRef = useRef14(null);
  const canvasRef = useRef14(null);
  const mouseRef = useRef14({ x: -999, y: -999 });
  const animFrameRef = useRef14(void 0);
  const anchorPointsRef = useRef14([]);
  useEffect12(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      const w = canvas.width;
      const h = canvas.height;
      const anchors = [];
      for (let i = 0; i < points; i++) {
        const t = i / points;
        if (t < 0.25) {
          anchors.push({ x: t * 4 * w, y: 0 });
        } else if (t < 0.5) {
          anchors.push({ x: w, y: (t - 0.25) * 4 * h });
        } else if (t < 0.75) {
          anchors.push({ x: w - (t - 0.5) * 4 * w, y: h });
        } else {
          anchors.push({ x: 0, y: h - (t - 0.75) * 4 * h });
        }
      }
      anchorPointsRef.current = anchors;
      mouseRef.current = { x: w / 2, y: h / 2 };
    };
    resize();
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };
    const draw = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouse = mouseRef.current;
      const anchors = anchorPointsRef.current;
      anchors.forEach((anchor, i) => {
        const nextAnchor = anchors[(i + 1) % anchors.length];
        ctx.beginPath();
        ctx.moveTo(anchor.x, anchor.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `${color}66`;
        ctx.lineWidth = thickness;
        ctx.shadowColor = color;
        ctx.shadowBlur = 4;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(anchor.x, anchor.y);
        ctx.quadraticCurveTo(mouse.x, mouse.y, nextAnchor.x, nextAnchor.y);
        ctx.strokeStyle = `${color}33`;
        ctx.lineWidth = thickness * 0.5;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(anchor.x, anchor.y, thickness * 2, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowBlur = 8;
        ctx.fill();
      });
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, thickness * 4, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 20;
      ctx.fill();
      animFrameRef.current = requestAnimationFrame(draw);
    };
    container.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", resize);
    animFrameRef.current = requestAnimationFrame(draw);
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [color, thickness, points]);
  return /* @__PURE__ */ jsxs37(
    "div",
    {
      ref: containerRef,
      className: "relative w-full min-h-[300px] flex items-center justify-center overflow-hidden cursor-none",
      children: [
        /* @__PURE__ */ jsx49("canvas", { ref: canvasRef, className: "absolute inset-0 pointer-events-none" }),
        /* @__PURE__ */ jsx49("p", { className: "text-zinc-600 text-sm select-none pointer-events-none relative z-10", children: "Move to stretch the web" })
      ]
    }
  );
};

// src/components/GravityCursor/GravityCursor.tsx
import { useEffect as useEffect13, useRef as useRef15 } from "react";
import { jsx as jsx50, jsxs as jsxs38 } from "react/jsx-runtime";
var GravityCursor = ({
  color = "#6366f1",
  dotCount = 40,
  gravity = 0.3,
  dotSize = 3
}) => {
  const containerRef = useRef15(null);
  const canvasRef = useRef15(null);
  const mouseRef = useRef15({ x: -999, y: -999 });
  const dotsRef = useRef15([]);
  const animFrameRef = useRef15(void 0);
  useEffect13(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      dotsRef.current = Array.from({ length: dotCount }, () => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        return {
          x,
          y,
          vx: 0,
          vy: 0,
          baseX: x,
          baseY: y,
          size: Math.random() * dotSize + 1
        };
      });
    };
    resize();
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -999, y: -999 };
    };
    const draw = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouse = mouseRef.current;
      const dots = dotsRef.current;
      dots.forEach((dot) => {
        const dx = mouse.x - dot.x;
        const dy = mouse.y - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 150;
        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          dot.vx += dx * force * gravity * 0.1;
          dot.vy += dy * force * gravity * 0.1;
        }
        dot.vx += (dot.baseX - dot.x) * 0.05;
        dot.vy += (dot.baseY - dot.y) * 0.05;
        dot.vx *= 0.85;
        dot.vy *= 0.85;
        dot.x += dot.vx;
        dot.y += dot.vy;
        const distFromMouse = Math.sqrt(
          (mouse.x - dot.x) ** 2 + (mouse.y - dot.y) ** 2
        );
        const proximity = Math.max(0, 1 - distFromMouse / 150);
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.3 + proximity * 0.7;
        ctx.shadowColor = color;
        ctx.shadowBlur = proximity * 10;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
      if (mouse.x > 0) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, dotSize * 2, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 20;
        ctx.fill();
      }
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
  }, [color, dotCount, gravity, dotSize]);
  return /* @__PURE__ */ jsxs38(
    "div",
    {
      ref: containerRef,
      className: "relative w-full min-h-[300px] flex items-center justify-center overflow-hidden cursor-none",
      children: [
        /* @__PURE__ */ jsx50("canvas", { ref: canvasRef, className: "absolute inset-0 pointer-events-none" }),
        /* @__PURE__ */ jsx50("p", { className: "text-zinc-600 text-sm select-none pointer-events-none relative z-10", children: "Watch the dots get pulled in" })
      ]
    }
  );
};

// src/components/InkCursor/InkCursor.tsx
import { useEffect as useEffect14, useRef as useRef16 } from "react";
import { jsx as jsx51, jsxs as jsxs39 } from "react/jsx-runtime";
var InkCursor = ({
  color = "#6366f1",
  opacity = 0.6,
  size = 20,
  speed = 5
}) => {
  const containerRef = useRef16(null);
  const canvasRef = useRef16(null);
  const lastPosRef = useRef16(null);
  const isDrawingRef = useRef16(false);
  useEffect14(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const hexToRgb4 = (hex) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `${r}, ${g}, ${b}`;
    };
    const drawInk = (x, y, lastX, lastY) => {
      const dist = Math.sqrt((x - lastX) ** 2 + (y - lastY) ** 2);
      const steps = Math.max(1, Math.floor(dist / speed));
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const px = lastX + (x - lastX) * t;
        const py = lastY + (y - lastY) * t;
        const gradient = ctx.createRadialGradient(px, py, 0, px, py, size);
        gradient.addColorStop(0, `rgba(${hexToRgb4(color)}, ${opacity})`);
        gradient.addColorStop(0.5, `rgba(${hexToRgb4(color)}, ${opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(${hexToRgb4(color)}, 0)`);
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        if (Math.random() > 0.7) {
          for (let j = 0; j < 3; j++) {
            const splatterX = px + (Math.random() - 0.5) * size * 3;
            const splatterY = py + (Math.random() - 0.5) * size * 3;
            const splatterSize = Math.random() * size * 0.4;
            ctx.beginPath();
            ctx.arc(splatterX, splatterY, splatterSize, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${hexToRgb4(color)}, ${opacity * 0.4})`;
            ctx.fill();
          }
        }
      }
    };
    const handleMouseMove = (e) => {
      if (!isDrawingRef.current) return;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (lastPosRef.current) {
        drawInk(x, y, lastPosRef.current.x, lastPosRef.current.y);
      }
      lastPosRef.current = { x, y };
    };
    const handleMouseDown = (e) => {
      isDrawingRef.current = true;
      const rect = container.getBoundingClientRect();
      lastPosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };
    const handleMouseUp = () => {
      isDrawingRef.current = false;
      lastPosRef.current = null;
    };
    const handleDoubleClick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mouseleave", handleMouseUp);
    container.addEventListener("dblclick", handleDoubleClick);
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mouseleave", handleMouseUp);
      container.removeEventListener("dblclick", handleDoubleClick);
    };
  }, [color, opacity, size, speed]);
  return /* @__PURE__ */ jsxs39(
    "div",
    {
      ref: containerRef,
      className: "relative w-full min-h-[300px] flex items-center justify-center overflow-hidden cursor-crosshair",
      children: [
        /* @__PURE__ */ jsx51("canvas", { ref: canvasRef, className: "absolute inset-0" }),
        /* @__PURE__ */ jsx51("p", { className: "text-zinc-700 text-sm select-none pointer-events-none relative z-10", children: "Click and drag to paint \u2022 Double click to clear" })
      ]
    }
  );
};

// src/components/BlackHoleCursor/BlackHoleCursor.tsx
import { useEffect as useEffect15, useRef as useRef17 } from "react";
import { jsx as jsx52, jsxs as jsxs40 } from "react/jsx-runtime";
var BlackHoleCursor = ({
  color = "#6366f1",
  particleCount = 60,
  suckStrength = 0.5,
  particleSize = 2
}) => {
  const containerRef = useRef17(null);
  const canvasRef = useRef17(null);
  const mouseRef = useRef17({ x: -999, y: -999 });
  const particlesRef = useRef17([]);
  const animFrameRef = useRef17(void 0);
  const spawnParticle = (w, h) => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 1,
    vy: (Math.random() - 0.5) * 1,
    size: Math.random() * particleSize + 0.5,
    opacity: Math.random() * 0.6 + 0.2,
    angle: Math.random() * Math.PI * 2,
    orbitRadius: Math.random() * 30 + 10,
    orbitSpeed: (Math.random() * 0.05 + 0.02) * (Math.random() > 0.5 ? 1 : -1),
    isOrbiting: false
  });
  useEffect15(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      particlesRef.current = Array.from(
        { length: particleCount },
        () => spawnParticle(canvas.width, canvas.height)
      );
    };
    resize();
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -999, y: -999 };
      particlesRef.current.forEach((p) => p.isOrbiting = false);
    };
    const draw = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouse = mouseRef.current;
      if (mouse.x > 0) {
        for (let ring = 3; ring >= 1; ring--) {
          const gradient = ctx.createRadialGradient(
            mouse.x,
            mouse.y,
            0,
            mouse.x,
            mouse.y,
            ring * 20
          );
          gradient.addColorStop(0, `${color}44`);
          gradient.addColorStop(0.5, `${color}22`);
          gradient.addColorStop(1, "transparent");
          ctx.beginPath();
          ctx.arc(mouse.x, mouse.y, ring * 20, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
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
            Object.assign(p, spawnParticle(canvas.width, canvas.height));
            p.isOrbiting = false;
          } else if (dist < 60) {
            p.isOrbiting = true;
            p.angle += p.orbitSpeed * (1 + (60 - dist) / 60);
            p.orbitRadius = Math.max(15, p.orbitRadius - 0.3);
            p.x = mouse.x + Math.cos(p.angle) * p.orbitRadius;
            p.y = mouse.y + Math.sin(p.angle) * p.orbitRadius;
          } else {
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
  return /* @__PURE__ */ jsxs40(
    "div",
    {
      ref: containerRef,
      className: "relative w-full min-h-[300px] flex items-center justify-center overflow-hidden cursor-none",
      children: [
        /* @__PURE__ */ jsx52("canvas", { ref: canvasRef, className: "absolute inset-0 pointer-events-none" }),
        /* @__PURE__ */ jsx52("p", { className: "text-zinc-600 text-sm select-none pointer-events-none relative z-10", children: "Move to create a black hole" })
      ]
    }
  );
};

// src/components/PulseLoader/PulseLoader.tsx
import { motion as motion48 } from "framer-motion";
import { jsx as jsx53 } from "react/jsx-runtime";
var PulseLoader = ({
  color = "#6366f1",
  size = 16,
  dotCount = 3,
  speed = 0.8
}) => {
  return /* @__PURE__ */ jsx53("div", { className: "flex items-center gap-2", children: Array.from({ length: dotCount }).map((_, i) => /* @__PURE__ */ jsx53(
    motion48.div,
    {
      className: "rounded-full",
      style: { width: size, height: size, backgroundColor: color },
      animate: {
        scale: [1, 1.5, 1],
        opacity: [0.4, 1, 0.4],
        boxShadow: [
          `0 0 0px ${color}`,
          `0 0 ${size}px ${color}`,
          `0 0 0px ${color}`
        ]
      },
      transition: {
        duration: speed,
        repeat: Infinity,
        delay: i * (speed / dotCount),
        ease: "easeInOut"
      }
    },
    i
  )) });
};

// src/components/OrbitLoader/OrbitLoader.tsx
import { motion as motion49 } from "framer-motion";
import { jsx as jsx54, jsxs as jsxs41 } from "react/jsx-runtime";
var OrbitLoader = ({
  color = "#6366f1",
  size = 80,
  orbitCount = 3,
  speed = 2
}) => {
  return /* @__PURE__ */ jsxs41(
    "div",
    {
      className: "relative flex items-center justify-center",
      style: { width: size, height: size },
      children: [
        /* @__PURE__ */ jsx54(
          motion49.div,
          {
            className: "absolute rounded-full z-10",
            style: {
              width: size * 0.2,
              height: size * 0.2,
              backgroundColor: color,
              boxShadow: `0 0 ${size * 0.2}px ${color}`
            },
            animate: { scale: [1, 1.2, 1] },
            transition: { duration: speed, repeat: Infinity, ease: "easeInOut" }
          }
        ),
        Array.from({ length: orbitCount }).map((_, i) => {
          const orbitSize = size * (0.4 + i * 0.25);
          const dotSize = size * 0.08;
          return /* @__PURE__ */ jsx54(
            motion49.div,
            {
              className: "absolute rounded-full border",
              style: {
                width: orbitSize,
                height: orbitSize,
                borderColor: `${color}33`
              },
              animate: { rotate: 360 },
              transition: {
                duration: speed * (i + 1) * 0.7,
                repeat: Infinity,
                ease: "linear"
              },
              children: /* @__PURE__ */ jsx54(
                motion49.div,
                {
                  className: "absolute rounded-full",
                  style: {
                    width: dotSize,
                    height: dotSize,
                    backgroundColor: color,
                    top: -dotSize / 2,
                    left: "50%",
                    marginLeft: -dotSize / 2,
                    boxShadow: `0 0 ${dotSize * 2}px ${color}`,
                    opacity: 1 - i * 0.2
                  }
                }
              )
            },
            i
          );
        })
      ]
    }
  );
};

// src/components/MorphLoader/MorphLoader.tsx
import { motion as motion50 } from "framer-motion";
import { jsx as jsx55 } from "react/jsx-runtime";
var MorphLoader = ({
  color = "#6366f1",
  size = 80,
  speed = 2
}) => {
  const shapes = [
    "50% 50% 50% 50%",
    "30% 70% 70% 30% / 30% 30% 70% 70%",
    "60% 40% 30% 70% / 60% 30% 70% 40%",
    "30% 60% 70% 40% / 50% 60% 30% 60%",
    "50% 50% 50% 50%"
  ];
  return /* @__PURE__ */ jsx55("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx55(
    motion50.div,
    {
      style: {
        width: size,
        height: size,
        backgroundColor: color,
        boxShadow: `0 0 ${size * 0.3}px ${color}88`
      },
      animate: {
        borderRadius: shapes,
        rotate: [0, 90, 180, 270, 360],
        scale: [1, 1.1, 0.95, 1.05, 1]
      },
      transition: {
        duration: speed,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  ) });
};

// src/components/DNALoader/DNALoader.tsx
import { motion as motion51 } from "framer-motion";
import { jsx as jsx56, jsxs as jsxs42 } from "react/jsx-runtime";
var DNALoader = ({
  color = "#6366f1",
  secondColor = "#06b6d4",
  dotCount = 8,
  speed = 1.5,
  size = 12
}) => {
  return /* @__PURE__ */ jsx56("div", { className: "flex gap-1 items-center", children: Array.from({ length: dotCount }).map((_, i) => {
    const phase = i / dotCount * Math.PI * 2;
    return /* @__PURE__ */ jsxs42("div", { className: "flex flex-col items-center gap-1", children: [
      /* @__PURE__ */ jsx56(
        motion51.div,
        {
          className: "rounded-full",
          style: { width: size, height: size, backgroundColor: color },
          animate: {
            y: [
              Math.sin(phase) * 20,
              Math.sin(phase + Math.PI) * 20,
              Math.sin(phase + Math.PI * 2) * 20
            ],
            scale: [
              0.6 + Math.abs(Math.sin(phase)) * 0.4,
              0.6 + Math.abs(Math.sin(phase + Math.PI)) * 0.4,
              0.6 + Math.abs(Math.sin(phase)) * 0.4
            ],
            opacity: [
              0.4 + Math.abs(Math.sin(phase)) * 0.6,
              0.4 + Math.abs(Math.sin(phase + Math.PI)) * 0.6,
              0.4 + Math.abs(Math.sin(phase)) * 0.6
            ],
            boxShadow: [
              `0 0 ${size}px ${color}`,
              `0 0 ${size * 0.5}px ${color}`,
              `0 0 ${size}px ${color}`
            ]
          },
          transition: {
            duration: speed,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }
      ),
      /* @__PURE__ */ jsx56(
        motion51.div,
        {
          className: "rounded-full",
          style: { width: size, height: size, backgroundColor: secondColor },
          animate: {
            y: [
              Math.sin(phase + Math.PI) * 20,
              Math.sin(phase + Math.PI * 2) * 20,
              Math.sin(phase + Math.PI * 3) * 20
            ],
            scale: [
              0.6 + Math.abs(Math.sin(phase + Math.PI)) * 0.4,
              0.6 + Math.abs(Math.sin(phase)) * 0.4,
              0.6 + Math.abs(Math.sin(phase + Math.PI)) * 0.4
            ],
            opacity: [
              0.4 + Math.abs(Math.sin(phase + Math.PI)) * 0.6,
              0.4 + Math.abs(Math.sin(phase)) * 0.6,
              0.4 + Math.abs(Math.sin(phase + Math.PI)) * 0.6
            ],
            boxShadow: [
              `0 0 ${size}px ${secondColor}`,
              `0 0 ${size * 0.5}px ${secondColor}`,
              `0 0 ${size}px ${secondColor}`
            ]
          },
          transition: {
            duration: speed,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }
      )
    ] }, i);
  }) });
};

// src/components/ProgressLoader/ProgressLoader.tsx
import { useEffect as useEffect16, useState as useState41 } from "react";
import { motion as motion52 } from "framer-motion";
import { jsx as jsx57, jsxs as jsxs43 } from "react/jsx-runtime";
var ProgressLoader = ({
  color = "#6366f1",
  height = 8,
  speed = 2,
  showPercent = true,
  loop = true
}) => {
  const [progress, setProgress] = useState41(0);
  useEffect16(() => {
    if (!loop) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 1;
      });
    }, speed * 1e3 / 100);
    return () => clearInterval(interval);
  }, [speed, loop]);
  return /* @__PURE__ */ jsxs43("div", { className: "flex flex-col items-center gap-3 w-64", children: [
    showPercent && /* @__PURE__ */ jsxs43("div", { className: "flex justify-between w-full", children: [
      /* @__PURE__ */ jsx57("span", { className: "text-xs text-zinc-500 font-mono", children: "Loading..." }),
      /* @__PURE__ */ jsxs43(
        motion52.span,
        {
          className: "text-xs font-mono font-bold",
          style: { color },
          children: [
            progress,
            "%"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs43(
      "div",
      {
        className: "relative w-full rounded-full overflow-hidden",
        style: { height, backgroundColor: `${color}22` },
        children: [
          /* @__PURE__ */ jsx57(
            motion52.div,
            {
              className: "absolute inset-y-0 left-0 rounded-full",
              style: {
                backgroundColor: color,
                boxShadow: `0 0 ${height * 2}px ${color}`,
                width: `${progress}%`
              },
              transition: { duration: 0.1, ease: "linear" }
            }
          ),
          /* @__PURE__ */ jsx57(
            motion52.div,
            {
              className: "absolute inset-y-0 w-20",
              style: {
                background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)`,
                left: `${progress}%`
              },
              animate: { x: [-80, 0] },
              transition: { duration: 0.5, repeat: Infinity, ease: "linear" }
            }
          )
        ]
      }
    )
  ] });
};

// src/components/RingLoader/RingLoader.tsx
import { motion as motion53 } from "framer-motion";
import { jsx as jsx58, jsxs as jsxs44 } from "react/jsx-runtime";
var RingLoader = ({
  color = "#6366f1",
  size = 80,
  thickness = 6,
  speed = 1.2,
  segments = 3
}) => {
  return /* @__PURE__ */ jsxs44(
    "div",
    {
      className: "relative flex items-center justify-center",
      style: { width: size, height: size },
      children: [
        Array.from({ length: segments }).map((_, i) => /* @__PURE__ */ jsx58(
          motion53.div,
          {
            className: "absolute rounded-full",
            style: {
              width: size - i * (thickness * 2.5),
              height: size - i * (thickness * 2.5),
              border: `${thickness}px solid transparent`,
              borderTopColor: color,
              borderRightColor: i % 2 === 0 ? color : "transparent",
              opacity: 1 - i * 0.25,
              filter: `blur(${i * 0.5}px)`
            },
            animate: { rotate: i % 2 === 0 ? 360 : -360 },
            transition: {
              duration: speed * (i + 1) * 0.6,
              repeat: Infinity,
              ease: "linear"
            }
          },
          i
        )),
        /* @__PURE__ */ jsx58(
          motion53.div,
          {
            className: "absolute rounded-full",
            style: {
              width: size * 0.2,
              height: size * 0.2,
              backgroundColor: color,
              boxShadow: `0 0 ${size * 0.3}px ${color}`
            },
            animate: { scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] },
            transition: { duration: speed, repeat: Infinity, ease: "easeInOut" }
          }
        )
      ]
    }
  );
};

// src/components/SkeletonLoader/SkeletonLoader.tsx
import { motion as motion54 } from "framer-motion";
import { jsx as jsx59, jsxs as jsxs45 } from "react/jsx-runtime";
var SkeletonBlock = ({
  width,
  height,
  color,
  shimmerColor,
  speed,
  delay = 0
}) => /* @__PURE__ */ jsx59(
  "div",
  {
    className: "relative overflow-hidden rounded-lg",
    style: { width, height, backgroundColor: color },
    children: /* @__PURE__ */ jsx59(
      motion54.div,
      {
        className: "absolute inset-0",
        style: {
          background: `linear-gradient(90deg, transparent 0%, ${shimmerColor} 50%, transparent 100%)`,
          backgroundSize: "200% 100%"
        },
        animate: { backgroundPosition: ["-200% 0%", "200% 0%"] },
        transition: {
          duration: speed,
          repeat: Infinity,
          ease: "linear",
          delay
        }
      }
    )
  }
);
var SkeletonLoader = ({
  color = "#27272a",
  shimmerColor = "rgba(255,255,255,0.06)",
  speed = 1.5,
  rows = 3,
  showAvatar = true
}) => {
  return /* @__PURE__ */ jsxs45("div", { className: "flex flex-col gap-4 w-72 p-4 rounded-2xl border border-white/5 bg-zinc-900/50", children: [
    /* @__PURE__ */ jsxs45("div", { className: "flex items-center gap-3", children: [
      showAvatar && /* @__PURE__ */ jsx59(
        SkeletonBlock,
        {
          width: "40px",
          height: 40,
          color,
          shimmerColor,
          speed
        }
      ),
      /* @__PURE__ */ jsxs45("div", { className: "flex flex-col gap-2 flex-1", children: [
        /* @__PURE__ */ jsx59(
          SkeletonBlock,
          {
            width: "60%",
            height: 12,
            color,
            shimmerColor,
            speed,
            delay: 0.1
          }
        ),
        /* @__PURE__ */ jsx59(
          SkeletonBlock,
          {
            width: "40%",
            height: 10,
            color,
            shimmerColor,
            speed,
            delay: 0.2
          }
        )
      ] })
    ] }),
    Array.from({ length: rows }).map((_, i) => /* @__PURE__ */ jsx59(
      SkeletonBlock,
      {
        width: i === rows - 1 ? "75%" : "100%",
        height: 10,
        color,
        shimmerColor,
        speed,
        delay: i * 0.1
      },
      i
    )),
    /* @__PURE__ */ jsx59(
      SkeletonBlock,
      {
        width: "100%",
        height: 120,
        color,
        shimmerColor,
        speed,
        delay: 0.3
      }
    )
  ] });
};

// src/components/WaveLoader/WaveLoader.tsx
import { motion as motion55 } from "framer-motion";
import { jsx as jsx60 } from "react/jsx-runtime";
var WaveLoader = ({
  color = "#6366f1",
  barCount = 8,
  speed = 0.6,
  height = 60,
  gap = 4
}) => {
  return /* @__PURE__ */ jsx60(
    "div",
    {
      className: "flex items-end",
      style: { gap, height },
      children: Array.from({ length: barCount }).map((_, i) => {
        const delay = i / barCount * speed;
        return /* @__PURE__ */ jsx60(
          motion55.div,
          {
            className: "rounded-full",
            style: {
              width: 6,
              backgroundColor: color,
              boxShadow: `0 0 8px ${color}88`
            },
            animate: {
              height: [
                height * 0.2,
                height * (0.5 + Math.sin(i / barCount * Math.PI) * 0.5),
                height * 0.2
              ],
              opacity: [0.4, 1, 0.4]
            },
            transition: {
              duration: speed,
              repeat: Infinity,
              ease: "easeInOut",
              delay
            }
          },
          i
        );
      })
    }
  );
};

// src/components/GridLoader/GridLoader.tsx
import { motion as motion56 } from "framer-motion";
import { jsx as jsx61 } from "react/jsx-runtime";
var GridLoader = ({
  color = "#6366f1",
  size = 20,
  gap = 4,
  speed = 0.8
}) => {
  const sequence = [0, 1, 2, 5, 8, 7, 6, 3, 4];
  return /* @__PURE__ */ jsx61(
    "div",
    {
      className: "grid grid-cols-3",
      style: { gap },
      children: Array.from({ length: 9 }).map((_, i) => /* @__PURE__ */ jsx61(
        motion56.div,
        {
          className: "rounded-sm",
          style: { width: size, height: size, backgroundColor: color },
          animate: {
            opacity: [0.15, 1, 0.15],
            scale: [0.8, 1, 0.8],
            boxShadow: [
              `0 0 0px ${color}`,
              `0 0 ${size}px ${color}`,
              `0 0 0px ${color}`
            ]
          },
          transition: {
            duration: speed * 2,
            repeat: Infinity,
            delay: sequence.indexOf(i) * (speed / sequence.length),
            ease: "easeInOut"
          }
        },
        i
      ))
    }
  );
};

// src/components/ChasingDotsLoader/ChasingDotsLoader.tsx
import { motion as motion57 } from "framer-motion";
import { jsx as jsx62 } from "react/jsx-runtime";
var ChasingDotsLoader = ({
  color = "#6366f1",
  size = 60,
  dotCount = 12,
  speed = 1.2
}) => {
  return /* @__PURE__ */ jsx62(
    "div",
    {
      className: "relative flex items-center justify-center",
      style: { width: size, height: size },
      children: Array.from({ length: dotCount }).map((_, i) => {
        const opacity = 1 - i / dotCount * 0.8;
        const scale = 1 - i / dotCount * 0.5;
        const delay = i * (speed / (dotCount * 2));
        return /* @__PURE__ */ jsx62(
          motion57.div,
          {
            className: "absolute flex justify-center",
            style: {
              width: "100%",
              height: "100%"
            },
            animate: { rotate: 360 },
            transition: {
              duration: speed,
              repeat: Infinity,
              ease: "linear",
              delay: -delay
              // Negative delay starts the animation "in progress"
            },
            children: /* @__PURE__ */ jsx62(
              motion57.div,
              {
                style: {
                  width: size / 8,
                  // Proportional dot size
                  height: size / 8,
                  backgroundColor: color,
                  borderRadius: "50%",
                  opacity,
                  scale,
                  // Leading dot gets a nice glow
                  boxShadow: i === 0 ? `0 0 12px ${color}` : "none"
                }
              }
            )
          },
          i
        );
      })
    }
  );
};

// src/components/InfinityLoader/InfinityLoader.tsx
import { motion as motion58 } from "framer-motion";
import { jsx as jsx63, jsxs as jsxs46 } from "react/jsx-runtime";
var InfinityLoader = ({
  color = "#6366f1",
  size = 120,
  speed = 2.5,
  thickness = 3
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
  return /* @__PURE__ */ jsx63("div", { style: { width: size, height: h + 20 }, className: "flex items-center justify-center", children: /* @__PURE__ */ jsxs46("svg", { width: size, height: h + 20, viewBox: `0 0 ${w} ${h + 10}`, children: [
    /* @__PURE__ */ jsx63(
      "path",
      {
        d: path,
        fill: "none",
        stroke: `${color}22`,
        strokeWidth: thickness
      }
    ),
    /* @__PURE__ */ jsx63(
      motion58.path,
      {
        d: path,
        fill: "none",
        stroke: color,
        strokeWidth: thickness,
        strokeLinecap: "round",
        style: {
          filter: `drop-shadow(0 0 4px ${color})`
        },
        initial: { pathLength: 0, pathOffset: 0 },
        animate: { pathOffset: [0, 1] },
        transition: {
          duration: speed,
          repeat: Infinity,
          ease: "linear"
        },
        strokeDasharray: "0.15 0.85"
      }
    ),
    /* @__PURE__ */ jsx63(
      motion58.circle,
      {
        r: thickness * 2,
        fill: color,
        style: { filter: `drop-shadow(0 0 6px ${color})` },
        children: /* @__PURE__ */ jsx63(
          "animateMotion",
          {
            dur: `${speed}s`,
            repeatCount: "indefinite",
            path
          }
        )
      }
    )
  ] }) });
};

// src/components/TypewriterLoader/TypewriterLoader.tsx
import { useEffect as useEffect17, useState as useState42 } from "react";
import { motion as motion59 } from "framer-motion";
import { jsx as jsx64, jsxs as jsxs47 } from "react/jsx-runtime";
var TypewriterLoader = ({
  color = "#6366f1",
  messages = ["Loading", "Please wait", "Almost there", "Hang tight"],
  speed = 80,
  showCursor = true
}) => {
  const [msgIndex, setMsgIndex] = useState42(0);
  const [displayed, setDisplayed] = useState42("");
  const [isDeleting, setIsDeleting] = useState42(false);
  useEffect17(() => {
    const current = messages[msgIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayed.length < current.length) {
          setDisplayed(current.slice(0, displayed.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1e3);
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
  return /* @__PURE__ */ jsxs47("div", { className: "flex items-center gap-1", children: [
    /* @__PURE__ */ jsx64(
      "span",
      {
        className: "text-2xl font-mono font-bold tracking-tight",
        style: { color },
        children: displayed
      }
    ),
    showCursor && /* @__PURE__ */ jsx64(
      motion59.span,
      {
        className: "text-2xl font-mono font-bold",
        style: { color },
        animate: { opacity: [1, 0, 1] },
        transition: { duration: 0.8, repeat: Infinity },
        children: "|"
      }
    )
  ] });
};

// src/components/ParticleRingLoader/ParticleRingLoader.tsx
import { motion as motion60 } from "framer-motion";
import { jsx as jsx65 } from "react/jsx-runtime";
var ParticleRingLoader = ({
  color = "#6366f1",
  size = 80,
  particleCount = 12,
  speed = 2
}) => {
  const radius = size / 2 - 8;
  return /* @__PURE__ */ jsx65("div", { className: "relative", style: { width: size, height: size }, children: Array.from({ length: particleCount }).map((_, i) => {
    const angle = i / particleCount * Math.PI * 2;
    const x = Math.cos(angle) * radius + size / 2;
    const y = Math.sin(angle) * radius + size / 2;
    const particleSize = 4 + Math.sin(angle) * 2;
    return /* @__PURE__ */ jsx65(
      motion60.div,
      {
        className: "absolute rounded-full",
        style: {
          width: particleSize,
          height: particleSize,
          backgroundColor: color,
          left: x,
          top: y,
          transform: "translate(-50%, -50%)"
        },
        animate: {
          scale: [1, 1.8, 1],
          opacity: [0.3, 1, 0.3],
          boxShadow: [
            `0 0 0px ${color}`,
            `0 0 ${particleSize * 3}px ${color}`,
            `0 0 0px ${color}`
          ]
        },
        transition: {
          duration: speed,
          repeat: Infinity,
          delay: i / particleCount * speed,
          ease: "easeInOut"
        }
      },
      i
    );
  }) });
};

// src/components/BouncingBarLoader/BouncingBarLoader.tsx
import { motion as motion61 } from "framer-motion";
import { jsx as jsx66 } from "react/jsx-runtime";
var BouncingBarLoader = ({
  color = "#6366f1",
  barCount = 5,
  speed = 0.7,
  height = 60,
  width = 8
}) => {
  return /* @__PURE__ */ jsx66("div", { className: "flex items-center gap-1.5", children: Array.from({ length: barCount }).map((_, i) => /* @__PURE__ */ jsx66(
    motion61.div,
    {
      className: "rounded-full",
      style: { width, backgroundColor: color },
      animate: {
        height: [height * 0.2, height, height * 0.2],
        opacity: [0.5, 1, 0.5],
        boxShadow: [
          `0 0 0px ${color}`,
          `0 0 12px ${color}88`,
          `0 0 0px ${color}`
        ]
      },
      transition: {
        duration: speed,
        repeat: Infinity,
        delay: i * (speed / barCount),
        ease: [0.45, 0, 0.55, 1]
      }
    },
    i
  )) });
};

// src/components/GlitchLoader/GlitchLoader.tsx
import { useEffect as useEffect18, useState as useState43 } from "react";
import { motion as motion62 } from "framer-motion";
import { Fragment as Fragment2, jsx as jsx67, jsxs as jsxs48 } from "react/jsx-runtime";
var GlitchLoader = ({
  color = "#6366f1",
  speed = 0.3,
  intensity = 6
}) => {
  const [offset, setOffset] = useState43({ x: 0, y: 0 });
  const [isGlitching, setIsGlitching] = useState43(false);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";
  const [scrambled, setScrambled] = useState43("LOADING");
  useEffect18(() => {
    const glitch = setInterval(() => {
      setIsGlitching(true);
      setOffset({
        x: (Math.random() - 0.5) * intensity * 2,
        y: (Math.random() - 0.5) * intensity
      });
      setScrambled(
        "LOADING".split("").map(
          (c) => Math.random() > 0.7 ? chars[Math.floor(Math.random() * chars.length)] : c
        ).join("")
      );
      setTimeout(() => {
        setIsGlitching(false);
        setOffset({ x: 0, y: 0 });
        setScrambled("LOADING");
      }, speed * 100);
    }, speed * 1e3 + Math.random() * 500);
    return () => clearInterval(glitch);
  }, [speed, intensity]);
  return /* @__PURE__ */ jsxs48("div", { className: "relative inline-block", children: [
    /* @__PURE__ */ jsx67(
      motion62.div,
      {
        className: "text-3xl font-black font-mono tracking-widest",
        style: { color },
        animate: { x: offset.x, y: offset.y },
        transition: { duration: 0.05 },
        children: scrambled
      }
    ),
    isGlitching && /* @__PURE__ */ jsxs48(Fragment2, { children: [
      /* @__PURE__ */ jsx67(
        "div",
        {
          className: "absolute inset-0 text-3xl font-black font-mono tracking-widest opacity-70 mix-blend-screen",
          style: {
            color: "#ff0000",
            transform: `translate(${offset.x - intensity}px, ${offset.y}px)`
          },
          children: scrambled
        }
      ),
      /* @__PURE__ */ jsx67(
        "div",
        {
          className: "absolute inset-0 text-3xl font-black font-mono tracking-widest opacity-70 mix-blend-screen",
          style: {
            color: "#00ffff",
            transform: `translate(${offset.x + intensity}px, ${offset.y}px)`
          },
          children: scrambled
        }
      )
    ] })
  ] });
};

// src/components/SpiralLoader/SpiralLoader.tsx
import { motion as motion63 } from "framer-motion";
import { jsx as jsx68, jsxs as jsxs49 } from "react/jsx-runtime";
var SpiralLoader = ({
  color = "#6366f1",
  size = 100,
  speed = 3,
  turns = 3
}) => {
  const points = [];
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size / 2 - 4;
  const steps = turns * 60;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const angle = t * turns * Math.PI * 2;
    const r = t * maxR;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    points.push(i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`);
  }
  const path = points.join(" ");
  return /* @__PURE__ */ jsxs49("svg", { width: size, height: size, viewBox: `0 0 ${size} ${size}`, children: [
    /* @__PURE__ */ jsx68(
      "path",
      {
        d: path,
        fill: "none",
        stroke: `${color}22`,
        strokeWidth: 2,
        strokeLinecap: "round"
      }
    ),
    /* @__PURE__ */ jsx68(
      motion63.path,
      {
        d: path,
        fill: "none",
        stroke: color,
        strokeWidth: 2,
        strokeLinecap: "round",
        style: { filter: `drop-shadow(0 0 4px ${color})` },
        initial: { pathLength: 0 },
        animate: { pathLength: [0, 1, 0] },
        transition: {
          duration: speed,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    )
  ] });
};

// src/components/FlipCardLoader/FlipCardLoader.tsx
import { motion as motion64 } from "framer-motion";
import { jsx as jsx69 } from "react/jsx-runtime";
var FlipCardLoader = ({
  color = "#6366f1",
  cardCount = 4,
  size = 20,
  speed = 1.2
}) => {
  return /* @__PURE__ */ jsx69("div", { className: "flex items-center gap-2", children: Array.from({ length: cardCount }).map((_, i) => /* @__PURE__ */ jsx69(
    motion64.div,
    {
      style: {
        width: size,
        height: size * 1.4,
        backgroundColor: color,
        borderRadius: 3,
        boxShadow: `0 0 ${size * 0.5}px ${color}44`
      },
      animate: {
        rotateY: [0, 180, 180, 0],
        backgroundColor: [color, `${color}44`, `${color}44`, color],
        boxShadow: [
          `0 0 ${size * 0.5}px ${color}44`,
          `0 0 ${size}px ${color}`,
          `0 0 ${size * 0.5}px ${color}44`,
          `0 0 ${size * 0.5}px ${color}44`
        ]
      },
      transition: {
        duration: speed,
        repeat: Infinity,
        delay: i * (speed / cardCount),
        ease: "easeInOut",
        times: [0, 0.3, 0.7, 1]
      }
    },
    i
  )) });
};

// src/components/GradientWaves/GradientWaves.tsx
import { useRef as useRef18 } from "react";
import { motion as motion65, useTransform as useTransform4, useSpring as useSpring7, useMotionValue as useMotionValue5 } from "framer-motion";
import { jsx as jsx70, jsxs as jsxs50 } from "react/jsx-runtime";
var GradientWaves = ({
  primaryColor = "#6366f1",
  secondaryColor = "#8b5cf6",
  accentColor = "#ec4899",
  waveCount = 3,
  speed = 20,
  blur = 120,
  children
}) => {
  const containerRef = useRef18(null);
  const mouseX = useMotionValue5(0);
  const mouseY = useMotionValue5(0);
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth - 0.5);
    mouseY.set(clientY / innerHeight - 0.5);
  };
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring7(mouseX, springConfig);
  const smoothY = useSpring7(mouseY, springConfig);
  const moveX = useTransform4(smoothX, [-0.5, 0.5], ["-10%", "10%"]);
  const moveY = useTransform4(smoothY, [-0.5, 0.5], ["-10%", "10%"]);
  const colors = [primaryColor, secondaryColor, accentColor];
  return /* @__PURE__ */ jsxs50(
    "div",
    {
      ref: containerRef,
      onMouseMove: handleMouseMove,
      className: "relative w-full min-h-screen bg-slate-950 overflow-hidden selection:bg-indigo-500/30",
      children: [
        /* @__PURE__ */ jsx70(
          "div",
          {
            className: "absolute inset-0 z-[1] opacity-[0.03] pointer-events-none brightness-100 contrast-150",
            style: { backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3 Visual Thinking: Creating a grainy texture %3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }
          }
        ),
        /* @__PURE__ */ jsx70(motion65.div, { style: { x: moveX, y: moveY }, className: "absolute inset-0 z-0", children: Array.from({ length: waveCount }).map((_, i) => /* @__PURE__ */ jsx70(
          motion65.div,
          {
            className: "absolute rounded-full",
            style: {
              background: `radial-gradient(circle, ${colors[i % colors.length]} 0%, transparent 70%)`,
              filter: `blur(${blur}px)`,
              opacity: 0.5,
              width: "50%",
              height: "50%",
              left: `${10 + i * 20}%`,
              top: `${10 + i * 10}%`
            },
            animate: {
              x: [0, 50, -30, 0],
              y: [0, -30, 40, 0],
              scale: [1, 1.1, 0.9, 1]
            },
            transition: {
              duration: speed + i * 5,
              repeat: Infinity,
              ease: "linear"
            }
          },
          i
        )) }),
        /* @__PURE__ */ jsx70("div", { className: "absolute inset-0 z-[2] bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" }),
        /* @__PURE__ */ jsx70("div", { className: "relative z-10 flex flex-col items-center justify-center min-h-screen px-4", children: children || /* @__PURE__ */ jsxs50(
          motion65.div,
          {
            initial: "hidden",
            animate: "visible",
            variants: {
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 }
              }
            },
            className: "text-center",
            children: [
              /* @__PURE__ */ jsxs50(
                motion65.h1,
                {
                  variants: { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } },
                  className: "text-6xl md:text-8xl font-bold text-white mb-6 tracking-tighter",
                  children: [
                    "Build ",
                    /* @__PURE__ */ jsx70("span", { className: "text-slate-500", children: "Fast." }),
                    /* @__PURE__ */ jsx70("br", {}),
                    /* @__PURE__ */ jsx70("span", { className: "bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent", children: "Ship Beautiful." })
                  ]
                }
              ),
              /* @__PURE__ */ jsx70(
                motion65.p,
                {
                  variants: { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } },
                  className: "text-lg md:text-xl text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed",
                  children: "The ultimate toolkit for building modern web applications with React and Tailwind CSS."
                }
              ),
              /* @__PURE__ */ jsxs50(
                motion65.div,
                {
                  variants: { hidden: { scale: 0.9, opacity: 0 }, visible: { scale: 1, opacity: 1 } },
                  className: "flex gap-4 justify-center",
                  children: [
                    /* @__PURE__ */ jsxs50("button", { className: "group relative px-8 py-3 bg-white text-slate-950 rounded-full font-semibold overflow-hidden transition-all hover:pr-12", children: [
                      /* @__PURE__ */ jsx70("span", { className: "relative z-10", children: "Get Started" }),
                      /* @__PURE__ */ jsx70("span", { className: "absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all", children: "\u2192" })
                    ] }),
                    /* @__PURE__ */ jsx70("button", { className: "px-8 py-3 bg-slate-900/50 text-white border border-white/10 rounded-full font-medium hover:bg-slate-800 transition-colors backdrop-blur-md", children: "Documentation" })
                  ]
                }
              )
            ]
          }
        ) }),
        /* @__PURE__ */ jsx70("div", { className: "absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent z-[3]" })
      ]
    }
  );
};

// src/components/DotMatrix/DotMatrix.tsx
import { useRef as useRef19, useEffect as useEffect19, useCallback as useCallback2 } from "react";
import { motion as motion66, useMotionValue as useMotionValue6 } from "framer-motion";
import { jsx as jsx71, jsxs as jsxs51 } from "react/jsx-runtime";
var DotMatrix = ({
  dotColor = "#6366f1",
  glowColor = "#8b5cf6",
  dotSize = 2,
  spacing = 30,
  waveSpeed = 3,
  children
}) => {
  const canvasRef = useRef19(null);
  const containerRef = useRef19(null);
  const animationRef = useRef19(void 0);
  const gridRef = useRef19({ cols: 0, rows: 0 });
  const mousePosRef = useRef19({ x: -9999, y: -9999 });
  const mouseX = useMotionValue6(-9999);
  const mouseY = useMotionValue6(-9999);
  const lastMoveTime = useRef19(0);
  const handleMouseMove = useCallback2((e) => {
    const now = performance.now();
    if (now - lastMoveTime.current < 16) return;
    lastMoveTime.current = now;
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mousePosRef.current = { x, y };
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);
  const handleMouseLeave = useCallback2(() => {
    mousePosRef.current = { x: -9999, y: -9999 };
    mouseX.set(-9999);
    mouseY.set(-9999);
  }, [mouseX, mouseY]);
  useEffect19(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const resizeCanvas = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
      gridRef.current = {
        cols: Math.ceil(w / spacing) + 1,
        rows: Math.ceil(h / spacing) + 1
      };
    };
    resizeCanvas();
    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resizeCanvas, 100);
    };
    window.addEventListener("resize", onResize);
    const hexToRgb4 = (hex) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return { r, g, b };
    };
    const dotRgb = hexToRgb4(dotColor);
    const glowRgb = hexToRgb4(glowColor);
    const glowRgbaFull = `rgba(${glowRgb.r},${glowRgb.g},${glowRgb.b},0.8)`;
    const INFLUENCE_RADIUS = 300;
    const INFLUENCE_RADIUS_SQ = INFLUENCE_RADIUS * INFLUENCE_RADIUS;
    const SHADOW_RADIUS_SQ = 160 * 160;
    let time = 0;
    const animate = () => {
      const { cols, rows } = gridRef.current;
      const logicalW = canvas.width / dpr;
      const logicalH = canvas.height / dpr;
      ctx.clearRect(0, 0, logicalW, logicalH);
      time += 0.016;
      const speedFactor = 1 / waveSpeed;
      const { x: mx, y: my } = mousePosRef.current;
      ctx.shadowBlur = 0;
      ctx.shadowColor = "transparent";
      for (let i = 0; i < cols; i++) {
        const x = i * spacing;
        const dx = x - mx;
        for (let j = 0; j < rows; j++) {
          const y = j * spacing;
          const dy = y - my;
          const distSq = dx * dx + dy * dy;
          const mouseInfluence = distSq < INFLUENCE_RADIUS_SQ ? 1 - Math.sqrt(distSq) / INFLUENCE_RADIUS : 0;
          const wave = Math.sin(i * 0.3 + time * speedFactor) * Math.cos(j * 0.3 + time * speedFactor);
          const size = Math.max(0.5, dotSize + wave * 2 + mouseInfluence * 5);
          const alpha = 0.15 + Math.abs(wave) * 0.4 + mouseInfluence * 0.45;
          const needsShadow = distSq < SHADOW_RADIUS_SQ && mouseInfluence > 0;
          if (needsShadow) {
            ctx.shadowBlur = 10 + mouseInfluence * 25;
            ctx.shadowColor = glowRgbaFull;
          }
          ctx.fillStyle = `rgba(${dotRgb.r},${dotRgb.g},${dotRgb.b},${alpha.toFixed(2)})`;
          if (needsShadow || size > dotSize + 1) {
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
          } else {
            const half = size;
            ctx.fillRect(x - half, y - half, half * 2, half * 2);
          }
          if (needsShadow) {
            ctx.shadowBlur = 0;
            ctx.shadowColor = "transparent";
          }
        }
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [dotColor, glowColor, dotSize, spacing, waveSpeed]);
  return /* @__PURE__ */ jsxs51(
    "div",
    {
      ref: containerRef,
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      className: "relative w-full min-h-screen overflow-hidden selection:bg-indigo-500/30",
      style: { background: "radial-gradient(ellipse at 50% 0%, #0d0f1a 0%, #020408 60%)" },
      children: [
        /* @__PURE__ */ jsx71(
          "div",
          {
            className: "absolute inset-0 z-[1] pointer-events-none",
            style: {
              opacity: 0.045,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              mixBlendMode: "overlay"
            }
          }
        ),
        /* @__PURE__ */ jsx71("canvas", { ref: canvasRef, className: "absolute inset-0 z-0" }),
        /* @__PURE__ */ jsx71("div", { className: "absolute inset-0 z-[2] bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,transparent_20%,rgba(2,4,8,0.55)_70%,rgba(2,4,8,0.92)_100%)]" }),
        /* @__PURE__ */ jsx71(
          "div",
          {
            className: "absolute inset-0 z-[2] pointer-events-none",
            style: {
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)"
            }
          }
        ),
        /* @__PURE__ */ jsx71("div", { className: "relative z-10 flex flex-col items-center justify-center min-h-screen px-4", children: children || /* @__PURE__ */ jsxs51(
          motion66.div,
          {
            initial: "hidden",
            animate: "visible",
            variants: {
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.18, delayChildren: 0.1 }
              }
            },
            className: "text-center max-w-4xl mx-auto",
            children: [
              /* @__PURE__ */ jsxs51(
                motion66.div,
                {
                  variants: { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } },
                  className: "mb-6 inline-flex items-center gap-3",
                  children: [
                    /* @__PURE__ */ jsx71("span", { className: "block w-8 h-px bg-indigo-500/60" }),
                    /* @__PURE__ */ jsx71(
                      "span",
                      {
                        className: "text-indigo-400/80 uppercase tracking-[0.35em] text-[10px] font-medium",
                        style: { fontFamily: "'DM Mono', 'Fira Mono', monospace" },
                        children: "Signal Field Active"
                      }
                    ),
                    /* @__PURE__ */ jsx71("span", { className: "block w-8 h-px bg-indigo-500/60" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs51(
                motion66.h1,
                {
                  variants: { hidden: { y: 24, opacity: 0 }, visible: { y: 0, opacity: 1 } },
                  className: "text-6xl md:text-8xl font-black text-white mb-6 leading-none tracking-tighter",
                  children: [
                    "Wave",
                    " ",
                    /* @__PURE__ */ jsx71(
                      "span",
                      {
                        className: "text-transparent",
                        style: {
                          WebkitTextStroke: "1px rgba(99,102,241,0.4)"
                        },
                        children: "Through"
                      }
                    ),
                    /* @__PURE__ */ jsx71("br", {}),
                    /* @__PURE__ */ jsx71(
                      "span",
                      {
                        className: "bg-clip-text text-transparent",
                        style: {
                          backgroundImage: `linear-gradient(135deg, #818cf8 0%, #a78bfa 45%, #f472b6 100%)`
                        },
                        children: "The Matrix."
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsx71(
                motion66.p,
                {
                  variants: { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } },
                  className: "text-base md:text-lg text-slate-400 max-w-md mx-auto mb-10 leading-relaxed font-light",
                  children: "Every dot pulses with life, responding to your presence in perfect synchronization."
                }
              ),
              /* @__PURE__ */ jsx71(
                motion66.div,
                {
                  variants: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
                  className: "flex justify-center gap-8 mb-10",
                  children: [
                    { label: "LATENCY", value: "0.4ms" },
                    { label: "NODES", value: "\u221E" },
                    { label: "UPTIME", value: "99.99%" }
                  ].map(({ label, value }) => /* @__PURE__ */ jsxs51("div", { className: "flex flex-col items-center gap-1", children: [
                    /* @__PURE__ */ jsx71(
                      "span",
                      {
                        className: "text-xs text-slate-600 tracking-widest uppercase",
                        style: { fontFamily: "monospace" },
                        children: label
                      }
                    ),
                    /* @__PURE__ */ jsx71("span", { className: "text-white font-bold text-lg", children: value })
                  ] }, label))
                }
              ),
              /* @__PURE__ */ jsxs51(
                motion66.div,
                {
                  variants: { hidden: { scale: 0.93, opacity: 0 }, visible: { scale: 1, opacity: 1 } },
                  className: "flex gap-4 justify-center",
                  children: [
                    /* @__PURE__ */ jsx71(
                      "button",
                      {
                        className: "group relative px-8 py-3.5 rounded-full font-semibold text-sm overflow-hidden text-white transition-transform hover:scale-[1.03] active:scale-[0.97]",
                        style: {
                          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                          boxShadow: "0 0 30px rgba(99,102,241,0.35), inset 0 1px 0 rgba(255,255,255,0.15)"
                        },
                        children: /* @__PURE__ */ jsxs51("span", { className: "relative z-10 flex items-center gap-2", children: [
                          "Experience",
                          /* @__PURE__ */ jsx71("span", { className: "transition-transform group-hover:translate-x-1", children: "\u2192" })
                        ] })
                      }
                    ),
                    /* @__PURE__ */ jsx71("button", { className: "px-8 py-3.5 rounded-full font-medium text-sm text-slate-300 border border-white/10 hover:border-white/25 hover:text-white transition-all backdrop-blur-md bg-white/[0.03]", children: "Explore" })
                  ]
                }
              )
            ]
          }
        ) }),
        /* @__PURE__ */ jsx71("div", { className: "absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#020408] via-[#020408]/60 to-transparent z-[3]" })
      ]
    }
  );
};

// src/components/AuroraBeam/AuroraBeam.tsx
import { useRef as useRef20, useEffect as useEffect20 } from "react";
import { motion as motion67 } from "framer-motion";
import { jsx as jsx72, jsxs as jsxs52 } from "react/jsx-runtime";
var AuroraBeam = ({
  color1 = "#00f2fe",
  // Electric Cyan
  color2 = "#7000ff",
  // Deep Violet
  color3 = "#00c9ff",
  // Aurora Green/Blue
  speed = 0.5,
  beamCount = 40,
  children
}) => {
  const canvasRef = useRef20(null);
  useEffect20(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let frame = 0;
    let animationId;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    const drawAurora = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < beamCount; i++) {
        const x = window.innerWidth / beamCount * i;
        const time = frame * 0.01 * speed;
        const noise = Math.sin(i * 0.2 + time) * Math.cos(i * 0.1 - time * 0.5);
        const shift = Math.sin(time * 0.5 + i * 0.1) * 50;
        const height = window.innerHeight * 0.6 + noise * 150;
        const width = window.innerWidth / beamCount * 2.5;
        const colors = [color1, color2, color3];
        const color = colors[i % colors.length];
        const gradient = ctx.createLinearGradient(0, window.innerHeight, 0, window.innerHeight - height);
        gradient.addColorStop(0, "transparent");
        gradient.addColorStop(0.2, color + "44");
        gradient.addColorStop(0.5, color + "aa");
        gradient.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.moveTo(x + shift, window.innerHeight);
        ctx.lineTo(x + width + shift, window.innerHeight);
        ctx.lineTo(x + width * 1.5 + shift, window.innerHeight - height);
        ctx.lineTo(x - width * 0.5 + shift, window.innerHeight - height);
        ctx.fill();
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
    window.addEventListener("resize", resize);
    resize();
    drawAurora();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [color1, color2, color3, speed, beamCount]);
  return /* @__PURE__ */ jsxs52("div", { className: "relative w-full min-h-screen bg-[#02040a] overflow-hidden selection:bg-cyan-500/30", children: [
    /* @__PURE__ */ jsx72(
      "canvas",
      {
        ref: canvasRef,
        className: "absolute inset-0 opacity-80 mix-blend-screen"
      }
    ),
    /* @__PURE__ */ jsx72(
      "div",
      {
        className: "absolute inset-0 z-[1] opacity-[0.05] pointer-events-none",
        style: { backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }
      }
    ),
    /* @__PURE__ */ jsx72("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_20%,rgba(0,0,0,0.8)_100%)] z-[2]" }),
    /* @__PURE__ */ jsx72("div", { className: "relative z-10 flex flex-col items-center justify-center min-h-screen px-4", children: children || /* @__PURE__ */ jsxs52(
      motion67.div,
      {
        initial: "hidden",
        animate: "visible",
        variants: {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
        },
        className: "text-center",
        children: [
          /* @__PURE__ */ jsx72(
            motion67.span,
            {
              variants: { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } },
              className: "text-cyan-400 font-mono text-sm tracking-widest uppercase mb-4 block",
              children: "Atmospheric Sync Active"
            }
          ),
          /* @__PURE__ */ jsxs52(
            motion67.h1,
            {
              variants: { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } },
              className: "text-7xl md:text-9xl font-bold text-white mb-6 tracking-tight",
              children: [
                "AURORA",
                /* @__PURE__ */ jsx72("span", { className: "text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 to-blue-600", children: "BEAM" })
              ]
            }
          ),
          /* @__PURE__ */ jsx72(
            motion67.p,
            {
              variants: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
              className: "text-slate-400 max-w-lg mx-auto mb-10 text-lg font-light leading-relaxed",
              children: "Next-generation luminance engine powered by atmospheric noise and spectral gradients."
            }
          ),
          /* @__PURE__ */ jsxs52(
            motion67.div,
            {
              variants: { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } },
              className: "flex gap-6 justify-center",
              children: [
                /* @__PURE__ */ jsx72("button", { className: "px-10 py-4 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform", children: "Initialize" }),
                /* @__PURE__ */ jsx72("button", { className: "px-10 py-4 border border-white/20 text-white rounded-full font-bold hover:bg-white/10 transition-colors backdrop-blur-md", children: "Documentation" })
              ]
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsx72("div", { className: "absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-[#02040a] to-transparent z-[3]" })
  ] });
};

// src/components/ParticleConstellationBackground/ParticleConstellationBackground.tsx
import { useEffect as useEffect21, useRef as useRef21 } from "react";
import { motion as motion68 } from "framer-motion";
import { jsx as jsx73, jsxs as jsxs53 } from "react/jsx-runtime";
var ParticleConstellationBackground = ({
  color = "#818cf8",
  // Indigo-400
  particleCount = 100,
  connectionDistance = 150,
  speed = 0.6,
  particleSize = 2,
  children
}) => {
  const containerRef = useRef21(null);
  const canvasRef = useRef21(null);
  const starsRef = useRef21([]);
  const mouseRef = useRef21({ x: -1e3, y: -1e3 });
  const animRef = useRef21(void 0);
  useEffect21(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = container.offsetWidth * dpr;
      canvas.height = container.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${container.offsetWidth}px`;
      canvas.style.height = `${container.offsetHeight}px`;
      starsRef.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * container.offsetWidth,
        y: Math.random() * container.offsetHeight,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        size: Math.random() * particleSize + 0.5,
        opacity: Math.random() * 0.5 + 0.2
      }));
    };
    resize();
    const hexToRgb4 = (hex) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `${r}, ${g}, ${b}`;
    };
    const rgb = hexToRgb4(color);
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const stars = starsRef.current;
      const mouse = mouseRef.current;
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      stars.forEach((star) => {
        star.x += star.vx;
        star.y += star.vy;
        const dx = star.x - mouse.x;
        const dy = star.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          star.vx += dx / dist * 0.02;
          star.vy += dy / dist * 0.02;
        }
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;
      });
      ctx.lineWidth = 0.8;
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const s1 = stars[i];
          const s2 = stars[j];
          const dx = s1.x - s2.x;
          const dy = s1.y - s2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.4;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${rgb}, ${alpha})`;
            ctx.moveTo(s1.x, s1.y);
            ctx.lineTo(s2.x, s2.y);
            ctx.stroke();
          }
        }
      }
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${star.opacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      animRef.current = requestAnimationFrame(draw);
    };
    container.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", resize);
    animRef.current = requestAnimationFrame(draw);
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [color, particleCount, connectionDistance, speed, particleSize]);
  return /* @__PURE__ */ jsxs53("div", { ref: containerRef, className: "relative w-full min-h-screen bg-[#050505] overflow-hidden flex items-center justify-center", children: [
    /* @__PURE__ */ jsx73("canvas", { ref: canvasRef, className: "absolute inset-0 z-0 opacity-60" }),
    /* @__PURE__ */ jsx73("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(5,5,5,1)_80%)] z-1" }),
    /* @__PURE__ */ jsx73("div", { className: "relative z-10 w-full max-w-7xl px-6", children: children || /* @__PURE__ */ jsxs53("div", { className: "flex flex-col items-center text-center", children: [
      /* @__PURE__ */ jsxs53(
        motion68.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, ease: "easeOut" },
          children: [
            /* @__PURE__ */ jsx73("span", { className: "inline-block px-3 py-1 mb-6 text-xs font-medium tracking-widest text-indigo-400 uppercase border border-indigo-500/30 rounded-full bg-indigo-500/10 backdrop-blur-md", children: "Protocol v2.0 Live" }),
            /* @__PURE__ */ jsxs53("h1", { className: "text-5xl md:text-8xl font-bold text-white tracking-tight mb-8", children: [
              "Neural ",
              /* @__PURE__ */ jsx73("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400", children: "Connectivity" })
            ] }),
            /* @__PURE__ */ jsx73("p", { className: "text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed", children: "Build infinitely scalable node networks with our decentralized architecture. Experience seamless data flow across the synthetic universe." }),
            /* @__PURE__ */ jsxs53("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: [
              /* @__PURE__ */ jsx73("button", { className: "relative group px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold transition-all hover:bg-indigo-500 hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] active:scale-95", children: "Launch Console" }),
              /* @__PURE__ */ jsx73("button", { className: "px-8 py-4 bg-white/5 text-white border border-white/10 rounded-xl font-semibold backdrop-blur-xl transition-all hover:bg-white/10 hover:border-white/20 active:scale-95", children: "View Documentation" })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsx73(
        motion68.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 0.5, duration: 1 },
          className: "grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 w-full max-w-4xl border-t border-white/5 pt-12",
          children: [
            { label: "Active Nodes", value: "1.2M+" },
            { label: "Latency", value: "0.4ms" },
            { label: "Throughput", value: "85GB/s" },
            { label: "Uptime", value: "99.99%" }
          ].map((stat, i) => /* @__PURE__ */ jsxs53("div", { className: "text-center", children: [
            /* @__PURE__ */ jsx73("p", { className: "text-zinc-500 text-sm uppercase tracking-wider mb-1", children: stat.label }),
            /* @__PURE__ */ jsx73("p", { className: "text-white text-2xl font-mono font-bold", children: stat.value })
          ] }, i))
        }
      )
    ] }) })
  ] });
};

// src/components/MeshGradientBackground/MeshGradientBackground.tsx
import { useRef as useRef22 } from "react";
import { motion as motion69, useMotionValue as useMotionValue7, useSpring as useSpring8, useTransform as useTransform5 } from "framer-motion";
import { jsx as jsx74, jsxs as jsxs54 } from "react/jsx-runtime";
var MeshGradientBackground = ({
  colors = ["#4f46e5", "#c026d3", "#f59e0b", "#10b981"],
  speed = 12,
  blur = 120,
  interactive = true,
  children
}) => {
  const containerRef = useRef22(null);
  const mouseX = useMotionValue7(0.5);
  const mouseY = useMotionValue7(0.5);
  const springX = useSpring8(mouseX, { damping: 30, stiffness: 100 });
  const springY = useSpring8(mouseY, { damping: 30, stiffness: 100 });
  const handleMouseMove = (e) => {
    if (!interactive) return;
    const { clientX, clientY } = e;
    mouseX.set(clientX / window.innerWidth);
    mouseY.set(clientY / window.innerHeight);
  };
  const blobs = [
    { x: "10%", y: "15%", animX: [0, 80, -60, 40, 0], animY: [0, -50, 70, -30, 0] },
    { x: "85%", y: "20%", animX: [0, -70, 40, -80, 0], animY: [0, 60, -40, 50, 0] },
    { x: "75%", y: "80%", animX: [0, 50, -70, 30, 0], animY: [0, -70, 40, -50, 0] },
    { x: "15%", y: "85%", animX: [0, -40, 60, -50, 0], animY: [0, 50, -60, 40, 0] }
  ];
  return /* @__PURE__ */ jsxs54(
    "div",
    {
      ref: containerRef,
      onMouseMove: handleMouseMove,
      className: "relative w-full min-h-screen bg-[#020205] overflow-hidden selection:bg-white/20",
      children: [
        /* @__PURE__ */ jsx74("div", { className: "absolute inset-0 mix-blend-screen overflow-hidden", children: blobs.map((blob, i) => /* @__PURE__ */ jsx74(
          motion69.div,
          {
            className: "absolute w-[600px] h-[600px] rounded-full opacity-60",
            style: {
              left: blob.x,
              top: blob.y,
              transform: "translate(-50%, -50%)",
              background: `radial-gradient(circle, ${colors[i % colors.length]} 0%, transparent 75%)`,
              filter: `blur(${blur}px)`
            },
            animate: {
              x: blob.animX,
              y: blob.animY,
              scale: [1, 1.25, 0.9, 1.15, 1]
            },
            transition: {
              duration: speed + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          },
          i
        )) }),
        interactive && /* @__PURE__ */ jsx74(
          motion69.div,
          {
            className: "absolute w-[500px] h-[500px] rounded-full pointer-events-none opacity-40 mix-blend-screen",
            style: {
              left: useTransform5(springX, [0, 1], ["0%", "100%"]),
              top: useTransform5(springY, [0, 1], ["0%", "100%"]),
              transform: "translate(-50%, -50%)",
              background: `radial-gradient(circle, ${colors[0]} 0%, transparent 70%)`,
              filter: `blur(${blur}px)`
            }
          }
        ),
        /* @__PURE__ */ jsx74(
          "div",
          {
            className: "absolute inset-0 opacity-[0.15] mix-blend-soft-light pointer-events-none",
            style: { backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }
          }
        ),
        /* @__PURE__ */ jsx74("div", { className: "relative z-10 flex items-center justify-center min-h-screen px-6", children: children || /* @__PURE__ */ jsx74("div", { className: "max-w-4xl w-full text-center", children: /* @__PURE__ */ jsxs54(
          motion69.div,
          {
            initial: { opacity: 0, y: 30 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.8 },
            children: [
              /* @__PURE__ */ jsxs54("span", { className: "inline-flex items-center gap-2 px-3 py-1 mb-8 text-xs font-semibold tracking-widest text-white uppercase bg-white/10 border border-white/20 rounded-full backdrop-blur-xl", children: [
                /* @__PURE__ */ jsx74("span", { className: "w-2 h-2 rounded-full bg-emerald-400 animate-pulse" }),
                "System Operational"
              ] }),
              /* @__PURE__ */ jsxs54("h1", { className: "text-6xl md:text-8xl font-bold text-white tracking-tighter mb-6 leading-[0.9]", children: [
                "Redefining the ",
                /* @__PURE__ */ jsx74("br", {}),
                /* @__PURE__ */ jsx74("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-emerald-300", children: "Digital Canvas" })
              ] }),
              /* @__PURE__ */ jsx74("p", { className: "text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light", children: "Our fluid engine generates real-time interactive meshes that adapt to user behavior. Experience design that moves at the speed of thought." }),
              /* @__PURE__ */ jsxs54("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: [
                /* @__PURE__ */ jsxs54("button", { className: "group relative px-8 py-4 bg-white text-black rounded-full font-bold transition-all hover:scale-105 active:scale-95", children: [
                  /* @__PURE__ */ jsx74("span", { className: "relative z-10", children: "Get Started Now" }),
                  /* @__PURE__ */ jsx74("div", { className: "absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 opacity-0 group-hover:opacity-20 transition-opacity" })
                ] }),
                /* @__PURE__ */ jsx74("button", { className: "px-8 py-4 bg-transparent text-white border border-white/20 rounded-full font-semibold backdrop-blur-md transition-all hover:bg-white/5 active:scale-95", children: "View Components" })
              ] }),
              /* @__PURE__ */ jsxs54("div", { className: "mt-16 flex items-center justify-center gap-8 text-zinc-500", children: [
                /* @__PURE__ */ jsx74("p", { className: "text-sm font-medium", children: "Trusted by teams at" }),
                /* @__PURE__ */ jsxs54("div", { className: "flex gap-6 grayscale opacity-50 contrast-125", children: [
                  /* @__PURE__ */ jsx74("div", { className: "h-5 w-20 bg-zinc-700 rounded" }),
                  /* @__PURE__ */ jsx74("div", { className: "h-5 w-24 bg-zinc-700 rounded" }),
                  /* @__PURE__ */ jsx74("div", { className: "h-5 w-16 bg-zinc-700 rounded" })
                ] })
              ] })
            ]
          }
        ) }) }),
        /* @__PURE__ */ jsx74("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#020205_100%)] pointer-events-none" })
      ]
    }
  );
};

// src/components/MatrixRainBackground/MatrixRainBackground.tsx
import { useEffect as useEffect22, useRef as useRef23 } from "react";
import { motion as motion70 } from "framer-motion";
import { jsx as jsx75, jsxs as jsxs55 } from "react/jsx-runtime";
var MatrixRainBackground = ({
  color = "#00ff41",
  // Matrix Green
  fontSize = 16,
  speed = 1,
  // Normalized speed multiplier
  density = 0.95,
  children
}) => {
  const containerRef = useRef23(null);
  const canvasRef = useRef23(null);
  const animRef = useRef23(void 0);
  const dropsRef = useRef23([]);
  const charList = "\uFF71\uFF72\uFF73\uFF74\uFF75\uFF76\uFF77\uFF78\uFF79\uFF7A\uFF7B\u30B7\u30B9\u30BB\u30BD\u30BF\u30C1\u30C4\u30C6\u30C8\u30CA\u30CB\u30CC\u30CD\u30CE\u30CF\u30D2\u30D5\u30D8\u30DB\u30DE\u30DF\u30E0\u30E1\u30E2\u30E4\u30E6\u30E8\u30E9\u30EA\u30EB\u30EC\u30ED\u30EF\u30F2\u30F30123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  useEffect22(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      const cols = Math.floor(canvas.width / fontSize);
      dropsRef.current = Array.from({ length: cols }, (_, i) => ({
        x: i * fontSize,
        y: Math.random() * -canvas.height,
        speed: (Math.random() * 2 + 1) * speed,
        chars: []
      }));
    };
    resize();
    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      dropsRef.current.forEach((drop) => {
        const char = charList[Math.floor(Math.random() * charList.length)];
        ctx.fillStyle = "#fff";
        ctx.font = `bold ${fontSize}px monospace`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = color;
        ctx.fillText(char, drop.x, drop.y);
        ctx.fillStyle = color;
        ctx.font = `${fontSize}px monospace`;
        ctx.shadowBlur = 0;
        ctx.fillText(char, drop.x, drop.y - fontSize);
        drop.y += drop.speed * 5;
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
  return /* @__PURE__ */ jsxs55(
    "div",
    {
      ref: containerRef,
      className: "relative w-full min-h-screen bg-black overflow-hidden flex items-center justify-center font-mono",
      children: [
        /* @__PURE__ */ jsx75("canvas", { ref: canvasRef, className: "absolute inset-0 opacity-40" }),
        /* @__PURE__ */ jsx75(
          "div",
          {
            className: "absolute inset-0 pointer-events-none z-[2] opacity-[0.03]",
            style: { backgroundImage: `linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))`, backgroundSize: "100% 2px, 3px 100%" }
          }
        ),
        /* @__PURE__ */ jsx75("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] z-[1]" }),
        /* @__PURE__ */ jsx75("div", { className: "relative z-10 w-full max-w-5xl px-6 text-center", children: children || /* @__PURE__ */ jsxs55(
          motion70.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.8 },
            children: [
              /* @__PURE__ */ jsxs55("div", { className: "mb-6 inline-flex items-center gap-3 px-3 py-1 border border-green-500/30 bg-green-500/5 rounded text-[10px] tracking-[0.2em] text-green-400", children: [
                /* @__PURE__ */ jsxs55("span", { className: "relative flex h-2 w-2", children: [
                  /* @__PURE__ */ jsx75("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" }),
                  /* @__PURE__ */ jsx75("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-green-500" })
                ] }),
                "SYSTEM_LINK_ESTABLISHED"
              ] }),
              /* @__PURE__ */ jsxs55("h1", { className: "text-5xl md:text-8xl font-black mb-6 tracking-tighter text-white uppercase italic", children: [
                "Terminal ",
                /* @__PURE__ */ jsx75("span", { className: "text-green-500 [text-shadow:0_0_20px_rgba(34,197,94,0.6)]", children: "Velocity" })
              ] }),
              /* @__PURE__ */ jsxs55("p", { className: "text-green-500/60 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed", children: [
                "Decoding the architecture of the digital void. ",
                /* @__PURE__ */ jsx75("br", { className: "hidden md:block" }),
                "Your interface with the hidden layer of the internet."
              ] }),
              /* @__PURE__ */ jsxs55("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-6", children: [
                /* @__PURE__ */ jsxs55("button", { className: "group relative px-10 py-4 bg-green-500 text-black font-bold uppercase tracking-widest transition-all hover:bg-white hover:shadow-[0_0_30px_rgba(34,197,94,0.8)]", children: [
                  /* @__PURE__ */ jsx75("span", { className: "relative z-10", children: "Wake up, Neo" }),
                  /* @__PURE__ */ jsx75("div", { className: "absolute inset-0 border-2 border-green-400 scale-105 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" })
                ] }),
                /* @__PURE__ */ jsx75("button", { className: "px-10 py-4 border border-green-500/40 text-green-500 font-bold uppercase tracking-widest hover:bg-green-500/10 transition-colors backdrop-blur-sm", children: "Ignore Truth" })
              ] }),
              /* @__PURE__ */ jsxs55("div", { className: "mt-20 grid grid-cols-3 gap-4 max-w-xl mx-auto opacity-40 grayscale hover:grayscale-0 transition-all duration-700", children: [
                /* @__PURE__ */ jsxs55("div", { className: "text-left border-l border-green-500/30 pl-4", children: [
                  /* @__PURE__ */ jsx75("div", { className: "text-xs text-green-700", children: "LATENCY" }),
                  /* @__PURE__ */ jsx75("div", { className: "text-sm text-green-500 uppercase", children: "0.003ms" })
                ] }),
                /* @__PURE__ */ jsxs55("div", { className: "text-left border-l border-green-500/30 pl-4", children: [
                  /* @__PURE__ */ jsx75("div", { className: "text-xs text-green-700", children: "ENCRYPTION" }),
                  /* @__PURE__ */ jsx75("div", { className: "text-sm text-green-500 uppercase", children: "RSA-4096" })
                ] }),
                /* @__PURE__ */ jsxs55("div", { className: "text-left border-l border-green-500/30 pl-4", children: [
                  /* @__PURE__ */ jsx75("div", { className: "text-xs text-green-700", children: "PACKETS" }),
                  /* @__PURE__ */ jsx75("div", { className: "text-sm text-green-500 uppercase", children: "SYN/ACK" })
                ] })
              ] })
            ]
          }
        ) })
      ]
    }
  );
};

// src/components/VortexBackground/VortexBackground.tsx
import { useRef as useRef24, useCallback as useCallback3, useMemo } from "react";
import { motion as motion71, useMotionValue as useMotionValue8, useSpring as useSpring9, useTransform as useTransform6 } from "framer-motion";
import { jsx as jsx76, jsxs as jsxs56 } from "react/jsx-runtime";
var VortexBackground = ({
  color = "#6366f1",
  ringCount = 15,
  speed = 10,
  depth = 0.9,
  children
}) => {
  const containerRef = useRef24(null);
  const mouseX = useMotionValue8(0);
  const mouseY = useMotionValue8(0);
  const springX = useSpring9(mouseX, { damping: 30, stiffness: 80 });
  const springY = useSpring9(mouseY, { damping: 30, stiffness: 80 });
  const bgTiltX = useTransform6(springY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const bgTiltY = useTransform6(springX, [-0.5, 0.5], ["-15deg", "15deg"]);
  const textTranslateX = useTransform6(springX, [-0.5, 0.5], [20, -20]);
  const textTranslateY = useTransform6(springY, [-0.5, 0.5], [20, -20]);
  const handleMouseMove = useCallback3((e) => {
    var _a;
    const rect = (_a = containerRef.current) == null ? void 0 : _a.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [mouseX, mouseY]);
  const rings = useMemo(() => {
    const glowColor = `${color}44`;
    return Array.from({ length: ringCount }, (_, i) => {
      const progress = i / ringCount;
      const size = 100 + Math.pow(progress, 2) * 2e3;
      const opacity = (1 - progress) * 0.5;
      const isDashed = i % 2 === 0;
      const hasGlow = progress < 0.3;
      return {
        i,
        size,
        opacity,
        isDashed,
        duration: speed * (1 + progress * 3),
        boxShadow: hasGlow ? `0 0 30px ${glowColor}` : "none",
        rotateTo: i % 2 === 0 ? 360 : -360
      };
    });
  }, [ringCount, speed, color]);
  const singularityStyle = useMemo(() => ({
    background: `radial-gradient(circle, ${color} 0%, transparent 80%)`,
    filter: "blur(40px)"
  }), [color]);
  return /* @__PURE__ */ jsxs56(
    "div",
    {
      ref: containerRef,
      onMouseMove: handleMouseMove,
      className: "relative w-full min-h-screen bg-[#020205] overflow-hidden flex items-center justify-center selection:bg-indigo-500/30",
      style: { perspective: "1200px", willChange: "transform" },
      children: [
        /* @__PURE__ */ jsxs56(
          motion71.div,
          {
            className: "absolute inset-0 flex items-center justify-center pointer-events-none",
            style: {
              rotateX: bgTiltX,
              rotateY: bgTiltY,
              scale: 1.1,
              willChange: "transform"
            },
            children: [
              rings.map(({ i, size, opacity, isDashed, duration, boxShadow, rotateTo }) => /* @__PURE__ */ jsx76(
                motion71.div,
                {
                  style: {
                    position: "absolute",
                    width: size,
                    height: size,
                    borderRadius: "9999px",
                    borderColor: color,
                    opacity,
                    borderStyle: isDashed ? "dashed" : "solid",
                    borderWidth: isDashed ? "1px" : "2px",
                    borderBottomWidth: 0,
                    boxShadow,
                    willChange: "transform"
                  },
                  animate: { rotate: rotateTo },
                  transition: {
                    duration,
                    repeat: Infinity,
                    ease: "linear"
                  }
                },
                i
              )),
              /* @__PURE__ */ jsx76(
                "div",
                {
                  className: "absolute w-32 h-32 rounded-full opacity-40",
                  style: singularityStyle
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx76("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.8)_100%)] z-[2]" }),
        /* @__PURE__ */ jsx76(
          "div",
          {
            className: "absolute inset-0 opacity-[0.03] pointer-events-none",
            style: {
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height%25' filter='url(%23n)'/%3E%3C/svg%3E")`
            }
          }
        ),
        /* @__PURE__ */ jsx76(
          motion71.div,
          {
            className: "relative z-10 text-center px-6 max-w-4xl",
            style: {
              x: textTranslateX,
              y: textTranslateY,
              willChange: "transform"
            },
            children: children || /* @__PURE__ */ jsxs56(
              motion71.div,
              {
                initial: { opacity: 0, scale: 0.9 },
                animate: { opacity: 1, scale: 1 },
                transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
                children: [
                  /* @__PURE__ */ jsxs56("div", { className: "mb-8 inline-flex items-center gap-4", children: [
                    /* @__PURE__ */ jsx76("div", { className: "h-[1px] w-12 bg-indigo-500/50" }),
                    /* @__PURE__ */ jsx76("span", { className: "text-indigo-400 font-mono text-xs tracking-[0.4em] uppercase", children: "Dimension Shift Enabled" }),
                    /* @__PURE__ */ jsx76("div", { className: "h-[1px] w-12 bg-indigo-500/50" })
                  ] }),
                  /* @__PURE__ */ jsxs56("h1", { className: "text-7xl md:text-9xl font-black text-white tracking-tighter mb-8 leading-none", children: [
                    "QUANTUM ",
                    /* @__PURE__ */ jsx76("br", {}),
                    /* @__PURE__ */ jsx76("span", { className: "text-transparent bg-clip-text bg-gradient-to-b from-white to-indigo-500", children: "STORM." })
                  ] }),
                  /* @__PURE__ */ jsx76("p", { className: "text-zinc-400 text-lg md:text-xl max-w-xl mx-auto mb-12 font-light leading-relaxed", children: "Navigate the fabric of space-time with our zero-latency infrastructure. Built for the next era of decentralized computing." }),
                  /* @__PURE__ */ jsxs56("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-6", children: [
                    /* @__PURE__ */ jsxs56("button", { className: "relative group px-12 py-5 bg-white text-black rounded-full font-bold overflow-hidden transition-all hover:scale-105 active:scale-95", children: [
                      /* @__PURE__ */ jsx76("span", { className: "relative z-10", children: "Initiate Warp" }),
                      /* @__PURE__ */ jsx76("div", { className: "absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" }),
                      /* @__PURE__ */ jsx76("span", { className: "absolute inset-0 bg-white group-hover:hidden" })
                    ] }),
                    /* @__PURE__ */ jsx76("button", { className: "px-12 py-5 border border-white/10 text-white rounded-full font-bold backdrop-blur-md transition-all hover:bg-white/5 hover:border-white/30", children: "Systems Check" })
                  ] }),
                  /* @__PURE__ */ jsxs56("div", { className: "mt-20 flex justify-center gap-12 font-mono text-[10px] text-zinc-600 tracking-widest", children: [
                    /* @__PURE__ */ jsx76("div", { children: "LAT: 40.7128\xB0 N" }),
                    /* @__PURE__ */ jsx76("div", { children: "LNG: 74.0060\xB0 W" }),
                    /* @__PURE__ */ jsx76("div", { children: "ALT: 402.12 KM" })
                  ] })
                ]
              }
            )
          }
        )
      ]
    }
  );
};

// src/components/NeuralFabric/NeuralFabric.tsx
import React54, { useRef as useRef25, useEffect as useEffect23, useCallback as useCallback4 } from "react";
import { motion as motion72 } from "framer-motion";
import { jsx as jsx77, jsxs as jsxs57 } from "react/jsx-runtime";
function hexToRgb(hex) {
  const n = parseInt(hex.replace("#", ""), 16);
  return [n >> 16 & 255, n >> 8 & 255, n & 255];
}
var NeuralFabric = ({
  color = "#6366f1",
  gridSize = 20,
  repelStrength = 0.5,
  repelRadius = 300,
  opacity = 0.4,
  children
}) => {
  const containerRef = useRef25(null);
  const canvasRef = useRef25(null);
  const rafRef = useRef25(void 0);
  const mouseRef = useRef25({ x: -9999, y: -9999 });
  const sizeRef = useRef25({ w: 0, h: 0, dpr: 1 });
  const nodesRef = useRef25(new Float32Array(0));
  const NODE_STRIDE = 6;
  const edgesRef = useRef25(new Uint16Array(0));
  const buildGrid = useCallback4((w, h) => {
    const count = (gridSize + 1) * (gridSize + 1);
    const nodes = new Float32Array(count * NODE_STRIDE);
    for (let i = 0; i <= gridSize; i++) {
      for (let j = 0; j <= gridSize; j++) {
        const idx = (i * (gridSize + 1) + j) * NODE_STRIDE;
        const ox = i / gridSize * w;
        const oy = j / gridSize * h;
        nodes[idx] = ox;
        nodes[idx + 1] = oy;
        nodes[idx + 2] = ox;
        nodes[idx + 3] = oy;
        nodes[idx + 4] = 0;
        nodes[idx + 5] = 0;
      }
    }
    nodesRef.current = nodes;
    const edgeList = [];
    for (let i = 0; i <= gridSize; i++) {
      for (let j = 0; j <= gridSize; j++) {
        const a = i * (gridSize + 1) + j;
        if (i < gridSize) edgeList.push(a, a + (gridSize + 1));
        if (j < gridSize) edgeList.push(a, a + 1);
        if (i < gridSize && j < gridSize) edgeList.push(a, a + (gridSize + 1) + 1);
        if (i < gridSize && j > 0) edgeList.push(a, a + (gridSize + 1) - 1);
      }
    }
    edgesRef.current = new Uint16Array(edgeList);
  }, [gridSize]);
  const resizeCanvas = useCallback4(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const dpr = window.devicePixelRatio || 1;
    const w = container.clientWidth;
    const h = container.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);
    sizeRef.current = { w, h, dpr };
    buildGrid(w, h);
  }, [buildGrid]);
  useEffect23(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    resizeCanvas();
    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resizeCanvas, 100);
    };
    window.addEventListener("resize", onResize);
    const [r, g, b] = hexToRgb(color);
    const STIFFNESS = 150;
    const DAMPING = 20;
    const DT = 1 / 60;
    const repelRadiusSq = repelRadius * repelRadius;
    const MAX_EDGE_DIST_SQ = repelRadius * repelRadius * 0.25;
    const animate = () => {
      const { w, h } = sizeRef.current;
      const nodes = nodesRef.current;
      const edges = edgesRef.current;
      const { x: mx, y: my } = mouseRef.current;
      ctx.clearRect(0, 0, w, h);
      const nodeCount = nodes.length / NODE_STRIDE;
      for (let n = 0; n < nodeCount; n++) {
        const base = n * NODE_STRIDE;
        const ox = nodes[base];
        const oy = nodes[base + 1];
        let cx = nodes[base + 2];
        let cy = nodes[base + 3];
        let vx = nodes[base + 4];
        let vy = nodes[base + 5];
        let tx = ox;
        let ty = oy;
        const dxM = cx - mx;
        const dyM = cy - my;
        const distSqM = dxM * dxM + dyM * dyM;
        if (distSqM < repelRadiusSq && distSqM > 1e-3) {
          const distM = Math.sqrt(distSqM);
          const force = (repelRadius - distM) / repelRadius * repelStrength;
          tx += dxM / distM * force * repelRadius;
          ty += dyM / distM * force * repelRadius;
        }
        const ax = (tx - cx) * STIFFNESS - vx * DAMPING;
        const ay = (ty - cy) * STIFFNESS - vy * DAMPING;
        vx += ax * DT;
        vy += ay * DT;
        cx += vx * DT;
        cy += vy * DT;
        nodes[base + 2] = cx;
        nodes[base + 3] = cy;
        nodes[base + 4] = vx;
        nodes[base + 5] = vy;
      }
      ctx.lineWidth = 0.5;
      for (let e = 0; e < edges.length; e += 2) {
        const aBase = edges[e] * NODE_STRIDE;
        const bBase = edges[e + 1] * NODE_STRIDE;
        const ax = nodes[aBase + 2];
        const ay = nodes[aBase + 3];
        const bx = nodes[bBase + 2];
        const by = nodes[bBase + 3];
        const dispA = (ax - nodes[aBase]) ** 2 + (ay - nodes[aBase + 1]) ** 2;
        const dispB = (bx - nodes[bBase]) ** 2 + (by - nodes[bBase + 1]) ** 2;
        const disp = Math.min(1, (dispA + dispB) / MAX_EDGE_DIST_SQ);
        const edgeAlpha = (0.06 + disp * 0.35) * opacity;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${r},${g},${b},${edgeAlpha.toFixed(3)})`;
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.fillStyle = `rgba(${r},${g},${b},${(opacity * 0.5).toFixed(3)})`;
      for (let n = 0; n < nodeCount; n++) {
        const base = n * NODE_STRIDE;
        const cx = nodes[base + 2];
        const cy = nodes[base + 3];
        const ox = nodes[base];
        const oy = nodes[base + 1];
        const disp = Math.sqrt((cx - ox) ** 2 + (cy - oy) ** 2);
        if (disp < 2) {
          ctx.moveTo(cx + 1.5, cy);
          ctx.arc(cx, cy, 1.5, 0, Math.PI * 2);
        }
      }
      ctx.fill();
      for (let n = 0; n < nodeCount; n++) {
        const base = n * NODE_STRIDE;
        const cx = nodes[base + 2];
        const cy = nodes[base + 3];
        const ox = nodes[base];
        const oy = nodes[base + 1];
        const disp = Math.sqrt((cx - ox) ** 2 + (cy - oy) ** 2);
        if (disp >= 2) {
          const t = Math.min(1, disp / (repelRadius * repelStrength));
          const glowAlpha = (opacity * 0.5 + t * 0.5) * opacity;
          const radius = 1.5 + t * 2;
          ctx.shadowBlur = 6 + t * 14;
          ctx.shadowColor = `rgba(${r},${g},${b},0.8)`;
          ctx.fillStyle = `rgba(${r},${g},${b},${glowAlpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.shadowColor = "transparent";
        }
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [color, gridSize, repelStrength, repelRadius, opacity, resizeCanvas]);
  const lastMoveTime = useRef25(0);
  const handleMouseMove = useCallback4((e) => {
    var _a;
    const now = performance.now();
    if (now - lastMoveTime.current < 16) return;
    lastMoveTime.current = now;
    const rect = (_a = containerRef.current) == null ? void 0 : _a.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);
  const handleMouseLeave = useCallback4(() => {
    mouseRef.current = { x: -9999, y: -9999 };
  }, []);
  return /* @__PURE__ */ jsxs57(
    "div",
    {
      ref: containerRef,
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      className: "relative w-full min-h-[500px] overflow-hidden flex items-center justify-center",
      style: {
        background: "radial-gradient(ellipse at 50% 40%, #0a0a14 0%, #000000 100%)"
      },
      children: [
        /* @__PURE__ */ jsx77("canvas", { ref: canvasRef, className: "absolute inset-0" }),
        /* @__PURE__ */ jsx77("div", { className: "absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,transparent_30%,rgba(0,0,0,0.65)_100%)]" }),
        /* @__PURE__ */ jsx77("div", { className: "absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" }),
        /* @__PURE__ */ jsx77("div", { className: "absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" }),
        /* @__PURE__ */ jsx77("div", { className: "relative z-10 flex flex-col items-center justify-center min-h-[500px] px-6", children: children || /* @__PURE__ */ jsxs57(
          motion72.div,
          {
            initial: "hidden",
            animate: "visible",
            variants: {
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            },
            className: "text-center",
            children: [
              /* @__PURE__ */ jsxs57(
                motion72.div,
                {
                  variants: { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } },
                  className: "mb-5 flex items-center justify-center gap-3",
                  children: [
                    /* @__PURE__ */ jsx77(
                      "span",
                      {
                        className: "w-1.5 h-1.5 rounded-full animate-pulse",
                        style: { background: color, boxShadow: `0 0 6px ${color}` }
                      }
                    ),
                    /* @__PURE__ */ jsxs57(
                      "span",
                      {
                        className: "text-[10px] tracking-[0.4em] uppercase font-medium",
                        style: { color, fontFamily: "monospace", opacity: 0.7 },
                        children: [
                          (gridSize + 1) ** 2,
                          " nodes active"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx77(
                      "span",
                      {
                        className: "w-1.5 h-1.5 rounded-full animate-pulse",
                        style: { background: color, boxShadow: `0 0 6px ${color}`, animationDelay: "0.5s" }
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxs57(
                motion72.h1,
                {
                  variants: { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } },
                  className: "text-white text-6xl md:text-7xl font-thin tracking-tighter leading-none mb-3 pointer-events-none",
                  children: [
                    "NEURAL",
                    " ",
                    /* @__PURE__ */ jsx77(
                      "span",
                      {
                        className: "font-black italic",
                        style: {
                          color,
                          textShadow: `0 0 40px ${color}66`
                        },
                        children: "FABRIC"
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsx77(
                motion72.div,
                {
                  variants: { hidden: { scaleX: 0, opacity: 0 }, visible: { scaleX: 1, opacity: 1 } },
                  className: "mx-auto my-4 h-px w-32 pointer-events-none",
                  style: { background: `linear-gradient(to right, transparent, ${color}60, transparent)` }
                }
              ),
              /* @__PURE__ */ jsx77(
                motion72.p,
                {
                  variants: { hidden: { y: 10, opacity: 0 }, visible: { y: 0, opacity: 1 } },
                  className: "text-zinc-400 text-base md:text-lg max-w-md mx-auto mb-2 leading-relaxed font-light pointer-events-none",
                  children: "A self-organizing mesh that bends to your intent. Infrastructure that thinks at the speed of interaction."
                }
              ),
              /* @__PURE__ */ jsx77(
                motion72.p,
                {
                  variants: { hidden: { y: 10, opacity: 0 }, visible: { y: 0, opacity: 1 } },
                  className: "text-zinc-600 font-mono uppercase tracking-[0.45em] text-xs mb-10 pointer-events-none",
                  children: "Adaptive Infrastructure 1.0"
                }
              ),
              /* @__PURE__ */ jsxs57(
                motion72.div,
                {
                  variants: { hidden: { y: 16, opacity: 0 }, visible: { y: 0, opacity: 1 } },
                  className: "flex flex-col sm:flex-row items-center justify-center gap-4",
                  children: [
                    /* @__PURE__ */ jsxs57(
                      motion72.button,
                      {
                        whileHover: { scale: 1.04 },
                        whileTap: { scale: 0.97 },
                        className: "group relative px-8 py-3.5 rounded-full font-semibold text-sm text-white overflow-hidden",
                        style: {
                          background: `linear-gradient(135deg, ${color}, #8b5cf6)`,
                          boxShadow: `0 0 32px ${color}55, inset 0 1px 0 rgba(255,255,255,0.15)`
                        },
                        children: [
                          /* @__PURE__ */ jsx77(
                            "span",
                            {
                              className: "absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700",
                              style: {
                                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)"
                              }
                            }
                          ),
                          /* @__PURE__ */ jsxs57("span", { className: "relative z-10 flex items-center gap-2", children: [
                            "Connect to Network",
                            /* @__PURE__ */ jsx77("svg", { className: "w-4 h-4 transition-transform group-hover:translate-x-0.5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: /* @__PURE__ */ jsx77("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" }) })
                          ] })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxs57(
                      motion72.button,
                      {
                        whileHover: { scale: 1.04 },
                        whileTap: { scale: 0.97 },
                        className: "group px-8 py-3.5 rounded-full font-medium text-sm text-zinc-300 hover:text-white transition-colors relative",
                        style: {
                          border: "1px solid rgba(255,255,255,0.1)",
                          background: "rgba(255,255,255,0.03)",
                          backdropFilter: "blur(12px)"
                        },
                        children: [
                          /* @__PURE__ */ jsx77(
                            "span",
                            {
                              className: "absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                              style: { boxShadow: `inset 0 0 0 1px ${color}50` }
                            }
                          ),
                          /* @__PURE__ */ jsxs57("span", { className: "relative z-10 flex items-center gap-2", children: [
                            /* @__PURE__ */ jsx77("svg", { className: "w-3.5 h-3.5 opacity-60", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: /* @__PURE__ */ jsx77("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" }) }),
                            "See How It Works"
                          ] })
                        ]
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsx77(
                motion72.div,
                {
                  variants: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 0.3 } } },
                  className: "mt-10 flex items-center justify-center gap-6 pointer-events-none",
                  children: [
                    { value: "0.4ms", label: "avg latency" },
                    { value: "99.99%", label: "uptime" },
                    { value: "\u221E", label: "scale" }
                  ].map(({ value, label }, i) => /* @__PURE__ */ jsxs57(React54.Fragment, { children: [
                    i > 0 && /* @__PURE__ */ jsx77("span", { className: "w-px h-6", style: { background: "rgba(255,255,255,0.08)" } }),
                    /* @__PURE__ */ jsxs57("div", { className: "flex flex-col items-center gap-0.5", children: [
                      /* @__PURE__ */ jsx77("span", { className: "text-white font-bold text-base", style: { textShadow: `0 0 20px ${color}44` }, children: value }),
                      /* @__PURE__ */ jsx77("span", { className: "text-zinc-600 text-[10px] uppercase tracking-widest font-mono", children: label })
                    ] })
                  ] }, label))
                }
              ),
              /* @__PURE__ */ jsx77(
                motion72.p,
                {
                  variants: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 0.5 } } },
                  className: "mt-8 text-zinc-700 text-xs font-mono tracking-widest pointer-events-none",
                  children: "\u2191 move cursor to disturb the field"
                }
              )
            ]
          }
        ) })
      ]
    }
  );
};

// src/components/DepthField/DepthField.tsx
import React55, { useRef as useRef26, useEffect as useEffect24, useCallback as useCallback5 } from "react";
import { motion as motion73 } from "framer-motion";
import { jsx as jsx78, jsxs as jsxs58 } from "react/jsx-runtime";
function hexToRgb2(hex) {
  const n = parseInt(hex.replace("#", ""), 16);
  return [n >> 16 & 255, n >> 8 & 255, n & 255];
}
function project(x3, y3, z3, fov, cx, cy) {
  const perspective = fov / (fov + z3);
  return [cx + x3 * perspective, cy + y3 * perspective, perspective];
}
var DepthField = ({
  gridColor = "#00ffe0",
  gridDensity = 12,
  driftSpeed = 0.4,
  fov = 400,
  tiltStrength = 0.35,
  children
}) => {
  const containerRef = useRef26(null);
  const canvasRef = useRef26(null);
  const rafRef = useRef26(void 0);
  const mouseRef = useRef26({ nx: 0, ny: 0 });
  const tiltRef = useRef26({ x: 0, y: 0 });
  const sizeRef = useRef26({ w: 0, h: 0, dpr: 1 });
  const zOffsetRef = useRef26(0);
  const lastMoveRef = useRef26(0);
  const resizeCanvas = useCallback5(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const dpr = window.devicePixelRatio || 1;
    const w = container.clientWidth;
    const h = container.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);
    sizeRef.current = { w, h, dpr };
  }, []);
  useEffect24(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    resizeCanvas();
    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resizeCanvas, 100);
    };
    window.addEventListener("resize", onResize);
    const [r, g, b] = hexToRgb2(gridColor);
    const DEPTH = 600;
    const NEAR_CLIP = 10;
    const animate = () => {
      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);
      const { nx, ny } = mouseRef.current;
      tiltRef.current.x += (ny * tiltStrength * 60 - tiltRef.current.x) * 0.06;
      tiltRef.current.y += (nx * tiltStrength * 60 - tiltRef.current.y) * 0.06;
      zOffsetRef.current = (zOffsetRef.current + driftSpeed) % (DEPTH / gridDensity);
      const cx = w / 2;
      const cy = h / 2;
      const tX = tiltRef.current.x;
      const tY = tiltRef.current.y;
      const halfW = w * 1.8;
      const halfH = h * 1.8;
      const stepZ = DEPTH / gridDensity;
      ctx.lineCap = "round";
      for (let zi = 0; zi <= gridDensity; zi++) {
        let z = zi * stepZ + zOffsetRef.current;
        if (z < NEAR_CLIP) z += DEPTH;
        const depth01 = 1 - z / DEPTH;
        const alpha = Math.pow(depth01, 2.2) * 0.9;
        const lineW = depth01 * 1.6;
        if (alpha < 0.01) continue;
        ctx.strokeStyle = `rgba(${r},${g},${b},${alpha.toFixed(3)})`;
        ctx.lineWidth = lineW;
        const rows = gridDensity + 1;
        for (let ri = 0; ri <= rows; ri++) {
          const wy = -halfH + ri / rows * halfH * 2;
          const [x0, y0] = project(-halfW + tY * z * 3e-3, wy + tX * z * 3e-3, z, fov, cx, cy);
          const [x1, y1] = project(halfW + tY * z * 3e-3, wy + tX * z * 3e-3, z, fov, cx, cy);
          if (x1 < 0 && x0 < 0) continue;
          if (x0 > w && x1 > w) continue;
          ctx.beginPath();
          ctx.moveTo(x0, y0);
          ctx.lineTo(x1, y1);
          ctx.stroke();
        }
        const cols = gridDensity + 1;
        for (let ci = 0; ci <= cols; ci++) {
          const wx = -halfW + ci / cols * halfW * 2;
          const [x0, y0] = project(wx + tY * z * 3e-3, -halfH + tX * z * 3e-3, z, fov, cx, cy);
          const [x1, y1] = project(wx + tY * z * 3e-3, halfH + tX * z * 3e-3, z, fov, cx, cy);
          if (y1 < 0 && y0 < 0) continue;
          if (y0 > h && y1 > h) continue;
          ctx.beginPath();
          ctx.moveTo(x0, y0);
          ctx.lineTo(x1, y1);
          ctx.stroke();
        }
      }
      const vpX = cx + tY * 4;
      const vpY = cy + tX * 4;
      const grd = ctx.createRadialGradient(vpX, vpY, 0, vpX, vpY, w * 0.35);
      grd.addColorStop(0, `rgba(${r},${g},${b},0.18)`);
      grd.addColorStop(0.4, `rgba(${r},${g},${b},0.04)`);
      grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [gridColor, gridDensity, driftSpeed, fov, tiltStrength, resizeCanvas]);
  const handleMouseMove = useCallback5((e) => {
    var _a;
    const now = performance.now();
    if (now - lastMoveRef.current < 16) return;
    lastMoveRef.current = now;
    const rect = (_a = containerRef.current) == null ? void 0 : _a.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = {
      nx: (e.clientX - rect.left) / rect.width * 2 - 1,
      ny: (e.clientY - rect.top) / rect.height * 2 - 1
    };
  }, []);
  const handleMouseLeave = useCallback5(() => {
    mouseRef.current = { nx: 0, ny: 0 };
  }, []);
  return /* @__PURE__ */ jsxs58(
    "div",
    {
      ref: containerRef,
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      className: "relative w-full min-h-screen overflow-hidden flex items-center justify-center",
      style: { background: "linear-gradient(160deg, #020d0b 0%, #000000 50%, #060210 100%)" },
      children: [
        /* @__PURE__ */ jsx78("canvas", { ref: canvasRef, className: "absolute inset-0" }),
        /* @__PURE__ */ jsx78(
          "div",
          {
            className: "absolute inset-0 pointer-events-none",
            style: {
              background: "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 20%, rgba(0,0,0,0.5) 65%, rgba(0,0,0,0.92) 100%)"
            }
          }
        ),
        /* @__PURE__ */ jsx78("div", { className: "absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black to-transparent pointer-events-none z-[2]" }),
        /* @__PURE__ */ jsx78("div", { className: "absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent pointer-events-none z-[2]" }),
        /* @__PURE__ */ jsx78(
          "div",
          {
            className: "absolute inset-0 pointer-events-none z-[1]",
            style: {
              opacity: 0.035,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              mixBlendMode: "overlay"
            }
          }
        ),
        /* @__PURE__ */ jsx78("div", { className: "relative z-10 w-full max-w-6xl mx-auto px-8 md:px-16 flex flex-col items-start", children: children || /* @__PURE__ */ jsxs58(
          motion73.div,
          {
            initial: "hidden",
            animate: "visible",
            variants: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.14 } } },
            children: [
              /* @__PURE__ */ jsxs58(
                motion73.div,
                {
                  variants: { hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0 } },
                  className: "flex items-center gap-4 mb-8",
                  children: [
                    /* @__PURE__ */ jsx78("div", { className: "w-8 h-px", style: { background: gridColor } }),
                    /* @__PURE__ */ jsx78(
                      "span",
                      {
                        className: "text-[10px] uppercase tracking-[0.5em] font-medium",
                        style: { color: gridColor, fontFamily: "monospace", opacity: 0.8 },
                        children: "Creative Studio \u2014 Est. 2026"
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxs58(
                motion73.h1,
                {
                  variants: { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } } },
                  className: "text-left leading-[0.9] tracking-tight mb-8",
                  style: {
                    fontFamily: "'Georgia', 'Times New Roman', serif",
                    fontStyle: "italic",
                    fontSize: "clamp(4rem, 10vw, 9rem)",
                    color: "#ffffff"
                  },
                  children: [
                    "We make",
                    /* @__PURE__ */ jsx78("br", {}),
                    /* @__PURE__ */ jsx78(
                      "span",
                      {
                        style: {
                          fontStyle: "normal",
                          fontFamily: "'Georgia', serif",
                          fontWeight: 900,
                          color: "transparent",
                          WebkitTextStroke: `1.5px ${gridColor}`,
                          letterSpacing: "-0.03em"
                        },
                        children: "the impossible"
                      }
                    ),
                    /* @__PURE__ */ jsx78("br", {}),
                    /* @__PURE__ */ jsx78("span", { style: { color: "#ffffff", fontWeight: 300 }, children: "feel inevitable." })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs58(
                motion73.div,
                {
                  variants: { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } },
                  className: "flex flex-col sm:flex-row items-start sm:items-end gap-10",
                  children: [
                    /* @__PURE__ */ jsx78(
                      "p",
                      {
                        className: "text-sm md:text-base leading-relaxed max-w-xs",
                        style: { color: "rgba(255,255,255,0.38)", fontFamily: "monospace" },
                        children: "Brand identities, digital experiences, and motion work for companies that refuse to be ordinary."
                      }
                    ),
                    /* @__PURE__ */ jsxs58("div", { className: "flex flex-col gap-3", children: [
                      /* @__PURE__ */ jsxs58(
                        motion73.button,
                        {
                          whileHover: { scale: 1.03 },
                          whileTap: { scale: 0.97 },
                          className: "group relative px-9 py-4 text-sm font-semibold tracking-wide overflow-hidden",
                          style: {
                            background: gridColor,
                            color: "#000",
                            clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
                            fontFamily: "monospace",
                            letterSpacing: "0.1em"
                          },
                          children: [
                            /* @__PURE__ */ jsxs58("span", { className: "relative z-10 flex items-center gap-3", children: [
                              "START A PROJECT",
                              /* @__PURE__ */ jsx78("svg", { className: "w-4 h-4 transition-transform group-hover:translate-x-1", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2.5, children: /* @__PURE__ */ jsx78("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" }) })
                            ] }),
                            /* @__PURE__ */ jsx78(
                              "span",
                              {
                                className: "absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-600",
                                style: { background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)" }
                              }
                            )
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsx78(
                        motion73.button,
                        {
                          whileHover: { scale: 1.02 },
                          whileTap: { scale: 0.97 },
                          className: "group px-9 py-4 text-sm tracking-widest text-left",
                          style: {
                            color: "rgba(255,255,255,0.5)",
                            fontFamily: "monospace",
                            letterSpacing: "0.15em",
                            borderBottom: "1px solid rgba(255,255,255,0.12)",
                            transition: "color 0.2s, border-color 0.2s"
                          },
                          onMouseEnter: (e) => {
                            e.currentTarget.style.color = gridColor;
                            e.currentTarget.style.borderColor = gridColor;
                          },
                          onMouseLeave: (e) => {
                            e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                            e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                          },
                          children: "VIEW OUR WORK \u2192"
                        }
                      )
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsx78(
                motion73.div,
                {
                  variants: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 0.6 } } },
                  className: "mt-20 flex items-center gap-10",
                  children: [
                    { n: "140+", label: "Projects shipped" },
                    { n: "98%", label: "Client retention" },
                    { n: "12", label: "Awards won" }
                  ].map(({ n, label }, i) => /* @__PURE__ */ jsxs58(React55.Fragment, { children: [
                    i > 0 && /* @__PURE__ */ jsx78("span", { className: "w-px h-8", style: { background: "rgba(255,255,255,0.08)" } }),
                    /* @__PURE__ */ jsxs58("div", { className: "flex flex-col gap-0.5", children: [
                      /* @__PURE__ */ jsx78("span", { className: "text-2xl font-black text-white", style: { fontFamily: "monospace", letterSpacing: "-0.03em" }, children: n }),
                      /* @__PURE__ */ jsx78("span", { className: "text-[10px] uppercase tracking-widest", style: { color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }, children: label })
                    ] })
                  ] }, label))
                }
              )
            ]
          }
        ) }),
        /* @__PURE__ */ jsxs58(
          "div",
          {
            className: "absolute bottom-8 right-8 z-10 text-right pointer-events-none",
            style: { fontFamily: "monospace", fontSize: "9px", color: "rgba(255,255,255,0.18)", letterSpacing: "0.2em" },
            children: [
              /* @__PURE__ */ jsx78("div", { children: "CAM / PERSPECTIVE" }),
              /* @__PURE__ */ jsxs58("div", { style: { color: gridColor, opacity: 0.5 }, children: [
                "FOV ",
                fov,
                "mm \xB7 ",
                gridDensity,
                "\xD7",
                gridDensity
              ] })
            ]
          }
        )
      ]
    }
  );
};

// src/components/AcidBath/AcidBath.tsx
import React56, { useRef as useRef27, useEffect as useEffect25, useCallback as useCallback6 } from "react";
import { motion as motion74 } from "framer-motion";
import { jsx as jsx79, jsxs as jsxs59 } from "react/jsx-runtime";
var PALETTES = {
  toxic: [[0, 0, 0], [10, 20, 5], [20, 60, 10], [60, 140, 20], [140, 230, 30], [220, 255, 80], [255, 255, 180], [255, 255, 255]],
  molten: [[0, 0, 0], [20, 5, 0], [60, 15, 0], [140, 40, 0], [220, 90, 10], [255, 160, 30], [255, 220, 120], [255, 255, 200]],
  void: [[0, 0, 0], [5, 0, 20], [15, 0, 60], [40, 0, 140], [80, 20, 220], [140, 80, 255], [200, 160, 255], [240, 220, 255]],
  blood: [[0, 0, 0], [20, 0, 0], [60, 5, 5], [140, 10, 10], [220, 30, 20], [255, 80, 40], [255, 160, 100], [255, 220, 180]]
};
var PERM = new Uint8Array(512);
var GRAD = [[1, 1], [-1, 1], [1, -1], [-1, -1], [1, 0], [-1, 0], [0, 1], [0, -1]];
(function buildPerm() {
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) PERM[i] = p[i & 255];
})();
function fade(t) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}
function lerp(a, b, t) {
  return a + t * (b - a);
}
function noise2(x, y) {
  const X2 = Math.floor(x) & 255, Y = Math.floor(y) & 255;
  const xf = x - Math.floor(x), yf = y - Math.floor(y);
  const u = fade(xf), v = fade(yf);
  const aa = PERM[PERM[X2] + Y], ab = PERM[PERM[X2] + Y + 1];
  const ba = PERM[PERM[X2 + 1] + Y], bb = PERM[PERM[X2 + 1] + Y + 1];
  const dot = (h, px, py) => {
    const g = GRAD[h & 7];
    return g[0] * px + g[1] * py;
  };
  return lerp(
    lerp(dot(aa, xf, yf), dot(ba, xf - 1, yf), u),
    lerp(dot(ab, xf, yf - 1), dot(bb, xf - 1, yf - 1), u),
    v
  );
}
function fbm(x, y, octaves) {
  let val = 0, amp = 0.5, freq = 1, max = 0;
  for (let i = 0; i < octaves; i++) {
    val += noise2(x * freq, y * freq) * amp;
    max += amp;
    amp *= 0.5;
    freq *= 2.1;
  }
  return val / max;
}
function samplePalette(pal, t) {
  const clamped = Math.max(0, Math.min(0.9999, t));
  const idx = clamped * (pal.length - 1);
  const lo = Math.floor(idx), hi = lo + 1;
  const f = idx - lo;
  const a = pal[lo], b = pal[Math.min(hi, pal.length - 1)];
  return [
    Math.round(a[0] + (b[0] - a[0]) * f),
    Math.round(a[1] + (b[1] - a[1]) * f),
    Math.round(a[2] + (b[2] - a[2]) * f)
  ];
}
var AcidBath = ({
  palette = "toxic",
  viscosity = 0.6,
  noiseScale = 2.2,
  heatRadius = 180,
  speed = 0.4,
  children
}) => {
  const containerRef = useRef27(null);
  const canvasRef = useRef27(null);
  const rafRef = useRef27(void 0);
  const mouseRef = useRef27({ x: -9999, y: -9999, active: false });
  const sizeRef = useRef27({ w: 0, h: 0, dpr: 1 });
  const timeRef = useRef27(0);
  const lastMoveRef = useRef27(0);
  const fieldA = useRef27(new Float32Array(0));
  const fieldB = useRef27(new Float32Array(0));
  const resRef = useRef27({ cols: 0, rows: 0, cellW: 0, cellH: 0 });
  const resizeCanvas = useCallback6(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const dpr = window.devicePixelRatio || 1;
    const w = container.clientWidth;
    const h = container.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);
    const CELL = 6;
    const cols = Math.ceil(w / CELL) + 2;
    const rows = Math.ceil(h / CELL) + 2;
    fieldA.current = new Float32Array(cols * rows);
    fieldB.current = new Float32Array(cols * rows);
    for (let i = 0; i < cols * rows; i++) {
      const cx = i % cols / cols, cy = Math.floor(i / cols) / rows;
      fieldA.current[i] = Math.max(0, fbm(cx * 3 + 10, cy * 3 + 10, 4) * 0.5 + 0.25);
    }
    resRef.current = { cols, rows, cellW: CELL, cellH: CELL };
    sizeRef.current = { w, h, dpr };
  }, []);
  useEffect25(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    resizeCanvas();
    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resizeCanvas, 120);
    };
    window.addEventListener("resize", onResize);
    const pal = PALETTES[palette];
    const animate = () => {
      const { w, h } = sizeRef.current;
      const { cols, rows, cellW, cellH } = resRef.current;
      const A = fieldA.current;
      const B = fieldB.current;
      const t = timeRef.current += speed * 8e-3;
      const { x: mx, y: my, active } = mouseRef.current;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const wx = col / cols * noiseScale;
          const wy = row / rows * noiseScale;
          const vx = fbm(wx + t * 0.3, wy + 1.7, 3) * 2;
          const vy = fbm(wx + 5.2 + t * 0.2, wy + 1.3 + t * 0.1, 3) * 2;
          const srcCol = col - vx * (1 - viscosity) * 0.8;
          const srcRow = row - vy * (1 - viscosity) * 0.8;
          const sc = Math.max(0, Math.min(cols - 1.001, srcCol));
          const sr = Math.max(0, Math.min(rows - 1.001, srcRow));
          const c0 = Math.floor(sc), c1 = c0 + 1;
          const r0 = Math.floor(sr), r1 = r0 + 1;
          const cf = sc - c0, rf = sr - r0;
          const idx = (r, c) => Math.min(r, rows - 1) * cols + Math.min(c, cols - 1);
          const sampled = A[idx(r0, c0)] * (1 - cf) * (1 - rf) + A[idx(r0, c1)] * cf * (1 - rf) + A[idx(r1, c0)] * (1 - cf) * rf + A[idx(r1, c1)] * cf * rf;
          const inject = Math.max(0, fbm(wx * 1.5 + t * 0.15, wy * 1.5 + t * 0.18, 3)) * 0.018;
          let heat = 0;
          if (active && mx > 0) {
            const px2 = col * cellW, py = row * cellH;
            const dSq = (px2 - mx) ** 2 + (py - my) ** 2;
            if (dSq < heatRadius * heatRadius) {
              heat = (1 - Math.sqrt(dSq) / heatRadius) * 0.35;
            }
          }
          B[row * cols + col] = Math.min(1, sampled * 0.986 + inject + heat);
        }
      }
      fieldA.current.set(B);
      const imgData = ctx.createImageData(w, h);
      const px = imgData.data;
      for (let py = 0; py < h; py++) {
        const row = Math.min(rows - 1, Math.floor(py / cellH));
        for (let pxx = 0; pxx < w; pxx++) {
          const col = Math.min(cols - 1, Math.floor(pxx / cellW));
          const val = A[row * cols + col];
          const grain = (Math.random() - 0.5) * 0.06;
          const [r, g, b] = samplePalette(pal, Math.max(0, Math.min(1, val + grain)));
          const i = (py * w + pxx) * 4;
          px[i] = r;
          px[i + 1] = g;
          px[i + 2] = b;
          px[i + 3] = 255;
        }
      }
      ctx.putImageData(imgData, 0, 0);
      const vgrd = ctx.createRadialGradient(w / 2, h / 2, h * 0.1, w / 2, h / 2, h * 0.9);
      vgrd.addColorStop(0, "rgba(0,0,0,0)");
      vgrd.addColorStop(0.6, "rgba(0,0,0,0.3)");
      vgrd.addColorStop(1, "rgba(0,0,0,0.82)");
      ctx.fillStyle = vgrd;
      ctx.fillRect(0, 0, w, h);
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [palette, viscosity, noiseScale, heatRadius, speed, resizeCanvas]);
  const handleMouseMove = useCallback6((e) => {
    var _a;
    const now = performance.now();
    if (now - lastMoveRef.current < 16) return;
    lastMoveRef.current = now;
    const rect = (_a = containerRef.current) == null ? void 0 : _a.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true };
  }, []);
  const handleMouseLeave = useCallback6(() => {
    mouseRef.current = { x: -9999, y: -9999, active: false };
  }, []);
  const accentColor = {
    toxic: "#9aff1a",
    molten: "#ff9a1a",
    void: "#a855f7",
    blood: "#ff3a1a"
  }[palette];
  return /* @__PURE__ */ jsxs59(
    "div",
    {
      ref: containerRef,
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      className: "relative w-full min-h-screen overflow-hidden flex items-center justify-center bg-black",
      children: [
        /* @__PURE__ */ jsx79("canvas", { ref: canvasRef, className: "absolute inset-0", style: { mixBlendMode: "normal" } }),
        /* @__PURE__ */ jsx79(
          "div",
          {
            className: "absolute inset-0 pointer-events-none z-[1]",
            style: {
              backgroundImage: "repeating-linear-gradient(0deg,rgba(0,0,0,0.18) 0px,rgba(0,0,0,0.18) 1px,transparent 1px,transparent 3px)",
              mixBlendMode: "multiply"
            }
          }
        ),
        /* @__PURE__ */ jsx79(
          "div",
          {
            className: "absolute inset-0 pointer-events-none z-[1]",
            style: {
              opacity: 0.06,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              mixBlendMode: "overlay"
            }
          }
        ),
        /* @__PURE__ */ jsxs59("div", { className: "relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 py-24 flex flex-col justify-between min-h-screen", children: [
          /* @__PURE__ */ jsxs59(
            motion74.div,
            {
              initial: { opacity: 0, y: -10 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6 },
              className: "flex items-center justify-between",
              children: [
                /* @__PURE__ */ jsx79("div", { style: { fontFamily: "monospace", fontSize: "11px", color: accentColor, letterSpacing: "0.3em" }, children: "CORROSIVE.SYS" }),
                /* @__PURE__ */ jsx79("div", { className: "flex items-center gap-6", style: { fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em" }, children: ["DOCS", "PRICING", "CHANGELOG", "LOGIN"].map((label) => /* @__PURE__ */ jsx79(
                  "button",
                  {
                    className: "hover:text-white transition-colors duration-150",
                    style: { background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: "inherit", letterSpacing: "inherit", color: "inherit" },
                    onMouseEnter: (e) => e.currentTarget.style.color = accentColor,
                    onMouseLeave: (e) => e.currentTarget.style.color = "rgba(255,255,255,0.3)",
                    children: label
                  },
                  label
                )) })
              ]
            }
          ),
          children || /* @__PURE__ */ jsxs59(
            motion74.div,
            {
              initial: "hidden",
              animate: "visible",
              variants: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } },
              className: "flex flex-col gap-0",
              children: [
                /* @__PURE__ */ jsxs59(
                  motion74.div,
                  {
                    variants: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
                    className: "mb-4 flex items-center gap-3",
                    children: [
                      /* @__PURE__ */ jsx79(
                        "span",
                        {
                          className: "px-2 py-0.5 text-[9px] font-bold tracking-[0.4em] uppercase",
                          style: {
                            background: accentColor,
                            color: "#000",
                            fontFamily: "monospace"
                          },
                          children: "v3.0.0-rc.1"
                        }
                      ),
                      /* @__PURE__ */ jsx79("span", { style: { fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em" }, children: "NOW IN PUBLIC BETA" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx79(
                  motion74.div,
                  {
                    variants: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } },
                    children: /* @__PURE__ */ jsxs59(
                      "h1",
                      {
                        style: {
                          fontFamily: "monospace",
                          fontWeight: 900,
                          fontSize: "clamp(3.5rem, 9vw, 8.5rem)",
                          lineHeight: 0.88,
                          letterSpacing: "-0.04em",
                          color: "#ffffff",
                          textTransform: "uppercase"
                        },
                        children: [
                          "SHIP",
                          /* @__PURE__ */ jsx79("br", {}),
                          /* @__PURE__ */ jsx79("span", { style: { color: accentColor, WebkitTextStroke: "0px", textShadow: `0 0 60px ${accentColor}88` }, children: "FASTER." }),
                          /* @__PURE__ */ jsx79("br", {}),
                          /* @__PURE__ */ jsx79("span", { style: { color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.25)" }, children: "BREAK LESS." })
                        ]
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsx79(
                  motion74.div,
                  {
                    variants: { hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.6, ease: "easeOut" } } },
                    className: "my-8 h-px origin-left",
                    style: { background: `linear-gradient(to right, ${accentColor}60, transparent)` }
                  }
                ),
                /* @__PURE__ */ jsxs59(
                  motion74.div,
                  {
                    variants: { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } },
                    className: "flex flex-col md:flex-row md:items-end gap-8 md:gap-16",
                    children: [
                      /* @__PURE__ */ jsx79(
                        "p",
                        {
                          className: "max-w-xs text-sm leading-relaxed",
                          style: { fontFamily: "monospace", color: "rgba(255,255,255,0.45)", letterSpacing: "0.02em" },
                          children: "Infrastructure that gets out of the way. Deploy, observe, iterate \u2014 no YAML hell, no lock-in, no bullsh*t."
                        }
                      ),
                      /* @__PURE__ */ jsxs59("div", { className: "flex flex-col gap-3", children: [
                        /* @__PURE__ */ jsxs59(
                          motion74.button,
                          {
                            whileHover: { scale: 1.02 },
                            whileTap: { scale: 0.97 },
                            className: "group relative px-8 py-4 text-sm font-bold tracking-widest uppercase overflow-hidden",
                            style: {
                              fontFamily: "monospace",
                              background: accentColor,
                              color: "#000",
                              border: "none",
                              cursor: "pointer",
                              letterSpacing: "0.18em"
                            },
                            children: [
                              /* @__PURE__ */ jsxs59("span", { className: "relative z-10 flex items-center gap-3", children: [
                                "$ GET STARTED FREE",
                                /* @__PURE__ */ jsx79("svg", { className: "w-3.5 h-3.5 transition-transform group-hover:translate-x-1", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 3, children: /* @__PURE__ */ jsx79("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" }) })
                              ] }),
                              /* @__PURE__ */ jsx79(
                                "span",
                                {
                                  className: "absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500",
                                  style: { background: "linear-gradient(90deg,transparent,rgba(0,0,0,0.15),transparent)" }
                                }
                              )
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsx79(
                          motion74.button,
                          {
                            whileHover: { scale: 1.01 },
                            whileTap: { scale: 0.98 },
                            className: "px-8 py-4 text-xs tracking-widest uppercase text-left",
                            style: {
                              fontFamily: "monospace",
                              background: "transparent",
                              color: "rgba(255,255,255,0.4)",
                              border: `1px solid rgba(255,255,255,0.12)`,
                              cursor: "pointer",
                              letterSpacing: "0.18em"
                            },
                            onMouseEnter: (e) => {
                              e.currentTarget.style.borderColor = accentColor + "60";
                              e.currentTarget.style.color = "rgba(255,255,255,0.75)";
                            },
                            onMouseLeave: (e) => {
                              e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                              e.currentTarget.style.color = "rgba(255,255,255,0.4)";
                            },
                            children: "READ THE DOCS \u2192"
                          }
                        )
                      ] })
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxs59(
            motion74.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 0.9, duration: 0.6 },
              className: "flex items-end justify-between",
              children: [
                /* @__PURE__ */ jsx79("div", { className: "flex items-center gap-8", children: [
                  { val: "23ms", label: "p99 latency" },
                  { val: "99.99%", label: "uptime SLA" },
                  { val: "SOC 2", label: "type II" }
                ].map(({ val, label }, i) => /* @__PURE__ */ jsxs59(React56.Fragment, { children: [
                  i > 0 && /* @__PURE__ */ jsx79("span", { className: "w-px h-6 bg-white/10" }),
                  /* @__PURE__ */ jsxs59("div", { className: "flex flex-col gap-0.5", children: [
                    /* @__PURE__ */ jsx79("span", { style: { fontFamily: "monospace", fontSize: "18px", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em" }, children: val }),
                    /* @__PURE__ */ jsx79("span", { style: { fontFamily: "monospace", fontSize: "9px", color: "rgba(255,255,255,0.28)", letterSpacing: "0.25em", textTransform: "uppercase" }, children: label })
                  ] })
                ] }, label)) }),
                /* @__PURE__ */ jsxs59("div", { style: { fontFamily: "monospace", fontSize: "9px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.2em", textAlign: "right" }, children: [
                  /* @__PURE__ */ jsx79("div", { children: "FLUID SIM ACTIVE" }),
                  /* @__PURE__ */ jsxs59("div", { style: { color: accentColor, opacity: 0.5 }, children: [
                    "VISCOSITY ",
                    (viscosity * 100).toFixed(0),
                    "% \xB7 SCALE ",
                    noiseScale,
                    "\xD7"
                  ] })
                ] })
              ]
            }
          )
        ] })
      ]
    }
  );
};

// src/components/Silk/Silk.tsx
import { useRef as useRef28, useEffect as useEffect26 } from "react";
import { motion as motion75 } from "framer-motion";
import { jsx as jsx80, jsxs as jsxs60 } from "react/jsx-runtime";
var PALETTES2 = {
  pearl: [[0.03, 0.03, 0.04], [0.11, 0.09, 0.12], [0.28, 0.25, 0.31], [0.71, 0.66, 0.73], [0.96, 0.93, 0.98]],
  dusk: [[0.03, 0.02, 0.04], [0.12, 0.07, 0.11], [0.31, 0.2, 0.29], [0.75, 0.55, 0.67], [0.98, 0.86, 0.94]],
  frost: [[0.02, 0.03, 0.04], [0.07, 0.1, 0.13], [0.2, 0.28, 0.35], [0.55, 0.69, 0.82], [0.86, 0.93, 1]],
  ember: [[0.04, 0.03, 0.02], [0.13, 0.09, 0.05], [0.33, 0.24, 0.15], [0.76, 0.61, 0.43], [0.99, 0.91, 0.78]]
};
var VERT_SRC = `
  attribute vec2 position; 
  void main() { 
    gl_Position = vec4(position, 0.0, 1.0); 
  }
`;
var FRAG_SRC = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_warp;
uniform vec3 u_pal[5];

vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p) {
  float v = 0.0; float a = 0.5;
  for (int i = 0; i < 3; i++) { v += snoise(p) * a; p *= 2.1; a *= 0.5; }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / u_res.y;
  vec2 p = uv;
  p.x *= aspect;
  
  vec2 m = (u_mouse - 0.5) * 0.15;
  vec2 q = vec2(fbm(p * 0.7 + m + u_time * 0.05), fbm(p * 0.7 - m));
  vec2 r = vec2(fbm(p + u_warp * q + u_time * 0.02), fbm(p + u_warp * q));
  float n = fbm(p + u_warp * r);
  
  float val = clamp((n * 1.4 + 1.0) * 0.5, 0.0, 1.0);
  float s = val * val * (3.0 - 2.0 * val);
  
  float idx = s * 3.99;
  int i = int(idx);
  vec3 color = mix(u_pal[0], u_pal[1], smoothstep(0.0, 0.25, s));
  if(s > 0.25) color = mix(u_pal[1], u_pal[2], smoothstep(0.25, 0.5, s));
  if(s > 0.5)  color = mix(u_pal[2], u_pal[3], smoothstep(0.5, 0.75, s));
  if(s > 0.75) color = mix(u_pal[3], u_pal[4], smoothstep(0.75, 1.0, s));
  
  float d = length(uv - 0.5);
  color *= smoothstep(1.1, 0.3, d);

  gl_FragColor = vec4(color, 1.0);
}
`;
var Silk = ({
  colorTemp = "pearl",
  warpIntensity = 3.5,
  driftSpeed = 0.15,
  children
}) => {
  const canvasRef = useRef28(null);
  const containerRef = useRef28(null);
  const mouseRef = useRef28({ x: 0.5, y: 0.5 });
  useEffect26(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const gl = canvas.getContext("webgl");
    if (!gl) return;
    const createShader = (gl2, type, src) => {
      const s = gl2.createShader(type);
      gl2.shaderSource(s, src);
      gl2.compileShader(s);
      if (!gl2.getShaderParameter(s, gl2.COMPILE_STATUS)) {
        console.error(gl2.getShaderInfoLog(s));
      }
      return s;
    };
    const program = gl.createProgram();
    gl.attachShader(program, createShader(gl, gl.VERTEX_SHADER, VERT_SRC));
    gl.attachShader(program, createShader(gl, gl.FRAGMENT_SHADER, FRAG_SRC));
    gl.linkProgram(program);
    gl.useProgram(program);
    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
    const uRes = gl.getUniformLocation(program, "u_res");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uMouse = gl.getUniformLocation(program, "u_mouse");
    const uWarp = gl.getUniformLocation(program, "u_warp");
    const uPal = gl.getUniformLocation(program, "u_pal");
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = container.clientWidth * dpr;
      canvas.height = container.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    window.addEventListener("resize", resize);
    resize();
    let raf;
    const render = (time) => {
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, time * 1e-3 * driftSpeed);
      gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
      gl.uniform1f(uWarp, warpIntensity);
      const colors = new Float32Array(PALETTES2[colorTemp].flat());
      gl.uniform3fv(uPal, colors);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [colorTemp, driftSpeed, warpIntensity]);
  const accentHex = { pearl: "#c8bfce", dusk: "#c4a8bc", frost: "#a8c0d4", ember: "#c8a882" }[colorTemp];
  return /* @__PURE__ */ jsxs60(
    "div",
    {
      ref: containerRef,
      className: "relative w-full min-h-screen overflow-hidden bg-[#06040a]",
      onMouseMove: (e) => {
        var _a;
        const rect = (_a = containerRef.current) == null ? void 0 : _a.getBoundingClientRect();
        if (rect) {
          mouseRef.current = {
            x: (e.clientX - rect.left) / rect.width,
            y: 1 - (e.clientY - rect.top) / rect.height
          };
        }
      },
      children: [
        /* @__PURE__ */ jsx80(
          "canvas",
          {
            ref: canvasRef,
            className: "absolute inset-0 w-full h-full pointer-events-none",
            style: { zIndex: 0 }
          }
        ),
        /* @__PURE__ */ jsxs60("div", { className: "relative z-10 flex flex-col min-h-screen pointer-events-none", children: [
          /* @__PURE__ */ jsxs60("nav", { className: "flex items-center justify-between px-10 md:px-16 pt-10 pointer-events-auto", children: [
            /* @__PURE__ */ jsx80("div", { style: { fontFamily: "serif", letterSpacing: "0.35em", color: accentHex }, className: "uppercase text-sm", children: "Maison Veil" }),
            /* @__PURE__ */ jsxs60("div", { className: "flex gap-8 text-[10px] uppercase tracking-[0.2em] text-white/30 cursor-pointer", children: [
              /* @__PURE__ */ jsx80("span", { className: "hover:text-white transition-colors", children: "Atelier" }),
              /* @__PURE__ */ jsx80("span", { className: "hover:text-white transition-colors", children: "Collection" }),
              /* @__PURE__ */ jsx80("span", { className: "hover:text-white transition-colors", children: "Monde" })
            ] })
          ] }),
          /* @__PURE__ */ jsx80("div", { className: "flex-1 flex flex-col items-center justify-center text-center px-6", children: /* @__PURE__ */ jsxs60(motion75.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1.5 }, children: [
            /* @__PURE__ */ jsx80("span", { className: "text-[10px] tracking-[0.5em] text-white/50 uppercase block mb-8", children: "Printemps / \xC9t\xE9 2026" }),
            /* @__PURE__ */ jsx80("h1", { className: "text-7xl md:text-9xl font-serif italic text-white leading-none tracking-tight", children: "The Weight" }),
            /* @__PURE__ */ jsx80("h1", { className: "text-7xl md:text-9xl font-serif text-transparent mb-12", style: { WebkitTextStroke: `1px ${accentHex}` }, children: "OF LIGHT" }),
            /* @__PURE__ */ jsx80("p", { className: "text-sm font-serif italic text-white/40 max-w-xs mx-auto mb-12", children: "Garments conceived at the edge of visibility." }),
            /* @__PURE__ */ jsx80("button", { className: "px-10 py-4 text-[10px] tracking-[0.3em] uppercase transition-all hover:brightness-110 pointer-events-auto", style: { backgroundColor: accentHex, color: "#000" }, children: "Explore Collection" })
          ] }) })
        ] })
      ]
    }
  );
};

// src/components/Halo/Halo.tsx
import { useRef as useRef29, useEffect as useEffect27, useCallback as useCallback7 } from "react";
import { motion as motion76 } from "framer-motion";
import { jsx as jsx81, jsxs as jsxs61 } from "react/jsx-runtime";
function hexToRgb3(hex) {
  const n = parseInt(hex.replace("#", ""), 16);
  return [n >> 16 & 255, n >> 8 & 255, n & 255];
}
function makeOrbs(count, w, h, sizeScale, accentIdx) {
  return Array.from({ length: count }, (_, i) => {
    const r = (60 + Math.random() * 140) * sizeScale;
    return {
      x: r + Math.random() * (w - r * 2),
      y: r + Math.random() * (h - r * 2),
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r,
      isAccent: i === accentIdx,
      opacity: 0.55 + Math.random() * 0.3,
      phase: Math.random() * Math.PI * 2,
      phaseSpeed: 3e-3 + Math.random() * 4e-3
    };
  });
}
function drawOrb(ctx, orb, ar, ag, ab, frostAmount, breathR) {
  const { x, y, isAccent, opacity } = orb;
  const r = breathR;
  const bloom = ctx.createRadialGradient(x, y + r * 0.15, 0, x, y, r * 1.6);
  if (isAccent) {
    bloom.addColorStop(0, `rgba(${ar},${ag},${ab},0.18)`);
    bloom.addColorStop(0.5, `rgba(${ar},${ag},${ab},0.06)`);
    bloom.addColorStop(1, `rgba(${ar},${ag},${ab},0)`);
  } else {
    bloom.addColorStop(0, `rgba(200,200,220,0.10)`);
    bloom.addColorStop(0.5, `rgba(180,180,200,0.03)`);
    bloom.addColorStop(1, `rgba(180,180,200,0)`);
  }
  ctx.fillStyle = bloom;
  ctx.beginPath();
  ctx.arc(x, y, r * 1.6, 0, Math.PI * 2);
  ctx.fill();
  const bodyGrd = ctx.createRadialGradient(
    x - r * 0.25,
    y - r * 0.25,
    0,
    x,
    y,
    r
  );
  const frost = frostAmount;
  if (isAccent) {
    bodyGrd.addColorStop(0, `rgba(${ar},${ag},${ab},${(0.22 + frost * 0.18) * opacity})`);
    bodyGrd.addColorStop(0.5, `rgba(${ar},${ag},${ab},${(0.1 + frost * 0.12) * opacity})`);
    bodyGrd.addColorStop(1, `rgba(${ar},${ag},${ab},${(0.04 + frost * 0.06) * opacity})`);
  } else {
    bodyGrd.addColorStop(0, `rgba(240,240,255,${(0.18 + frost * 0.22) * opacity})`);
    bodyGrd.addColorStop(0.5, `rgba(210,210,235,${(0.08 + frost * 0.12) * opacity})`);
    bodyGrd.addColorStop(1, `rgba(190,190,220,${(0.02 + frost * 0.06) * opacity})`);
  }
  ctx.fillStyle = bodyGrd;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  const rimGrd = ctx.createRadialGradient(x, y, r * 0.72, x, y, r);
  if (isAccent) {
    rimGrd.addColorStop(0, `rgba(${ar},${ag},${ab},0)`);
    rimGrd.addColorStop(0.7, `rgba(${ar},${ag},${ab},${0.08 * opacity})`);
    rimGrd.addColorStop(1, `rgba(${ar},${ag},${ab},${0.22 * opacity})`);
  } else {
    rimGrd.addColorStop(0, "rgba(255,255,255,0)");
    rimGrd.addColorStop(0.7, `rgba(255,255,255,${0.06 * opacity})`);
    rimGrd.addColorStop(1, `rgba(255,255,255,${0.18 * opacity})`);
  }
  ctx.fillStyle = rimGrd;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, r * 0.88, 0, Math.PI * 2);
  ctx.clip();
  const arcGrd = ctx.createLinearGradient(
    x - r * 0.6,
    y - r * 0.6,
    x + r * 0.3,
    y + r * 0.3
  );
  arcGrd.addColorStop(0, `rgba(255,255,255,${0.22 * opacity})`);
  arcGrd.addColorStop(0.3, `rgba(255,255,255,${0.06 * opacity})`);
  arcGrd.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = arcGrd;
  ctx.fillRect(x - r, y - r, r * 2, r * 2);
  ctx.restore();
  const specR = r * 0.22;
  const specX = x - r * 0.38;
  const specY = y - r * 0.38;
  const spec = ctx.createRadialGradient(specX, specY, 0, specX, specY, specR);
  spec.addColorStop(0, `rgba(255,255,255,${0.85 * opacity})`);
  spec.addColorStop(0.4, `rgba(255,255,255,${0.25 * opacity})`);
  spec.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = spec;
  ctx.beginPath();
  ctx.arc(specX, specY, specR, 0, Math.PI * 2);
  ctx.fill();
  const spec2X = x + r * 0.42;
  const spec2Y = y + r * 0.42;
  const spec2 = ctx.createRadialGradient(spec2X, spec2Y, 0, spec2X, spec2Y, r * 0.28);
  if (isAccent) {
    spec2.addColorStop(0, `rgba(${ar},${ag},${ab},${0.35 * opacity})`);
    spec2.addColorStop(1, "rgba(0,0,0,0)");
  } else {
    spec2.addColorStop(0, `rgba(220,220,255,${0.2 * opacity})`);
    spec2.addColorStop(1, "rgba(0,0,0,0)");
  }
  ctx.fillStyle = spec2;
  ctx.beginPath();
  ctx.arc(spec2X, spec2Y, r * 0.28, 0, Math.PI * 2);
  ctx.fill();
}
var Halo = ({
  accentColor = "#7c3aed",
  orbCount = 8,
  sizeScale = 1,
  frostAmount = 0.5,
  driftSpeed = 1,
  children
}) => {
  const containerRef = useRef29(null);
  const canvasRef = useRef29(null);
  const cursorRef = useRef29(null);
  const rafRef = useRef29(void 0);
  const orbsRef = useRef29([]);
  const sizeRef = useRef29({ w: 0, h: 0 });
  const mouseRef = useRef29({ x: -9999, y: -9999, down: false, downAt: 0 });
  const lastMoveRef = useRef29(0);
  const resizeCanvas = useCallback7(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const dpr = window.devicePixelRatio || 1;
    const w = container.clientWidth;
    const h = container.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);
    sizeRef.current = { w, h };
    const accentIdx = orbsRef.current.findIndex((o) => o.isAccent);
    orbsRef.current = makeOrbs(orbCount, w, h, sizeScale, accentIdx >= 0 ? accentIdx : Math.floor(orbCount / 2));
  }, [orbCount, sizeScale]);
  useEffect27(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    resizeCanvas();
    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resizeCanvas, 100);
    };
    window.addEventListener("resize", onResize);
    const [ar2, ag2, ab2] = hexToRgb3(accentColor);
    const animate = () => {
      const { w, h } = sizeRef.current;
      const orbs = orbsRef.current;
      const { x: mx, y: my, down, downAt } = mouseRef.current;
      ctx.fillStyle = "rgba(7, 6, 14, 1)";
      ctx.fillRect(0, 0, w, h);
      const speed = driftSpeed;
      const holdMs = down ? performance.now() - downAt : 0;
      const mouseMode = !down && mx > 0 ? "none" : holdMs > 600 ? "attract" : "repel";
      for (let i = 0; i < orbs.length; i++) {
        const o = orbs[i];
        o.phase += o.phaseSpeed;
        if (mx > 0) {
          const dx = o.x - mx, dy = o.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const zone = o.r * 3.5;
          if (dist < zone && dist > 1) {
            const force = (zone - dist) / zone * 0.012;
            if (mouseMode === "repel") {
              o.vx += dx / dist * force;
              o.vy += dy / dist * force;
            } else if (mouseMode === "attract") {
              o.vx -= dx / dist * force * 0.6;
              o.vy -= dy / dist * force * 0.6;
            }
          }
        }
        for (let j = i + 1; j < orbs.length; j++) {
          const b = orbs[j];
          const dx = o.x - b.x, dy = o.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minD = o.r + b.r;
          if (dist < minD && dist > 0.5) {
            const push = (minD - dist) / minD * 0.018;
            const nx = dx / dist, ny = dy / dist;
            o.vx += nx * push;
            o.vy += ny * push;
            b.vx -= nx * push;
            b.vy -= ny * push;
          }
        }
        o.vx *= 0.985;
        o.vy *= 0.985;
        const spd = Math.sqrt(o.vx * o.vx + o.vy * o.vy);
        if (spd < 0.08 * speed) {
          o.vx += (Math.random() - 0.5) * 0.04 * speed;
          o.vy += (Math.random() - 0.5) * 0.04 * speed;
        }
        const maxSpd = 1.2 * speed;
        if (spd > maxSpd) {
          o.vx = o.vx / spd * maxSpd;
          o.vy = o.vy / spd * maxSpd;
        }
        o.x += o.vx * speed;
        o.y += o.vy * speed;
        const pad = o.r * 0.1;
        if (o.x < o.r + pad) {
          o.x = o.r + pad;
          o.vx = Math.abs(o.vx) * 0.7;
        }
        if (o.x > w - o.r - pad) {
          o.x = w - o.r - pad;
          o.vx = -Math.abs(o.vx) * 0.7;
        }
        if (o.y < o.r + pad) {
          o.y = o.r + pad;
          o.vy = Math.abs(o.vy) * 0.7;
        }
        if (o.y > h - o.r - pad) {
          o.y = h - o.r - pad;
          o.vy = -Math.abs(o.vy) * 0.7;
        }
      }
      const sorted = [...orbs].sort((a, b) => b.r - a.r);
      for (const orb of sorted) {
        const breathR = orb.r * (1 + Math.sin(orb.phase) * 0.04);
        drawOrb(ctx, __spreadProps(__spreadValues({}, orb), { r: breathR }), ar2, ag2, ab2, frostAmount, breathR);
      }
      const vig = ctx.createRadialGradient(w / 2, h / 2, h * 0.25, w / 2, h / 2, h * 0.85);
      vig.addColorStop(0, "rgba(7,6,14,0)");
      vig.addColorStop(1, "rgba(7,6,14,0.55)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [accentColor, orbCount, sizeScale, frostAmount, driftSpeed, resizeCanvas]);
  const handleMouseMove = useCallback7((e) => {
    var _a;
    const now = performance.now();
    const rect = (_a = containerRef.current) == null ? void 0 : _a.getBoundingClientRect();
    if (!rect) return;
    const rx = e.clientX - rect.left;
    const ry = e.clientY - rect.top;
    if (cursorRef.current) {
      cursorRef.current.style.left = `${rx}px`;
      cursorRef.current.style.top = `${ry}px`;
      cursorRef.current.style.opacity = "1";
    }
    if (now - lastMoveRef.current < 16) return;
    lastMoveRef.current = now;
    mouseRef.current.x = rx;
    mouseRef.current.y = ry;
  }, []);
  const handleMouseDown = useCallback7(() => {
    mouseRef.current.down = true;
    mouseRef.current.downAt = performance.now();
  }, []);
  const handleMouseUp = useCallback7(() => {
    mouseRef.current.down = false;
  }, []);
  const handleMouseLeave = useCallback7(() => {
    mouseRef.current = { x: -9999, y: -9999, down: false, downAt: 0 };
    if (cursorRef.current) cursorRef.current.style.opacity = "0";
  }, []);
  const [ar, ag, ab] = hexToRgb3(accentColor);
  const accentRgb = `${ar},${ag},${ab}`;
  return /* @__PURE__ */ jsxs61(
    "div",
    {
      ref: containerRef,
      onMouseMove: handleMouseMove,
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseLeave,
      className: "relative w-full min-h-screen overflow-hidden flex flex-col halo-wrap",
      style: { background: "#07060e", cursor: "none" },
      children: [
        /* @__PURE__ */ jsx81("style", { children: `.halo-wrap, .halo-wrap * { cursor: none !important; }` }),
        /* @__PURE__ */ jsx81(
          "div",
          {
            ref: cursorRef,
            className: "absolute pointer-events-none z-50 rounded-full",
            style: {
              width: "12px",
              height: "12px",
              background: `rgba(${accentRgb},0.9)`,
              boxShadow: `0 0 16px 4px rgba(${accentRgb},0.5)`,
              transform: "translate(-50%,-50%)",
              transition: "opacity 0.2s",
              opacity: 0,
              top: 0,
              left: 0,
              willChange: "left, top"
            }
          }
        ),
        /* @__PURE__ */ jsx81("canvas", { ref: canvasRef, className: "absolute inset-0" }),
        /* @__PURE__ */ jsx81(
          "div",
          {
            className: "absolute inset-0 pointer-events-none z-[1]",
            style: {
              opacity: 0.04,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              mixBlendMode: "overlay"
            }
          }
        ),
        /* @__PURE__ */ jsxs61(
          motion76.nav,
          {
            initial: { opacity: 0, y: -8 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.8, delay: 0.2 },
            className: "relative z-10 flex items-center justify-between px-10 md:px-16 pt-10",
            children: [
              /* @__PURE__ */ jsxs61("div", { style: {
                fontFamily: "system-ui, sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                color: "#fff"
              }, children: [
                "halo",
                /* @__PURE__ */ jsx81("span", { style: { color: accentColor }, children: "." })
              ] }),
              /* @__PURE__ */ jsx81("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsx81(
                "div",
                {
                  className: "px-3 py-1 rounded-full text-xs font-medium",
                  style: {
                    background: `rgba(${accentRgb},0.12)`,
                    border: `1px solid rgba(${accentRgb},0.25)`,
                    color: accentColor,
                    fontFamily: "monospace",
                    letterSpacing: "0.05em",
                    backdropFilter: "blur(8px)"
                  },
                  children: "click + hold to attract"
                }
              ) })
            ]
          }
        ),
        /* @__PURE__ */ jsx81("div", { className: "relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6", children: children || /* @__PURE__ */ jsxs61(
          motion76.div,
          {
            initial: "hidden",
            animate: "visible",
            variants: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.18 } } },
            className: "flex flex-col items-center max-w-3xl",
            children: [
              /* @__PURE__ */ jsxs61(
                motion76.div,
                {
                  variants: { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } },
                  className: "mb-8 px-4 py-1.5 rounded-full flex items-center gap-2",
                  style: {
                    background: `rgba(${accentRgb},0.08)`,
                    border: `1px solid rgba(${accentRgb},0.2)`,
                    backdropFilter: "blur(16px)"
                  },
                  children: [
                    /* @__PURE__ */ jsx81(
                      "span",
                      {
                        className: "w-1.5 h-1.5 rounded-full animate-pulse",
                        style: { background: accentColor, boxShadow: `0 0 8px ${accentColor}` }
                      }
                    ),
                    /* @__PURE__ */ jsx81("span", { style: { fontFamily: "monospace", fontSize: "11px", color: accentColor, letterSpacing: "0.15em" }, children: "INTERACTIVE BACKGROUND" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs61(
                motion76.h1,
                {
                  variants: { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } } },
                  style: {
                    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(3rem, 8vw, 7rem)",
                    lineHeight: 0.95,
                    letterSpacing: "-0.04em",
                    color: "#ffffff",
                    marginBottom: "1.5rem"
                  },
                  children: [
                    "Glass that",
                    /* @__PURE__ */ jsx81("br", {}),
                    /* @__PURE__ */ jsx81("span", { style: {
                      color: "transparent",
                      WebkitTextStroke: `1.5px rgba(${accentRgb},0.7)`,
                      textShadow: `0 0 80px rgba(${accentRgb},0.3)`
                    }, children: "moves." })
                  ]
                }
              ),
              /* @__PURE__ */ jsx81(
                motion76.p,
                {
                  variants: { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } },
                  style: {
                    fontFamily: "system-ui, sans-serif",
                    fontSize: "16px",
                    lineHeight: 1.7,
                    color: "rgba(255,255,255,0.38)",
                    maxWidth: "380px",
                    marginBottom: "3rem",
                    fontWeight: 300
                  },
                  children: "Physically-simulated glass orbs with specular highlights, inner refraction, and soft collision."
                }
              ),
              /* @__PURE__ */ jsxs61(
                motion76.div,
                {
                  variants: { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } },
                  className: "flex items-center gap-4",
                  children: [
                    /* @__PURE__ */ jsx81(
                      motion76.button,
                      {
                        whileHover: { scale: 1.04 },
                        whileTap: { scale: 0.96 },
                        style: {
                          padding: "14px 32px",
                          borderRadius: "999px",
                          background: accentColor,
                          color: "#fff",
                          fontFamily: "system-ui, sans-serif",
                          fontSize: "13px",
                          fontWeight: 600,
                          letterSpacing: "0.03em",
                          border: "none",
                          cursor: "none",
                          boxShadow: `0 0 40px rgba(${accentRgb},0.4), 0 0 80px rgba(${accentRgb},0.15)`,
                          transition: "box-shadow 0.3s"
                        },
                        children: "Use this component \u2192"
                      }
                    ),
                    /* @__PURE__ */ jsx81(
                      motion76.button,
                      {
                        whileHover: { scale: 1.04 },
                        whileTap: { scale: 0.96 },
                        style: {
                          padding: "13px 32px",
                          borderRadius: "999px",
                          background: "rgba(255,255,255,0.04)",
                          color: "rgba(255,255,255,0.5)",
                          fontFamily: "system-ui, sans-serif",
                          fontSize: "13px",
                          fontWeight: 500,
                          border: "1px solid rgba(255,255,255,0.1)",
                          cursor: "none",
                          backdropFilter: "blur(12px)",
                          transition: "color 0.3s, border-color 0.3s"
                        },
                        onMouseEnter: (e) => {
                          e.currentTarget.style.color = "#fff";
                          e.currentTarget.style.borderColor = `rgba(${accentRgb},0.3)`;
                        },
                        onMouseLeave: (e) => {
                          e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                          e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                        },
                        children: "View source"
                      }
                    )
                  ]
                }
              )
            ]
          }
        ) }),
        /* @__PURE__ */ jsxs61(
          motion76.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 1.2, duration: 1 },
            className: "relative z-10 flex items-center justify-center pb-10 gap-2",
            style: { fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,0.18)", letterSpacing: "0.2em" },
            children: [
              /* @__PURE__ */ jsx81("span", { children: "MOVE" }),
              /* @__PURE__ */ jsx81("span", { style: { color: `rgba(${accentRgb},0.4)` }, children: "\xB7" }),
              /* @__PURE__ */ jsx81("span", { children: "CLICK" }),
              /* @__PURE__ */ jsx81("span", { style: { color: `rgba(${accentRgb},0.4)` }, children: "\xB7" }),
              /* @__PURE__ */ jsx81("span", { children: "HOLD" })
            ]
          }
        )
      ]
    }
  );
};

// src/components/Arc/Arc.tsx
import React59, { useRef as useRef30, useEffect as useEffect28, useCallback as useCallback8 } from "react";
import { motion as motion77 } from "framer-motion";
import { jsx as jsx82, jsxs as jsxs62 } from "react/jsx-runtime";
var COLORS = {
  plasma: ["rgba(120,80,255,", "rgba(160,120,255,", "rgba(200,180,255,", "rgba(240,230,255,"],
  toxic: ["rgba(40,200,80,", "rgba(80,230,120,", "rgba(160,255,180,", "rgba(220,255,230,"],
  inferno: ["rgba(220,60,0,", "rgba(255,120,20,", "rgba(255,200,80,", "rgba(255,240,200,"],
  void: ["rgba(0,180,220,", "rgba(40,220,255,", "rgba(160,240,255,", "rgba(220,250,255,"]
};
function buildBolt(x1, y1, x2, y2, depth, roughness, branchProb, branches) {
  if (depth === 0) return [{ x: x1, y: y1 }, { x: x2, y: y2 }];
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const disp = (Math.random() - 0.5) * len * roughness;
  const nx = -dy / len, ny = dx / len;
  const mpx = mx + nx * disp;
  const mpy = my + ny * disp;
  if (depth >= 2 && Math.random() < branchProb) {
    const angle = (Math.random() - 0.5) * Math.PI * 0.7;
    const bLen = len * (0.4 + Math.random() * 0.35);
    const cos = Math.cos(angle), sin = Math.sin(angle);
    const bdx = dx / len * cos - dy / len * sin;
    const bdy = dx / len * sin + dy / len * cos;
    branches.push([
      { x: mpx, y: mpy },
      { x: mpx + bdx * bLen, y: mpy + bdy * bLen },
      depth - 1
    ]);
  }
  const left = buildBolt(x1, y1, mpx, mpy, depth - 1, roughness, branchProb, branches);
  const right = buildBolt(mpx, mpy, x2, y2, depth - 1, roughness, branchProb, branches);
  return [...left.slice(0, -1), ...right];
}
function drawBoltChain(ctx, pts, colors, alpha, isBranch) {
  if (pts.length < 2) return;
  const passes = isBranch ? [[8, 0.3], [3, 0.5], [1, 0.8]] : [[18, 0.18], [8, 0.35], [3, 0.6], [1.2, 1]];
  passes.forEach(([lineW, alphaScale], pi) => {
    const colorIdx = Math.min(pi, colors.length - 1);
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
    ctx.strokeStyle = colors[colorIdx] + (alpha * alphaScale).toFixed(3) + ")";
    ctx.lineWidth = lineW;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  });
}
var Arc = ({
  boltColor = "plasma",
  arcCount = 6,
  branchProbability = 0.35,
  dischargeFrequency = 3,
  intensity = 0.85,
  children
}) => {
  const containerRef = useRef30(null);
  const canvasRef = useRef30(null);
  const rafRef = useRef30(void 0);
  const arcsRef = useRef30([]);
  const sizeRef = useRef30({ w: 0, h: 0 });
  const mouseRef = useRef30({ x: -1, y: -1 });
  const lastMoveRef = useRef30(0);
  const flashRef = useRef30(0);
  const frameRef = useRef30(0);
  const dischargeTimer = useRef30(0);
  const buildArcs = useCallback8((count) => {
    return Array.from({ length: count }, (_, i) => ({
      angle: i / count * Math.PI * 2 + Math.random() * 0.3,
      distFrac: 0.55 + Math.random() * 0.4,
      redrawEvery: 2 + Math.floor(Math.random() * 4),
      frameCount: Math.floor(Math.random() * 6),
      pts: [],
      branches: [],
      alpha: 0.4 + Math.random() * 0.5,
      targetAlpha: 0.4 + Math.random() * 0.5
    }));
  }, []);
  const resizeCanvas = useCallback8(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const dpr = window.devicePixelRatio || 1;
    const w = container.clientWidth;
    const h = container.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);
    sizeRef.current = { w, h };
    arcsRef.current = buildArcs(arcCount);
  }, [arcCount, buildArcs]);
  useEffect28(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    resizeCanvas();
    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resizeCanvas, 100);
    };
    window.addEventListener("resize", onResize);
    const colors = COLORS[boltColor];
    const animate = () => {
      const { w, h } = sizeRef.current;
      const frame = ++frameRef.current;
      const arcs = arcsRef.current;
      const { x: mx, y: my } = mouseRef.current;
      const hasM = mx >= 0;
      const ox = w / 2, oy = h / 2;
      dischargeTimer.current++;
      const dischargeInterval = Math.round(180 / dischargeFrequency);
      if (dischargeTimer.current >= dischargeInterval) {
        dischargeTimer.current = 0;
        flashRef.current = intensity * 0.35;
        arcs.forEach((a) => {
          a.targetAlpha = Math.min(1, intensity * (0.8 + Math.random() * 0.2));
          a.frameCount = 0;
        });
      }
      flashRef.current *= 0.82;
      ctx.fillStyle = "rgba(4, 3, 8, 1)";
      ctx.fillRect(0, 0, w, h);
      const ogrd = ctx.createRadialGradient(ox, oy, 0, ox, oy, 80);
      ogrd.addColorStop(0, colors[3] + 0.6 * intensity + ")");
      ogrd.addColorStop(0.3, colors[1] + 0.25 * intensity + ")");
      ogrd.addColorStop(1, colors[0] + "0)");
      ctx.fillStyle = ogrd;
      ctx.beginPath();
      ctx.arc(ox, oy, 80, 0, Math.PI * 2);
      ctx.fill();
      const roughness = 0.45;
      const depth = 7;
      for (const arc of arcs) {
        arc.frameCount++;
        let tx, ty;
        if (hasM) {
          const mdx = mx - ox, mdy = my - oy;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          const mAngle = Math.atan2(mdy, mdx);
          const angleDiff = Math.atan2(Math.sin(mAngle - arc.angle), Math.cos(mAngle - arc.angle));
          const pull = Math.max(0, 1 - Math.abs(angleDiff) / (Math.PI * 0.33));
          const blendAngle = arc.angle + angleDiff * pull * 0.55;
          const baseDist = Math.min(w, h) * 0.5 * arc.distFrac;
          const tDist = baseDist + (mDist - baseDist) * pull * 0.4;
          tx = ox + Math.cos(blendAngle) * tDist;
          ty = oy + Math.sin(blendAngle) * tDist;
        } else {
          const baseDist = Math.min(w, h) * 0.5 * arc.distFrac;
          tx = ox + Math.cos(arc.angle) * baseDist;
          ty = oy + Math.sin(arc.angle) * baseDist;
        }
        arc.targetAlpha = 0.3 + Math.random() * 0.6 * intensity;
        arc.alpha += (arc.targetAlpha - arc.alpha) * 0.08;
        if (arc.frameCount >= arc.redrawEvery || arc.pts.length === 0) {
          arc.frameCount = 0;
          const rawBranches = [];
          arc.pts = buildBolt(ox, oy, tx, ty, depth, roughness, branchProbability, rawBranches);
          arc.branches = rawBranches.map(([start, end, d]) => {
            const bBranches = [];
            const bPts = buildBolt(start.x, start.y, end.x, end.y, d, roughness * 1.1, branchProbability * 0.5, bBranches);
            return { pts: bPts, alpha: 0.3 + Math.random() * 0.45 };
          });
        }
        for (const branch of arc.branches) {
          drawBoltChain(ctx, branch.pts, colors, branch.alpha * arc.alpha * intensity, true);
        }
        drawBoltChain(ctx, arc.pts, colors, arc.alpha * intensity, false);
        if (arc.pts.length > 0) {
          const ep = arc.pts[arc.pts.length - 1];
          const egrd = ctx.createRadialGradient(ep.x, ep.y, 0, ep.x, ep.y, 20);
          egrd.addColorStop(0, colors[3] + arc.alpha * intensity * 0.8 + ")");
          egrd.addColorStop(0.5, colors[1] + arc.alpha * intensity * 0.3 + ")");
          egrd.addColorStop(1, colors[0] + "0)");
          ctx.fillStyle = egrd;
          ctx.beginPath();
          ctx.arc(ep.x, ep.y, 20, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      if (hasM) {
        const mgrd = ctx.createRadialGradient(mx, my, 0, mx, my, 60);
        mgrd.addColorStop(0, colors[2] + 0.25 * intensity + ")");
        mgrd.addColorStop(0.4, colors[0] + 0.1 * intensity + ")");
        mgrd.addColorStop(1, colors[0] + "0)");
        ctx.fillStyle = mgrd;
        ctx.beginPath();
        ctx.arc(mx, my, 60, 0, Math.PI * 2);
        ctx.fill();
      }
      if (flashRef.current > 0.01) {
        ctx.fillStyle = colors[2] + flashRef.current.toFixed(3) + ")";
        ctx.fillRect(0, 0, w, h);
      }
      const vig = ctx.createRadialGradient(w / 2, h / 2, h * 0.2, w / 2, h / 2, h * 0.85);
      vig.addColorStop(0, "rgba(4,3,8,0)");
      vig.addColorStop(1, "rgba(4,3,8,0.75)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [boltColor, arcCount, branchProbability, dischargeFrequency, intensity, resizeCanvas]);
  const handleMouseMove = useCallback8((e) => {
    var _a;
    const now = performance.now();
    if (now - lastMoveRef.current < 16) return;
    lastMoveRef.current = now;
    const rect = (_a = containerRef.current) == null ? void 0 : _a.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);
  const handleMouseLeave = useCallback8(() => {
    mouseRef.current = { x: -1, y: -1 };
  }, []);
  const accentCss = {
    plasma: "#a78bfa",
    toxic: "#4ade80",
    inferno: "#fb923c",
    void: "#38bdf8"
  }[boltColor];
  return /* @__PURE__ */ jsxs62(
    "div",
    {
      ref: containerRef,
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      className: "relative w-full min-h-screen overflow-hidden flex flex-col",
      style: { background: "#04030a" },
      children: [
        /* @__PURE__ */ jsx82("canvas", { ref: canvasRef, className: "absolute inset-0 z-0" }),
        /* @__PURE__ */ jsx82(
          "div",
          {
            className: "absolute inset-0 pointer-events-none z-[1]",
            style: {
              backgroundImage: "repeating-linear-gradient(0deg,rgba(0,0,0,0.12) 0px,rgba(0,0,0,0.12) 1px,transparent 1px,transparent 4px)"
            }
          }
        ),
        /* @__PURE__ */ jsx82(
          "div",
          {
            className: "absolute inset-0 pointer-events-none z-[1]",
            style: {
              opacity: 0.04,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              mixBlendMode: "overlay"
            }
          }
        ),
        /* @__PURE__ */ jsxs62(
          motion77.nav,
          {
            initial: { opacity: 0, y: -10 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.7, delay: 0.2 },
            className: "relative z-10 flex items-center justify-between px-8 md:px-14 pt-8",
            children: [
              /* @__PURE__ */ jsx82("div", { style: { fontFamily: "monospace", fontSize: "13px", fontWeight: 700, letterSpacing: "0.15em", color: accentCss }, children: "ARC //" }),
              /* @__PURE__ */ jsxs62("div", { className: "flex items-center gap-6", children: [
                ["Protocol", "Validators", "Docs"].map((item) => /* @__PURE__ */ jsx82(
                  "button",
                  {
                    style: {
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "monospace",
                      fontSize: "11px",
                      letterSpacing: "0.15em",
                      color: "rgba(255,255,255,0.3)",
                      textTransform: "uppercase",
                      padding: 0,
                      transition: "color 0.2s"
                    },
                    onMouseEnter: (e) => e.currentTarget.style.color = accentCss,
                    onMouseLeave: (e) => e.currentTarget.style.color = "rgba(255,255,255,0.3)",
                    children: item
                  },
                  item
                )),
                /* @__PURE__ */ jsx82(
                  motion77.button,
                  {
                    whileHover: { scale: 1.04 },
                    whileTap: { scale: 0.96 },
                    style: {
                      fontFamily: "monospace",
                      fontSize: "10px",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      padding: "8px 18px",
                      background: "transparent",
                      border: `1px solid ${accentCss}50`,
                      color: accentCss,
                      cursor: "pointer",
                      transition: "background 0.2s, border-color 0.2s"
                    },
                    onMouseEnter: (e) => {
                      e.currentTarget.style.background = `${accentCss}18`;
                      e.currentTarget.style.borderColor = accentCss;
                    },
                    onMouseLeave: (e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.borderColor = `${accentCss}50`;
                    },
                    children: "Launch App"
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsx82("div", { className: "relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6", children: children || /* @__PURE__ */ jsxs62(
          motion77.div,
          {
            initial: "hidden",
            animate: "visible",
            variants: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.14 } } },
            className: "flex flex-col items-center max-w-4xl",
            children: [
              /* @__PURE__ */ jsxs62(
                motion77.div,
                {
                  variants: { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } },
                  className: "mb-8 flex items-center gap-3",
                  style: { fontFamily: "monospace" },
                  children: [
                    /* @__PURE__ */ jsx82("span", { className: "w-2 h-2 rounded-full animate-pulse", style: { background: accentCss, boxShadow: `0 0 10px ${accentCss}` } }),
                    /* @__PURE__ */ jsx82("span", { style: { fontSize: "10px", letterSpacing: "0.4em", color: accentCss, opacity: 0.8, textTransform: "uppercase" }, children: "Mainnet Live \xB7 Block #19,847,203" }),
                    /* @__PURE__ */ jsx82("span", { className: "w-2 h-2 rounded-full animate-pulse", style: { background: accentCss, boxShadow: `0 0 10px ${accentCss}`, animationDelay: "0.5s" } })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs62(
                motion77.h1,
                {
                  variants: { hidden: { opacity: 0, y: 36 }, visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } } },
                  style: {
                    fontFamily: "monospace",
                    fontWeight: 900,
                    fontSize: "clamp(3rem, 9vw, 8.5rem)",
                    lineHeight: 0.9,
                    letterSpacing: "-0.04em",
                    color: "#ffffff",
                    textTransform: "uppercase",
                    marginBottom: "1.2rem"
                  },
                  children: [
                    "POWER THE",
                    /* @__PURE__ */ jsx82("br", {}),
                    /* @__PURE__ */ jsx82("span", { style: {
                      color: "transparent",
                      WebkitTextStroke: `2px ${accentCss}`,
                      textShadow: `0 0 80px ${accentCss}60`
                    }, children: "CHAIN." })
                  ]
                }
              ),
              /* @__PURE__ */ jsx82(
                motion77.p,
                {
                  variants: { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } },
                  style: {
                    fontFamily: "monospace",
                    fontSize: "13px",
                    lineHeight: 1.8,
                    color: "rgba(255,255,255,0.35)",
                    maxWidth: "400px",
                    marginBottom: "3rem",
                    letterSpacing: "0.04em"
                  },
                  children: "Sub-second finality. Zero-knowledge proofs. Permissionless validators. The infrastructure the next financial system runs on."
                }
              ),
              /* @__PURE__ */ jsxs62(
                motion77.div,
                {
                  variants: { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } },
                  className: "flex items-center gap-4 flex-wrap justify-center",
                  children: [
                    /* @__PURE__ */ jsx82(
                      motion77.button,
                      {
                        whileHover: { scale: 1.04, boxShadow: `0 0 40px ${accentCss}60` },
                        whileTap: { scale: 0.96 },
                        style: {
                          fontFamily: "monospace",
                          fontSize: "11px",
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          padding: "16px 36px",
                          background: accentCss,
                          color: "#04030a",
                          border: "none",
                          cursor: "pointer",
                          fontWeight: 700,
                          boxShadow: `0 0 24px ${accentCss}40`,
                          transition: "box-shadow 0.3s"
                        },
                        children: "Run a Node \u2192"
                      }
                    ),
                    /* @__PURE__ */ jsx82(
                      motion77.button,
                      {
                        whileHover: { scale: 1.04 },
                        whileTap: { scale: 0.96 },
                        style: {
                          fontFamily: "monospace",
                          fontSize: "11px",
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          padding: "15px 36px",
                          background: "transparent",
                          color: "rgba(255,255,255,0.45)",
                          border: "1px solid rgba(255,255,255,0.12)",
                          cursor: "pointer",
                          transition: "color 0.25s, border-color 0.25s"
                        },
                        onMouseEnter: (e) => {
                          e.currentTarget.style.color = accentCss;
                          e.currentTarget.style.borderColor = `${accentCss}50`;
                        },
                        onMouseLeave: (e) => {
                          e.currentTarget.style.color = "rgba(255,255,255,0.45)";
                          e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                        },
                        children: "Read Whitepaper"
                      }
                    )
                  ]
                }
              )
            ]
          }
        ) }),
        /* @__PURE__ */ jsxs62(
          motion77.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 1, duration: 0.8 },
            className: "relative z-10 flex items-center justify-between px-8 md:px-14 pb-8",
            children: [
              /* @__PURE__ */ jsx82("div", { className: "flex items-center gap-8", children: [
                { val: "0.4s", label: "Finality" },
                { val: "50k", label: "TPS" },
                { val: "$0.001", label: "Avg Fee" }
              ].map(({ val, label }, i) => /* @__PURE__ */ jsxs62(React59.Fragment, { children: [
                i > 0 && /* @__PURE__ */ jsx82("span", { className: "w-px h-6 bg-white/10" }),
                /* @__PURE__ */ jsxs62("div", { className: "flex flex-col gap-0.5", children: [
                  /* @__PURE__ */ jsx82("span", { style: { fontFamily: "monospace", fontSize: "17px", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em" }, children: val }),
                  /* @__PURE__ */ jsx82("span", { style: { fontFamily: "monospace", fontSize: "9px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.25em", textTransform: "uppercase" }, children: label })
                ] })
              ] }, label)) }),
              /* @__PURE__ */ jsxs62("div", { style: { fontFamily: "monospace", fontSize: "9px", color: "rgba(255,255,255,0.18)", letterSpacing: "0.2em", textAlign: "right" }, children: [
                /* @__PURE__ */ jsx82("div", { children: "ARC PROTOCOL v3.1" }),
                /* @__PURE__ */ jsxs62("div", { style: { color: accentCss, opacity: 0.45 }, children: [
                  arcCount,
                  " ARCS \xB7 BRANCH ",
                  Math.round(branchProbability * 100),
                  "%"
                ] })
              ] })
            ]
          }
        )
      ]
    }
  );
};

// src/components/Dune/Dune.tsx
import { useRef as useRef31, useEffect as useEffect29, useCallback as useCallback9 } from "react";
import { motion as motion78 } from "framer-motion";
import { jsx as jsx83, jsxs as jsxs63 } from "react/jsx-runtime";
var PALETTES3 = {
  sahara: ["#2d1f0e", "#6b3d1e", "#c4822a", "#d4944a", "#e8b060", "#f0c878", "#f5d490"],
  mars: ["#1a0a08", "#4a1a10", "#8b3520", "#b04530", "#c85540", "#d06848", "#e08858"],
  arctic: ["#0a1520", "#1a3045", "#3a6080", "#5a8aaa", "#8ab0c8", "#b0cce0", "#d0e8f0"],
  obsidian: ["#080808", "#1a1a1a", "#2a2520", "#3a3028", "#504538", "#6a5c48", "#887060"]
};
var ACCENTS = {
  sahara: "#f5d490",
  mars: "#e08858",
  arctic: "#d0e8f0",
  obsidian: "#887060"
};
function smoothNoise(x, seed) {
  const n = Math.sin(x * 127.1 + seed * 311.7) * 43758.5453;
  return n - Math.floor(n);
}
function smoothedNoise(x, seed) {
  const ix = Math.floor(x);
  const fx = x - ix;
  const ux = fx * fx * (3 - 2 * fx);
  return smoothNoise(ix, seed) * (1 - ux) + smoothNoise(ix + 1, seed) * ux;
}
function fbm1D(x, seed, octaves) {
  let v = 0, a = 0.5, f = 1, mx = 0;
  for (let i = 0; i < octaves; i++) {
    v += smoothedNoise(x * f, seed + i * 17) * a;
    mx += a;
    a *= 0.5;
    f *= 2.1;
  }
  return v / mx;
}
function makeGrains(count, w, h, layers) {
  return Array.from({ length: count }, () => {
    const layer = Math.floor(Math.random() * layers);
    const speed = 0.4 + layer * 0.6 + Math.random() * 0.5;
    return {
      x: Math.random() * w,
      y: h * (0.2 + layer * 0.22) + (Math.random() - 0.5) * h * 0.18,
      vx: speed,
      vy: (Math.random() - 0.5) * 0.15,
      size: 0.5 + layer * 0.6 + Math.random() * 0.8,
      alpha: 0.25 + layer * 0.2 + Math.random() * 0.25,
      layer,
      phase: Math.random() * Math.PI * 2
    };
  });
}
var Dune = ({
  palette = "sahara",
  duneCount = 5,
  windStrength = 1,
  particleDensity = 1,
  parallaxDepth = 1,
  children
}) => {
  const containerRef = useRef31(null);
  const canvasRef = useRef31(null);
  const rafRef = useRef31(void 0);
  const sizeRef = useRef31({ w: 0, h: 0 });
  const mouseRef = useRef31({ nx: 0, ny: 0.5 });
  const smoothWind = useRef31({ nx: 0, ny: 0.5 });
  const lastMoveRef = useRef31(0);
  const timeRef = useRef31(0);
  const dunesRef = useRef31([]);
  const grainsRef = useRef31([]);
  const buildScene = useCallback9((w, h) => {
    const count = Math.max(3, duneCount);
    dunesRef.current = Array.from({ length: count }, (_, i) => {
      const t = i / (count - 1);
      const baseY = 0.38 + t * 0.42;
      const amp = 30 + t * h * 0.12;
      const spd = (0.08 + t * 0.28) * windStrength;
      const colorIdx = 2 + Math.round(t * 3);
      return {
        seed: Math.random() * 1e3,
        baseY: baseY * h,
        amplitude: amp,
        speed: spd,
        offset: Math.random() * 1e3,
        colorIdx,
        parallax: (0.2 + t * 0.8) * parallaxDepth
      };
    });
    const gCount = Math.round(120 * particleDensity);
    grainsRef.current = makeGrains(gCount, w, h, 3);
  }, [duneCount, windStrength, particleDensity, parallaxDepth]);
  const resizeCanvas = useCallback9(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const dpr = window.devicePixelRatio || 1;
    const w = container.clientWidth;
    const h = container.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);
    sizeRef.current = { w, h };
    buildScene(w, h);
  }, [buildScene]);
  function drawDune(ctx, dune, w, h, pal, mouseNX) {
    var _a;
    const pts = [];
    const steps = 60;
    const mShift = (mouseNX - 0.5) * 40 * dune.parallax;
    for (let i = 0; i <= steps; i++) {
      const xFrac = i / steps;
      const xWorld = xFrac * w * 1.2 - w * 0.1 + mShift;
      const noiseX = (xWorld + dune.offset) * 3e-3;
      const ny = fbm1D(noiseX, dune.seed, 4);
      pts.push(
        xFrac * w,
        dune.baseY - ny * dune.amplitude
      );
    }
    ctx.beginPath();
    ctx.moveTo(pts[0], pts[1]);
    for (let i = 0; i < pts.length - 2; i += 2) {
      const x0 = i === 0 ? pts[0] : pts[i - 2];
      const y0 = i === 0 ? pts[1] : pts[i - 1];
      const x1 = pts[i], y1 = pts[i + 1];
      const x2 = pts[i + 2], y2 = pts[i + 3];
      const x3 = i + 4 < pts.length ? pts[i + 4] : x2;
      const y3 = i + 5 < pts.length ? pts[i + 5] : y2;
      const cpx1 = x1 + (x2 - x0) / 6;
      const cpy1 = y1 + (y2 - y0) / 6;
      const cpx2 = x2 - (x3 - x1) / 6;
      const cpy2 = y2 - (y3 - y1) / 6;
      ctx.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, x2, y2);
    }
    ctx.lineTo(w, h + 2);
    ctx.lineTo(0, h + 2);
    ctx.closePath();
    const topY = dune.baseY - dune.amplitude;
    const fillGrd = ctx.createLinearGradient(0, topY - 20, 0, dune.baseY + dune.amplitude * 0.5);
    const c1 = (_a = pal[dune.colorIdx]) != null ? _a : pal[pal.length - 1];
    fillGrd.addColorStop(0, lighten(c1, 0.15));
    fillGrd.addColorStop(0.3, c1);
    fillGrd.addColorStop(1, darken(c1, 0.3));
    ctx.fillStyle = fillGrd;
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(pts[0], pts[1]);
    for (let i = 0; i < pts.length - 2; i += 2) {
      const x0 = i === 0 ? pts[0] : pts[i - 2];
      const y0 = i === 0 ? pts[1] : pts[i - 1];
      const x1 = pts[i], y1 = pts[i + 1];
      const x2 = pts[i + 2], y2 = pts[i + 3];
      const x3 = i + 4 < pts.length ? pts[i + 4] : x2;
      const y3 = i + 5 < pts.length ? pts[i + 5] : y2;
      ctx.bezierCurveTo(
        x1 + (x2 - x0) / 6,
        y1 + (y2 - y0) / 6,
        x2 - (x3 - x1) / 6,
        y2 - (y3 - y1) / 6,
        x2,
        y2
      );
    }
    ctx.strokeStyle = lighten(c1, 0.35) + "88";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
  function hexToRgb4(hex) {
    const n = parseInt(hex.replace("#", ""), 16);
    return [n >> 16 & 255, n >> 8 & 255, n & 255];
  }
  function rgbToHex(r, g, b) {
    return "#" + [r, g, b].map((v) => Math.min(255, Math.max(0, Math.round(v))).toString(16).padStart(2, "0")).join("");
  }
  function lighten(hex, amt) {
    const [r, g, b] = hexToRgb4(hex);
    return rgbToHex(r + (255 - r) * amt, g + (255 - g) * amt, b + (255 - b) * amt);
  }
  function darken(hex, amt) {
    const [r, g, b] = hexToRgb4(hex);
    return rgbToHex(r * (1 - amt), g * (1 - amt), b * (1 - amt));
  }
  useEffect29(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    resizeCanvas();
    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resizeCanvas, 100);
    };
    window.addEventListener("resize", onResize);
    const pal = PALETTES3[palette];
    const animate = () => {
      var _a, _b, _c;
      const { w, h } = sizeRef.current;
      timeRef.current += 0.016;
      smoothWind.current.nx += (mouseRef.current.nx - smoothWind.current.nx) * 0.025;
      smoothWind.current.ny += (mouseRef.current.ny - smoothWind.current.ny) * 0.025;
      const wNX = smoothWind.current.nx;
      const windBias = (wNX - 0.5) * windStrength;
      const skyGrd = ctx.createLinearGradient(0, 0, 0, h * 0.65);
      skyGrd.addColorStop(0, pal[0]);
      skyGrd.addColorStop(0.7, pal[1]);
      skyGrd.addColorStop(1, pal[2]);
      ctx.fillStyle = skyGrd;
      ctx.fillRect(0, 0, w, h);
      const horizonY = h * 0.42;
      const hazeGrd = ctx.createLinearGradient(0, horizonY - 20, 0, horizonY + 30);
      hazeGrd.addColorStop(0, pal[2] + "00");
      hazeGrd.addColorStop(0.5, pal[3] + "55");
      hazeGrd.addColorStop(1, pal[2] + "00");
      ctx.fillStyle = hazeGrd;
      ctx.fillRect(0, horizonY - 20, w, 50);
      for (const dune of dunesRef.current) {
        dune.offset += dune.speed + windBias * dune.parallax * 0.4;
        drawDune(ctx, dune, w, h, pal, wNX);
      }
      const grains = grainsRef.current;
      for (const g of grains) {
        const windX = (0.8 + windBias * 1.2) * windStrength * (0.6 + g.layer * 0.5);
        const draft = -(smoothWind.current.ny - 0.5) * 0.3 * g.layer;
        g.phase += 0.04 + g.layer * 0.02;
        g.x += windX + Math.sin(g.phase * 0.7) * 0.3;
        g.y += g.vy + draft + Math.sin(g.phase) * 0.15;
        if (g.x > w + 10) g.x = -10;
        if (g.x < -10) g.x = w + 10;
        const baseY = h * (0.25 + g.layer * 0.22);
        if (g.y > baseY + h * 0.18 || g.y < baseY - h * 0.18) {
          g.y = baseY + (Math.random() - 0.5) * h * 0.12;
        }
        const angle = Math.atan2(g.vy, windX);
        const alpha = g.alpha * (0.5 + 0.5 * Math.abs(Math.sin(g.phase * 0.3)));
        const gCol = pal[Math.min(3 + g.layer, pal.length - 1)];
        ctx.save();
        ctx.translate(g.x, g.y);
        ctx.rotate(angle);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = lighten(gCol, 0.3);
        ctx.beginPath();
        ctx.ellipse(0, 0, g.size * 2.5, g.size * 0.7, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        ctx.globalAlpha = 1;
      }
      const sunX = w * 0.78, sunY = h * 0.14;
      const sunGrd = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, h * 0.32);
      sunGrd.addColorStop(0, lighten((_a = pal[6]) != null ? _a : pal[pal.length - 1], 0.6) + "cc");
      sunGrd.addColorStop(0.15, lighten((_b = pal[5]) != null ? _b : pal[pal.length - 1], 0.3) + "44");
      sunGrd.addColorStop(0.5, pal[1] + "22");
      sunGrd.addColorStop(1, pal[0] + "00");
      ctx.fillStyle = sunGrd;
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = darken((_c = pal[5]) != null ? _c : pal[pal.length - 1], 0.15);
      ctx.fillRect(0, h * 0.92, w, h * 0.1);
      const vig = ctx.createRadialGradient(w / 2, h / 2, h * 0.15, w / 2, h / 2, h * 0.9);
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.52)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [palette, duneCount, windStrength, particleDensity, parallaxDepth, resizeCanvas]);
  const handleMouseMove = useCallback9((e) => {
    var _a;
    const now = performance.now();
    if (now - lastMoveRef.current < 20) return;
    lastMoveRef.current = now;
    const rect = (_a = containerRef.current) == null ? void 0 : _a.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = {
      nx: (e.clientX - rect.left) / rect.width,
      ny: (e.clientY - rect.top) / rect.height
    };
  }, []);
  const handleMouseLeave = useCallback9(() => {
    mouseRef.current = { nx: 0.5, ny: 0.5 };
  }, []);
  const accent = ACCENTS[palette];
  return /* @__PURE__ */ jsxs63(
    "div",
    {
      ref: containerRef,
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      className: "relative w-full min-h-screen overflow-hidden flex flex-col",
      style: { background: PALETTES3[palette][0] },
      children: [
        /* @__PURE__ */ jsx83("canvas", { ref: canvasRef, className: "absolute inset-0 z-0" }),
        /* @__PURE__ */ jsx83(
          "div",
          {
            className: "absolute inset-0 pointer-events-none z-[1]",
            style: {
              opacity: 0.07,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.92' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              mixBlendMode: "overlay"
            }
          }
        ),
        /* @__PURE__ */ jsxs63(
          motion78.nav,
          {
            initial: { opacity: 0, y: -10 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 1, delay: 0.2 },
            className: "relative z-10 flex items-center justify-between px-10 md:px-16 pt-10",
            children: [
              /* @__PURE__ */ jsx83("div", { style: {
                fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif",
                fontSize: "16px",
                fontWeight: 400,
                letterSpacing: "0.25em",
                color: accent,
                textTransform: "uppercase"
              }, children: "Silt" }),
              /* @__PURE__ */ jsx83("div", { className: "flex items-center gap-8", children: ["Work", "Studio", "Contact"].map((item) => /* @__PURE__ */ jsx83(
                "button",
                {
                  style: {
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "Georgia, serif",
                    fontSize: "11px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.4)",
                    transition: "color 0.4s",
                    padding: 0
                  },
                  onMouseEnter: (e) => e.currentTarget.style.color = accent,
                  onMouseLeave: (e) => e.currentTarget.style.color = "rgba(255,255,255,0.4)",
                  children: item
                },
                item
              )) })
            ]
          }
        ),
        /* @__PURE__ */ jsx83("div", { className: "relative z-10 flex-1 flex flex-col justify-center px-10 md:px-16", children: children || /* @__PURE__ */ jsxs63(
          motion78.div,
          {
            initial: "hidden",
            animate: "visible",
            variants: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } },
            className: "max-w-2xl",
            children: [
              /* @__PURE__ */ jsxs63(
                motion78.div,
                {
                  variants: { hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0 } },
                  className: "flex items-center gap-4 mb-10",
                  children: [
                    /* @__PURE__ */ jsx83("div", { className: "w-10 h-px", style: { background: accent, opacity: 0.7 } }),
                    /* @__PURE__ */ jsx83("span", { style: {
                      fontFamily: "Georgia, serif",
                      fontSize: "10px",
                      letterSpacing: "0.45em",
                      color: accent,
                      opacity: 0.8,
                      textTransform: "uppercase"
                    }, children: "Creative Studio \xB7 Est. 2019" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx83(
                motion78.h1,
                {
                  variants: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } } },
                  style: {
                    fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif",
                    fontWeight: 400,
                    fontStyle: "italic",
                    fontSize: "clamp(3.2rem, 7.5vw, 7.5rem)",
                    lineHeight: 1,
                    letterSpacing: "-0.01em",
                    color: "#ffffff",
                    marginBottom: "0.2em"
                  },
                  children: "Shape what"
                }
              ),
              /* @__PURE__ */ jsx83(
                motion78.h1,
                {
                  variants: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.08 } } },
                  style: {
                    fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif",
                    fontWeight: 700,
                    fontStyle: "normal",
                    fontSize: "clamp(3.2rem, 7.5vw, 7.5rem)",
                    lineHeight: 1,
                    letterSpacing: "0.06em",
                    color: "transparent",
                    WebkitTextStroke: `1.5px ${accent}`,
                    textTransform: "uppercase",
                    marginBottom: "0.2em"
                  },
                  children: "endures."
                }
              ),
              /* @__PURE__ */ jsx83(
                motion78.div,
                {
                  variants: { hidden: { scaleX: 0, opacity: 0 }, visible: { scaleX: 1, opacity: 1, transition: { duration: 0.8 } } },
                  className: "origin-left my-8 h-px w-24",
                  style: { background: `linear-gradient(to right, ${accent}80, transparent)` }
                }
              ),
              /* @__PURE__ */ jsx83(
                motion78.p,
                {
                  variants: { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } },
                  style: {
                    fontFamily: "Georgia, serif",
                    fontStyle: "italic",
                    fontSize: "15px",
                    lineHeight: 1.9,
                    color: "rgba(255,255,255,0.45)",
                    maxWidth: "340px",
                    marginBottom: "3rem"
                  },
                  children: "We build brands that outlast the moment. Strategy, identity, and experience \u2014 crafted with the patience of the desert."
                }
              ),
              /* @__PURE__ */ jsxs63(
                motion78.div,
                {
                  variants: { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } },
                  className: "flex items-center gap-6",
                  children: [
                    /* @__PURE__ */ jsx83(
                      motion78.button,
                      {
                        whileHover: { scale: 1.03 },
                        whileTap: { scale: 0.97 },
                        style: {
                          fontFamily: "Georgia, serif",
                          fontSize: "11px",
                          letterSpacing: "0.28em",
                          textTransform: "uppercase",
                          padding: "15px 38px",
                          background: accent,
                          color: "#1a0e06",
                          border: "none",
                          cursor: "pointer",
                          fontWeight: 700,
                          transition: "opacity 0.3s",
                          clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))"
                        },
                        onMouseEnter: (e) => e.currentTarget.style.opacity = "0.88",
                        onMouseLeave: (e) => e.currentTarget.style.opacity = "1",
                        children: "See Our Work"
                      }
                    ),
                    /* @__PURE__ */ jsx83(
                      motion78.button,
                      {
                        whileHover: { scale: 1.03 },
                        whileTap: { scale: 0.97 },
                        style: {
                          fontFamily: "Georgia, serif",
                          fontSize: "11px",
                          letterSpacing: "0.28em",
                          textTransform: "uppercase",
                          padding: "14px 38px",
                          background: "transparent",
                          color: "rgba(255,255,255,0.45)",
                          border: "1px solid rgba(255,255,255,0.18)",
                          cursor: "pointer",
                          transition: "color 0.35s, border-color 0.35s"
                        },
                        onMouseEnter: (e) => {
                          e.currentTarget.style.color = accent;
                          e.currentTarget.style.borderColor = `${accent}60`;
                        },
                        onMouseLeave: (e) => {
                          e.currentTarget.style.color = "rgba(255,255,255,0.45)";
                          e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
                        },
                        children: "Start a Project \u2192"
                      }
                    )
                  ]
                }
              )
            ]
          }
        ) }),
        /* @__PURE__ */ jsxs63(
          motion78.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 1.2, duration: 1 },
            className: "relative z-10 flex items-end justify-between px-10 md:px-16 pb-10",
            children: [
              /* @__PURE__ */ jsx83("div", { className: "flex items-center gap-8", children: [["12", "Years"], ["80+", "Brands"], ["4", "Continents"]].map(([val, label]) => /* @__PURE__ */ jsxs63("div", { className: "flex flex-col gap-0.5", children: [
                /* @__PURE__ */ jsx83("span", { style: { fontFamily: "Georgia, serif", fontSize: "22px", fontWeight: 700, color: accent, letterSpacing: "-0.02em" }, children: val }),
                /* @__PURE__ */ jsx83("span", { style: { fontFamily: "Georgia, serif", fontSize: "9px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.3em", textTransform: "uppercase" }, children: label })
              ] }, label)) }),
              /* @__PURE__ */ jsxs63("div", { className: "flex flex-col items-center gap-2", children: [
                /* @__PURE__ */ jsx83(
                  motion78.div,
                  {
                    animate: { y: [0, 6, 0] },
                    transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
                    style: { width: "1px", height: "36px", background: `linear-gradient(to bottom, ${accent}60, transparent)` }
                  }
                ),
                /* @__PURE__ */ jsx83("span", { style: { fontFamily: "Georgia, serif", fontSize: "9px", color: "rgba(255,255,255,0.22)", letterSpacing: "0.3em", textTransform: "uppercase" }, children: "Scroll" })
              ] })
            ]
          }
        )
      ]
    }
  );
};

// src/components/Monsoon/Monsoon.tsx
import React61, { useRef as useRef32, useEffect as useEffect30, useCallback as useCallback10 } from "react";
import { motion as motion79 } from "framer-motion";
import { jsx as jsx84, jsxs as jsxs64 } from "react/jsx-runtime";
var SCHEMES = {
  nightcity: {
    bg: ["#04060f", "#080d1a", "#0d1525"],
    cityGlow: ["rgba(40,80,180,", "rgba(80,40,140,", "rgba(180,100,40,"],
    drop: "rgba(140,180,255,",
    ripple: "rgba(100,150,220,",
    streak: "rgba(80,120,200,",
    accent: "#4a9eff",
    ui: "#a0c4ff"
  },
  bloodmoon: {
    bg: ["#0f0404", "#1a0808", "#250d0d"],
    cityGlow: ["rgba(180,40,40,", "rgba(140,20,60,", "rgba(80,10,20,"],
    drop: "rgba(255,160,140,",
    ripple: "rgba(220,80,80,",
    streak: "rgba(180,60,60,",
    accent: "#ff4a4a",
    ui: "#ffa0a0"
  },
  arctic: {
    bg: ["#04080f", "#08121a", "#0d1e28"],
    cityGlow: ["rgba(40,160,200,", "rgba(20,120,180,", "rgba(10,60,120,"],
    drop: "rgba(180,230,255,",
    ripple: "rgba(120,200,240,",
    streak: "rgba(80,160,220,",
    accent: "#00d4ff",
    ui: "#80e8ff"
  },
  toxic: {
    bg: ["#040f04", "#081a08", "#0d250d"],
    cityGlow: ["rgba(40,180,40,", "rgba(20,140,60,", "rgba(80,180,20,"],
    drop: "rgba(160,255,160,",
    ripple: "rgba(80,220,80,",
    streak: "rgba(60,180,60,",
    accent: "#00ff88",
    ui: "#80ffb0"
  }
};
function makeDrop(w, windVx, layer) {
  const speeds = [12, 7, 4];
  const lens = [18, 30, 50];
  const alphas = [0.25, 0.45, 0.7];
  return {
    x: Math.random() * (w + 200) - 100,
    y: -Math.random() * 200,
    len: lens[layer] + Math.random() * lens[layer] * 0.5,
    speed: speeds[layer] + Math.random() * 3,
    layer,
    alpha: alphas[layer] + Math.random() * 0.15,
    landed: false
  };
}
var Monsoon = ({
  colorScheme = "nightcity",
  intensity = 1,
  windAngle = 15,
  streakPersistence = 0.6,
  rippleCount = 1,
  children
}) => {
  const containerRef = useRef32(null);
  const canvasRef = useRef32(null);
  const glassRef = useRef32(null);
  const rafRef = useRef32(void 0);
  const sizeRef = useRef32({ w: 0, h: 0 });
  const mouseRef = useRef32({ nx: 0.5 });
  const smoothWind = useRef32(0.5);
  const lastMoveRef = useRef32(0);
  const dropsRef = useRef32([]);
  const ripplesRef = useRef32([]);
  const streaksRef = useRef32([]);
  const initDrops = useCallback10((w, count) => {
    const drops = [];
    const perLayer = [
      Math.round(count * 0.5),
      // far — most numerous
      Math.round(count * 0.33),
      // mid
      Math.round(count * 0.17)
      // near — fewest
    ];
    for (let layer = 0; layer < 3; layer++) {
      for (let i = 0; i < perLayer[layer]; i++) {
        const d = makeDrop(w, 0, layer);
        d.y = Math.random() * 800 - 800;
        drops.push(d);
      }
    }
    dropsRef.current = drops;
  }, []);
  const resizeCanvas = useCallback10(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const glass = glassRef.current;
    if (!container || !canvas || !glass) return;
    const dpr = window.devicePixelRatio || 1;
    const w = container.clientWidth;
    const h = container.clientHeight;
    for (const c of [canvas, glass]) {
      c.width = w * dpr;
      c.height = h * dpr;
      c.style.width = `${w}px`;
      c.style.height = `${h}px`;
      const ctx = c.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
    }
    sizeRef.current = { w, h };
    const count = Math.round(180 * intensity);
    initDrops(w, count);
    ripplesRef.current = [];
    streaksRef.current = [];
  }, [intensity, initDrops]);
  useEffect30(() => {
    const canvas = canvasRef.current;
    const glass = glassRef.current;
    if (!canvas || !glass) return;
    const ctx = canvas.getContext("2d");
    const gCtx = glass.getContext("2d");
    if (!ctx || !gCtx) return;
    resizeCanvas();
    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resizeCanvas, 100);
    };
    window.addEventListener("resize", onResize);
    const s2 = SCHEMES[colorScheme];
    const animate = () => {
      const { w, h } = sizeRef.current;
      smoothWind.current += (mouseRef.current.nx - smoothWind.current) * 0.04;
      const windLean = windAngle + (smoothWind.current - 0.5) * 30;
      const windRad = windLean * Math.PI / 180;
      const windVx = Math.sin(windRad);
      const windVy = Math.cos(windRad);
      const bgGrd = ctx.createLinearGradient(0, 0, 0, h);
      bgGrd.addColorStop(0, s2.bg[0]);
      bgGrd.addColorStop(0.5, s2.bg[1]);
      bgGrd.addColorStop(1, s2.bg[2]);
      ctx.fillStyle = bgGrd;
      ctx.fillRect(0, 0, w, h);
      const horizonY = h * 0.72;
      const glowPositions = [0.2, 0.5, 0.8];
      glowPositions.forEach((xFrac, i) => {
        const gx = w * xFrac;
        const grd = ctx.createRadialGradient(gx, horizonY, 0, gx, horizonY, w * 0.35);
        const col = s2.cityGlow[i % s2.cityGlow.length];
        grd.addColorStop(0, col + "0.22)");
        grd.addColorStop(0.5, col + "0.07)");
        grd.addColorStop(1, col + "0)");
        ctx.fillStyle = grd;
        ctx.fillRect(0, horizonY - w * 0.35, w, w * 0.7);
      });
      const drops = dropsRef.current;
      const layerWidths = [0.6, 1, 1.6];
      const layerBlur = [0, 0, 0];
      ctx.lineCap = "round";
      for (const d of drops) {
        d.x += windVx * d.speed * (0.4 + d.layer * 0.3);
        d.y += windVy * d.speed;
        if (d.y > h + d.len && !d.landed) {
          d.landed = true;
          if (Math.random() < rippleCount * 0.7) {
            ripplesRef.current.push({
              x: d.x,
              y: h - 2,
              r: 1,
              maxR: 18 + Math.random() * 22,
              alpha: 0.6 + d.layer * 0.15,
              speed: 0.8 + Math.random() * 0.6
            });
          }
          if (d.layer >= 1 && Math.random() < streakPersistence * 0.55) {
            streaksRef.current.push({
              x: d.x + (Math.random() - 0.5) * 4,
              y: Math.random() * h * 0.85,
              vy: 0.3 + Math.random() * 0.5,
              len: 20 + Math.random() * 60,
              alpha: 0.35 + Math.random() * 0.3,
              wobble: 0.6 + Math.random() * 1.2,
              wobblePhase: Math.random() * Math.PI * 2
            });
          }
          Object.assign(d, makeDrop(w, windVx, d.layer));
        }
        const tx = -windVx * d.len;
        const ty = -windVy * d.len;
        const grd = ctx.createLinearGradient(d.x, d.y, d.x + tx, d.y + ty);
        grd.addColorStop(0, s2.drop + d.alpha + ")");
        grd.addColorStop(1, s2.drop + "0)");
        ctx.strokeStyle = grd;
        ctx.lineWidth = layerWidths[d.layer];
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x + tx, d.y + ty);
        ctx.stroke();
      }
      const ripples = ripplesRef.current;
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.r += rp.speed;
        rp.alpha *= 0.93;
        if (rp.alpha < 0.01 || rp.r > rp.maxR) {
          ripples.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.ellipse(rp.x, rp.y, rp.r * 1.8, rp.r * 0.55, 0, 0, Math.PI * 2);
        ctx.strokeStyle = s2.ripple + rp.alpha.toFixed(3) + ")";
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
      gCtx.fillStyle = `rgba(0,0,0,${8e-3 + (1 - streakPersistence) * 0.025})`;
      gCtx.fillRect(0, 0, w, h);
      const streaks = streaksRef.current;
      for (let i = streaks.length - 1; i >= 0; i--) {
        const sk = streaks[i];
        sk.wobblePhase += 0.04;
        sk.y += sk.vy;
        sk.x += Math.sin(sk.wobblePhase) * sk.wobble * 0.3;
        sk.alpha *= 0.998;
        if (sk.y > h + sk.len || sk.alpha < 0.04) {
          streaks.splice(i, 1);
          continue;
        }
        const grd = gCtx.createLinearGradient(sk.x, sk.y, sk.x, sk.y + sk.len);
        grd.addColorStop(0, s2.streak + (sk.alpha * 0.6).toFixed(3) + ")");
        grd.addColorStop(0.7, s2.streak + (sk.alpha * 0.3).toFixed(3) + ")");
        grd.addColorStop(1, s2.streak + "0)");
        gCtx.strokeStyle = grd;
        gCtx.lineWidth = 1.2 + Math.sin(sk.wobblePhase * 0.5) * 0.4;
        gCtx.lineCap = "round";
        gCtx.beginPath();
        gCtx.moveTo(sk.x, sk.y);
        gCtx.lineTo(sk.x + Math.sin(sk.wobblePhase) * sk.wobble, sk.y + sk.len);
        gCtx.stroke();
      }
      if (streaks.length > 120) streaks.splice(0, streaks.length - 120);
      const vig = ctx.createRadialGradient(w / 2, h / 2, h * 0.1, w / 2, h / 2, h * 0.85);
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.7)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);
      const mistGrd = ctx.createLinearGradient(0, h * 0.8, 0, h);
      mistGrd.addColorStop(0, "rgba(0,0,0,0)");
      mistGrd.addColorStop(1, s2.bg[2] + "cc");
      ctx.fillStyle = mistGrd;
      ctx.fillRect(0, h * 0.8, w, h * 0.2);
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [colorScheme, intensity, windAngle, streakPersistence, rippleCount, resizeCanvas]);
  const handleMouseMove = useCallback10((e) => {
    var _a;
    const now = performance.now();
    if (now - lastMoveRef.current < 20) return;
    lastMoveRef.current = now;
    const rect = (_a = containerRef.current) == null ? void 0 : _a.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current.nx = (e.clientX - rect.left) / rect.width;
  }, []);
  const handleMouseLeave = useCallback10(() => {
    mouseRef.current.nx = 0.5;
  }, []);
  const s = SCHEMES[colorScheme];
  return /* @__PURE__ */ jsxs64(
    "div",
    {
      ref: containerRef,
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      className: "relative w-full min-h-screen overflow-hidden flex flex-col",
      style: { background: s.bg[0] },
      children: [
        /* @__PURE__ */ jsx84("canvas", { ref: canvasRef, className: "absolute inset-0 z-0" }),
        /* @__PURE__ */ jsx84("canvas", { ref: glassRef, className: "absolute inset-0 z-[1]", style: { mixBlendMode: "screen", opacity: 0.7 } }),
        /* @__PURE__ */ jsx84(
          "div",
          {
            className: "absolute inset-0 pointer-events-none z-[2]",
            style: {
              opacity: 0.045,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              mixBlendMode: "overlay"
            }
          }
        ),
        /* @__PURE__ */ jsxs64(
          motion79.nav,
          {
            initial: { opacity: 0, y: -10 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.8, delay: 0.2 },
            className: "relative z-10 flex items-center justify-between px-10 md:px-16 pt-9",
            children: [
              /* @__PURE__ */ jsxs64("div", { style: {
                fontFamily: "monospace",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.22em",
                color: s.accent,
                textTransform: "uppercase"
              }, children: [
                "MNSON",
                /* @__PURE__ */ jsx84("span", { style: { opacity: 0.4 }, children: "_SYS" })
              ] }),
              /* @__PURE__ */ jsxs64("div", { className: "flex items-center gap-6", children: [
                ["Platform", "Docs", "Pricing"].map((item) => /* @__PURE__ */ jsx84(
                  "button",
                  {
                    style: {
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "monospace",
                      fontSize: "10px",
                      letterSpacing: "0.18em",
                      color: "rgba(255,255,255,0.3)",
                      textTransform: "uppercase",
                      padding: 0,
                      transition: "color 0.25s"
                    },
                    onMouseEnter: (e) => e.currentTarget.style.color = s.ui,
                    onMouseLeave: (e) => e.currentTarget.style.color = "rgba(255,255,255,0.3)",
                    children: item
                  },
                  item
                )),
                /* @__PURE__ */ jsx84(
                  motion79.button,
                  {
                    whileHover: { scale: 1.04 },
                    whileTap: { scale: 0.96 },
                    style: {
                      fontFamily: "monospace",
                      fontSize: "10px",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      padding: "8px 20px",
                      background: "transparent",
                      border: `1px solid ${s.accent}55`,
                      color: s.accent,
                      cursor: "pointer",
                      transition: "border-color 0.25s, background 0.25s"
                    },
                    onMouseEnter: (e) => {
                      e.currentTarget.style.background = `${s.accent}18`;
                      e.currentTarget.style.borderColor = s.accent;
                    },
                    onMouseLeave: (e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.borderColor = `${s.accent}55`;
                    },
                    children: "Early Access"
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsx84("div", { className: "relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6", children: children || /* @__PURE__ */ jsxs64(
          motion79.div,
          {
            initial: "hidden",
            animate: "visible",
            variants: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } },
            className: "flex flex-col items-center max-w-4xl",
            children: [
              /* @__PURE__ */ jsxs64(
                motion79.div,
                {
                  variants: { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } },
                  className: "mb-8 flex items-center gap-3 px-4 py-2",
                  style: {
                    border: `1px solid ${s.accent}30`,
                    background: `${s.accent}08`,
                    backdropFilter: "blur(8px)"
                  },
                  children: [
                    /* @__PURE__ */ jsx84("span", { className: "w-1.5 h-1.5 rounded-full animate-pulse", style: { background: s.accent, boxShadow: `0 0 8px ${s.accent}` } }),
                    /* @__PURE__ */ jsx84("span", { style: { fontFamily: "monospace", fontSize: "10px", color: s.ui, letterSpacing: "0.25em", opacity: 0.8 }, children: "ALL SYSTEMS OPERATIONAL \xB7 v4.1.0" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs64(
                motion79.h1,
                {
                  variants: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } } },
                  style: {
                    fontFamily: "monospace",
                    fontWeight: 900,
                    fontSize: "clamp(2.8rem, 8.5vw, 8rem)",
                    lineHeight: 0.9,
                    letterSpacing: "-0.04em",
                    color: "#ffffff",
                    textTransform: "uppercase",
                    marginBottom: "1rem"
                  },
                  children: [
                    "BUILT FOR",
                    /* @__PURE__ */ jsx84("br", {}),
                    /* @__PURE__ */ jsx84("span", { style: {
                      color: s.accent,
                      textShadow: `0 0 60px ${s.accent}80, 0 0 120px ${s.accent}30`
                    }, children: "THE STORM." })
                  ]
                }
              ),
              /* @__PURE__ */ jsx84(
                motion79.div,
                {
                  variants: { hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.7 } } },
                  className: "my-6 h-px w-16 origin-center",
                  style: { background: `linear-gradient(to right, transparent, ${s.accent}80, transparent)` }
                }
              ),
              /* @__PURE__ */ jsx84(
                motion79.p,
                {
                  variants: { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } },
                  style: {
                    fontFamily: "monospace",
                    fontSize: "13px",
                    lineHeight: 1.9,
                    color: "rgba(255,255,255,0.35)",
                    maxWidth: "420px",
                    marginBottom: "2.8rem",
                    letterSpacing: "0.04em"
                  },
                  children: "Distributed compute at planetary scale. Zero single points of failure. Engineered to run when everything else goes down."
                }
              ),
              /* @__PURE__ */ jsxs64(
                motion79.div,
                {
                  variants: { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } },
                  className: "flex items-center gap-4 flex-wrap justify-center",
                  children: [
                    /* @__PURE__ */ jsx84(
                      motion79.button,
                      {
                        whileHover: { scale: 1.04, boxShadow: `0 0 40px ${s.accent}55` },
                        whileTap: { scale: 0.96 },
                        style: {
                          fontFamily: "monospace",
                          fontSize: "11px",
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          padding: "15px 38px",
                          background: s.accent,
                          color: "#04060f",
                          border: "none",
                          cursor: "pointer",
                          fontWeight: 700,
                          boxShadow: `0 0 28px ${s.accent}40`,
                          transition: "box-shadow 0.3s"
                        },
                        children: "Deploy Now \u2192"
                      }
                    ),
                    /* @__PURE__ */ jsx84(
                      motion79.button,
                      {
                        whileHover: { scale: 1.04 },
                        whileTap: { scale: 0.96 },
                        style: {
                          fontFamily: "monospace",
                          fontSize: "11px",
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          padding: "14px 38px",
                          background: "transparent",
                          color: "rgba(255,255,255,0.4)",
                          border: "1px solid rgba(255,255,255,0.12)",
                          cursor: "pointer",
                          transition: "color 0.25s, border-color 0.25s"
                        },
                        onMouseEnter: (e) => {
                          e.currentTarget.style.color = s.ui;
                          e.currentTarget.style.borderColor = `${s.accent}50`;
                        },
                        onMouseLeave: (e) => {
                          e.currentTarget.style.color = "rgba(255,255,255,0.4)";
                          e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                        },
                        children: "Read the Docs"
                      }
                    )
                  ]
                }
              )
            ]
          }
        ) }),
        /* @__PURE__ */ jsxs64(
          motion79.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 1.1, duration: 0.9 },
            className: "relative z-10 flex items-end justify-between px-10 md:px-16 pb-9",
            children: [
              /* @__PURE__ */ jsx84("div", { className: "flex items-center gap-8", children: [
                { val: "99.999%", label: "Uptime" },
                { val: "<1ms", label: "P99 latency" },
                { val: "180+", label: "Regions" }
              ].map(({ val, label }, i) => /* @__PURE__ */ jsxs64(React61.Fragment, { children: [
                i > 0 && /* @__PURE__ */ jsx84("span", { className: "w-px h-5 bg-white/10" }),
                /* @__PURE__ */ jsxs64("div", { className: "flex flex-col gap-0.5", children: [
                  /* @__PURE__ */ jsx84("span", { style: { fontFamily: "monospace", fontSize: "16px", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em" }, children: val }),
                  /* @__PURE__ */ jsx84("span", { style: { fontFamily: "monospace", fontSize: "9px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.25em", textTransform: "uppercase" }, children: label })
                ] })
              ] }, label)) }),
              /* @__PURE__ */ jsxs64("div", { style: { fontFamily: "monospace", fontSize: "9px", color: "rgba(255,255,255,0.18)", letterSpacing: "0.18em", textAlign: "right" }, children: [
                /* @__PURE__ */ jsx84("div", { children: "MONSOON ENGINE" }),
                /* @__PURE__ */ jsxs64("div", { style: { color: s.accent, opacity: 0.45 }, children: [
                  "INTENSITY ",
                  Math.round(intensity * 100),
                  "% \xB7 WIND ",
                  windAngle,
                  "\xB0"
                ] })
              ] })
            ]
          }
        )
      ]
    }
  );
};

// src/components/WormHoleVortex/WormHoleVortex.tsx
import React62, { useRef as useRef33, useEffect as useEffect31, useCallback as useCallback11 } from "react";
import { motion as motion80 } from "framer-motion";
import { jsx as jsx85, jsxs as jsxs65 } from "react/jsx-runtime";
var RING_COLORS = {
  phosphor: { core: [80, 255, 120], r: [255, 80, 60], g: [80, 255, 120], b: [60, 120, 255], ui: "#50ff78" },
  plasma: { core: [160, 80, 255], r: [255, 60, 180], g: [80, 200, 255], b: [120, 60, 255], ui: "#a050ff" },
  infra: { core: [255, 100, 40], r: [255, 40, 40], g: [255, 180, 40], b: [40, 100, 255], ui: "#ff6428" },
  ice: { core: [80, 200, 255], r: [180, 80, 255], g: [80, 255, 220], b: [40, 160, 255], ui: "#50c8ff" }
};
function mulberry32(seed) {
  let s = seed;
  return () => {
    s |= 0;
    s = s + 1831565813 | 0;
    let t = Math.imul(s ^ s >>> 15, 1 | s);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
var WormHoleVortex = ({
  ringColor = "phosphor",
  tunnelSpeed = 1,
  ringCount = 24,
  glitchIntensity = 0.5,
  aberrationStrength = 8,
  children
}) => {
  const containerRef = useRef33(null);
  const canvasRef = useRef33(null);
  const offRef = useRef33(null);
  const rafRef = useRef33(void 0);
  const sizeRef = useRef33({ w: 0, h: 0, dpr: 1 });
  const zRef = useRef33(0);
  const glitchRef = useRef33({
    active: false,
    framesLeft: 0,
    tearY: 0,
    tearH: 0,
    rgbShift: 0,
    framesSince: 0
  });
  const mouseRef = useRef33({ nx: 0.5, ny: 0.5 });
  const smoothVP = useRef33({ x: 0, y: 0 });
  const lastMoveRef = useRef33(0);
  const frameRef = useRef33(0);
  const resizeCanvas = useCallback11(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const dpr = window.devicePixelRatio || 1;
    const w = container.clientWidth;
    const h = container.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);
    const off = document.createElement("canvas");
    off.width = w * dpr;
    off.height = h * dpr;
    const offCtx = off.getContext("2d");
    if (offCtx) offCtx.scale(dpr, dpr);
    offRef.current = off;
    sizeRef.current = { w, h, dpr };
  }, []);
  useEffect31(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    resizeCanvas();
    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resizeCanvas, 100);
    };
    window.addEventListener("resize", onResize);
    const col = RING_COLORS[ringColor];
    const [cr, cg, cb] = col.core;
    const DEPTH = 600;
    const RING_SEP = DEPTH / ringCount;
    const FOV = 420;
    const animate = () => {
      const { w, h } = sizeRef.current;
      const frame = ++frameRef.current;
      const g = glitchRef.current;
      const off = offRef.current;
      zRef.current = (zRef.current + tunnelSpeed * 1.2) % RING_SEP;
      smoothVP.current.x += ((mouseRef.current.nx - 0.5) * 80 - smoothVP.current.x) * 0.05;
      smoothVP.current.y += ((mouseRef.current.ny - 0.5) * 50 - smoothVP.current.y) * 0.05;
      const vpX = w / 2 + smoothVP.current.x;
      const vpY = h / 2 + smoothVP.current.y;
      g.framesSince++;
      const glitchInterval = Math.round(90 / (glitchIntensity + 0.01));
      if (!g.active && g.framesSince > glitchInterval && Math.random() < glitchIntensity * 0.4) {
        g.active = true;
        g.framesLeft = 2 + Math.floor(Math.random() * 5);
        g.tearY = Math.random() * h;
        g.tearH = 2 + Math.random() * 14;
        g.rgbShift = (Math.random() - 0.5) * aberrationStrength * 2;
        g.framesSince = 0;
      }
      if (g.active) {
        g.framesLeft--;
        if (g.framesLeft <= 0) g.active = false;
      }
      ctx.fillStyle = "rgba(0,0,2,1)";
      ctx.fillRect(0, 0, w, h);
      const target = off ? off.getContext("2d") : ctx;
      if (off) {
        target.fillStyle = "rgba(0,0,2,1)";
        target.fillRect(0, 0, w, h);
      }
      const totalRings = ringCount + 2;
      for (let ri = totalRings - 1; ri >= 0; ri--) {
        let z = ri * RING_SEP + zRef.current;
        if (z <= 0) continue;
        const depth01 = 1 - Math.min(1, z / DEPTH);
        const persp = FOV / (FOV + z);
        const baseR = Math.min(w, h) * 0.82;
        const screenR = baseR * persp;
        if (screenR < 1.5) continue;
        const rng = mulberry32(ri * 7919 + Math.floor(frame / 3) * (ri % 5));
        const jitter = glitchIntensity * 4;
        const alpha = Math.pow(depth01, 1.4) * 0.85 + 0.08;
        const doAberration = depth01 > 0.55 && aberrationStrength > 0;
        const abX = doAberration ? aberrationStrength * depth01 * 0.7 : 0;
        const drawRingPass = (ctx2, offX, r, g2, b, lineW, passAlpha) => {
          const cx = vpX + offX;
          const cy = vpY;
          const SEGS = 72;
          ctx2.beginPath();
          for (let si = 0; si <= SEGS; si++) {
            const angle = si / SEGS * Math.PI * 2;
            const rJit = screenR + (rng() - 0.5) * jitter * persp;
            const px = cx + Math.cos(angle) * rJit + offX * 0.3;
            const py = cy + Math.sin(angle) * rJit;
            si === 0 ? ctx2.moveTo(px, py) : ctx2.lineTo(px, py);
          }
          ctx2.closePath();
          ctx2.strokeStyle = `rgba(${r},${g2},${b},${passAlpha.toFixed(3)})`;
          ctx2.lineWidth = lineW;
          ctx2.stroke();
        };
        if (doAberration) {
          drawRingPass(target, -abX, col.r[0], col.r[1], col.r[2], Math.max(0.4, (1 - depth01) * 1.5 + 0.4), alpha * 0.75);
          drawRingPass(target, abX, col.b[0], col.b[1], col.b[2], Math.max(0.4, (1 - depth01) * 1.5 + 0.4), alpha * 0.75);
          drawRingPass(target, 0, col.g[0], col.g[1], col.g[2], Math.max(0.6, (1 - depth01) * 2 + 0.6), alpha);
        } else {
          drawRingPass(target, 0, cr, cg, cb, Math.max(0.5, (1 - depth01) * 2), alpha * 0.65);
        }
        if (depth01 > 0.7) {
          const grd = (off ? target : ctx).createRadialGradient(vpX, vpY, screenR * 0.85, vpX, vpY, screenR * 1.15);
          grd.addColorStop(0, `rgba(${cr},${cg},${cb},0)`);
          grd.addColorStop(0.5, `rgba(${cr},${cg},${cb},${(alpha * 0.12).toFixed(3)})`);
          grd.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
          target.fillStyle = grd;
          target.beginPath();
          target.arc(vpX, vpY, screenR * 1.15, 0, Math.PI * 2);
          target.fill();
        }
      }
      const tgrd = target.createRadialGradient(vpX, vpY, 0, vpX, vpY, Math.min(w, h) * 0.35);
      tgrd.addColorStop(0, `rgba(${cr},${cg},${cb},0.28)`);
      tgrd.addColorStop(0.3, `rgba(${cr},${cg},${cb},0.07)`);
      tgrd.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
      target.fillStyle = tgrd;
      target.fillRect(0, 0, w, h);
      if (off) {
        ctx.drawImage(off, 0, 0, w, h);
      }
      if (g.active) {
        const tearSrc = Math.max(0, g.tearY - g.tearH);
        try {
          const strip = ctx.getImageData(0, tearSrc, w, g.tearH);
          ctx.putImageData(strip, g.rgbShift * 3, g.tearY);
        } catch (_) {
        }
        const shiftAmt = aberrationStrength * glitchIntensity;
        if (shiftAmt > 1) {
          ctx.globalCompositeOperation = "screen";
          ctx.fillStyle = `rgba(${cr},0,0,0.08)`;
          ctx.fillRect(-shiftAmt, 0, w, h);
          ctx.fillStyle = `rgba(0,0,${cb},0.08)`;
          ctx.fillRect(shiftAmt, 0, w, h);
          ctx.globalCompositeOperation = "source-over";
        }
        const lineCount = Math.floor(glitchIntensity * 6);
        for (let li = 0; li < lineCount; li++) {
          const ly = Math.random() * h;
          const lh = 0.5 + Math.random() * 2;
          ctx.fillStyle = `rgba(${cr},${cg},${cb},${Math.random() * 0.35})`;
          ctx.fillRect(0, ly, w * (0.3 + Math.random() * 0.7), lh);
        }
      }
      if (glitchIntensity > 0.3 && Math.random() < glitchIntensity * 0.015) {
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${Math.random() * 0.06})`;
        ctx.fillRect(0, 0, w, h);
      }
      ctx.fillStyle = "rgba(0,0,0,0.18)";
      for (let sy = 0; sy < h; sy += 3) {
        ctx.fillRect(0, sy, w, 1);
      }
      const vig = ctx.createRadialGradient(w / 2, h / 2, h * 0.08, w / 2, h / 2, h * 0.82);
      vig.addColorStop(0, "rgba(0,0,2,0)");
      vig.addColorStop(0.6, "rgba(0,0,2,0.25)");
      vig.addColorStop(1, "rgba(0,0,2,0.88)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [ringColor, tunnelSpeed, ringCount, glitchIntensity, aberrationStrength, resizeCanvas]);
  const handleMouseMove = useCallback11((e) => {
    var _a;
    const now = performance.now();
    if (now - lastMoveRef.current < 16) return;
    lastMoveRef.current = now;
    const rect = (_a = containerRef.current) == null ? void 0 : _a.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = {
      nx: (e.clientX - rect.left) / rect.width,
      ny: (e.clientY - rect.top) / rect.height
    };
  }, []);
  const handleMouseLeave = useCallback11(() => {
    mouseRef.current = { nx: 0.5, ny: 0.5 };
  }, []);
  const ui = RING_COLORS[ringColor].ui;
  return /* @__PURE__ */ jsxs65(
    "div",
    {
      ref: containerRef,
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      className: "relative w-full min-h-screen overflow-hidden flex flex-col",
      style: { background: "#00000a" },
      children: [
        /* @__PURE__ */ jsx85("canvas", { ref: canvasRef, className: "absolute inset-0 z-0" }),
        /* @__PURE__ */ jsx85(
          "div",
          {
            className: "absolute inset-0 pointer-events-none z-[1]",
            style: {
              opacity: 0.055,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              mixBlendMode: "overlay"
            }
          }
        ),
        /* @__PURE__ */ jsxs65(
          motion80.nav,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: 0.6, delay: 0.3 },
            className: "relative z-10 flex items-center justify-between px-10 md:px-16 pt-9",
            children: [
              /* @__PURE__ */ jsxs65("div", { style: {
                fontFamily: "monospace",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.3em",
                color: ui,
                textTransform: "uppercase"
              }, children: [
                "VRX",
                /* @__PURE__ */ jsx85("span", { style: { opacity: 0.35 }, children: "::" }),
                "AI"
              ] }),
              /* @__PURE__ */ jsxs65("div", { className: "flex items-center gap-6", children: [
                ["Models", "API", "Research"].map((item) => /* @__PURE__ */ jsx85(
                  "button",
                  {
                    style: {
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "monospace",
                      fontSize: "10px",
                      letterSpacing: "0.18em",
                      color: "rgba(255,255,255,0.28)",
                      textTransform: "uppercase",
                      padding: 0,
                      transition: "color 0.2s"
                    },
                    onMouseEnter: (e) => e.currentTarget.style.color = ui,
                    onMouseLeave: (e) => e.currentTarget.style.color = "rgba(255,255,255,0.28)",
                    children: item
                  },
                  item
                )),
                /* @__PURE__ */ jsx85(
                  motion80.button,
                  {
                    whileHover: { scale: 1.05 },
                    whileTap: { scale: 0.95 },
                    style: {
                      fontFamily: "monospace",
                      fontSize: "10px",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      padding: "8px 20px",
                      background: "transparent",
                      border: `1px solid ${ui}44`,
                      color: ui,
                      cursor: "pointer",
                      transition: "border-color 0.2s, background 0.2s"
                    },
                    onMouseEnter: (e) => {
                      e.currentTarget.style.borderColor = ui;
                      e.currentTarget.style.background = `${ui}14`;
                    },
                    onMouseLeave: (e) => {
                      e.currentTarget.style.borderColor = `${ui}44`;
                      e.currentTarget.style.background = "transparent";
                    },
                    children: "Request Beta"
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsx85("div", { className: "relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6", children: children || /* @__PURE__ */ jsxs65(
          motion80.div,
          {
            initial: "hidden",
            animate: "visible",
            variants: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.14 } } },
            className: "flex flex-col items-center max-w-4xl",
            children: [
              /* @__PURE__ */ jsxs65(
                motion80.div,
                {
                  variants: { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } },
                  className: "mb-8 px-4 py-1.5 flex items-center gap-3",
                  style: {
                    border: `1px solid ${ui}28`,
                    background: `${ui}0a`,
                    backdropFilter: "blur(6px)",
                    fontFamily: "monospace"
                  },
                  children: [
                    /* @__PURE__ */ jsx85("span", { className: "w-1.5 h-1.5 rounded-full animate-pulse", style: { background: ui, boxShadow: `0 0 8px ${ui}` } }),
                    /* @__PURE__ */ jsx85("span", { style: { fontSize: "10px", color: ui, letterSpacing: "0.3em", opacity: 0.85, textTransform: "uppercase" }, children: "MODEL_VRX-4 \xB7 ONLINE" }),
                    /* @__PURE__ */ jsx85("span", { style: { fontSize: "10px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em" }, children: "\u03A9" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs65(
                motion80.h1,
                {
                  variants: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } } },
                  style: {
                    fontFamily: "monospace",
                    fontWeight: 900,
                    fontSize: "clamp(2.6rem,8vw,7.8rem)",
                    lineHeight: 0.88,
                    letterSpacing: "-0.04em",
                    color: "#ffffff",
                    textTransform: "uppercase",
                    marginBottom: "1.1rem"
                  },
                  children: [
                    "THINK",
                    /* @__PURE__ */ jsx85("br", {}),
                    "BEYOND",
                    /* @__PURE__ */ jsx85("br", {}),
                    /* @__PURE__ */ jsx85("span", { style: {
                      color: ui,
                      textShadow: `0 0 40px ${ui}90, 0 0 80px ${ui}30`
                    }, children: "HUMAN." })
                  ]
                }
              ),
              /* @__PURE__ */ jsx85(
                motion80.div,
                {
                  variants: { hidden: { scaleX: 0, opacity: 0 }, visible: { scaleX: 1, opacity: 1, transition: { duration: 0.6 } } },
                  className: "my-5 h-px w-12 origin-center",
                  style: { background: `linear-gradient(to right, transparent, ${ui}80, transparent)` }
                }
              ),
              /* @__PURE__ */ jsx85(
                motion80.p,
                {
                  variants: { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } },
                  style: {
                    fontFamily: "monospace",
                    fontSize: "12px",
                    lineHeight: 1.95,
                    color: "rgba(255,255,255,0.32)",
                    maxWidth: "380px",
                    marginBottom: "2.8rem",
                    letterSpacing: "0.05em"
                  },
                  children: "Frontier models trained on structured reasoning chains. Not a wrapper. Not fine-tuned. Built from first principles at scale."
                }
              ),
              /* @__PURE__ */ jsxs65(
                motion80.div,
                {
                  variants: { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } },
                  className: "flex items-center gap-4 flex-wrap justify-center",
                  children: [
                    /* @__PURE__ */ jsx85(
                      motion80.button,
                      {
                        whileHover: { scale: 1.04, boxShadow: `0 0 40px ${ui}55` },
                        whileTap: { scale: 0.96 },
                        style: {
                          fontFamily: "monospace",
                          fontSize: "11px",
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          padding: "15px 38px",
                          background: ui,
                          color: "#00000a",
                          border: "none",
                          cursor: "pointer",
                          fontWeight: 700,
                          boxShadow: `0 0 24px ${ui}40`,
                          transition: "box-shadow 0.3s"
                        },
                        children: "Access API \u2192"
                      }
                    ),
                    /* @__PURE__ */ jsx85(
                      motion80.button,
                      {
                        whileHover: { scale: 1.04 },
                        whileTap: { scale: 0.96 },
                        style: {
                          fontFamily: "monospace",
                          fontSize: "11px",
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          padding: "14px 38px",
                          background: "transparent",
                          color: "rgba(255,255,255,0.38)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          cursor: "pointer",
                          transition: "color 0.2s, border-color 0.2s"
                        },
                        onMouseEnter: (e) => {
                          e.currentTarget.style.color = ui;
                          e.currentTarget.style.borderColor = `${ui}44`;
                        },
                        onMouseLeave: (e) => {
                          e.currentTarget.style.color = "rgba(255,255,255,0.38)";
                          e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                        },
                        children: "Read Research"
                      }
                    )
                  ]
                }
              )
            ]
          }
        ) }),
        /* @__PURE__ */ jsxs65(
          motion80.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 1, duration: 0.8 },
            className: "relative z-10 flex items-end justify-between px-10 md:px-16 pb-9",
            children: [
              /* @__PURE__ */ jsx85("div", { className: "flex items-center gap-8", children: [
                { val: "1.8T", label: "Parameters" },
                { val: "128k", label: "Context" },
                { val: "#1", label: "MMLU / MATH" }
              ].map(({ val, label }, i) => /* @__PURE__ */ jsxs65(React62.Fragment, { children: [
                i > 0 && /* @__PURE__ */ jsx85("span", { className: "w-px h-5 bg-white/10" }),
                /* @__PURE__ */ jsxs65("div", { className: "flex flex-col gap-0.5", children: [
                  /* @__PURE__ */ jsx85("span", { style: { fontFamily: "monospace", fontSize: "16px", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em" }, children: val }),
                  /* @__PURE__ */ jsx85("span", { style: { fontFamily: "monospace", fontSize: "9px", color: "rgba(255,255,255,0.22)", letterSpacing: "0.25em", textTransform: "uppercase" }, children: label })
                ] })
              ] }, label)) }),
              /* @__PURE__ */ jsxs65("div", { style: { fontFamily: "monospace", fontSize: "9px", color: "rgba(255,255,255,0.16)", letterSpacing: "0.18em", textAlign: "right" }, children: [
                /* @__PURE__ */ jsx85("div", { children: "VORTEX ENGINE" }),
                /* @__PURE__ */ jsxs65("div", { style: { color: ui, opacity: 0.4 }, children: [
                  ringCount,
                  " RINGS \xB7 GLITCH ",
                  Math.round(glitchIntensity * 100),
                  "%"
                ] })
              ] })
            ]
          }
        )
      ]
    }
  );
};
export {
  AcidBath,
  Arc,
  AuroraBeam,
  BlackHoleCursor,
  BorderGlowButton,
  BounceText,
  BouncingBarLoader,
  ChasingDotsLoader,
  DNALoader,
  DepthField,
  DotMatrix,
  Dune,
  EmojiCursor,
  ExpandButton,
  ExpandCard,
  FlipCard,
  FlipCardLoader,
  FlipText,
  GlassCard,
  GlitchLoader,
  GlitchText,
  GlowPulseButton,
  GradientText,
  GradientWaves,
  GravityCursor,
  GridLoader,
  Halo,
  HolographicCard,
  InfinityLoader,
  InkCursor,
  LiquidCard,
  LiquidFillButton,
  LiquidText,
  MagneticButton,
  MagneticCard,
  MagneticCursor,
  MagneticText,
  MatrixRainBackground,
  MatrixText,
  MeshGradientBackground,
  Monsoon,
  MorphCard,
  MorphLoader,
  NeonCard,
  NeonText,
  NeuralFabric,
  OrbitLoader,
  ParticleButton,
  ParticleCard,
  ParticleConstellationBackground,
  ParticleRingLoader,
  PortalCard,
  PressButton,
  ProgressLoader,
  PulseLoader,
  PulseText,
  RingLoader,
  RippleButton,
  RippleCard,
  RippleCursor,
  ScatterAssemble,
  ScrambleText,
  ShatterCard,
  ShatterText,
  ShimmerButton,
  Silk,
  SkeletonLoader,
  SpiralLoader,
  SplitRevealButton,
  SplitText,
  SpotlightCard,
  SpotlightCursor,
  SpotlightText,
  StackCard,
  StringCursor,
  TiltCard,
  TrailCursor,
  TypewriterLoader,
  TypewriterText,
  VortexBackground,
  WaveLoader,
  WaveText,
  WebCursor,
  WormHoleVortex
};
