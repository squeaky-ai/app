import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Error } from 'components/error';
import { UsersTable } from 'components/admin/users-table';
import { Main } from 'components/main';
import { PageSize } from 'components/sites/page-size';
import { BreadCrumbs } from 'components/admin/breadcrumbs';
import { UsersColumns } from 'components/admin/users-columns';
import { PageLoading } from 'components/sites/page-loading';
import { Pagination } from 'components/pagination';
import { Search } from 'components/search';
import { useAdminUsers } from 'hooks/use-admin-users';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { useColumns } from 'hooks/use-columns';
import { AdminUserSort } from 'types/graphql';

const Admin: NextPage<ServerSideProps> = () => {
  const [search, setSearch] = React.useState<string>('');
  const [page, setPage] = React.useState<number>(1);
  const [size, setSize] = React.useState<number>(25);
  const [sort, setSort] = React.useState<AdminUserSort>(AdminUserSort.CreatedAtDesc);

  const { users, loading, error } = useAdminUsers({
    size,
    sort,
    page,
    search,
  });

  const { columns, columnsReady, setColumns } = useColumns('admin-users');

  const handlePageSize = (size: number) => {
    setPage(1);
    setSize(size);
  };

  const handleSort = (sort: AdminUserSort) => {
    setPage(1);
    setSort(sort);
  };

  if (error) {
    return <Error />;
  }

  return (
    <>
      <Head>
        <title>Squeaky | Admin | Users</title>
      </Head>

      <Main>
        <BreadCrumbs items={[{ name: 'Admin', href: '/__admin/dashboard' }, { name: 'Users' }]} />

        <div className='admin-header'>
          <div className='search'>
            <h4 className='title'>
              Users
            </h4>
            <Search
              search={search}
              onSearch={setSearch}
              placeholder='Search names and emails...'
            />
          </div>
          <menu>
            <UsersColumns 
              columns={columns}
              setColumns={setColumns}
            />
          </menu>
        </div>

        {loading && (
          <PageLoading />
        )}

        {!loading && columnsReady && (
          <>
            <UsersTable
              users={users.items} 
              columns={columns}
              sort={sort}
              setSort={handleSort}
            />

            <div className='users-footer'>
              <Pagination 
                currentPage={page} 
                pageSize={users.pagination.pageSize}
                total={users.pagination.total}
                setPage={setPage}
              />
              <PageSize 
                value={users.pagination.pageSize} 
                onChange={handlePageSize}
                show={users.pagination.total > 25}
              />
            </div>
          </>
        )}
      </Main>
    </>
  );
};

export default Admin;
export { getServerSideProps };
