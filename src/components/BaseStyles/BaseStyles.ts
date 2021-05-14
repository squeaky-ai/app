import { createGlobalStyle } from 'styled-components';

const BaseStyles = createGlobalStyle`
  html {
    font-size: 62.5%;
  }

  body {
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 1.6em;
    line-height: 1.5;
  }
`;

export default BaseStyles;
