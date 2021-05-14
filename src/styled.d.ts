import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    borders: {
      defaultSize: string;
      radius: string;
      radiusMedium: string;
      radiusLarge: string;
    };
    colors: {
      blue: string;
      default: {
        background: string;
        backgroundAlt: string;
        neutralFaded: string;
        neutralFadedDark: string;
        neutralDark: string;
        neutralMedium: string;
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
    stack: {
      spacing: {
        default: string;
        large: string;
      };
    };
    typography: {
      lineHeight: {
        condensed: integer;
        default: integer;
        headings: {
          default: integer;
          form: integer;
          section: integer;
          subsection: integer;
        };
      };
      sizes: {
        default: string;
        headings: {
          default: string;
          form: string;
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
