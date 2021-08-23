import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Container } from 'components/container';
import { Main } from 'components/main';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

const Contact: NextPage<ServerSideProps> = () => (
  <>
    <Head>
      <title>Squeaky | Contact</title>
    </Head>

    <Main>
      <Container className='xl'>
        <p>Contact</p>
      </Container>

    </Main>
  </>
);

export default Contact;
export { getServerSideProps };
