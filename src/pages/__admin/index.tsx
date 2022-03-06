import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { sum } from 'lodash';
import { Icon } from 'components/icon';
import { Container } from 'components/container';
import { Error } from 'components/error';
import { Tabs } from 'components/admin/tabs';
import { Spinner } from 'components/spinner';
import { UsersTable } from 'components/admin/users-table';
import { SitesTable } from 'components/admin/sites-table';
import { UsersGrowth } from 'components/admin/users-growth';
import { Logo } from 'components/logo';
import { Main } from 'components/main';
import { SitesGrowth } from 'components/admin/sites-growth';
import { useAdmin } from 'hooks/use-admin';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import type { AdminTab } from 'types/admin';

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

      <header className='header'>
        <a href='/' className='logo'>
          <Logo logo='main' height={32} width={103} />
        </a>
      </header>

      <Main>
        <Container className='lg centered'>
          <h3>
            Admin Dashboard
            <div>
              <p>
                Active visitors: <b>{sum(admin.activeVisitorsAdmin.map(m => m.count))}</b>
              </p>
              <span className='divider' />
              <Link href='/sites'>
                <a>
                  Squeaky App
                  <Icon name='arrow-right-line' />
                </a>
              </Link>
            </div>
          </h3> 
          <Tabs tab={tab} setTab={setTab} />

          {loading && (
            <Spinner />
          )}

          {!loading && tab === 'users' && (
            <>
              <UsersGrowth users={admin.usersAdmin} />
              <UsersTable users={admin.usersAdmin} sites={admin.sitesAdmin} />
            </>
          )}

          {!loading && tab === 'sites' && (
            <>
              <SitesGrowth sites={admin.sitesAdmin} />
              <SitesTable sites={admin.sitesAdmin} activeVisitors={admin.activeVisitorsAdmin} />
            </>
          )}
        </Container>
      </Main>
    </>
  );
};

export default Admin;
export { getServerSideProps };
