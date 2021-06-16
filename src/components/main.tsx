import React from 'react';
import type { FC } from 'react';

interface Props extends React.HTMLAttributes<HTMLElement> {}

export const Main: FC<Props> = ({ children, className, ...rest }) => (
  <main id='main' className={className} {...rest}>
    {children}
  </main>  
);
