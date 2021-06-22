import React from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { Container } from 'components/container';
import { Main } from 'components/main';
import { Header } from 'components/header';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

const Contact: NextPage<ServerSideProps> = ({ user }) => (
  <div className='page contact'>
    <Head>
      <title>Squeaky / Contact</title>
    </Head>

    <Header className='transparent'>
      <Link href='/'>
        <a className='logo'>
          <Image src='/logo.svg' height={48} width={158} />
        </a>
      </Link>

      {user
        ? <p>Welcome back, <Link href='/sites'><a>Go to app</a></Link></p>
        : <span>Already have an account? <Link href='/auth/login'><a>Log in</a></Link>.</span>
      }
    </Header>

    <Main>
      <Container className='xl'>
        <p>Contact</p>
      </Container>
    </Main>
  </div>
);

export default Contact;
export { getServerSideProps };
