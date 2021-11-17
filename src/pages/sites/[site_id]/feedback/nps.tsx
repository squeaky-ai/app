import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Main } from 'components/main';
import { Page } from 'components/sites/page';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { BreadCrumbs } from 'components/sites/breadcrumbs';

const SitesFeedbackNps: NextPage<ServerSideProps> = ({ user }) => {
  return (
    <>
      <Head>
        <title>Squeaky | Feedback | NPS</title>
      </Head>

      <Page user={user} scope={[]}>
        {({ site }) => (
          <Main>
            <BreadCrumbs site={site} items={[{ name: 'Feedback' }, { name: 'NPS Score®' }]} />

            <h3 className='title'>Net Promoter Score®</h3>

           
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesFeedbackNps;
export { getServerSideProps };
