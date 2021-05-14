import { createGlobalStyle } from 'styled-components';

const BaseStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-family: ${({ theme }) => theme.typography.stack};
    font-size: ${({ theme }) => theme.typography.sizes.default};
    line-height: ${({ theme }) => theme.typography.lineHeight.default};
  }
`;

export default BaseStyles;
