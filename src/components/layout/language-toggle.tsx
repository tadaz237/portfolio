"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { LANGUAGES } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

/** FR / EN segmented switch. */
export function LanguageToggle() {
  const { lang, setLang, dict } = useLanguage();

  return (
    <div
      role="group"
      aria-label={dict.common.language}
      className="relative flex h-10 items-center rounded-full border border-border bg-muted/40 p-1 text-xs font-semibold"
    >
      {LANGUAGES.map((code) => {
        const active = lang === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={active}
            className={cn(
              "relative z-10 h-8 w-9 rounded-full uppercase transition-colors",
              active ? "text-white" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {active && (
              <span className="absolute inset-0 -z-10 rounded-full bg-accent-gradient shadow-glow" />
            )}
            {code}
          </button>
        );
      })}
    </div>
  );
}
