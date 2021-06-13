import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const Input: FC<Props> = ({ children, className, invalid, ...rest }) => (
  <input className={classnames('input', className, { invalid })} {...rest} />
);
