import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  type: 'success' | 'info' | 'warning' | 'error';
  message: string | React.ReactNode;
}

export const Message: FC<Props> = ({ children, className, type, message, ...rest }) => (
  <div className={classnames('message', type, className)} {...rest}>
    <i className='ri-error-warning-line' />
    {message}
  </div>  
);
