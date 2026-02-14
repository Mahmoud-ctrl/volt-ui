"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Search, Eye, Code2, Copy, Check, Terminal, BookOpen, FileCode2, X, Download, Package, Zap, Wrench, Menu } from "lucide-react";
import { loadNavigation } from "@/config/navigationLoader";
import { ComponentConfig, NavCategory } from "@/app/components/types";
import { BorderGlowButton } from "@/components/BorderGlowButton/BorderGlowButton";
import Link from "next/link";

// Load navigation from JSON config files
const dashboardNavigation: NavCategory[] = loadNavigation() as NavCategory[];

const defaultActiveId = "wave-text";
const flatItems = dashboardNavigation.flatMap((cat) => cat.items);
const initialActiveItem =
  flatItems.find((item) => item.id === defaultActiveId) || flatItems[0];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
      title="Copy to clipboard"
    >
      {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

function CodeBlock({
  label,
  icon,
  language,
  code,
  accentColor = "indigo",
}: {
  label: string;
  icon: React.ReactNode;
  language: string;
  code: string;
  accentColor?: "indigo" | "emerald" | "violet";
}) {
  const accent = {
    indigo: "border-indigo-500/30 text-indigo-400 bg-indigo-500/10",
    emerald: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
    violet: "border-violet-500/30 text-violet-400 bg-violet-500/10",
  }[accentColor];

  const dotColors = {
    indigo: ["bg-rose-500", "bg-amber-400", "bg-emerald-400"],
    emerald: ["bg-rose-500", "bg-amber-400", "bg-emerald-400"],
    violet: ["bg-rose-500", "bg-amber-400", "bg-emerald-400"],
  }[accentColor];

  return (
    <div className="rounded-2xl border border-white/8 bg-gradient-to-b from-zinc-900/90 to-black/90 overflow-hidden shadow-2xl">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/5 bg-white/2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            {dotColors.map((c, i) => (
              <div key={i} className={`h-2.5 w-2.5 rounded-full ${c} opacity-70`} />
            ))}
          </div>
          <div className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${accent}`}>
            {icon}
            {label}
          </div>
          <span className="text-[10px] font-mono text-zinc-600 tracking-widest uppercase">{language}</span>
        </div>
        <CopyButton text={code} />
      </div>

      <div className="overflow-x-auto p-5">
        <pre className="text-sm leading-relaxed font-mono text-zinc-300 whitespace-pre">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

function InstallationPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Download size={24} className="text-indigo-400" />
          <h1 className="text-4xl font-black tracking-tight md:text-5xl">
            Documentation
          </h1>
        </div>
        <p className="text-zinc-500 text-lg">
          Get started with Volt UI in seconds. Choose your preferred package manager.
        </p>
      </div>

      {/* Introduction */}
      <div className="border-l-4 border-indigo-500/50 pl-6 bg-gradient-to-r from-indigo-500/5 to-transparent py-4 rounded-r-xl">
        <h2 className="text-2xl font-bold mb-4">👋 Introduction</h2>
        <div className="space-y-4 text-zinc-400 leading-relaxed">
          <p>
            Welcome to Volt UI - a modern React component library built for developers who want stunning animations without the hassle. Born from countless hours of experimentation and late-night coding sessions, Volt UI brings together the best of web animation libraries into one cohesive package.
          </p>
          <p>
            Whether you're building a landing page that needs to wow investors, a SaaS dashboard that demands attention, or just want to add some spark to your personal projects, Volt UI has you covered with 100+ production-ready components.
          </p>
        </div>
      </div>

      {/* Mission */}
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          🎯 Our Mission
        </h2>
        <div className="space-y-4 text-zinc-400 leading-relaxed">
          <p>
            In a world where attention spans are measured in milliseconds, your UI needs to make an instant impact. But creating smooth, performant animations from scratch? That's weeks of work. We've done it for you.
          </p>
          <p>
            Our mission is simple: <span className="text-white font-semibold">democratize beautiful web animations</span>. Every component in Volt UI is crafted with obsessive attention to detail, optimized for performance, and designed to work seamlessly in your React applications.
          </p>
          <p>
            We believe that stunning visual effects shouldn't require a PhD in animation or hours of Stack Overflow deep-diving. Just <code className="text-indigo-400 bg-white/5 px-2 py-0.5 rounded">npm install</code>, import what you need, and ship beautiful experiences.
          </p>
        </div>
      </div>

      {/* Free Forever */}
      <div className="bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/10 border border-emerald-500/20 rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          💚 Free & Open Source. Forever.
        </h2>
        <div className="space-y-4 text-zinc-300 leading-relaxed">
          <p>
            Volt UI is <span className="text-emerald-400 font-semibold">completely free</span>. No paywalls, no "pro" tiers, no credit card required. Use it in your side projects, your startup, or your Fortune 500 company - we don't care. It's yours.
          </p>
          <p>
            Why? Because we've been there. We've paid $300 for component libraries we used twice. We've dealt with licensing headaches for open source projects. We've rage-quit after hitting feature limits on "free" plans.
          </p>
          <p className="text-white font-medium">
            So here's our promise: Volt UI will always be free, MIT licensed, and available to everyone. No strings attached. No rug pulls. Just good components.
          </p>
          <p className="text-sm text-zinc-500 italic">
            If Volt UI helps you ship faster, consider giving us a ⭐️ on GitHub or sharing it with your dev friends. That's all we ask.
          </p>
        </div>
      </div>

      {/* Quick Install */}
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Zap size={20} className="text-emerald-400" />
          Quick Install
        </h2>
        <CodeBlock
          label="Install Package"
          icon={<Terminal size={11} />}
          language="shell"
          accentColor="emerald"
          code={`npm install @volt-ui/react
# or
yarn add @volt-ui/react
# or
pnpm add @volt-ui/react`}
        />
      </div>

      {/* Peer Dependencies */}
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Package size={20} className="text-violet-400" />
          Peer Dependencies
        </h2>
        <p className="text-zinc-500 mb-4">
          Volt UI requires the following packages. Most are likely already in your project:
        </p>
        <CodeBlock
          label="Required Dependencies"
          icon={<Terminal size={11} />}
          language="shell"
          accentColor="violet"
          code={`npm install react react-dom framer-motion gsap three @react-three/fiber @react-three/drei`}
        />
      </div>

      {/* Basic Usage */}
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Wrench size={20} className="text-indigo-400" />
          Basic Usage
        </h2>
        <CodeBlock
          label="Example"
          icon={<BookOpen size={11} />}
          language="tsx"
          accentColor="indigo"
          code={`import { WaveText, MagneticButton } from '@volt-ui/react';

export default function App() {
  return (
    <div>
      <WaveText text="Hello Volt UI" />
      <MagneticButton onClick={() => alert('Clicked!')}>
        Click Me
      </MagneticButton>
    </div>
  );
}`}
        />
      </div>

      {/* Tailwind Setup */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Tailwind CSS Setup</h2>
        <p className="text-zinc-500 mb-4">
          Some components use Tailwind CSS. If you're not using Tailwind, install it:
        </p>
        <CodeBlock
          label="Install Tailwind"
          icon={<Terminal size={11} />}
          language="shell"
          accentColor="emerald"
          code={`npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p`}
        />
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <div className="border border-white/10 rounded-2xl p-6 bg-gradient-to-br from-zinc-900/50 to-black/50">
          <div className="text-3xl mb-3">⚡</div>
          <h3 className="font-bold mb-2">100+ Components</h3>
          <p className="text-sm text-zinc-500">
            Text animations, buttons, cards, cursors, loaders, and backgrounds
          </p>
        </div>

        <div className="border border-white/10 rounded-2xl p-6 bg-gradient-to-br from-zinc-900/50 to-black/50">
          <div className="text-3xl mb-3">🎨</div>
          <h3 className="font-bold mb-2">Fully Customizable</h3>
          <p className="text-sm text-zinc-500">
            Every component comes with props to customize colors, timing, and behavior
          </p>
        </div>

        <div className="border border-white/10 rounded-2xl p-6 bg-gradient-to-br from-zinc-900/50 to-black/50">
          <div className="text-3xl mb-3">🚀</div>
          <h3 className="font-bold mb-2">TypeScript Ready</h3>
          <p className="text-sm text-zinc-500">
            Full TypeScript support with type definitions included
          </p>
        </div>
      </div>
    </div>
  );
}

// Sidebar Navigation Component (reusable for mobile and desktop)
function NavigationContent({ 
  filteredNavigation, 
  activeItemId, 
  showInstallation,
  searchQuery,
  searchFocused,
  totalResults,
  onItemChange,
  onSearchChange,
  onSearchFocus,
  onSearchBlur,
  onClearSearch,
  onClose
}: any) {
  return (
    <>
      <div
        className={`mb-6 relative flex w-full items-center rounded-xl border bg-zinc-900/50 px-3.5 py-2.5 text-sm transition-all duration-200 ${
          searchFocused
            ? "border-indigo-500/50 shadow-[0_0_0_3px_rgba(99,102,241,0.1)]"
            : "border-white/5 hover:border-white/10"
        }`}
      >
        <Search
          size={14}
          className={`mr-2.5 shrink-0 transition-colors ${
            searchFocused ? "text-indigo-400" : "text-zinc-500"
          }`}
        />
        <input
          type="text"
          placeholder="Search components..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={onSearchFocus}
          onBlur={onSearchBlur}
          className="flex-1 bg-transparent text-zinc-200 placeholder:text-zinc-600 outline-none text-sm"
        />
        {searchQuery && (
          <button
            onClick={onClearSearch}
            className="ml-1.5 text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <X size={13} />
          </button>
        )}
        {!searchQuery && (
          <kbd className="hidden rounded bg-white/5 px-1.5 py-0.5 text-[10px] font-bold text-zinc-500 lg:block shrink-0">
            ⌘K
          </kbd>
        )}
      </div>

      <AnimatePresence>
        {searchQuery && (
          <motion.p
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: "auto", marginBottom: 12 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            className="text-[11px] text-zinc-500 px-1 overflow-hidden"
          >
            {totalResults === 0
              ? "No components found"
              : `${totalResults} component${totalResults !== 1 ? "s" : ""} found`}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="flex-1 overflow-y-auto nav-scroll -mx-5 px-5 pb-4">
        <AnimatePresence mode="wait">
          {filteredNavigation.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <div className="text-3xl mb-3">🔍</div>
              <p className="text-sm text-zinc-500">No results for</p>
              <p className="text-sm font-medium text-zinc-300 mt-1">
                &ldquo;{searchQuery}&rdquo;
              </p>
            </motion.div>
          ) : (
            <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {filteredNavigation.map((category: any, catIndex: number) => (
                <div key={catIndex} className="mb-7">
                  <h4 className="mb-2.5 text-[10px] font-bold uppercase tracking-widest text-zinc-600 px-2">
                    {category.category}
                  </h4>
                  <ul className="space-y-0.5">
                    {category.items.map((item: any) => {
                      const isActive = activeItemId === item.id && !showInstallation;
                      return (
                        <li key={item.id}>
                          <button
                            onClick={() => {
                              onItemChange(item.id);
                              onClearSearch();
                              onClose?.();
                            }}
                            className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200 relative cursor-pointer ${
                              isActive
                                ? "bg-indigo-500/10 text-indigo-300 font-medium"
                                : "text-zinc-400 hover:bg-white/5 hover:text-white"
                            }`}
                          >
                            {isActive && (
                              <motion.div
                                layoutId="activeIndicator"
                                className="absolute left-0 h-5 w-[3px] rounded-full bg-gradient-to-b from-indigo-400 to-violet-500"
                              />
                            )}
                            {item.icon && (
                              <span
                                className={`transition-colors ${
                                  isActive
                                    ? "text-indigo-400"
                                    : "text-zinc-600 group-hover:text-zinc-300"
                                }`}
                              >
                                {item.icon}
                              </span>
                            )}
                            <span className="truncate">{item.label}</span>
                            {isActive && (
                              <ChevronRight
                                className="ml-auto shrink-0 text-indigo-500"
                                size={14}
                              />
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

interface DashboardLayoutProps {
  sourceMap: Record<string, string>;
}

export default function DashboardLayout({ sourceMap }: DashboardLayoutProps) {
  const [activeItemId, setActiveItemId] = useState<string>(initialActiveItem.id);
  const [viewMode, setViewMode] = useState<"preview" | "code">("preview");
  const [componentProps, setComponentProps] = useState<Record<string, any>>(
    initialActiveItem.defaultProps
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [showInstallation, setShowInstallation] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // NEW

  const activeItem = flatItems.find((item) => item.id === activeItemId);

  const filteredNavigation = useMemo(() => {
    if (!searchQuery.trim()) return dashboardNavigation;
    const q = searchQuery.toLowerCase();
    return dashboardNavigation
      .map((category) => ({
        ...category,
        items: category.items.filter(
          (item) =>
            item.label.toLowerCase().includes(q) ||
            item.description?.toLowerCase().includes(q) ||
            category.category.toLowerCase().includes(q)
        ),
      }))
      .filter((category) => category.items.length > 0);
  }, [searchQuery]);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    if (params.get('docs') === 'true') {
      setShowInstallation(true);
    }
    
    const componentParam = params.get('component');
    if (componentParam) {
      handleItemChange(componentParam);
    }
  }, []);

  const totalResults = filteredNavigation.reduce((acc, cat) => acc + cat.items.length, 0);

  if (!activeItem) return null;

  const handleItemChange = (itemId: string) => {
    const newItem = flatItems.find((item) => item.id === itemId);
    if (newItem) {
      setActiveItemId(itemId);
      setComponentProps(newItem.defaultProps);
      setShowInstallation(false);
      
      const url = new URL(window.location.href);
      url.searchParams.set('component', itemId);
      window.history.pushState({}, '', url);
    }
  };

  const handlePropChange = (propName: string, value: any) => {
    setComponentProps((prev) => ({ ...prev, [propName]: value }));
  };

  const componentName = activeItem.label.replace(/\s/g, "");
  const category = dashboardNavigation.find((cat) =>
    cat.items.some((item) => item.id === activeItem.id)
  );
  const isButton = category?.category.toLowerCase() === "button animations";

  const installCode = `npm install @volt-ui/react
# or
yarn add @volt-ui/react
# or
pnpm add @volt-ui/react`;

  const usageCode = (() => {
    const propsString = Object.entries(componentProps)
      .map(([key, value]) => {
        if (typeof value === "string") return `${key}="${value}"`;
        if (typeof value === "boolean") return value ? `${key}` : `${key}={false}`;
        return `${key}={${value}}`;
      })
      .join("\n        "); 

    const onClickSnippet = isButton
      ? `\n        onClick={() => console.log("clicked!")}`
      : "";

    return `import { ${componentName} } from '@volt-ui/react';

export default function Example() {
  return (
    <${componentName}
      ${propsString}${onClickSnippet}
    />
  );
}`;
  })();

  const fullSourceCode = (activeItem.componentPath && sourceMap[activeItem.componentPath])
    ?? `// Source unavailable for ${activeItem.label}`;

  const ActiveComponent = activeItem.component;

  return (
    <div className="flex min-h-screen w-full bg-[#030303] text-white selection:bg-indigo-500/30 font-sans">
      <style>{`
        .nav-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(222, 223, 255, 0.3) transparent;
        }
        .nav-scroll::-webkit-scrollbar {
          width: 3px;
        }
        .nav-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .nav-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(
            to bottom,
            rgba(99, 102, 241, 0.6),
            rgba(139, 92, 246, 0.4)
          );
          border-radius: 99px;
          transition: background 0.2s;
        }
        .nav-scroll::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(
            to bottom,
            rgba(99, 102, 241, 0.9),
            rgba(139, 92, 246, 0.7)
          );
        }
        .nav-scroll::-webkit-scrollbar-corner {
          background: transparent;
        }
      `}</style>

      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="flex items-center gap-2 bg-zinc-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-medium text-white shadow-lg"
        >
          <Menu size={18} />
          <span>Menu</span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="md:hidden fixed left-0 top-0 h-screen w-80 flex flex-col border-r border-white/5 bg-[#030303] px-5 py-8 z-50 overflow-y-auto"
            >
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <Link 
                href="/" 
                className="mb-8 flex items-center gap-2 px-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="h-6 w-6 bg-indigo-600 rounded-sm italic flex items-center justify-center text-[10px] font-black">
                  V
                </div>
                <span className="text-xl font-bold tracking-tighter">VOLT UI</span>
              </Link>

              <div className="mb-4">
                <BorderGlowButton 
                  onClick={() => {
                    setShowInstallation(true);
                    setMobileMenuOpen(false);
                    const url = new URL(window.location.href);
                    url.searchParams.set('docs', 'true');
                    url.searchParams.delete('component'); 
                    window.history.pushState({}, '', url);
                  }}
                  children="Installation"
                  color="#000"
                  glowColor="#4f46e5"
                  speed={2}
                  className="w-full justify-center"
                />
              </div>

              <NavigationContent
                filteredNavigation={filteredNavigation}
                activeItemId={activeItemId}
                showInstallation={showInstallation}
                searchQuery={searchQuery}
                searchFocused={searchFocused}
                totalResults={totalResults}
                onItemChange={handleItemChange}
                onSearchChange={setSearchQuery}
                onSearchFocus={() => setSearchFocused(true)}
                onSearchBlur={() => setSearchFocused(false)}
                onClearSearch={() => setSearchQuery("")}
                onClose={() => setMobileMenuOpen(false)}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-72 flex-col border-r border-white/5 bg-[#030303] px-5 py-8 md:flex lg:w-80">
        <Link 
          href="/" className="mb-8 flex items-center gap-2 px-1">
          <div className="h-6 w-6 bg-indigo-600 rounded-sm italic flex items-center justify-center text-[10px] font-black">
            V
          </div>
          <span className="text-xl font-bold tracking-tighter">VOLT UI</span>
        </Link>

        <div className="mb-4">
          <BorderGlowButton 
            onClick={() => {
              setShowInstallation(true);
              const url = new URL(window.location.href);
              url.searchParams.set('docs', 'true');
              url.searchParams.delete('component'); 
              window.history.pushState({}, '', url);
            }}
            children="Installation"
            color="#000"
            glowColor="#4f46e5"
            speed={2}
            className="w-full justify-center"
          />
        </div>

        <NavigationContent
          filteredNavigation={filteredNavigation}
          activeItemId={activeItemId}
          showInstallation={showInstallation}
          searchQuery={searchQuery}
          searchFocused={searchFocused}
          totalResults={totalResults}
          onItemChange={handleItemChange}
          onSearchChange={setSearchQuery}
          onSearchFocus={() => setSearchFocused(true)}
          onSearchBlur={() => setSearchFocused(false)}
          onClearSearch={() => setSearchQuery("")}
        />
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative overflow-y-auto">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        <div className="mx-auto max-w-5xl px-6 py-12 md:px-12 lg:py-20 relative z-10 mt-16 md:mt-0">
          {showInstallation ? (
            <InstallationPage />
          ) : (
            <>
              <header className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    {category && (
                      <span className="text-[11px] font-semibold uppercase tracking-widest text-indigo-400/70 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-2.5 py-0.5">
                        {category.category}
                      </span>
                    )}
                  </div>
                  <h1 className="text-3xl font-black tracking-tight md:text-4xl lg:text-5xl">
                    {activeItem.label}
                  </h1>
                  <p className="mt-2 text-zinc-500">{activeItem.description}</p>
                </div>

                <div className="flex items-center rounded-xl border border-white/5 bg-zinc-900/50 p-1 backdrop-blur-md shrink-0">
                  <button
                    onClick={() => setViewMode("preview")}
                    className={`flex items-center gap-2 rounded-lg px-3 md:px-4 py-2 text-xs md:text-sm font-medium transition-all cursor-pointer ${
                      viewMode === "preview"
                        ? "bg-white/10 text-white shadow-sm"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    <Eye size={15} /> Preview
                  </button>
                  <button
                    onClick={() => setViewMode("code")}
                    className={`flex items-center gap-2 rounded-lg px-3 md:px-4 py-2 text-xs md:text-sm font-medium transition-all cursor-pointer ${
                      viewMode === "code"
                        ? "bg-white/10 text-white shadow-sm"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    <Code2 size={15} /> Code
                  </button>
                </div>
              </header>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id + viewMode}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {viewMode === "preview" ? (
                    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/80 to-black/80 backdrop-blur-xl p-6 md:p-12 shadow-[0_0_50px_-12px_rgba(99,102,241,0.2)]">
                      <div className="pointer-events-none absolute -top-1/2 -left-1/2 h-full w-full rounded-full bg-indigo-500/10 blur-[120px]" />
                      <div className="relative z-10 min-h-[300px] w-full flex items-center justify-center">
                        <ActiveComponent {...componentProps} />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-5">
                      <CodeBlock
                        label="Install"
                        icon={<Terminal size={11} />}
                        language="shell"
                        accentColor="emerald"
                        code={installCode}
                      />

                      <CodeBlock
                        label="Usage"
                        icon={<BookOpen size={11} />}
                        language="tsx"
                        accentColor="indigo"
                        code={usageCode}
                      />

                      <CodeBlock
                        label="Source"
                        icon={<FileCode2 size={11} />}
                        language="tsx"
                        accentColor="violet"
                        code={fullSourceCode}
                      />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {viewMode === "preview" && activeItem.controls.length > 0 && (
                <div className="mt-12 border-t border-white/5 pt-12">
                  <h3 className="text-xl font-bold mb-8">Customize</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {activeItem.controls.map((control) => (
                      <div key={control.name} className="space-y-3">
                        <div className="flex justify-between items-center">
                          <label className="text-sm font-medium text-zinc-400">
                            {control.label}
                          </label>
                          <span className="text-sm text-white font-mono bg-white/5 px-2 py-0.5 rounded-md">
                            {control.type === "toggle"
                              ? componentProps[control.name] ? "On" : "Off"
                              : `${componentProps[control.name]}${control.unit || ""}`}
                          </span>
                        </div>

                        {control.type === "range" && (
                          <input
                            type="range"
                            min={control.min}
                            max={control.max}
                            step={control.step}
                            value={componentProps[control.name]}
                            onChange={(e) =>
                              handlePropChange(control.name, parseFloat(e.target.value))
                            }
                            className="w-full h-1.5 bg-zinc-800 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(99,102,241,0.6)] [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-indigo-500 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                          />
                        )}

                        {control.type === "select" && (
                          <select
                            value={componentProps[control.name]}
                            onChange={(e) => handlePropChange(control.name, e.target.value)}
                            className="w-full bg-zinc-900/50 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500/50 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.1)] transition-all"
                          >
                            {control.options?.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        )}

                        {control.type === "toggle" && (
                          <button
                            onClick={() =>
                              handlePropChange(control.name, !componentProps[control.name])
                            }
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              componentProps[control.name] ? "bg-indigo-600" : "bg-zinc-700"
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
                                componentProps[control.name] ? "translate-x-6" : "translate-x-1"
                              }`}
                            />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}