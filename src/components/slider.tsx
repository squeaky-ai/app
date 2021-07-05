import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Input } from 'components/input';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Slider: FC<Props> = ({ children, className, ...rest }) => (
  <Input className={classnames('slider', className)} {...rest} />
);
