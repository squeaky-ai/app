import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Icon } from 'components/icon';
import { Container } from 'components/container';
import { Error } from 'components/error';
import { Tabs } from 'components/admin/tabs';
import { Spinner } from 'components/spinner';
import { UsersTable } from 'components/admin/users-table';
import { SitesTable } from 'components/admin/sites-table';
import { useAdmin } from 'hooks/use-admin';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import type { AdminTab } from 'types/admin';
import { UsersGrowth } from 'components/admin/users-growth';

const Admin: NextPage<ServerSideProps> = () => {
  const [tab, setTab] = React.useState<AdminTab>('users');

  const { admin, loading, error } = useAdmin();

  if (error) {
    return <Error />;
  }

  return (
    <>
      <Head>
        <title>Squeaky | Admin</title>
      </Head>

      <Container className='lg centered'>
        <h3>
          Admin Dashboard
          <Link href='/sites'>
            <a>
              Squeaky App
              <Icon name='arrow-right-line' />
            </a>
          </Link>
        </h3> 
        <Tabs tab={tab} setTab={setTab} />

        {loading && (
          <Spinner />
        )}

        {!loading && tab === 'users' && (
          <>
            <UsersGrowth users={admin.usersAdmin} />
            <UsersTable users={admin.usersAdmin} />
          </>
        )}

        {!loading && tab === 'sites' && (
          <SitesTable sites={admin.sitesAdmin} />
        )}
      </Container>
    </>
  );
};

export default Admin;
export { getServerSideProps };
