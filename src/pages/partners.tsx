import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Main } from 'components/main';
import { Unauthorized } from 'components/sites/unauthorized';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

const Partners: NextPage<ServerSideProps> = ({ user }) => {
  const isPartner = !!user?.partner;

  return (
    <>
      <Head>
        <title>Squeaky | Partner Program</title>
      </Head>

      {!isPartner && (
        <Unauthorized />
      )}

      {isPartner && (
        <Main>
          <h4 className='title'>Partner Program</h4>
        </Main>
      )}
    </>
  );
};

export default Partners;
export { getServerSideProps };
