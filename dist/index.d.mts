import React from 'react';

interface WaveTextProps {
    text: string;
    delay?: number;
    duration?: number;
    amplitude?: number;
    className?: string;
}
declare const WaveText: React.FC<WaveTextProps>;

interface GlitchTextProps {
    text: string;
    intensity?: number;
    speed?: number;
    colors?: boolean;
    className?: string;
}
declare const GlitchText: React.FC<GlitchTextProps>;

interface TypewriterTextProps {
    text: string;
    speed?: number;
    showCursor?: boolean;
    loop?: boolean;
    className?: string;
}
declare const TypewriterText: React.FC<TypewriterTextProps>;

interface ShatterTextProps {
    text: string;
    explosive?: boolean;
    speed?: number;
    scatter?: number;
    className?: string;
}
declare const ShatterText: React.FC<ShatterTextProps>;

interface NeonTextProps {
    text: string;
    color?: string;
    flicker?: boolean;
    glow?: number;
    className?: string;
}
declare const NeonText: React.FC<NeonTextProps>;

interface SplitTextProps {
    text: string;
    direction?: 'horizontal' | 'vertical';
    distance?: number;
    speed?: number;
    className?: string;
}
declare const SplitText: React.FC<SplitTextProps>;

interface MatrixTextProps {
    text: string;
    speed?: number;
    color?: string;
    className?: string;
}
declare const MatrixText: React.FC<MatrixTextProps>;

interface BounceTextProps {
    text: string;
    height?: number;
    stagger?: number;
    elasticity?: number;
    className?: string;
}
declare const BounceText: React.FC<BounceTextProps>;

interface FlipTextProps {
    text: string;
    backText?: string;
    speed?: number;
    axis?: 'x' | 'y';
    className?: string;
}
declare const FlipText: React.FC<FlipTextProps>;

interface GradientTextProps {
    text: string;
    colors?: string[];
    speed?: number;
    angle?: number;
    className?: string;
}
declare const GradientText: React.FC<GradientTextProps>;

interface ScrambleTextProps {
    text: string;
    speed?: number;
    scrambleSpeed?: number;
    characters?: string;
    className?: string;
}
declare const ScrambleText: React.FC<ScrambleTextProps>;

interface PulseTextProps {
    text: string;
    scale?: number;
    speed?: number;
    stagger?: boolean;
    className?: string;
}
declare const PulseText: React.FC<PulseTextProps>;

interface ScatterTextProps {
    text: string;
    scatterRange?: number;
    duration?: number;
    stagger?: number;
    className?: string;
}
declare const ScatterAssemble: React.FC<ScatterTextProps>;

interface SpotlightTextProps {
    text: string;
    radius?: number;
    spotlightColor?: string;
    className?: string;
}
declare const SpotlightText: React.FC<SpotlightTextProps>;

interface LiquidTextProps {
    text: string;
    blur?: number;
    speed?: number;
    className?: string;
}
declare const LiquidText: React.FC<LiquidTextProps>;

interface MagneticTextProps {
    text: string;
    strength?: number;
    className?: string;
}
declare const MagneticText: React.FC<MagneticTextProps>;

interface RippleButtonProps {
    children: React.ReactNode;
    color?: string;
    rippleColor?: string;
    className?: string;
    onClick?: () => void;
}
declare const RippleButton: React.FC<RippleButtonProps>;

interface MagneticButtonProps {
    children: React.ReactNode;
    strength?: number;
    color?: string;
    className?: string;
    onClick?: () => void;
}
declare const MagneticButton: React.FC<MagneticButtonProps>;

interface LiquidFillButtonProps {
    children: React.ReactNode;
    fillColor?: string;
    textColor?: string;
    borderColor?: string;
    speed?: number;
    className?: string;
    onClick?: () => void;
}
declare const LiquidFillButton: React.FC<LiquidFillButtonProps>;

interface ShimmerButtonProps {
    children: React.ReactNode;
    color?: string;
    shimmerColor?: string;
    speed?: number;
    className?: string;
    onClick?: () => void;
}
declare const ShimmerButton: React.FC<ShimmerButtonProps>;

interface GlowPulseButtonProps {
    children: React.ReactNode;
    color?: string;
    glowColor?: string;
    intensity?: number;
    speed?: number;
    className?: string;
    onClick?: () => void;
}
declare const GlowPulseButton: React.FC<GlowPulseButtonProps>;

interface PressButtonProps {
    children: React.ReactNode;
    color?: string;
    shadowColor?: string;
    depth?: number;
    className?: string;
    onClick?: () => void;
}
declare const PressButton: React.FC<PressButtonProps>;

interface SplitRevealButtonProps {
    children: React.ReactNode;
    hoverText?: string;
    color?: string;
    hoverColor?: string;
    speed?: number;
    className?: string;
    onClick?: () => void;
}
declare const SplitRevealButton: React.FC<SplitRevealButtonProps>;

interface ParticleButtonProps {
    children: React.ReactNode;
    color?: string;
    particleColor?: string;
    particleCount?: number;
    className?: string;
    onClick?: () => void;
}
declare const ParticleButton: React.FC<ParticleButtonProps>;

interface BorderGlowButtonProps {
    children: React.ReactNode;
    color?: string;
    glowColor?: string;
    speed?: number;
    className?: string;
    onClick?: () => void;
}
declare const BorderGlowButton: React.FC<BorderGlowButtonProps>;

interface ExpandButtonProps {
    children: React.ReactNode;
    expandedText?: string;
    color?: string;
    speed?: number;
    className?: string;
    onClick?: () => void;
}
declare const ExpandButton: React.FC<ExpandButtonProps>;

interface TiltCardProps {
    title?: string;
    description?: string;
    intensity?: number;
    glare?: boolean;
    scale?: number;
    className?: string;
}
declare const TiltCard: React.FC<TiltCardProps>;

interface GlassCardProps {
    title?: string;
    description?: string;
    blur?: number;
    opacity?: number;
    borderOpacity?: number;
    color?: string;
    className?: string;
}
declare const GlassCard: React.FC<GlassCardProps>;

interface HolographicCardProps {
    title?: string;
    description?: string;
    intensity?: number;
    className?: string;
}
declare const HolographicCard: React.FC<HolographicCardProps>;

interface FlipCardProps {
    frontTitle?: string;
    frontDescription?: string;
    backTitle?: string;
    backDescription?: string;
    speed?: number;
    color?: string;
    className?: string;
}
declare const FlipCard: React.FC<FlipCardProps>;

interface ParticleCardProps {
    title?: string;
    description?: string;
    particleCount?: number;
    color?: string;
    className?: string;
}
declare const ParticleCard: React.FC<ParticleCardProps>;

interface SpotlightCardProps {
    title?: string;
    description?: string;
    spotlightColor?: string;
    spotlightSize?: number;
    className?: string;
}
declare const SpotlightCard: React.FC<SpotlightCardProps>;

interface MorphCardProps {
    title?: string;
    description?: string;
    color?: string;
    speed?: number;
    className?: string;
}
declare const MorphCard: React.FC<MorphCardProps>;

interface ExpandCardProps {
    title?: string;
    description?: string;
    expandedContent?: string;
    color?: string;
    speed?: number;
    className?: string;
}
declare const ExpandCard: React.FC<ExpandCardProps>;

interface NeonCardProps {
    title?: string;
    description?: string;
    color?: string;
    flicker?: boolean;
    className?: string;
}
declare const NeonCard: React.FC<NeonCardProps>;

interface StackCardProps {
    title?: string;
    description?: string;
    stackCount?: number;
    color?: string;
    spread?: number;
    className?: string;
}
declare const StackCard: React.FC<StackCardProps>;

interface LiquidCardProps {
    title?: string;
    description?: string;
    liquidColor?: string;
    className?: string;
}
declare const LiquidCard: React.FC<LiquidCardProps>;

interface ShatterCardProps {
    title?: string;
    description?: string;
    shardCount?: number;
    glassColor?: string;
    className?: string;
}
declare const ShatterCard: React.FC<ShatterCardProps>;

interface PortalCardProps {
    title?: string;
    description?: string;
    portalColor?: string;
    className?: string;
}
declare const PortalCard: React.FC<PortalCardProps>;

interface MagneticCardProps {
    title?: string;
    description?: string;
    magnetStrength?: number;
    accentColor?: string;
    className?: string;
}
declare const MagneticCard: React.FC<MagneticCardProps>;

interface RippleCardProps {
    title?: string;
    description?: string;
    rippleColor?: string;
    rippleCount?: number;
    className?: string;
}
declare const RippleCard: React.FC<RippleCardProps>;

interface TrailCursorProps {
    color?: string;
    size?: number;
    trailLength?: number;
    speed?: number;
}
declare const TrailCursor: React.FC<TrailCursorProps>;

interface MagneticCursorProps {
    color?: string;
    size?: number;
    strength?: number;
    ringSize?: number;
}
declare const MagneticCursor: React.FC<MagneticCursorProps>;

interface RippleCursorProps {
    color?: string;
    size?: number;
    duration?: number;
    rippleCount?: number;
}
declare const RippleCursor: React.FC<RippleCursorProps>;

interface SpotlightCursorProps {
    color?: string;
    size?: number;
    blur?: number;
    opacity?: number;
}
declare const SpotlightCursor: React.FC<SpotlightCursorProps>;

interface EmojiCursorProps {
    emojis?: string[];
    rate?: number;
    size?: number;
    spread?: number;
}
declare const EmojiCursor: React.FC<EmojiCursorProps>;

interface StringCursorProps {
    color?: string;
    thickness?: number;
    elasticity?: number;
    nodes?: number;
}
declare const StringCursor: React.FC<StringCursorProps>;

interface WebCursorProps {
    color?: string;
    thickness?: number;
    points?: number;
}
declare const WebCursor: React.FC<WebCursorProps>;

interface GravityCursorProps {
    color?: string;
    dotCount?: number;
    gravity?: number;
    dotSize?: number;
}
declare const GravityCursor: React.FC<GravityCursorProps>;

interface InkCursorProps {
    color?: string;
    opacity?: number;
    size?: number;
    speed?: number;
}
declare const InkCursor: React.FC<InkCursorProps>;

interface BlackHoleCursorProps {
    color?: string;
    particleCount?: number;
    suckStrength?: number;
    particleSize?: number;
}
declare const BlackHoleCursor: React.FC<BlackHoleCursorProps>;

interface PulseLoaderProps {
    color?: string;
    size?: number;
    dotCount?: number;
    speed?: number;
}
declare const PulseLoader: React.FC<PulseLoaderProps>;

interface OrbitLoaderProps {
    color?: string;
    size?: number;
    orbitCount?: number;
    speed?: number;
}
declare const OrbitLoader: React.FC<OrbitLoaderProps>;

interface MorphLoaderProps {
    color?: string;
    size?: number;
    speed?: number;
}
declare const MorphLoader: React.FC<MorphLoaderProps>;

interface DNALoaderProps {
    color?: string;
    secondColor?: string;
    dotCount?: number;
    speed?: number;
    size?: number;
}
declare const DNALoader: React.FC<DNALoaderProps>;

interface ProgressLoaderProps {
    color?: string;
    height?: number;
    speed?: number;
    showPercent?: boolean;
    loop?: boolean;
}
declare const ProgressLoader: React.FC<ProgressLoaderProps>;

interface RingLoaderProps {
    color?: string;
    size?: number;
    thickness?: number;
    speed?: number;
    segments?: number;
}
declare const RingLoader: React.FC<RingLoaderProps>;

interface SkeletonLoaderProps {
    color?: string;
    shimmerColor?: string;
    speed?: number;
    rows?: number;
    showAvatar?: boolean;
}
declare const SkeletonLoader: React.FC<SkeletonLoaderProps>;

interface WaveLoaderProps {
    color?: string;
    barCount?: number;
    speed?: number;
    height?: number;
    gap?: number;
}
declare const WaveLoader: React.FC<WaveLoaderProps>;

interface GridLoaderProps {
    color?: string;
    size?: number;
    gap?: number;
    speed?: number;
}
declare const GridLoader: React.FC<GridLoaderProps>;

interface ChasingDotsLoaderProps {
    color?: string;
    size?: number;
    dotCount?: number;
    speed?: number;
}
declare const ChasingDotsLoader: React.FC<ChasingDotsLoaderProps>;

interface InfinityLoaderProps {
    color?: string;
    size?: number;
    speed?: number;
    thickness?: number;
}
declare const InfinityLoader: React.FC<InfinityLoaderProps>;

interface TypewriterLoaderProps {
    color?: string;
    messages?: string[];
    speed?: number;
    showCursor?: boolean;
}
declare const TypewriterLoader: React.FC<TypewriterLoaderProps>;

interface ParticleRingLoaderProps {
    color?: string;
    size?: number;
    particleCount?: number;
    speed?: number;
}
declare const ParticleRingLoader: React.FC<ParticleRingLoaderProps>;

interface BouncingBarLoaderProps {
    color?: string;
    barCount?: number;
    speed?: number;
    height?: number;
    width?: number;
}
declare const BouncingBarLoader: React.FC<BouncingBarLoaderProps>;

interface GlitchLoaderProps {
    color?: string;
    speed?: number;
    intensity?: number;
}
declare const GlitchLoader: React.FC<GlitchLoaderProps>;

interface SpiralLoaderProps {
    color?: string;
    size?: number;
    speed?: number;
    turns?: number;
}
declare const SpiralLoader: React.FC<SpiralLoaderProps>;

interface FlipCardLoaderProps {
    color?: string;
    cardCount?: number;
    size?: number;
    speed?: number;
}
declare const FlipCardLoader: React.FC<FlipCardLoaderProps>;

interface GradientWavesProps {
    primaryColor?: string;
    secondaryColor?: string;
    accentColor?: string;
    waveCount?: number;
    speed?: number;
    blur?: number;
    children?: React.ReactNode;
}
declare const GradientWaves: React.FC<GradientWavesProps>;

interface DotMatrixProps {
    dotColor?: string;
    glowColor?: string;
    dotSize?: number;
    spacing?: number;
    waveSpeed?: number;
    children?: React.ReactNode;
}
declare const DotMatrix: React.FC<DotMatrixProps>;

interface AuroraBeamProps {
    color1?: string;
    color2?: string;
    color3?: string;
    speed?: number;
    beamCount?: number;
    children?: React.ReactNode;
}
declare const AuroraBeam: React.FC<AuroraBeamProps>;

interface ParticleConstellationBackgroundProps {
    color?: string;
    particleCount?: number;
    connectionDistance?: number;
    speed?: number;
    particleSize?: number;
    children?: React.ReactNode;
}
declare const ParticleConstellationBackground: React.FC<ParticleConstellationBackgroundProps>;

interface MeshGradientBackgroundProps {
    colors?: string[];
    speed?: number;
    blur?: number;
    interactive?: boolean;
    children?: React.ReactNode;
}
declare const MeshGradientBackground: React.FC<MeshGradientBackgroundProps>;

interface MatrixRainBackgroundProps {
    color?: string;
    fontSize?: number;
    speed?: number;
    density?: number;
    children?: React.ReactNode;
}
declare const MatrixRainBackground: React.FC<MatrixRainBackgroundProps>;

interface VortexBackgroundProps {
    color?: string;
    ringCount?: number;
    speed?: number;
    depth?: number;
    children?: React.ReactNode;
}
declare const VortexBackground: React.FC<VortexBackgroundProps>;

interface NeuralFabricProps {
    color?: string;
    gridSize?: number;
    repelStrength?: number;
    repelRadius?: number;
    opacity?: number;
    children?: React.ReactNode;
}
declare const NeuralFabric: React.FC<NeuralFabricProps>;

interface DepthFieldProps {
    gridColor?: string;
    gridDensity?: number;
    driftSpeed?: number;
    fov?: number;
    tiltStrength?: number;
    children?: React.ReactNode;
}
declare const DepthField: React.FC<DepthFieldProps>;

interface AcidBathProps {
    palette?: "toxic" | "molten" | "void" | "blood";
    viscosity?: number;
    noiseScale?: number;
    heatRadius?: number;
    speed?: number;
    children?: React.ReactNode;
}
declare const AcidBath: React.FC<AcidBathProps>;

interface SilkProps {
    colorTemp?: "pearl" | "dusk" | "frost" | "ember";
    warpIntensity?: number;
    driftSpeed?: number;
    children?: React.ReactNode;
}
declare const Silk: React.FC<SilkProps>;

interface HaloProps {
    accentColor?: string;
    orbCount?: number;
    sizeScale?: number;
    frostAmount?: number;
    driftSpeed?: number;
    children?: React.ReactNode;
}
declare const Halo: React.FC<HaloProps>;

interface ArcProps {
    boltColor?: "plasma" | "toxic" | "inferno" | "void";
    arcCount?: number;
    branchProbability?: number;
    dischargeFrequency?: number;
    intensity?: number;
    children?: React.ReactNode;
}
interface Pt {
    x: number;
    y: number;
}
interface Arc {
    angle: number;
    distFrac: number;
    redrawEvery: number;
    frameCount: number;
    pts: Pt[];
    branches: Array<{
        pts: Pt[];
        alpha: number;
    }>;
    alpha: number;
    targetAlpha: number;
}
declare const Arc: React.FC<ArcProps>;

interface DuneProps {
    palette?: "sahara" | "mars" | "arctic" | "obsidian";
    duneCount?: number;
    windStrength?: number;
    particleDensity?: number;
    parallaxDepth?: number;
    children?: React.ReactNode;
}
declare const Dune: React.FC<DuneProps>;

interface MonsoonProps {
    colorScheme?: "nightcity" | "bloodmoon" | "arctic" | "toxic";
    intensity?: number;
    windAngle?: number;
    streakPersistence?: number;
    rippleCount?: number;
    children?: React.ReactNode;
}
declare const Monsoon: React.FC<MonsoonProps>;

interface WormHoleVortexProps {
    ringColor?: "phosphor" | "plasma" | "infra" | "ice";
    tunnelSpeed?: number;
    ringCount?: number;
    glitchIntensity?: number;
    aberrationStrength?: number;
    children?: React.ReactNode;
}
declare const WormHoleVortex: React.FC<WormHoleVortexProps>;

export { AcidBath, type AcidBathProps, Arc, type ArcProps, AuroraBeam, type AuroraBeamProps, BlackHoleCursor, type BlackHoleCursorProps, BorderGlowButton, type BorderGlowButtonProps, BounceText, type BounceTextProps, BouncingBarLoader, type BouncingBarLoaderProps, ChasingDotsLoader, type ChasingDotsLoaderProps, DNALoader, type DNALoaderProps, DepthField, type DepthFieldProps, DotMatrix, type DotMatrixProps, Dune, type DuneProps, EmojiCursor, type EmojiCursorProps, ExpandButton, type ExpandButtonProps, ExpandCard, type ExpandCardProps, FlipCard, FlipCardLoader, type FlipCardLoaderProps, type FlipCardProps, FlipText, type FlipTextProps, GlassCard, type GlassCardProps, GlitchLoader, type GlitchLoaderProps, GlitchText, type GlitchTextProps, GlowPulseButton, type GlowPulseButtonProps, GradientText, type GradientTextProps, GradientWaves, type GradientWavesProps, GravityCursor, type GravityCursorProps, GridLoader, type GridLoaderProps, Halo, type HaloProps, HolographicCard, type HolographicCardProps, InfinityLoader, type InfinityLoaderProps, InkCursor, type InkCursorProps, LiquidCard, type LiquidCardProps, LiquidFillButton, type LiquidFillButtonProps, LiquidText, type LiquidTextProps, MagneticButton, type MagneticButtonProps, MagneticCard, type MagneticCardProps, MagneticCursor, type MagneticCursorProps, MagneticText, type MagneticTextProps, MatrixRainBackground, type MatrixRainBackgroundProps, MatrixText, type MatrixTextProps, MeshGradientBackground, type MeshGradientBackgroundProps, Monsoon, type MonsoonProps, MorphCard, type MorphCardProps, MorphLoader, type MorphLoaderProps, NeonCard, type NeonCardProps, NeonText, type NeonTextProps, NeuralFabric, type NeuralFabricProps, OrbitLoader, type OrbitLoaderProps, ParticleButton, type ParticleButtonProps, ParticleCard, type ParticleCardProps, ParticleConstellationBackground, type ParticleConstellationBackgroundProps, ParticleRingLoader, type ParticleRingLoaderProps, PortalCard, type PortalCardProps, PressButton, type PressButtonProps, ProgressLoader, type ProgressLoaderProps, PulseLoader, type PulseLoaderProps, PulseText, type PulseTextProps, RingLoader, type RingLoaderProps, RippleButton, type RippleButtonProps, RippleCard, type RippleCardProps, RippleCursor, type RippleCursorProps, ScatterAssemble, type ScatterTextProps, ScrambleText, type ScrambleTextProps, ShatterCard, type ShatterCardProps, ShatterText, type ShatterTextProps, ShimmerButton, type ShimmerButtonProps, Silk, type SilkProps, SkeletonLoader, type SkeletonLoaderProps, SpiralLoader, type SpiralLoaderProps, SplitRevealButton, type SplitRevealButtonProps, SplitText, type SplitTextProps, SpotlightCard, type SpotlightCardProps, SpotlightCursor, type SpotlightCursorProps, SpotlightText, type SpotlightTextProps, StackCard, type StackCardProps, StringCursor, type StringCursorProps, TiltCard, type TiltCardProps, TrailCursor, type TrailCursorProps, TypewriterLoader, type TypewriterLoaderProps, TypewriterText, type TypewriterTextProps, VortexBackground, type VortexBackgroundProps, WaveLoader, type WaveLoaderProps, WaveText, type WaveTextProps, WebCursor, type WebCursorProps, WormHoleVortex, type WormHoleVortexProps };
