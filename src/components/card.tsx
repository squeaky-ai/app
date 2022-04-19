import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  loading?: boolean;
}

export const Card: FC<Props> = ({ children, className, loading, ...rest }) => (
  <div className={classnames('card', { skeleton: loading }, className)} {...rest}>
    {loading
      ? null
      : children
    }
  </div>  
);
