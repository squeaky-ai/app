import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Label } from 'components/label';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const Checkbox: FC<Props> = ({ className, name, disabled, children, invalid, checked, ...rest }) => {
  const onKeyDown = (event: React.KeyboardEvent<HTMLLabelElement>) => {
    if (event.code === 'Space') {
      (event.target as HTMLElement).click();
    }
  };

  return (
    <Label className={classnames('checkbox', className, { invalid, disabled })} tabIndex={0} onKeyDown={onKeyDown}>
      <input type='checkbox' name={name} checked={checked} disabled={disabled} {...rest} />
      <span className='check' role='checkbox' aria-checked={checked}>
        <i className='ri-check-line' />
      </span>
      <span>{children}</span>
    </Label>
  );
};