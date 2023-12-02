import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Main } from 'components/main';
import { Access } from 'components/sites/access';
import { Page } from 'components/sites/page';
import { OWNER } from 'data/teams/constants';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { Billing } from 'components/sites/settings/billing';
import { PageProps } from 'types/page';

const SiteSettingsSubscription: NextPage<PageProps> = ({ user }) => (
  <>
    <Head>
      <title>Squeaky | Site Settings | Subscription</title>
    </Head>

    <Page user={user} scope={[OWNER]}>
      {({ site, member }) => (
        <Main>
          <BreadCrumbs site={site} member={member} items={[{ name: 'Subscription' }]} />

          <h4 className='title'>
            Subscription
            <Access roles={[OWNER]} />
          </h4>

          <Billing site={site} member={member} />
        </Main>
      )}
    </Page>
  </>
);

export default SiteSettingsSubscription;
