import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/components/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  external: ['react', 'react-dom', 'framer-motion', 'gsap', 'three'],
  clean: true,
});