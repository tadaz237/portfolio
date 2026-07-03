"use client";

import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
  /** Seconds for one full loop. */
  duration?: number;
  reverse?: boolean;
}

/**
 * Infinite horizontal marquee. Renders the list twice and translates by
 * -50% for a seamless loop. Pauses on hover.
 */
export function Marquee({ items, className, duration = 40, reverse = false }: MarqueeProps) {
  return (
    <div
      className={cn(
        "group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]",
        className,
      )}
    >
      {[0, 1].map((dup) => (
        <div
          key={dup}
          aria-hidden={dup === 1}
          className="flex shrink-0 items-center gap-8 pr-8 animate-marquee group-hover:[animation-play-state:paused]"
          style={
            {
              "--marquee-duration": `${duration}s`,
              animationDirection: reverse ? "reverse" : "normal",
            } as React.CSSProperties
          }
        >
          {items.map((item, i) => (
            <span
              key={`${dup}-${i}`}
              className="flex items-center gap-8 text-lg font-medium text-muted-foreground/70"
            >
              {item}
              <span className="h-1.5 w-1.5 rounded-full bg-accent/50" />
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
