import React from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { Container } from '../../components/container';
import { Header } from '../../components/sites/header';
import { ServerSideProps, getServerSideProps } from '../../lib/auth';

const Sites: NextPage<ServerSideProps> = ({ user }) => (
  <div className='page sites'>
    <Head>
      <title>Squeaky / Sites</title>
    </Head>

    <Header />

    <Container className='lg centered'>
      <p>Sites</p>
    </Container>
  </div>
);

export default Sites;
export { getServerSideProps };
