import type { AnchorHTMLAttributes, ButtonHTMLAttributes, FC } from 'react';
import React from 'react';
import type { ButtonMarkupProps } from './components/ButtonMarkup';
import ButtonMarkup from './components/ButtonMarkup';

const Button: FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <ButtonMarkup as={'href' in rest ? 'a' : undefined} {...rest}>
      {children}
    </ButtonMarkup>
  );
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement> &
  ButtonMarkupProps;

export default Button;
