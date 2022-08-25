import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Error } from 'components/error';
import { UsersTable } from 'components/admin/users-table';
import { Main } from 'components/main';
import { Input } from 'components/input';
import { BreadCrumbs } from 'components/admin/breadcrumbs';
import { UsersColumns } from 'components/admin/users-columns';
import { PageLoading } from 'components/sites/page-loading';
import { useAdmin } from 'hooks/use-admin';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { useColumns } from 'hooks/use-columns';

const Admin: NextPage<ServerSideProps> = () => {
  const { admin, loading, error } = useAdmin();

  const [search, setSearch] = React.useState<string>('');
  const { columns, columnsReady, setColumns } = useColumns('admin-users');

  if (error) {
    return <Error />;
  }

  return (
    <>
      <Head>
        <title>Squeaky | Admin | Users</title>
      </Head>

      <Main>
        <BreadCrumbs items={[{ name: 'Admin', href: '/__admin/dashboard' }, { name: 'Users' }]} />

        <div className='admin-header'>
          <div className='search'>
            <h4 className='title'>
              Users
            </h4>
            <Input 
              type='text' 
              placeholder='Search...'
              autoComplete='off'
              value={search}
              onChange={event => setSearch(event.target.value)}
            />
          </div>
          <menu>
            <UsersColumns 
              columns={columns}
              setColumns={setColumns}
            />
          </menu>
        </div>

        {loading && (
          <PageLoading />
        )}

        {!loading && columnsReady && (
          <UsersTable
            users={admin.users} 
            sites={admin.sites} 
            search={search}
            columns={columns}
          />
        )}
      </Main>
    </>
  );
};

export default Admin;
export { getServerSideProps };
