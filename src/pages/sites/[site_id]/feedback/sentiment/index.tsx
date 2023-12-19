import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import classnames from 'classnames';
import { EmptyState } from 'components/sites/empty-state';
import { Main } from 'components/main';
import { Error } from 'components/error';
import { Page } from 'components/sites/page';
import { Unlock } from 'components/sites/unlock';
import { SentimentTabs } from 'components/sites/feedback/sentiment-tabs';
import { SentimentStatus } from 'components/sites/feedback/sentiment-status';
import { Sentiment } from 'components/sites/feedback/sentiment';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { PageProps } from 'types/page';
import { useFeedback } from 'hooks/use-feedback';

const SitesFeedbackSentiment: NextPage<PageProps> = ({ user }) => {
  const { loading, error, feedback } = useFeedback();

  if (error) {
    return <Error />;
  }

  return (
    <>
      <Head>
        <title>Squeaky | Feedback | Sentiment</title>
      </Head>

      <Page user={user} scope={[]}>
        {({ site, member }) => (
          <Main className={classnames({ empty: !site.verifiedAt })}>
            <BreadCrumbs site={site} member={member} items={[{ name: 'Feedback' }, { name: 'Sentiment' }]} />

            <h4 className='title'>
              Sentiment
              {!loading && feedback && (
                <menu>
                  <SentimentStatus feedback={feedback} site={site} member={member} />
                </menu>
              )}
            </h4>

            <EmptyState
              site={site}
              title='Awaiting tracking code installation'
              illustration='illustration-9'
            />

            <Unlock site={site} />

            {!!site.verifiedAt && (
              <>
                <SentimentTabs siteId={site.id} member={member} page='feedback' />
                <Sentiment site={site} member={member} />
              </>
            )}
          </Main>
        )}
      </Page>
    </>
  );
}

export default SitesFeedbackSentiment;
