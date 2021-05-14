import { FC } from 'react';
import BoxContainer, { BoxContainerProps } from './components/BoxContainer';

const Box: FC<BoxContainerProps> = ({ children, ...rest }) => (
  <BoxContainer {...rest}>{children}</BoxContainer>
);

export default Box;
