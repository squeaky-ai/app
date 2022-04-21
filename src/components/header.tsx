import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';

type Props = {
  className?: string;
  children: React.ReactNode;
}

export const Header: FC<Props> = ({ children, className }) => (
  <header className={classnames('header', className)}>
    {children}
  </header>  
);
