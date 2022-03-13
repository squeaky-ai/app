import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Error } from 'components/error';
import { Spinner } from 'components/spinner';
import { UsersTable } from 'components/admin/users-table';
import { UsersGrowth } from 'components/admin/users-growth';
import { Page } from 'components/admin/page';
import { useAdmin } from 'hooks/use-admin';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

const Admin: NextPage<ServerSideProps> = () => {
  const { admin, loading, error } = useAdmin();

  if (error) {
    return <Error />;
  }

  return (
    <>
      <Head>
        <title>Squeaky | Admin | Users</title>
      </Head>

      <Page tab='users'>
        {() => (
          <>
            {loading && (
              <Spinner />
            )}

            {!loading && (
              <>
                <UsersGrowth users={admin.usersAdmin} />
                <UsersTable users={admin.usersAdmin} sites={admin.sitesAdmin} />          
              </>
            )}
          </>
        )}
      </Page>
    </>
  );
};

export default Admin;
export { getServerSideProps };
