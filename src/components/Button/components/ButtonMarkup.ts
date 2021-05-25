import styled, { css } from 'styled-components';

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
  font-size: ${({ theme }) => theme.typography.sizes.default};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  line-height: ${({ theme }) => theme.typography.lineHeight.condensed};
  text-align: center;
  text-decoration: none;

  &[href] {
    color: ${({ theme }) => theme.colors.default.background};
  }

  &:active,
  &[href]:active {
    background-color: ${({ theme }) => theme.colors.default.primaryDark};
    border-color: ${({ theme }) => theme.colors.default.primaryDark};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: ${({ theme }) => theme.inputs.disabledOpacity};
    pointer-events: hover;
  }

  &:hover:not(:disabled),
  &[href]:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.default.primaryFaded};
    border: ${({ theme }) => theme.borders.defaultSize} solid
      ${({ theme }) => theme.colors.default.primaryDark};
    color: ${({ theme }) => theme.colors.default.background};
  }

  ${({ modFullWidth }) => modFullWidth && 'width: 100%;'}

  ${({ modNaked, theme }) =>
    modNaked &&
    css`
      padding: 1.2rem 0 1rem;
      background: transparent;
      border: 0;
      color: ${theme.colors.default.neutralDark};

      &:active,
      &:hover:not(:disabled) {
        background: transparent;
        border: 0;
        color: inherit;
      }
    `}

  ${({ modSecondary, theme }) =>
    modSecondary &&
    css`
      background-color: ${theme.colors.default.background};
      border-color: ${theme.colors.default.primary};
      color: ${theme.colors.default.neutralDark};

      &:active,
      &:hover:not(:disabled) {
        background-color: ${theme.colors.default.primary};
        border-color: ${theme.colors.default.primary};
        color: ${theme.colors.default.background};
      }
    `}

${({ modTertiary, theme }) =>
    modTertiary &&
    css`
      background-color: ${theme.colors.default.neutralFaded};
      border-color: ${theme.colors.default.neutralFaded};
      color: ${theme.colors.default.neutralDark};

      &:hover:not(:disabled) {
        background-color: ${theme.colors.default.neutralFaded};
        border-color: ${theme.colors.default.neutralFadedDark};
      }
    `}

${({ modWarning, theme }) =>
    modWarning &&
    css`
      background-color: ${theme.colors.default.background};
      border-color: ${theme.colors.default.warning};
      color: ${theme.colors.default.neutralDark};

      &:active,
      &:hover:not(:disabled) {
        background-color: ${theme.colors.default.warning};
        border-color: ${theme.colors.default.warning};
        color: ${theme.colors.default.background};
      }
    `}
`;

export interface ButtonMarkupProps {
  /** Renders a full-width button variation */
  modFullWidth?: boolean;
  /** Renders a button without the default styles */
  modNaked?: boolean;
  /** Renders the Secondary button variation */
  modSecondary?: boolean;
  /** Renders the Tertiary button variation */
  modTertiary?: boolean;
  /** Renders the Warning button variation */
  modWarning?: boolean;
}

export default ButtonMarkup;
