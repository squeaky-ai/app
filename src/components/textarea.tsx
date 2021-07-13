import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const TextArea: FC<Props> = ({ children, className, invalid, ...rest }) => (
  <textarea className={classnames('textarea', className, { invalid })} {...rest} />
);
