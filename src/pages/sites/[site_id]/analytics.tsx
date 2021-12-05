import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import classnames from 'classnames';
import { Main } from 'components/main';
import { EmptyState } from 'components/sites/empty-state';
import { Page } from 'components/sites/page';
import { Select, Option } from 'components/select';
import { Analytics } from 'components/sites/analytics/analytics';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { TIME_PERIODS } from 'data/heatmaps/constants';
import type { TimePeriod } from 'lib/dates';

const SitesAnalytics: NextPage<ServerSideProps> = ({ user }) => {
  const [period, setPeriod] = React.useState<TimePeriod>('past_seven_days');

  const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPeriod(event.target.value as TimePeriod);
  };
  
  return (
    <>
      <Head>
        <title>Squeaky | Site Analytics</title> 
      </Head>

      <Page user={user} scope={[]}>
        {({ site }) => (
          <Main className={classnames({ empty: site.recordingsCount === 0})}>
            <BreadCrumbs site={site} items={[{ name: 'Analytics' }]} />

            <div className='heading'>
              <h3 className='title'>Analytics</h3>
              <div className='period'>
                <p><b>Period:</b></p>
                <Select onChange={handleDateChange} value={period}>
                  {TIME_PERIODS.map(p => (
                    <Option value={p.key} key={p.key}>
                      {p.name}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>

            <EmptyState
              title='There are currently no analytics available'
              subtitle='Collecting Analytics Data'
              illustration={3}
              videoName='Analytics Intro'
            />

            {site.recordingsCount > 0 && (
              <Analytics period={period} />
            )}
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesAnalytics;
export { getServerSideProps };
