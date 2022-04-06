import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
// import { Error } from 'components/error';
// import { Spinner } from 'components/spinner';
import { Page } from 'components/admin/page';
import { BreadCrumbs } from 'components/admin/breadcrumbs';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

const AdminDashboard: NextPage<ServerSideProps> = () => {
  return (
    <>
      <Head>
        <title>Squeaky | Admin | Dashboard</title>
      </Head>

      <Page>
        {({ }) => (
            <>
              <BreadCrumbs items={[{ name: 'Admin' }, { name: 'Dashboard' }]} />

              <h3 className='title'>
                Dashboard
              </h3>
            </>
        )}
      </Page>
    </>
  );
};

export default AdminDashboard;
export { getServerSideProps };
