import React from 'react';
import type { FC } from 'react';
import type { BoxContainerProps } from './components/BoxContainer';
import BoxContainer from './components/BoxContainer';

const Box: FC<BoxContainerProps> = ({ children, ...rest }) => (
  <BoxContainer {...rest}>{children}</BoxContainer>
);

export default Box;
