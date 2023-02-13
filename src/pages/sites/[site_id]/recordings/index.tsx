import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import classnames from 'classnames';
import { Main } from 'components/main';
import { Recordings } from 'components/sites/recordings/recordings';
import { Page } from 'components/sites/page';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

const SitesRecordings: NextPage<ServerSideProps> = ({ user }) => (
  <>
    <Head>
      <title>Squeaky | Site Recordings</title>
    </Head>

    <Page user={user} scope={[]}>
      {({ site, member }) => (
        <Main className={classnames({ empty: site.recordingsCount === 0 })}>
          <BreadCrumbs site={site} items={[{ name: 'Recordings' }]} />
          <Recordings site={site} member={member} />
        </Main>
      )}
    </Page>
  </>
);

export default SitesRecordings;
export { getServerSideProps };
