import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
  unauthorized?: boolean;
}

export const Input: FC<Props> = ({ children, className, invalid, unauthorized, ...rest }) => (
  <input 
    className={classnames('input', className, { invalid, 'is-unauthorized': unauthorized })} 
    {...rest} 
  />
);
