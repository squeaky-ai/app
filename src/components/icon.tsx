import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  name: string;
}

export const Icon: FC<Props> = ({ name, className, ...rest }) => (
  <i className={classnames('icon', `ri-${name}`, className)} {...rest} />
);
