export const pluralise = <T extends Array<any>>(string: string, array: T) => (
  `${string}${array.length === 1 ? '' : 's'}`
);

export const formatStringForUrlSlug = (string: string) => string
  .trim()
  .toLowerCase()
  .replace(/ /g, '-')
  .replace(/[^a-z0-9-]/g, '');
