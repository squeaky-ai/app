import React from 'react';
import type { FC } from 'react';
import { RiErrorWarningLine } from 'react-icons/ri';
import AlertContainer, { AlertContainerProps } from './components/AlertContainer';

type AlertProps = AlertContainerProps & {
  text: string;
}

const Alert: FC<AlertProps> = ({ type, text, ...rest }) => (
  <AlertContainer type={type} {...rest}>
    <RiErrorWarningLine />
    {text}
  </AlertContainer>
);

export default Alert;
