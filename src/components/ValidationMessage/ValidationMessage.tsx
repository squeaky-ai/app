import React from 'react';
import type { FC, HTMLAttributes } from 'react';
import { AlertCircle } from 'react-feather';
import MessageContainer from './components/MessageContainer';
import MessageContent from './components/MessageContent';

const ValidationMessage: FC<HTMLAttributes<HTMLElement>> = ({ children }) => {
  return (
    <MessageContainer>
      <AlertCircle />
      <MessageContent>{children}</MessageContent>
    </MessageContainer>
  );
};

export default ValidationMessage;
