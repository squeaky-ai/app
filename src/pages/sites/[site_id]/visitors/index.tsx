import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import classnames from 'classnames';
import { debounce } from 'lodash';
import { Main } from 'components/main';
import { Page } from 'components/sites/page';
import { EmptyState } from 'components/sites/empty-state';
import { Button } from 'components/button';
import { Input } from 'components/input';
import { Visitors } from 'components/sites/visitors/visitors';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { VisitorsColumns } from 'components/sites/visitors/visitors-columns';
import { Filters } from 'components/sites/filters/visitors/filters';
import { Tags } from 'components/sites/filters/visitors/tags';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { FILTERS, COLUMNS, DEFAULT_COLUMNS } from 'data/visitors/constants';
import { getColumnPreferences } from 'lib/tables';
import { useFilters } from 'hooks/use-filters';
import { Preference } from 'lib/preferences';
import type { VisitorsFilters } from 'types/graphql';
import type { Column, ValueOf } from 'types/common';

const SitesVisitors: NextPage<ServerSideProps> = ({ user }) => {
  const [query, setQuery] = React.useState<string>('');
  const [columns, setColumns] = React.useState<Column[]>(DEFAULT_COLUMNS);

  const { filters, setFilters } = useFilters<VisitorsFilters>('visitors');

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

  const updateFilters = (key: keyof VisitorsFilters, value: ValueOf<VisitorsFilters>) => {
    setFilters({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    setFilters(FILTERS);
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
              <h3 className='title'>
                Visitors
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
              illustration={6}
              videoName='Visitors Intro'
            />

            {site.recordingsCount > 0 && (
              <>
                <Tags 
                  filters={filters} 
                  updateFilters={updateFilters} 
                  clearFilters={clearFilters} 
                />

                <Visitors 
                  site={site} 
                  query={query}
                  filters={filters}
                  columns={columns}
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
