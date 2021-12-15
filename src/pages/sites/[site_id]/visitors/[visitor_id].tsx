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
import { VisitorsSummary } from 'components/sites/visitors/visitors-summary';
import { VisitorsRecording } from 'components/sites/visitors/visitors-recordings';
import { VisitorPages } from 'components/sites/visitors/visitors-pages';
import { Error } from 'components/error';
import { NotFound } from 'components/sites/not-found';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { useVisitor } from 'hooks/use-visitor';
import { toHoursMinutesAndSeconds } from 'lib/dates';
import { VisitorsPagesSort, RecordingsSort } from 'types/graphql';

const SitesVisitor: NextPage<ServerSideProps> = ({ user }) => {
  const router = useRouter();

  const [pageviewPage, setPageviewPage] = React.useState<number>(1);
  const [recordingPage, setRecordingPage] = React.useState<number>(0);
  const [pageviewSort, setPageviewSort] = React.useState<VisitorsPagesSort>(VisitorsPagesSort.ViewsCountDesc);
  const [recordingSort, setRecordingSort] = React.useState<RecordingsSort>(RecordingsSort.ConnectedAtDesc);

  const { visitor, error, loading } = useVisitor({ 
    recordingPage,
    recordingSort,
    pagesPage: pageviewPage,
    pagesSort: pageviewSort
  });

  const { site_id } = router.query;

  const toTwoDecimalPlaces = (value: number) => Number(value.toFixed(2));

  if (error) {
    return <Error />;
  }

  if (loading) {
    return <Spinner />;
  }

  if (!loading && !visitor) {
    return <NotFound />;
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

            <VisitorsSummary site={site} visitor={visitor} />

            <h5>Recordings</h5>

            <div className='visitor-highlights'>
              <Card className='recordings'>
                <h5>Recordings</h5>
                <h2>
                  {visitor.recordingCount?.total || 0}
                  <Pill type='tertiary'>{visitor.recordingCount.new} New</Pill>
                </h2>
              </Card>
              <Card className='page-views'>
                <h5>Average Session Duration</h5>
                <h2>{toHoursMinutesAndSeconds(visitor.averageSessionDuration || 0)}</h2>
              </Card>
            </div>

            <VisitorsRecording 
              visitor={visitor} 
              page={recordingPage} 
              setPage={setRecordingPage}
              sort={recordingSort}
              setSort={setRecordingSort}
            />

            <h5>Pages</h5>

            <div className='stats'>
              <Card className='session-duration'>
                <h5>Page Views</h5>
                <h2>
                  {visitor.pageViewsCount.total}
                  <Pill type='secondary'>{visitor.pageViewsCount.unique} Unique</Pill>
                </h2>
              </Card>
              <Card className='per-session'>
                <h5>Pages Per Session</h5>
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
