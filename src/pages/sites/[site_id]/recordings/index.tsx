import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import classnames from 'classnames';
import { debounce } from 'lodash';
import { Main } from 'components/main';
import { EmptyStateHint } from 'components/sites/empty-state-hint';
import { Button } from 'components/button';
import { Input } from 'components/input';
import { Container } from 'components/container';
import { Recordings } from 'components/sites/recordings';
import { Page } from 'components/sites/page';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

const SitesRecordings: NextPage<ServerSideProps> = ({ user }) => {
  const [query, setQuery] = React.useState<string>('');

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

  return (
    <>
      <Head>
        <title>Squeaky | Site Recordings</title>
      </Head>

      <Page user={user} scope={[]}>
        {({ site }) => (
          <Main className={classnames({ empty: site.recordings.items.length === 0 })}>
            <BreadCrumbs site={site} items={[{ name: 'Recordings' }]} />

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

            <Container className='xl centered empty-state'>
              <div className='empty-state-contents'>
                <Image src='/empty-state-2.svg' height={240} width={320} alt='Illustration to represent the empty recordings page' />
                <h4>There are currently no recordings available</h4>
                <EmptyStateHint
                  title='Collecting Session Recordings'
                  body={
                    <>
                      <p>New to Squeaky? Please <Link href={`/sites/${site.id}/settings?tab=code`}><a>install your tracking code</a></Link> to begin recording user sessions for your website or web app.</p>
                      <p>If you have only recently installed or updated your tracking code it may take up to an hour before new session recordings are available in the recordings page.</p>
                    </>
                  }
                />
              </div>
            </Container>

            {!!site.recordings.items.length && (
              <Recordings query={query} />
            )}
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesRecordings;
export { getServerSideProps };
