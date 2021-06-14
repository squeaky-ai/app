import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const Divider: FC<Props> = ({ className, ...rest }) => (
  <div className={classnames('divider', className)} {...rest} />
);
