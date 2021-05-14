import styled from 'styled-components';

const InputContainer = styled.div<InputContainerProps>`
  ${({ modSpaceAfter, theme }) =>
    modSpaceAfter && `margin-block-end: ${theme.stack.spacing.default};`}
`;

export interface InputContainerProps {
  /** Renders a space after the input element */
  modSpaceAfter?: boolean;
}

export default InputContainer;
