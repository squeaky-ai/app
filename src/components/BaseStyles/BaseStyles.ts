import { createGlobalStyle } from 'styled-components';

const BaseStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  *:focus {
    outline: none;
  }

  html {
    font-size: 62.5%;
  }

  body {
    color: ${({ theme }) => theme.colors.default.neutralDark};
    font-family: ${({ theme }) => theme.typography.stack};
    font-size: ${({ theme }) => theme.typography.sizes.default};
    line-height: ${({ theme }) => theme.typography.lineHeight.default};
  }

  svg {
    max-height: 100%;
    max-width: 100%;
  }
`;

export default BaseStyles;
