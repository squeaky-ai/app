import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Button } from 'components/button';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  description: string;
}

export const ToolbarButton: FC<Props> = ({ children, className, description, ...rest }) => (
  <Button {...rest} className={classnames(className, 'with-hint')} type='button' data-description={description}>
    {children}
  </Button>
);
