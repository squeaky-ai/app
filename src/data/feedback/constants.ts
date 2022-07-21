export enum SupportedLanguages {
  English = 'en',
  Czech = 'cs',
  Dutch = 'nl',
  French = 'fr_fr',
  Swedish = 'se',
  Spanish = 'es_es',
}

export const countryNames: Record<SupportedLanguages, string> = {
  en: 'English',
  cs: 'Czech',
  nl: 'Dutch',
  fr_fr: 'French (France)',
  se: 'Swedish',
  es_es: 'Spanish (Spain)',
};
