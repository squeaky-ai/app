import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const Spinner: FC<Props> = ({ className, ...rest }) => (
  <div className={classnames('spinner', className)} {...rest}>
    <div className='icon'>
      <i className='ri-loader-4-line' />
    </div>
  </div>
);
