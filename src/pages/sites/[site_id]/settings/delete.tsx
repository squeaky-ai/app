import React from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { Main } from 'components/main';
import { Access } from 'components/sites/access';
import { Page } from 'components/sites/page';
import { Container } from 'components/container';
import { DeleteSite } from 'components/sites/delete-site';
import { OWNER, ADMIN } from 'data/teams/constants';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { SettingsTabs } from 'components/sites/settings-tabs';

const SitesSettingsDelete: NextPage<ServerSideProps> = ({ user }) => {
  return (
    <>
      <Head>
        <title>Squeaky | Site Settings | Site Deletion</title>
      </Head>

      <Page user={user} scope={[OWNER, ADMIN]}>
        {({ site }) => (
          <Main>
            <BreadCrumbs site={site} items={[{ name: 'Settings', href: `/sites/${site.id}/settings/details` }, { name: 'Site Deletion' }]} />

            <h3 className='title'>
              Site Deletion
              <Access roles={[OWNER, ADMIN]} />
            </h3>

            <SettingsTabs site={site} page='delete' />

            <Container className='md'>
              <p><b>You can delete your site at any time:</b></p>
              <ul className='delete-list'>
                <li>The site will be deleted immediately for all users.</li>
                <li>Deleting your site will not delete your Squeaky user account. To delete you account please visit the <Link href='/users/account'><a>account settings page</a></Link>.</li>
                <li>Site deletion is irreversable. If you have an active subscription you can downgrade to a free plan in the <Link href={`/sites/${site.id}/subscription`}><a>subscription tab</a></Link>.</li>
              </ul>
              <DeleteSite site={site} />
            </Container>
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesSettingsDelete;
export { getServerSideProps };
