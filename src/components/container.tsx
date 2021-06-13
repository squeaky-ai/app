import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';

type Props = {
  centered?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Container: FC<Props> = ({ children, className,  }) => (
  <div className={classnames('container', className)}>
    {children}
  </div>  
);
