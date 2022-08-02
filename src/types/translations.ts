export enum SupportedLanguages {
  English = 'en',
  Czech = 'cs',
  Dutch = 'nl',
  French = 'fr',
  Polish = 'pl',
  Swedish = 'se',
  Spanish = 'es',
}

export const countryNames: Record<SupportedLanguages, string> = {
  en: 'English',
  cs: 'Czech',
  nl: 'Dutch',
  fr: 'French (France)',
  pl: 'Polish',
  se: 'Swedish',
  es: 'Spanish (Spain)',
};
