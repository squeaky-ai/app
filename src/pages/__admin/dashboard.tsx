import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { sumBy } from 'lodash';
import { Error } from 'components/error';
import { Main } from 'components/main';
import { BreadCrumbs } from 'components/admin/breadcrumbs';
import { Card } from 'components/card';
import { Icon } from 'components/icon';
import { UsersGrowth } from 'components/admin/users-growth';
import { SitesGrowth } from 'components/admin/sites-growth';
import { VerifiedSites } from 'components/admin/verified-sites';
import { useAdmin } from 'hooks/use-admin';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

const AdminDashboard: NextPage<ServerSideProps> = () => {
  const { admin, loading, error } = useAdmin();

  if (error) {
    return <Error />;
  }

  return (
    <>
      <Head>
        <title>Squeaky | Admin | Dashboard</title>
      </Head>

      <Main>
        <BreadCrumbs items={[{ name: 'Admin' }, { name: 'Dashboard' }]} />

        <h3 className='title'>
          Dashboard
        </h3>

        <div className='dashboard-grid'>
          <div className='grid-item total-users'>
            <Card loading={loading}>
              <div className='numbered-title'>
                <h5>Total Users</h5>
                <h3>{admin.users.length}</h3>
              </div>
              <UsersGrowth users={admin.users} />
            </Card>
          </div>

          <div className='grid-item monthly-active-users'>
            <Card loading={loading}>
              <h5>
                MAU&apos;s
                <i>Past 30 days</i>
              </h5>
              <h3>{admin.activeMonthlyUsers}</h3>
            </Card>
          </div>

          <div className='grid-item roles'>
            <Card loading={loading}>
              <h5>Roles</h5>
              <div className='role-stats'>
                <div className='role owners'>
                  <h4>{admin.roles.owners}</h4>
                  <p>Owners</p>
                </div>
                <div className='role admins'>
                  <h4>{admin.roles.admins}</h4>
                  <p>Admins</p>
                </div>
                <div className='role members'>
                  <h4>{admin.roles.members}</h4>
                  <p>Users</p>
                </div>
              </div>
            </Card>
          </div>

          <div className='grid-item total-sites'>
            <Card loading={loading}>
              <SitesGrowth sites={admin.sites} />
            </Card>
          </div>

          <div className='grid-item sites-verified'>
            <Card loading={loading}>
              <h5>Verified vs. Unverified</h5>
              <VerifiedSites verified={admin.verified} />
            </Card>
          </div>

          <div className='grid-item recordings'>
            <Card loading={loading}>
              <h5>All Site Recordings</h5>
              <div className='recordings-stats'>
                <div className='stat processed'>
                  <h3>{admin.recordingsProcessed.toLocaleString()}</h3>
                  <p>Processed</p>
                </div>
                <div className='stat stored'>
                  <h3>{admin.recordingsCount.toLocaleString()}</h3>
                  <p>Stored</p>
                </div>
              </div>
            </Card>
          </div>

          <div className='grid-item visitors'>
            <Card loading={loading}>
              <h5>All Site Visitors</h5>
              <div className='visitors-stats'>
                <div className='stat total'>
                  <h3>{admin.visitorsCount.toLocaleString()}</h3>
                  <p>Total</p>
                </div>
                <div className='stat live'>
                  <h3>{sumBy(admin.activeVisitors, 'count').toLocaleString()}</h3>
                  <p>
                    <Icon name='flashlight-line' />
                    Live
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Main>
    </>
  );
};

export default AdminDashboard;
export { getServerSideProps };
