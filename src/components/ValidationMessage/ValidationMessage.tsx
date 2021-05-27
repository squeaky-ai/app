import React from 'react';
import type { FC, HTMLAttributes } from 'react';
import { RiErrorWarningLine, RiInformationLine } from 'react-icons/ri';
import type { MessageContainerProps } from './components/MessageContainer';
import MessageContainer from './components/MessageContainer';
import MessageContent from './components/MessageContent';

const ValidationMessage: FC<ValidationMessageProps> = ({ children, ...rest }) => {
  const { modInformation, modWarning } = rest;

  return (
    <MessageContainer {...rest}>
      {modInformation && <RiInformationLine data-validationmessage-icon />}
      {modWarning && <RiErrorWarningLine data-validationmessage-icon />}
      <MessageContent>{children}</MessageContent>
    </MessageContainer>
  );
};

type ValidationMessageProps = HTMLAttributes<HTMLElement> & MessageContainerProps;

export default ValidationMessage;
