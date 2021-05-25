import React from 'react';
import type {
  FC,
  ReactNode,
  HTMLAttributes,
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
} from 'react';
import { ChevronDown, ChevronUp } from 'react-feather';
import Button from 'components/Button';
import { useUniqueId } from 'components/UniqueId';
import { useDropdown } from 'utilities/dropdown';
import MenuContainer from './components/MenuContainer';
import MenuDropdown from './components/MenuDropdown';
import MenuItem from './components/MenuItem';

const Menu: FC<MenuProps> = ({ items, label, modNakedTrigger, ...rest }) => {
  const menuId = useUniqueId();
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    close,
    isOpen,
    menuButtonProps,
    menuItemProps,
    menuProps,
    open,
    ref: menuRef,
  } = useDropdown(menuId);

  return (
    <MenuContainer ref={menuRef} {...rest}>
      <Button
        {...menuButtonProps()}
        modNaked={modNakedTrigger}
        onClick={() => (isOpen ? close() : open())}
      >
        {label}
        {isOpen ? <ChevronUp role="presentation" /> : <ChevronDown role="presentation" />}
      </Button>
      {isOpen && (
        <MenuDropdown {...menuProps()}>
          {Object.entries(items).map(([key, item]) => (
            <MenuItem key={key} {...menuItemProps()} {...item} />
          ))}
        </MenuDropdown>
      )}
    </MenuContainer>
  );
};

interface MenuProps extends HTMLAttributes<HTMLElement> {
  label: ReactNode;
  items: Record<
    string,
    AnchorHTMLAttributes<HTMLAnchorElement> | ButtonHTMLAttributes<HTMLButtonElement>
  >;
  /** Removes default styles on trigger button */
  modNakedTrigger?: boolean;
}

export default Menu;
