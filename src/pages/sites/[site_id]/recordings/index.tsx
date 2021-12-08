import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import classnames from 'classnames';
import { debounce } from 'lodash';
import { Main } from 'components/main';
import { EmptyState } from 'components/sites/empty-state';
import { Button } from 'components/button';
import { Input } from 'components/input';
import { Recordings } from 'components/sites/recordings/recordings';
import { Page } from 'components/sites/page';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { Filters } from 'components/sites/filters/recordings/filters';
import { Tags } from 'components/sites/filters/recordings/tags';
import { RecordingsColumns } from 'components/sites/recordings/recordings-columns';
import { RecordingsBulkActions } from 'components/sites/recordings/recordings-bulk-actions';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { FILTERS, COLUMNS } from 'data/recordings/constants';
import { Preference } from 'lib/preferences';
import { getColumnPreferences } from 'lib/tables';
import { useFilters } from 'hooks/use-filters';
import type { RecordingsFilters } from 'types/graphql';
import type { Column, ValueOf } from 'types/common';

const SitesRecordings: NextPage<ServerSideProps> = ({ user }) => {
  const [query, setQuery] = React.useState<string>('');
  const [columns, setColumns] = React.useState<Column[]>(COLUMNS);
  const [selected, setSelected] = React.useState<string[]>([]);

  const { filters, setFilters } = useFilters<RecordingsFilters>('recordings');

  const handleCancel = () => {
    setQuery('');

    const search = document.querySelector<HTMLInputElement>('#search');
    search.value = '';
    search.focus();
  };

  const handleSearch = debounce((event: React.KeyboardEvent<HTMLInputElement>) => {
    const element = event.target as HTMLInputElement;
    setQuery(element.value);
  }, 200);

  const updateFilters = (key: keyof RecordingsFilters, value: ValueOf<RecordingsFilters>) => {
    setFilters({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    setFilters(FILTERS);
  };

  React.useEffect(() => {
    getColumnPreferences(Preference.RECORDINGS_COLUMNS, COLUMNS, setColumns);
  }, []);

  return (
    <>
      <Head>
        <title>Squeaky | Site Recordings</title>
      </Head>

      <Page user={user} scope={[]}>
        {({ site }) => (
          <Main className={classnames({ empty: site.recordingsCount === 0 })}>
            <BreadCrumbs site={site} items={[{ name: 'Recordings' }]} />

            <div className='recordings-header'>
              <h3 className='title'>
                Recordings
                <div className='search' role='search' aria-label='Filter recordings'>
                  <Input type='search' placeholder='Search...' onKeyUp={handleSearch} id='search' />
                  {query && (
                    <Button onClick={handleCancel}>
                      <i className='ri-close-line' />
                    </Button>
                  )}
                  <i className='ri-search-line' /> 
                </div>
              </h3>
              <menu>
                {site.recordingsCount > 0 && (
                  <>
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
              illustration={2}
              videoName='Recordings Intro'
            />

            {site.recordingsCount > 0 && (
              <>
                <Tags 
                  filters={filters} 
                  updateFilters={updateFilters} 
                  clearFilters={clearFilters} 
                />
                
                <Recordings 
                  site={site}
                  query={query} 
                  filters={filters} 
                  columns={columns} 
                  selected={selected}
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
