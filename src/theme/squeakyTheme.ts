import { DefaultTheme } from 'styled-components';

const squeakyTheme: DefaultTheme = {
  borders: {
    defaultSize: '0.2rem',
    radius: '0.8rem',
  },
  colors: {
    default: {
      background: '#ffffff',
      neutralDark: '#222222',
      neutralFaded: '#f2f2f2',
      neutralFadedDark: '#bfbfbf',
      primary: '#0074e0',
      primaryDark: '#005eb6',
      primaryFaded: '#4097e8',
      warning: '#f0438c',
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
    weights: {
      normal: 400,
      semibold: 600,
    },
  },
};

export default squeakyTheme;
