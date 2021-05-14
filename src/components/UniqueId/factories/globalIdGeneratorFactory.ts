const globalIdGeneratorFactory = (prefix = ''): (() => string) => {
  let index = 1;

  return () => `Squeaky${prefix}${index++}`;
};

export default globalIdGeneratorFactory;
