import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import classnames from 'classnames';
import { debounce } from 'lodash';
import { Main } from 'components/main';
import { Page } from 'components/sites/page';
import { Button } from 'components/button';
import { Input } from 'components/input';
import { Container } from 'components/container';
import { Visitors } from 'components/sites/visitors/visitors';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { EmptyStateHint } from 'components/sites/empty-state-hint';
import { VisitorsColumns } from 'components/sites/visitors/visitors-columns';
import { Filters } from 'components/sites/filters/visitors/filters';
import { Tags } from 'components/sites/filters/visitors/tags';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { defaultFilters, allColumns } from 'lib/visitors';
import { BASE_PATH } from 'data/common/constants';
import { useFilters } from 'hooks/use-filters';
import { Preferences, Preference } from 'lib/preferences';
import type { Filters as IFilters, Column } from 'types/visitor';
import type { ValueOf } from 'types/common';

const SitesVisitors: NextPage<ServerSideProps> = ({ user }) => {
  const [query, setQuery] = React.useState<string>('');
  const [columns, setColumns] = React.useState<Column[]>(allColumns);

  const { filters, setFilters } = useFilters<IFilters>('visitors');

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

  const updateFilters = (key: keyof IFilters, value: ValueOf<IFilters>) => {
    setFilters({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
  };

  React.useEffect(() => {
    const existing = Preferences.getArray(Preference.VISITORS_COLUMNS);

    if (existing.length > 0) {
      const columns = existing.map(e => allColumns.find(a => a.name === e));
      setColumns(columns);
    }
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

            <Container className='xl centered empty-state'>
              <div className='empty-state-contents'>
                <Image src={`${BASE_PATH}/empty-state-6.svg`} height={240} width={320} alt='Illustration to represent the empty recordings page' />
                <h4>There are currently no visitor records</h4>
                <EmptyStateHint
                  title='Creating Visitor Records'
                  body={
                    <>
                      <p>New to Squeaky? Please <Link href={`/sites/${site.id}/settings/details/tracking-code`}><a>install your tracking code</a></Link> to begin recording user sessions for your website or web app.</p>
                      <p>If you have only recently installed or updated your tracking code it may take up to an hour before user records become available.</p>
                    </>
                  }
                />
              </div>
            </Container>

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
