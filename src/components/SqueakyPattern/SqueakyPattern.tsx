import styled, { css } from 'styled-components';

const SqueakyPattern = styled.div<SqueakyPatternProps>`
  height: 100%;
  width: 100%;
  background-image: url('./squiggles.svg');
  background-repeat: repeat;
  background-position: center center;

  ${({ modFullPage }) =>
    modFullPage &&
    css`
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
      pointer-events: none;
      z-index: -1;
    `}
`;

interface SqueakyPatternProps {
  /** Renders the pattern as a background for the fullpage */
  modFullPage?: boolean;
}

export default SqueakyPattern;
