import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Main } from 'components/main';
import { Page } from 'components/sites/page';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { BreadCrumbs } from 'components/sites/breadcrumbs';

const SitesFeedbackSentiment: NextPage<ServerSideProps> = ({ user }) => {
  return (
    <>
      <Head>
        <title>Squeaky | Feedback | Sentiment</title>
      </Head>

      <Page user={user} scope={[]}>
        {({ site }) => (
          <Main>
            <BreadCrumbs site={site} items={[{ name: 'Feedback' }, { name: 'Sentiment' }]} />

            <h3 className='title'>Sentiment</h3>

          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesFeedbackSentiment;
export { getServerSideProps };
