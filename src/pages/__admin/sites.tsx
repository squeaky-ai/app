import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Error } from 'components/error';
import { Spinner } from 'components/spinner';
import { SitesTable } from 'components/admin/sites-table';
import { SitesGrowth } from 'components/admin/sites-growth';
import { Page } from 'components/admin/page';
import { useAdmin } from 'hooks/use-admin';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

const AdminSites: NextPage<ServerSideProps> = () => {
  const { admin, loading, error } = useAdmin();

  if (error) {
    return <Error />;
  }

  return (
    <>
      <Head>
        <title>Squeaky | Admin | Sites</title>
      </Head>

      <Page tab='sites'>
        {({ activeVisitorCount }) => (
            <>
              {loading && (
                <Spinner />
              )}

              {!loading && (
                <>
                  <SitesGrowth sites={admin.sitesAdmin} />
                  <SitesTable sites={admin.sitesAdmin} activeVisitors={activeVisitorCount} />       
                </>
              )}
            </>
        )}
      </Page>
    </>
  );
};

export default AdminSites;
export { getServerSideProps };
