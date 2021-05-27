import React from 'react';
import type { FC, AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import MenuItemContainer from '../markup/MenuItemContainer';
import MenuItemElement from '../markup/MenuItemElement';

const MenuItem: FC<MenuItemProps> = ({ children, ...rest }) => {
  const isLink = 'href' in rest && !('disabled' in rest) && !('aria-disabled' in rest);

  return (
    <MenuItemContainer role="none">
      <MenuItemElement role="menuitem" as={isLink ? 'a' : undefined} {...rest}>
        {children}
      </MenuItemElement>
    </MenuItemContainer>
  );
};

type MenuItemProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  ButtonHTMLAttributes<HTMLButtonElement>;

export default MenuItem;
