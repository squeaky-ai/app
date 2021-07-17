import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { Container } from 'components/container';
import { User } from 'types/user';

interface Props {
  user: User | null;
}

export const Strip: FC<Props> = ({ user }) => (
  <div className='strip'>
    <Container className='xl centered'>
      {user && (
        <>
          <i className='ri-arrow-right-line' />
          <Link href='/sites'><a>Welcome back {user.firstName}, go to app</a></Link>
        </>
      )}

      {!user && (
        <>
          <i className='ri-mail-line' />
          <a href='#'>Contact</a>
          <i className='ri-account-circle-line' />
          <Link href='/auth/login'><a>Login</a></Link>
        </>
      )}
    </Container>
  </div>
);