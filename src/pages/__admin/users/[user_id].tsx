import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import classnames from 'classnames';
import { Icon } from 'components/icon';
import { Error } from 'components/error';
import { Main } from 'components/main';
import { BreadCrumbs } from 'components/admin/breadcrumbs';
import { User } from 'components/admin/user';
import { Pill } from 'components/pill';
import { PageLoading } from 'components/sites/page-loading';
import { UserPartner } from 'components/admin/user-partner';
import { UserPartnerCreate } from 'components/admin/user-partner-create';
import { NotFound } from 'components/sites/not-found';
import { UserSettings } from 'components/admin/user-settings';
import { useAdminUser } from 'hooks/use-admin-user';
import { PageProps } from 'types/page';

const AdminUser: NextPage<PageProps> = () => {
  const { user, loading, error } = useAdminUser();

  const fullName = user?.fullName || 'No one';
  const isPartner = !!user?.partner;

  if (error) {
    return <Error />;
  } 

  return (
    <>
      <Head>
        <title>Squeaky | Admin | Users | User</title>
      </Head>

      <Main>
        <BreadCrumbs items={[{ name: 'Admin', href: '/__admin/dashboard' }, { name: 'Users', href: '/__admin/users' }, { name: fullName }]} />

        <div className={classnames('admin-header', { partner: isPartner })}>
          <h4 className='title'>{fullName}</h4>
          {isPartner && <Pill className='tertiary'><Icon name='user-star-line' /> Partner</Pill>}
          {!isPartner && <UserPartnerCreate user={user} />}
        </div>

        {loading && (
          <PageLoading />
        )}

        {!loading && !user && (
          <NotFound />
        )}

        {!loading && user && (
          <>
            <User user={user} />
            <UserSettings user={user} />
            {isPartner && <UserPartner user={user} />}
          </>
        )}
      </Main>
    </>
  );
};

export default AdminUser;
