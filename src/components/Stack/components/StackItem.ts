import styled from 'styled-components';

const StackItem = styled.div<StackItemProps>`
  &:not(:last-child) {
    margin-block-end: ${({ modSpaceLarge, theme }) =>
      modSpaceLarge ? theme.stack.spacing.large : theme.stack.spacing.default};
  }
`;

export interface StackItemProps {
  /** Renders a larger spacing with the next item */
  modSpaceLarge?: boolean;
}

export default StackItem;
