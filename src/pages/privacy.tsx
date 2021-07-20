import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Container } from 'components/container';
import { Main } from 'components/main';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

const Privacy: NextPage<ServerSideProps> = () => (
  <div className='page privacy'>
    <Head>
      <title>Squeaky / Privacy</title>
    </Head>

    <Main>
      <Container className='xl'>
        <p>Privacy</p>
      </Container>
    </Main>
  </div>
);

export default Privacy;
export { getServerSideProps };
