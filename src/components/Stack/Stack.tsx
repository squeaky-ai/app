import { FC } from 'react';
import StackContainer, { StackContainerProps } from './components/StackContainer';
import StackItem from './components/StackItem';

const Stack: FC<StackContainerProps> & { Item: typeof StackItem } = ({ children, ...rest }) => (
  <StackContainer {...rest}>{children}</StackContainer>
);

Stack.Item = StackItem;

export default Stack;
