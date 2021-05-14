import styled from 'styled-components';

const Text = styled.p<TextProps>`
  ${({ modCenter }) => modCenter && `text-align: center;`}

  ${({ modSpaceAfter, theme }) =>
    modSpaceAfter && `margin-block-end: ${theme.stack.spacing.default};`}

  ${({ modSpaceBefore, theme }) =>
    modSpaceBefore && `margin-block-start: ${theme.stack.spacing.default};`}

  ${({ modWideSpaceBefore, theme }) =>
    modWideSpaceBefore && `margin-block-start: ${theme.stack.spacing.wide};`}
`;

interface TextProps {
  /** Renders a centered paragraph */
  modCenter?: boolean;
  /** Renders a spacing after the paragraph */
  modSpaceAfter?: boolean;
  /** Renders a spacing before the paragraph */
  modSpaceBefore?: boolean;
  /** Renders a spacing before the paragraph */
  modWideSpaceBefore?: boolean;
}

export default Text;
