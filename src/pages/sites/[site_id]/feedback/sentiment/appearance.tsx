import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import classnames from 'classnames';
import { Illustration } from 'components/illustration';
import { Main } from 'components/main';
import { Page } from 'components/sites/page';
import { Error } from 'components/error';
import { Container } from 'components/container';
import { PageLoading } from 'components/sites/page-loading';
import { EmptyStateHint } from 'components/sites/empty-state-hint';
import { SentimentTabs } from 'components/sites/feedback/sentiment-tabs';
import { SentimentAppearance } from 'components/sites/feedback/sentiment-appearance';
import { SentimentStatus } from 'components/sites/feedback/sentiment-status';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { useFeedback } from 'hooks/use-feedback';

const SitesFeedbackSentimentAppearance: NextPage<ServerSideProps> = ({ user }) => {
  const { loading, error, feedback, locale, setLocale } = useFeedback();

  if (error) {
    return <Error />;
  }

  return (
    <>
      <Head>
        <title>Squeaky | Feedback | Sentiment | Appearance</title>
      </Head>

      <Page user={user} scope={[]}>
        {({ site }) => (
          <Main className={classnames({ empty: !site.verifiedAt })}>
            <BreadCrumbs site={site} items={[{ name: 'Feedback' }, { name: 'Sentiment' }]} />

            <h4 className='title'>
              Sentiment
              {!loading && feedback && (
                <menu>
                  <SentimentStatus feedback={feedback} site={site} />
                </menu>
              )}
            </h4>
          
            <Container className='xl centered empty-state'>
              <div className='empty-state-contents'>
                <Illustration illustration='illustration-9' height={240} width={320} alt='Illustration to represent the empty sentiment page' />
                <h4>Awaiting tracking code installation</h4>
                <EmptyStateHint
                  title='Collecting Session Recordings'
                  body={
                    <>
                      <p>New to Squeaky? Once you have <Link href={`/sites/${site.id}/settings/details/tracking-code`}><a>installed your tracking code</a></Link> this page will enable you to configure how you wish to collect user feedback, and let you review all incoming feedback in one place.</p>
                    </>
                  }
                />
              </div>
            </Container>

            {loading && (
              <PageLoading />
            )}

            {!!site.verifiedAt && !loading && (
              <>
                <SentimentTabs siteId={site.id} page='appearance' />
                <SentimentAppearance site={site} feedback={feedback} locale={locale} setLocale={setLocale} />
              </>
            )}
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesFeedbackSentimentAppearance;
export { getServerSideProps };
