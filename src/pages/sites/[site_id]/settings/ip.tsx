import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Main } from 'components/main';
import { Access } from 'components/sites/access';
import { Page } from 'components/sites/page';
import { OWNER, ADMIN } from 'data/teams/constants';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { SettingsTabs } from 'components/sites/settings-tabs';

const SitesSettingsIp: NextPage<ServerSideProps> = ({ user }) => {
  return (
    <>
      <Head>
        <title>Squeaky | Site Settings | IP Screening</title>
      </Head>

      <Page user={user} scope={[OWNER, ADMIN]}>
        {({ site }) => (
          <Main>
            <BreadCrumbs site={site} items={[{ name: 'Settings', href: `/sites/${site.id}/settings/details` }, { name: 'IP Screening' }]} />

            <h3 className='title'>
              IP Screening
              <Access roles={[OWNER, ADMIN]} />
            </h3>

            <SettingsTabs site={site} page='ip' />
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesSettingsIp;
export { getServerSideProps };
