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
        primary: string;
        primaryDark: string;
        primaryFaded: string;
      };
    };
    inputs: {
      disabledOpacity: string;
    };
    typography: {
      defaultSize: string;
      lineHeight: string;
      stack: string;
    };
  }
}
