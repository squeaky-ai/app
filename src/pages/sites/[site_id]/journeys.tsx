import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import classnames from 'classnames';
import { Main } from 'components/main';
import { EmptyState } from 'components/sites/empty-state';
import { Page } from 'components/sites/page';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { Unlock } from 'components/sites/unlock';
import { Journeys } from 'components/sites/journeys/journeys';
import { usePeriod } from 'hooks/use-period';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

const SitesJourneys: NextPage<ServerSideProps> = ({ user }) => {
  const { period, setPeriod } = usePeriod('journeys');
  
  return (
    <>
      <Head>
        <title>Squeaky | Site | Journey</title> 
      </Head>

      <Page user={user} scope={[]}>
        {({ site }) => (
          <Main className={classnames({ empty: site.recordingsCount === 0 })}>
            <BreadCrumbs site={site} items={[{ name: 'Journeys' }]} />

            <div className='heading'>
              <h3 className='title'>Journeys</h3>
            </div>

            <Unlock site={site} page='analytics' />

            <EmptyState
              title='There are currently no journeys available'
              subtitle='Collecting Journey Data'
              illustration='illustration-3'
              videoName='Journey Intro'
            />

            {site.recordingsCount > 0 && (
              <Journeys 
                period={period}
                setPeriod={setPeriod}
              />
            )}
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesJourneys;
export { getServerSideProps };

