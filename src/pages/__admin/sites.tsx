import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Error } from 'components/error';
import { Spinner } from 'components/spinner';
import { SitesTable } from 'components/admin/sites-table';
import { Main } from 'components/main';
import { Input } from 'components/input';
import { BreadCrumbs } from 'components/admin/breadcrumbs';
import { SitesColumns } from 'components/admin/sites-columns';
import { useAdmin } from 'hooks/use-admin';
import { DEFAULT_SITE_COLUMNS } from 'data/admin/constants';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import type { Column } from 'types/common';

const AdminSites: NextPage<ServerSideProps> = () => {
  const { admin, loading, error } = useAdmin();

  const [search, setSearch] = React.useState<string>('');
  const [columns, setColumns] = React.useState<Column[]>(DEFAULT_SITE_COLUMNS);

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
            <h3 className='title'>
              Sites
            </h3>
            <Input 
              type='text' 
              placeholder='Search...'
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
          <Spinner />
        )}

        {!loading && (
          <SitesTable 
            sites={admin.sites} 
            activeVisitors={admin.activeVisitors}
            search={search}
            columns={columns}
            setColumns={setColumns}
          />
        )}
      </Main>
    </>
  );
};

export default AdminSites;
export { getServerSideProps };
