// Text Animations
import { WaveText } from '@/components/WaveText/WaveText';
import { GlitchText } from '@/components/GlitchText/GlitchText';
import { TypewriterText } from '@/components/TypewriterText/TypewriterText';
import { ShatterText } from '@/components/ShatterText/ShatterText';
import { NeonText } from '@/components/NeonText/NeonText';
import { SplitText } from '@/components/SplitText/SplitText';
import { MatrixText } from '@/components/MatrixText/MatrixText';
import { BounceText } from '@/components/BounceText/BounceText';
import { FlipText } from '@/components/FlipText/FlipText';
import { GradientText } from '@/components/GradientText';
import { ScrambleText } from '@/components/ScrambleText/ScrambleText';
import { PulseText } from '@/components/PulseText/PulseText';
import { ScatterAssemble } from '@/components/ScatterAssemble/ScatterAssemble';
import { SpotlightText } from '@/components/SpotlightText/SpotlightText';
import { LiquidText } from '@/components/LiquidText/LiquidText';
import { MagneticText } from '@/components/MagneticLetter/MagneticLetter';

// Button Animations
import { RippleButton } from '@/components/RippleButton/RippleButton';
import { MagneticButton } from '@/components/MagneticButton/MagneticButton';
import { LiquidFillButton } from '@/components/LiquidFillButton/LiquidFillButton';
import { ShimmerButton } from '@/components/ShimmerButton/ShimmerButton';
import { GlowPulseButton } from '@/components/GlowPulseButton/GlowPulseButton';
import { PressButton } from '@/components/3DPressButton/3DPressButton';
import { SplitRevealButton } from '@/components/SplitRevealButton/SplitRevealButton';
import { ParticleButton } from '@/components/ParticleButton/ParticleButton';
import { BorderGlowButton } from '@/components/BorderGlowButton/BorderGlowButton';
import { ExpandButton } from '@/components/ExpandButton/ExpandButton';

// Card Animations
import { TiltCard } from '@/components/TiltCard/TitlCard';
import { GlassCard } from '@/components/GlassCard/GlassCard';
import { HolographicCard } from '@/components/HolographicCard/HolographicCard';
import { FlipCard } from '@/components/FlipCard/FlipCard';
import { ParticleCard } from '@/components/ParticleCard/ParticleCard';
import { SpotlightCard } from '@/components/SpotlightCard';
import { MorphCard } from '@/components/MorphCard';
import { ExpandCard } from '@/components/ExpandCard';
import { NeonCard } from '@/components/NeonCard';
import { StackCard } from '@/components/StackCard';
import { LiquidCard } from '@/components/LiquidCard';
import { ShatterCard } from '@/components/ShatterCard';
import { PortalCard } from '@/components/PortalCard';
import { MagneticCard } from '@/components/MagneticCard';
import { RippleCard } from '@/components/RippleCard';

// Cursor Animations
import { TrailCursor } from '@/components/TrailCursor/TrailCursor';
import { MagneticCursor } from '@/components/MagneticCursor/MagneticCursor';
import { RippleCursor } from '@/components/RippleCursor/RippleCursor';
import { SpotlightCursor } from '@/components/SpotlightCursor/SpotlightCursor';
import { EmojiCursor } from '@/components/EmojiCursor/EmojiCursor';
import { StringCursor } from '@/components/StringCursor/StringCursor';
import { WebCursor } from '@/components/WebCursor/WebCursor';
import { GravityCursor } from '@/components/GravityCursor/GravityCursor';
import { InkCursor } from '@/components/InkCursor/InkCursor';
import { BlackHoleCursor } from '@/components/BlackHoleCursor/BlackHoleCursor';

// Loaders
import { PulseLoader } from '@/components/PulseLoader/PulseLoader';
import { OrbitLoader } from '@/components/OrbitLoader/OrbitLoader';
import { MorphLoader } from '@/components/MorphLoader/MorphLoader';
import { DNALoader } from '@/components/DNALoader/DNALoader';
import { ProgressLoader } from '@/components/ProgressLoader/ProgressLoader';
import { RingLoader } from '@/components/RingLoader/RingLoader';
import { SkeletonLoader } from '@/components/SkeletonLoader/SkeletonLoader';
import { WaveLoader } from '@/components/WaveLoader/WaveLoader';
import { GridLoader } from '@/components/GridLoader/GridLoader';
import { ChasingDotsLoader } from '@/components/ChasingDotsLoader/ChasingDotsLoader';
import { InfinityLoader } from '@/components/InfinityLoader/InfinityLoader';
import { TypewriterLoader } from '@/components/TypewriterLoader/TypewriterLoader';
import { ParticleRingLoader } from '@/components/ParticleRingLoader/ParticleRingLoader';
import { BouncingBarLoader } from '@/components/BouncingBarLoader/BouncingBarLoader';
import { GlitchLoader } from '@/components/GlitchLoader/GlitchLoader';
import { SpiralLoader } from '@/components/SpiralLoader/SpiralLoader';
import { FlipCardLoader } from '@/components/FlipCardLoader/FlipCardLoader';

// Background Effects
import { GradientWaves } from '@/components/GradientWaves/GradientWaves';
import { DotMatrix } from '@/components/DotMatrix/DotMatrix';
import { AuroraBeam } from '@/components/AuroraBeam/AuroraBeam';
import { ParticleConstellationBackground } from '@/components/ParticleConstellationBackground/ParticleConstellationBackground';
import { MeshGradientBackground } from '@/components/MeshGradientBackground/MeshGradientBackground';
import { MatrixRainBackground } from '@/components/MatrixRainBackground/MatrixRainBackground';
import { VortexBackground } from '@/components/VortexBackground';
import { NeuralFabric } from '@/components/NeuralFabric/NeuralFabric';
import { DepthField } from '@/components/DepthField/DepthField';
import { AcidBath } from '@/components/AcidBath/AcidBath';
import { Silk } from '@/components/Silk/Silk';
import { Halo } from '@/components/Halo/Halo';
import { Arc } from '@/components/Arc/Arc';
import { Dune } from '@/components/Dune/Dune';
import { Monsoon } from '@/components/Monsoon/Monsoon';
import { WormHoleVortex } from '@/components/WormHoleVortex/WormHoleVortex';

export const componentRegistry: Record<string, React.ComponentType<any>> = {
  // Text Animations
  WaveText,
  GlitchText,
  TypewriterText,
  ShatterText,
  NeonText,
  SplitText,
  MatrixText,
  BounceText,
  FlipText,
  GradientText,
  ScrambleText,
  PulseText,
  ScatterAssemble,
  SpotlightText,
  LiquidText,
  MagneticText,

  // Button Animations
  RippleButton,
  MagneticButton,
  LiquidFillButton,
  ShimmerButton,
  GlowPulseButton,
  PressButton,
  SplitRevealButton,
  ParticleButton,
  BorderGlowButton,
  ExpandButton,

  // Card Animations
  TiltCard,
  GlassCard,
  HolographicCard,
  FlipCard,
  ParticleCard,
  SpotlightCard,
  MorphCard,
  ExpandCard,
  NeonCard,
  StackCard,
  LiquidCard,
  ShatterCard,
  PortalCard,
  MagneticCard,
  RippleCard,

  // Cursor Animations
  TrailCursor,
  MagneticCursor,
  RippleCursor,
  SpotlightCursor,
  EmojiCursor,
  StringCursor,
  WebCursor,
  GravityCursor,
  InkCursor,
  BlackHoleCursor,

  // Loaders
  PulseLoader,
  OrbitLoader,
  MorphLoader,
  DNALoader,
  ProgressLoader,
  RingLoader,
  SkeletonLoader,
  WaveLoader,
  GridLoader,
  ChasingDotsLoader,
  InfinityLoader,
  TypewriterLoader,
  ParticleRingLoader,
  BouncingBarLoader,
  GlitchLoader,
  SpiralLoader,
  FlipCardLoader,

  // Background Effects
  GradientWaves,
  DotMatrix,
  AuroraBeam,
  ParticleConstellationBackground,
  MeshGradientBackground,
  MatrixRainBackground,
  VortexBackground,
  NeuralFabric,
  DepthField,
  AcidBath,
  Silk,
  Halo,
  Arc,
  Dune,
  Monsoon,
  WormHoleVortex,
};