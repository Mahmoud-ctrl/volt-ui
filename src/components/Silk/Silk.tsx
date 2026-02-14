"use client";
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

export interface SilkProps {
  colorTemp?: "pearl" | "dusk" | "frost" | "ember";
  warpIntensity?: number;
  driftSpeed?: number;
  children?: React.ReactNode;
}

const PALETTES = {
  pearl: [[0.03, 0.03, 0.04], [0.11, 0.09, 0.12], [0.28, 0.25, 0.31], [0.71, 0.66, 0.73], [0.96, 0.93, 0.98]],
  dusk:  [[0.03, 0.02, 0.04], [0.12, 0.07, 0.11], [0.31, 0.20, 0.29], [0.75, 0.55, 0.67], [0.98, 0.86, 0.94]],
  frost: [[0.02, 0.03, 0.04], [0.07, 0.10, 0.13], [0.20, 0.28, 0.35], [0.55, 0.69, 0.82], [0.86, 0.93, 1.00]],
  ember: [[0.04, 0.03, 0.02], [0.13, 0.09, 0.05], [0.33, 0.24, 0.15], [0.76, 0.61, 0.43], [0.99, 0.91, 0.78]],
};

const VERT_SRC = `
  attribute vec2 position; 
  void main() { 
    gl_Position = vec4(position, 0.0, 1.0); 
  }
`;

const FRAG_SRC = `
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

export const Silk: React.FC<SilkProps> = ({
  colorTemp = "pearl",
  warpIntensity = 3.5,
  driftSpeed = 0.15,
  children,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const createShader = (gl: WebGLRenderingContext, type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(s));
      }
      return s;
    };

    const program = gl.createProgram()!;
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
      const dpr = Math.min(window.devicePixelRatio, 2); // Cap DPR for performance
      canvas.width = container.clientWidth * dpr;
      canvas.height = container.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener("resize", resize);
    resize();

    let raf: number;
    const render = (time: number) => {
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, time * 0.001 * driftSpeed);
      gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
      gl.uniform1f(uWarp, warpIntensity);
      
      const colors = new Float32Array(PALETTES[colorTemp].flat());
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

  return (
    <div 
      ref={containerRef} 
      className="relative w-full min-h-screen overflow-hidden bg-[#06040a]"
      onMouseMove={(e) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          mouseRef.current = { 
            x: (e.clientX - rect.left) / rect.width, 
            y: 1.0 - (e.clientY - rect.top) / rect.height 
          };
        }
      }}
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none" 
        style={{ zIndex: 0 }}
      />
      
      <div className="relative z-10 flex flex-col min-h-screen pointer-events-none">
        <nav className="flex items-center justify-between px-10 md:px-16 pt-10 pointer-events-auto">
          <div style={{ fontFamily: "serif", letterSpacing: "0.35em", color: accentHex }} className="uppercase text-sm">Maison Veil</div>
          <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] text-white/30 cursor-pointer">
            <span className="hover:text-white transition-colors">Atelier</span>
            <span className="hover:text-white transition-colors">Collection</span>
            <span className="hover:text-white transition-colors">Monde</span>
          </div>
        </nav>

        <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }}>
            <span className="text-[10px] tracking-[0.5em] text-white/50 uppercase block mb-8">Printemps / Été 2026</span>
            <h1 className="text-7xl md:text-9xl font-serif italic text-white leading-none tracking-tight">The Weight</h1>
            <h1 className="text-7xl md:text-9xl font-serif text-transparent mb-12" style={{ WebkitTextStroke: `1px ${accentHex}` }}>OF LIGHT</h1>
            <p className="text-sm font-serif italic text-white/40 max-w-xs mx-auto mb-12">Garments conceived at the edge of visibility.</p>
            <button className="px-10 py-4 text-[10px] tracking-[0.3em] uppercase transition-all hover:brightness-110 pointer-events-auto" style={{ backgroundColor: accentHex, color: '#000' }}>
              Explore Collection
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};