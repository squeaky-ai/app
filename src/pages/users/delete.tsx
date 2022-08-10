import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Container } from 'components/container';
import { Main } from 'components/main';
import { DeleteAccount } from 'components/users/delete-account';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

const UsersDelete: NextPage<ServerSideProps> = () => (
  <>
    <Head>
      <title>Squeaky | User - Delete</title>
    </Head>

    <Main>
      <h4 className='title'>Delete Account</h4>

      <Link href='/users/account'>
        <a className='back-to-account'>&lt; <span>Back to Account Settings</span></a>
      </Link>

      <Container className='md'>
        <p><b>You can delete your account at any time, here&apos;s how it works:</b></p>

        <ul className='delete-list'>
          <li>If you only own sites without additional users, they will be deleted immediately, along with your account.</li>
          <li>If you have any additional users added to one or more of the sites you own, you will have the opportunity to view and transfer ownership, or delete the site, once you click the &apos;Delete Account&apos; button below.</li>
          <li>Once your account has been deleted we will email you to confirm.</li>
        </ul>

        <DeleteAccount />
      </Container>
    </Main>
  </>
);

export default UsersDelete;
export { getServerSideProps };
