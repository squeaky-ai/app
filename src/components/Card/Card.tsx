import React from 'react';
import type { FC } from 'react';
import type { CardContainerProps } from './components/CardContainer';
import CardContainer from './components/CardContainer';

const Card: FC<CardContainerProps> = ({ children, ...rest }) => (
  <CardContainer {...rest}>{children}</CardContainer>
);

export default Card;
