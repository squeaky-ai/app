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
import { RecordingsStored } from 'components/admin/recordings-stored';
import { VerifiedSites } from 'components/admin/verified-sites';
import { SiteProviders } from 'components/admin/site-providers';
import { useAdminDashboard } from 'hooks/use-admin-dashboard';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { PageLoading } from 'components/sites/page-loading';

const AdminDashboard: NextPage<ServerSideProps> = () => {
  const { admin, loading, error } = useAdminDashboard();

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

        <h4 className='title'>
          Dashboard
        </h4>

        {loading && (
          <PageLoading />
        )}

        {!loading && (
          <div className='dashboard-grid'>
            <div className='grid-item total-users'>
              <Card>
                <UsersGrowth
                  count={admin.usersCount}
                  users={admin.usersStored} 
                />
              </Card>
            </div>

            <div className='grid-item monthly-active-users'>
              <Card>
                <h5>
                  MAU&apos;s
                  <i>Past 30 days</i>
                </h5>
                <h3>{admin.activeMonthlyUsers}</h3>
              </Card>
            </div>

            <div className='grid-item roles'>
              <Card>
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
                  <div className='role readonly'>
                    <h4>{admin.roles.readonly}</h4>
                    <p>Read-only</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className='grid-item total-sites'>
              <Card>
                <SitesGrowth count={admin.sitesCount} sites={admin.sitesStored} />
              </Card>
            </div>

            <div className='grid-item sites-verified'>
              <Card>
                <h5>Verified vs. Unverified</h5>
                <VerifiedSites verified={admin.verified} />
              </Card>
            </div>

            <div className='grid-item recordings'>
              <Card>
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
              <Card>
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

            <div className='grid-item recordings-stored'>
              <Card>
                <RecordingsStored recordingsStored={admin.recordingsStored} />
              </Card>
            </div>

            <div className='grid-item sites-providers'>
              <Card>
                <h5>Providers</h5>
                <SiteProviders providers={admin.sitesProviders} />
              </Card>
            </div>
          </div>
        )}
      </Main>
    </>
  );
};

export default AdminDashboard;
export { getServerSideProps };
