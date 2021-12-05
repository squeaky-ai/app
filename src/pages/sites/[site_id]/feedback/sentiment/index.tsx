import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import classnames from 'classnames';
import { Illustration } from 'components/illustration';
import { Main } from 'components/main';
import { Page } from 'components/sites/page';
import { Container } from 'components/container';
import { EmptyStateHint } from 'components/sites/empty-state-hint';
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
          
            <Container className='xl centered empty-state'>
              <div className='empty-state-contents'>
                <Illustration src='illustration-9' height={240} width={320} alt='Illustration to represent the empty sentiment page' />
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
