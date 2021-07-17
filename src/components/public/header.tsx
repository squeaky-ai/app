import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header as BaseHeader } from 'components/header';
import { Container } from 'components/container';
import { Strip } from 'components/public/strip';
import { User } from 'types/user';

interface Props {
  user: User;
}

export const Header: FC<Props> = ({ user }) => (
  <>
    <Strip user={user} />
    <BaseHeader className='public-header'>
      <Container className='xl centered'>
        <Link href='/'>
          <a className='logo'>
            <Image src='/logo.svg' height={32} width={103} alt='Squeaky logo' />
          </a>
        </Link>

        <menu>
          <a href='#recordings'>Recordings</a>
          <a href='#analytics'>Analytics</a>
          <a href='#features'>Features</a>
          <a href='#pricing'>Pricing</a>
          <Link href='/auth/signup'><a className='button primary'>Sign Up</a></Link>
          <a href='#' className='button secondary'>Book Demo</a>
        </menu>
      </Container>
    </BaseHeader>
  </>
);
