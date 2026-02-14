# Converting to NPM Package: aura-ui

## 📦 Recommended Approach: Two Packages

### Package 1: `aura-ui` (Components Library)
The actual components users will install and use.

### Package 2: `aura-ui-docs` (Documentation Site)
Your dashboard showcase (can be a separate Next.js app deployed to Vercel).

---

## 🏗️ Structure for `aura-ui` Package

```
aura-ui/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts              # Main export file
│   ├── components/
│   │   ├── WaveText/
│   │   │   ├── WaveText.tsx
│   │   │   └── index.ts
│   │   ├── GlitchText/
│   │   │   ├── GlitchText.tsx
│   │   │   └── index.ts
│   │   └── index.ts          # Export all components
│   └── types/
│       └── index.ts
├── dist/                     # Built files (generated)
└── README.md
```

### package.json
```json
{
  "name": "aura-ui",
  "version": "1.0.0",
  "description": "Beautiful text animation components for React",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts",
    "dev": "tsup src/index.ts --format cjs,esm --dts --watch",
    "prepublishOnly": "npm run build"
  },
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "framer-motion": "^10.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "framer-motion": "^10.16.0",
    "tsup": "^8.0.0",
    "typescript": "^5.0.0"
  },
  "keywords": [
    "react",
    "animation",
    "text",
    "components",
    "framer-motion",
    "ui"
  ],
  "author": "Your Name",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/aura-ui"
  }
}
```

### src/index.ts (Main export)
```typescript
// Export all components
export { WaveText } from './components/WaveText';
export { GlitchText } from './components/GlitchText';

// Export types
export type { WaveTextProps } from './components/WaveText';
export type { GlitchTextProps } from './components/GlitchText';
```

### src/components/WaveText/index.ts
```typescript
export { WaveText } from './WaveText';
export type { WaveTextProps } from './WaveText';
```

### src/components/WaveText/WaveText.tsx
```typescript
"use client"; // Keep for Next.js compatibility

import React from 'react';
import { motion } from 'framer-motion';

export interface WaveTextProps {
  text: string;
  delay?: number;
  duration?: number;
  amplitude?: number;
  className?: string;
}

export const WaveText: React.FC<WaveTextProps> = ({
  text,
  delay = 0.05,
  duration = 0.6,
  amplitude = 20,
  className = "",
}) => {
  // ... rest of component
};
```

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM"],
    "jsx": "react-jsx",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "removeComments": true,
    "strict": true,
    "moduleResolution": "bundler",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

---

## 🚀 Building & Publishing

### 1. Install build tools
```bash
npm install -D tsup typescript @types/react
```

### 2. Build the package
```bash
npm run build
```

This creates:
- `dist/index.js` - CommonJS format
- `dist/index.mjs` - ES Module format
- `dist/index.d.ts` - TypeScript definitions

### 3. Test locally before publishing
```bash
npm link
```

In your test project:
```bash
npm link aura-ui
```

### 4. Publish to NPM
```bash
npm login
npm publish
```

---

## 🏗️ Structure for `aura-ui-docs` (Your Dashboard)

This is just your current Next.js app!

```
aura-ui-docs/
├── app/
│   └── page.tsx              # Your DashboardLayout
├── components/               # Import from 'aura-ui' package
├── config/
│   ├── text-animations.json
│   └── ...
└── package.json
```

### package.json
```json
{
  "name": "aura-ui-docs",
  "dependencies": {
    "aura-ui": "^1.0.0",        // Your published package!
    "next": "14.0.0",
    "react": "^18.2.0",
    "framer-motion": "^10.16.0"
  }
}
```

Deploy to Vercel: `docs.aura-ui.com`

---

## 📝 User Experience

### For end users:
```bash
npm install aura-ui framer-motion
```

```tsx
import { WaveText, GlitchText } from 'aura-ui';

export default function Page() {
  return (
    <div>
      <WaveText text="Hello World" delay={0.05} />
      <GlitchText text="GLITCH" intensity={10} />
    </div>
  );
}
```

### For documentation:
Visit `docs.aura-ui.com` to see interactive demos!

---

## ⚠️ Important Considerations

### 1. Tailwind CSS
Your components use Tailwind classes. Users need to:

**Option A:** Include Tailwind in their project
```js
// tailwind.config.js
module.exports = {
  content: [
    './node_modules/aura-ui/**/*.{js,ts,jsx,tsx}', // Add this
  ],
}
```

**Option B:** Use inline styles (more portable but less flexible)
```tsx
<motion.div style={{ fontSize: '3.75rem', fontWeight: 900 }}>
```

**Option C:** Ship compiled CSS (adds bundle size)

### 2. "use client" Directive
Keep it! It ensures Next.js App Router compatibility.

### 3. Peer Dependencies
Don't bundle React or Framer Motion. List as `peerDependencies`.

### 4. Tree-shaking
Use named exports so users only import what they need:
```tsx
import { WaveText } from 'aura-ui'; // Only WaveText is bundled
```

---

## 🎯 Recommended Workflow

### Phase 1: Prepare Components
1. Restructure components for NPM package
2. Add proper TypeScript exports
3. Test with `npm link`

### Phase 2: Publish Components
1. Create GitHub repo for `aura-ui`
2. Publish to NPM
3. Create release tags

### Phase 3: Deploy Docs
1. Keep your dashboard as separate Next.js app
2. Import from published `aura-ui` package
3. Deploy to Vercel

### Phase 4: Maintain
1. Components → update NPM package version
2. Docs → redeploy Next.js app

---

## 📊 Package Size Considerations

### Minimal package (just components):
```
aura-ui/
├── WaveText.tsx      (~2KB)
├── GlitchText.tsx    (~3KB)
└── index.ts          (~1KB)
Total: ~6KB (+ Framer Motion peer dep)
```

### With dashboard included:
```
Would be ~500KB+ (includes all JSON, controls, Next.js dependencies)
```

**Verdict:** Keep them separate! 

---

## 🔗 Alternative: Monorepo

Use turborepo/pnpm workspaces:
```
aura-ui-monorepo/
├── packages/
│   ├── aura-ui/           # NPM package
│   └── docs/              # Next.js docs site
└── package.json
```

Both share the same repo but publish separately.

---

## ✅ TL;DR

**Best approach:**
1. **Package**: Extract components only → publish to NPM as `aura-ui`
2. **Docs**: Keep dashboard as separate Next.js app → deploy to Vercel
3. **Import**: Docs site imports from published `aura-ui` package

Want me to restructure your files for NPM publishing?

✅ Text Animations
✅ Button Animations  
✅ Card Effects
✅ Cursor Effects
⏳ Loaders        ← next
⏳ Background Effects
⏳ Scroll Animations