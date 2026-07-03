"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github, Globe, X } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { projects, type Project } from "@/lib/data/projects";
import { pick } from "@/lib/i18n/config";
import { SectionHeading } from "@/components/effects/section-heading";
import { RevealGroup, RevealItem } from "@/components/effects/reveal";
import { Tilt } from "@/components/effects/tilt";
import { SpotlightCard } from "@/components/effects/spotlight";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function ProjectPoster({ project, className }: { project: Project; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className={cn("absolute inset-0 bg-gradient-to-br", project.gradient)} />
      <div className="absolute inset-0 bg-dots opacity-30 mix-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      {/* Big project initial */}
      <span className="absolute bottom-4 right-5 font-display text-6xl font-bold text-white/25">
        {project.title.charAt(0)}
      </span>
      <span className="absolute left-5 top-5 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
        {project.year}
      </span>
    </div>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const { lang, dict } = useLanguage();
  return (
    <Tilt max={6} className="h-full">
      <SpotlightCard className="card-hover flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card">
        <button onClick={onOpen} className="block text-left" aria-label={pick(project.category, lang)}>
          <ProjectPoster project={project} className="aspect-[16/10] w-full" />
        </button>
        <div className="flex flex-1 flex-col p-6">
          <p className="text-xs font-medium uppercase tracking-wider text-accent">
            {pick(project.category, lang)}
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight">{project.title}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
            {pick(project.description, lang)}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tech.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="default">
                {tech}
              </Badge>
            ))}
            {project.tech.length > 4 && (
              <Badge variant="outline">+{project.tech.length - 4}</Badge>
            )}
          </div>
          <div className="mt-5 flex items-center justify-between">
            <button
              onClick={onOpen}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-accent"
            >
              {dict.work.viewProject}
              <ArrowUpRight className="h-4 w-4" />
            </button>
            <div className="flex gap-2">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={dict.work.live}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-accent/40 hover:text-accent"
                >
                  <Globe className="h-4 w-4" />
                </a>
              )}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={dict.work.code}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-accent/40 hover:text-accent"
                >
                  <Github className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </SpotlightCard>
    </Tilt>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const { lang, dict } = useLanguage();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
        onClick={onClose}
        aria-hidden
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        className="glass-card relative z-10 max-h-[88vh] w-full max-w-2xl overflow-y-auto"
      >
        <ProjectPoster project={project} className="h-48 w-full rounded-t-3xl" />
        <button
          onClick={onClose}
          aria-label={dict.common.close}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md transition-colors hover:bg-black/50"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-7">
          <p className="text-xs font-medium uppercase tracking-wider text-accent">
            {pick(project.category, lang)}
          </p>
          <h3 className="mt-1 text-2xl font-bold tracking-tight">{project.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {pick(project.longDescription, lang)}
          </p>

          <h4 className="mt-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {dict.work.features}
          </h4>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {project.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {pick(feature, lang)}
              </li>
            ))}
          </ul>

          {project.sites && project.sites.length > 0 && (
            <>
              <h4 className="mt-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                {dict.work.sites}
              </h4>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {project.sites.map((site) => (
                  <li key={site.url}>
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-2 rounded-xl border border-border bg-muted/30 px-4 py-2.5 text-sm transition-colors hover:border-accent/40"
                    >
                      <span className="flex items-center gap-2 font-medium text-foreground/90">
                        <Globe className="h-4 w-4 text-accent" />
                        {site.name}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}

          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.tech.map((tech) => (
              <Badge key={tech} variant="accent">
                {tech}
              </Badge>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            {project.links.live && (
              <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                <Button variant="primary">
                  {dict.work.live}
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </a>
            )}
            {project.links.github && (
              <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                <Button variant="outline">
                  <Github className="h-4 w-4" />
                  {dict.work.code}
                </Button>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const { dict } = useLanguage();
  const t = dict.work;
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="work" className="relative overflow-hidden py-24 md:py-32">
      <div className="container-px relative z-10">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

        <RevealGroup className="mt-16 grid gap-6 md:grid-cols-2" stagger={0.12}>
          {projects.map((project) => (
            <RevealItem key={project.id} className="h-full">
              <ProjectCard project={project} onOpen={() => setActive(project)} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      <AnimatePresence>
        {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}
