import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Container } from '../../../components/container';
import { Header } from '../../../components/sites/header';
import { Spinner } from '../../../components/spinner';
import { Tabs } from '../../../components/sites/tabs';
import { ServerSideProps, getServerSideProps } from '../../../lib/auth';
import { useSite } from '../../../hooks/sites';

const SitesAnalytics: NextPage<ServerSideProps> = () => {
  const [loading, site] = useSite();

  return (
    <div className='page analytics'>
      <Head>
        <title>Squeaky / Site Analytics</title>
      </Head>

      <Header />

      {loading && (
        <Spinner />
      )}

      {!loading && site && (
        <Container className='lg centered'>
          <Tabs site={site} page='analytics' />
          <h3>Analytics</h3>

          <div className='analytics-grid'>
            <div className='card graph'>
            </div>
            <div className='card visitors'>
              <h4>Visitors</h4>
              <h2>0</h2>
            </div>
            <div className='card views'>
              <h4>Views</h4>
              <h2>0</h2>
            </div>
            <div className='card session-duration'>
              <h4>Average Session Duration</h4>
              <h2>0m 0s</h2>
            </div>
            <div className='card session-pages'>
              <h4>Pages Per Session</h4>
              <h2>0</h2>
            </div>
            <div className='card basic pages'>
              <h4>Pages</h4>
              <div className='table'>
                <table cellSpacing='0'>
                  <thead>
                    <tr>
                      <th>Page</th>
                      <th>Views</th>
                      <th>Average time on page</th>
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </table>
              </div>
            </div>
            <div className='card basic browser'>
              <h4>Browser</h4>
              <div className='card'>

              </div>
            </div>
            <div className='card basic devices'>
              <h4>Devices</h4>
              <div className='grid'>
                <div className='card'>

                </div>
                <div className='card'>

                </div>
                <div className='card'>

                </div>
              </div>
            </div>
          </div>
        </Container>
      )}
    </div>
  );
};

export default SitesAnalytics;
export { getServerSideProps };
