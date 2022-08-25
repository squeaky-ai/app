import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Error } from 'components/error';
import { SitesTable } from 'components/admin/sites-table';
import { Main } from 'components/main';
import { Input } from 'components/input';
import { BreadCrumbs } from 'components/admin/breadcrumbs';
import { SitesColumns } from 'components/admin/sites-columns';
import { PageLoading } from 'components/sites/page-loading';
import { useAdmin } from 'hooks/use-admin';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { useColumns } from 'hooks/use-columns';

const AdminSites: NextPage<ServerSideProps> = () => {
  const { admin, loading, error } = useAdmin();

  const [search, setSearch] = React.useState<string>('');

  const { columns, columnsReady, setColumns } = useColumns('admin-sites');

  if (error) {
    return <Error />;
  }

  return (
    <>
      <Head>
        <title>Squeaky | Admin | Sites</title>
      </Head>

      <Main>
        <BreadCrumbs items={[{ name: 'Admin', href: '/__admin/dashboard' }, { name: 'Sites' }]} />

        <div className='admin-header'>
          <div className='search'>
            <h4 className='title'>
              Sites
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
            <SitesColumns 
              columns={columns}
              setColumns={setColumns}
            />
          </menu>
        </div>

        {loading && (
          <PageLoading />
        )}

        {!loading && columnsReady && (
          <SitesTable 
            sites={admin.sites} 
            activeVisitors={admin.activeVisitors}
            search={search}
            columns={columns}
          />
        )}
      </Main>
    </>
  );
};

export default AdminSites;
export { getServerSideProps };
