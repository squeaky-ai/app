import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  type?: 'primary' | 'secondary';
}

export const Pill: FC<Props> = ({ children, className, type, ...rest }) => (
  <span className={classnames('pill', type, className)} {...rest}>
    {children}
  </span>
);
