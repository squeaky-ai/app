export const pluralise = <T extends Array<any>>(string: string, array: T) => (
  `${string}${array.length === 1 ? '' : 's'}`
);

export const formatStringForUrlSlug = (string: string) => string
  .trim()
  .toLowerCase()
  .replace(/ /g, '-')         // Replace white space
  .replace(/[^a-z0-9-]/g, '') // Remove characters that aren't allowed
  .replace(/---/g, '-');      // space-space will create --- so strip that
