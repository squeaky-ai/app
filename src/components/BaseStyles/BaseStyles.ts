import { createGlobalStyle } from 'styled-components';

const BaseStyles = createGlobalStyle`
  html {
    font-size: 62.5%;
  }

  body {
    font-family: ${({ theme }) => theme.typography.stack};
    font-size: ${({ theme }) => theme.typography.defaultSize};
    line-height: ${({ theme }) => theme.typography.lineHeight};
  }
`;

export default BaseStyles;
