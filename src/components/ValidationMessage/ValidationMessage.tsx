import React from 'react';
import type { FC, HTMLAttributes } from 'react';
import { RiErrorWarningLine } from 'react-icons/ri';
import MessageContainer from './components/MessageContainer';
import MessageContent from './components/MessageContent';

const ValidationMessage: FC<HTMLAttributes<HTMLElement>> = ({ children }) => {
  return (
    <MessageContainer>
      <RiErrorWarningLine data-validationmessage-icon />
      <MessageContent>{children}</MessageContent>
    </MessageContainer>
  );
};

export default ValidationMessage;
