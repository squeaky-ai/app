import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import classnames from 'classnames';
import { Main } from 'components/main';
import { Page } from 'components/sites/page';
import { EmptyState } from 'components/sites/empty-state';
import { Visitors } from 'components/sites/visitors/visitors';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { VisitorsColumns } from 'components/sites/visitors/visitors-columns';
import { Filters } from 'components/sites/filters/visitors/filters';
import { Unlock } from 'components/sites/unlock';
import { Tags } from 'components/sites/filters/visitors/tags';
import { Period } from 'components/sites/period/period';
import { Search } from 'components/search';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { FILTERS } from 'data/visitors/constants';
import { useFilters } from 'hooks/use-filters';
import { useSort } from 'hooks/use-sort';
import { VisitorsSort } from 'types/graphql';
import { useColumns } from 'hooks/use-columns';
import { usePeriod } from 'hooks/use-period';
import type { VisitorsFilters } from 'types/visitors';
import type { ValueOf } from 'types/common';

const SitesVisitors: NextPage<ServerSideProps> = ({ user }) => {
  const [page, setPage] = React.useState<number>(1);
  const [size, setSize] = React.useState<number>(25);
  const [search, setSearch] = React.useState<string>('');

  const { period, setPeriod } = usePeriod('visitors');

  const { sort, setSort } = useSort<VisitorsSort>('visitors');
  const { filters, setFilters } = useFilters<VisitorsFilters>('visitors');
  const { columns, columnsReady, setColumns } = useColumns('visitors');

  const updateFilters = (key: keyof VisitorsFilters, value: ValueOf<VisitorsFilters>) => {
    setPage(1);
    setFilters({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    setPage(1);
    setFilters(FILTERS);
  };

  const handlePageSize = (size: number) => {
    setPage(1);
    setSize(size);
  };

  const handleSort = (sort: VisitorsSort) => {
    setPage(1);
    setSort(sort);
  };

  return (
    <>
      <Head>
        <title>Squeaky | Site Visitors</title>
      </Head>

      <Page user={user} scope={[]}>
        {({ site, member }) => (
          <Main className={classnames({ empty: site.recordingsCount === 0 })}>
            <BreadCrumbs site={site} items={[{ name: 'Visitors' }]} />

            <div className='visitors-header'>
              <h4 className='title'>Visitors</h4>
              <menu>
                {site.recordingsCount > 0 && (
                  <>
                    <Search
                      search={search}
                      onSearch={setSearch}
                      placeholder='Search ID&apos;s and linked data...'
                    />
                    <Period period={period} onChange={setPeriod} />
                    <div className='menu-item columns'>
                      <VisitorsColumns 
                        columns={columns}
                        setColumns={setColumns}
                      />
                    </div>
                    <Filters
                      period={period}
                      filters={filters}
                      updateFilters={updateFilters}
                    />
                  </>
                )}
              </menu>
            </div>

            <EmptyState
              site={site}
              title='There are currently no visitor records'
              subtitle='Creating Visitor Records'
              illustration='illustration-6'
              videoName='Visitors Intro'
              snippet='If you have only recently installed or updated your tracking code it may take up to an hour before user records become available.'
            />

            <Unlock site={site} />

            {site.recordingsCount > 0 && columnsReady && (
              <>
                <Tags 
                  filters={filters} 
                  updateFilters={updateFilters} 
                  clearFilters={clearFilters} 
                />

                <Visitors 
                  site={site} 
                  member={member}
                  filters={filters}
                  search={search} 
                  columns={columns}
                  size={size}
                  sort={sort}
                  page={page}
                  period={period}
                  setSize={handlePageSize}
                  setSort={handleSort}
                  setPage={setPage}
                />
              </>
            )}
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesVisitors;
export { getServerSideProps };
