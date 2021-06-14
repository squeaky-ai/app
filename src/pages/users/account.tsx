import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Container } from '../../components/container';
import { Header } from '../../components/sites/header';
import { Tabs } from '../../components/users/tabs';
import { ServerSideProps, getServerSideProps } from '../../lib/auth';

const Users: NextPage<ServerSideProps> = ({ user }) => (
  <div className='page users'>
    <Head>
      <title>Squeaky / User / Account</title>
    </Head>

    <Header />

    <Container className='lg centered'>
      <Tabs user={user} page='account' />
    </Container>
  </div>
);

export default Users;
export { getServerSideProps };
