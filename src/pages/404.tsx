import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Container } from 'components/container';
import { BASE_PATH } from 'data/common/constants';

const NotFound: NextPage = () => (
  <>
    <Head>
      <title>Squeaky | Page Not Found</title>
    </Head>

    <Container className='lg error-state'>
      <Container className='md'>
        <Image src={`${BASE_PATH}/error-state.svg`} height={256} width={256} alt='Error state' />
        <h2>404</h2>
        <p>The page you are looking for cannot be found.</p>
        <a href='/' className='button primary'>
          Back to home
        </a>
      </Container>
    </Container>
  </>
);

export default NotFound;
