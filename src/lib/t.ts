import { i18n as feedback } from 'data/feedback/i18n';
import { Translations, SupportedLanguages } from 'types/translations';

export type Namesapce = 'feedback';

export type Replacements = Record<string, string>;

const allTranslations: Record<Namesapce, Translations> = {
  feedback,
};

const getLocale = (): SupportedLanguages => {
  const locale = (navigator.language || '').split('_')[0];
  const supportedLocales = Object.values(SupportedLanguages) as string[];

  return (
    supportedLocales.includes(locale)
      ? locale
      : SupportedLanguages.English
  ) as SupportedLanguages;
};

export const t = (
  namespace: Namesapce,
  key: string,
  replacements: Replacements = {},
  locale?: SupportedLanguages,
): string => {
  const i18n = allTranslations[namespace];
  let string = i18n[locale || getLocale()][key] || '### Missing translation ###';

  Object.entries(replacements).forEach(([key, value]) => {
    string = string.replaceAll(`:${key}`, value)
  });

  return string;
};
