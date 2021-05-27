import styled, { css } from 'styled-components';

const MessageContainer = styled.div<MessageContainerProps>`
  position: relative;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  padding: 1rem 1.2rem 1rem 1.8rem;
  max-width: 48rem;
  border: ${({ theme }) => theme.borders.defaultSize} solid
    ${({ theme }) => theme.colors.default.neutralDark};
  border-radius: ${({ theme }) => theme.borders.radiusMedium};

  & [data-validationmessage-icon] {
    flex: 0 0 auto;
    height: 2.4rem;
    margin-right: 0.8rem;
    width: 2.4rem;
    color: ${({ theme }) => theme.colors.default.neutralDark};
  }

  &::before {
    position: absolute;
    bottom: 0;
    left: 0;
    top: 0;
    display: block;
    width: 0.6rem;
    content: '';
    background-color: ${({ theme }) => theme.colors.default.neutralDark};
  }

  ${({ modInformation, theme }) =>
    modInformation &&
    css`
      border-color: ${theme.colors.default.primary};

      & [data-validationmessage-icon] {
        color: ${theme.colors.default.primary};
      }

      &::before {
        background-color: ${theme.colors.default.primary};
      }
    `}

  ${({ modWarning, theme }) =>
    modWarning &&
    css`
      border-color: ${theme.colors.default.warning};

      & [data-validationmessage-icon] {
        color: ${theme.colors.default.warning};
      }

      &::before {
        background-color: ${theme.colors.default.warning};
      }
    `}
`;

export interface MessageContainerProps {
  /** Renders an information message */
  modInformation?: boolean;
  /** Renders an warning message */
  modWarning?: boolean;
}

export default MessageContainer;
