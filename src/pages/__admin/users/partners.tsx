import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Main } from 'components/main';
import { BreadCrumbs } from 'components/admin/breadcrumbs';
import { UsersColumns } from 'components/admin/users-columns';
import { UsersType } from 'components/admin/users-type';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { useColumns } from 'hooks/use-columns';

const AdminUsersPartners: NextPage<ServerSideProps> = () => {
  const { columns, setColumns } = useColumns('admin-users');

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
      </Main>
    </>
  );
};

export default AdminUsersPartners;
export { getServerSideProps };
