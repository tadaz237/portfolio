"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowUpRight, Download, Sparkles } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { useAccent } from "@/components/providers/accent-provider";
import { scrollToId } from "@/components/providers/lenis-provider";
import { usePrefersReducedMotion } from "@/lib/hooks/use-prefers-reduced-motion";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/effects/magnetic";
import { TypingText } from "@/components/effects/typing-text";
import { AuroraBackground } from "@/components/effects/backgrounds";
import { siteConfig } from "@/lib/data/site";

// The 3D scene is client-only and code-split so it never blocks first paint.
const HeroScene = dynamic(() => import("@/components/three/hero-scene"), {
  ssr: false,
  loading: () => <SceneFallback />,
});

/** Static gradient orb shown while the scene loads or under reduced-motion. */
function SceneFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-64 w-64 rounded-full bg-accent-gradient opacity-30 blur-3xl animate-pulse-glow" />
      <div className="absolute h-48 w-48 rounded-full border border-accent/20 animate-spin-slow" />
      <div className="absolute h-72 w-72 rounded-full border border-secondary/10 animate-spin-slow" />
    </div>
  );
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.35 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  const { dict } = useLanguage();
  const { theme } = useAccent();
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16"
    >
      <AuroraBackground />

      {/* 3D scene — right half on desktop, full backdrop on mobile */}
      <div className="pointer-events-none absolute inset-0 lg:left-1/2">
        <div className="absolute inset-0 opacity-60 lg:opacity-100">
          {reduced ? (
            <SceneFallback />
          ) : (
            <HeroScene accent={theme.hex.accent} secondary={theme.hex.secondary} />
          )}
        </div>
        {/* Fade the scene into the background on small screens for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent lg:hidden" />
      </div>

      <div className="container-px relative z-10 w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-2xl"
        >
          {/* Availability badge */}
          <motion.div variants={item}>
            <span className="eyebrow">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {dict.hero.available}
            </span>
          </motion.div>

          {/* Greeting */}
          <motion.p
            variants={item}
            className="mt-8 flex items-center gap-2 text-base text-muted-foreground"
          >
            <Sparkles className="h-4 w-4 text-accent" />
            {dict.hero.greeting}
          </motion.p>

          {/* Name */}
          <motion.h1
            variants={item}
            className="mt-2 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
          >
            <span className="text-gradient animate-gradient-pan">Tadaze Votio</span>
            <br />
            <span className="text-foreground">Martinez</span>
          </motion.h1>

          {/* Typing roles */}
          <motion.div
            variants={item}
            className="mt-5 flex h-9 items-center text-xl font-medium text-foreground/90 sm:text-2xl"
          >
            <span className="mr-2 text-muted-foreground">{"<"}</span>
            <TypingText words={[...dict.hero.roles]} className="text-gradient-accent" />
            <span className="ml-1 text-muted-foreground">{"/>"}</span>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {dict.hero.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <Magnetic>
              <Button size="lg" variant="primary" onClick={() => scrollToId("work")}>
                {dict.hero.ctaProjects}
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Magnetic>
            <Magnetic>
              <Button size="lg" variant="outline" onClick={() => scrollToId("contact")}>
                {dict.hero.ctaContact}
              </Button>
            </Magnetic>
            <Magnetic>
              <a href={siteConfig.resumeUrl} download>
                <Button size="lg" variant="ghost">
                  <Download className="h-4 w-4" />
                  {dict.hero.ctaResume}
                </Button>
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollToId("about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground"
        aria-label={dict.hero.scroll}
      >
        {dict.hero.scroll}
        <span className="flex h-9 w-5 justify-center rounded-full border border-border pt-1.5">
          <motion.span
            className="h-1.5 w-1 rounded-full bg-accent"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.button>
    </section>
  );
}
