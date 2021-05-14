import React, { AnchorHTMLAttributes, ButtonHTMLAttributes, FC } from 'react';
import ButtonMarkup, { ButtonMarkupProps } from './components/ButtonMarkup';

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
