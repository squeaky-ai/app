import { i18n as feedback } from 'data/feedback/i18n';
import { Translations, SupportedLanguages } from 'types/translations';

export type Namesapce = 'feedback';

export type Replacements = Record<string, string>;

const allTranslations: Record<Namesapce, Translations> = {
  feedback,
};

const getLocale = (
  locales: string[],
  defaultLocale?: string
): SupportedLanguages => {
  const locale = (navigator.language || '').split('-')[0];

  return (
    locales.includes(locale)
      ? locale
      : defaultLocale
  ) as SupportedLanguages;
};

export const t = (
  namespace: Namesapce,
  key: string,
  replacements: Replacements = {},
  locales: string[] = Object.values(SupportedLanguages),
  defaultLocale?: string,
): string => {
  const i18n = allTranslations[namespace];
  let string = i18n?.[getLocale(locales, defaultLocale)]?.[key] || '### Missing translation ###';

  Object.entries(replacements).forEach(([key, value]) => {
    string = string.replaceAll(`:${key}`, value)
  });

  return string;
};
