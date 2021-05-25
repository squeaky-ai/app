import React from 'react';
import type { FC } from 'react';
import { User } from 'react-feather';
import Logo from 'components/Logo';
import Menu from 'components/Menu';
import HeaderContainer from './components/HeaderContainer';

const Header: FC = () => (
  <HeaderContainer>
    <Logo aria-label="Squeaky" />
    <Menu
      items={{
        settings: { children: 'Account settings', href: '/me/settings' },
        // eslint-disable-next-line sort-keys
        logout: { children: 'Logout', href: '/logout' },
      }}
      label={<User aria-label="Account settings" />}
      modNakedTrigger
    />
  </HeaderContainer>
);

export default Header;
