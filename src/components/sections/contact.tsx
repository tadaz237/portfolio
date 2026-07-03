"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Github, Linkedin, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/whatsapp";
import { useLanguage } from "@/components/providers/language-provider";
import { createContactSchema, type ContactFormValues } from "@/lib/validations/contact";
import { siteConfig } from "@/lib/data/site";
import { SectionHeading } from "@/components/effects/section-heading";
import { Reveal } from "@/components/effects/reveal";
import { AuroraBackground } from "@/components/effects/backgrounds";
import { Magnetic } from "@/components/effects/magnetic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "success" | "error";

export function Contact() {
  const { dict } = useLanguage();
  const t = dict.contact;
  const [status, setStatus] = useState<Status>("idle");

  const schema = useMemo(() => createContactSchema(t.validation), [t.validation]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = async (values: ContactFormValues) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reset();
      setTimeout(() => setStatus("idle"), 6000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 6000);
    }
  };

  const directLinks = [
    { icon: Mail, label: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { icon: Phone, label: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/\s/g, "")}` },
    { icon: WhatsAppIcon, label: `WhatsApp · ${siteConfig.whatsapp}`, href: siteConfig.socials.whatsapp },
    { icon: Github, label: "GitHub", href: siteConfig.socials.github },
    { icon: Linkedin, label: "LinkedIn", href: siteConfig.socials.linkedin },
  ];

  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-32">
      <AuroraBackground />
      <div className="container-px relative z-10">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

        <div className="mx-auto mt-16 grid max-w-5xl gap-8 lg:grid-cols-[1fr_1.2fr]">
          {/* Left: direct contact */}
          <Reveal direction="right">
            <div className="flex h-full flex-col justify-between gap-8 rounded-3xl border border-border bg-card/60 p-8">
              <div>
                <h3 className="text-xl font-semibold">{t.directContact}</h3>
                <div className="mt-6 space-y-3">
                  {directLinks.map(({ icon: Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm transition-colors hover:border-accent/40"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/12 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="font-medium text-foreground/90">{label}</span>
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-accent" />
                {siteConfig.location}
              </div>
            </div>
          </Reveal>

          {/* Right: form */}
          <Reveal direction="left">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="glass-card space-y-5 p-8"
              noValidate
            >
              {/* Honeypot (hidden from users) */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
                {...register("company")}
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label={t.name} error={errors.name?.message}>
                  <Input placeholder={t.namePlaceholder} {...register("name")} />
                </Field>
                <Field label={t.email} error={errors.email?.message}>
                  <Input type="email" placeholder={t.emailPlaceholder} {...register("email")} />
                </Field>
              </div>

              <Field label={t.subject} error={errors.subject?.message}>
                <Input placeholder={t.subjectPlaceholder} {...register("subject")} />
              </Field>

              <Field label={t.message} error={errors.message?.message}>
                <Textarea placeholder={t.messagePlaceholder} {...register("message")} />
              </Field>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <Magnetic>
                  <Button type="submit" size="lg" disabled={status === "sending"}>
                    {status === "sending" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {t.sending}
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        {t.send}
                      </>
                    )}
                  </Button>
                </Magnetic>

                <AnimatePresence mode="wait">
                  {status === "success" && (
                    <FeedbackPill key="ok" tone="success">
                      <CheckCircle2 className="h-4 w-4" />
                      {t.success}
                    </FeedbackPill>
                  )}
                  {status === "error" && (
                    <FeedbackPill key="err" tone="error">
                      {t.error}
                    </FeedbackPill>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground/90">{label}</span>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 block text-xs text-red-400"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  );
}

function FeedbackPill({
  tone,
  children,
}: {
  tone: "success" | "error";
  children: React.ReactNode;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium",
        tone === "success"
          ? "bg-emerald-500/12 text-emerald-400"
          : "bg-red-500/12 text-red-400",
      )}
    >
      {children}
    </motion.span>
  );
}
