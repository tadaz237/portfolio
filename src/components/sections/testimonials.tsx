"use client";

import { Quote } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { testimonials } from "@/lib/data/testimonials";
import { pick } from "@/lib/i18n/config";
import { SectionHeading } from "@/components/effects/section-heading";
import { RevealGroup, RevealItem } from "@/components/effects/reveal";
import { SpotlightCard } from "@/components/effects/spotlight";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const { dict, lang } = useLanguage();
  const t = dict.testimonials;

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="container-px relative z-10">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

        <RevealGroup className="mt-16 grid gap-6 md:grid-cols-3" stagger={0.12}>
          {testimonials.map((item) => (
            <RevealItem key={item.id} className="h-full">
              <SpotlightCard className="card-hover flex h-full flex-col rounded-3xl border border-border bg-card/60 p-7">
                <Quote
                  className={cn(
                    "h-8 w-8",
                    item.accent === "accent" ? "text-accent" : "text-secondary",
                  )}
                />
                <p className="mt-5 flex-1 text-[15px] leading-relaxed text-foreground/90">
                  “{pick(item.quote, lang)}”
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <span
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white shadow-glow",
                      item.accent === "accent"
                        ? "bg-accent-gradient"
                        : "bg-gradient-to-br from-secondary to-accent",
                    )}
                  >
                    {item.initials}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {pick(item.role, lang)} · {item.company}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
