import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    borders: {
      defaultSize: string;
      radius: string;
    };
    colors: {
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
