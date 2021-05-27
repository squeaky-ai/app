import React from 'react';
import type { FC, ReactNode, HTMLAttributes } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import Button from 'components/Button';
import { useUniqueId } from 'components/UniqueId';
import { useDropdown } from 'utilities/dropdown';
import MenuContainer from './components/MenuContainer';
import MenuDropdown from './components/MenuDropdown';
import MenuItem from './components/MenuItem';

const Menu: FC<MenuProps> & { Item: typeof MenuItem } = ({
  children,
  label,
  modNakedTrigger,
  ...rest
}) => {
  const menuId = useUniqueId();
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { close, isOpen, menuButtonProps, menuProps, open, ref: menuRef } = useDropdown(menuId);

  return (
    <MenuContainer ref={menuRef} {...rest}>
      <Button
        {...menuButtonProps()}
        modNaked={modNakedTrigger}
        onClick={() => (isOpen ? close() : open())}
      >
        {label}
        <RiArrowDropDownLine data-dropdown-icon role="presentation" />
      </Button>
      {isOpen && <MenuDropdown {...menuProps()}>{children}</MenuDropdown>}
    </MenuContainer>
  );
};

Menu.Item = MenuItem;

interface MenuProps extends HTMLAttributes<HTMLElement> {
  label: ReactNode;
  /** Removes default styles on trigger button */
  modNakedTrigger?: boolean;
}

export default Menu;
