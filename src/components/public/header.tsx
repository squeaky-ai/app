import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header as BaseHeader } from 'components/header';
import type { User } from 'types/user';

interface Props {
  user?: User;
}

export const Header: FC<Props> = ({ user }) => (
  <BaseHeader className='public-header transparent'>
    <Link href='/'>
      <a className='logo'>
        <Image src='/logo.svg' height={48} width={158} alt='Squeaky logo' />
      </a>
    </Link>

    {user
      ? <p>Welcome back, <Link href='/sites'><a>Go to app</a></Link></p>
      : <span>Already have an account? <Link href='/auth/login'><a>Log in</a></Link>.</span>
    }
  </BaseHeader>
);
