import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Error } from 'components/error';
import { Main } from 'components/main';
import { BreadCrumbs } from 'components/admin/breadcrumbs';
import { SiteBundlesItem } from 'components/admin/site-bundles-item';
import { SitesColumns } from 'components/admin/sites-columns';
import { SitesType } from 'components/admin/sites-type';
import { PageLoading } from 'components/sites/page-loading';
import { PageProps } from 'types/page';
import { useAdminSitesBundles } from 'hooks/use-admin-sites-bundles';
import { useColumns } from 'hooks/use-columns';
import { AdminSiteSort } from 'types/graphql';

const AdminSitesBundles: NextPage<PageProps> = () => {
  const [sort, setSort] = React.useState<AdminSiteSort>(AdminSiteSort.CreatedAtDesc);

  const { columns, columnsReady, setColumns } = useColumns('admin-sites');
  const { bundles, loading, error } = useAdminSitesBundles();

  if (error) {
    return <Error />;
  }

  return (
    <>
      <Head>
        <title>Squeaky | Admin | Sites | Bundles</title>
      </Head>

      <Main>
        <BreadCrumbs items={[{ name: 'Admin', href: '/__admin/dashboard' }, { name: 'Sites' }, { name: 'Bundles' }]} />

        <div className='admin-header'>
          <div className='search'>
            <h4 className='title'>
              Sites
            </h4>
          </div>
          <menu>
            <SitesColumns 
              columns={columns}
              setColumns={setColumns}
            />
            <SitesType />
          </menu>
        </div>

        {loading && (
          <PageLoading />
        )}

        {!loading && columnsReady &&(
          <div className='site-bundles'>
            {bundles.length === 0 && (
              <p>No bundles configured...</p>
            )}
      
            {bundles.map(bundle => (
              <SiteBundlesItem
                key={bundle.id}
                bundle={bundle} 
                activeVisitors={[]}
                columns={columns}
                sort={sort}
                setSort={setSort}
              />
            ))}
          </div>
        )}
      </Main>
    </>
  );
};

export default AdminSitesBundles;
