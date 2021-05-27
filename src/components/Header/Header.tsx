import React from 'react';
import type { FC } from 'react';
import { RiAccountCircleLine } from 'react-icons/ri';
import Logo from 'components/Logo';
import Menu from 'components/Menu';
import HeaderContainer from './components/HeaderContainer';

const Header: FC = () => (
  <HeaderContainer>
    <Logo aria-label="Squeaky" />
    <Menu
      label={<RiAccountCircleLine data-header-account-icon aria-label="Account settings" />}
      modNakedTrigger
    >
      <Menu.Item href="/me/settings">Account settings</Menu.Item>
      <Menu.Item href="/logout">Logout</Menu.Item>
      <Menu.Separator />
    </Menu>
  </HeaderContainer>
);

export default Header;
