import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Container } from 'components/container';
import { Main } from 'components/main';
import { Header } from 'components/public/header';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

const Contact: NextPage<ServerSideProps> = ({ user }) => (
  <div className='page contact'>
    <Head>
      <title>Squeaky / Contact</title>
    </Head>

    <Header user={user} />

    <Main>
      <Container className='xl'>
        <p>Contact</p>
      </Container>
    </Main>
  </div>
);

export default Contact;
export { getServerSideProps };
