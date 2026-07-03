"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navItems, siteConfig } from "@/lib/data/site";
import { useLanguage } from "@/components/providers/language-provider";
import { scrollToId } from "@/components/providers/lenis-provider";
import { Magnetic } from "@/components/effects/magnetic";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { LanguageToggle } from "./language-toggle";
import { AccentToggle } from "./accent-toggle";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { dict } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Shrink / add glass on scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy: highlight the section currently in view.
  useEffect(() => {
    const ids = ["hero", ...navItems.map((n) => n.id)];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const go = (id: string) => {
    setMobileOpen(false);
    // Allow the overlay to close before scrolling.
    setTimeout(() => scrollToId(id), 60);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
      >
        <nav
          className={cn(
            "flex w-full max-w-6xl items-center justify-between rounded-full px-3 py-2.5 transition-all duration-500 md:px-4",
            scrolled ? "glass shadow-glass" : "border border-transparent bg-transparent",
          )}
        >
          {/* Logo */}
          <button
            onClick={() => go("hero")}
            className="group flex items-center gap-2.5 pl-2"
            aria-label="Tadaze Votio Martinez — home"
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-accent-gradient text-sm font-bold text-white shadow-glow">
              TM
              <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20" />
            </span>
            <span className="hidden text-sm font-semibold tracking-tight sm:block">
              Tadaze<span className="text-accent">.</span>
            </span>
          </button>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => go(item.id)}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                    active === item.id
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {active === item.id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-muted/70"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {dict.nav[item.key]}
                </button>
              </li>
            ))}
          </ul>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 md:flex">
              <LanguageToggle />
              <AccentToggle />
              <ThemeToggle />
            </div>
            <Magnetic className="hidden md:inline-flex">
              <Button size="sm" variant="primary" onClick={() => go("contact")}>
                {dict.nav.contact}
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Magnetic>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? dict.common.close : dict.common.menu}
              aria-expanded={mobileOpen}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-muted/40 text-foreground lg:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col bg-background/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-1 flex-col justify-center gap-2 px-8">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  onClick={() => go(item.id)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i + 0.1 }}
                  className={cn(
                    "flex items-center justify-between border-b border-border/60 py-4 text-2xl font-semibold tracking-tight",
                    active === item.id ? "text-accent" : "text-foreground",
                  )}
                >
                  {dict.nav[item.key]}
                  <ArrowUpRight className="h-5 w-5 opacity-40" />
                </motion.button>
              ))}
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-border/60 px-8 py-6">
              <LanguageToggle />
              <div className="flex items-center gap-2">
                <AccentToggle />
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
