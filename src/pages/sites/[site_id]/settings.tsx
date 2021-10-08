import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Main } from 'components/main';
import { Access } from 'components/sites/access';
import { Page } from 'components/sites/page';
import { OWNER, ADMIN } from 'data/teams/constants';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { SettingsTags } from 'components/sites/settings-tags';
import { SettingsSiteDetails } from 'components/sites/settings-site-details';
import { SettingsTrackingCode } from 'components/sites/settings-tracking-code';
import { SettingsDeleteSite } from 'components/sites/settings-delete-site';
import { SettingsPrivacy } from 'components/sites/settings-privacy';

const SitesSettings: NextPage<ServerSideProps> = ({ user }) => {
  return (
    <>
      <Head>
        <title>Squeaky | Site Settings</title>
      </Head>

      <Page user={user} scope={[OWNER, ADMIN]}>
        {({ site, member }) => (
          <Main>
            <BreadCrumbs site={site} items={[{ name: 'Settings' }]} />

            <h3 className='title'>
              Settings
              <Access roles={[OWNER, ADMIN]} />
            </h3>

            <SettingsSiteDetails site={site} />
            <SettingsTrackingCode site={site} />
            <SettingsPrivacy />
            <SettingsTags />
            <SettingsDeleteSite site={site} member={member} />
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesSettings;
export { getServerSideProps };
