import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image'
import { Container } from 'components/container';
import { Main } from 'components/main';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

const Developers: NextPage<ServerSideProps> = () => (
  <>
    <Head>
      <title>Squeaky | Developers</title>
    </Head>

    <Main>
      <div className='hero'>
        <Link href='/'>
          <a>
            <Image src='/logo.svg' height={48} width={154} alt='Logo' />
          </a>
        </Link>
        <h1>Developers</h1>
        <p>Last Updated: <b>September 1st 2021</b></p>
      </div>
      <Container className='md centered'>

      </Container>
    </Main>
  </>
);

export default Developers;
export { getServerSideProps };
