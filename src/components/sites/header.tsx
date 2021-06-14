import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header as BaseHeader } from '../../components/header';
import { Button } from '../button';
import { Dropdown } from '../dropdown';
import { signout } from '../../lib/api/auth';

export const Header: FC = () => {
  const handleSignOut = async () => {
    await signout();
    location.href = '/';
  };

  return (
    <BaseHeader className='site-header'>
      <Link href='/sites'>
        <a className='logo'>
          <Image src='/logo.svg' height={32} width={103} />
        </a>
      </Link>

      <Dropdown button={<i className='ri-account-circle-line' />}>
        <Link href='/users'>
          <a className='button'>Edit account</a>
        </Link>
        <Button onClick={handleSignOut}>Log out</Button>
      </Dropdown>
    </BaseHeader>
  );
};