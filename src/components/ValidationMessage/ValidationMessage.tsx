import React from 'react';
import type { FC, HTMLAttributes } from 'react';
import { RiAlertLine } from 'react-icons/ri';
import MessageContainer from './components/MessageContainer';
import MessageContent from './components/MessageContent';

const ValidationMessage: FC<HTMLAttributes<HTMLElement>> = ({ children }) => {
  return (
    <MessageContainer>
      <RiAlertLine />
      <MessageContent>{children}</MessageContent>
    </MessageContainer>
  );
};

export default ValidationMessage;
