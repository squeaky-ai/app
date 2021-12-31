import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import classnames from 'classnames';
import { EmptyState } from 'components/sites/empty-state';
import { Main } from 'components/main';
import { Page } from 'components/sites/page';
import { Unlock } from 'components/sites/unlock';
import { SentimentTabs } from 'components/sites/feedback/sentiment-tabs';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { Sentiment } from 'components/sites/feedback/sentiment';
import { BreadCrumbs } from 'components/sites/breadcrumbs';

const SitesFeedbackSentiment: NextPage<ServerSideProps> = ({ user }) => {
  return (
    <>
      <Head>
        <title>Squeaky | Feedback | Sentiment</title>
      </Head>

      <Page user={user} scope={[]}>
        {({ site }) => (
          <Main className={classnames({ empty: !site.verifiedAt })}>
            <BreadCrumbs site={site} items={[{ name: 'Feedback' }, { name: 'Sentiment' }]} />

            <h3 className='title'>Sentiment</h3>

            <EmptyState
              title='Awaiting tracking code installation'
              subtitle='Collecting Visitor Feedback'
              illustration={9}
              videoName='Feedback Intro'
            />

            <Unlock site={site} />

            {!!site.verifiedAt && (
              <>
                <SentimentTabs siteId={site.id} page='feedback' />
                <Sentiment />
              </>
            )}
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesFeedbackSentiment;
export { getServerSideProps };
