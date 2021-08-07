import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Card } from 'components/card';
import { Main } from 'components/main';
import { Page } from 'components/sites/page';
import { Spinner } from 'components/spinner';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { Device } from 'components/device';
import { Browser } from 'components/browser';
import { toNiceDate } from 'lib/dates';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { useVisitor } from 'hooks/visitor';

const SitesVisitor: NextPage<ServerSideProps> = ({ user }) => {
  const router = useRouter();
  const [loading, visitor] = useVisitor();

  const { site_id, visitor_id } = router.query;

  if (loading || !visitor) {
    return <Spinner />
  }

  return (
    <>
      <Head>
        <title>Squeaky / Site Visitors / {visitor_id}</title>
      </Head>

      <Page user={user} scope={[]}>
        {({ site }) => (
          <Main className='visitor-view'>
            <BreadCrumbs 
              site={site} 
              items={
                [
                  { name: 'Visitors', href: `/sites/${site_id}/visitors` }, 
                  { name: `ID: ${visitor_id}` }
                ]
              } 
            />

            <h3 className='title'>
              <i className='ri-user-line' />
              {visitor_id}
            </h3>

            <div className='summary'>
              <Card className='info'>
                <div className='row'>
                  <dt>Visitor ID</dt>
                  <dd>{visitor.viewerId}</dd>
                </div>
                <div className='row'>
                  <dt>First visited</dt>
                  <dd>{toNiceDate(Number(visitor.firstViewedAt))}</dd>
                </div>
                <div className='row'>
                  <dt>Last activity</dt>
                  <dd>{toNiceDate(Number(visitor.lastActivityAt))}</dd>
                </div>
                <div className='row'>
                  <dt>Language</dt>
                  <dd>{visitor.language}</dd>
                </div>
                <div className='row'>
                  <dt>Device &amp; Viewport (px)</dt>
                  <dd>
                    <Device deviceType={visitor.deviceType} />
                    {visitor.viewportX} by {visitor.viewportY} pixels
                  </dd>
                </div>
                <div className='row'>
                  <dt>Browser</dt>
                  <dd>
                    <div className='browser'>
                      <Browser name={visitor.browser} height={16} width={16} />
                    </div>
                    {visitor.browserString}
                  </dd>
                </div>
              </Card>
              <Card className='recordings'>
                <h3>Recordings</h3>
                <h2>{visitor.recordingCount}</h2>
              </Card>
              <Card className='page-views'>
                <h3>Page Views</h3>
                <h2>{visitor.pageViewCount || 0}</h2>
              </Card>
            </div>

            <h4 className='sub-heading'>Recordings</h4>
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesVisitor;
export { getServerSideProps };
