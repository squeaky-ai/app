import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Container } from 'components/container';
import { Main } from 'components/main';
import { Header } from 'components/public/header';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

const Home: NextPage<ServerSideProps> = ({ user }) => (
  <div className='page home'>
    <Head>
      <title>Squeaky</title>
    </Head>

    <Header user={user} />

    <Main>
      <Container className='md centered'>
        <h1>Understand your users.</h1>
        
        <p>Start viewing live or recorded user sessions on your website in minutes, no technical expertise required.</p>
      </Container>
    </Main>
  </div>
);

export default Home;
export { getServerSideProps };
