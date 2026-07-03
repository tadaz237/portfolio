"use client";

import { useMediaQuery } from "./use-media-query";

/** True when the user has requested reduced motion at the OS level. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
