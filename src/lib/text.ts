export const pluralise = <T extends Array<any>>(string: string, array: T) => {
  return `${string}${array.length === 1 ? '' : 's'}`;
};
