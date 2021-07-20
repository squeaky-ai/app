import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Container } from 'components/container';
import { Main } from 'components/main';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

const Terms: NextPage<ServerSideProps> = () => (
  <>
    <Head>
      <title>Squeaky / Terms</title>
    </Head>

    <Main>
      <Container className='xl'>
        <p>Terms</p>
      </Container>
    </Main>
  </>
);

export default Terms;
export { getServerSideProps };
