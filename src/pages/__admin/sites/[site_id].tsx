import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Error } from 'components/error';
import { PageLoading } from 'components/sites/page-loading';
import { Main } from 'components/main';
import { NotFound } from 'components/sites/not-found';
import { BreadCrumbs } from 'components/admin/breadcrumbs';
import { useAdmin } from 'hooks/use-admin';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { useRouter } from 'next/router';

const AdminSite: NextPage<ServerSideProps> = () => {
  const router = useRouter();
  const { admin, loading, error } = useAdmin();

  if (error) {
    return <Error />;
  }

  const site = admin.sites.find(site => site.id === router.query.site_id);

  return (
    <>
      <Head>
        <title>Squeaky | Admin | Site | {site?.name}</title>
      </Head>

      <Main>
        <BreadCrumbs items={[
          { name: 'Admin', href: '/__admin/dashboard' }, 
          { name: 'Sites', href: '/__admin/sites' },
          { name: site?.name || 'Unknown' },
        ]} />

        {loading && (
          <PageLoading />
        )}
        
        {!loading && !site && (
          <NotFound />
        )}

        {site && (
          <>
            <h3 className='title'>
              {site.name}
            </h3>
          </>
        )}
      </Main>
    </>
  );
};

export default AdminSite;
export { getServerSideProps };
