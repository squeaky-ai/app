export enum SupportedLanguages {
  English = 'en',
  Czech = 'cs',
  Dutch = 'nl',
  French = 'fr',
  Swedish = 'se',
  Spanish = 'es',
}

export const countryNames: Record<SupportedLanguages, string> = {
  en: 'English',
  cs: 'Czech',
  nl: 'Dutch',
  fr: 'French (France)',
  se: 'Swedish',
  es: 'Spanish (Spain)',
};

export type Translations = Record<SupportedLanguages, Record<string, string>>;
