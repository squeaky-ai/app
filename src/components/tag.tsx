import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Button } from 'components/button';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  handleDelete: VoidFunction;
}

export const Tag: FC<Props> = ({ handleDelete, className, children, ...rest }) => (
  <div className={classnames('tag', className)} {...rest}>
    <span>{children}</span>
    <Button onClick={handleDelete}>
      <i className='ri-close-line' /> 
    </Button>
  </div>
);
