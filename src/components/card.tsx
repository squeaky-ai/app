import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const Card: FC<Props> = ({ children, className, ...rest }) => (
  <div className={classnames('card',  className)} {...rest}>
    {children}
  </div>  
);
