import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Container } from 'components/container';
import { Main } from 'components/main';
import { Header } from 'components/public/header';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { Footer } from 'components/public/footer';

const Terms: NextPage<ServerSideProps> = ({ user }) => (
  <div className='page terms'>
    <Head>
      <title>Squeaky / Terms</title>
    </Head>

    <Header user={user} />

    <Main>
      <Container className='xl'>
        <p>Terms</p>
      </Container>
    </Main>

    <Footer />
  </div>
);

export default Terms;
export { getServerSideProps };
