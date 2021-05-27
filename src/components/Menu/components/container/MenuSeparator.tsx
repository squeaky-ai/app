import React from 'react';
import type { FC } from 'react';
import MenuItemContainer from '../markup/MenuItemContainer';
import MenuSeparatorElement from '../markup/MenuSeparatorElement';

const MenuSeparator: FC = () => (
  <MenuItemContainer role="none">
    <MenuSeparatorElement />
  </MenuItemContainer>
);

export default MenuSeparator;
