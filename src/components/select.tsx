import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Icon } from 'components/icon';

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  invalid?: boolean;
  selectClassName?: string;
}

export const Select: FC<Props> = ({ children, className, selectClassName, invalid, style, ...rest }) => (
  <div className={classnames('select', className, { invalid })} style={style}>
    <select className={classnames(selectClassName)} {...rest}>
      {children}
    </select>
    <Icon name='arrow-drop-down-line' />
  </div>
);

export const Option: FC<React.OptionHTMLAttributes<HTMLOptionElement>> = ({ children, ...rest }) => (
  <option {...rest}>
    {children}
  </option>
);
