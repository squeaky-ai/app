import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Main } from 'components/main';
import { Page } from 'components/sites/page';
import { PageLoading } from 'components/sites/page-loading';
import { Card } from 'components/card';
import { Pill } from 'components/pill';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { Unlock } from 'components/sites/unlock';
import { VisitorsSummary } from 'components/sites/visitors/visitors-summary';
import { VisitorsExport } from 'components/sites/visitors/visitors-export';
import { VisitorsDelete } from 'components/sites/visitors/visitors-delete';
import { VisitorsTabs } from 'components/sites/visitors/visitors-tabs';
import { Error } from 'components/error';
import { NotFound } from 'components/sites/not-found';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { useVisitor } from 'hooks/use-visitor';
import { toHoursMinutesAndSeconds } from 'lib/dates';
import type { Site } from 'types/graphql';

const SitesVisitor: NextPage<ServerSideProps> = ({ user }) => {
  const router = useRouter();

  const { visitor, error, loading } = useVisitor();

  const onVisitorDelete = async (site: Site) => {
    await router.push(`/sites/${site.id}/visitors`);
  };

  const toTwoDecimalPlaces = (value: number) => Number(value.toFixed(2));

  if (error) {
    return <Error />;
  }

  if (loading) {
    return <PageLoading />;
  }

  if (!visitor) {
    return <NotFound />;
  }

  return (
    <>
      <Head>
        <title>Squeaky | Site Visitors / {visitor.visitorId}</title>
      </Head>

      <Page user={user} scope={[]}>
        {({ site, member }) => (
          <Main className='visitor-view'>
            <BreadCrumbs 
              site={site} 
              member={member}
              items={
                [
                  { name: 'Visitors', href: `/sites/${site.id}/visitors` }, 
                  { name: `ID: ${visitor.visitorId}` }
                ]
              } 
            />

            <h4 className='title'>
              Visitor: {visitor.visitorId}
              <menu>
                <VisitorsExport
                  site={site}
                  member={member}
                  visitor={visitor}
                />
                <VisitorsDelete 
                  site={site}
                  member={member}
                  visitorId={visitor.id}
                  onDelete={() => onVisitorDelete(site)} 
                  button='Delete Visitor'
                  buttonClassName='tertiary'
                />
              </menu>
            </h4>

            <Unlock site={site} />

            <VisitorsSummary site={site} member={member} visitor={visitor} />

            <div className='stats'>
              <Card className='recordings'>
                <h5>Recordings</h5>
                <h3>
                  {visitor.recordingCount?.total || 0}
                  <Pill type='tertiary'>{visitor.recordingCount.new} New</Pill>
                </h3>
              </Card>
              <Card className='page-views'>
                <h5>Avg. Session Duration</h5>
                <h3>{toHoursMinutesAndSeconds(visitor.averageSessionDuration || 0)}</h3>
              </Card>
              <Card className='session-duration'>
                <h5>Page Views</h5>
                <h3>
                  {visitor.pageViewsCount.total}
                  <Pill type='secondary'>{visitor.pageViewsCount.unique} Unique</Pill>
                </h3>
              </Card>
              <Card className='per-session'>
                <h5>Pages Per Session</h5>
                <h3>{toTwoDecimalPlaces(visitor.pagesPerSession || 0)}</h3>
              </Card>
            </div>

            <VisitorsTabs
              site={site}
              member={member}
            />
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesVisitor;
export { getServerSideProps };
