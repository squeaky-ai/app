import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import classnames from 'classnames';
import { Main } from 'components/main';
import { Page } from 'components/sites/page';
import { EmptyState } from 'components/sites/empty-state';
import { Unlock } from 'components/sites/unlock';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { NpsTabs } from 'components/sites/feedback/nps-tabs';
import { Nps } from 'components/sites/feedback/nps';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

const SitesFeedbackNps: NextPage<ServerSideProps> = ({ user }) => {
  return (
    <>
      <Head>
        <title>Squeaky | Feedback | NPS</title>
      </Head>

      <Page user={user} scope={[]}>
        {({ site }) => (
          <Main className={classnames({ empty: !site.verifiedAt })}>
            <BreadCrumbs site={site} items={[{ name: 'Feedback' }, { name: 'NPS Score®' }]} />

            <h3 className='title'>Net Promoter Score®</h3>

            <EmptyState
              title='Awaiting tracking code installation'
              subtitle='Collecting Session Recordings'
              illustration={9}
              videoName='Feedback Intro'
            />

            <Unlock site={site} page='nps' />

            {!!site.verifiedAt && (
              <>
                <NpsTabs siteId={site.id} page='feedback' />
                <Nps />
              </>
            )}
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesFeedbackNps;
export { getServerSideProps };
