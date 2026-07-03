"use client";

import { cn } from "@/lib/utils";
import { Reveal, TextReveal } from "./reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  className?: string;
}

/** Consistent section header: eyebrow label, animated title and lead line. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      <Reveal direction="up">
        <span className="eyebrow">
          <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-glow" />
          {eyebrow}
        </span>
      </Reveal>

      <h2
        className={cn(
          "max-w-3xl font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl",
          align === "center" && "mx-auto",
        )}
      >
        <TextReveal text={title} />
      </h2>

      {lead && (
        <Reveal direction="up" delay={0.1}>
          <p
            className={cn(
              "max-w-2xl text-base text-muted-foreground text-balance sm:text-lg",
              align === "center" && "mx-auto",
            )}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}
