import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Icon } from 'components/icon';
import { Label } from 'components/label';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Toggle: FC<Props> = ({ className, name, disabled, children, checked, ...rest }) => {
  return (
    <Label className={classnames('toggle', className, { disabled })}>
      <span>{children}</span>
      <div className='toggle-input'>
        <input type='checkbox' name={name} checked={checked} disabled={disabled} {...rest} />
        <div className='status'>
          <Icon name='close-line' className='cross' />
          <Icon name='check-line' className='check' />
        </div>
      </div>
    </Label>
  );
};
