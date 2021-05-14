import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    borders: {
      defaultSize: string;
      radius: string;
      radiusLarge: string;
    };
    colors: {
      blue: string;
      default: {
        background: string;
        neutralFaded: string;
        neutralFadedDark: string;
        neutralDark: string;
        primary: string;
        primaryDark: string;
        primaryFaded: string;
        warning: string;
      };
      green: string;
      magenta: string;
      orange: string;
      yellow: string;
    };
    inputs: {
      disabledOpacity: string;
    };
    typography: {
      lineHeight: {
        condensed: integer;
        default: integer;
        headings: {
          default: integer;
          section: integer;
          subsection: integer;
        };
      };
      sizes: {
        default: string;
        headings: {
          default: string;
          section: string;
          subsection: string;
        };
      };
      stack: string;
      weights: {
        bold: integer;
        heavy: integer;
        normal: integer;
        semibold: integer;
      };
    };
  }
}
