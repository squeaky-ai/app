import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Illustration } from 'components/illustration';
import { Container } from 'components/container';

const InternalServerError: NextPage = () => (
  <>
    <Head>
      <title>Squeaky | Internal Server Error</title>
    </Head>

    <Container className='lg error-state'>
      <Container className='md'>
        <Illustration illustration='illustration-10' height={256} width={256} alt='Error state' />
        <h2>500</h2>
        <p>A internal server error has occurred.</p>
        <a href='/' className='button primary'>
          Back to home
        </a>
      </Container>
    </Container>
  </>
);

export default InternalServerError;
