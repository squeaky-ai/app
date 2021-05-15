import React from 'react';
import type { FC } from 'react';
import type { StackContainerProps } from './components/StackContainer';
import StackContainer from './components/StackContainer';
import StackItem from './components/StackItem';

const Stack: FC<StackContainerProps> & { Item: typeof StackItem } = ({ children, ...rest }) => (
  <StackContainer {...rest}>{children}</StackContainer>
);

Stack.Item = StackItem;

export default Stack;
