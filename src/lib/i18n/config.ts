export const LANGUAGES = ["fr", "en"] as const;
export type Lang = (typeof LANGUAGES)[number];
export const DEFAULT_LANG: Lang = "fr";

/** A string that exists in both supported languages. */
export type Localized = Record<Lang, string>;

/** Pick the right variant for the active language. */
export function pick(value: Localized, lang: Lang): string {
  return value[lang];
}
