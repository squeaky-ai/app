import React from 'react';
import type { FC } from 'react';
import Image from 'next/image';
import classnames from 'classnames';

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const Spinner: FC<Props> = ({ className, ...rest }) => (
  <div className={classnames('spinner', className)} {...rest}>
    <Image src='/spinner.svg' height={120} width={120} />
  </div>
);
