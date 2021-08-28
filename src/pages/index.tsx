import React from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { Container } from 'components/container';
import { ServerSideProps, getServerSideProps } from 'lib/auth';


const Home: NextPage<ServerSideProps> = ({ user }) => (
  <Container className='xl centered'>
    {user && (
      <p>
        <Link href='/sites'><a>Go to app</a></Link>
      </p>
    )}

    {!user && (
      <p>
        <Link href='/auth/login'><a>Login</a></Link> | <Link href='/auth/signup'><a>Signup</a></Link>
      </p>
    )}
  </Container>
);

export default Home;
export { getServerSideProps };
