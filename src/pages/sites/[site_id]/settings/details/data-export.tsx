import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Main } from 'components/main';
import { Access } from 'components/sites/access';
import { Page } from 'components/sites/page';
import { useDataExport } from 'hooks/use-data-export';
import { PageLoading } from 'components/sites/page-loading';
import { Error } from 'components/error';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { SettingsTabs } from 'components/sites/settings/settings-tabs';
import { SettingsDataExport } from 'components/sites/settings/settings-data-export';
import { SettingsDataExportModal } from 'components/sites/settings/settings-data-export-modal';
import { ADMIN, OWNER } from 'data/teams/constants';
import { PageProps } from 'types/page';

const SitesSettingsDataExport: NextPage<PageProps> = ({ user }) => {
  const { loading, error, dataExport } = useDataExport();

  if (loading) {
    return <PageLoading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <>
      <Head>
        <title>Squeaky | Site Settings | Data Export</title>
      </Head>

      <Page user={user} scope={[OWNER, ADMIN]}>
        {({ site, member }) => (
          <Main>
            <BreadCrumbs site={site} member={member} items={[{ name: 'Settings', href: `/sites/${site.id}/settings/details` }, { name: 'Data export' }]} />

            <h4 className='title'>
              Site Settings
              <Access roles={[OWNER, ADMIN]} />
            </h4>

            <SettingsTabs site={site} member={member} page='data-export' />

            <div className='subtitle'>
              <h4>
                Data export
              </h4>
              {dataExport.length > 0 && (
                <SettingsDataExportModal site={site} />
              )}
            </div>

            <SettingsDataExport site={site} dataExport={dataExport} />
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesSettingsDataExport;
