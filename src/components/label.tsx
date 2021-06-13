import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label: FC<Props> = ({ children, className, ...rest }) => (
  <label className={classnames('label', className)} {...rest}>
    {children}
  </label>  
);
