import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Main } from 'components/main';
import { Page } from 'components/sites/page';
import { Spinner } from 'components/spinner';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { VisitorSummary } from 'components/sites/visitor-summary';
import { VisitorRecording } from 'components/sites/visitor-recordings';
import { VisitorStats } from 'components/sites/visitor-stats';
import { VisitorPages } from 'components/sites/visitors-pages';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { useVisitor } from 'hooks/use-visitor';
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

  if (!visitor) {
    return <Spinner />
  }

  return (
    <>
      <Head>
        <title>Squeaky / Site Visitors / {visitor.visitorId}</title>
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

            <h3 className='title'>
              <i className='ri-user-line' />
              {visitor.visitorId}
            </h3>

            <VisitorSummary site={site} visitor={visitor} />

            <VisitorRecording 
              visitor={visitor} 
              page={recordingPage} 
              setPage={setRecordingPage} 
              sort={recordingSort}
              setSort={setRecordingSort}
            />

            <VisitorStats visitor={visitor} />
  
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
