import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Container } from 'components/container';
import { Main } from 'components/main';
import { Header } from 'components/public/header';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { Footer } from 'components/public/footer';

const Privacy: NextPage<ServerSideProps> = ({ user }) => (
  <div className='page privacy'>
    <Head>
      <title>Squeaky / Privacy</title>
    </Head>

    <Header user={user} />

    <Main>
      <Container className='xl'>
        <p>Privacy</p>
      </Container>
    </Main>

    <Footer />
  </div>
);

export default Privacy;
export { getServerSideProps };
