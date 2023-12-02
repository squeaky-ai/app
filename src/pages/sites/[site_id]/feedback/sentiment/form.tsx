import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import classnames from 'classnames';
import { Main } from 'components/main';
import { Page } from 'components/sites/page';
import { EmptyState } from 'components/sites/empty-state';
import { Unlock } from 'components/sites/unlock';
import { PageLoading } from 'components/sites/page-loading';
import { Error } from 'components/error';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { SentimentTabs } from 'components/sites/feedback/sentiment-tabs';
import { SentimentForm } from 'components/sites/feedback/sentiment-form';
import { SentimentStatus } from 'components/sites/feedback/sentiment-status';
import { useFeedback } from 'hooks/use-feedback';
import { PageProps } from 'types/page';

const SitesFeedbackNpsForm: NextPage<PageProps> = ({ user }) => {
  const { loading, error, feedback } = useFeedback();

  if (error) {
    return <Error />;
  }

  return (
    <>
      <Head>
        <title>Squeaky | Feedback | Sentiment | Form Options</title>
      </Head>

      <Page user={user} scope={[]}>
        {({ site, member }) => (
          <Main className={classnames({ empty: !site.verifiedAt })}>
            <BreadCrumbs site={site} member={member} items={[{ name: 'Feedback' }, { name: 'Sentiment' }]} />

            <h4 className='title'>
              Net Promoter Score®
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

            {loading && (
              <PageLoading />
            )}

            {!!site.verifiedAt && !loading && (
              <>
                <SentimentTabs siteId={site.id} member={member} page='form' />
                <SentimentForm site={site} feedback={feedback} />
              </>
            )}
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesFeedbackNpsForm;
