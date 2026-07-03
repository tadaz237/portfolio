"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { timeline } from "@/lib/data/timeline";
import { pick } from "@/lib/i18n/config";
import { SectionHeading } from "@/components/effects/section-heading";
import { Reveal } from "@/components/effects/reveal";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function Timeline() {
  const { dict, lang } = useLanguage();
  const t = dict.journey;
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 60%", "end 60%"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section id="journey" className="relative overflow-hidden py-24 md:py-32">
      <div className="container-px relative z-10">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

        <div ref={ref} className="relative mx-auto mt-16 max-w-3xl">
          {/* Rail */}
          <div className="absolute left-4 top-0 h-full w-px bg-border md:left-1/2 md:-translate-x-1/2" />
          {/* Progress fill */}
          <motion.div
            className="absolute left-4 top-0 w-px origin-top bg-accent-gradient md:left-1/2 md:-translate-x-1/2"
            style={{ scaleY: lineScale, height: "100%" }}
          />

          <div className="space-y-12">
            {timeline.map((entry, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={entry.id}
                  className={cn(
                    "relative flex flex-col md:flex-row md:items-center",
                    isLeft ? "md:justify-start" : "md:justify-end",
                  )}
                >
                  {/* Node */}
                  <span className="absolute left-4 top-1.5 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center md:left-1/2">
                    <span className="h-4 w-4 rounded-full border-2 border-accent bg-background shadow-glow" />
                    <span className="absolute h-2 w-2 rounded-full bg-accent" />
                  </span>

                  <Reveal
                    direction={isLeft ? "right" : "left"}
                    className={cn(
                      "ml-12 md:ml-0 md:w-[calc(50%-2.5rem)]",
                      isLeft ? "md:pr-10 md:text-right" : "md:ml-auto md:pl-10",
                    )}
                  >
                    <div className="card-hover rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm">
                      <span className="text-sm font-semibold text-accent">{entry.period}</span>
                      <h3 className="mt-1 text-lg font-semibold">{pick(entry.title, lang)}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {pick(entry.description, lang)}
                      </p>
                      <div
                        className={cn(
                          "mt-4 flex flex-wrap gap-2",
                          isLeft && "md:justify-end",
                        )}
                      >
                        {entry.tags.map((tag) => (
                          <Badge key={tag} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {entry.certifications && (
                        <div className="mt-4 flex flex-col gap-2 text-left">
                          {entry.certifications.map((cert) => (
                            <a
                              key={cert.id}
                              href={cert.pdf}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${cert.title} — ${cert.issuer}`}
                              className="group flex items-center gap-3 rounded-xl border border-border bg-muted/30 px-3 py-2 transition-colors hover:border-accent/40"
                            >
                              {cert.badge ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  src={cert.badge}
                                  alt={cert.title}
                                  width={40}
                                  height={40}
                                  className="h-10 w-10 shrink-0 rounded-md object-contain"
                                />
                              ) : (
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-accent/12 text-accent">
                                  <Award className="h-5 w-5" />
                                </span>
                              )}
                              <span className="min-w-0 flex-1">
                                <span className="block text-sm font-medium leading-snug text-foreground">
                                  {cert.title}
                                </span>
                                <span className="block text-xs text-muted-foreground">
                                  {cert.issuer} · {pick(cert.category, lang)}
                                </span>
                              </span>
                              <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-accent" />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
