import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: FC<Props> = ({ children, className, ...rest }) => (
  <button className={classnames('button', className)} {...rest}>
    {children}
  </button>  
);
