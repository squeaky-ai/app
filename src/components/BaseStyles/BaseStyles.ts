import { createGlobalStyle } from 'styled-components';

const BaseStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  *:focus {
    outline: none;
  }

  *:focus-visible {
    position: relative;

    &::before {
      position: absolute;
      bottom: -0.6rem;
      left: -0.6rem;
      right: -0.6rem;
      top: -0.6rem;
      content: '';
      border: ${({ theme }) => theme.borders.defaultSize} solid ${({ theme }) =>
  theme.colors.default.neutralDark};
      border-radius: ${({ theme }) => theme.borders.radiusMedium};
      pointer-events: none;
    }
  }

  html, body, [id="__next"] {
    height: 100%;
    min-height: 100%;
  }

  html {
    background-color: ${({ theme }) => theme.colors.default.backgroundNeutral};
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
