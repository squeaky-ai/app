// React doesn't like inputs having nulls, so this will
// convert all of those into empty strings
export const valueOrDefaults = <T>(value: T, replacement = '' ) => Object
  .entries(value)
  .reduce((acc, [key, value]) => ({ ...acc, [key]: value || replacement }), {}) as T;

// Formik will leave empty input[type=number] as an empty
// string, so they need to be changed to nulls
export const numbersOrNull = <T>(value: T) => Object
  .entries(value)
  .reduce((acc, [key, value]) => ({ ...acc, [key]: typeof value === 'number' ? value : null }), {}) as T;
