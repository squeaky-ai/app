import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Unauthorized } from 'components/sites/unauthorized';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { Partner } from 'components/partners/partner';

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
        <Partner />
      )}
    </>
  );
};

export default Partners;
export { getServerSideProps };
