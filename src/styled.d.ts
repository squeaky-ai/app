// eslint-disable-next-line import/no-unassigned-import
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    borders: {
      defaultSize: string;
      radius: string;
      radiusSmall: string;
      radiusMedium: string;
      radiusLarge: string;
    };
    colors: {
      blue: string;
      default: {
        background: string;
        backgroundAlt: string;
        backgroundNeutral: string;
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
      elevation: {
        default: 'auto';
        outline: 10;
        shadows: 50;
        sticky: 100;
        drawers: 500;
        uiShell: 1000;
        popup: 2000;
        dropdown: 3000;
        dialog: 4000;
        overlay: 5000;
        modal: 6000;
        toast: 7000;
        spinner: 8000;
        maximum: 9000;
      };
      spacing: {
        default: string;
        large: string;
        small: string;
        wide: string;
      };
    };
    typography: {
      lineHeight: {
        condensed: number;
        default: number;
        headings: {
          default: number;
          form: number;
          section: number;
          subsection: number;
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
        bold: number;
        heavy: number;
        normal: number;
        semibold: number;
      };
    };
  }
}
