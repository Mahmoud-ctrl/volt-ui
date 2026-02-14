<div align="center">
  
  # ⚡ Volt UI
  
  **100+ stunning React animation components for modern web experiences**
  
  [![npm version](https://img.shields.io/npm/v/@volt-ui/react.svg?style=flat-square)](https://www.npmjs.com/package/@volt-ui/react)
  [![npm downloads](https://img.shields.io/npm/dm/@volt-ui/react.svg?style=flat-square)](https://www.npmjs.com/package/@volt-ui/react)
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
  
  [Documentation](https://volt-ui-two.vercel.app/components?docs=true) • [Components](https://volt-ui-two.vercel.app/components) • [npm](https://www.npmjs.com/package/@volt-ui/react)
</div>

---

## 🚀 What is Volt UI?

Volt UI is a modern React component library built for developers who want stunning animations without the hassle. Born from countless hours of experimentation, Volt UI brings together the best of Framer Motion, GSAP, and Three.js into one cohesive package.

**100+ production-ready components** including:
- 🎨 **16 Text Animations** - Wave, Glitch, Typewriter, Matrix, and more
- 🔘 **10 Button Animations** - Magnetic, Ripple, Liquid Fill, Shimmer
- 🃏 **15 Card Effects** - Tilt, Glass, Holographic, Flip, Portal
- 🖱️ **10 Cursor Effects** - Trail, Magnetic, Ripple, Spotlight, Gravity
- ⏳ **17 Loaders** - Pulse, Orbit, DNA, Morph, Infinity
- 🌌 **16 Background Effects** - Aurora, Mesh Gradient, Neural Fabric, Vortex

---

## ✨ Quick Start

### Installation
```bash
npm install @volt-ui/react
# or
yarn add @volt-ui/react
# or
pnpm add @volt-ui/react
```

### Peer Dependencies
```bash
npm install react react-dom framer-motion gsap three @react-three/fiber @react-three/drei
```

### Basic Usage
```tsx
import { WaveText, MagneticButton, SpotlightCard } from '@volt-ui/react';

export default function App() {
  return (
    <div>
      <WaveText text="Hello Volt UI" />
      
      <MagneticButton onClick={() => alert('Clicked!')}>
        Click Me
      </MagneticButton>
      
      <SpotlightCard>
        <h2>Amazing Card</h2>
        <p>With spotlight effect!</p>
      </SpotlightCard>
    </div>
  );
}
```

---

## 📚 Documentation

Visit our [interactive documentation](https://volt-ui-two.vercel.app/components?docs=true) to:
- 👀 Preview all 100+ components live
- 🎛️ Customize props in real-time
- 📋 Copy ready-to-use code snippets
- 📖 View full source code

---

## 🎯 Features

- ⚡ **100+ Components** - Text, buttons, cards, cursors, loaders, backgrounds
- 🎨 **Fully Customizable** - Every component comes with extensive props
- 📱 **Responsive** - Works seamlessly on all screen sizes
- 🎭 **Smooth Animations** - Built with Framer Motion, GSAP, and Three.js
- 🔧 **TypeScript Ready** - Full type definitions included
- 🪶 **Tree-shakable** - Import only what you need
- 🎁 **Free Forever** - MIT licensed, no paywalls, no limits

---

## 📦 Component Categories

### Text Animations
```tsx
import { 
  WaveText, GlitchText, TypewriterText, ShatterText,
  NeonText, SplitText, MatrixText, BounceText,
  FlipText, GradientText, ScrambleText, PulseText,
  ScatterAssemble, SpotlightText, LiquidText, MagneticText
} from '@volt-ui/react';
```

### Button Animations
```tsx
import {
  RippleButton, MagneticButton, LiquidFillButton,
  ShimmerButton, GlowPulseButton, PressButton,
  SplitRevealButton, ParticleButton, BorderGlowButton,
  ExpandButton
} from '@volt-ui/react';
```

### Card Effects
```tsx
import {
  TiltCard, GlassCard, HolographicCard, FlipCard,
  ParticleCard, SpotlightCard, MorphCard, ExpandCard,
  NeonCard, StackCard, LiquidCard, ShatterCard,
  PortalCard, MagneticCard, RippleCard
} from '@volt-ui/react';
```

### Cursor Effects
```tsx
import {
  TrailCursor, MagneticCursor, RippleCursor,
  SpotlightCursor, EmojiCursor, StringCursor,
  WebCursor, GravityCursor, InkCursor, BlackHoleCursor
} from '@volt-ui/react';
```

### Loaders
```tsx
import {
  PulseLoader, OrbitLoader, MorphLoader, DNALoader,
  ProgressLoader, RingLoader, SkeletonLoader, WaveLoader,
  GridLoader, ChasingDotsLoader, InfinityLoader,
  TypewriterLoader, ParticleRingLoader, BouncingBarLoader,
  GlitchLoader, SpiralLoader, FlipCardLoader
} from '@volt-ui/react';
```

### Background Effects
```tsx
import {
  GradientWaves, DotMatrix, AuroraBeam,
  ParticleConstellationBackground, MeshGradientBackground,
  MatrixRainBackground, VortexBackground, NeuralFabric,
  DepthField, AcidBath, Silk, Halo, Arc, Dune,
  Monsoon, WormHoleVortex
} from '@volt-ui/react';
```

---

## 🌟 Example Projects
```tsx
// Landing Page Hero
import { WaveText, ParticleConstellationBackground } from '@volt-ui/react';

export default function Hero() {
  return (
    <div className="relative h-screen">
      <ParticleConstellationBackground />
      <div className="absolute inset-0 flex items-center justify-center">
        <WaveText 
          text="Welcome to the Future" 
          fontSize={72}
          waveSpeed={2}
        />
      </div>
    </div>
  );
}
```
```tsx
// Animated Dashboard Card
import { SpotlightCard, TypewriterText } from '@volt-ui/react';

export default function DashboardCard() {
  return (
    <SpotlightCard className="p-8">
      <TypewriterText 
        text="Your stats are looking good!"
        speed={50}
      />
      <p className="mt-4">Revenue: $12,345</p>
    </SpotlightCard>
  );
}
```

---

## 🛠️ Requirements

- React 18.0.0 or higher
- React DOM 18.0.0 or higher
- Framer Motion 12.0.0 or higher
- GSAP 3.0.0 or higher
- Three.js (for 3D components)
- Tailwind CSS (optional, for some components)

---

## 💚 Free & Open Source

Volt UI is **completely free**. No paywalls, no "pro" tiers, no credit card required. Use it in your side projects, your startup, or your Fortune 500 company - we don't care. It's yours.

**Why?** Because we've been there. We've paid $300 for component libraries we used twice. We've dealt with licensing headaches. We've rage-quit after hitting feature limits.

**Our promise:** Volt UI will always be free, MIT licensed, and available to everyone. No strings attached. No rug pulls. Just good components.

If Volt UI helps you ship faster, consider:
- ⭐ [Starring us on GitHub](https://github.com/Mahmoud-ctrl/volt-ui)
- 🐦 Sharing on Twitter (coming soon!)
- 📝 Writing about your experience

---

## 🤝 Contributing

We welcome contributions! Whether it's:
- 🐛 Bug reports
- 💡 Feature requests
- 📝 Documentation improvements
- 🎨 New components

See our [Contributing Guide](CONTRIBUTING.md) to get started.

---

## 📄 License

MIT © [Mahmoud](https://github.com/Mahmoud-ctrl)

---

## 🔗 Links

- [Documentation](https://volt-ui-two.vercel.app/components?docs=true)
- [Component Gallery](https://volt-ui-two.vercel.app/components)
- [npm Package](https://www.npmjs.com/package/@volt-ui/react)
- [GitHub Repository](https://github.com/Mahmoud-ctrl/volt-ui)
- [Report Issues](https://github.com/Mahmoud-ctrl/volt-ui/issues)

---

<div align="center">
  <p>Made with ⚡ by <a href="https://github.com/Mahmoud-ctrl">Mahmoud</a></p>
  <p>
    <a href="https://volt-ui-two.vercel.app">Website</a> •
    <a href="https://www.npmjs.com/package/@volt-ui/react">npm</a> •
    <a href="https://github.com/Mahmoud-ctrl/volt-ui">GitHub</a>
  </p>
</div>