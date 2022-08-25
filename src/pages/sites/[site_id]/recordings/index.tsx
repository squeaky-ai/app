import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import classnames from 'classnames';
import { Main } from 'components/main';
import { EmptyState } from 'components/sites/empty-state';
import { Recordings } from 'components/sites/recordings/recordings';
import { Page } from 'components/sites/page';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { Filters } from 'components/sites/filters/recordings/filters';
import { Tags } from 'components/sites/filters/recordings/tags';
import { RecordingsColumns } from 'components/sites/recordings/recordings-columns';
import { RecordingsBulkActions } from 'components/sites/recordings/recordings-bulk-actions';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { Period } from 'components/sites/period/period';
import { Unlock } from 'components/sites/unlock';
import { FILTERS } from 'data/recordings/constants';
import { useFilters } from 'hooks/use-filters';
import { usePeriod } from 'hooks/use-period';
import { RecordingsSort } from 'types/graphql';
import { useSort } from 'hooks/use-sort';
import { useColumns } from 'hooks/use-columns';
import type { RecordingsFilters } from 'types/graphql';
import type { ValueOf } from 'types/common';

const SitesRecordings: NextPage<ServerSideProps> = ({ user }) => {
  const [selected, setSelected] = React.useState<string[]>([]);

  const [page, setPage] = React.useState<number>(1);
  const [size, setSize] = React.useState<number>(25);

  const { period, setPeriod } = usePeriod('recordings');
  const { sort, setSort } = useSort<RecordingsSort>('recordings');
  const { filters, setFilters } = useFilters<RecordingsFilters>('recordings');
  const { columns, columnsReady, setColumns } = useColumns('recordings');

  const updateFilters = (key: keyof RecordingsFilters, value: ValueOf<RecordingsFilters>) => {
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

  const handleSort = (sort: RecordingsSort) => {
    setPage(1);
    setSort(sort);
  };

  return (
    <>
      <Head>
        <title>Squeaky | Site Recordings</title>
      </Head>

      <Page user={user} scope={[]}>
        {({ site, member }) => (
          <Main className={classnames({ empty: site.recordingsCount === 0 })}>
            <BreadCrumbs site={site} items={[{ name: 'Recordings' }]} />

            <div className='recordings-header'>
              <h4 className='title'>Recordings</h4>
              <menu>
                {site.recordingsCount > 0 && (
                  <>
                    <Period period={period} onChange={setPeriod} />
                    <RecordingsBulkActions
                      site={site}
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <div className='menu-item columns'>
                      <RecordingsColumns 
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
              title='There are currently no recordings available'
              subtitle='Collecting Session Recordings'
              illustration='illustration-2'
              videoName='Recordings Intro'
              snippet='If you have only recently installed or updated your tracking code it may take up to an hour before new session recordings are available in the recordings page.'
            />

            <Unlock site={site} page='recordings' />

            {site.recordingsCount > 0 && columnsReady && (
              <>
                <Tags 
                  filters={filters} 
                  updateFilters={updateFilters} 
                  clearFilters={clearFilters} 
                />
                
                <Recordings 
                  site={site} 
                  filters={filters}
                  period={period}
                  columns={columns} 
                  member={member}
                  page={page}
                  size={size}
                  sort={sort}
                  selected={selected}
                  setPage={setPage}
                  setSize={handlePageSize}
                  setSort={handleSort}
                  setSelected={setSelected}
                />
              </>
            )}
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesRecordings;
export { getServerSideProps };
