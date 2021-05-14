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
      defaultSize: string;
      lineHeight: string;
      stack: string;
      weights: {
        normal: integer;
        semibold: integer;
      };
    };
  }
}
