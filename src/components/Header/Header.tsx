import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { RiAccountCircleLine } from 'react-icons/ri';
import Logo from 'components/Logo';
import Menu from 'components/Menu';
import HeaderContainer from './components/HeaderContainer';

interface HeaderProps {
  isPublic: boolean;
}

const Header: FC<HeaderProps> = ({ isPublic }) => (
  <HeaderContainer>
    <Link href={isPublic ? '/' : '/sites'}>
      <a>
        <Logo aria-label='Squeaky' height={32} width={103} />
      </a>
    </Link>
    
    <Menu
      label={<RiAccountCircleLine data-header-account-icon aria-label='Account settings' />}
      modNakedTrigger
    >
      <Menu.Item href='/me/settings'>Account settings</Menu.Item>
      <Menu.Item href='/logout'>Logout</Menu.Item>
      <Menu.Separator />
    </Menu>
  </HeaderContainer>
);

export default Header;
