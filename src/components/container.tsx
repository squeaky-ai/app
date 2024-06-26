import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const Container: FC<Props> = ({ children, className, ...rest }) => (
  <div className={classnames('container', className)} {...rest}>
    {children}
  </div>  
);
