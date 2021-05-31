import React from 'react';
import type { FC } from 'react';
import type { WrapperContainerProps } from './components/WrapperContainer';
import WrapperContainer from './components/WrapperContainer';

const Wrapper: FC<WrapperContainerProps> = ({ children, ...rest }) => (
  <WrapperContainer {...rest}>{children}</WrapperContainer>
);

export default Wrapper;
