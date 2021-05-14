import styled, { css } from 'styled-components';

const StackContainer = styled.div<StackContainerProps>`
  display: flex;
  flex-flow: column;

  ${({ modCenter }) =>
    modCenter &&
    css`
      place-items: center;
    `}

  ${({ modFullHeight }) =>
    modFullHeight &&
    css`
      height: 100%;
      min-height: 100vh;
    `}
`;

export interface StackContainerProps {
  /** Renders all content at the absolute center of the box */
  modCenter?: boolean;
  /** Renders a stack taking 100vh as height */
  modFullHeight?: boolean;
  /** Renders a more comfortable spacing between items */
  modSpaceComfort?: boolean;
}

export default StackContainer;
