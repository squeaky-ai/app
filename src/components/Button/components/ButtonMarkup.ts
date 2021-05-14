import styled from 'styled-components';

const ButtonMarkup = styled.button<ButtonMarkupProps>`
  display: inline-block;
  padding: 1.2rem 1.6rem 1rem;
  background-color: ${({ theme }) => theme.colors.default.primary};
  border: ${({ theme }) => theme.borders.defaultSize} solid
    ${({ theme }) => theme.colors.default.primary};
  border-radius: ${({ theme }) => theme.borders.radius};
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.default.background};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.defaultSize};
  line-height: 1;
  text-align: center;
  text-decoration: none;

  &:active {
    background-color: ${({ theme }) => theme.colors.default.primaryDark};
    border-color: ${({ theme }) => theme.colors.default.primaryDark};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: ${({ theme }) => theme.inputs.disabledOpacity};
    pointer-events: hover;
  }

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.default.primaryFaded};
    border: ${({ theme }) => theme.borders.defaultSize} solid
      ${({ theme }) => theme.colors.default.primaryDark};
  }

  ${({ modFullWidth }) => modFullWidth && 'width: 100%;'}
`;

export interface ButtonMarkupProps {
  /** Renders a full-width button variation */
  modFullWidth?: boolean;
}

export default ButtonMarkup;
