import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Label } from 'components/label';
import { Icon } from 'components/icon';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
  checkIcon?: string;
}

export const Radio: FC<Props> = ({ className, name, children, invalid, checked, checkIcon, ...rest }) => {
  const onKeyDown = (event: React.KeyboardEvent<HTMLLabelElement>) => {
    if (event.code === 'Space') {
      (event.target as HTMLElement).click();
    }
  };

  return (
    <Label className={classnames('radio', className, { invalid })} tabIndex={0} onKeyDown={onKeyDown}>
      <input type='radio' name={name} checked={checked} {...rest} />
      <span className='check' role='radio' aria-checked={checked}>
        {checkIcon && checked && <Icon name={checkIcon} />}
      </span>
      <span className='radio-contents'>{children}</span>
    </Label>
  );
};
