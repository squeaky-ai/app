import React from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { Container } from '../../components/container';
import { Header } from '../../components/header';
import { ServerSideProps, getServerSideProps } from '../../lib/auth';

const Sites: NextPage<ServerSideProps> = ({ user }) => (
  <div className='page sites'>
    <Head>
      <title>Squeaky / Sites</title>
    </Head>

    <Header>
      <Link href='/sites'>
        <a className='logo'>
          <Image src='/logo.svg' height={32} width={103} />
        </a>
      </Link>

      <span />
    </Header>

    <Container className='lg centered'>
      <p>Sites</p>
    </Container>
  </div>
);

export default Sites;
export { getServerSideProps };
