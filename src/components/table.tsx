import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { range } from 'lodash';

interface TableProps extends React.HTMLAttributes<HTMLDivElement> {}

interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  head?: boolean;
  fluid?: boolean;
}

interface CellProps extends React.HTMLAttributes<HTMLDivElement> {}

interface TableWrapperProps extends React.HTMLAttributes<HTMLDivElement> {}

interface RowSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  cellCount: number;
  rowCount: number; 
  rowStyle?: React.CSSProperties;
}

export const Table: FC<TableProps> = ({ children, className, ...rest }) => (
  <div className={classnames('table', className)} {...rest}>
    {children}
  </div>
);

export const Row: FC<RowProps> = ({ children, className, head, fluid, ...rest }) => (
  <div className={classnames('row', className, { head, fluid })} {...rest}>
    {children}
  </div>
);

export const Cell: FC<CellProps> = ({ children, className, ...rest }) => (
  <div className={classnames('cell', className)} {...rest}>
    {children}
  </div>
);

export const TableWrapper: FC<TableWrapperProps> = ({ children, className, ...rest }) => (
  <div className={classnames('table-wrapper', className)} {...rest}>
    {children}
  </div>
);

export const RowSkeleton: FC<RowSkeletonProps> = ({ rowCount, rowStyle, cellCount, className, ...rest }) => (
  <>
    {range(0, rowCount).map(i => (
      <Row key={i} className={classnames(className, 'skeleton')} style={rowStyle} {...rest}>
        {range(0, cellCount).map(j => (
          <Cell key={j}>
            <div className='placeholder' />
          </Cell>
        ))}
      </Row>
    ))}
  </>
);
