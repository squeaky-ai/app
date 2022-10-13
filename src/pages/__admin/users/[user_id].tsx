import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Icon } from 'components/icon';
import { Error } from 'components/error';
import { Main } from 'components/main';
import { BreadCrumbs } from 'components/admin/breadcrumbs';
import { User } from 'components/admin/user';
import { Pill } from 'components/pill';
import { PageLoading } from 'components/sites/page-loading';
import { UserPartner } from 'components/admin/user-partner';
import { NotFound } from 'components/sites/not-found';
import { useAdminUser } from 'hooks/use-admin-user';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

const AdminUser: NextPage<ServerSideProps> = () => {
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
            {user?.partner && <Pill className='tertiary'><Icon name='user-star-line' /> Partner</Pill>}
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
            {user?.partner && <UserPartner user={user} />}
          </>
        )}
      </Main>
    </>
  );
};

export default AdminUser;
export { getServerSideProps };
