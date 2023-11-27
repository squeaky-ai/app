import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import classnames from 'classnames';
import { Main } from 'components/main';
import { Page } from 'components/sites/page';
import { Visitors } from 'components/sites/visitors/visitors';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { PageProps } from 'types/page';

const SitesVisitors: NextPage<PageProps> = ({ user }) => (
  <>
    <Head>
      <title>Squeaky | Site Visitors</title>
    </Head>

    <Page user={user} scope={[]}>
      {({ site, member }) => (
        <Main className={classnames({ empty: site.recordingsCount === 0 })}>
          <BreadCrumbs site={site} member={member} items={[{ name: 'Visitors' }]} />
          <Visitors site={site} member={member} />
        </Main>
      )}
    </Page>
  </>
);

export default SitesVisitors;
