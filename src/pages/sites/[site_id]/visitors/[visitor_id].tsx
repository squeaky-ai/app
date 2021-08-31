import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Main } from 'components/main';
import { Page } from 'components/sites/page';
import { Spinner } from 'components/spinner';
import { Card } from 'components/card';
import { Pill } from 'components/pill';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { VisitorSummary } from 'components/sites/visitor-summary';
import { VisitorRecording } from 'components/sites/visitor-recordings';
import { VisitorPages } from 'components/sites/visitors-pages';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { useVisitor } from 'hooks/use-visitor';
import { toMinutesAndSeconds } from 'lib/dates';
import type { PageSortBy } from 'types/visitor';
import type { RecordingSortBy } from 'types/recording';

const SitesVisitor: NextPage<ServerSideProps> = ({ user }) => {
  const router = useRouter();

  const [pageviewPage, setPageviewPage] = React.useState<number>(1);
  const [pageviewSort, setPageviewSort] = React.useState<PageSortBy>('VIEWS_COUNT_DESC');
  const [recordingPage, setRecordingPage] = React.useState<number>(1);
  const [recordingSort, setRecordingSort] = React.useState<RecordingSortBy>('DATE_DESC');

  const { visitor } = useVisitor({ 
    recordingPage,
    recordingSort,
    pagesPage: pageviewPage,
    pagesSort: pageviewSort
  });

  const { site_id } = router.query;

  const toTwoDecimalPlaces = (value: number) => Number(value.toFixed(2));

  if (!visitor) {
    return <Spinner />
  }

  return (
    <>
      <Head>
        <title>Squeaky | Site Visitors / {visitor.visitorId}</title>
      </Head>

      <Page user={user} scope={[]}>
        {({ site }) => (
          <Main className='visitor-view'>
            <BreadCrumbs 
              site={site} 
              items={
                [
                  { name: 'Visitors', href: `/sites/${site_id}/visitors` }, 
                  { name: `ID: ${visitor.visitorId}` }
                ]
              } 
            />

            <VisitorSummary site={site} visitor={visitor} />

            <h4 className='sub-heading'>Recordings</h4>

            <div className='visitor-highlights'>
              <Card className='recordings'>
                <h3>Recordings</h3>
                <h2>
                  {visitor.recordingsCount.total}
                  <Pill type='tertiary'>{visitor.recordingsCount.new} New</Pill>
                </h2>
              </Card>
              <Card className='page-views'>
                <h3>Average Session Duration</h3>
                <h2>{toMinutesAndSeconds(visitor.averageSessionDuration || 0)}</h2>
              </Card>
            </div>

            <VisitorRecording 
              visitor={visitor} 
              page={recordingPage} 
              setPage={setRecordingPage} 
              sort={recordingSort}
              setSort={setRecordingSort}
            />

            <h4 className='sub-heading'>Pages</h4>

            <div className='stats'>
              <Card className='session-duration'>
                <h3>Page Views</h3>
                <h2>
                  {visitor.pageViewsCount.total}
                  <Pill type='secondary'>{visitor.pageViewsCount.unique} Unique</Pill>
                </h2>
              </Card>
              <Card className='per-session'>
                <h3>Pages Per Session</h3>
                <h2>{toTwoDecimalPlaces(visitor.pagesPerSession || 0)}</h2>
              </Card>
            </div>
  
            <VisitorPages 
              visitor={visitor} 
              page={pageviewPage} 
              setPage={setPageviewPage} 
              sort={pageviewSort}
              setSort={setPageviewSort}
            />
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesVisitor;
export { getServerSideProps };
