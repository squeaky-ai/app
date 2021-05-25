import React from 'react';
import type { FC, HTMLAttributes } from 'react';
import MenuItemContainer from './MenuItemContainer';
import MenuItemElement from './MenuItemElement';

const MenuItem: FC<MenuItemProps> = ({ children, ...rest }) => {
  const restKeys = Object.keys(rest);
  const isLink =
    restKeys.includes('href') &&
    !restKeys.includes('disabled') &&
    !restKeys.includes('aria-disabled');

  return (
    <MenuItemContainer role="none">
      <MenuItemElement as={isLink ? 'a' : undefined} {...rest}>
        {children}
      </MenuItemElement>
    </MenuItemContainer>
  );
};

type MenuItemProps = HTMLAttributes<HTMLAnchorElement | HTMLButtonElement>;

export default MenuItem;
