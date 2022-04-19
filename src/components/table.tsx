import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const Table: FC<Props> = ({ children, className, ...rest }) => (
  <div className={classnames('table', className)} {...rest}>
    {children}
  </div>
);

export const Row: FC<Props & { head?: boolean; fluid?: boolean }> = ({ children, className, head, fluid, ...rest }) => (
  <div className={classnames('row', className, { head, fluid })} {...rest}>
    {children}
  </div>
);

export const Cell: FC<Props> = ({ children, className, ...rest }) => (
  <div className={classnames('cell', className)} {...rest}>
    {children}
  </div>
);

export const TableWrapper: FC<Props> = ({ children, className, ...rest }) => (
  <div className={classnames('table-wrapper', className)} {...rest}>
    {children}
  </div>
);
