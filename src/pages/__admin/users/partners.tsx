import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Main } from 'components/main';
import { BreadCrumbs } from 'components/admin/breadcrumbs';
import { Error } from 'components/error';
import { PageLoading } from 'components/sites/page-loading';
import { UsersColumns } from 'components/admin/users-columns';
import { UsersType } from 'components/admin/users-type';
import { PageProps } from 'types/page';
import { useColumns } from 'hooks/use-columns';
import { useAdminUsersPartners } from 'hooks/use-admin-users-partners';
import { UsersTable } from 'components/admin/users-table';
import { AdminUserSort } from 'types/graphql';

const AdminUsersPartners: NextPage<PageProps> = () => {
  const { columns, setColumns, columnsReady } = useColumns('admin-users');

  const { users, loading, error } = useAdminUsersPartners();

  if (error) {
    return <Error />;
  }

  return (
    <>
      <Head>
        <title>Squeaky | Admin | Users | Partners</title>
      </Head>

      <Main>
        <BreadCrumbs items={[{ name: 'Admin', href: '/__admin/dashboard' }, { name: 'Users', href: '/__admin/users' }, { name: 'Partners' }]} />

        <div className='admin-header'>
          <div className='search'>
            <h4 className='title'>
              Partners
            </h4>
          </div>
          <menu>
            <UsersColumns 
              columns={columns}
              setColumns={setColumns}
            />
            <UsersType />
          </menu>
        </div>

        {loading && (
          <PageLoading />
        )}

        {!loading && columnsReady && (
          <UsersTable
            users={users} 
            columns={columns}
            sort={AdminUserSort.CreatedAtDesc}
            setSort={() => ''}
          />
        )}
      </Main>
    </>
  );
};

export default AdminUsersPartners;
