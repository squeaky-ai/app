import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { Header as BaseHeader } from 'components/header';
import { Button } from 'components/button';
import { Logo } from 'components/logo';
import { Dropdown } from 'components/dropdown';
import { signout } from 'lib/api/auth';

export const Header: FC = ({ children }) => {
  const handleSignOut = async () => {
    await signout();
    location.href = '/';
  };

  return (
    <BaseHeader className='site-header'>
      <Link href='/sites'>
        <a className='logo'>
          <Logo />
        </a>
      </Link>

      {children}

      <Dropdown button={<i className='ri-account-circle-line' />}>
        <Link href='/users/account'>
          <a className='button'>Account Settings</a>
        </Link>
        <Button onClick={handleSignOut}>Log out</Button>
      </Dropdown>
    </BaseHeader>
  );
};