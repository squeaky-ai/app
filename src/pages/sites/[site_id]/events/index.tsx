import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import classnames from 'classnames';
import { Main } from 'components/main';
import { Page } from 'components/sites/page';
import { EmptyState } from 'components/sites/empty-state';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

const SitesEvents: NextPage<ServerSideProps> = ({ user }) => {
  return (
    <>
      <Head>
        <title>Squeaky | Site Events</title>
      </Head>

      <Page user={user} scope={[]}>
        {({ site }) => (
          <Main className={classnames({ empty: site.recordingsCount === 0 })}>
            <BreadCrumbs site={site} items={[{ name: 'Events' }]} />

            <div className='events-header'>
              <h3 className='title'>Events</h3>
            </div>

            <EmptyState
              title='There is currently no events data'
              subtitle='Accessing Events Data'
              illustration='illustration-17'
              videoName='Events Intro'
              snippet='If you have only recently installed or updated your tracking code it may take up to an hour before any event data becomes available for you to manage.'
            />

            {site.recordingsCount > 0 && (
              <>
              
              </>
            )}
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesEvents;
export { getServerSideProps };
