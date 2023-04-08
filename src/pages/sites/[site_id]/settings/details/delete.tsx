import React from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { Main } from 'components/main';
import { Access } from 'components/sites/access';
import { Page } from 'components/sites/page';
import { Container } from 'components/container';
import { DeleteSite } from 'components/sites/settings/delete-site';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { SettingsTabs } from 'components/sites/settings/settings-tabs';
import { OWNER } from 'data/teams/constants';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

const SitesSettingsDelete: NextPage<ServerSideProps> = ({ user }) => (
  <>
    <Head>
      <title>Squeaky | Site Settings | Site Deletion</title>
    </Head>

    <Page user={user} scope={[OWNER]}>
      {({ site, member }) => (
        <Main>
          <BreadCrumbs site={site} items={[{ name: 'Settings', href: `/sites/${site.id}/settings/details` }, { name: 'Site Deletion' }]} />

          <h4 className='title'>
            Site Settings
            <Access roles={[OWNER]} />
          </h4>

          <SettingsTabs site={site} member={member} page='delete' />

          <h4>
            Site Deletion
            <Access roles={[OWNER]} />
          </h4>

          <Container className='md'>
            <p><b>You can delete your site at any time:</b></p>
            <ul className='delete-list'>
              <li>The site will be deleted immediately for all users.</li>
              <li>Deleting your site will not delete your Squeaky user account. To delete you account please visit the <Link href='/users/account'>account settings page</Link>.</li>
              <li>Site deletion is irreversible. If you have an active subscription you can downgrade to a free plan in the <Link href={`/sites/${site.id}/subscription`}>subscription tab</Link>.</li>
            </ul>
            <DeleteSite site={site} />
          </Container>
        </Main>
      )}
    </Page>
  </>
);

export default SitesSettingsDelete;
export { getServerSideProps };
