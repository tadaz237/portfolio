"use client";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { LanguageProvider } from "@/components/providers/language-provider";
import { AccentProvider } from "@/components/providers/accent-provider";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Loader } from "@/components/layout/loader";
import { ScrollProgress } from "@/components/effects/scroll-progress";
import { Spotlight } from "@/components/effects/spotlight";
import { Noise } from "@/components/effects/backgrounds";
import { CustomCursor } from "@/components/effects/custom-cursor";

/**
 * Client shell wrapping the whole app with providers and global chrome
 * (loader, cursor, spotlight, navbar, footer). Rendered once in the root
 * layout around the page content.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AccentProvider>
          <LenisProvider>
            <Loader />
            <ScrollProgress />
            <Spotlight />
            <Noise />
            <CustomCursor />
            <Navbar />
            <main id="main-content" className="relative z-10">
              {children}
            </main>
            <Footer />
          </LenisProvider>
        </AccentProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
