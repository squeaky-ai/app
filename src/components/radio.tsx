import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Label } from 'components/label';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const Radio: FC<Props> = ({ className, name, children, invalid, checked, ...rest }) => {
  const onKeyDown = (event: React.KeyboardEvent<HTMLLabelElement>) => {
    if (event.code === 'Space') {
      (event.target as HTMLElement).click();
    }
  };

  return (
    <Label className={classnames('radio', className, { invalid })} tabIndex={0} onKeyDown={onKeyDown}>
      <input type='radio' name={name} checked={checked} {...rest} />
      <span className='check' role='radio' aria-checked={checked} />
      <span>{children}</span>
    </Label>
  );
};
