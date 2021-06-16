import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from '../../components/button';
import { Container } from '../../components/container';
import { Main } from '../../components/main';
import { Header } from '../../components/sites/header';
import { ServerSideProps, getServerSideProps } from '../../lib/auth';

const UsersDelete: NextPage<ServerSideProps> = ({ user }) => (
  <div className='page user delete'>
    <Head>
      <title>Squeaky / User / Delete</title>
    </Head>

    <Header />

    <Main>
      <h3 className='title'>Delete Account</h3>

      <Link href='/users/account'>
        <a className='back-to-account'>&lt; <span>Back to Account Settings</span></a>
      </Link>

      <Container className='md'>
        <p><b>You can delete your account at any time, here’s how it works:</b></p>
        <ul className='delete-list'>
          <li>If you only own sites without additional users, they will be deleted immediately, along with your account.</li>
          <li>If you have any additional users added to one or more of the sites you own, you will have the opportunity to view and transfer ownership, or delete the site, once you click the ‘Delete Account’ button below.</li>
          <li>Once your account has been deleted we will email you to confirm.</li>
        </ul>

        <Button className='tertiary delete-account'>
          Delete Account
        </Button>
      </Container>
    </Main>
  </div>
);

export default UsersDelete;
export { getServerSideProps };
