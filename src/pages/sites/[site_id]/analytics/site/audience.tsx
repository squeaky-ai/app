import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import classnames from 'classnames';
import { Main } from 'components/main';
import { EmptyState } from 'components/sites/empty-state';
import { Page } from 'components/sites/page';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { Unlock } from 'components/sites/unlock';
import { Period } from 'components/sites/period/period';
import { usePeriod } from 'hooks/use-period';
import { Tabs } from 'components/sites/analytics/tabs';
import { AnalyticsSitesAudience } from 'components/sites/analytics/analytics-sites-audience';
import { PageProps } from 'types/page';

const SitesAnalyticsSiteAudience: NextPage<PageProps> = ({ user }) => {
  const { period, setPeriod } = usePeriod('analytics');
  
  return (
    <>
      <Head>
        <title>Squeaky | Site Analytics | Audience</title> 
      </Head>

      <Page user={user} scope={[]}>
        {({ site, member }) => (
          <Main className={classnames({ empty: site.recordingsCount === 0 })}>
            <BreadCrumbs site={site} member={member} items={[{ name: 'Site Analytics' }]} />

            <div className='heading'>
              <h4 className='title'>Site Analytics</h4>
              <Period period={period} onChange={setPeriod} />
            </div>

            <Unlock site={site} />

            <Tabs site={site} tab='audience' type='site' />

            <EmptyState
              site={site}
              title='There are currently no analytics available'
              illustration='illustration-3'
            />

            {site.recordingsCount > 0 && (
              <AnalyticsSitesAudience period={period} />
            )}
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesAnalyticsSiteAudience;
