import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Main } from 'components/main';
import { Access } from 'components/sites/access';
import { Page } from 'components/sites/page';
import { Container } from 'components/container';
import { OWNER, ADMIN } from 'data/teams/constants';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { SettingsTabs } from 'components/sites/settings-tabs';

const SitesSettingsPrivacy: NextPage<ServerSideProps> = ({ user }) => {
  return (
    <>
      <Head>
        <title>Squeaky | Site Settings | Privacy</title>
      </Head>

      <Page user={user} scope={[OWNER, ADMIN]}>
        {({ site, member }) => (
          <Main>
            <BreadCrumbs site={site} items={[{ name: 'Settings', href: `/sites/${site.id}/settings/details` }, { name: 'Privacy' }]} />

            <h3 className='title'>
              Site Settings
              <Access roles={[OWNER, ADMIN]} />
            </h3>

            <SettingsTabs site={site} member={member} page='privacy' />

            <h4>Privacy</h4>

            <Container className='md'>
              <p>At Squeaky we <b>automatically anonymise all data that users input into forms</b>. If there are other types of content you don’t want to record then you can <b>manually apply the following class names</b> to the relevant elements in your codebase:</p>
              <ul className='privacy-code'>
                <li>An element with the class name <code className='code'>.squeaky-hide</code> will not be recorded. Instead, it will replay as a placeholder with the same dimension.</li>
                <li>All text of elements with the class name <code className='code'>.squeaky-mask</code> and their children will be masked.</li>
              </ul>
            </Container>
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesSettingsPrivacy;
export { getServerSideProps };
