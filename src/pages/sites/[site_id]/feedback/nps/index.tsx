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
import { Error } from 'components/error';
import { Nps } from 'components/sites/feedback/nps';
import { NpsStatus } from 'components/sites/feedback/nps-status';
import { useFeedback } from 'hooks/use-feedback';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

const SitesFeedbackNps: NextPage<ServerSideProps> = ({ user }) => {
  const { loading, error, feedback } = useFeedback();

  if (error) {
    return <Error />;
  }

  return (
    <>
      <Head>
        <title>Squeaky | Feedback | NPS</title> 
      </Head>

      <Page user={user} scope={[]}>
        {({ site, member }) => (
          <Main className={classnames({ empty: !site.verifiedAt })}>
            <BreadCrumbs site={site} items={[{ name: 'Feedback' }, { name: 'NPS Score®' }]} />

            <h4 className='title'>
              Net Promoter Score®
              {!loading && feedback && (
                <menu>
                  <NpsStatus feedback={feedback} site={site} member={member} />
                </menu>
              )}
            </h4>

            <EmptyState
              site={site}
              title='Awaiting tracking code installation'
              subtitle='Collecting Session Recordings'
              illustration='illustration-9'
              videoName='Feedback Intro'
            />

            <Unlock site={site} />

            {!!site.verifiedAt && (
              <>
                <NpsTabs siteId={site.id} member={member} page='feedback' />
                <Nps member={member} />
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
