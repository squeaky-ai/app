import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  type?: 'primary' | 'secondary' | 'tertiary';
  small?: boolean;
  large?: boolean;
}

export const Pill: FC<Props> = ({ children, className, type, small, large, ...rest }) => (
  <span className={classnames('pill', type, className, { small, large })} {...rest}>
    {children}
  </span>
);
