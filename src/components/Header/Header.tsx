import React from 'react';
import type { FC } from 'react';
import Logo from 'components/Logo';
import HeaderContainer from './components/HeaderContainer';

const Header: FC = () => (
  <HeaderContainer>
    <Logo aria-label="Squeaky" />
  </HeaderContainer>
);

export default Header;
