import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from 'components/container';
import { Header } from 'components/public/header';

const InternalServerError: NextPage = () => (
  <div className='page internal-server-error'>
    <Head>
      <title>Squeaky / 404</title>
    </Head>

    <Header />

    <Container className='lg error-state'>
      <Container className='md'>
        <Image src='/error-state.svg' height={256} width={256} />
        <h2>500</h2>
        <p>A internal server error has occurred.</p>
        <Link href='/'>
          <a className='button primary'>
            Back to home
          </a>
        </Link>
      </Container>
    </Container>
  </div>
);

export default InternalServerError;
