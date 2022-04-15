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
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { FILTERS, COLUMNS, DEFAULT_COLUMNS } from 'data/visitors/constants';
import { getColumnPreferences } from 'lib/tables';
import { useFilters } from 'hooks/use-filters';
import { Preference } from 'lib/preferences';
import { useSort } from 'hooks/use-sort';
import { VisitorsSort } from 'types/graphql';
import type { VisitorsFilters } from 'types/graphql';
import type { Column, ValueOf } from 'types/common';

const SitesVisitors: NextPage<ServerSideProps> = ({ user }) => {
  const [columns, setColumns] = React.useState<Column[]>(DEFAULT_COLUMNS);

  const [page, setPage] = React.useState<number>(1);
  const [size, setSize] = React.useState<number>(25);

  const { sort, setSort } = useSort<VisitorsSort>('visitors');
  const { filters, setFilters } = useFilters<VisitorsFilters>('visitors');

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

  React.useEffect(() => {
    getColumnPreferences(Preference.VISITORS_COLUMNS, COLUMNS, setColumns)
  }, []);

  return (
    <>
      <Head>
        <title>Squeaky | Site Visitors</title>
      </Head>

      <Page user={user} scope={[]}>
        {({ site }) => (
          <Main className={classnames({ empty: site.recordingsCount === 0 })}>
            <BreadCrumbs site={site} items={[{ name: 'Visitors' }]} />

            <div className='visitors-header'>
              <h3 className='title'>Visitors</h3>
              <menu>
                {site.recordingsCount > 0 && (
                  <>
                    <div className='menu-item columns'>
                      <VisitorsColumns 
                        columns={columns}
                        setColumns={setColumns}
                      />
                    </div>
                    <Filters 
                      filters={filters}
                      updateFilters={updateFilters}
                    />
                  </>
                )}
              </menu>
            </div>

            <EmptyState
              title='There are currently no visitor records'
              subtitle='Creating Visitor Records'
              illustration='illustration-6'
              videoName='Visitors Intro'
            />

            <Unlock site={site} page='visitors' />

            {site.recordingsCount > 0 && (
              <>
                <Tags 
                  filters={filters} 
                  updateFilters={updateFilters} 
                  clearFilters={clearFilters} 
                />

                <Visitors 
                  site={site} 
                  filters={filters} 
                  columns={columns}
                  size={size}
                  sort={sort}
                  page={page}
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
