import styled from 'styled-components';

const BoxContainer = styled.section<BoxContainerProps>`
  margin: auto;
  max-width: ${({ modNarrow }) => (modNarrow ? '44rem' : '100%')};
  padding: 6.4rem;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.default.background};
  box-shadow: 0 0 2.4rem rgba(0, 0, 0, 0.1);
  border-radius: ${({ theme }) => theme.borders.radiusLarge};
`;

export interface BoxContainerProps {
  /** Renders a narrow box container (440px max) */
  modNarrow?: boolean;
}

export default BoxContainer;
