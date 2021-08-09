import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import classnames from 'classnames';
import Link from 'next/link';
import { Main } from 'components/main';
import { EmptyStateHint } from 'components/sites/empty-state-hint';
import { Container } from 'components/container';
import { Page } from 'components/sites/page';
import { Select, Option } from 'components/select';
import { Analytics } from 'components/sites/analytics';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import type { TimePeriod } from 'lib/dates';

const timePeriods: { name: string, key: TimePeriod }[] = [
  {
    name: 'Today',
    key: 'today'
  },
  {
    name: 'Yesterday',
    key: 'yesterday'
  },
  {
    name: 'Past Week',
    key: 'past_week'
  },
  {
    name: 'Past Month',
    key: 'past_month'
  },
  {
    name: 'This Quarter',
    key: 'this_quarter'
  },
  {
    name: 'Year to Date',
    key: 'year_to_date'
  }
];

const SitesAnalytics: NextPage<ServerSideProps> = ({ user }) => {
  const [period, setPeriod] = React.useState<TimePeriod>(timePeriods[0].key);

  const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPeriod(event.target.value as TimePeriod);
  };
  
  return (
    <>
      <Head>
        <title>Squeaky / Site Analytics</title> 
      </Head>

      <Page user={user} scope={[]}>
        {({ site }) => (
          <Main className={classnames({ empty: site.recordings.items.length === 0})}>
            <BreadCrumbs site={site} items={[{ name: 'Analytics' }]} />

            <div className='heading'>
              <h3 className='title'>Analytics</h3>
              <div className='period'>
                <p><b>Period:</b></p>
                <Select onChange={handleDateChange} value={period}>
                  {timePeriods.map(p => (
                    <Option value={p.key} key={p.key}>
                      {p.name}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>

            <Container className='xl centered empty-state'>
              <div className='empty-state-contents'>
                <Image src='/empty-state-3.svg' height={240} width={320} alt='Illustration to represent the empty analytics page' />
                <h4>There are currently no analytics available</h4>
                <EmptyStateHint
                  title='Collecting Analytics Data'
                  body={
                    <>
                      <p>New to Squeaky? Please <Link href={`/sites/${site.id}/settings?tab=code`}><a>install your tracking code</a></Link> to begin recording user sessions for your website or web app.</p>
                      <p>If you have only recently installed or updated your tracking code it may take up to an hour before analytics data becomes available.</p>
                    </>
                  }
                />
              </div>
            </Container>

            {!!site.recordings.items.length && (
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
