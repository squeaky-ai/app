import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import classnames from 'classnames';
import { Main } from 'components/main';
import { Page } from 'components/sites/page';
import { EmptyState } from 'components/sites/feedback/empty-state';
import { Unlock } from 'components/sites/unlock';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { NpsTabs } from 'components/sites/feedback/nps-tabs';
import { PageLoading } from 'components/sites/page-loading';
import { Error } from 'components/error';
import { NpsPreview } from 'components/sites/feedback/nps-preview';
import { NpsAppearance } from 'components/sites/feedback/nps-appearance';
import { useFeedback } from 'hooks/use-feedback';
import { NpsStatus } from 'components/sites/feedback/nps-status';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

const SitesFeedbackNpsAppearance: NextPage<ServerSideProps> = ({ user }) => {
  const { loading, error, feedback, locale, setLocale } = useFeedback();

  if (error) {
    return <Error />;
  }

  return (
    <>
      <Head>
        <title>Squeaky | Feedback | NPS | Appearance</title>
      </Head>

      <Page user={user} scope={[]}>
        {({ site }) => (
          <Main className={classnames({ empty: !site.verifiedAt })}>
            <BreadCrumbs site={site} items={[{ name: 'Feedback' }, { name: 'NPS Score®' }]} />

            <h4 className='title'>
              Net Promoter Score®
              {!loading && feedback && (
                <menu>
                  <NpsPreview feedback={feedback} locale={locale} setLocale={setLocale} />
                  <NpsStatus feedback={feedback} site={site} />
                </menu>
              )}
            </h4>

            <EmptyState
              title='Awaiting tracking code installation'
              subtitle='Collecting Session Recordings'
              illustration='illustration-9'
              videoName='Feedback Intro'
            />

            <Unlock site={site} page='nps' />

            {loading && (
              <PageLoading />
            )}

            {!!site.verifiedAt && !loading && (
              <>
                <NpsTabs siteId={site.id} page='appearance' />
                <NpsAppearance site={site} feedback={feedback} />
              </>
            )}
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesFeedbackNpsAppearance;
export { getServerSideProps };
