import { DefaultTheme } from 'styled-components';

const squeakyTheme: DefaultTheme = {
  borders: {
    defaultSize: '0.2rem',
    radius: '0.8rem',
    radiusMedium: '1.2rem',
    radiusLarge: '1.6rem',
  },
  colors: {
    blue: '#0074e0',
    default: {
      background: '#ffffff',
      backgroundAlt: '#fbfbfb',
      neutralDark: '#222222',
      neutralFaded: '#f2f2f2',
      neutralFadedDark: '#bfbfbf',
      neutralMedium: '#707070',
      primary: '#0074e0',
      primaryDark: '#005eb6',
      primaryFaded: '#4097e8',
      warning: '#f0438c',
    },
    green: '#2ce21c',
    orange: '#ff8a00',
    magenta: '#f0438c',
    yellow: '#fde50b',
  },
  inputs: {
    disabledOpacity: '25%',
  },
  stack: {
    spacing: {
      default: '2.4rem',
      large: '3.2rem',
    },
  },
  typography: {
    lineHeight: {
      condensed: 1,
      default: 1.5,
      headings: {
        default: 1.25,
        form: 1.33,
        section: 1.33,
        subsection: 1.5,
      },
    },
    stack:
      'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    sizes: {
      default: '1.6rem',
      headings: {
        default: '6.4rem',
        form: '2.4rem',
        section: '4.8rem',
        subsection: '3.2rem',
      },
    },
    weights: {
      bold: 700,
      heavy: 800,
      normal: 400,
      semibold: 600,
    },
  },
};

export default squeakyTheme;
