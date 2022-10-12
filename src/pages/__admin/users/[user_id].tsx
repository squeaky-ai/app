import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Error } from 'components/error';
import { Main } from 'components/main';
import { BreadCrumbs } from 'components/admin/breadcrumbs';
import { PageLoading } from 'components/sites/page-loading';
import { NotFound } from 'components/sites/not-found';
import { useAdminUser } from 'hooks/use-admin-user';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { User } from 'components/admin/user';

const Admin: NextPage<ServerSideProps> = () => {
  const { user, loading, error } = useAdminUser();

  const fullName = user?.fullName || 'No one';

  if (error) {
    return <Error />;
  } 

  return (
    <>
      <Head>
        <title>Squeaky | Admin | Users | {fullName}</title>
      </Head>

      <Main>
        <BreadCrumbs items={[{ name: 'Admin', href: '/__admin/dashboard' }, { name: 'Users', href: '/__admin/users' }, { name: fullName }]} />

        <div className='admin-header'>
          <h4 className='title'>
            {fullName}
          </h4>
        </div>

        {loading && (
          <PageLoading />
        )}

        {!loading && !user && (
          <NotFound />
        )}

        {user && (
          <>
            <User user={user} />
          </>
        )}
      </Main>
    </>
  );
};

export default Admin;
export { getServerSideProps };
