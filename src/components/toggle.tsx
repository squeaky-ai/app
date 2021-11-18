import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Label } from 'components/label';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Toggle: FC<Props> = ({ className, name, disabled, children, checked, ...rest }) => {
  return (
    <Label className={classnames('toggle', className, { disabled })}>
      <span>{children}</span>
      <div className='toggle-input'>
        <input type='checkbox' name={name} checked={checked} disabled={disabled} {...rest} />
        <div className='status'>
          <i className='cross ri-close-line' />
          <i className='check ri-check-line' />
        </div>
      </div>
    </Label>
  );
};
