import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Error } from 'components/error';
import { SitesTable } from 'components/admin/sites-table';
import { Main } from 'components/main';
import { Search } from 'components/search';
import { BreadCrumbs } from 'components/admin/breadcrumbs';
import { SitesColumns } from 'components/admin/sites-columns';
import { SitesType } from 'components/admin/sites-type';
import { PageSize } from 'components/sites/page-size';
import { PageLoading } from 'components/sites/page-loading';
import { Pagination } from 'components/pagination';
import { useAdminSites } from 'hooks/use-admin-sites';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { useColumns } from 'hooks/use-columns';
import { AdminSiteSort } from 'types/graphql';

const AdminSites: NextPage<ServerSideProps> = () => {
  const [search, setSearch] = React.useState<string>('');
  const [page, setPage] = React.useState<number>(1);
  const [size, setSize] = React.useState<number>(25);
  const [sort, setSort] = React.useState<AdminSiteSort>(AdminSiteSort.CreatedAtDesc);

  const { sites, activeVisitors, loading, error } = useAdminSites({
    size,
    sort,
    page,
    search,
  });

  const { columns, columnsReady, setColumns } = useColumns('admin-sites');

  const handlePageSize = (size: number) => {
    setPage(1);
    setSize(size);
  };

  const handleSort = (sort: AdminSiteSort) => {
    setPage(1);
    setSort(sort);
  };

  if (error) {
    return <Error />;
  }

  return (
    <>
      <Head>
        <title>Squeaky | Admin | Sites | All</title>
      </Head>

      <Main>
        <BreadCrumbs items={[{ name: 'Admin', href: '/__admin/dashboard' }, { name: 'Sites' }, { name: 'All' }]} />

        <div className='admin-header'>
          <div className='search'>
            <h4 className='title'>
              Sites
            </h4>
            <Search
              search={search}
              onSearch={setSearch}
              placeholder='Search names...'
            />
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

        {!loading && columnsReady && (
          <>
            <SitesTable 
              sites={sites.items} 
              activeVisitors={activeVisitors}
              columns={columns}
              sort={sort}
              setSort={handleSort}
            />
            <div className='sites-footer'>
              <Pagination 
                currentPage={page} 
                pageSize={sites.pagination.pageSize}
                total={sites.pagination.total}
                setPage={setPage}
              />
              <PageSize 
                value={sites.pagination.pageSize} 
                onChange={handlePageSize}
                show={sites.pagination.total > 25}
              />
            </div>
          </>
        )}
      </Main>
    </>
  );
};

export default AdminSites;
export { getServerSideProps };
