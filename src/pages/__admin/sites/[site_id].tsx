import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Error } from 'components/error';
import { PageLoading } from 'components/sites/page-loading';
import { Main } from 'components/main';
import { NotFound } from 'components/sites/not-found';
import { BreadCrumbs } from 'components/admin/breadcrumbs';
import { useAdminSite } from 'hooks/use-admin-site';
import { SiteDetails } from 'components/admin/site-details';
import { SiteSubscription } from 'components/admin/site-subscription';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

const AdminSite: NextPage<ServerSideProps> = () => {
  const { admin, loading, error } = useAdminSite();

  if (error) {
    return <Error />;
  }

  const hasBilling = !!admin.site?.billing;
  const isEnterprise = admin.site?.plan?.enterprise;

  return (
    <>
      <Head>
        <title>Squeaky | Admin | Site</title>
      </Head>

      <Main>
        <BreadCrumbs items={[
          { name: 'Admin', href: '/__admin/dashboard' }, 
          { name: 'Sites', href: '/__admin/sites' },
          { name: admin.site?.name || 'Unknown' },
        ]} />

        {loading && (
          <PageLoading />
        )}
        
        {!loading && !admin.site && (
          <NotFound />
        )}

        {admin.site && (
          <>
            <h4 className='title'>
              {admin.site.name}
            </h4>

            <div className='site-card'>
              <SiteDetails 
                site={admin.site}
                activeVisitors={admin.activeVisitors}
              />

              <SiteSubscription 
                site={admin.site}
                hasBilling={hasBilling}
                isEnterprise={isEnterprise}
              />
            </div>
          </>
        )}
      </Main>
    </>
  );
};

export default AdminSite;
export { getServerSideProps };
