import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Main } from 'components/main';
import { Access } from 'components/sites/access';
import { Page } from 'components/sites/page';
import { useRoutes } from 'hooks/use-routes';
import { PageLoading } from 'components/sites/page-loading';
import { Error } from 'components/error';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { UrlStructure } from 'components/sites/settings/url-structure';
import { SettingsTabs } from 'components/sites/settings/settings-tabs';
import { ADMIN, OWNER } from 'data/teams/constants';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

const SitesSettingsUrlStructure: NextPage<ServerSideProps> = ({ user }) => {
  const { loading, error, routes } = useRoutes();

  if (loading) {
    return <PageLoading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <>
      <Head>
        <title>Squeaky | Site Settings | URL Structure</title>
      </Head>

      <Page user={user} scope={[OWNER, ADMIN]}>
        {({ site, member }) => (
          <Main>
            <BreadCrumbs site={site} member={member} items={[{ name: 'Settings', href: `/sites/${site.id}/settings/details` }, { name: 'URL Structure' }]} />

            <h4 className='title'>
              Site Settings
              <Access roles={[OWNER, ADMIN]} />
            </h4>

            <SettingsTabs site={site} member={member} page='url-structure' />

            <div className='subtitle'>
              <h4>
                URL Structure
              </h4>
              
              <UrlStructure site={site} routes={routes} />
            </div>
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesSettingsUrlStructure;
export { getServerSideProps };
