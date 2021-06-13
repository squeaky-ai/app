import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Label } from './label';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const Checkbox: FC<Props> = ({ className, name, children, invalid, ...rest }) => (
  <Label className={classnames('checkbox', className, { invalid })}>
    <input type='checkbox' name={name} {...rest} />
    <span className='check'>
      <i className='ri-check-line' />
    </span>
    <span>{children}</span>
  </Label>
);
