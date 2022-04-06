import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
// import { Error } from 'components/error';
// import { Spinner } from 'components/spinner';
import { Page } from 'components/admin/page';
import { BreadCrumbs } from 'components/admin/breadcrumbs';
import { Card } from 'components/card';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

const AdminDashboard: NextPage<ServerSideProps> = () => {
  return (
    <>
      <Head>
        <title>Squeaky | Admin | Dashboard</title>
      </Head>

      <Page>
        {({ }) => (
          <>
            <BreadCrumbs items={[{ name: 'Admin' }, { name: 'Dashboard' }]} />

            <h3 className='title'>
              Dashboard
            </h3>

            <div className='dashboard-grid'>
              <div className='grid-item total-users'>
                <Card>
                  <h5>Total Users</h5>
                </Card>
              </div>

              <div className='grid-item monthly-active-users'>
                <Card>
                  <h5>MAU&apos;s</h5>
                </Card>
              </div>

              <div className='grid-item roles'>
                <Card>
                  <h5>Roles</h5>
                </Card>
              </div>

              <div className='grid-item total-sites'>
                <Card>
                  <h5>Total Sites</h5>
                </Card>
              </div>

              <div className='grid-item sites-verified'>
                <Card>
                  <h5>Verified vs. Unverified</h5>
                </Card>
              </div>

              <div className='grid-item recordings'>
                <Card>
                  <h5>All Site Recordings</h5>
                </Card>
              </div>

              <div className='grid-item visitors'>
                <Card>
                  <h5>All Site Visitors</h5>
                </Card>
              </div>
            </div>
          </>
        )}
      </Page>
    </>
  );
};

export default AdminDashboard;
export { getServerSideProps };
