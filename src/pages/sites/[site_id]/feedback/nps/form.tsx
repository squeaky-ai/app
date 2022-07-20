import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import classnames from 'classnames';
import { Main } from 'components/main';
import { Page } from 'components/sites/page';
import { EmptyState } from 'components/sites/feedback/empty-state';
import { Unlock } from 'components/sites/unlock';
import { PageLoading } from 'components/sites/page-loading';
import { Error } from 'components/error';
import { NpsPreview } from 'components/sites/feedback/nps-preview';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { NpsTabs } from 'components/sites/feedback/nps-tabs';
import { useFeedback } from 'hooks/use-feedback';
import { NpsStatus } from 'components/sites/feedback/nps-status';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { NpsForm } from 'components/sites/feedback/nps_form';

const SitesFeedbackNpsForm: NextPage<ServerSideProps> = ({ user }) => {
  const { loading, error, feedback } = useFeedback();

  if (error) {
    return <Error />;
  }

  return (
    <>
      <Head>
        <title>Squeaky | Feedback | NPS | Form Options</title>
      </Head>

      <Page user={user} scope={[]}>
        {({ site }) => (
          <Main className={classnames({ empty: !site.verifiedAt })}>
            <BreadCrumbs site={site} items={[{ name: 'Feedback' }, { name: 'NPS Score®' }]} />

            <h4 className='title'>
              Net Promoter Score®
              {!loading && feedback && (
                <menu>
                  <NpsPreview feedback={feedback} />
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
                <NpsTabs siteId={site.id} page='form' />
                <NpsForm site={site} feedback={feedback} />
              </>
            )}
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesFeedbackNpsForm;
export { getServerSideProps };
