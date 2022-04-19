import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { range } from 'lodash';

export const Table: FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...rest }) => {
  return (
    <div className={classnames('table', className)} {...rest}>
      {children}
    </div>
  );
};

export const Row: FC<React.HTMLAttributes<HTMLDivElement> & { head?: boolean, fluid?: boolean }> = ({ children, className, head, fluid, ...rest }) => {
  return (
    <div className={classnames('row', className, { head, fluid })} {...rest}>
      {children}
    </div>
  );
};

export const Cell: FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...rest }) => {
  return (
    <div className={classnames('cell', className)} {...rest}>
      {children}
    </div>
  );
};

export const TableWrapper: FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...rest }) => {
  return (
    <div className={classnames('table-wrapper', className)} {...rest}>
      {children}
    </div>
  );
};

export const RowSkeleton: FC<React.HTMLAttributes<HTMLDivElement> & { count: number }> = ({ count, className, ...rest }) => (
  <>
    {range(0, count).map(i => (
      <Row key={i} className={classnames(className, 'skeleton')} {...rest} />
    ))}
  </>
);
