import styled, { css } from 'styled-components';

const Text = styled.p<TextProps>`
  ${({ modCenter }) => modCenter && 'text-align: center;'}

  ${({ modSmall }) => modSmall && 'font-size: 1.3rem;'}

  ${({ modSmallSpaceAfter, theme }) =>
    modSmallSpaceAfter && `margin-block-end: ${theme.stack.spacing.small};`}

  ${({ modSmallSpaceBefore, theme }) =>
    modSmallSpaceBefore && `margin-block-start: ${theme.stack.spacing.small};`}

  ${({ modSpaceAfter, theme }) =>
    modSpaceAfter && `margin-block-end: ${theme.stack.spacing.default};`}

  ${({ modSpaceBefore, theme }) =>
    modSpaceBefore && `margin-block-start: ${theme.stack.spacing.default};`}

  ${({ modWarning, theme }) => modWarning && `color: ${theme.colors.default.warning};`}

  ${({ modWideSpaceBefore, theme }) =>
    modWideSpaceBefore && `margin-block-start: ${theme.stack.spacing.wide};`}
`;

interface TextProps {
  /** Renders a centered paragraph */
  modCenter?: boolean;
  /** Renders a small variation of the paragraph */
  modSmall?: boolean;
  /** Renders a small spacing after of the paragraph */
  modSmallSpaceAfter?: boolean;
  /** Renders a small spacing before of the paragraph */
  modSmallSpaceBefore?: boolean;
  /** Renders a spacing after the paragraph */
  modSpaceAfter?: boolean;
  /** Renders a spacing before the paragraph */
  modSpaceBefore?: boolean;
  /** Renders a warning message */
  modWarning?: boolean;
  /** Renders a spacing before the paragraph */
  modWideSpaceBefore?: boolean;
}

export default Text;
