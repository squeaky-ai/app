import { DefaultTheme } from 'styled-components';

const squeakyTheme: DefaultTheme = {
  borders: {
    defaultSize: '0.2rem',
    radius: '0.8rem',
  },
  colors: {
    default: {
      background: '#ffffff',
      primary: '#0074e0',
      primaryDark: '#005eb6',
      primaryFaded: '#4097e8',
    },
  },
  inputs: {
    disabledOpacity: '25%',
  },
  typography: {
    defaultSize: '1.6rem',
    lineHeight: '1.5',
    stack:
      'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  },
};

export default squeakyTheme;
