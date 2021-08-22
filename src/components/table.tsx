import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';

export const Table: FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className }) => {
  return (
    <div className={classnames('table', className)}>
      {children}
    </div>
  );
};

export const Row: FC<React.HTMLAttributes<HTMLDivElement> & { head?: boolean }> = ({ children, className, head }) => {
  return (
    <div className={classnames('row', className, { head })}>
      {children}
    </div>
  );
};

export const Cell: FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className }) => {
  return (
    <div className={classnames('cell', className)}>
      {children}
    </div>
  );
};
