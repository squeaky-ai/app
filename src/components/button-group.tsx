import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const ButtonGroup: FC<Props> = ({ children, className, ...rest }) => (
  <div className={classnames('button-group', className)} {...rest}>
    {children}
  </div>
);
