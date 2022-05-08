export const pluralise = <T extends Array<any>>(string: string, array: T) => (
  `${string}${array.length === 1 ? '' : 's'}`
);
